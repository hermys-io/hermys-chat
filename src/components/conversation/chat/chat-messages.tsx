import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage from "./chat-message";

export default function ChatMessages() {
  return (
    <ScrollArea>
      <section className="flex w-full flex-grow flex-col gap-6 overflow-hidden bg-card px-4 py-8">
        <ChatMessage variant="assistent" />
        <ChatMessage variant="user" />
        <ChatMessage variant="user" />
        <ChatMessage variant="user" />
        <ChatMessage variant="user" />
        <ChatMessage variant="user" />
        <ChatMessage variant="user" />
        <ChatMessage variant="user" />
        <ChatMessage variant="user" />
        <ChatMessage variant="user" />
        <ChatMessage variant="user" />
        <ChatMessage variant="user" />
        <ChatMessage variant="user" />
        <ChatMessage variant="user" />
      </section>
    </ScrollArea>
  );
}
