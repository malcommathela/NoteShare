package com.example.Spring.Security.JWT.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaForwardController {

    @GetMapping({
            "/share/**",
            "/login",
            "/signup",
            "/notes/**"
    })
    public String forward() {
        return "forward:/index.html";
    }
}

