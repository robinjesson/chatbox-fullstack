import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import {
  Configuration,
  ConversationControllerApi,
  type MessageResponse,
  type UserResponse,
} from "../../api";
import ConversationList from "../ConversationList/ConversationList";
import Message from "../Message/Message";
import MessageForm from "../MessageForm/MessageForm";

const convApi = new ConversationControllerApi(
  new Configuration({
    basePath: "http://localhost:8080",
    credentials: "include",
  }),
);

interface ChatboxProps {
  user: UserResponse;
}

const Chatbox = ({ user }: ChatboxProps) => {
  const queryClient = useQueryClient();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [conversationId, setConversationId] = useState<number>(1);
  const { data: messages } = useQuery({
    queryKey: ["conversation", conversationId],
    queryFn: () => convApi.findMessagesByConversationId({ conversationId }),
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    try {
      const eventSource = new EventSource(
        `http://localhost:8080/conversations/${conversationId}/open`,
        { withCredentials: true },
      );

      eventSource.onmessage = (event) => {
        const receivedEvent: MessageResponse = JSON.parse(event.data);
        queryClient.setQueryData<MessageResponse[]>(
          ["conversation", conversationId],
          (oldData) => {
            if (!oldData) return [receivedEvent];

            // Sécurité : on vérifie si le message n'est pas déjà là (doublon)
            if (oldData.some((m) => m.id === receivedEvent.id)) return oldData;

            return [...oldData, receivedEvent];
          },
        );
      };

      return () => {
        console.log("close connection");
        eventSource.close();
      };
    } catch (error) {
      console.log("error ----", error);
    }
  }, [conversationId]);

  return (
    <>
      <div className="min-w-[20%] max-w-[50%] text-sm">
        <ConversationList setConversationId={setConversationId} />
      </div>
      <div className="flex-out-column">
        <div className="flex-in">
          {messages?.length ? (
            messages.map((message, index) => (
              <Message
                key={message.id}
                ref={index === messages.length - 1 ? messagesEndRef : null}
                text={message.text!}
                sender={message.user?.uid!}
                isMine={message.user?.uid === user.uid}
              />
            ))
          ) : (
            <p>No messages found.</p>
          )}
        </div>
        <MessageForm conversationId={conversationId} />
      </div>
    </>
  );
};

export default Chatbox;
