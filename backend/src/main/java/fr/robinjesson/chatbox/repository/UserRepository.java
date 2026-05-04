package fr.robinjesson.chatbox.repository;

import fr.robinjesson.chatbox.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, String>, JpaSpecificationExecutor<UserEntity> {

    default UserEntity findConcreteById(final String id) {
        return findById(id).orElseThrow(() -> new RuntimeException("Entity not found with id: " + id));
    }
}
