package ca.ubc.cs304.controller;


import ca.ubc.cs304.model.CoachOptionModel;
import ca.ubc.cs304.model.PlayerOptionModel;
import ca.ubc.cs304.model.SeasonOptionModel;
import ca.ubc.cs304.model.TeamOptionModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/options")
public class optionsController {
    @Autowired
    private Controller controller;

    @GetMapping("/coaches")
    public CoachOptionModel[] getCoachOptions() {
        return controller.getCoachOptions();
    }

    @GetMapping("/players")
    public PlayerOptionModel[] getPlayerOptions() { return controller.getPlayerOptions();}

    @GetMapping("/teams")
    public TeamOptionModel[] getTeamOptions() { return controller.getTeamOptions();}

    @GetMapping("/seasons")
    public SeasonOptionModel[] getSeasonOptions() { return controller.getSeasonOptions();}
}
