import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ArrowLeft as ArrowLeftIcon } from "lucide-react";
import { ChatThemeSelecter } from "./chat-theme-selecter";

const chatHeaderVariants = cva(
  "flex justify-between w-full min-h-20 px-6 shadow z-10"
);

export interface ChatHeaderProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof chatHeaderVariants> {}

const ChatHeader = (props: ChatHeaderProps) => {
  const { className, ...rest } = props;

  return (
    <section className={cn(chatHeaderVariants({ className }))} {...rest}>
      <div className="flex flex-row gap-2 items-center">
        <ArrowLeftIcon />

        <Avatar>
          {/* TODO: Pegar alt da resposta da API */}
          <AvatarImage
            alt="AI profile photo"
            src="https://github.com/shadcn.png"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="flex gap-0 flex-col">
          <h1 className="text-base font-medium">Hermys</h1>
          <p className="text-xs text-muted-foreground">Online</p>
        </div>
      </div>

      <div className="flex items-center">
        <ChatThemeSelecter />
      </div>
    </section>
  );
};

export { ChatHeader, chatHeaderVariants };
