package ca.ubc.cs304.model;

public class TreatmentModel {

    private final String type;
    private final String treatment;

    public TreatmentModel(String type, String treatment) {
        this.type = type;
        this.treatment = treatment;
    }

    public String getType() {
        return type;
    }

    public String getTreatment() {
        return treatment;
    }
}