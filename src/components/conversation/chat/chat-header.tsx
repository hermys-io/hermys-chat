"use client";

import { useTheme } from "@/lib/theme-provider";
import {
  ArrowLeftIcon,
  MessageSquareWarningIcon,
  SunMoonIcon,
} from "lucide-react";

interface ChatHeaderProps {
  onClose: () => void;
}

export default function ChatHeader(props: ChatHeaderProps) {
  const { onClose } = props;

  const { toggleTheme } = useTheme();

  return (
    <header className="flex min-h-[72px] w-full items-center rounded-b-lg border-b-[1px] border-t-[1px] border-border bg-background px-4 lg:px-6">
      <div className="flex flex-grow items-center">
        <button
          onClick={onClose}
          className="mr-2 flex h-8 w-8 items-center justify-center text-primary lg:hidden"
        >
          <ArrowLeftIcon />
        </button>

        <div className="mr-4 h-10 w-10 rounded-full bg-slate-600"></div>

        <div className="flex flex-col gap-1">
          <p className="text-sm font-bold text-primary">Prefeitura do Recife</p>
          <p className="text-xs italic text-muted-foreground">
            Prova: 00/00/0000
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-6">
        <button className="p-2 text-destructive">
          <MessageSquareWarningIcon size={24} />
        </button>
        <button
          onClick={toggleTheme}
          className="hidden items-center justify-center text-primary lg:flex"
        >
          <SunMoonIcon />
        </button>
      </div>
    </header>
  );
}
