import { useQuery } from "@tanstack/react-query";
import { Configuration, ConversationControllerApi } from "../../api";
import ConversationItem from "../ConversationItem/ConversationItem";

const convApi = new ConversationControllerApi(
  new Configuration({
    basePath: "http://localhost:8080",
    credentials: "include",
  }),
);

const ConversationList = ({
  setConversationId,
}: {
  setConversationId: (id: number) => void;
}) => {
  const { data: conversations } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => convApi.findForConnectedUser(),
  });

  if (conversations == null) return <p>Loading conversations...</p>;

  if (!conversations.length) return <p>No conversations found.</p>;

  return (
    <ul className="menu bg-base-200 rounded-box w-56">
      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation.id}
          conversation={conversation}
          setConversationId={setConversationId}
        />
      ))}
    </ul>
  );
};

export default ConversationList;
