package com.example.Spring.Security.JWT.Controller;

import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FrontendController {

    @RequestMapping(value = {
            "/{path:^(?!api|auth|swagger-ui|v3).*$}",
            "/**/{path:^(?!api|auth|swagger-ui|v3).*$}"
    })
    public String forward() {
        return "forward:/index.html";
    }
}
