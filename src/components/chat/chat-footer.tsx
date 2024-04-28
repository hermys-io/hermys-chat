"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn, waitForTime } from "@/lib/utils";
import { SendHorizonalIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ChatMessageProps, getReadingDelay, getTypingDelay } from "@/lib/chat";
import { useAtom, useSetAtom } from "jotai";
import { chatHistory, chatState } from "@/store/chat";

const formSchema = z.object({
  message: z.string().min(2),
});

const chatFooterVariants = cva(
  "flex gap-3 w-full min-h-20 items-center px-6 bg-background border-t-2 border-muted z-10"
);

export interface ChatFootProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof chatFooterVariants> {}

const ChatFooter = (props: ChatFootProps) => {
  const { className, ...rest } = props;

  const [currentChatState, setCurrentChatState] = useAtom(chatState);
  const setCurrentChatHistory = useSetAtom(chatHistory);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const response = async (question: string) => {
    const responseMock = [
      {
        content:
          "Claro! Um exame de sangue geralmente envolve coletar uma pequena amostra de sangue para análise laboratorial.",
      },
      {
        content:
          "A coleta é feita geralmente com uma agulha inserida em uma veia no braço. Pode causar um leve desconforto, mas muitas pessoas não sentem nada além de um pequeno beliscão.",
      },
      {
        content:
          "Depois que o sangue é coletado, ele é enviado para o laboratório, onde é analisado por técnicos especializados.",
      },
    ];

    // Lendo
    setCurrentChatState("reading");
    const readinTime = getReadingDelay(question);
    await waitForTime(readinTime);

    // Digitando resposta
    for (const q of responseMock) {
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
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    const sentMessage: ChatMessageProps = {
      content: values.message,
      role: "user",
    };

    setCurrentChatHistory((old) => [...old, sentMessage]);
    response(values.message);
  }

  const formIsDisabled = currentChatState !== "online";

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
