import { api } from "../axios";
import {
  ChatHistory,
  Clerk,
  Knowledge,
  KnowledgeFilterPayload,
} from "./interfaces";

export const EDITAL_CHAT_QUERY_QUEY = "edital-chat";

export async function listKnowledges(filter: KnowledgeFilterPayload) {
  const searchParams = new URLSearchParams(filter as Record<string, string>);

  const { data } = await api.get<Knowledge[]>(
    `/host-knowledge?${searchParams.toString()}`,
  );

  return data;
}

export async function getChatHistory(knowledgeId: string, sessionId: string) {
  const { data } = await api.get<ChatHistory>(
    `/host-knowledge/chat-history?knowledge_id=${knowledgeId}&session_id=${sessionId}`,
  );

  return data;
}

export async function askAI(
  knowledgeId: string,
  sessionId: string,
  question: string,
) {
  const { data } = await api.get<string>(
    `/host-knowledge/ask?knowledge_id=${knowledgeId}&session_id=${sessionId}&question=${question}`,
  );

  return data;
}

export async function getClerk(clerkSlug: string) {
  const { data } = await api.get<Clerk>(
    `/host-knowledge/clerk?clerk_slug=${clerkSlug}`,
  );
  return data;
}
