package fr.robinjesson.chatbox.mappers;

import fr.robinjesson.chatbox.api.response.MessageResponse;
import fr.robinjesson.chatbox.entities.MessageEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(config = MapperConfiguration.class, uses = {
        UserMapper.class,
        ConversationMapper.class
})
public interface MessageMapper {
    MessageResponse mapToResponse(MessageEntity entity);

    List<MessageResponse> mapToResponse(List<MessageEntity> entities);
}
