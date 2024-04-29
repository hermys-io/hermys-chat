"use client";

import { ChatBody } from "@/components/chat/chat-body";
import { ChatFooter } from "@/components/chat/chat-footer";
import { ChatHeader } from "@/components/chat/chat-header";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="w-full h-svh flex flex-col bg-background">
      <ChatHeader />
      <ChatBody />
      <Suspense>
        <ChatFooter />
      </Suspense>
    </main>
  );
}
