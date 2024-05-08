import { EDITAL_CHAT_QUERY_QUEY, listEditais } from "./api";

import { useQuery } from "@tanstack/react-query";

export const useListEditais = (clerkId: string) => {
  return useQuery({
    queryKey: [EDITAL_CHAT_QUERY_QUEY, "list", clerkId],
    queryFn: () => listEditais(clerkId),
  });
};
