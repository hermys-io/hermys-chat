"use client";

import { ChatBody } from "@/components/chat/chat-body";
import ChatBodyEmptystate from "@/components/chat/chat-body-empty-state";
import { ChatFooter } from "@/components/chat/chat-footer";
import { ChatHeader } from "@/components/chat/chat-header";
import ChatSideBar from "@/components/chat/chat-side-bar";
import { selectedChat } from "@/store/chat";
import { useAtom } from "jotai";
import { Suspense, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

interface HomePageProps {
  params: { clerkId: string };
}

export default function Home(props: HomePageProps) {
  const { params } = props;

  const [sessionId, setSessionId] = useState("");
  const [currentSelectedChat, setCurrentSelectedChat] = useAtom(selectedChat);

  const clerkId = params.clerkId;

  useEffect(() => {
    const sessionIdKey = "sessionid";
    const sessionIdValue = localStorage.getItem(sessionIdKey);

    if (sessionIdValue) {
      setSessionId(sessionIdValue);
    } else {
      const newSessionIdValue = uuid();
      localStorage.setItem(sessionIdKey, newSessionIdValue);
      setSessionId(newSessionIdValue);
    }
  }, []);

  return (
    <main className="w-full h-svh flex bg-background">
      <section className="flex w-auto h-full">
        <ChatSideBar clerkId={clerkId} />
      </section>
      {currentSelectedChat !== "" ? (
        <div className="flex flex-col w-full h-full">
          <ChatHeader />
          <ChatBody />
          <Suspense>
            <ChatFooter sessionId={sessionId} />
          </Suspense>
        </div>
      ) : (
        <ChatBodyEmptystate />
      )}
    </main>
  );
}
