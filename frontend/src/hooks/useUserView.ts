import React from "react";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import ViewContext from "../context/ViewContext";
import { UserContextType, View, ViewContextType } from "../shared/types";

const useUserView = () => {
    const { user, isAuthenticated } = useContext(
        UserContext
    ) as UserContextType;
    const { changeView } = useContext(ViewContext) as ViewContextType;

    if (!isAuthenticated) {
        changeView(View.Guest);
        return View.Guest;
    }

    // TODO implement view swapping
};

export default useUserView;
