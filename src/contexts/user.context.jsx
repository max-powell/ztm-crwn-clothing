import { useState } from 'react';
import { createContext } from 'react';

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const contextValue = { currentUser, setCurrentUser };
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
