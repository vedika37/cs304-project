package ca.ubc.cs304.delegates;

import ca.ubc.cs304.model.CoachModel;
import ca.ubc.cs304.model.PlayerHasRankingIsInTeamFollowsModel;
import ca.ubc.cs304.model.SportsScheduleModel;
import ca.ubc.cs304.model.TeamModel;
import ca.ubc.cs304.model.PlayerCountTeamModel;

import java.util.ArrayList;

/**
 * This interface uses the delegation design pattern where instead of having
 * the TerminalTransactions class try to do everything, it will only
 * focus on handling the UI. The actual logic/operation will be delegated to the
 * controller class (in this case Bank).
 *
 * TerminalTransactions calls the methods that we have listed below but
 * Bank is the actual class that will implement the methods.
 */
public interface TerminalTransactionsDelegate {
	public void databaseSetup();

	public String deleteCoach(String coachID);

    public String deleteSpecialization(String specialization);

	public String insertCoach(CoachModel model);
	public void showCoach();
	public String updateCoach(String coachID, String name, String phoneNumber, String specialization);
	public SportsScheduleModel[] getAllSchedulesMadeByCoach(String coachID);
	public void showAllPlayersAndRanksInTeam(String teamName);
	public void showPlayers();
	public ArrayList<PlayerCountTeamModel> showCountOfAllTeams();
	public ArrayList<String> getHighPerformingTeams();
	public PlayerHasRankingIsInTeamFollowsModel showStarPlayer(String teamName);
	public TeamModel getBestPerformingTeam();
	public ArrayList<PlayerHasRankingIsInTeamFollowsModel> getRankingsBySeason(String givenSeason);
	public void terminalTransactionsFinished();

    public ArrayList<CoachModel> coachedAllPlayersInGivenTeam(String teamName);
}