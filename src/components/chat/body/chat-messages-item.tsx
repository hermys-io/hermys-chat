"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const chatMessageVariants = cva(
  "flex items-center min-h-9 max-w-[80%] px-4 py-3 rounded-2xl text-xs animate-fade-in",
  {
    variants: {
      variant: {
        left: "ml-auto bg-primary rounded-tr-none text-primary-foreground",
        right: "mr-auto bg-accent rounded-tl-none text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "left",
    },
  }
);

export interface ChatMessageProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chatMessageVariants> {}

const ChatMessage = (props: ChatMessageProps) => {
  const { className, variant, ...rest } = props;

  return (
    <div
      style={{ overflowAnchor: "none" }}
      className={cn(chatMessageVariants({ variant, className }))}
      {...rest}
    />
  );
};

export { ChatMessage, chatMessageVariants };
