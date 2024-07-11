"use client";
import Chat from "./chat/chat";
import MenuHeader from "./menu/menu-header";
import MenuChats from "./menu/menu-chats";
import { useState } from "react";

export default function ConversationRoot() {
  const [currentConversation, setCurrentConversation] = useState<string>();

  const onSelectConversation = (conversationID: string) => {
    setCurrentConversation(conversationID);
  };

  const onCloseConveration = () => {
    setCurrentConversation(undefined);
  };

  return (
    <main className="relative flex min-h-svh w-full flex-col overflow-hidden">
      <section className="z-10 flex flex-grow flex-col">
        <MenuHeader />
        <MenuChats onSelect={onSelectConversation} />
      </section>

      <Chat
        onClose={onCloseConveration}
        variant={currentConversation ? "normal" : "hidden"}
      />
    </main>
  );
}
