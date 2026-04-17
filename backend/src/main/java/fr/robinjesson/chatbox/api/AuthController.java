package fr.robinjesson.chatbox.api;

import fr.robinjesson.chatbox.adapter.AuthAdapter;
import fr.robinjesson.chatbox.adapter.UserAdapter;
import fr.robinjesson.chatbox.api.request.LoginRequest;
import fr.robinjesson.chatbox.api.request.RegisterUserRequest;
import fr.robinjesson.chatbox.api.response.UserResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserAdapter userAdapter;
    private final AuthAdapter authAdapter;

    @PostMapping("/signup")
    @Operation(summary = "Register a new user")
    public ResponseEntity<UserResponse> signup(@RequestBody final RegisterUserRequest registerUserRequest) {
        return ResponseEntity.ok(userAdapter.signup(registerUserRequest));
    }

    @PostMapping("/login")
    @Operation(summary = "Authenticate a user and return a JWT token in an HTTP-only cookie")
    public ResponseEntity<Void> login(@RequestBody final LoginRequest loginRequest) {
        return ResponseEntity.noContent()
                .header(HttpHeaders.SET_COOKIE, authAdapter.authenticate(loginRequest).toString())
                .build();
    }

    @PostMapping("/logout")
    @Operation(summary = "Logout a user by removing the JWT token from HTTP-only cookie")
    public ResponseEntity<Void> logout() {
        return ResponseEntity.noContent()
                .header(HttpHeaders.SET_COOKIE, authAdapter.logout().toString())
                .build();
    }
}
