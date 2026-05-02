package fr.robinjesson.chatbox.mappers;

import fr.robinjesson.chatbox.api.response.ConversationResponse;
import fr.robinjesson.chatbox.entities.ConversationEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(config = MapperConfiguration.class)
public interface ConversationMapper {
    ConversationResponse mapToResponse(ConversationEntity entity);
    List<ConversationResponse> mapToResponse(List<ConversationEntity> entities);
}
