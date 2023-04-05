package ca.ubc.cs304.model;

public class TeamOptionModel {
    private final String type;
    private final String name;
    private final String division;

    public TeamOptionModel(String type, String name, String division) {
        this.type = type;
        this.name = name;
        this.division = division;
    }

    public String getType() {
        return type;
    }

    public String getName() {
        return name;
    }

    public String getDivision() {
        return division;
    }
}
