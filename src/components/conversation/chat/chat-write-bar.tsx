import { MessageSquarePlusIcon, SendHorizonalIcon } from "lucide-react";

export default function ChatWriteBar() {
  return (
    <section className="flex h-24 items-center border-t-[1px] border-border px-4">
      <button className="mr-4 flex h-12 w-12 items-center justify-center rounded-full border-[1px]">
        <MessageSquarePlusIcon className="text-primary" />
      </button>

      <input className="mr-2 h-12 flex-grow rounded-[24px] bg-input px-6" />

      <button className="mr-4 flex h-12 w-12 items-center justify-center rounded-full border-[1px] text-sm text-primary">
        <SendHorizonalIcon className="text-primary" />
      </button>
    </section>
  );
}
