"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { ChatMessage } from "./chat-messages-item";
import { ScrollArea } from "../../ui/scroll-area";
import { useEffect } from "react";
import { useChatContext } from "@/contexts/chat";
import { useGetHistory } from "@/services/edital-chat/queries";
import { ChatMessageItem } from "@/services/edital-chat/interfaces";
import { Loader2Icon } from "lucide-react";

const chatHeaderVariants = cva(
  "flex flex-col gap-7 flex-grow bg-background px-6 py-4"
);

export interface ChatBodyMessagesProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof chatHeaderVariants> {}

const ChatBodyMessages = (props: ChatBodyMessagesProps) => {
  const { className, ...rest } = props;

  const chatContext = useChatContext();

  const [currentChatHistory, setCurrentChatHistory] =
    chatContext.chatHistoryState;
  const [currentSelecteChat] = chatContext.selectedChatState;

  const historyQuery = useGetHistory(
    currentSelecteChat?.id,
    chatContext.session?.id
  );

  const getData = (): ChatMessageItem[] => {
    if (currentSelecteChat === undefined) return [];

    return currentChatHistory[currentSelecteChat.id]?.history || [];
  };

  const scrollToBottom = () => {
    const chatComponent = document.getElementById("chat-bottom");

    if (chatComponent) {
      chatComponent.scrollIntoView();
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChatHistory]);

  useEffect(() => {
    if (!currentSelecteChat) return;

    const data = historyQuery.data || [];
    const parsedData: ChatMessageItem[] = data.map((item) => {
      return {
        content: item.data.content,
        role: item.type,
      } as ChatMessageItem;
    });

    const currentHistory = {
      loaded: true,
      history: parsedData,
    };

    setCurrentChatHistory((old) => ({
      ...old,
      [currentSelecteChat.id]: currentHistory,
    }));
  }, [currentSelecteChat, historyQuery.data, setCurrentChatHistory]);

  return (
    <ScrollArea className="flex flex-grow">
      <section className={cn(chatHeaderVariants({ className }))} {...rest}>
        {historyQuery.isLoading ? (
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <Loader2Icon size={32} className="animate-spin" />
          </div>
        ) : (
          <>
            {getData().map((message, index) => (
              <ChatMessage
                key={index}
                variant={message.role === "ai" ? "right" : "left"}
              >
                {message.content}
              </ChatMessage>
            ))}
          </>
        )}

        <div id="chat-bottom" style={{ overflowAnchor: "auto", height: 1 }} />
      </section>
    </ScrollArea>
  );
};

export { ChatBodyMessages, chatHeaderVariants };
