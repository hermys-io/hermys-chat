import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage from "./chat-message";
import { History } from "@/services/knowledge/interfaces";
import { useEffect } from "react";

interface CharMessagesProps {
  data?: History[];
}

export default function ChatMessages(props: CharMessagesProps) {
  const { data } = props;

  const scrollToBottom = () => {
    const chatComponent = document.getElementById("chat-bottom");

    if (chatComponent) {
      chatComponent.scrollIntoView();
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [data]);

  return (
    <ScrollArea className="h-full">
      <section className="flex flex-col flex-grow h-full gap-6 px-4 py-8 overflow-hidden w-ful bg-card">
        {data
          ? data.map((item) => (
              <ChatMessage
                key={item.id}
                variant={item.type == "human" ? "user" : "assistent"}
                content={item.content}
              />
            ))
          : null}
        <div id="chat-bottom" style={{ overflowAnchor: "auto", height: 1 }} />
      </section>
    </ScrollArea>
  );
}
