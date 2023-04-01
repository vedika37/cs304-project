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

export const TeamObj = {
    type: "",
    name: "",
    division: "",
};

export type Team = typeof TeamObj;

export type Player = typeof PlayerObj;

export type User = Player;

export interface UserContextType {
    isAuthenticated: boolean;
    user: User | null;
    authLogin: (authUserID: string) => void;
}
