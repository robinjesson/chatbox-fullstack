package fr.robinjesson.chatbox.api.response;

public record MessageResponse(
        Long id,
        String text,
        UserResponse user,
        ConversationResponse conversation
) { }
