package ca.ubc.cs304.controller;


import ca.ubc.cs304.model.CoachModel;
import ca.ubc.cs304.model.PlayerHasRankingIsInTeamFollowsModel;
import ca.ubc.cs304.model.SportsScheduleModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;

@RestController
@CrossOrigin
public class playerHasRankingIsInTeamFollowsController {
    @Autowired
    private Controller controller;

    @GetMapping("/players")
    public PlayerHasRankingIsInTeamFollowsModel[] getPlayers() {
        return controller.getPlayers();
    }

    @GetMapping("players/{playerID}")
    public PlayerHasRankingIsInTeamFollowsModel getPlayerByPlayerID(@PathVariable("playerID") String playerID) {
        return controller.getPlayerByPlayerID(playerID);
    }

//    @GetMapping("/players/{season}")
//    public ArrayList<PlayerHasRankingIsInTeamFollowsModel> rankBySeason(@PathVariable("season") String season) {
//        return controller.rankBySeason(season);
//    }
//
//    @GetMapping("/playerCount")
//    public HashMap<String, Integer> showCountOfAllTeams() {
//        return controller.showCountOfAllTeams();
//    }
//
//    @GetMapping("/players/TheLions")
//    public PlayerHasRankingIsInTeamFollowsModel showStarPlayers() {
//        String teamName = "The Lions";
//         return controller.showStarPlayer(teamName);
//    }

}