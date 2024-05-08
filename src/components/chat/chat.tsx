"use client";

import { useEffect } from "react";
import ChatBodyEmptystate from "./body/chat-body-empty-state";
import ChatSideBar from "./sidebar/chat-sidebar";
import ChatBody from "./body/chat-body";
import { useChatContext } from "@/contexts/chat";
import ChatSplashScreen from "./chat-splash-screen";
import { notFound } from "next/navigation";

export default function Chat() {
  const chatContext = useChatContext();

  const [currentSelectedChat] = chatContext.selectedChatState;

  useEffect(() => {
    if (chatContext.editaisQuery.error) notFound();
  }, [chatContext.editaisQuery.error]);

  if (chatContext.editaisQuery.isLoading) return <ChatSplashScreen />;

  return (
    <main className="w-full h-svh flex bg-background">
      <section className="flex w-auto h-full">
        <ChatSideBar />
      </section>

      <section className="w-full h-full bg-background">
        {currentSelectedChat ? <ChatBody /> : <ChatBodyEmptystate />}
      </section>
    </main>
  );
}
