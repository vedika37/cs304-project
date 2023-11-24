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

export const PlayerPhysicalObj = {
    age: 0,
    weight: 0,
    height: 0,
    dateChecked: Date,
};

export type PlayerPhysical = typeof PlayerPhysicalObj;

export const TeamObj = {
    name: "",
    type: "",
    division: "",
};

export const CoachObj = {
    coachID: "",
    name: "",
    phoneNumber: "",
    specialization: "",
};

export type Coach = typeof CoachObj;

export type Team = typeof TeamObj;

export type Player = typeof PlayerObj;

export interface CoachOption {
    coachID: string;
    name: string;
}

export interface TeamOption {
    type: string;
    name: string;
    division: string;
}

export interface PlayerOption {
    playerID: string;
    name: string;
}

export interface SeasonOption {
    season: string;
}

////////////////////////////////////////////
export type User = Player | Coach;

export interface UserContextType {
    isAuthenticated: boolean;
    user: User | null;
    authLogin: (authUserID: string) => void;
}
/////////////////////////////////////////////

export interface Season {
    season: string;
}

export interface GameSchedule {
    // scheduleID: string,
    groupName: string;
    league: string;
}

export interface TrainingSchedule {
    // scheduleID: string,
    groupName: string;
    goal: string;
}
