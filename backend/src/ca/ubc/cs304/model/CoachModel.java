package ca.ubc.cs304.model;

/**
 * The intent for this class is to update/store information about a single branch
 */
public class CoachModel {
    private final String coachID;
    private final String name;
    private final String phoneNumber;
    private final String specialization;

    public CoachModel(String coachID, String name, String phoneNumber, String specialization) {
        this.coachID = coachID;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.specialization = specialization;
    }

    public String getCoachID() {
        return coachID;
    }

    public String getName() {
        return name;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getSpecialization() {
        return specialization;
	}
}
