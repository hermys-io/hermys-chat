"use client";

import {
  ChatMessageProps,
  Edital,
  Session,
} from "@/services/edital-chat/interfaces";
import {
  useAddEdital,
  useCreateSession,
} from "@/services/edital-chat/mutations";
import {
  useListAvaliables,
  useListConversations,
} from "@/services/edital-chat/queries";
import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface ChatContextProviderProps {
  children?: React.ReactNode;
  clerkId: string;
}

interface ChatContextValue {
  conversationQuery: UseQueryResult<Edital[], Error>;
  avaliableQuery: UseQueryResult<Edital[], Error>;
  session: Session | undefined;
  sessionMutation: UseMutationResult<Session, Error, void, unknown>;
  addEditalMutation: UseMutationResult<
    Session,
    Error,
    {
      sessionId: string;
      editalId: string;
    },
    unknown
  >;
  selectedChatState: [
    Edital | undefined,
    Dispatch<SetStateAction<Edital | undefined>>
  ];
  chatHistoryState: [
    ChatMessageProps[],
    Dispatch<SetStateAction<ChatMessageProps[]>>
  ];
  newChatDrawerState: [boolean, Dispatch<SetStateAction<boolean>>];
}

const ChatContext = createContext({} as ChatContextValue);

const ChatContextProvider = (props: ChatContextProviderProps) => {
  const { clerkId, children } = props;

  const [session, setSession] = useState<Session | undefined>(undefined);
  const newChatDrawerState = useState(false);
  const selectedChatState = useState<Edital | undefined>(undefined);
  const chatHistoryState = useState<ChatMessageProps[]>([]);

  const conversationQuery = useListConversations(clerkId, session?.id);
  const avaliableQuery = useListAvaliables(clerkId, session?.id);

  const sessionMutation = useCreateSession();
  const addEditalMutation = useAddEdital(clerkId);

  useEffect(() => {
    const aaa = async () => {
      const sessionIdKey = "session_id";
      const sessionIdValue = localStorage.getItem(sessionIdKey);

      if (sessionIdValue) {
        setSession(JSON.parse(sessionIdValue) as Session);
      } else {
        await sessionMutation.mutateAsync();
      }
    };

    aaa();
  }, []);

  useEffect(() => {
    if (sessionMutation.data === undefined) return;

    const sessionIdKey = "session_id";

    setSession(sessionMutation.data);
    localStorage.setItem(sessionIdKey, JSON.stringify(sessionMutation.data));
  }, [sessionMutation.data]);

  const providerValue: ChatContextValue = {
    conversationQuery: conversationQuery,
    avaliableQuery: avaliableQuery,
    session: session,
    sessionMutation: sessionMutation,
    addEditalMutation: addEditalMutation,
    selectedChatState: selectedChatState,
    chatHistoryState: chatHistoryState,
    newChatDrawerState: newChatDrawerState,
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
