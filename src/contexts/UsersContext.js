import { createContext, useState } from 'react';

import USERS from '../users-data.json';

export const UsersContext = createContext({
  users: USERS,
  setUsers: () => {},
});

export const UserContextProvider = ({ children }) => {
  const [users, setUsers] = useState(USERS);

  const value = {
    users,
    setUsers,
  };

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};
