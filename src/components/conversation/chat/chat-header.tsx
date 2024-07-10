import { ArrowLeftIcon, MessageSquareWarningIcon } from "lucide-react";

export default function ChatHeader() {
  return (
    <header className="flex h-[72px] w-full items-center rounded-b-lg border-b-[1px] border-t-[1px] border-border bg-background px-4 lg:px-6">
      <div className="flex flex-grow items-center">
        <button className="mr-2 flex h-8 w-8 items-center justify-center">
          <ArrowLeftIcon />
        </button>

        <div className="mr-4 h-10 w-10 rounded-full bg-slate-600"></div>

        <div className="flex flex-col gap-1">
          <p className="text-sm font-bold">Prefeitura do Recife</p>
          <p className="text-xs italic text-muted-foreground">
            Prova: 00/00/0000
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <button className="p-2">
          <MessageSquareWarningIcon size={24} className="text-destructive" />
        </button>
      </div>
    </header>
  );
}
