const spotifyApi = require("../utils/apiWrapper");

const playlistController = {};




// create a new playlist in user's account
playlistController.createPlaylist = async (req, res, next) => {
  try {
    const { genre, playlistName, playlistDescription } = req.body;
    spotifyApi.setAccessToken(req.cookies.access)
    const data = await spotifyApi.createPlaylist(
      `${playlistName}`,
      {'description': `${playlistDescription}`, 'public': true}
    );
    res.locals.newPlaylist = data.body;
    return next();
  } catch (err) {
    return next({
      log: 'Failed to create new playlist',
      status: err.statusCode,
      message: { Error: 'Failed to create new playlist ' + err}
    });
  }
};


// this will generally be applied when "fraction" is a real number between 0 and 1
function weightedAverage(start, end, fraction) {
  return start + (end-start) * fraction;
}

// input: current duration + all user-inputted data (an array of segment-objects)
// output: an object containingdata exactly as Spotify API requests (note that custom parameters are always real numbers between 0 and 1)
function getCriteria(currentDurationMin, inputData) {
  
  // pick the correct segment-object to draw from
  let segmentNumber = 0;
  while (currentDurationMin > inputData[segmentNumber].end_time) segmentNumber++;
  const theSegment = inputData[segmentNumber];
  console.log('We\'ll be extracting data to send to Spotify API based on the segment-object: ', theSegment);
  
  // save the values that don't require weighted averaging
  const seed_genres = theSegment.genres.join(',');
  const theCustomParams = theSegment.custom_params;

  // compute the fraction of the segment that will have elapsed by this point in the playlist, which equals:
  // time elapsed in segment / total length of segment
  const fractionOfTimeThroughSegment = (currentDurationMin - theSegment.start_time) / (theSegment.end_time - theSegment.start_time);
  console.log('The fraction of the current segment that will have elapsed by this point in the playlist is: ', fractionOfTimeThroughSegment);
  
  // compute weighted averages
  const target_bpm = Math.floor(weightedAverage(
    theSegment.starting_bpm_target,
    theSegment.ending_bpm_target,
    fractionOfTimeThroughSegment
  ));
  console.log('For the upcoming song, the target bpm is: ', target_bpm);
  const theParams = [];
  for (let i = 0; i < theCustomParams.length; i++) {
    theParams.push(
      weightedAverage(
        theSegment.custom_param_starting_values[i],
        theSegment.custom_param_ending_values[i],
        fractionOfTimeThroughSegment
      )
    )
  }
  console.log('For the upcoming song, the target values for the custom parameters of this segment object (expressed as real numbers between 0 and 1, and respectively with respect to the custom_params array for this segment-object) are: ', theParams);

  // assemble the data into an object and return it
  output = {seed_genres, target_bpm};
  theCustomParams.forEach((param, index) => output[param] = theParams[index]);
  console.log('To our dear friend Spotify API, we will be sending the datums: ', output);
  return output;
}



playlistController.getDynamicRecommendations = async (req, res, next) => {
  const trackList = [];
  let currentDurationMin = 0;

  // update req.body property based on what the front end is actually sending
  const segments = req.body.segments
  const oneMinInMS = 60000
  const targetDurationMin = segments[segments.length - 1].end_time;
  
  console.log('starting generation of new dynamic recommendations')
  while (currentDurationMin < targetDurationMin) {
    // determine criteria based on user input and current playlist duration
    console.log(`\n**********\ngetting criteria at ${currentDurationMin} min (target duration: ${targetDurationMin})`)
    const criteria = getCriteria(currentDurationMin, segments);

    const options = {
      ...criteria,
      limit: 1,
      min_duration_ms: oneMinInMS * 2,
      max_duration_ms: oneMinInMS * 15, 
    }
    try {
      console.log(`calling spotify api with criteria ${JSON.stringify(criteria)}`)
      const response = await spotifyApi.getRecommendations(options);
      if (response.body.tracks.length === 0) {
        next({ message: 'oops no results' });
      }
      const track = response.body.tracks[0];
      console.log(`new track: ${track.name}`)
      // TODO check that song is not a duplicate
      // push to playlist array
      trackList.push(track); // push track object to trackList array
      currentDurationMin += (track.duration_ms / oneMinInMS);
    } catch (err) {
      return next({message: err})
    }
  }
  res.locals.recommendations = trackList.map(el => el.uri);
  console.log('new dynamic recommendations complete')
  return next();
}



// AXOLOTL CODE

// get recommended tracks based on user preference
playlistController.getStaticRecommendations = async (req, res, next) => {
  try {
    const { genre, tempo, duration } = req.body;

    let tempoOption;
    if (tempo === 'fast') {
      tempoOption = {
        max_tempo: 200,
        min_tempo: 160
      }
    } else if (tempo === 'slow') {
      tempoOption = {
        max_tempo: 120,
        min_tempo: 90
      }
    }
    const targetPlaylistLengthInMinutes = duration;
    const getRandomDuration = (min, max) => {
      const minDurationInMS = min * 60000;
      const maxDurationInMS = max * 60000; 
      const range = maxDurationInMS - minDurationInMS;
      return Math.floor((Math.random() * range) + minDurationInMS);
    };

    let playlistDuration = 0;
    const targetPlaylistLengthInMS = targetPlaylistLengthInMinutes * 60000;
    const recommendations = [];
    while (playlistDuration < targetPlaylistLengthInMS) {
      // hardcoding min/max durations to be 2.5 minutes and 5.5 minutes
      // could be user input instead
      const trackDuration = getRandomDuration(2.5, 5.5);

      const durationOption = {
        target_duration_ms: trackDuration,
        limit: 1
      };
      const recommendation = await spotifyApi.getRecommendations({
        seed_genres: [genre],
        ...tempoOption,
        ...durationOption
      });
      const track = recommendation.body.tracks; // expects to look like [{track}]
      recommendations.push(...track);
      playlistDuration += trackDuration;
    }
    const tracksArr = recommendations;
    res.locals.recommendations = tracksArr.map(el => el.uri);

    return next();
  } catch (err) {
    return next({
      log: 'Failed to get seed artists for Spotify recommendations',
      status: err.statusCode,
      message: { Error: 'Failed to get seed artists for Spotify recommendations'}
    });
  }
}





// add recommended tracks into playlist we created
playlistController.addTracks = async (req, res, next) => {
  console.log(`\n**********\nadding new songs to ${res.locals.newPlaylist.id}`);
  try {
    await spotifyApi.addTracksToPlaylist(res.locals.newPlaylist.id, res.locals.recommendations);
    console.log('added!')
    return next();
  } catch (err) {
    return next({
      log: 'Failed to add tracks to playlist',
      status: err.statusCode,
      message: { Error: 'Failed to add tracks to playlist' }
    });
  }
}

module.exports = playlistController;