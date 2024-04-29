"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { ChatMessage } from "./chat-message";
import { ScrollArea } from "../ui/scroll-area";
import { useAtomValue } from "jotai";
import { chatHistory } from "@/store/chat";
import { useEffect } from "react";

const chatHeaderVariants = cva(
  "flex flex-col gap-7 flex-grow bg-background px-6 py-4"
);

export interface ChatBodyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof chatHeaderVariants> {}

const ChatBody = (props: ChatBodyProps) => {
  const { className, ...rest } = props;

  const currentChatHistory = useAtomValue(chatHistory);

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
            variant={message.role === "assistent" ? "right" : "left"}
          >
            {message.content}
          </ChatMessage>
        ))}

        <div id="chat-bottom" style={{ overflowAnchor: "auto", height: 1 }} />
      </section>
    </ScrollArea>
  );
};

export { ChatBody, chatHeaderVariants };
