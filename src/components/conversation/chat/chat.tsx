import { cva } from "class-variance-authority";
import ChatHeader from "./chat-header";
import ChatMessages from "./chat-messages";
import ChatWriteBar from "./chat-write-bar";
import { cn } from "@/lib/utils";

interface ChatProps {
  onClose: () => void;
  variant: "normal" | "hidden";
}

export default function Chat(props: ChatProps) {
  const { onClose, variant } = props;

  const chatWrapper = cva(
    "absolute h-full w-full z-30 flex flex-grow flex-col bg-card transition-[left] ease-in-out duration-500",
    {
      variants: {
        variant: {
          normal: "left-0",
          hidden: "left-full",
        },
      },
      defaultVariants: {
        variant: "hidden",
      },
    },
  );

  return (
    <section className={cn(chatWrapper({ variant }))}>
      <ChatHeader onClose={onClose} />
      <ChatMessages />
      <ChatWriteBar />
    </section>
  );
}
