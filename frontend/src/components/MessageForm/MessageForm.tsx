import { useForm } from "react-hook-form";
import {
  Configuration,
  ConversationControllerApi,
  type MessageRequest,
} from "../../api";

const convApi = new ConversationControllerApi(
  new Configuration({
    basePath: "http://localhost:8080",
    credentials: "include",
  }),
);

const MessageForm = ({ conversationId }: { conversationId: number }) => {
  const { register, handleSubmit, getValues, reset } =
    useForm<MessageRequest>();

  const onSubmit = () => {
    convApi
      .createMessage({
        conversationId,
        messageRequest: getValues(),
      })
      .then(() => {
        reset();
      });
  };

  return (
    <form className="flex gap-4 p-4" onSubmit={handleSubmit(onSubmit)}>
      <input
        className="input flex-1"
        type="text"
        placeholder="Message"
        {...register("text")}
      />
      <button type="submit" className="btn">
        Send
      </button>
    </form>
  );
};

export default MessageForm;
