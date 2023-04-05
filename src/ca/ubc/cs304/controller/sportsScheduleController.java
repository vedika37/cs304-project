package ca.ubc.cs304.controller;


import ca.ubc.cs304.model.SportsScheduleModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@CrossOrigin
public class sportsScheduleController {
    @Autowired
    private Controller controller;

    @GetMapping("/sportsSchedule/{coachID}")
    public SportsScheduleModel[] showAllSchedulesMadeByCoach(@PathVariable("coachID") String coachID) {
        return controller.showAllSchedulesMadeByCoach(coachID);
    }



}