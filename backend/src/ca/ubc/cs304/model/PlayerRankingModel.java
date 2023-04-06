package ca.ubc.cs304.model;

public class PlayerRankingModel {
    private final String playerID;
    private final String name;
    private final int rankNumber;
    private final String teamName;

    public PlayerRankingModel(String playerID, String name, int rankNumber, String teamName) {
        this.playerID = playerID;
        this.name = name;
        this.rankNumber = rankNumber;
        this.teamName = teamName;
    }

    public String getPlayerID() {
        return playerID;
    }

    public String getName() {
        return name;
    }

    public int getRankNumber() {
        return rankNumber;
    }

    public String getTeamName() {
        return teamName;
    }
}
