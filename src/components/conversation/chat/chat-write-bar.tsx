"use client";

import { useAskAI } from "@/services/knowledge/mutations";
import { SendHorizonalIcon } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface ChatWriteBarProps {
  sessionId: string;
  knowledgeId: string | null;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export default function ChatWriteBar(props: ChatWriteBarProps) {
  const { sessionId, knowledgeId, setIsLoading } = props;

  const [question, setQuestion] = useState("");

  const askAIMutation = useAskAI();

  const handleSubmit = async () => {
    if (askAIMutation.isPending) return;
    if (knowledgeId) {
      setQuestion("");
      setIsLoading(true);
      const response = await askAIMutation.mutateAsync({
        knowledgeId: knowledgeId,
        sessionId: sessionId,
        question: question,
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setQuestion("");
  }, []);

  return (
    <section className="relative flex min-h-24 items-center border-t-[1px] border-border px-4">
      {/* <button className="mr-4 flex h-12 w-12 items-center justify-center rounded-full border-[1px]">
        <MessageSquarePlusIcon className="text-primary" />
      </button> */}

      <input
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={(e) => {
          if (e.key == "Enter") handleSubmit();
        }}
        value={question}
        className="mr-2 h-12 flex-grow rounded-[24px] bg-foreground px-6 text-primary dark:bg-input"
      />

      <button
        disabled={askAIMutation.isPending}
        onClick={handleSubmit}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm text-border dark:bg-border dark:text-foreground"
      >
        <SendHorizonalIcon size={18} />
      </button>

      <div className="absolute left-0 top-[-57px] flex max-h-14 min-h-14 min-w-full items-center justify-center bg-card px-4 lg:px-16">
        <p className="text-center text-[10px] text-secondary">
          Algumas informações citadas podem ser desatualizadas pois tem como
          recurso um documento externo. Considere verificar as informações e
          compará-las com o edital publicado oficialmente.
        </p>
      </div>
    </section>
  );
}
