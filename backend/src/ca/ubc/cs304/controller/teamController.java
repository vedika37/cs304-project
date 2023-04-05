package ca.ubc.cs304.controller;

import ca.ubc.cs304.model.TeamModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@CrossOrigin
public class teamController {
    @Autowired
    private Controller controller;

    @GetMapping("/team")
    public ArrayList<String> highPerformingTeams() {
        return controller.showHighPerformingTeams();
    }

    @GetMapping("/team/best")
    public TeamModel bestPerformingTeam() {
        return controller.showBestPerformingTeam();
    }
}
