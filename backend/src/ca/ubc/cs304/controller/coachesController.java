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

//    @PostMapping("/coaches/insert/{coachID}/{name}/{phoneNumber}/{specialization}")
//    public String insertCoach(@PathVariable String coachID, @PathVariable String name, @PathVariable String phoneNumber,
//                        @PathVariable String specialization) {
//        CoachModel coachModel = new CoachModel(coachID, name, phoneNumber, specialization);
//        return controller.insertCoach(coachModel);
//    }
    @PostMapping("/coaches")
    public String insertCoach(@RequestBody CoachModel coach) {
//        System.out.println("id: "+coach.getCoachID());
//        System.out.println("name: "+coach.getName());
//        System.out.println("phonenumber: "+coach.getPhoneNumber());
//        System.out.println("spec: "+coach.getSpecialization());

        return controller.insertCoach(coach);
    }

//    @PutMapping("/coaches/update/{coachID}/{name}/{phoneNumber}/{specialization}")
//    public String updateCoach(@PathVariable String coachID, @PathVariable String name, @PathVariable String phoneNumber,
//                              @PathVariable String specialization) {
//        return controller.updateCoach(coachID, name, phoneNumber, specialization);
//    }
    @PutMapping("/coaches/{id}")
    public String updateCoach(@PathVariable("id") String coachID, @RequestBody CoachModel coach) {
//        System.out.println("coachID: "+coachID);
//        System.out.println("id: "+coach.getCoachID());
//        System.out.println("name: "+coach.getName());
//        System.out.println("phonenumber: "+coach.getPhoneNumber());
//        System.out.println("spec: "+coach.getSpecialization());

        return controller.updateCoach(coachID, coach.getName(),coach.getPhoneNumber(),coach.getSpecialization());
    }

    @GetMapping("/coaches")
    public CoachModel[] getCoaches() {
        return controller.getCoaches();
    }

    @GetMapping("/coaches/{id}")
    public CoachModel getCoachByCoachID(@PathVariable("id") String coachID) {
//        System.out.println(coachID); //this was for debugging
        return controller.getCoachByCoachID(coachID);
    }



//    // moved to teamController
//    @GetMapping("/coaches/division/{teamName}")
//    public ArrayList<CoachModel> coachedAllPlayersInGivenTeam(@PathVariable("teamName") String teamName) {
//        return controller.coachedAllPlayersInGivenTeam(teamName);
//    }

    // unused
//    @DeleteMapping("/coaches/delete/{id}")
//    public String deleteCoach(@PathVariable("id")  String coachID) {
//        return controller.deleteCoach(coachID);
//    }


    @DeleteMapping("/specialization/{specialization}")
    public String deleteSpecialization(@PathVariable("specialization")  String specialization) {

        System.out.println(specialization);

        return controller.deleteSpecialization(specialization);
    }

}