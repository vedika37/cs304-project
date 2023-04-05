package ca.ubc.cs304.model;

public class ContributesModel {

    private final String scheduleID;
    private final String coachID;

    public ContributesModel(String scheduleID, String coachID) {
        this.scheduleID = scheduleID;
        this.coachID = coachID;
    }

    public String getScheduleID() {
        return scheduleID;
    }

    public String getCoachID() {
        return coachID;
    }
}

