"use client";
import { Suggestion } from "@/services/knowledge/interfaces";
import { useAskAI } from "@/services/knowledge/mutations";
import { MessageSquarePlusIcon, SendHorizonalIcon, XIcon } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";

interface ChatWriteBarProps {
  sessionId: string;
  knowledgeId: string | null;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  suggestions?: Suggestion[];
}

export default function ChatWriteBar(props: ChatWriteBarProps) {
  const { sessionId, knowledgeId, suggestions, setIsLoading } = props;

  const [question, setQuestion] = useState("");
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);

  const isDesktop = useMediaQuery("(min-width: 1024px)");

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

  const onAskSuggestion = async (text: string) => {
    if (askAIMutation.isPending) return;
    if (knowledgeId) {
      setSuggestionsVisible(false);
      setIsLoading(true);
      const response = await askAIMutation.mutateAsync({
        knowledgeId: knowledgeId,
        sessionId: sessionId,
        question: text,
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setQuestion("");
  }, []);

  return (
    <section className="relative z-40 flex min-h-24 items-center border-t-[1px] border-border px-4">
      {suggestions && suggestions.length > 0 ? (
        <button
          onClick={() =>
            setSuggestionsVisible(suggestionsVisible ? false : true)
          }
          className="mr-4 flex h-12 w-12 min-w-12 items-center justify-center gap-2 rounded-full border-[1px] lg:min-w-max lg:px-4"
        >
          {suggestionsVisible ? (
            <>
              <XIcon className="text-primary" />
              <span className="hidden text-sm text-primary lg:flex">
                Fechar
              </span>
            </>
          ) : (
            <>
              <MessageSquarePlusIcon className="text-primary" />
              <span className="hidden text-sm text-primary lg:flex">
                Ver perguntas populares
              </span>
            </>
          )}
        </button>
      ) : null}

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
        className="flex h-12 w-12 min-w-12 items-center justify-center rounded-full bg-primary text-sm text-border dark:bg-border dark:text-foreground"
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

      {suggestions && !isDesktop ? (
        <SuggestionsDrwaer
          suggestions={suggestions}
          open={suggestionsVisible}
          setOpen={setSuggestionsVisible}
          onAsk={onAskSuggestion}
        />
      ) : null}

      {suggestions && isDesktop ? (
        <SuggestionsDesktop
          suggestions={suggestions}
          onAsk={onAskSuggestion}
          variant={suggestionsVisible ? "normal" : "hidden"}
        />
      ) : null}
    </section>
  );
}

interface SuggestionsDrawerProps {
  suggestions: Suggestion[];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onAsk: (text: string) => Promise<void>;
}

const SuggestionsDrwaer = (props: SuggestionsDrawerProps) => {
  const { suggestions, open, setOpen, onAsk } = props;

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="bg-card">
        <div className="flex flex-col gap-2 p-6 lg:flex-row lg:justify-center">
          {suggestions.map((suggestion) => (
            <div
              onClick={() => onAsk(suggestion.text)}
              className="flex cursor-pointer flex-col gap-2 rounded-[8px] border-[1px] border-border px-5 py-4"
              key={suggestion.id}
            >
              <p className="text-sm text-primary">{suggestion.text}</p>
              <p className="text-[10px] italic text-hermys-acccent">
                Clique para fazer a pergunta
              </p>
            </div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

interface SuggestionsDesktopProps {
  suggestions: Suggestion[];
  onAsk: (text: string) => Promise<void>;
  variant: "hidden" | "normal";
}

const SuggestionsDesktop = (props: SuggestionsDesktopProps) => {
  const { suggestions, onAsk, variant } = props;

  const rootStyles = cva(
    "absolute left-0 flex max-h-28 min-h-28 min-w-full items-center gap-2 bg-card px-4 lg:px-16",
    {
      variants: {
        variant: {
          hidden: "z-0 opacity-0 top-[100%]",
          normal: "z-30 opacity-100 top-[-113px]  transition-all duration-500",
        },
      },
      defaultVariants: {
        variant: "hidden",
      },
    },
  );

  return (
    <div className={cn(rootStyles({ variant }))}>
      {suggestions.map((suggestion) => (
        <div
          onClick={() => onAsk(suggestion.text)}
          className="flex cursor-pointer flex-col gap-2 rounded-[8px] border-[1px] border-border px-5 py-4"
          key={suggestion.id}
        >
          <p className="text-sm text-primary">{suggestion.text}</p>
          <p className="text-[10px] italic text-hermys-acccent">
            Clique para fazer a pergunta
          </p>
        </div>
      ))}
    </div>
  );
};
