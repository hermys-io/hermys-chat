import { MessageSquarePlusIcon, SendHorizonalIcon } from "lucide-react";

export default function ChatWriteBar() {
  return (
    <section className="flex h-24 items-center border-t-[1px] border-border px-4">
      {/* <button className="mr-4 flex h-12 w-12 items-center justify-center rounded-full border-[1px]">
        <MessageSquarePlusIcon className="text-primary" />
      </button> */}

      <input className="mr-2 h-12 flex-grow rounded-[24px] bg-foreground px-6 text-primary dark:bg-input" />

      <button className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm text-border dark:bg-secondary dark:text-foreground">
        <SendHorizonalIcon size={18} />
      </button>
    </section>
  );
}
