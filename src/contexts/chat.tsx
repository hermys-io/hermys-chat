"use client";

import { ChatMessageProps, Edital } from "@/services/edital-chat/interfaces";
import { useListEditais } from "@/services/edital-chat/queries";
import { UseQueryResult } from "@tanstack/react-query";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { v4 as uuid } from "uuid";

interface ChatContextProviderProps {
  children?: React.ReactNode;
  clerkId: string;
}

interface ChatContextValue {
  editaisQuery: UseQueryResult<Edital[], Error>;
  sessionId: string;
  selectedChatState: [
    Edital | undefined,
    Dispatch<SetStateAction<Edital | undefined>>
  ];
  chatHistoryState: [
    ChatMessageProps[],
    Dispatch<SetStateAction<ChatMessageProps[]>>
  ];
}

const ChatContext = createContext({} as ChatContextValue);

const ChatContextProvider = (props: ChatContextProviderProps) => {
  const { clerkId, children } = props;

  const editaisQuery = useListEditais(clerkId);

  const selectedChatState = useState<Edital | undefined>(undefined);
  const chatHistoryState = useState<ChatMessageProps[]>([]);

  // Vai ser substituido pelo sessionid do banco de dados
  const [sessionId, setSessionId] = useState("");
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

  const providerValue: ChatContextValue = {
    editaisQuery: editaisQuery,
    sessionId: sessionId,
    selectedChatState: selectedChatState,
    chatHistoryState: chatHistoryState,
  };

  return (
    <ChatContext.Provider value={providerValue}>
      {children}
    </ChatContext.Provider>
  );
};

const useChatContext = () => {
  const context = useContext(ChatContext);

  if (context == undefined) {
    throw new Error("useChatContext must be used within a ChatContextProvider");
  }

  return context;
};

export { useChatContext, ChatContextProvider };
