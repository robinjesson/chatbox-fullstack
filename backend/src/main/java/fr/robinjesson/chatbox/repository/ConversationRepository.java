package fr.robinjesson.chatbox.repository;

import fr.robinjesson.chatbox.entities.ConversationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConversationRepository extends JpaRepository<ConversationEntity, Long> {
    List<ConversationEntity> findByParticipantsUid(String uid);

    default ConversationEntity findConcreteById(final Long id) {
        return findById(id).orElseThrow(() -> new RuntimeException("Entity not found with id: " + id));
    }
}
