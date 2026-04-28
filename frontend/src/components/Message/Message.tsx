import React from "react";

interface MessageProps {
  text: string;
  sender: string;
  isMine: boolean;
}

const Message = React.forwardRef<HTMLDivElement, MessageProps>(
  ({ text, sender, isMine }, ref) => {
    return (
      <div ref={ref} className={`chat ${isMine ? "chat-end" : "chat-start"}`}>
        <div className="chat-header">{sender}</div>
        <div className={`chat-bubble ${isMine && "chat-bubble-primary"}`}>
          {text}
        </div>
      </div>
    );
  },
);

export default Message;
