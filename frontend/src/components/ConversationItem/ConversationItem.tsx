import type { ConversationResponse } from "../../api";

const ConversationItem = ({
  conversation,
  setConversationId,
}: {
  conversation: ConversationResponse;
  setConversationId: (id: number) => void;
}) => {
  return (
    <li>
      <a onClick={() => setConversationId(conversation.id!)}>
        {conversation.participants
          ?.map((participant) => participant.uid)
          .join(", ")}
      </a>
    </li>
  );
};

export default ConversationItem;
