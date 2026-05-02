package fr.robinjesson.chatbox.mappers;

import fr.robinjesson.chatbox.api.response.ConversationResponse;
import fr.robinjesson.chatbox.api.response.UserResponse;
import fr.robinjesson.chatbox.entities.ConversationEntity;
import fr.robinjesson.chatbox.entities.UserEntity;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-05-02T20:57:08+0200",
    comments = "version: 1.6.3, compiler: javac, environment: Java 25 (GraalVM Community)"
)
@Component
public class ConversationMapperImpl implements ConversationMapper {

    @Override
    public ConversationResponse mapToResponse(ConversationEntity entity) {
        if ( entity == null ) {
            return null;
        }

        Long id = null;
        List<UserResponse> participants = null;

        id = entity.getId();
        participants = userEntityListToUserResponseList( entity.getParticipants() );

        ConversationResponse conversationResponse = new ConversationResponse( id, participants );

        return conversationResponse;
    }

    @Override
    public List<ConversationResponse> mapToResponse(List<ConversationEntity> entities) {
        if ( entities == null ) {
            return null;
        }

        List<ConversationResponse> list = new ArrayList<ConversationResponse>( entities.size() );
        for ( ConversationEntity conversationEntity : entities ) {
            list.add( mapToResponse( conversationEntity ) );
        }

        return list;
    }

    protected UserResponse userEntityToUserResponse(UserEntity userEntity) {
        if ( userEntity == null ) {
            return null;
        }

        String uid = null;

        uid = userEntity.getUid();

        UserResponse userResponse = new UserResponse( uid );

        return userResponse;
    }

    protected List<UserResponse> userEntityListToUserResponseList(List<UserEntity> list) {
        if ( list == null ) {
            return null;
        }

        List<UserResponse> list1 = new ArrayList<UserResponse>( list.size() );
        for ( UserEntity userEntity : list ) {
            list1.add( userEntityToUserResponse( userEntity ) );
        }

        return list1;
    }
}
