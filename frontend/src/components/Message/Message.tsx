import React from "react";

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
    <div ref={ref} className="chat chat-end">
      <div className="chat-bubble">{text}</div>
    </div>
  );
});

export default Message;
