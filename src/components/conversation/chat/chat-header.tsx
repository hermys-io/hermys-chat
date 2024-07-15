"use client";

import { useTheme } from "@/lib/theme-provider";
import { Knowledge } from "@/services/knowledge/interfaces";
import {
  ArrowLeftIcon,
  MessageSquareWarningIcon,
  SunMoonIcon,
} from "lucide-react";

interface ChatHeaderProps {
  data?: Knowledge;
  onClose: () => void;
}

export default function ChatHeader(props: ChatHeaderProps) {
  const { data, onClose } = props;

  const { toggleTheme } = useTheme();

  return (
    <header className="flex min-h-[72px] w-full items-center rounded-b-lg border-b-[1px] border-t-[1px] border-border bg-background px-4 lg:px-6">
      <div className="flex items-center flex-grow">
        <button
          onClick={onClose}
          className="flex items-center justify-center w-8 h-8 mr-2 text-primary lg:hidden"
        >
          <ArrowLeftIcon />
        </button>

        <div
          style={{
            backgroundImage: `url('${data?.photo}')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
          className="w-10 h-10 mr-4 rounded-full bg-slate-600"
        />

        <div className="flex flex-col gap-1">
          <p className="text-sm font-bold text-primary">{data?.name}</p>
          <p className="text-xs italic text-muted-foreground">
            {data?.alt_text}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-6">
        <button className="p-2 text-destructive">
          <MessageSquareWarningIcon size={24} />
        </button>
        <button
          onClick={toggleTheme}
          className="items-center justify-center hidden text-primary lg:flex"
        >
          <SunMoonIcon />
        </button>
      </div>
    </header>
  );
}
