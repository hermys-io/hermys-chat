import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EDITAL_CHAT_QUERY_QUEY, addEdital, createSession } from "./api";

export const useCreateSession = () => {
  return useMutation({
    mutationFn: createSession,
  });
};

export const useAddEdital = (clerkId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (props: { sessionId: string; editalId: string }) =>
      addEdital(props),
    onSuccess: async () => {
      queryClient.refetchQueries({
        queryKey: [EDITAL_CHAT_QUERY_QUEY, "list", "avaliables", clerkId],
      });
      await queryClient.refetchQueries({
        queryKey: [EDITAL_CHAT_QUERY_QUEY, "list", "conversations", clerkId],
      });
    },
  });
};
