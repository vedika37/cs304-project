package ca.ubc.cs304.controller;


import ca.ubc.cs304.model.CoachModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@CrossOrigin
public class coachesController {
    @Autowired
    private Controller controller;

    @PostMapping("/coaches/insert/{coachID}/{name}/{phoneNumber}/{specialization}")
    public String insertCoach(@PathVariable String coachID, @PathVariable String name, @PathVariable String phoneNumber,
                        @PathVariable String specialization) {
        CoachModel coachModel = new CoachModel(coachID, name, phoneNumber, specialization);
        return controller.insertCoach(coachModel);
    }

    @GetMapping("/coaches")
    public CoachModel[] getCoaches() {
        return controller.getCoaches();
    }

    @GetMapping("/coaches/{id}")
    public CoachModel getCoachByCoachID(@PathVariable("id") String coachID) {
        System.out.println(coachID);
        return controller.getCoachByCoachID(coachID);
    }

    @PutMapping("/coaches/update/{coachID}/{name}/{phoneNumber}/{specialization}")
    public String updateCoach(@PathVariable String coachID, @PathVariable String name, @PathVariable String phoneNumber,
                              @PathVariable String specialization) {
        return controller.updateCoach(coachID, name, phoneNumber, specialization);
    }

    @GetMapping("/coaches/division/{teamName}")
    public ArrayList<CoachModel> coachedAllPlayersInGivenTeam(@PathVariable("teamName") String teamName) {
        return controller.coachedAllPlayersInGivenTeam(teamName);
    }

    @DeleteMapping("/coaches/delete/{id}")
    public String deleteCoach(@PathVariable("id")  String coachID) {
        return controller.deleteCoach(coachID);
    }

    @DeleteMapping("/specialization/delete/{specialization}")
    public String deleteSpecialization(@PathVariable("specialization")  String specialization) {
        return controller.deleteSpecialization(specialization);
    }

}