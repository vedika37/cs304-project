package ca.ubc.cs304.ui;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import ca.ubc.cs304.delegates.TerminalTransactionsDelegate;
import ca.ubc.cs304.model.CoachModel;

/**
 * The class is only responsible for handling terminal text inputs. 
 */
public class TerminalTransactions {
	private static final String EXCEPTION_TAG = "[EXCEPTION]";
	private static final String WARNING_TAG = "[WARNING]";
	private static final int INVALID_INPUT = Integer.MIN_VALUE;
	private static final int EMPTY_INPUT = 0;
	
	private BufferedReader bufferedReader = null;
	private TerminalTransactionsDelegate delegate = null;

	public TerminalTransactions() {
	}
	
	/**
	 * Sets up the database to have a branch table with two tuples so we can insert/update/delete from it.
	 * Refer to the databaseSetup.sql file to determine what tuples are going to be in the table.
	 */
	public void setupDatabase(TerminalTransactionsDelegate delegate) {
		this.delegate = delegate;
		
		bufferedReader = new BufferedReader(new InputStreamReader(System.in));
		int choice = INVALID_INPUT;
		
		while(choice != 1 && choice != 2) {
			System.out.println("If you have a table called Coach in your database (capitialization of the name does not matter), it will be dropped and a new Coach table will be created.\nIf you want to proceed, enter 1; if you want to quit, enter 2.");
			
			choice = readInteger(false);
			
			if (choice != INVALID_INPUT) {
				switch (choice) {
				case 1:  
					delegate.databaseSetup(); 
					break;
				case 2:  
					handleQuitOption();
					break;
				default:
					System.out.println(WARNING_TAG + " The number that you entered was not a valid option.\n");
					break;
				}
			}
		}
	}

	/**
	 * Displays simple text interface
	 */ 
	public void showMainMenu(TerminalTransactionsDelegate delegate) {
		this.delegate = delegate;
		
	    bufferedReader = new BufferedReader(new InputStreamReader(System.in));
		int choice = INVALID_INPUT;
		
		while (choice != 5) {
			System.out.println();
			System.out.println("1. Insert coach");
			System.out.println("2. Delete coach");
			System.out.println("3. Update coach name");
			System.out.println("4. Show coach");
			System.out.println("5. Quit");
            System.out.println("6. Show all schedule ids of all schedules created by coach");
            System.out.println("7. Show player ");
            System.out.println("8. Show ranking for all players in a given team");
			System.out.print("Please choose one of the above 6 options: ");

			choice = readInteger(false);

			System.out.println(" ");

			if (choice != INVALID_INPUT) {
				switch (choice) {
				case 1:  
					handleInsertOption(); 
					break;
				case 2:  
					handleDeleteOption(); 
					break;
				case 3: 
					handleUpdateOption();
					break;
				case 4:  
					delegate.showCoach();
					break;
				case 5:
					handleQuitOption();
					break;
                case 6:
                    handleJoinOption();
                    break;
                case 7:
                    delegate.showPlayers();
                    break;
                case 8:
                    handleDivisionOption();
                    break;
				default:
					System.out.println(WARNING_TAG + " The number that you entered was not a valid option.");
					break;
				}
			}
		}		
	}
	
	private void handleDeleteOption() {
        String coachID = null;
        while (coachID == null || coachID.length() <= 0) {
            System.out.print("Please enter the coach ID you wish to delete: ");
            coachID = readLine().trim();
//            if (coachID != INVALID_INPUT) {
				delegate.deleteCoach(coachID);
//			}
		}
	}
	
	private void handleInsertOption() {
        String coachID = null;
		while (coachID == null) {
			System.out.print("Please enter the coach ID you wish to insert: ");
            coachID = readLine().trim();
		}
		
		String name = null;
		while (name == null || name.length() <= 0) {
			System.out.print("Please enter the coach name you wish to insert: ");
			name = readLine().trim();
		}
		
		// branch address is allowed to be null so we don't need to repeatedly ask for the address
		System.out.print("Please enter the phone number you wish to insert: ");
		String phoneNumber = null;
        while (phoneNumber == null || phoneNumber.length() <= 0) {
            System.out.print("Please enter the coach name you wish to insert: ");
            phoneNumber = readLine().trim();
        }
		
		String specialization = null;
		while (specialization == null || specialization.length() <= 0) {
			System.out.print("Please enter the specialization you wish to insert: ");
            specialization = readLine().trim();
		}
		
//		int phoneNumber = INVALID_INPUT;
//		while (phoneNumber == INVALID_INPUT) {
//			System.out.print("Please enter the branch phone number you wish to insert: ");
//			phoneNumber = readInteger(true);
//		}
		
		CoachModel model = new CoachModel(coachID,
											name,
											phoneNumber,
											specialization);
		delegate.insertCoach(model);
	}
	
	private void handleQuitOption() {
		System.out.println("Good Bye!");
		
		if (bufferedReader != null) {
			try {
				bufferedReader.close();
			} catch (IOException e) {
				System.out.println("IOException!");
			}
		}
		
		delegate.terminalTransactionsFinished();
	}
	
	private void handleUpdateOption() {
		String coachID = null;
		while (coachID == null || coachID.length() <= 0) {
			System.out.print("Please enter the coach ID you wish to update: ");
            coachID = readLine().trim();
		}

		String name = null;
		while (name == null || name.length() <= 0) {
			System.out.print("Please enter the coach name you wish to update: ");
			name = readLine().trim();
		}

		delegate.updateCoach(coachID, name);
	}

    private void handleJoinOption() {
        String coachID = null;
        while (coachID == null || coachID.length() <= 0) {
            System.out.print("Please enter the coach ID you wish to check the schedule for: ");
            coachID = readLine().trim();
        }

        delegate.showAllSchedulesMadeByCoach(coachID);
    }

    private void handleDivisionOption() {
        String teamName = null;
        while (teamName == null || teamName.length() <= 0) {
            System.out.print("Please enter the name of the team you wish to check the players for: ");
            teamName = readLine().trim();
        }

        delegate.showAllPlayersAndRanksInTeam(teamName);
    }
	
	private int readInteger(boolean allowEmpty) {
		String line = null;
		int input = INVALID_INPUT;
		try {
			line = bufferedReader.readLine();
			input = Integer.parseInt(line);
		} catch (IOException e) {
			System.out.println(EXCEPTION_TAG + " " + e.getMessage());
		} catch (NumberFormatException e) {
			if (allowEmpty && line.length() == 0) {
				input = EMPTY_INPUT;
			} else {
				System.out.println(WARNING_TAG + " Your input was not an integer");
			}
		}
		return input;
	}
	
	private String readLine() {
		String result = null;
		try {
			result = bufferedReader.readLine();
		} catch (IOException e) {
			System.out.println(EXCEPTION_TAG + " " + e.getMessage());
		}
		return result;
	}
}
