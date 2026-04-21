import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Configuration,
  ConversationControllerApi,
  type MessageRequest,
  type MessageResponse,
  type UserResponse,
} from "../../api";
import ConversationList from "../ConversationList/ConversationList";
import Message from "../Message/Message";

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
  const { register, handleSubmit, getValues, reset } =
    useForm<MessageRequest>();
  const queryClient = useQueryClient();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [conversationId, setConversationId] = useState<number>(1);
  const { data: messages } = useQuery({
    queryKey: ["conversation", conversationId],
    queryFn: () => convApi.findMessagesByConversationId({ conversationId }),
  });

  console.log("render chatbox", { messages });

  const onSubmit = () => {
    convApi
      .createMessage({
        conversationId,
        messageRequest: getValues(),
      })
      .then(() => {
        reset();
      })
      .catch(() => {
        console.error("Invalid credentials");
      });
  };

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
    <div className="flex h-full  w-full gap-4">
      <div className="min-w-[20%] max-w-[50%] text-sm">
        <ConversationList setConversationId={setConversationId} />
      </div>
      <div className="flex flex-col flex-1 h-full">
        <div className="flex-1 flex flex-col overflow-auto">
          {messages?.length ? (
            messages.map((message, index) => (
              <Message
                key={message.id}
                ref={index === messages.length - 1 ? messagesEndRef : null}
                text={message.text!}
                sender={message.user?.uid!}
                isMine={message.user?.uid === user.uid}
                last={index === messages.length - 1}
              />
            ))
          ) : (
            <p>No messages found.</p>
          )}
        </div>
        <form className="flex gap-4 pt-4" onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder="Message" {...register("text")} />
          <button type="submit" className="flex-1 cursor-pointer">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbox;
