package ca.ubc.cs304.controller;

import ca.ubc.cs304.model.CoachModel;
import ca.ubc.cs304.model.PlayerHasRankingIsInTeamFollowsModel;
import ca.ubc.cs304.model.TeamModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@CrossOrigin
public class teamController {
    @Autowired
    private Controller controller;


//    moved to apiController
//    @GetMapping("/high-performing-teams")
//    public ArrayList<String> getHighPerformingTeams() {
//        return controller.showHighPerformingTeams();
//    }

    // this is not restful
    @GetMapping("team?type={type}&name={name}&division={division}")
    public TeamModel getTeamByModel(@PathVariable("type") String type,
                                    @PathVariable("name") String name,
                                    @PathVariable("division") String division) {
        return controller.getTeamByModel(type, name, division);
    }

    //    moved to apiController
//    @GetMapping("best-performing-team")
//    public TeamModel getBestPerformingTeam() {
//        return controller.showBestPerformingTeam();
//    }

    //    // previously
//    @GetMapping("/coaches/division/{teamName}")
//    public ArrayList<CoachModel> coachedAllPlayersInGivenTeam(@PathVariable("teamName") String teamName) {
//        return controller.coachedAllPlayersInGivenTeam(teamName);
//    }
    // get all coaches taht have worked with team division
    @GetMapping("/teams/{teamName}/coaches")
    public ArrayList<CoachModel> coachedAllPlayersInGivenTeam(@PathVariable("teamName") String teamName) {
        String str = teamName.replaceAll("%20", " ");
        return controller.coachedAllPlayersInGivenTeam(teamName);
    }

}
