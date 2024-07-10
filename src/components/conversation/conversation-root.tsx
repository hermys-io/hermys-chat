import ChatHeader from "./chat/chat-header";
import ChatMessages from "./chat/chat-messages";
import ChatWriteBar from "./chat/chat-write-bar";
import MenuHeader from "./menu/menu-header";

export default function ConversationRoot() {
  return (
    <main className="flex min-h-svh w-full flex-col overflow-hidden">
      <section>
        <MenuHeader />
      </section>

      <section className="flex flex-grow flex-col bg-card">
        <ChatHeader />
        <ChatMessages />
        <ChatWriteBar />
      </section>
    </main>
  );
}
