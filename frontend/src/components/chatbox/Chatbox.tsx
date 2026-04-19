import {
  Configuration,
  ConversationControllerApi,
  type ConversationResponse,
  type MessageRequest,
  type MessageResponse,
  type UserResponse,
} from "../../api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

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
          ["conversation", 1],
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
    <div className="flex h-full gap-4">
      <div className="min-w-[20%] max-w-[50%]">
        <ConversationList setConversationId={setConversationId} />
      </div>
      <div className="flex flex-col h-full">
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

const Message = React.forwardRef<
  HTMLDivElement,
  {
    text: string;
    sender: string;
    isMine: boolean;
    last: boolean;
  }
>(({ text, sender, isMine, last }, ref) => {
  return (
    <div
      ref={ref}
      className={`flex flex-col gap-1 ${isMine ? "items-end" : "items-start"} ${!last ? "pb-2" : ""}`}
    >
      <small>{sender}</small>
      <div
        className={`max-w-[75%] p-2 ${isMine ? "bg-blue-500 text-white" : "bg-gray-100"}`}
      >
        {text}
      </div>
    </div>
  );
});
Message.displayName = "Message";

const ConversationList = ({
  setConversationId,
}: {
  setConversationId: (id: number) => void;
}) => {
  const { data: conversations } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => convApi.findForConnectedUser(),
  });

  return (
    <>
      {conversations?.map((conversation) => (
        <ConversationItem
          key={conversation.id}
          conversation={conversation}
          setConversationId={setConversationId}
        />
      ))}
    </>
  );
};

const ConversationItem = ({
  conversation,
  setConversationId,
}: {
  conversation: ConversationResponse;
  setConversationId: (id: number) => void;
}) => {
  return (
    <div
      className="p-4 border cursor-pointer"
      onClick={() => setConversationId(conversation.id!)}
    >
      {conversation.participants
        ?.map((participant) => participant.uid)
        .join(", ")}
    </div>
  );
};

export default Chatbox;
