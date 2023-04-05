package ca.ubc.cs304.controller;


import ca.ubc.cs304.model.PlayerHasRankingIsInTeamFollowsModel;
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

    // TODO not complete
    // this should really be in a rankings controller but since we dont really use it besides for this its here for now
    @GetMapping("/rankings/{season}")
    public ArrayList<PlayerHasRankingIsInTeamFollowsModel> getRankingsBySeason(@PathVariable("season") String season) {
        return controller.getRankingsBySeason(season);
    }

    // TODO ???? what is this?
    @GetMapping("/playerCount")
    public HashMap<String, Integer> showCountOfAllTeams() {
        return controller.showCountOfAllTeams();
    }


    // moved to apiController as it is more appropriate
//    @GetMapping("/players/TheLions")
//    public PlayerHasRankingIsInTeamFollowsModel showStarPlayers() {
//        String teamName = "The Lions";
//         return controller.showStarPlayer(teamName);
//    }

}