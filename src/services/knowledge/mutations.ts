import { useMutation, useQueryClient } from "@tanstack/react-query";
import { askAI } from "./api";
import { ChatHistory } from "./interfaces";
import { v4 as uuidv4 } from "uuid";

export const useAskAI = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (props: {
      knowledgeId: string;
      sessionId: string;
      question: string;
    }) => askAI(props.knowledgeId, props.sessionId, props.question),
    onMutate: async (variables) => {
      queryClient.setQueryData(
        ["chat-history", { knowledgeId: variables.knowledgeId }],
        (oldData: ChatHistory) => {
          const newChatHistory: ChatHistory = {
            knowledge: oldData.knowledge,
            history: [
              ...oldData.history,
              {
                id: uuidv4(),
                sessionId: `${variables.knowledgeId}:${variables.sessionId}`,
                type: "human",
                content: variables.question,
              },
            ],
          };

          return newChatHistory;
        },
      );
    },
    onSuccess: async (data, variables) => {
      queryClient.setQueryData(
        ["chat-history", { knowledgeId: variables.knowledgeId }],
        (oldData: ChatHistory) => {
          const newChatHistory: ChatHistory = {
            knowledge: oldData.knowledge,
            history: [
              ...oldData.history,
              {
                id: uuidv4(),
                sessionId: `${variables.knowledgeId}:${variables.sessionId}`,
                type: "ai",
                content: data,
              },
            ],
          };

          return newChatHistory;
        },
      );
    },
  });
};
