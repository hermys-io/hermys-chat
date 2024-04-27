"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const chatMessageVariants = cva(
  "flex items-center min-h-9 ml-auto px-4 rounded-2xl rounded-tr-none bg-primary text-primary-foreground text-xs"
);

export interface ChatMessageProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chatMessageVariants> {}

const ChatMessage = (props: ChatMessageProps) => {
  const { className, ...rest } = props;

  return <div className={cn(chatMessageVariants({ className }))} {...rest} />;
};

export { ChatMessage, chatMessageVariants };
