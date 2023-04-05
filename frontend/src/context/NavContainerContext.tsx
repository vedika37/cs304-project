import { createContext, PropsWithChildren, useState } from "react";

//types
import { NavContainerContextType } from "../shared/types";

const NavContainerContext = createContext<NavContainerContextType | null>(
    {} as NavContainerContextType
);

export const NavContainerProvider = (props: PropsWithChildren) => {
    const [sideBarOpen, setSideBarOpen] = useState(false);

    const handleSideBarOpen = () => {
        setSideBarOpen(true);
    };

    const handleSideBarClose = () => {
        setSideBarOpen(false);
    };
    const value = { sideBarOpen, handleSideBarOpen, handleSideBarClose };
    return (
        <NavContainerContext.Provider value={value}>
            {props.children}
        </NavContainerContext.Provider>
    );
};

export default NavContainerContext;
