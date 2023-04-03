package ca.ubc.cs304.controller;

import ca.ubc.cs304.model.CoachModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class testController {

    @Autowired
    private Controller controller;


    @GetMapping("/test")
    public String test() {
        System.out.println(controller);
        System.out.println(controller.testVar);
        System.out.println(controller.getpTestVar());
        return "TESTING PAGE!!!\n"+"testVar: "+controller.testVar+"\npTestVar: "+controller.getpTestVar();
    }

    @GetMapping("/testGetCoaches")
    public CoachModel[] testGetCoaches() {
        return controller.testGetCoaches();
    }


}
