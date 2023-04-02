package ca.ubc.cs304.model;

public class HasPhysicalCharacteristicModel {
    private final String dateChecked;
    private final int age;
    private final int weight;
    private final int height;
    private final String playerID;

    public HasPhysicalCharacteristicModel(String dateChecked, int age, int weight, int height, String playerID) {
        this.dateChecked = dateChecked;
        this.age = age;
        this.weight = weight;
        this.height = height;
        this.playerID = playerID;
    }

    public String getDateChecked() {
        return dateChecked;
    }

    public int getAge() {
        return age;
    }

    public int getWeight() {
        return weight;
    }

    public int getHeight() {
        return height;
    }

    public String getPlayerID() {
        return playerID;
    }
}
