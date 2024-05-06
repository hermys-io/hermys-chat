"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn, waitForTime } from "@/lib/utils";
import { SendHorizonalIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ChatMessageProps, getReadingDelay, getTypingDelay } from "@/lib/chat";
import { useAtom, useSetAtom } from "jotai";
import { chatHistory, chatState, selectedChat } from "@/store/chat";
import { askToAI } from "@/services/chat";

const formSchema = z.object({
  message: z.string().min(2),
});

const chatFooterVariants = cva(
  "flex gap-3 w-full min-h-20 items-center px-6 bg-background border-t-2 border-muted z-10"
);

export interface ChatFootProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof chatFooterVariants> {
  sessionId: string;
}

const ChatFooter = (props: ChatFootProps) => {
  const { sessionId, className, ...rest } = props;

  const [currentChatState, setCurrentChatState] = useAtom(chatState);
  const setCurrentChatHistory = useSetAtom(chatHistory);
  const [currentSelectedChat, setCurrentSelectedChat] = useAtom(selectedChat);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const response = async (question: string) => {
    if (currentSelectedChat === "") return;

    // Lendo
    setCurrentChatState("reading");
    const responseFromAPI: ChatMessageProps = await askToAI(
      question,
      currentSelectedChat,
      sessionId
    );
    const responseFromAPIList = [responseFromAPI];
    const readinTime = getReadingDelay(question);
    await waitForTime(readinTime);

    // Digitando resposta
    for (const q of responseFromAPIList) {
      setCurrentChatState("typing");
      const typingTime = getTypingDelay(q.content);
      await waitForTime(typingTime);
      const responseMessage: ChatMessageProps = {
        content: q.content,
        role: "assistent",
      };
      setCurrentChatHistory((old) => [...old, responseMessage]);

      // Respiro
      setCurrentChatState("breathe");
      await waitForTime(1000);
    }

    // Parou de responder e está esperando outra pergunta
    setCurrentChatState("online");
    form.reset();
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    const sentMessage: ChatMessageProps = {
      content: values.message,
      role: "user",
    };

    setCurrentChatHistory((old) => [...old, sentMessage]);
    response(values.message);
  }

  const formIsDisabled =
    currentChatState !== "online" || currentSelectedChat === "";

  return (
    <section className={cn(chatFooterVariants({ className }))} {...rest}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center gap-3 w-full h-full"
        >
          <FormField
            disabled={formIsDisabled}
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    autoComplete="off"
                    aria-label="Menssagem"
                    className="w-full h-10"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            disabled={formIsDisabled}
            type="submit"
            shape={"rounded"}
            className="w-10 h-10 p-3"
            aria-label="Send message"
          >
            <SendHorizonalIcon />
          </Button>
        </form>
      </Form>
    </section>
  );
};

export { ChatFooter, chatFooterVariants as chatHeaderVariants };
