"use client";
import Chat from "./chat/chat";
import MenuHeader from "./menu/menu-header";
import MenuChats from "./menu/menu-chats";
import { useState } from "react";
import Menu from "./menu/menu";

export default function ConversationRoot() {
  const [currentConversation, setCurrentConversation] = useState<string>();

  const onSelectConversation = (conversationID: string) => {
    setCurrentConversation(conversationID);
  };

  const onCloseConveration = () => {
    setCurrentConversation(undefined);
  };

  return (
    <main className="relative flex max-h-svh min-h-svh w-full flex-col overflow-hidden lg:flex-row">
      <Menu onSelect={onSelectConversation} />

      <Chat
        onClose={onCloseConveration}
        variant={currentConversation ? "normal" : "hidden"}
      />
    </main>
  );
}
