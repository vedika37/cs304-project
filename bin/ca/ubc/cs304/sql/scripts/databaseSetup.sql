DROP TABLE Injury CASCADE constraint;
DROP TABLE Treatment;

DROP TABLE playerHasRankingIsInTeamFollows CASCADE constraint;
DROP TABLE Team CASCADE constraint;
DROP TABLE NumPlayers;
DROP TABLE Game CASCADE constraint;
DROP TABLE Plays CASCADE constraint;
DROP TABLE Specialization CASCADE constraint;
DROP TABLE Coach CASCADE constraint;

DROP TABLE GameSchedule;
DROP TABLE TrainingSchedule;
DROP TABLE GameGroupAgenda;
DROP TABLE SportsSchedule CASCADE constraint;


DROP TABLE Contributes;
DROP TABLE hasPhysicalCharacteristic CASCADE constraint;
DROP TABLE displaysPerformance CASCADE constraint;
DROP TABLE Trains CASCADE constraint;
DROP TABLE Sustains CASCADE constraint;




/* creating tables */


CREATE TABLE Treatment(
                          type varchar(20),
                          treatment varchar(50),
                          PRIMARY KEY (type)
);

CREATE TABLE Injury(
                       timeOfOccurence TimeStamp,
                       cause varchar(20),
                       otherPartiesInvolved varchar(50),
                       type varchar(20),
                       PRIMARY KEY (timeOfOccurence, cause, otherPartiesInvolved),
                       FOREIGN KEY (type) REFERENCES Treatment
);

CREATE TABLE NumPlayers(
                           type varchar(20),
                           numPlayers int,
                           PRIMARY KEY (type)
);

CREATE TABLE Team(
                     type varchar(20),
                     name varchar(20),
                     division varchar(20),
                     PRIMARY KEY (type, name, division),
                     FOREIGN KEY (type) REFERENCES NumPlayers(type)
);

CREATE TABLE Game(
                     gameDate TimeStamp,
                     venue varchar(20),
                     opposingTeam varchar(20),
                     PRIMARY KEY (gameDate, opposingTeam),
                     UNIQUE (venue)
);



CREATE TABLE Plays(
                      type varchar(10),
                      name varchar(20),
                      division varchar(20),
                      gameDate TimeStamp,
                      opposingTeam varchar(20),
                      PRIMARY KEY (type, name, division, gameDate, opposingTeam),
                      FOREIGN KEY (gameDate, opposingTeam) REFERENCES Game(gameDate, opposingTeam),
                      FOREIGN KEY (type, name, division) REFERENCES Team(type, name, division)
);


CREATE TABLE Specialization(
                               specialization	varchar(20),
                               type		varchar(20),
                               PRIMARY KEY(specialization)
);

CREATE TABLE Coach(
                      coachID 	varchar(20),
                      name 		varchar(20),
                      phoneNumber varchar(20),
                      specialization	varchar(20),
                      PRIMARY KEY(coachID),
                      FOREIGN KEY(specialization) REFERENCES Specialization(specialization)
);




CREATE TABLE SportsSchedule(
                               scheduleID varchar(20),
                               startTime	TimeStamp,
                               endTime	TimeStamp,
                               season		varchar(20),
                               PRIMARY KEY (scheduleID)
);

CREATE TABLE GameGroupAgenda(
                                league 		varchar(20),
                                agenda		varchar(20),
                                PRIMARY KEY(league)
);

CREATE TABLE GameSchedule(
                             scheduleID	varchar(20),
                             groupName	varchar(20),
                             league		varchar(20),
                             PRIMARY KEY (scheduleID),
                             FOREIGN KEY (scheduleID) REFERENCES SportsSchedule(scheduleID),
                             FOREIGN KEY (league) REFERENCES GameGroupAgenda(league)
);

CREATE TABLE TrainingSchedule(
                                 scheduleID 		varchar(20),
                                 goal		varchar(20),
                                 groupName	varchar(20),
                                 PRIMARY KEY (scheduleID),
                                 FOREIGN KEY (scheduleID) REFERENCES SportsSchedule(scheduleID)
);



CREATE TABLE Contributes(
                            scheduleID varchar(20) PRIMARY KEY,
                            coachID varchar(20),
                            FOREIGN KEY (coachID) REFERENCES Coach(coachID),
                            FOREIGN KEY (scheduleID) REFERENCES SportsSchedule(scheduleID)
);


CREATE TABLE playerHasRankingIsInTeamFollows(
                                                playerID	varchar(20),
                                                name		varchar(20),
                                                position	varchar(20),
                                                playerNumber	int,
                                                phoneNumber	varchar(20),
                                                rankNumber	int,
                                                rankType	varchar(20),
                                                teamType	varchar(20),
                                                teamName	varchar(20),
                                                division	varchar(20),
                                                scheduleID 		varchar(20),
                                                PRIMARY KEY (playerID),
                                                FOREIGN KEY (scheduleID) REFERENCES SportsSchedule(scheduleID),
                                                FOREIGN KEY (teamType, teamName, division) REFERENCES Team(type, name, division)
);
-- // rankNumber and rankType isn’t a FK because we don’t have a separate table for it


CREATE TABLE hasPhysicalCharacteristic(
                                          dateChecked TimeStamp,
                                          age int,
                                          weight int,
                                          height int,
                                          playerID varchar(20),
                                          PRIMARY KEY (playerID, dateChecked),
                                          FOREIGN KEY (playerID) REFERENCES playerHasRankingIsInTeamFollows(playerID)
                                              ON DELETE CASCADE
);

CREATE TABLE displaysPerformance(
                                    season varchar(10),
                                    performancePoints int,
                                    playerID varchar(20),
                                    PRIMARY KEY (playerID, performancePoints),
                                    FOREIGN KEY (playerID) REFERENCES playerHasRankingIsInTeamFollows(playerID)
                                        ON DELETE CASCADE
);

CREATE TABLE Trains(
                       playerID varchar(20),
                       coachID varchar(20),
                       PRIMARY KEY (playerID, coachID),
                       FOREIGN KEY (playerID) REFERENCES playerHasRankingIsInTeamFollows(playerID),
                       FOREIGN KEY (coachID) REFERENCES Coach(coachID)
);


CREATE TABLE Sustains(
                         cause varchar(20),
                         timeOfOccurence TimeStamp,
                         otherPartiesInvolved varchar(20),
                         playerID varchar(20),
                         PRIMARY KEY (timeOfOccurence, cause, otherPartiesInvolved , playerID),
                         FOREIGN KEY (playerID) REFERENCES playerHasRankingIsInTeamFollows(playerID),
                         FOREIGN KEY (timeOfOccurence, cause, otherPartiesInvolved ) REFERENCES Injury(timeOfOccurence, cause, otherPartiesInvolved)
);



-- insert statements

-- Treatment
INSERT INTO Treatment(type, treatment)
VALUES('Concussion', 'Rest');

INSERT INTO Treatment(type, treatment)
VALUES('Sprain', 'Elevation');

INSERT INTO Treatment(type, treatment)
VALUES('Fracture', 'Surgery');

INSERT INTO Treatment(type, treatment)
VALUES('Muscle tear', 'Physiotherapy');

INSERT INTO Treatment(type, treatment)
VALUES('Dislocation', 'Surgery');

-- Injury
INSERT INTO Injury(timeOfOccurence, cause, otherPartiesInvolved, type)
VALUES (TO_TIMESTAMP('2007-07-07 09:00', 'YYYY-MM-DD HH24:MI'), 'Impact', 'Opponent Player', 'Concussion');

INSERT INTO Injury (timeOfOccurence, cause, otherPartiesInvolved, type)
VALUES (TO_TIMESTAMP('2023-02-28 15:00', 'YYYY-MM-DD HH24:MI'), 'Collision', 'N/A', 'Sprain');

INSERT INTO Injury (timeOfOccurence, cause, otherPartiesInvolved, type)
VALUES (TO_TIMESTAMP('2023-02-27 19:15', 'YYYY-MM-DD HH24:MI'), 'Collision', 'Teammate', 'Fracture');

INSERT INTO Injury (timeOfOccurence, cause, otherPartiesInvolved, type)
VALUES (TO_TIMESTAMP('2023-02-26 12:45', 'YYYY-MM-DD HH24:MI'), 'Strain', 'N/A', 'Muscle tear');

INSERT INTO Injury (timeOfOccurence, cause, otherPartiesInvolved, type)
VALUES (TO_TIMESTAMP('2001-7-27 09:00', 'YYYY-MM-DD HH24:MI'), 'Twist', 'Opponent Player', 'Dislocation');

-- Numplayers
INSERT INTO Numplayers(type, numPlayers)
VALUES ('Soccer', 11);

INSERT INTO Numplayers(type, numPlayers)
VALUES ('Basketball', 5);

INSERT INTO Numplayers(type, numPlayers)
VALUES ('Football', 11);

INSERT INTO Numplayers(type, numPlayers)
VALUES ('Baseball', 9);

INSERT INTO Numplayers(type, numPlayers)
VALUES ('Hockey', 6);


-- Specialization
INSERT INTO Specialization(specialization, type)
VALUES ('Offense', 'Football');

INSERT INTO Specialization(specialization, type)
VALUES ('Pitching', 'Baseball');

INSERT INTO Specialization(specialization, type)
VALUES ('Shooting', 'Basketball');

INSERT INTO Specialization(specialization, type)
VALUES ('Goalkeeping', 'Soccer');

INSERT INTO Specialization(specialization, type)
VALUES ('Skating', 'Hockey');


-- Coach
INSERT INTO Coach (coachID, name, phoneNumber, specialization)
VALUES ('C001', 'John Smith', '555-1234', 'Offense');

INSERT INTO Coach (coachID, name, phoneNumber, specialization)
VALUES ('C002', 'Jane Doe', '555-5678', 'Pitching');

INSERT INTO Coach (coachID, name, phoneNumber, specialization)
VALUES ('C003', 'Mike Johnson', '555-2468', 'Shooting');

INSERT INTO Coach (coachID, name, phoneNumber, specialization)
VALUES ('C004', 'Sarah Lee', '555-1357', 'Goalkeeping');

INSERT INTO Coach (coachID, name, phoneNumber, specialization)
VALUES ('C005', 'David Kim', '555-7890', 'Skating');

-- SportsSchedule
INSERT INTO SportsSchedule(scheduleID, startTime, endTime, season)
VALUES ('S001', TO_TIMESTAMP('2022-05-01 09:00', 'YYYY-MM-DD HH24:MI'), TO_TIMESTAMP('2022-05-01 11:00', 'YYYY-MM-DD HH24:MI'), '2022Spring');

INSERT INTO SportsSchedule(scheduleID, startTime, endTime, season)
VALUES ('S002', TO_TIMESTAMP('2022-05-08 10:00', 'YYYY-MM-DD HH24:MI'), TO_TIMESTAMP('2022-05-08 12:00', 'YYYY-MM-DD HH24:MI'), '2022Spring');

INSERT INTO SportsSchedule(scheduleID, startTime, endTime, season)
VALUES ('S003', TO_TIMESTAMP('2022-05-15 11:00', 'YYYY-MM-DD HH24:MI'), TO_TIMESTAMP('2022-05-15 13:00', 'YYYY-MM-DD HH24:MI'), '2022Spring');

INSERT INTO SportsSchedule(scheduleID, startTime, endTime, season)
VALUES ('S004', TO_TIMESTAMP('2022-05-22 12:00', 'YYYY-MM-DD HH24:MI'), TO_TIMESTAMP('2022-05-22 14:00', 'YYYY-MM-DD HH24:MI'), '2022Spring');

INSERT INTO SportsSchedule(scheduleID, startTime, endTime, season)
VALUES ('S005', TO_TIMESTAMP('2022-05-29 13:00', 'YYYY-MM-DD HH24:MI'), TO_TIMESTAMP('2022-05-29 15:00', 'YYYY-MM-DD HH24:MI'), '2022Spring');



INSERT INTO SportsSchedule(scheduleID, startTime, endTime, season)
VALUES ('S006', TO_TIMESTAMP('2022-01-01 09:00', 'YYYY-MM-DD HH24:MI'), TO_TIMESTAMP('2022-01-01 11:00', 'YYYY-MM-DD HH24:MI'), '2021Winter');

INSERT INTO SportsSchedule(scheduleID, startTime, endTime, season)
VALUES ('S007', TO_TIMESTAMP('2022-01-02 09:00', 'YYYY-MM-DD HH24:MI'), TO_TIMESTAMP('2022-01-02 11:00', 'YYYY-MM-DD HH24:MI'), '2021Winter');

INSERT INTO SportsSchedule(scheduleID, startTime, endTime, season)
VALUES ('S008', TO_TIMESTAMP('2022-01-03 09:00', 'YYYY-MM-DD HH24:MI'), TO_TIMESTAMP('2022-01-03 11:00', 'YYYY-MM-DD HH24:MI'), '2021Winter');

INSERT INTO SportsSchedule(scheduleID, startTime, endTime, season)
VALUES ('S009', TO_TIMESTAMP('2022-01-04 09:00', 'YYYY-MM-DD HH24:MI'), TO_TIMESTAMP('2022-01-04 11:00', 'YYYY-MM-DD HH24:MI'), '2021Winter');

INSERT INTO SportsSchedule(scheduleID, startTime, endTime, season)
VALUES ('S010', TO_TIMESTAMP('2022-01-05 09:00', 'YYYY-MM-DD HH24:MI'), TO_TIMESTAMP('2022-01-05 11:00', 'YYYY-MM-DD HH24:MI'), 'Winter');


-- GameGroupAgenda
INSERT INTO GameGroupAgenda(league, agenda)
VALUES ('MLS', 'Friendly');

INSERT INTO GameGroupAgenda(league, agenda)
VALUES ('EPL', 'Finals');

INSERT INTO GameGroupAgenda(league, agenda)
VALUES ('TDB', 'Semifinals');

INSERT INTO GameGroupAgenda(league, agenda)
VALUES ('HGF', 'Championship');

INSERT INTO GameGroupAgenda(league, agenda)
VALUES ('CAC', 'Premiers');


-- GameSchedule

INSERT INTO GameSchedule (scheduleID, groupName, league)
VALUES ('S001',  'Division A', 'MLS');

INSERT INTO GameSchedule (scheduleID, groupName, league)
VALUES ('S002',  'Division B', 'EPL');

INSERT INTO GameSchedule (scheduleID, groupName, league)
VALUES ('S003',  'Division C', 'TDB');

INSERT INTO GameSchedule (scheduleID, groupName, league)
VALUES ('S004',  'Division D', 'HGF');

INSERT INTO GameSchedule (scheduleID, groupName, league)
VALUES ('S005',  'Division E', 'CAC');


-- TrainingSchedule

INSERT INTO TrainingSchedule(scheduleID, goal, groupName)
Values('S006',  'Group A', 'Pitching');

INSERT INTO TrainingSchedule(scheduleID, goal, groupName)
Values('S007',  'Group B', 'Goalkeeping');

INSERT INTO TrainingSchedule(scheduleID, goal, groupName)
Values('S008',  'Group C', 'Fielding');

INSERT INTO TrainingSchedule(scheduleID, goal, groupName)
Values('S009',  'Group D', 'Cardio');

INSERT INTO TrainingSchedule(scheduleID, goal, groupName)
Values('S010',  'Group E', 'Weight Training');


-- Contributes(scheduleID: varchar(20) (FK), coachID: varchar(20) (FK))

INSERT INTO Contributes(scheduleID, coachID)
VALUES ('S001', 'C001');

INSERT INTO Contributes(scheduleID, coachID)
VALUES ('S002', 'C002');

INSERT INTO Contributes(scheduleID, coachID)
VALUES ('S003', 'C003');

INSERT INTO Contributes(scheduleID, coachID)
VALUES ('S004', 'C004');

INSERT INTO Contributes(scheduleID, coachID)
VALUES ('S005', 'C005');

-- Game

INSERT INTO Game(gameDate, venue, opposingTeam)
VALUES (TO_TIMESTAMP('2023-03-05 14:00', 'YYYY-MM-DD HH24:MI'), 'Stadium A', 'Team B');

INSERT INTO Game(gameDate, venue, opposingTeam)
VALUES (TO_TIMESTAMP('2023-03-10 19:30', 'YYYY-MM-DD HH24:MI'), 'Gymnasium B', 'Team C');

INSERT INTO Game(gameDate, venue, opposingTeam)
VALUES (TO_TIMESTAMP('2023-04-02 13:00', 'YYYY-MM-DD HH24:MI'), 'Field C', 'Team D');

INSERT INTO Game(gameDate, venue, opposingTeam)
VALUES (TO_TIMESTAMP('2023-04-15 20:00', 'YYYY-MM-DD HH24:MI'), 'Arena D', 'Team E');

INSERT INTO Game(gameDate, venue, opposingTeam)
VALUES (TO_TIMESTAMP('2023-05-07 15:30', 'YYYY-MM-DD HH24:MI'), 'Field F', 'Team G');


-- Team
INSERT INTO Team (type, name, division)
VALUES ('Soccer', 'The Lions', 'Premier League');

INSERT INTO Team (type, name, division)
VALUES ('Basketball', 'The Eagles', 'U14');

INSERT INTO Team (type, name, division)
VALUES ('Football', 'The Giants', 'North');

INSERT INTO Team (type, name, division)
VALUES ('Baseball', 'Based', 'National League');

INSERT INTO Team (type, name, division)
VALUES ('Hockey', 'Icebreakers', 'U21 Division');





-- playerHasRankingIsInTeamFollows

INSERT INTO playerHasRankingIsInTeamFollows (playerID, name, position, playerNumber, phoneNumber, rankNumber, rankType, teamType, teamName, division, scheduleID)
VALUES ('P001', 'John Doe', 'Forward', 7, '555-1234', 1, 'team', 'Soccer', 'The Lions', 'Premier League', 'S001');

INSERT INTO playerHasRankingIsInTeamFollows (playerID, name, position, playerNumber, phoneNumber, rankNumber, rankType, teamType, teamName, division, scheduleID)
VALUES ('P002', 'Jane Smith', 'Defender', 5, '555-5678', 4, 'national', 'Basketball', 'The Eagles', 'U14', 'S002');

INSERT INTO playerHasRankingIsInTeamFollows (playerID, name, position, playerNumber, phoneNumber, rankNumber, rankType, teamType, teamName, division, scheduleID)
VALUES ('P003', 'Bob Johnson', 'Midfielder', 10, '555-9101', 5, 'state', 'Football', 'The Giants', 'North', 'S003');

INSERT INTO playerHasRankingIsInTeamFollows (playerID, name, position, playerNumber, phoneNumber, rankNumber, rankType, teamType, teamName, division, scheduleID)
VALUES ('P004', 'Jahn Doe', 'Forward', 8, '558-1234', 2, 'team', 'Soccer', 'The Lions', 'Premier League', 'S001');

INSERT INTO playerHasRankingIsInTeamFollows (playerID, name, position, playerNumber, phoneNumber, rankNumber, rankType, teamType, teamName, division, scheduleID)
VALUES ('P005', 'Jehn Doe', 'Forward', 9, '552-1234', 3, 'team', 'Soccer', 'The Lions', 'Premier League', 'S001');

-- INSERT INTO playerHasRankingIsInTeamFollows (playerID, name, position, playerNumber, phoneNumber, rankNumber, rankType, teamType, teamName, division, scheduleID)
-- VALUES ('P004', 'John Smith', 'Forward', 16, '555-1234', 3, 'team', 'Baseball', 'Based', 'National League', 'S004');

-- INSERT INTO playerHasRankingIsInTeamFollows (playerID, name, position, playerNumber, phoneNumber, rankNumber, rankType, teamType, teamName, division, scheduleID)
-- VALUES ('P005', 'Emily Nguyen', 'Guard', 12, '555-5678', 1, 'national', 'Hockey', 'Icebreakers', 'U21 Division', 'S005');


-- hasPhysicalCharacteristics

INSERT INTO hasPhysicalCharacteristic (playerID, dateChecked, age, weight, height)
VALUES ('P001', TO_TIMESTAMP('2022-01-01 09:00', 'YYYY-MM-DD HH24:MI'), 23, 180, 72);

INSERT INTO hasPhysicalCharacteristic (playerID, dateChecked, age, weight, height)
VALUES ('P002', TO_TIMESTAMP('2022-01-02 10:00', 'YYYY-MM-DD HH24:MI'), 27, 210, 76);

INSERT INTO hasPhysicalCharacteristic (playerID, dateChecked, age, weight, height)
VALUES ('P003', TO_TIMESTAMP('2022-01-03 11:00', 'YYYY-MM-DD HH24:MI'), 21, 150, 66);


-- displaysPerformance

INSERT INTO displaysPerformance (playerID, season, performancePoints)
VALUES ('P001', '2022Spring', 100);

INSERT INTO displaysPerformance (playerID, season, performancePoints)
VALUES ('P002', '2021Winter', 80);

INSERT INTO displaysPerformance (playerID, season, performancePoints)
VALUES ('P003', '2020Spring', 10);

INSERT INTO displaysPerformance (playerID, season, performancePoints)
VALUES ('P004', '2020Winter', 80);

INSERT INTO displaysPerformance (playerID, season, performancePoints)
VALUES ('P005', '2020Spring', 100);


-- Trains

INSERT INTO Trains (playerID, coachID)
VALUES ('P002', 'C001');

INSERT INTO Trains (playerID, coachID)
VALUES ('P003', 'C002');

INSERT INTO Trains (playerID, coachID)
VALUES ('P001', 'C005');


-- Sustains

INSERT INTO Sustains (cause, timeOfOccurence, otherPartiesInvolved, playerID)
VALUES ('Impact', TO_TIMESTAMP('2007-07-07 09:00', 'YYYY-MM-DD HH24:MI'), 'Opponent Player', 'P001');

INSERT INTO Sustains (cause, timeOfOccurence, otherPartiesInvolved, playerID)
VALUES ('Collision', TO_TIMESTAMP('2023-02-28 15:00', 'YYYY-MM-DD HH24:MI'), 'N/A', 'P002');

INSERT INTO Sustains (cause, timeOfOccurence, otherPartiesInvolved, playerID)
VALUES ('Collision', TO_TIMESTAMP('2023-02-27 19:15', 'YYYY-MM-DD HH24:MI'), 'Teammate', 'P003');


-- SELECT * FROM Treatment;
-- SELECT * FROM Injury;
-- SELECT * FROM NumPlayers;
-- SELECT * FROM Specialization;
-- SELECT * FROM Coach;
-- SELECT * FROM SportsSchedule;
-- SELECT * FROM GameGroupAgenda;
-- SELECT * FROM GameSchedule;
-- SELECT * FROM TrainingSchedule;
-- SELECT * FROM Contributes;
-- SELECT * FROM playerHasRankingIsInTeamFollows;
-- SELECT * FROM hasPhysicalCharacteristic;
-- SELECT * FROM displaysPerformance;
-- SELECT * FROM Trains;
-- SELECT * FROM Sustains;
-- SELECT * FROM Game;
-- SELECT * FROM Team;
-- SELECT * FROM Coach;

commit work;