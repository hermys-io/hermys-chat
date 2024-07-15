import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { Volume1Icon } from "lucide-react";
import { useSpeech } from "react-text-to-speech";

interface ChatMessageProps {
  content: string;
  variant: "assistent" | "user";
}

export default function ChatMessage(props: ChatMessageProps) {
  const { content, variant } = props;

  const messageBalloonWrapper = cva(
    "flex w-full items-center gap-2 lg:max-w-[400px]",
    {
      variants: {
        variant: {
          assistent: "flex-row",
          user: "flex-row-reverse ml-auto",
        },
      },
      defaultVariants: {
        variant: "assistent",
      },
    },
  );

  return (
    <div className="flex flex-col justify-start gap-2">
      <div className={cn(messageBalloonWrapper({ variant }))}>
        <MessageBalloon text={content} variant={variant} />
      </div>

      {variant === "assistent" ? (
        <span className="w-6 h-6 bg-red-500 rounded-full"></span>
      ) : (
        <span className="self-end w-6 h-6 bg-red-500 rounded-full"></span>
      )}
    </div>
  );
}

interface MessageBalloonProps {
  text: string;
  variant: "assistent" | "user";
}

const MessageBalloon = (props: MessageBalloonProps) => {
  const { text, variant } = props;

  const messageBalloon = cva("rounded-[8px] px-4 py-3 text-primary", {
    variants: {
      variant: {
        assistent: "bg-foreground text-primary dark:bg-border",
        user: "bg-background text-primary border-hermys-acccent border-[1px] dark:bg-foreground dark:text-secondary",
      },
    },
    defaultVariants: {
      variant: "assistent",
    },
  });

  const {
    Text, // Component that returns the modified text property
    speechStatus, // String that stores current speech status
    isInQueue, // Boolean that stores whether a speech utterance is either being spoken or present in queue
    start, // Function to start the speech or put it in queue
    pause, // Function to pause the speech
    stop, // Function to stop the speech or remove it from queue
  } = useSpeech({ text: text });

  const handleSpeech = () => {
    switch (speechStatus) {
      case "stopped":
        start();
      case "started":
        stop();
      default:
        break;
    }
  };

  return (
    <>
      <div className={cn(messageBalloon({ variant }))}>{text}</div>
      {variant === "assistent" ? (
        <button
          onClick={handleSpeech}
          className="flex min-h-6 min-w-6 items-center justify-center rounded-full bg-[#131313] pl-1 text-background dark:text-primary"
        >
          <Volume1Icon size={16} />
        </button>
      ) : (
        <div className="flex items-center justify-center pl-1 bg-transparent rounded-full min-h-6 min-w-6"></div>
      )}
    </>
  );
};
