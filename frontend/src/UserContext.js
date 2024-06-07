import React, { createContext, useState, useContext } from "react";

const UserContext = createContext(null);

// provider component
export const UserProvider = ({ children }) => {
    const [userType, setUserType] = useState(null);

    return <UserContext.Provider value={{ userType, setUserType }}>{children}</UserContext.Provider>;
};

// Custom hook to use the UserContext
export const useUser = () => {
    return useContext(UserContext);
};
