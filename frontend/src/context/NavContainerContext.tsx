import { createContext, PropsWithChildren, useState } from "react";

export interface NavContainerContextType {
    sideBarOpen: boolean;
    handleSideBarOpen: () => void;
    handleSideBarClose: () => void;
}

const NavContainerContext = createContext<NavContainerContextType | null>(null);

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
