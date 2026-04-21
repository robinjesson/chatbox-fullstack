package fr.robinjesson.chatbox.repository;

import fr.robinjesson.chatbox.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, String> {

    default UserEntity findConcreteById(final String id) {
        return findById(id).orElseThrow(() -> new RuntimeException("Entity not found with id: " + id));
    }
}
