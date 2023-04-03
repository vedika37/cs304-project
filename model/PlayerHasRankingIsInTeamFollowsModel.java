package ca.ubc.cs304.model;

public class PlayerHasRankingIsInTeamFollowsModel {
    private final String playerID;
    private final String name;
    private final String position;
    private final int playerNumber;
    private final String phoneNumber;
    private final int rankNumber;
    private final String rankType;
    private final String teamType;
    private final String teamName;
    private final String division;
    private final String scheduleID;

    public PlayerHasRankingIsInTeamFollowsModel(String playerID, String name, String position, int playerNumber, String phoneNumber, int rankNumber, String rankType, String teamType, String teamName, String division, String scheduleID) {
        this.playerID = playerID;
        this.name = name;
        this.position = position;
        this.playerNumber = playerNumber;
        this.phoneNumber = phoneNumber;
        this.rankNumber = rankNumber;
        this.rankType = rankType;
        this.teamType = teamType;
        this.teamName = teamName;
        this.division = division;
        this.scheduleID = scheduleID;
    }

    public String getPlayerID() {
        return playerID;
    }

    public String getName() {
        return name;
    }

    public String getPosition() {
        return position;
    }

    public int getPlayerNumber() {
        return playerNumber;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public int getRankNumber() {
        return rankNumber;
    }

    public String getRankType() {
        return rankType;
    }

    public String getTeamType() {
        return teamType;
    }

    public String getTeamName() {
        return teamName;
    }

    public String getDivision() {
        return division;
    }

    public String getScheduleID() {
        return scheduleID;
    }
}