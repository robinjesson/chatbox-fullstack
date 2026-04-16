package fr.robinjesson.chatbox.security;

import fr.robinjesson.chatbox.entities.UserEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserContextLoader {

    private final ConnectedUser connectedUser;

    public void loadUserFromSecurityContext() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.getPrincipal() instanceof UserEntity user) {
            connectedUser.setUid(user.getUid());
            connectedUser.setEmail(user.getEmail());
            // Ajoutez d'autres champs si nécessaire
        }
    }
}
