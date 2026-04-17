package fr.robinjesson.chatbox.mappers;

import fr.robinjesson.chatbox.api.response.ConversationResponse;
import fr.robinjesson.chatbox.api.response.MessageResponse;
import fr.robinjesson.chatbox.api.response.UserResponse;
import fr.robinjesson.chatbox.entities.MessageEntity;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-17T20:29:51+0200",
    comments = "version: 1.6.3, compiler: javac, environment: Java 25 (GraalVM Community)"
)
@Component
public class MessageMapperImpl implements MessageMapper {

    private final UserMapper userMapper;
    private final ConversationMapper conversationMapper;

    @Autowired
    public MessageMapperImpl(UserMapper userMapper, ConversationMapper conversationMapper) {

        this.userMapper = userMapper;
        this.conversationMapper = conversationMapper;
    }

    @Override
    public MessageResponse mapToResponse(MessageEntity entity) {
        if ( entity == null ) {
            return null;
        }

        Long id = null;
        String text = null;
        UserResponse user = null;
        ConversationResponse conversation = null;

        id = entity.getId();
        text = entity.getText();
        user = userMapper.mapToResponse( entity.getUser() );
        conversation = conversationMapper.mapToResponse( entity.getConversation() );

        MessageResponse messageResponse = new MessageResponse( id, text, user, conversation );

        return messageResponse;
    }

    @Override
    public List<MessageResponse> mapToResponse(List<MessageEntity> entities) {
        if ( entities == null ) {
            return null;
        }

        List<MessageResponse> list = new ArrayList<MessageResponse>( entities.size() );
        for ( MessageEntity messageEntity : entities ) {
            list.add( mapToResponse( messageEntity ) );
        }

        return list;
    }
}
