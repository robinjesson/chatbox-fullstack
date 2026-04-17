package fr.robinjesson.chatbox.mappers;

import fr.robinjesson.chatbox.api.request.LoginRequest;
import fr.robinjesson.chatbox.api.request.RegisterUserRequest;
import fr.robinjesson.chatbox.api.response.UserResponse;
import fr.robinjesson.chatbox.entities.UserEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(config = MapperConfiguration.class)
public interface UserMapper {
    UserEntity mapToEntity(RegisterUserRequest source);
    UserEntity mapToEntity(LoginRequest source);
    UserResponse mapToResponse(UserEntity source);
    List<UserResponse> mapToResponse(List<UserEntity> source);
}
