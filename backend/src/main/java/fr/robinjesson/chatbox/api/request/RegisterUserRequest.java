package fr.robinjesson.chatbox.api.request;

public record RegisterUserRequest(
        String uid,
        String email,
        String password
) { }
