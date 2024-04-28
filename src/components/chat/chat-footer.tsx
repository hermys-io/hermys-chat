"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { SendHorizonalIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  message: z.string().min(2).max(50),
});

const chatFooterVariants = cva(
  "flex gap-3 w-full min-h-20 items-center px-6 bg-background border-t-2 border-muted z-10"
);

export interface ChatFootProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof chatFooterVariants> {}

const ChatFooter = (props: ChatFootProps) => {
  const { className, ...rest } = props;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <section className={cn(chatFooterVariants({ className }))} {...rest}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center gap-3 w-full h-full"
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input className="w-full h-10" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" shape={"rounded"} className="w-10 h-10 p-3">
            <SendHorizonalIcon />
          </Button>
        </form>
      </Form>
    </section>
  );
};

export { ChatFooter, chatFooterVariants as chatHeaderVariants };
