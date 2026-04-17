package fr.robinjesson.chatbox.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "message")
@Getter
@Setter
public class MessageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String text;

    @ManyToOne
    @JoinColumn(name = "fk_conversation_id")
    private ConversationEntity conversation;

    @ManyToOne
    @JoinColumn(name = "fk_user_id")
    private UserEntity user;
}
