import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ArrowLeft as ArrowLeftIcon } from "lucide-react";

const chatHeaderVariants = cva(
  "flex gap-3 items-center w-full min-h-20 px-6 shadow z-10"
);

export interface ChatHeaderProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof chatHeaderVariants> {}

const ChatHeader = (props: ChatHeaderProps) => {
  const { className, ...rest } = props;

  return (
    <section className={cn(chatHeaderVariants({ className }))} {...rest}>
      <ArrowLeftIcon />

      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div className="flex gap-0 flex-col">
        <h1 className="text-base font-medium">Hermys</h1>
        <p className="text-xs text-muted-foreground">Online agora</p>
      </div>
    </section>
  );
};

export { ChatHeader, chatHeaderVariants };
