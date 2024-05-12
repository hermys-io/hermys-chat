import { api } from "../axios";
import { APIHistoryItem, Edital, Session } from "./interfaces";

export const EDITAL_CHAT_QUERY_QUEY = "edital-chat";

export async function createSession() {
  const payload = { editais: [] };
  const { data } = await api.post<Session>("/edital-chat/session", payload);

  return data;
}

export async function addEdital(props: {
  sessionId: string;
  editalId: string;
}) {
  const { data } = await api.post<Session>(
    `/edital-chat/session/add-edital?session_id=${props.sessionId}&edital_id=${props.editalId}`
  );

  return data;
}

export async function getSession(sessionID: string) {
  const { data } = await api.get<Session[]>(
    `/edital-chat/session?session_id=${sessionID}`
  );

  return data;
}

export async function listConversation(clerkId: string, sessionId: string) {
  const { data } = await api.get<Edital[]>(
    `/edital-chat/conversations?clerk=${clerkId}&session_id=${sessionId}`
  );

  return data;
}

export async function listAvaliables(clerkId: string, sessionId: string) {
  const { data } = await api.get<Edital[]>(
    `/edital-chat/avaliables?clerk=${clerkId}&session_id=${sessionId}`
  );

  return data;
}

export async function getHistory(editalId: string, sessionId: string) {
  const { data } = await api.get<APIHistoryItem[]>(
    `/edital-chat/history?session_id=${sessionId}&edital_id=${editalId}`
  );

  return data;
}
