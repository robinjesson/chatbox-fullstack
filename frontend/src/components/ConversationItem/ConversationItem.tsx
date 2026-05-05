import type { ConversationResponse } from "../../api";
import ListParticipants from "../ListParticipants/ListParticipants";

const ConversationItem = ({
  conversation,
  setConversationId,
}: {
  conversation: ConversationResponse;
  setConversationId: (id: number) => void;
}) => {
  const uids =
    conversation.participants?.map((participant) => participant.uid ?? "") ??
    [];
  return (
    <li>
      <a onClick={() => setConversationId(conversation.id!)}>
        <div className="flex flex-wrap gap-0.5">
          <ListParticipants participantUids={uids} />
        </div>
      </a>
    </li>
  );
};

export default ConversationItem;
