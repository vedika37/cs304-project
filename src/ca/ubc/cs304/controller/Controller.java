package ca.ubc.cs304.controller;

import ca.ubc.cs304.database.DatabaseConnectionHandler;
import ca.ubc.cs304.delegates.LoginWindowDelegate;
import ca.ubc.cs304.delegates.TerminalTransactionsDelegate;
import ca.ubc.cs304.model.CoachModel;
import ca.ubc.cs304.model.PlayerHasRankingIsInTeamFollowsModel;
import ca.ubc.cs304.ui.LoginWindow;
import ca.ubc.cs304.ui.TerminalTransactions;

/**
 * This is the main controller class that will orchestrate everything.
 */

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class Controller implements LoginWindowDelegate, TerminalTransactionsDelegate {
    private DatabaseConnectionHandler dbHandler = null;
    private LoginWindow loginWindow = null;

    public Controller() {
        dbHandler = new DatabaseConnectionHandler();
    }

    private void start() {
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
        System.out.println("Welcome b");
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
    public void insertCoach(CoachModel model) {
        dbHandler.insertCoach(model);
    }

    /**
     * TermainalTransactionsDelegate Implementation
     * <p>
     * Delete branch with given branch ID.
     */
    public void deleteCoach(String coachID) {
        dbHandler.deleteCoach(coachID);
    }

    /**
     * TermainalTransactionsDelegate Implementation
     * <p>
     * Update the branch name for a specific ID
     */

    public void updateCoach(String coachID, String name) {
        dbHandler.updateCoach(coachID, name);
    }

    public void showAllSchedulesMadeByCoach(String coachID) {
        dbHandler.showAllSchedulesMadeByCoach(coachID);
    }

    public void showAllPlayersAndRanksInTeam(String teamName) {
        dbHandler.showAllPlayersAndRanksInTeam(teamName);
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

    public void showCountOfAllTeams() {
        dbHandler.showCountOfAllTeams();
    }

    public void showHighPerformingTeams() {
        dbHandler.showHighPerformingTeams();
    }

    public void showStarPlayer(String teamName) {
        dbHandler.showStarPlayer(teamName);
    }

    public void showBestPerformingTeam() {
        dbHandler.showBestPerformingTeam();
    }

    public void rankBySeason(String season){
        dbHandler.rankBySeason(season);
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
    public static void main(String args[]) {
        SpringApplicationBuilder builder = new SpringApplicationBuilder(Controller.class);

        builder.headless(false);

        ConfigurableApplicationContext context = builder.run(args);
        Controller controller = new Controller();
        controller.start();
    }
}