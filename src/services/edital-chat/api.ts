import { api } from "../axios";
import { Edital } from "./interfaces";

export const EDITAL_CHAT_QUERY_QUEY = "edital-chat";

export async function listEditais(clerkId: string) {
  const { data } = await api.get<Edital[]>(`/edital-chat/?clerk=${clerkId}`);

  return data;
}
