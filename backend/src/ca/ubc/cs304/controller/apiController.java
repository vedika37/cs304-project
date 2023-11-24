package ca.ubc.cs304.controller;

import ca.ubc.cs304.model.PlayerHasRankingIsInTeamFollowsModel;
import ca.ubc.cs304.model.TeamModel;
import ca.ubc.cs304.model.TopTeamInfoModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class apiController {

    @Autowired
    private Controller controller;

    // was previously in player...Controler
//    @GetMapping("/players/TheLions")
//    public PlayerHasRankingIsInTeamFollowsModel showStarPlayer() {
//        String teamName = "The Lions";
//        return controller.showStarPlayer(teamName);
//    }
    @GetMapping("/get-star-players/{teamName}")
    public PlayerHasRankingIsInTeamFollowsModel getStarPlayer(@PathVariable("teamName") String teamName) {
//        String teamName = "The Lions";
        String str = teamName.replaceAll("%20", " ");
        return controller.showStarPlayer(teamName);
    }

    //    was previously in teamController
//    @GetMapping("/high-performing-teams")
//    public ArrayList<String> getHighPerformingTeams() {
//        return controller.showHighPerformingTeams();
//    }
    @GetMapping("/high-performing-teams")
    public ArrayList<String> getHighPerformingTeams() {
        return controller.getHighPerformingTeams();
    }

    //    was previously in teamController
//    @GetMapping("best-performing-team")
//    public TeamModel getBestPerformingTeam() {
//        return controller.showBestPerformingTeam();
//    }
    @GetMapping("/best-performing-team")
    public TeamModel getBestPerformingTeam() {
        return controller.getBestPerformingTeam();
    }



}
