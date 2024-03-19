"use client";

import useConversation from "@/hooks/useConversation";
import { pusherClient } from "@/libs/pusher";
import { FullMessageType } from "@/types";
import axios from "axios";
import { find } from "lodash";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";

type BodyProps = {
  initialMessage: FullMessageType[];
};

const Body = ({ initialMessage }: BodyProps) => {
  const { conversationId } = useConversation();
  const [messages, setMessages] = useState<FullMessageType[]>(initialMessage);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(initialMessage);
  }, [initialMessage]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: FullMessageType) => {
      console.log(message);
      // axios.post(`/api/conversations/${conversationId}/seend`);
      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }
        return [...current, message];
      });

      bottomRef?.current?.scrollIntoView();
    };
    pusherClient.bind("messages:new", messageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
    };
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div className="pt-24" ref={bottomRef} />
    </div>
  );
};

export default Body;
