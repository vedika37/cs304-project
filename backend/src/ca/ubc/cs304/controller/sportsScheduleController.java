package ca.ubc.cs304.controller;


import ca.ubc.cs304.model.SportsScheduleModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class sportsScheduleController {
    @Autowired
    private Controller controller;

    //this url is incorrect for what it does (NOT RESTful) but works for now
    @GetMapping("/sportsSchedule/{coachID}")
    public SportsScheduleModel[] getAllSchedulesMadeByCoach(@PathVariable("coachID") String coachID) {
        return controller.getAllSchedulesMadeByCoach(coachID);
    }



}