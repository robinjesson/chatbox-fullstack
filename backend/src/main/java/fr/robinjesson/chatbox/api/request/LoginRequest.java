package fr.robinjesson.chatbox.api.request;

public record LoginRequest(
        String uid,
        String password
) { }
