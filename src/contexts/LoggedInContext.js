import { createContext, useState } from 'react';

export const LoggedInContext = createContext({
  isLogged: false,
  setIsLogged: () => {},
  currentUser: null,
  setCurrentUser: () => {},
});

export const LoggedInProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const value = {
    isLogged,
    setIsLogged,
    currentUser,
    setCurrentUser,
  };

  return (
    <LoggedInContext.Provider value={value}>
      {children}
    </LoggedInContext.Provider>
  );
};
