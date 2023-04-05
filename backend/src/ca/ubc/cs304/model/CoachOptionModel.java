package ca.ubc.cs304.model;

public class CoachOptionModel {
    private final String coachID;
    private final String name;

    public CoachOptionModel(String coachID, String name) {
        this.coachID = coachID;
        this.name = name;
    }

    public String getCoachID() {
        return coachID;
    }

    public String getName() {
        return name;
    }
}
