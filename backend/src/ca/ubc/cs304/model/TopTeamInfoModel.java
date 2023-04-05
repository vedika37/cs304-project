package ca.ubc.cs304.model;

public class TopTeamInfoModel {
    private final String teamName;
    private final double avgPP;

    public TopTeamInfoModel(String teamName, double avgPP) {
        this.teamName = teamName;
        this.avgPP = avgPP;
    }

    public String getTeamName() {
        return teamName;
    }

    public double getAvgPP() {
        return avgPP;
    }
}
