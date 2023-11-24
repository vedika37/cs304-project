package ca.ubc.cs304.controller;

import ca.ubc.cs304.database.DatabaseConnectionHandler;
import ca.ubc.cs304.delegates.LoginWindowDelegate;
import ca.ubc.cs304.delegates.TerminalTransactionsDelegate;
import ca.ubc.cs304.model.*;
//import ca.ubc.cs304.model.CoachOptionModel;
import ca.ubc.cs304.ui.LoginWindow;
import ca.ubc.cs304.ui.TerminalTransactions;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.regex.Pattern;

/**
 * This is the main controller class that will orchestrate everything.
 */
public class Controller implements LoginWindowDelegate, TerminalTransactionsDelegate {
    private DatabaseConnectionHandler dbHandler = null;
    private LoginWindow loginWindow = null;

    //////////////////////////////////////////////////////
    public String testVar = "testVar";

    public String getpTestVar() {
        return pTestVar;
    }

    public void setpTestVar(String pTestVar) {
        this.pTestVar = pTestVar;
    }

    private String pTestVar = "pTestVar";

    /////////////////////////////////////////////////////

    //utility///////////////////////////////////////////////////////////////
    //OPTIONS
    //coach options
    public CoachOptionModel[] getCoachOptions() {
        return dbHandler.getCoachOptions();
    }
    // player options
    public PlayerOptionModel[] getPlayerOptions() {
        return dbHandler.getPlayerOptions();
    }
    //team options
    public TeamOptionModel[] getTeamOptions() {
        return dbHandler.getTeamOptions();
    }
    public SeasonOptionModel[] getSeasonOptions() {
        return dbHandler.getSeasonOptions();
    }

    ///////////////////////////////////////////////////////////////utility//

    // TODO SANITIZE INPUT HERE OR IN DBHANDLER
    // get coach by id
    public CoachModel getCoachByCoachID(String coachID) {
        if (Pattern.matches("[a-zA-Z0-9]{1,20}", coachID)) {
            return dbHandler.getCoachByCoachID(coachID);
        }
        return null;
    }

    // TODO SANITIZE INPUT HERE OR IN DBHANDLER
    // get player by id
    public PlayerHasRankingIsInTeamFollowsModel getPlayerByPlayerID(String playerID) {
        if (Pattern.matches("[a-zA-Z0-9]{1,20}", playerID)) {
            return dbHandler.getPlayerByPlayerID(playerID);
        }
        return null;
    }

    // TODO SANITIZE INPUT HERE OR IN DBHANDLER
    // get team by model
    public TeamModel getTeamByModel(String type, String name, String division) {
        if (Pattern.matches("[a-zA-Z]{1,20}", type) && Pattern.matches("[a-zA-Z]{1,20}", name) && Pattern.matches("[a-zA-Z]{1,20}", division)) {
            return dbHandler.getTeamByModel(type,name,division);
        }
        return null;
    }






    public CoachModel[] getCoaches() {
        return dbHandler.getCoachInfo();
    }


    public SportsScheduleModel[] getAllSchedulesMadeByCoach(String coachID) {
       return dbHandler.getAllSchedulesMadeByCoach(coachID);
    }

    public PlayerHasRankingIsInTeamFollowsModel[] getPlayers(){
        return dbHandler.getPlayerInfo();
    }

    public ArrayList<PlayerCountTeamModel> showCountOfAllTeams() {
        return dbHandler.showCountOfAllTeams();
    }

    public ArrayList<String> getHighPerformingTeams() {
        return dbHandler.getHighPerformingTeams();
    }

    public PlayerHasRankingIsInTeamFollowsModel showStarPlayer(String teamName) {
        return dbHandler.showStarPlayer(teamName);
    }

    public TeamModel getBestPerformingTeam() {
        return dbHandler.getBestPerformingTeam();
    }

    public ArrayList<PlayerHasRankingIsInTeamFollowsModel> getRankingsBySeason(String season){
        return dbHandler.getRankingsBySeason(season);
    }

    //hack fix later
    public PlayerRankingModel[] getRankingsBySeasonALT(String season) {
        return dbHandler.getRankingsBySeasonALT(season);
    }

    public ArrayList<CoachModel> coachedAllPlayersInGivenTeam(String teamName) {
        return dbHandler.coachedAllPlayersInGivenTeam(teamName);
    }


    ///////////////////////////////////////////////////////////////utility//



    public Controller() {
        dbHandler = new DatabaseConnectionHandler();
    }

    public void start() {
        loginWindow = new LoginWindow();
        loginWindow.showFrame(this);
    }

    /**
     * LoginWindowDelegate Implementation
     * <p>
     * connects to Oracle database with supplied username and password
     */
    public void login(String username, String password) {
        System.out.println("Welcome");
        boolean didConnect = dbHandler.login(username, password);
        System.out.println("Welcome back");
//        boolean didConnect = true;

        if (didConnect) {
            // Once connected, remove login window and start text transaction flow
            loginWindow.dispose();

            TerminalTransactions transaction = new TerminalTransactions();
            transaction.setupDatabase(this);
            transaction.showMainMenu(this);
        } else {
            loginWindow.handleLoginFailed();

            if (loginWindow.hasReachedMaxLoginAttempts()) {
                loginWindow.dispose();
                System.out.println("You have exceeded your number of allowed attempts");
                System.exit(-1);
            }
        }
    }


    /**
     * TermainalTransactionsDelegate Implementation
     * <p>
     * Insert a branch with the given info
     */
    public String insertCoach(CoachModel model) {
        return dbHandler.insertCoach(model);
    }

    /**
     * TermainalTransactionsDelegate Implementation
     * <p>
     * Delete branch with given branch ID.
     */
    public String deleteCoach(String coachID) {
        return dbHandler.deleteCoach(coachID);
    }

    public String deleteSpecialization(String specialization) {
        return dbHandler.deleteSpecialization(specialization);
    }

    /**
     * TermainalTransactionsDelegate Implementation
     * <p>
     * Update the branch name for a specific ID
     */

    public String updateCoach(String coachID, String name, String phoneNUmber, String specialization) {
        return dbHandler.updateCoach(coachID, name, phoneNUmber, specialization);
    }


    public void showAllPlayersAndRanksInTeam(String teamName) {
        dbHandler.showAllPlayersAndRanksInTeam(teamName);
    }


    public CoachModel[] testGetCoaches() {
        return dbHandler.getCoachInfo();
    }

    /**
     * TermainalTransactionsDelegate Implementation
     * <p>
     * Displays information about varies bank branches.
     */
    public void showCoach() {
        CoachModel[] models = dbHandler.getCoachInfo();

        for (int i = 0; i < models.length; i++) {
            CoachModel model = models[i];

            // simplified output formatting; truncation may occur
            System.out.printf("%-10.10s", model.getCoachID());
            System.out.printf("%-20.20s", model.getName());
//            if (model.getAddress() == null) {
//                System.out.printf("%-20.20s", " ");
//            } else {
//                System.out.printf("%-20.20s", model.getAddress());
//            }
            System.out.printf("%-15.15s", model.getPhoneNumber());
            System.out.printf("%-15.15s", model.getSpecialization());
//            if (model.getPhoneNumber() == 0) {
//                System.out.printf("%-15.15s", " ");
//            } else {
//                System.out.printf("%-15.15s", model.getPhoneNumber());
//            }

            System.out.println();
        }
    }

    public void showPlayers() {
        PlayerHasRankingIsInTeamFollowsModel[] models = dbHandler.getPlayerInfo();

        for (int i = 0; i < models.length; i++) {
            PlayerHasRankingIsInTeamFollowsModel model = models[i];

            // simplified output formatting; truncation may occur
            System.out.printf("%-10.10s", model.getPlayerID());
            System.out.printf("%-20.20s", model.getName());
//            if (model.getAddress() == null) {
//                System.out.printf("%-20.20s", " ");
//            } else {
//                System.out.printf("%-20.20s", model.getAddress());
//            }
            System.out.printf("%-15.15s", model.getTeamName());
//            System.out.printf("%-15.15s", model.getSpecialization());
//            if (model.getPhoneNumber() == 0) {
//                System.out.printf("%-15.15s", " ");
//            } else {
//                System.out.printf("%-15.15s", model.getPhoneNumber());
//            }

            System.out.println();
        }
    }




    /**
     * TerminalTransactionsDelegate Implementation
     * <p>
     * The TerminalTransaction instance tells us that it is done with what it's
     * doing so we are cleaning up the connection since it's no longer needed.
     */
    public void terminalTransactionsFinished() {
        dbHandler.close();
        dbHandler = null;

        System.exit(0);
    }

    /**
     * TerminalTransactionsDelegate Implementation
     * <p>
     * The TerminalTransaction instance tells us that the user is fine with dropping any existing table
     * called branch and creating a new one for this project to use
     */
    public void databaseSetup() {
        dbHandler.databaseSetup();

    }

    /**
     * Main method called at launch time
     */
//    public static void main(String args[]) {
//        Controller controller = new Controller();
//        controller.start();
//    }
}