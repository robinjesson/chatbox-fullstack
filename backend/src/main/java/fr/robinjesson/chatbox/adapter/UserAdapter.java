package fr.robinjesson.chatbox.adapter;

import fr.robinjesson.chatbox.api.request.LoginRequest;
import fr.robinjesson.chatbox.api.response.UserResponse;
import fr.robinjesson.chatbox.business.UserBusiness;
import fr.robinjesson.chatbox.entities.UserEntity;
import fr.robinjesson.chatbox.mappers.UserMapper;
import fr.robinjesson.chatbox.security.ConnectedUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserAdapter {
    private final UserMapper userMapper;
    private final UserBusiness userBusiness;

    public UserResponse signup(final LoginRequest loginRequest) {
        UserEntity userEntity = userMapper.mapToEntity(loginRequest);
        userEntity.setLastPasswordModification(LocalDateTime.now());
        userEntity = userBusiness.create(userEntity);
        return userMapper.mapToResponse(userEntity);
    }

    public UserResponse me() {
        final UserEntity userEntity = userBusiness.findConnectedUser();
        return userMapper.mapToResponse(userEntity);
    }

    public List<UserResponse> findAll(final String search) {
        return userMapper.mapToResponse(userBusiness.findAll(search));
    }
}
