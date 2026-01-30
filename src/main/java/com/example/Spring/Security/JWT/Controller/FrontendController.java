package com.example.Spring.Security.JWT.Controller;

import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FrontendController {

    @GetMapping(value = {
            "/",
            "/login",
            "/register",
            "/{path:^(?!auth|api|swagger-ui|v3).*}"
    })
    public String forward() {
        return "forward:/index.html";
    }
}
