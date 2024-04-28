import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { ChatMessage } from "./chatMessage";
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
    <ScrollArea>
      <section className={cn(chatHeaderVariants({ className }))} {...rest}>
        {Array.from({ length: 50 }).map((_item, index) => (
          <ChatMessage key={index}>Mensagem {index}</ChatMessage>
        ))}
      </section>
    </ScrollArea>
  );
};

export { ChatBody, chatHeaderVariants };
