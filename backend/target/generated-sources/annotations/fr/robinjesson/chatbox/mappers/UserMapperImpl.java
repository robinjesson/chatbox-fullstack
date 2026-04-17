package fr.robinjesson.chatbox.mappers;

import fr.robinjesson.chatbox.api.request.LoginRequest;
import fr.robinjesson.chatbox.api.request.RegisterUserRequest;
import fr.robinjesson.chatbox.api.response.UserResponse;
import fr.robinjesson.chatbox.entities.UserEntity;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-17T20:29:51+0200",
    comments = "version: 1.6.3, compiler: javac, environment: Java 25 (GraalVM Community)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserEntity mapToEntity(RegisterUserRequest source) {
        if ( source == null ) {
            return null;
        }

        UserEntity.UserEntityBuilder userEntity = UserEntity.builder();

        userEntity.uid( source.uid() );
        userEntity.email( source.email() );
        userEntity.password( source.password() );

        return userEntity.build();
    }

    @Override
    public UserEntity mapToEntity(LoginRequest source) {
        if ( source == null ) {
            return null;
        }

        UserEntity.UserEntityBuilder userEntity = UserEntity.builder();

        userEntity.uid( source.uid() );
        userEntity.password( source.password() );

        return userEntity.build();
    }

    @Override
    public UserResponse mapToResponse(UserEntity source) {
        if ( source == null ) {
            return null;
        }

        String uid = null;
        String email = null;

        uid = source.getUid();
        email = source.getEmail();

        UserResponse userResponse = new UserResponse( uid, email );

        return userResponse;
    }

    @Override
    public List<UserResponse> mapToResponse(List<UserEntity> source) {
        if ( source == null ) {
            return null;
        }

        List<UserResponse> list = new ArrayList<UserResponse>( source.size() );
        for ( UserEntity userEntity : source ) {
            list.add( mapToResponse( userEntity ) );
        }

        return list;
    }
}
