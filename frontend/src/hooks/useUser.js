import React, { createContext, useState, useContext } from "react";

const UserContext = createContext({});

// provider component
export const UserProvider = ({ children }) => {
    const [userType, setUserType] = useState();

    return <UserContext.Provider value={{ userType, setUserType }}>{children}</UserContext.Provider>;
};

// custom hook to use the UserContext
export const useUser = () => {
    return useContext(UserContext);
};
