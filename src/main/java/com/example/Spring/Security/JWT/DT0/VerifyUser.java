package com.example.Spring.Security.JWT.DT0;

import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
public class VerifyUser {

    private String email;
    private String verificationCode;

}
