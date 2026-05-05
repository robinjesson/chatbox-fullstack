import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Configuration, ConversationControllerApi } from "../../api";
import { useUser } from "../../hooks";
import ConversationItem from "../ConversationItem/ConversationItem";
import CreateConversationDialog from "../CreateConversationDialog/CreateConversationDialog";

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
  const me = useUser();
  const { data: conversations } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => convApi.findForConnectedUser(),
    enabled: me != null,
  });
  const [open, setOpen] = useState(false);

  const addConversationButton = (
    <li>
      <a onClick={() => setOpen(true)}>Add</a>
    </li>
  );

  if (!conversations?.length) return addConversationButton;

  return (
    <>
      <CreateConversationDialog isOpen={open} onClose={() => setOpen(false)} />
      <ul className="menu bg-base-200 rounded-box w-56">
        {conversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            setConversationId={setConversationId}
          />
        ))}
        {addConversationButton}
      </ul>
    </>
  );
};

export default ConversationList;
