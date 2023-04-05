package ca.ubc.cs304.model;

public class TrainsModel {

    private final String playerID;
    private final String coachID;

    public TrainsModel(String playerID, String coachID) {
        this.playerID = playerID;
        this.coachID = coachID;
    }

    public String getPlayerID() {
        return playerID;
    }

    public String getCoachID() {
        return coachID;
    }
}




