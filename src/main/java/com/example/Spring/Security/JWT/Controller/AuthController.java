package com.example.Spring.Security.JWT.Controller;


import com.example.Spring.Security.JWT.DT0.LoginUser;
import com.example.Spring.Security.JWT.DT0.RegisterUser;
import com.example.Spring.Security.JWT.DT0.VerifyUser;
import com.example.Spring.Security.JWT.Responses.LoginResponse;
import com.example.Spring.Security.JWT.Service.AuthService;
import com.example.Spring.Security.JWT.Service.JwtService;
import com.example.Spring.Security.JWT.model.User;
import com.example.Spring.Security.JWT.model.UserRepository;
import jakarta.servlet.Registration;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/auth")
@RestController
public class AuthController {
    private final JwtService jwtService;
    private final AuthService authService;

    public AuthController(JwtService jwtService, AuthService authService) {
        this.jwtService = jwtService;
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<User> register(@RequestBody RegisterUser registerUser){
        User registeredUser = authService.signup(registerUser);
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUser loginUser){
        User authenticatedUser = authService.authenticate(loginUser);
        String token = jwtService.generateToken(authenticatedUser);
        LoginResponse loginResponse = new LoginResponse(token,jwtService.getExpirationTime());
        return ResponseEntity.ok(loginResponse);

    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyUser(@RequestBody VerifyUser verifyUser){
        try{
            authService.verifyUser(verifyUser);
            return ResponseEntity.ok("User has been verified");
        }
        catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @PostMapping("/resend")
    public ResponseEntity<?> resendVerificationCode(@RequestParam String email){
        try{
            authService.resendVerificationCode(email);
            return ResponseEntity.ok("Verification code has been sent");
        }
        catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
