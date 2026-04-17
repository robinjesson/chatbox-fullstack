package fr.robinjesson.chatbox.adapter;

import fr.robinjesson.chatbox.api.request.RegisterUserRequest;
import fr.robinjesson.chatbox.api.response.UserResponse;
import fr.robinjesson.chatbox.business.UserBusiness;
import fr.robinjesson.chatbox.entities.UserEntity;
import fr.robinjesson.chatbox.mappers.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserAdapter {
    private final UserMapper userMapper;
    private final UserBusiness userBusiness;

    public UserResponse signup(final RegisterUserRequest registerUserRequest) {
        UserEntity userEntity = userMapper.mapToEntity(registerUserRequest);
        userEntity.setLastPasswordModification(LocalDateTime.now());
        userEntity = userBusiness.create(userEntity);
        return userMapper.mapToResponse(userEntity);
    }

    public List<UserResponse> findAll() {
        return userMapper.mapToResponse(userBusiness.findAll());
    }
}
