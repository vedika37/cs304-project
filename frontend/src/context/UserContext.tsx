import { createContext, PropsWithChildren, useState } from "react";

// TODO replace User state with reducer
export interface UserContextType {
    isAuthenticated: boolean;
    fakeAuth: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = (props: PropsWithChildren) => {
    // TODO replace User state with reducer
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // fake user auth for testing
    const fakeAuth = () => {
        setIsAuthenticated(!isAuthenticated);
    };

    const value = { isAuthenticated, fakeAuth };
    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContext;
