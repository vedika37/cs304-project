package ca.ubc.cs304.model;

public class PlayerCountTeamModel {
    private final int playerCount;
    private final String teamName;

    public PlayerCountTeamModel(int playerCount, String teamName) {
        this.playerCount = playerCount;
        this.teamName = teamName;
    }

    public int getPlayerCount() {
        return playerCount;
    }

    public String getTeamName() {
        return teamName;
    }
}
