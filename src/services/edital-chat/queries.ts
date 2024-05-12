import {
  EDITAL_CHAT_QUERY_QUEY,
  getHistory,
  listAvaliables,
  listConversation,
} from "./api";

import { useQuery } from "@tanstack/react-query";

export const useListConversations = (clerkId: string, sessionId?: string) => {
  return useQuery({
    queryKey: [EDITAL_CHAT_QUERY_QUEY, "list", "conversations", clerkId],
    queryFn: () => listConversation(clerkId, sessionId as string),
    enabled: sessionId !== undefined,
  });
};

export const useListAvaliables = (clerkId: string, sessionId?: string) => {
  return useQuery({
    queryKey: [EDITAL_CHAT_QUERY_QUEY, "list", "avaliables", clerkId],
    queryFn: () => listAvaliables(clerkId, sessionId as string),
    enabled: sessionId !== undefined,
  });
};

export const useGetHistory = (editalId?: string, sessionId?: string) => {
  const enabled = editalId !== undefined && sessionId !== undefined;

  return useQuery({
    queryKey: [EDITAL_CHAT_QUERY_QUEY, "list", "history", editalId, sessionId],
    queryFn: () => getHistory(editalId as string, sessionId as string),
    enabled: enabled,
  });
};
