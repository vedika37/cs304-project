package ca.ubc.cs304;

import ca.ubc.cs304.controller.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;

import java.beans.BeanProperty;

@SpringBootApplication
public class Application {
    private static Controller controller = new Controller();

    @Bean
    public Controller controller() {
        return controller;
    }

    public static void main(String args[]) {
        SpringApplicationBuilder builder = new SpringApplicationBuilder(Application.class);

        builder.headless(false);

        ConfigurableApplicationContext context = builder.run(args);
        controller.start();
    }



}
