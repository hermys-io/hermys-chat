import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { Volume1Icon } from "lucide-react";

interface ChatMessageProps {
  variant: "assistent" | "user";
}

export default function ChatMessage(props: ChatMessageProps) {
  const { variant } = props;

  const messageBalloonWrapper = cva("flex w-full items-center gap-2", {
    variants: {
      variant: {
        assistent: "flex-row",
        user: "flex-row-reverse ",
      },
    },
    defaultVariants: {
      variant: "assistent",
    },
  });

  const messageBalloon = cva("rounded-lg px-4 py-3", {
    variants: {
      variant: {
        assistent: "bg-secondary",
        user: "bg-primary",
      },
    },
    defaultVariants: {
      variant: "assistent",
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <div className={cn(messageBalloonWrapper({ variant }))}>
        <div className={cn(messageBalloon({ variant }))}>
          Olá, sou o Hermys. Seu assistente de inteligência artificial pronto
          para tirar todas as dúvidas relacionadas ao edital 064982.5684.2024.02
          da Prefeitura do Recife
        </div>
        {variant === "assistent" ? (
          <button className="flex min-h-6 min-w-6 items-center justify-center rounded-full bg-[#131313] pl-1">
            <Volume1Icon size={16} />
          </button>
        ) : (
          <div className="flex min-h-6 min-w-6 items-center justify-center rounded-full bg-transparent pl-1"></div>
        )}
      </div>

      <div className={cn(messageBalloonWrapper({ variant }))}>
        <div className={cn(messageBalloon({ variant }))}>
          Se não souber por conde começar, que tal utilizar uma das perguntas
          abaixo?
        </div>
        {variant === "assistent" ? (
          <button className="flex min-h-6 min-w-6 items-center justify-center rounded-full bg-[#131313] pl-1">
            <Volume1Icon size={16} />
          </button>
        ) : (
          <div className="flex min-h-6 min-w-6 items-center justify-center rounded-full bg-transparent pl-1"></div>
        )}
      </div>

      {variant === "assistent" ? (
        <span className="h-6 w-6 rounded-full bg-red-500"></span>
      ) : (
        <span className="h-6 w-6 self-end rounded-full bg-red-500"></span>
      )}
    </div>
  );
}
