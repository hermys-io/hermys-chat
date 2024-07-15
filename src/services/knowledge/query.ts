import { useQuery } from "@tanstack/react-query";
import { getChatHistory, listKnowledges } from "./api";
import { KnowledgeFilterPayload } from "./interfaces";

const knowledgeKeys = {
  all: ["knowledges"] as const,
  lists: () => [...knowledgeKeys.all, "list"] as const,
  list: (filters: KnowledgeFilterPayload) =>
    [...knowledgeKeys.lists(), { ...filters }] as const,
  // details: () => [...todoKeys.all, 'detail'] as const,
  // detail: (id: number) => [...todoKeys.details(), id] as const,
};

export const useListKnowledges = (filter: KnowledgeFilterPayload) => {
  return useQuery({
    queryKey: knowledgeKeys.list(filter),
    queryFn: () => listKnowledges(filter),
    enabled: !!filter.clerk_slug,
  });
};

export const useGetChatHitory = ({
  knowledgeId,
  sessionId,
}: {
  knowledgeId: string | null;
  sessionId: string | null;
}) => {
  return useQuery({
    queryKey: ["chat-history", { knowledgeId: knowledgeId }],
    queryFn: () => getChatHistory(knowledgeId!, sessionId!),
    enabled: !!knowledgeId,
  });
};
