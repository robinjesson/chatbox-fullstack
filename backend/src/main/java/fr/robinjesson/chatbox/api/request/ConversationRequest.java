package fr.robinjesson.chatbox.api.request;

import java.util.List;

public record ConversationRequest(
        List<String> participantUids
) {
}
