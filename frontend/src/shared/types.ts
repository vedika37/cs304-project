export interface NavContainerContextType {
    sideBarOpen: boolean;
    handleSideBarOpen: () => void;
    handleSideBarClose: () => void;
}

export enum View {
    Guest = -1,
    Admin = 0,
    Player,
    Coach,
}

export interface ViewContextType {
    view: View;
    changeView: (newView: View) => void;
}

export interface UserContextType {
    isAuthenticated: boolean;
    user: any; // TODO type properly when db integration
    authLogin: (authUser: any) => void;
}
