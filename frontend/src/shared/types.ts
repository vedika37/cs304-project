export interface NavContainerContextType {
    sideBarOpen: boolean;
    handleSideBarOpen: () => void;
    handleSideBarClose: () => void;
}

// maybe get rid of this
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

export const PlayerObj = {
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

export type Player = typeof PlayerObj;

// export type Player = {
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
// } | null;

export type User = Player;

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
    authLogin: (authUserID: string) => void;
}
