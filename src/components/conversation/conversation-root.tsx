"use client";
import { useEffect, useState } from "react";
import Chat from "./chat/chat";
import Menu from "./menu/menu";
import { useQueryState } from "nuqs";
import { v4 as uuidv4 } from "uuid";
import { useGetClerk } from "@/services/knowledge/query";

interface ConversationRootProps {
  clerkSlug: string;
}

export default function ConversationRoot(props: ConversationRootProps) {
  const { clerkSlug } = props;

  const [sessionId, setSessionId] = useState<string | undefined>(undefined);

  const [currentConversation, setCurrentConversation] =
    useQueryState("conversation");

  const clerkQuery = useGetClerk({ clerkID: clerkSlug });

  const onSelectConversation = (conversationID: string) => {
    setCurrentConversation(conversationID);
  };

  const onCloseConveration = () => {
    setCurrentConversation(null);
  };

  useEffect(() => {
    const sessionIdKey = "session_id";

    const getSessionId = async () => {
      const sessionIdValue = localStorage.getItem(sessionIdKey);

      if (sessionIdValue) {
        setSessionId(sessionIdValue);
      } else {
        const newSessionId = uuidv4();
        setSessionId(newSessionId);
        localStorage.setItem(sessionIdKey, newSessionId);
      }
    };
    getSessionId();
  }, []);

  if (!sessionId) return;

  return (
    <main className="relative flex max-h-svh min-h-svh w-full flex-col overflow-hidden lg:flex-row">
      <Menu
        onSelect={onSelectConversation}
        current={currentConversation}
        clerkSlug={clerkSlug}
        clerkPhoto={clerkQuery.data?.photo}
      />
      <Chat
        onClose={onCloseConveration}
        variant={currentConversation ? "normal" : "hidden"}
        currentConversation={currentConversation}
        sessionId={sessionId}
      />
    </main>
  );
}
