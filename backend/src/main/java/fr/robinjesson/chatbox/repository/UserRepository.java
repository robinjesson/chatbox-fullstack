package fr.robinjesson.chatbox.repository;

import fr.robinjesson.chatbox.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, String> {

    Optional<UserEntity> findByEmail(String email);

    default UserEntity findConcreteById(final String id) {
        return findById(id).orElseThrow(() -> new RuntimeException("Entity not found with id: " + id));
    }
}
