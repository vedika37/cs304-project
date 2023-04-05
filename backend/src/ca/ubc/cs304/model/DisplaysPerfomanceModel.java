package ca.ubc.cs304.model;

public class DisplaysPerfomanceModel {
    private final String season;
    private final int performancePoints;
    private final String playerID;

    public DisplaysPerfomanceModel(String season, int performancePoints, String playerID) {
        this.season = season;
        this.performancePoints = performancePoints;
        this.playerID = playerID;
    }

    public String getSeason() {
        return season;
    }

    public int getPerformancePoints() {
        return performancePoints;
    }

    public String getPlayerID() {
        return playerID;
    }
}
