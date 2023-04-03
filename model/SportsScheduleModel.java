package ca.ubc.cs304.model;

import java.sql.Timestamp;

public class SportsScheduleModel {

    private final String scheduleID;
    private final String startTime;
    private final String endTime;
    private final String season;

    public SportsScheduleModel(String scheduleID, String startTime, String endTime, String season) {
        this.scheduleID = scheduleID;
        this.startTime = startTime;
        this.endTime = endTime;
        this.season = season;
    }

    public String getScheduleID() {
        return scheduleID;
    }

    public String getStartTime() {
        return startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public String getSeason() {
        return season;
    }
}