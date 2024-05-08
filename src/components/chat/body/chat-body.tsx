import { Suspense } from "react";
import { ChatHeader } from "./chat-body-header";
import { ChatFooter } from "./chat-body-footer";
import { ChatBodyMessages } from "./chat-body-messages";

export default function ChatBody() {
  return (
    <div className="flex flex-col w-full h-full">
      <ChatHeader />
      <ChatBodyMessages />
      <Suspense>
        <ChatFooter />
      </Suspense>
    </div>
  );
}
