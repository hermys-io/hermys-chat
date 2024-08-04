import { api } from "../axios";
import { SignFileParams } from "../common/interface";


export const EDITAL_CHAT_QUERY_QUEY = "edital-chat";

export async function getSignedFile(params: SignFileParams) {
  const searchParams = new URLSearchParams(params as unknown as Record<string, string>);
  
  const { data } = await api.get<string>(
    `/host-knowledge/get-signed-file?${searchParams.toString()}`,
  );

  return data;
}

