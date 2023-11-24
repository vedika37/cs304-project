package ca.ubc.cs304.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;

import ca.ubc.cs304.model.*;
//import ca.ubc.cs304.model.CoachOptionModel;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

/**
 * This class handles all database related transactions
 */
public class DatabaseConnectionHandler {
    // Use this version of the ORACLE_URL if you are running the code off of the server
//    private static final String ORACLE_URL = "jdbc:oracle:thin:@dbhost.students.cs.ubc.ca:1522:stu";
    // Use this version of the ORACLE_URL if you are tunneling into the undergrad servers
    private static final String ORACLE_URL = "jdbc:oracle:thin:@localhost:1522:stu";
    private static final String EXCEPTION_TAG = "[EXCEPTION]";
    private static final String WARNING_TAG = "[WARNING]";

    private Connection connection = null;


    public DatabaseConnectionHandler() {
        try {
            // Load the Oracle JDBC driver
            // Note that the path could change for new drivers
            DriverManager.registerDriver(new oracle.jdbc.driver.OracleDriver());
        } catch (SQLException e) {
            System.out.println(EXCEPTION_TAG + " " + e.getMessage());
        }
    }

    public void close() {
        try {
            if (connection != null) {
                connection.close();
            }
        } catch (SQLException e) {
            System.out.println(EXCEPTION_TAG + " " + e.getMessage());
        }
    }

    //utility///////////////////////////////////////////////////////////////
    //OPTIONS
    //coach options
    public CoachOptionModel[] getCoachOptions() {
        ArrayList<CoachOptionModel> result = new ArrayList<CoachOptionModel>();

        try {
            Statement stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT COACHID,NAME FROM coach");

            while(rs.next()) {
                CoachOptionModel model = new CoachOptionModel(rs.getString("coachID"),
                        rs.getString("name"));
                result.add(model);
            }

            rs.close();
            stmt.close();
        } catch (SQLException e) {
            System.out.println(EXCEPTION_TAG + " " + e.getMessage());
        }

        return result.toArray(new CoachOptionModel[result.size()]);
    }
    //player options
    public PlayerOptionModel[] getPlayerOptions() {
        ArrayList<PlayerOptionModel> result = new ArrayList<PlayerOptionModel>();

        try {
            Statement stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT PLAYERID,NAME FROM PLAYERHASRANKINGISINTEAMFOLLOWS");

            while(rs.next()) {
                PlayerOptionModel model = new PlayerOptionModel(rs.getString("playerID"),
                        rs.getString("name"));
                result.add(model);
            }

            rs.close();
            stmt.close();
        } catch (SQLException e) {
            System.out.println(EXCEPTION_TAG + " " + e.getMessage());
        }

        return result.toArray(new PlayerOptionModel[result.size()]);
    }
    //team options
    public TeamOptionModel[] getTeamOptions() {
        ArrayList<TeamOptionModel> result = new ArrayList<TeamOptionModel>();

        try {
            Statement stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT TYPE, NAME, DIVISION FROM TEAM");

            while(rs.next()) {
                TeamOptionModel model = new TeamOptionModel(rs.getString("type"),
                        rs.getString("name"), rs.getString("division"));
                result.add(model);
            }

            rs.close();
            stmt.close();
        } catch (SQLException e) {
            System.out.println(EXCEPTION_TAG + " " + e.getMessage());
        }

        return result.toArray(new TeamOptionModel[result.size()]);
    }
    //season options
    public SeasonOptionModel[] getSeasonOptions() {
        ArrayList<SeasonOptionModel> result = new ArrayList<SeasonOptionModel>();

        try {
            Statement stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT DISTINCT SEASON FROM DISPLAYSPERFORMANCE");

            while(rs.next()) {
                SeasonOptionModel model = new SeasonOptionModel(rs.getString("season"));
                result.add(model);
            }

            rs.close();
            stmt.close();
        } catch (SQLException e) {
            System.out.println(EXCEPTION_TAG + " " + e.getMessage());
        }

        return result.toArray(new SeasonOptionModel[result.size()]);
    }


    ///////////////////////////////////////////////////////////////utility//

    // queries begin here


    // insert query
    public String insertCoach(CoachModel model) {
        try {
            PreparedStatement ps = connection.prepareStatement("INSERT INTO Coach VALUES (?,?,?,?)");
            ps.setString(1, model.getCoachID());
            ps.setString(2, model.getName());
            ps.setString(3, model.getPhoneNumber());
            ps.setString(4, model.getSpecialization());


            ps.executeUpdate();
            connection.commit();

            ps.close();

            return "Success! Coach added!";
        } catch (SQLException e) {
            System.out.println(EXCEPTION_TAG + " " + e.getMessage());
            rollbackConnection();
            return (EXCEPTION_TAG + " " + e.getMessage());
        }
    }


    // delete query
    public String deleteCoach(String coachID) {
        try {
            PreparedStatement ps = connection.prepareStatement("DELETE FROM coach WHERE coachID = ?");
            ps.setString(1, coachID);

            int rowCount = ps.executeUpdate();
            if (rowCount == 0) {
                System.out.println(WARNING_TAG + " Coach " + coachID + " does not exist!");
            }

            connection.commit();

            ps.close();
            return "Deleted!";
        } catch (SQLException e) {
            System.out.println(EXCEPTION_TAG + " " + e.getMessage());
            rollbackConnection();
            return (EXCEPTION_TAG + " " + e.getMessage());
        }
    }

    // delete on cascade query
    public String deleteSpecialization(String specialization) {
        try {
            PreparedStatement ps = connection.prepareStatement("DELETE FROM Specialization WHERE Specialization = ?");
            ps.setString(1, specialization);

            int rowCount = ps.executeUpdate();
            if (rowCount == 0) {
                System.out.println(WARNING_TAG + " Specialization " + specialization + " does not exist!");
            }

            connection.commit();

            ps.close();
            return "Deleted!";
        } catch (SQLException e) {
            System.out.println(EXCEPTION_TAG + " " + e.getMessage());
            rollbackConnection();
            return (EXCEPTION_TAG + " " + e.getMessage());
        }
    }


    // update query
    public String updateCoach(String coachID, String name, String phoneNumber, String specialization) {
        try {
            PreparedStatement ps = connection.prepareStatement("UPDATE coach " +
                    "SET coachID = ?, name = ?, phoneNumber = ?, specialization = ?  WHERE coachID = ?");
            ps.setString(1, coachID);
            ps.setString(2, name);
            ps.setString(3, phoneNumber);
            ps.setString(4, specialization);
            ps.setString(5, coachID);

            int rowCount = ps.executeUpdate();
            if (rowCount == 0) {
                System.out.println(WARNING_TAG + " Coach " + coachID + " does not exist!");
            }

            connection.commit();

            ps.close();
            return "Success! Coach updated!";
        } catch (SQLException e) {
            System.out.println(EXCEPTION_TAG + " " + e.getMessage());
            rollbackConnection();
            return (EXCEPTION_TAG + " " + e.getMessage());
        }
    }



    // selection query
    public CoachModel[] getCoachInfo() {
        ArrayList<CoachModel> result = new ArrayList<CoachModel>();

        try {
            Statement stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM coach");

            while(rs.next()) {
                CoachModel model = new CoachModel(rs.getString("coachID"),
                        rs.getString("name"),
                        rs.getString("phoneNumber"),
                        rs.getString("specialization"));
                result.add(model);
            }

            rs.close();
            stmt.close();
        } catch (SQLException e) {
            System.out.println(EXCEPTION_TAG + " " + e.getMessage());
        }

        return result.toArray(new CoachModel[result.size()]);
    }


    // TODO this doesnt return all items see hack below
    // projection query
    public ArrayList<PlayerHasRankingIsInTeamFollowsModel> getRankingsBySeason(String givenSeason) {
        ArrayList<PlayerHasRankingIsInTeamFollowsModel> result = new ArrayList<>();
        try {
            PreparedStatement ps = connection.prepareStatement("SELECT P.PlayerID, P.name, P.rankNumber, P.teamName\n" +
                    "    FROM   playerHasRankingIsInTeamFollows P, displaysPerformance Pe\n" +
                    "    WHERE P.PlayerID = Pe.PlayerID AND\n" +
                    "    Pe.season = ?");
            ps.setString(1, givenSeason);
            ResultSet rs = ps.executeQuery();


            while(rs.next()) {
                PlayerHasRankingIsInTeamFollowsModel model = new PlayerHasRankingIsInTeamFollowsModel(rs.getString("playerID"),
                        rs.getString("name"),
                        null, 0, null,
                        rs.getInt("rankNumber"), null, null,
                        rs.getString("teamName"), null, null);
                result.add(model);
                System.out.println(model.getName().toString());
            }

            rs.close();
            ps.close();
            connection.commit();
        } catch (SQLException e) {
            System.out.println(EXCEPTION_TAG + " " + e.getMessage());
            rollbackConnection();
        }

        return result;
    }

    // hack reimplement above later
    //projection
    public PlayerRankingModel[] getRankingsBySeasonALT(String givenSeason) {
        ArrayList<PlayerRankingModel> result = new ArrayList<PlayerRankingModel>();
        try {
            PreparedStatement ps = connection.prepareStatement("SELECT P.PlayerID, P.name, P.rankNumber, P.teamName\n" +
                    "    FROM   playerHasRankingIsInTeamFollows P, displaysPerformance Pe\n" +
                    "    WHERE P.PlayerID = Pe.PlayerID AND\n" +
                    "    Pe.season = ?");
            ps.setString(1, givenSeason);
            ResultSet rs = ps.executeQuery();


            while(rs.next()) {
                PlayerRankingModel model = new PlayerRankingModel(rs.getString("playerID"),
                        rs.getString("name"),
                        rs.getInt("rankNumber"),
                        rs.getString("teamName"));
                result.add(model);
                System.out.println(model.getName().toString());
            }

            rs.close();
            ps.close();
            connection.commit();
        } catch (SQLException e) {
            System.out.println(EXCEPTION_TAG + " " + e.getMessage());
            rollbackConnection();
        }

        return result.toArray(new PlayerRankingModel[result.size()]);
    }

    // join query
    public SportsScheduleModel[] getAllSchedulesMadeByCoach(String coachID) {
        ArrayList<SportsScheduleModel> result = new ArrayList<>();
        try {
            PreparedStatement ps = connection.prepareStatement("SELECT S.scheduleID, S.startTime, S.endTime, s.season\n" +
                    "         FROM      Coach C, Contributes Co, SportsSchedule S\n" +
                    "         WHERE   C.coachID = ? AND\n" +
                    "         C.coachID = Co.coachID AND\n" +
                    "         Co.scheduleID = S.scheduleID");
            ps.setString(1, coachID);
            ResultSet rs = ps.executeQuery();


            while(rs.next()) {
                SportsScheduleModel model = new SportsScheduleModel(rs.getString("scheduleID"),
                        rs.getString("startTime"),
                        rs.getString("endTime"),
                        rs.getString("season"));
                result.add(model);
                System.out.println(model.getScheduleID().toString());
            }

            rs.close();
            ps.close();
            connection.commit();
        } catch (SQLException e) {
            System.out.println(EXCEPTION_TAG + " " + e.getMessage());
            rollbackConnection();
        }
        System.out.println(result.toArray(new SportsScheduleModel[result.size()]));
        return result.toArray(new SportsScheduleModel[result.size()]);
    }

    // division query
    public ArrayList<CoachModel> coachedAllPlayersInGivenTeam(String givenTeamName) {
        ArrayList<CoachModel> result = new ArrayList<CoachModel>();

        try {
            System.out.println(givenTeamName);
            PreparedStatement ps = connection.prepareStatement("SELECT C.coachID, C.name\n" +
                    "   FROM Coach C\n" +
                    "   WHERE NOT EXISTS (SELECT P.name\n" +
                    "   FROM playerHasRankingIsInTeamFollows P\n" +
                    "   WHERE P.teamName = ? AND NOT EXISTS (SELECT *\n" +
                    "   FROM Trains T\n" +
                    "   WHERE C.coachID = T.coachID AND T.playerID = P.playerID))");
            ps.setString(1, givenTeamName);
            ResultSet rs = ps.executeQuery();

            while(rs.next()) {
                CoachModel model = new CoachModel(rs.getString("coachID"),
                        rs.getString("name"),
                        null,
                        null
                );

                result.add(model);
//                System.out.println(result);
                System.out.println(model.getName() );
            }

            rs.close();
            ps.close();
            connection.commit();
        } catch (SQLException e) {
            System.out.println(EXCEPTION_TAG + " " + e.getMessage());
        }

        return result;
    }

    // division query
    public ArrayList<PlayerHasRankingIsInTeamFollowsModel> showAllPlayersAndRanksInTeam(String givenTeamName) {
        ArrayList<PlayerHasRankingIsInTeamFollowsModel> result = new ArrayList<PlayerHasRankingIsInTeamFollowsModel>();

        try {
            System.out.println(givenTeamName);
            PreparedStatement ps = connection.prepareStatement("SELECT P.name, P.rankNumber " +
                    "FROM playerHasRankingIsInTeamFollows P " +
                    "WHERE teamName = ? AND EXISTS"+
                    "              ((SELECT P1.name, P1.rankNumber\n" +
                    "                FROM playerHasRankingIsInTeamFollows P1)\n" +
                    "              MINUS" +
                    "              (SELECT P2.name, P2.rankNumber\n" +
                    "              FROM playerHasRankingIsInTeamFollows P2\n" +
                    "              WHERE P2.teamName <> ?))");
            ps.setString(1, givenTeamName);
            ps.setString(2, givenTeamName);
            ResultSet rs = ps.executeQuery();

            while(rs.next()) {
                PlayerHasRankingIsInTeamFollowsModel model = new PlayerHasRankingIsInTeamFollowsModel(null,
                        rs.getString("name"),
                        null,
                        -1,
                        null,
                        rs.getInt("rankNumber"),
                        null,
                        null,
                        null,
                        null,
                        null
                );

                result.add(model);
//                System.out.println(result);
                System.out.println(model.getName() );
            }

            rs.close();
            ps.close();
            connection.commit();
        } catch (SQLException e) {
            System.out.println(EXCEPTION_TAG + " " + e.getMessage());
        }

        return result;
    }


    // aggregation with group by query
    public ArrayList<PlayerCountTeamModel> showCountOfAllTeams() {
        ArrayList<PlayerCountTeamModel> result = new ArrayList<>();
//        int result = 999;
        try {
            PreparedStatement ps = connection.prepareStatement("SELECT COUNT(*) AS PlayerCount, teamName\n" +
                    "    FROM   playerHasRankingIsInTeamFollows P, Team T\n" +
                    "    WHERE  P.teamName = T.name\n" +
                    "    GROUP BY teamName");
//            ps.setString(1, givenTeamName);
            ResultSet rs = ps.executeQuery();


            while (rs.next()) {
                PlayerCountTeamModel model = new PlayerCountTeamModel(rs.getInt("playerCount"),
                        rs.getString("teamName"));
                result.add(model);
                System.out.println(rs.getString("teamName") + " " + rs.getInt("playerCount"));
            }

            rs.close();
            ps.close();
            connection.commit();
        } catch (SQLException e) {
            System.out.println(EXCEPTION_TAG + " " + e.getMessage());
            rollbackConnection();
        }
        System.out.println(result);
        return result;
    }


    // aggregation with having query
    public ArrayList<String> getHighPerformingTeams() {
        ArrayList<String> result = new ArrayList<>();
//        int result = 999;
        try {
            PreparedStatement ps = connection.prepareStatement("SELECT teamName\n" +
                    "    FROM   playerHasRankingIsInTeamFollows P, Team T, displaysPerformance Pe\n" +
                    "    WHERE  P.teamName = T.name AND P.playerID = Pe.playerID\n" +
                    "    GROUP BY teamName\n" +
                    "    HAVING AVG(Pe.performancePoints) >= 50");
//            ps.setString(1, givenTeamName);
            ResultSet rs = ps.executeQuery();


            while (rs.next()) {
                result.add(rs.getString(1));
//                System.out.println(rs.getString(2) + " " + rs.getInt(1));
            }

            rs.close();
            ps.close();
            connection.commit();
        } catch (SQLException e) {
            System.out.println(EXCEPTION_TAG + " " + e.getMessage());
            rollbackConnection();
        }
        System.out.println(result);
        return result;
    }

    // nested aggregation query
    public PlayerHasRankingIsInTeamFollowsModel showStarPlayer(String givenTeamName) {
        PlayerHasRankingIsInTeamFollowsModel result = null;

        try {
//            System.out.println(givenTeamName);
            PreparedStatement ps = connection.prepareStatement("SELECT P.playerID, P.name\n" +
                    "FROM playerHasRankingIsInTeamFollows P, displaysPerformance Pe\n" +
                    "WHERE rownum = 1 AND P.teamName LIKE ? AND P.playerID = Pe.playerID AND Pe.performancePoints = ( SELECT MAX (Pe2.performancePoints)\n" +
                    "FROM playerHasRankingIsInTeamFollows P2, displaysPerformance Pe2\n" +
                    "WHERE P2.teamName LIKE ? AND P2.playerID = Pe2.playerID)");
            ps.setString(1, givenTeamName);
            ps.setString(2, givenTeamName);
            ResultSet rs = ps.executeQuery();

            if(rs.next()) {
                PlayerHasRankingIsInTeamFollowsModel model = new PlayerHasRankingIsInTeamFollowsModel(rs.getString("playerID"),
                        rs.getString("name"),
                        null,
                        -1,
                        null,
                        -1,
                        null,
                        null,
                        null,
                        null,
                        null
                );

                result = model;
                System.out.println(result.getName());
            }

            rs.close();
            ps.close();
            connection.commit();
        } catch (SQLException e) {
            System.out.println(EXCEPTION_TAG + " " + e.getMessage());
        }

        return result;
    }

    // nested aggregation with group by
    public TeamModel getBestPerformingTeam() {
        TeamModel result = null;

        try {
            PreparedStatement ps = connection.prepareStatement("SELECT teamName, AVG(Pe.performancePoints)\n" +
                    "    FROM   playerHasRankingIsInTeamFollows P, Team T, displaysPerformance Pe\n" +
                    "    WHERE  rownum = 1 AND P.teamName = T.name AND P.playerID = Pe.playerID\n" +
                    "    GROUP BY teamName\n" +
                    "    HAVING avg(Pe.performancePoints) >= all (SELECT AVG(Pe.performancePoints)\n" +
                    "    FROM   playerHasRankingIsInTeamFollows P, Team T, displaysPerformance Pe\n" +
                    "    WHERE  P.teamName = T.name AND P.playerID = Pe.playerID\n" +
                    "    GROUP BY teamName)");

            ResultSet rs = ps.executeQuery();

            if(rs.next()) {
                TeamModel model = new TeamModel(null, rs.getString("teamName"), null);

                result = model;
                System.out.println(result.getName());
            }

            rs.close();
            ps.close();
            connection.commit();
        } catch (SQLException e) {
            System.out.println(EXCEPTION_TAG + " " + e.getMessage());
        }

        return result;
    }



    // TODO SANITIZE INPUT
    // get coach by coachID query
    public CoachModel getCoachByCoachID(String coachID) {
        CoachModel result = null;
//        System.out.println("dbhandler call"); //this was for debugging

        try {
            Statement stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT DISTINCT * FROM coach WHERE COACHID = '"+coachID+"'");


            // should only return 1 item as coachIDs are primary key

            while(rs.next()) {
                CoachModel model = new CoachModel(rs.getString("coachID"),
                        rs.getString("name"),
                        rs.getString("phoneNumber"),
                        rs.getString("specialization"));

                result = model;
            }

            rs.close();
            stmt.close();
            return result;
        } catch (SQLException e) {
            System.out.println(EXCEPTION_TAG + " " + e.getMessage());
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    // TODO SANITIZE INPUT
    //get player by playerID query
    public PlayerHasRankingIsInTeamFollowsModel getPlayerByPlayerID(String playerID) {
        PlayerHasRankingIsInTeamFollowsModel result = null;
//        System.out.println("dbhandler call"); //this was for debugging

        try {
            Statement stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT DISTINCT * FROM PLAYERHASRANKINGISINTEAMFOLLOWS WHERE PLAYERID = '"+playerID+"'");


            // should only return 1 item as primary key

            while(rs.next()) {
                PlayerHasRankingIsInTeamFollowsModel model = new PlayerHasRankingIsInTeamFollowsModel(rs.getString("playerID"),
                        rs.getString("name"),
                        rs.getString("position"),
                        rs.getInt("playerNumber"),
                        rs.getString("phoneNumber"),
                        rs.getInt("rankNumber"),
                        rs.getString("rankType"),
                        rs.getString("teamType"),
                        rs.getString("teamName"),
                        rs.getString("division"),
                        rs.getString("scheduleID"));

                result = model;
            }

            rs.close();
            stmt.close();
            return result;
        } catch (SQLException e) {
            System.out.println(EXCEPTION_TAG + " " + e.getMessage());
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    // TODO SANITIZE INPUT
    // get coach by coachID query
    public TeamModel getTeamByModel(String type, String name, String division) {
        TeamModel result = null;
//        System.out.println("dbhandler call"); //this was for debugging

        try {
            Statement stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT DISTINCT * FROM TEAM WHERE (TYPE = '"+type+"' AND NAME = '"+name+"' AND DIVISION = '"+division+"'");


            // should only return 1 item as are primary key

            while(rs.next()) {
                TeamModel model = new TeamModel(rs.getString("type"),
                        rs.getString("name"),
                        rs.getString("division"));

                result = model;
            }

            rs.close();
            stmt.close();
            return result;
        } catch (SQLException e) {
            System.out.println(EXCEPTION_TAG + " " + e.getMessage());
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }





    // selection on player
    public PlayerHasRankingIsInTeamFollowsModel[] getPlayerInfo() {
        ArrayList<PlayerHasRankingIsInTeamFollowsModel> result = new ArrayList<PlayerHasRankingIsInTeamFollowsModel>();

        try {
            Statement stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM playerHasRankingIsInTeamFollows");

            while(rs.next()) {
                PlayerHasRankingIsInTeamFollowsModel model = new PlayerHasRankingIsInTeamFollowsModel(rs.getString("playerID"),
                        rs.getString("name"),
                        rs.getString("position"),
                        rs.getInt("playerNumber"),
                        rs.getString("phoneNumber"),
                        rs.getInt("rankNumber"),
                        rs.getString("rankType"),
                        rs.getString("teamType"),
                        rs.getString("teamName"),
                        rs.getString("division"),
                        rs.getString("scheduleID")
                );

                result.add(model);
            }

            rs.close();
            stmt.close();
        } catch (SQLException e) {
            System.out.println(EXCEPTION_TAG + " " + e.getMessage());
        }

        return result.toArray(new PlayerHasRankingIsInTeamFollowsModel[result.size()]);
    }



    public boolean login(String username, String password) {
        try {
            System.out.println("Welcome to login");
            if (connection != null) {
                connection.close();
            }
            System.out.println("Welcome to login b");
            connection = DriverManager.getConnection(ORACLE_URL, username, password);
            connection.setAutoCommit(false);

            System.out.println("\nConnected to Oracle!");
            return true;
        } catch (SQLException e) {
            System.out.println(EXCEPTION_TAG + " " + e.getMessage());
            return false;
        }
    }

    private void rollbackConnection() {
        try  {
            connection.rollback();
        } catch (SQLException e) {
            System.out.println(EXCEPTION_TAG + " " + e.getMessage());
        }
    }

    public void databaseSetup() {
//      dropBranchTableIfExists();
//
//    try {
//       Statement stmt = connection.createStatement();
//
//       stmt.executeUpdate("CREATE TABLE Coach(\n" +
//               "                      coachID \tvarchar(20),\n" +
//               "                      name \t\tvarchar(20),\n" +
//               "                      phoneNumber varchar(20),\n" +
//               "                      specialization\tvarchar(20),\n" +
//               "                      PRIMARY KEY(coachID)\n" +
//               ");");
//
//        stmt.executeUpdate("CREATE TABLE SportsSchedule(\n" +
//                "                               scheduleID varchar(20),\n" +
//                "                               startTime\tTimeStamp,\n" +
//                "                               endTime\tTimeStamp,\n" +
//                "                               season\t\tvarchar(20),\n" +
//                "                               PRIMARY KEY (scheduleID)\n" +
//                ");");
//
//        stmt.executeUpdate("CREATE TABLE Contributes(\n" +
//                "                            scheduleID varchar(20) PRIMARY KEY,\n" +
//                "                            coachID varchar(20),\n" +
//                "                            FOREIGN KEY (coachID) REFERENCES Coach(coachID),\n" +
//                "                            FOREIGN KEY (scheduleID) REFERENCES SportsSchedule(scheduleID)\n" +
//                ");");
//
//        stmt.executeUpdate("CREATE TABLE playerHasRankingIsInTeamFollows(\n" +
//                "                                                playerID\tvarchar(20),\n" +
//                "                                                name\t\tvarchar(20),\n" +
//                "                                                position\tvarchar(20),\n" +
//                "                                                playerNumber\tint,\n" +
//                "                                                phoneNumber\tvarchar(20),\n" +
//                "                                                rankNumber\tint,\n" +
//                "                                                rankType\tvarchar(20),\n" +
//                "                                                teamType\tvarchar(20),\n" +
//                "                                                teamName\tvarchar(20),\n" +
//                "                                                division\tvarchar(20),\n" +
//                "                                                scheduleID \t\tvarchar(20),\n" +
//                "                                                PRIMARY KEY (playerID),\n" +
//                "                                                FOREIGN KEY (scheduleID) REFERENCES SportsSchedule(scheduleID)\n" +
//                ");");
//       stmt.close();
//    } catch (SQLException e) {
//       System.out.println(EXCEPTION_TAG + " " + e.getMessage());
//    }


//     CoachModel coach1 = new CoachModel("C004", "Sarah Lee", "555-1357", "Goalkeeping");
//    insertCoach(coach1);

    }

    private void dropBranchTableIfExists() {
        try {
            Statement stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery("select table_name from user_tables");

            while(rs.next()) {
                if(rs.getString(1).toLowerCase().equals("coach")) {
                    stmt.execute("DROP TABLE coach");
                    stmt.execute("DROP TABLE contributes");
                    stmt.execute("DROP TABLE sportsschedule");
                    stmt.execute("DROP TABLE playerHasRankingIsInTeamFollowsModel");
                    break;
                }
            }

            rs.close();
            stmt.close();
        } catch (SQLException e) {
            System.out.println(EXCEPTION_TAG + " " + e.getMessage());
        }
    }
}