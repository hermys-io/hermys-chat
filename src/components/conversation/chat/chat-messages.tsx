import ChatMessage from "./chat-message";

export default function ChatMessages() {
  return (
    <section className="flex w-full flex-grow flex-col gap-6 bg-primary-foreground px-4 py-8">
      <ChatMessage variant="assistent" />
      <ChatMessage variant="user" />
    </section>
  );
}
