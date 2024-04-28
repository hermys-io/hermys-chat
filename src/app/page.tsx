import { ChatBody } from "@/components/chat/chat-body";
import { ChatFooter } from "@/components/chat/chat-footer";
import { ChatHeader } from "@/components/chat/chat-header";

export default function Home() {
  return (
    <main className="w-full h-screen flex flex-col bg-background">
      <ChatHeader />
      <ChatBody />
      <ChatFooter />
    </main>
  );
}
