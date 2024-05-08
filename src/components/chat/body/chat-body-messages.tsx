"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { ChatMessage } from "./chat-messages-item";
import { ScrollArea } from "../../ui/scroll-area";
import { useEffect } from "react";
import { useChatContext } from "@/contexts/chat";

const chatHeaderVariants = cva(
  "flex flex-col gap-7 flex-grow bg-background px-6 py-4"
);

export interface ChatBodyMessagesProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof chatHeaderVariants> {}

const ChatBodyMessages = (props: ChatBodyMessagesProps) => {
  const { className, ...rest } = props;

  const chatContext = useChatContext();

  const [currentChatHistory] = chatContext.chatHistoryState;

  const scrollToBottom = () => {
    const chatComponent = document.getElementById("chat-bottom");

    if (chatComponent) {
      chatComponent.scrollIntoView();
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChatHistory]);

  return (
    <ScrollArea className="flex flex-grow">
      <section className={cn(chatHeaderVariants({ className }))} {...rest}>
        {currentChatHistory.map((message, index) => (
          <ChatMessage
            key={index}
            variant={message.role === "ai" ? "right" : "left"}
          >
            {message.content}
          </ChatMessage>
        ))}

        <div id="chat-bottom" style={{ overflowAnchor: "auto", height: 1 }} />
      </section>
    </ScrollArea>
  );
};

export { ChatBodyMessages, chatHeaderVariants };
