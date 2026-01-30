package com.example.Spring.Security.JWT.Controller;

import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FrontendController {

    @RequestMapping({
            "/login",
            "/signup",
            "/verify",
            "/notes"
    })
    public String forward() {
        return "forward:/index.html";
    }
}
