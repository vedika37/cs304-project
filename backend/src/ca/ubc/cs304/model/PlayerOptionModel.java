package ca.ubc.cs304.model;

public class PlayerOptionModel {
    private final String playerID;
    private final String name;

    public PlayerOptionModel(String playerID, String name) {
        this.playerID = playerID;
        this.name = name;
    }

    public String getPlayerID() {
        return playerID;
    }

    public String getName() {
        return name;
    }
}
