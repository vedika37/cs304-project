package ca.ubc.cs304.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;

import ca.ubc.cs304.model.CoachModel;
import ca.ubc.cs304.model.PlayerHasRankingIsInTeamFollowsModel;
import ca.ubc.cs304.model.SportsScheduleModel;

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

    // delete query
    public void deleteCoach(String coachID) {
        try {
            PreparedStatement ps = connection.prepareStatement("DELETE FROM coach WHERE coachID = ?");
            ps.setString(1, coachID);

            int rowCount = ps.executeUpdate();
            if (rowCount == 0) {
                System.out.println(WARNING_TAG + " Coach " + coachID + " does not exist!");
            }

            connection.commit();

            ps.close();
        } catch (SQLException e) {
            System.out.println(EXCEPTION_TAG + " " + e.getMessage());
            rollbackConnection();
        }
    }

    // insert query
    public void insertCoach(CoachModel model) {
        try {
            PreparedStatement ps = connection.prepareStatement("INSERT INTO Coach VALUES (?,?,?,?)");
            ps.setString(1, model.getCoachID());
            ps.setString(2, model.getName());
            ps.setString(3, model.getPhoneNumber());
            ps.setString(4, model.getSpecialization());


            ps.executeUpdate();
            connection.commit();

            ps.close();
        } catch (SQLException e) {
            System.out.println(EXCEPTION_TAG + " " + e.getMessage());
            rollbackConnection();
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
 // update query
 public void updateCoach(String coachID, String name) {
    try {
      PreparedStatement ps = connection.prepareStatement("UPDATE coach SET name = ? WHERE coachID = ?");
      ps.setString(1, name);
      ps.setString(2, coachID);

      int rowCount = ps.executeUpdate();
      if (rowCount == 0) {
          System.out.println(WARNING_TAG + " Coach " + coachID + " does not exist!");
      }

      connection.commit();

            ps.close();
        } catch (SQLException e) {
            System.out.println(EXCEPTION_TAG + " " + e.getMessage());
            rollbackConnection();
        }
    }

    // projection query order by rank
    public ArrayList<PlayerHasRankingIsInTeamFollowsModel> rankBySeason(String givenSeason) {
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

 // selection projection join query
 public ArrayList<SportsScheduleModel> showAllSchedulesMadeByCoach(String coachID) {
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

     return result;
 }

    // division query
    public ArrayList<PlayerHasRankingIsInTeamFollowsModel> showAllPlayersAndRanksInTeam(String givenTeamName) {
        ArrayList<PlayerHasRankingIsInTeamFollowsModel> result = new ArrayList<PlayerHasRankingIsInTeamFollowsModel>();

        try {
            System.out.println(givenTeamName);
            PreparedStatement ps = connection.prepareStatement("SELECT P.name, rankNumber FROM playerHasRankingIsInTeamFollows P WHERE teamName = ? AND NOT EXISTS"+
                    "              ((SELECT P1.name, P1.rankNumber\n" +
                    "                FROM playerHasRankingIsInTeamFollows P1)\n" +
                    "              MINUS" +
                    "              (SELECT P2.name, P2.rankNumber\n" +
                    "              FROM playerHasRankingIsInTeamFollows P2\n" +
                    "              WHERE P2.teamName <> ?>))");
            ps.setString(1, givenTeamName);
            ps.setString(2, givenTeamName);
            ResultSet rs = ps.executeQuery();

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
                System.out.println(model.getPlayerID().toString() + " " + model.getTeamName().toString());
            }

            rs.close();
            ps.close();
            connection.commit();
        } catch (SQLException e) {
            System.out.println(EXCEPTION_TAG + " " + e.getMessage());
        }

        return result;
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

    // aggregation with group by query
    public HashMap<String, Integer> showCountOfAllTeams() {
        HashMap<String, Integer> result = new HashMap<>();
//        int result = 999;
        try {
            PreparedStatement ps = connection.prepareStatement("SELECT COUNT(*) AS PlayerCount, teamName\n" +
                    "    FROM   playerHasRankingIsInTeamFollows P, Team T\n" +
                    "    WHERE  P.teamName = T.name\n" +
                    "    GROUP BY teamName");
//            ps.setString(1, givenTeamName);
            ResultSet rs = ps.executeQuery();


            while (rs.next()) {
                result.put(rs.getString(2), rs.getInt(1));
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

    // aggregation with having query
    public ArrayList<String> showHighPerformingTeams() {
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
    public String showStarPlayer(String givenTeamName) {
        String result = null;

        try {
//            System.out.println(givenTeamName);
            PreparedStatement ps = connection.prepareStatement("SELECT P.name\n" +
                    "FROM playerHasRankingIsInTeamFollows P, displaysPerformance Pe\n" +
                    "WHERE P.teamName LIKE ? AND P.playerID = Pe.playerID AND Pe.performancePoints = ( SELECT MAX (Pe2.performancePoints)\n" +
                    "FROM playerHasRankingIsInTeamFollows P2, displaysPerformance Pe2\n" +
                    "WHERE P2.teamName LIKE ? AND P2.playerID = Pe2.playerID)");
            ps.setString(1, givenTeamName);
            ps.setString(2, givenTeamName);
            ResultSet rs = ps.executeQuery();

            if(rs.next()) {
                result = (rs.getString(1));
                System.out.println(rs.getString(1));
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
    public String showBestPerformingTeam() {
        String result = "";

        try {
//            System.out.println(givenTeamName);
            PreparedStatement ps = connection.prepareStatement("SELECT teamName, AVG(Pe.performancePoints)\n" +
                    "    FROM   playerHasRankingIsInTeamFollows P, Team T, displaysPerformance Pe\n" +
                    "    WHERE  P.teamName = T.name AND P.playerID = Pe.playerID\n" +
                    "    GROUP BY teamName\n" +
                    "    HAVING avg(Pe.performancePoints) >= all (SELECT AVG(Pe.performancePoints)\n" +
                    "    FROM   playerHasRankingIsInTeamFollows P, Team T, displaysPerformance Pe\n" +
                    "    WHERE  P.teamName = T.name AND P.playerID = Pe.playerID\n" +
                    "    GROUP BY teamName)");
//            ps.setString(1, givenTeamName);
//            ps.setString(2, givenTeamName);
            ResultSet rs = ps.executeQuery();

            if(rs.next()) {
                result = (rs.getString(1));
                System.out.println(rs.getString(1));
            }

            rs.close();
            ps.close();
            connection.commit();
        } catch (SQLException e) {
            System.out.println(EXCEPTION_TAG + " " + e.getMessage());
        }

        return result;
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