import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { ChatMessage } from "./chat-message";
import { ScrollArea } from "../ui/scroll-area";

const chatHeaderVariants = cva(
  "flex flex-col gap-7 flex-grow bg-background px-6 py-4"
);

export interface ChatBodyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof chatHeaderVariants> {}

const ChatBody = (props: ChatBodyProps) => {
  const { className, ...rest } = props;

  return (
    <ScrollArea className="flex flex-grow">
      <section className={cn(chatHeaderVariants({ className }))} {...rest}>
        <ChatMessage variant={"left"}>
          Ei, você pode me explicar como é feito um exame de sangue?
        </ChatMessage>
        <ChatMessage variant={"right"}>
          Claro! Um exame de sangue geralmente envolve coletar uma pequena
          amostra de sangue para análise laboratorial.
        </ChatMessage>
        <ChatMessage variant={"left"}>
          Entendi. Mas como é feita essa coleta? Dói muito?
        </ChatMessage>
        <ChatMessage variant={"right"}>
          A coleta é feita geralmente com uma agulha inserida em uma veia no
          braço. Pode causar um leve desconforto, mas muitas pessoas não sentem
          nada além de um pequeno beliscão.
        </ChatMessage>
        <ChatMessage variant={"left"}>
          Ah, entendi. E depois que o sangue é coletado, o que acontece?
        </ChatMessage>
        <ChatMessage variant={"right"}>
          Depois que o sangue é coletado, ele é enviado para o laboratório, onde
          é analisado por técnicos especializados.
        </ChatMessage>
        <ChatMessage variant={"left"}>
          Legal! E o que exatamente eles procuram nos exames de sangue?
        </ChatMessage>
        <ChatMessage variant={"right"}>
          Eles podem procurar uma variedade de coisas, como células sanguíneas,
          níveis de glicose, lipídios, hormônios, e até mesmo sinais de
          infecção.
        </ChatMessage>
        <ChatMessage variant={"left"}>
          Interessante! E quanto tempo demora para obter os resultados?
        </ChatMessage>
        <ChatMessage variant={"right"}>
          Isso depende do tipo de exame e da carga de trabalho do laboratório,
          mas geralmente os resultados estão prontos em alguns dias.
        </ChatMessage>
        <ChatMessage variant={"left"}>
          Entendi. E se os resultados mostrarem algo preocupante, o que
          acontece?
        </ChatMessage>
        <ChatMessage variant={"right"}>
          Se os resultados forem preocupantes, seu médico entrará em contato com
          você para discutir os próximos passos e possíveis tratamentos.
        </ChatMessage>
        <ChatMessage variant={"left"}>
          Ah, faz sentido. Obrigado pelas informações!
        </ChatMessage>
        <ChatMessage variant={"right"}>
          De nada! Se tiver mais alguma dúvida, estou aqui para ajudar.
        </ChatMessage>
      </section>
    </ScrollArea>
  );
};

export { ChatBody, chatHeaderVariants };
