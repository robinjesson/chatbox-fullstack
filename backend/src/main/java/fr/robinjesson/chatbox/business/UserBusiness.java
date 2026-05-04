package fr.robinjesson.chatbox.business;

import fr.robinjesson.chatbox.business.specifications.UserSpecification;
import fr.robinjesson.chatbox.entities.UserEntity;
import fr.robinjesson.chatbox.repository.UserRepository;
import fr.robinjesson.chatbox.security.ConnectedUser;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserBusiness {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ConnectedUser connectedUser;

    public UserEntity create(final UserEntity user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        final Optional<UserEntity> existingUser = userRepository.findById(user.getUid());
        if(existingUser.isPresent())
            throw new RuntimeException("User %s already exists".formatted(user.getUid()));
        return userRepository.save(user);
    }

    public UserEntity findConnectedUser() {
        return userRepository.findConcreteById(connectedUser.getUid());
    }

    public List<UserEntity> findAll(final String search) {
        return userRepository.findAll(UserSpecification.searchUsers(search));
    }
}
