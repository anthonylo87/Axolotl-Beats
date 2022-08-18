import { useState } from 'react';

export const AuthContext = ({ children }) => {

  // create context

  const [user, setUser] = useState(null);
  
  let signin = (newUser) => {
    setUser(newUser);
    // navigate 
  
    let signout = () => {
      setUser(null);
      // navigate
    };
  
    let value = { user, signin, signout };
  
    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
  };
}