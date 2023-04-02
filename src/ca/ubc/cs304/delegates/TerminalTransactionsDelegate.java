package ca.ubc.cs304.delegates;

import ca.ubc.cs304.model.CoachModel;

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
	
	public void deleteCoach(String coachID);
	public void insertCoach(CoachModel model);
	public void showCoach();
	public void updateCoach(String coachID, String name);
	public void showAllSchedulesMadeByCoach(String coachID);
    public void showAllPlayersAndRanksInTeam(String teamName);
    public void showPlayers();
	public void terminalTransactionsFinished();
}
