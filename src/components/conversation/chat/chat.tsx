import { cva } from "class-variance-authority";
import ChatHeader from "./chat-header";
import ChatMessages from "./chat-messages";
import ChatWriteBar from "./chat-write-bar";
import { cn } from "@/lib/utils";
import { useGetChatHitory } from "@/services/knowledge/query";

interface ChatProps {
  currentConversation: string | null;
  sessionId: string;
  onClose: () => void;
  variant: "normal" | "hidden";
}

export default function Chat(props: ChatProps) {
  const { currentConversation, sessionId, onClose, variant } = props;

  const chatWrapper = cva(
    "fixed h-svh w-full z-30 flex flex-grow flex-col bg-card transition-[left] ease-in-out duration-500 lg:relative lg:left-0 lg:transition-none",
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

  const chatHistoryQuery = useGetChatHitory({
    knowledgeId: currentConversation ? currentConversation : null,
    sessionId: sessionId,
  });

  return (
    <section className={cn(chatWrapper({ variant }))}>
      <ChatHeader onClose={onClose} data={chatHistoryQuery.data?.knowledge} />
      <ChatMessages data={chatHistoryQuery.data?.history} />
      <ChatWriteBar knowledgeId={currentConversation} sessionId={sessionId} />
    </section>
  );
}
