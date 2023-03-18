import { createContext, PropsWithChildren, useState } from "react";
import { useNavigate } from "react-router-dom";

// TODO replace User state with reducer
export interface UserContextType {
    isAuthenticated: boolean;
    user: any; // TODO type properly when db integration
    authLogin: (authUser: any) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = (props: PropsWithChildren) => {
    // TODO potentially replace User state with reducer

    // TODO SETUP persistence with authentication
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState();

    const navigate = useNavigate();

    const authLogin = (authUser: any) => {
        console.log("Logged in as:", authUser); // TODO remove
        try {
            setUser(authUser);
            try {
                navigate(-1);
            } catch (e) {
                navigate("/");
            }
        } catch (errror) {}
        setIsAuthenticated(true);
    };

    const value = { isAuthenticated, user, authLogin };
    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContext;
