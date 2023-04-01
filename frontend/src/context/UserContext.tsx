import { createContext, PropsWithChildren, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// types
import {
    UserContextType,
    ViewContextType,
    View,
    Player,
    User,
} from "../shared/types";
import ViewContext from "./ViewContext";

// TODO replace User state with reducer

const UserContext = createContext<UserContextType | null>(
    {} as UserContextType
);

export const UserProvider = (props: PropsWithChildren) => {
    const { changeView } = useContext(ViewContext) as ViewContextType;

    // TODO potentially replace User state with reducer

    // TODO SETUP persistence with authentication
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const navigate = useNavigate();

    const authLogin = (authUserID: string) => {
        console.log("Logged in as:", authUserID); // TODO remove
        try {
            setUser(authUserID); // todo actually implement
            changeView(View.Player);
            try {
                navigate(-1);
            } catch (e) {
                navigate("/");
            }
        } catch (error) {}
        setIsAuthenticated(true);
        // TODO change view based on user type
        // changeView(View.Admin);
    };

    const value = { isAuthenticated, user, authLogin };
    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContext;
