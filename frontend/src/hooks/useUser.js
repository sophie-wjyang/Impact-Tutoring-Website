import React, { createContext, useState, useContext, useEffect } from "react";
import client from "../axios";

const UserContext = createContext({
  user: null,
  setUser: () => {},
  isLoading: true,
});

// provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    client
      .get("get-user")
      .then(({ data }) => {
        setUser(data);
      })
      .catch();

    setIsLoading(false);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

// custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};
