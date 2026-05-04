package fr.robinjesson.chatbox.api;

import fr.robinjesson.chatbox.adapter.UserAdapter;
import fr.robinjesson.chatbox.api.response.UserResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/suers")
@RequiredArgsConstructor
public class UserController {

    private final UserAdapter userAdapter;

    @GetMapping
    @Operation(summary = "Get all users")
    public ResponseEntity<List<UserResponse>> getAllUsers(@RequestParam("q") final String search) {
        return ResponseEntity.ok(userAdapter.findAll(search));
    }
}
