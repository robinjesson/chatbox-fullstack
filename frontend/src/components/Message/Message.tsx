import React from "react";

const Message = React.forwardRef<
  HTMLDivElement,
  {
    text: string;
    sender: string;
    isMine: boolean;
    last: boolean;
  }
>(({ text, sender, isMine }, ref) => {
  return (
    <div ref={ref} className={`chat ${isMine ? "chat-end" : "chat-start"}`}>
      <div className="chat-header">{sender}</div>
      <div className={`chat-bubble ${isMine && "chat-bubble-primary"}`}>
        {text}
      </div>
    </div>
  );
});

export default Message;
