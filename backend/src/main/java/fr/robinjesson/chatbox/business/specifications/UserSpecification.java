package fr.robinjesson.chatbox.business.specifications;

import fr.robinjesson.chatbox.entities.UserEntity;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class UserSpecification {

    public static Specification<UserEntity> searchUsers(final String search) {
        return (root, query, criteriaBuilder) -> {
            if(search == null || search.isEmpty())
                return criteriaBuilder.conjunction();
            return criteriaBuilder.like(root.get("uid"), "%" + search + "%");
        };
    }
}
