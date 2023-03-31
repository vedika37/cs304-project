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

export const User = {
    playerID: "",
    name: "",
    position: "",
    playerNumber: 0,
    phoneNumber: "",
    rankNumber: 0,
    rankType: "",
    teamType: "",
    teamName: "",
    division: "",
    scheduleID: "",
};

export type User = typeof User;

// export interface User {
//     playerID: string;
//     name: string;
//     position: string;
//     playerNumber: Number;
//     phoneNumber: string;
//     rankNumber: Number;
//     rankType: string;
//     teamType: string;
//     teamName: string;
//     division: string;
//     scheduleID: string;
// }

export interface UserContextType {
    isAuthenticated: boolean;
    user: User | null;
    authLogin: (authUser: any) => void;
}
