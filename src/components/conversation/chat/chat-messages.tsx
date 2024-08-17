import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage from "./chat-message";
import { History } from "@/services/knowledge/interfaces";
import { useEffect } from "react";

interface CharMessagesProps {
  data?: History[];
  isLoading: boolean;
}

export default function ChatMessages(props: CharMessagesProps) {
  const { data, isLoading } = props;

  const scrollToBottom = () => {
    const chatContainer = document.getElementById("chat-container"); // Substitua 'chat-container' pelo ID do contêiner de mensagens

    if (chatContainer) {
      chatContainer.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [data]);

  return (
    <ScrollArea className="h-full">
      <section
        id="chat-container"
        className="w-ful flex h-full flex-grow flex-col gap-6 overflow-hidden bg-card px-4 py-8"
      >
        {data
          ? data.map((item) => (
              <ChatMessage
                key={item.id}
                variant={item.type == "human" ? "user" : "assistent"}
                content={item.content}
              />
            ))
          : null}

        {isLoading ? (
          <div className="w-max rounded-[8px] bg-foreground p-4 px-4 py-3 text-primary dark:bg-border">
            <div className="loader"></div>
          </div>
        ) : null}
      </section>
    </ScrollArea>
  );
}
