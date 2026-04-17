package fr.robinjesson.chatbox.api.response;

import java.util.List;

public record ConversationResponse(
        Long id,
        List<UserResponse> participants
) { }
