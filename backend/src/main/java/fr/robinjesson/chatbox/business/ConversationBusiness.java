package fr.robinjesson.chatbox.business;

import fr.robinjesson.chatbox.entities.ConversationEntity;
import fr.robinjesson.chatbox.entities.MessageEntity;
import fr.robinjesson.chatbox.repository.ConversationRepository;
import fr.robinjesson.chatbox.repository.MessageRepository;
import fr.robinjesson.chatbox.repository.UserRepository;
import fr.robinjesson.chatbox.security.ConnectedUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ConversationBusiness {
    private final ConversationRepository conversationRepository;
    private final UserBusiness userBusiness;
    private final UserRepository userRepository;
    private final MessageRepository messageRepository;
    private final ConnectedUser connectedUser;

    public List<ConversationEntity> findForConnectedUser() {
        return conversationRepository.findByParticipantsUid(connectedUser.getUid());
    }

    public List<MessageEntity> findMessagesByConversationId(final Long conversationId) {
        if (!conversationRepository.existsById(conversationId)) {
            throw new RuntimeException("Conversation not found");
        }
        return messageRepository.findByConversationId(conversationId);
    }

    public ConversationEntity create(final List<String> participantUids) {
        final ConversationEntity conversation = new ConversationEntity();
        conversation.setParticipants(
                participantUids.stream()
                        .map(userRepository::findConcreteById)
                        .toList()
        );
        return conversationRepository.save(conversation);
    }

    public MessageEntity createMessageForUser(final Long conversationId, String text) {
        final MessageEntity message = new MessageEntity();
        message.setText(text);
        message.setUser(userBusiness.findConnectedUser());
        message.setConversation(conversationRepository.findConcreteById(conversationId));
        return messageRepository.save(message);
    }
}
