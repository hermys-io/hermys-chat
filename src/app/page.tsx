import { ChatBody } from "@/components/chat/chatBody";
import { ChatFooter } from "@/components/chat/chatFooter";
import { ChatHeader } from "@/components/chat/chatHeader";

export default function Home() {
  return (
    <main className="w-full h-screen flex flex-col bg-background">
      <ChatHeader />
      <ChatBody />
      <ChatFooter />
    </main>
  );
}
