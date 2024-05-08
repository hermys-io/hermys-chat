"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChatContext } from "@/contexts/chat";
import { Edital } from "@/lib/chat";
import { MessageSquarePlusIcon, SearchIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import ChatItem from "./chat-sidebar-chat-item";
import ChatSidebarChatsEmptyCTA from "./chat-sidebar-chats-empty-cta";

export default function ChatSidebarCahts() {
  const chatContext = useChatContext();

  const [_currentChatState, setCurrentSelectedChat] =
    chatContext.selectedChatState;
  const [_currentChatChisotry, setCurrentChatHistory] =
    chatContext.chatHistoryState;

  const [search, setSearch] = useState("");

  const getFilteredData = (data: Edital[]) => {
    return data.filter((item) => {
      const nameNormalized = item.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036F]/g, "");
      const searchNormalized = search
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036F]/g, "");

      return nameNormalized.includes(searchNormalized);
    });
  };

  const data = getFilteredData(chatContext.editaisQuery.data || []);

  const shouldShowDataState = data && data.length > 0;
  const shouldShowEmptyState = data && data.length === 0 && search === "";
  const shouldShowSearchEmptyState = data && data.length === 0 && search !== "";

  return (
    <div className="flex flex-col gap-6 w-[300px] h-full pt-4 bg-secondary border-r-2">
      {/* Header */}
      <div className="flex justify-between items-center px-4 text-secondary-foreground">
        <div className="text-2xl text-bold font-bold">Chats</div>
        <div className="flex items-center">
          <Button
            className="p-0 w-[24] h-[24]"
            variant="ghost"
            onClick={() => {}}
          >
            <MessageSquarePlusIcon size={24} />
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative px-4">
        <SearchIcon
          className="absolute top-[50%] left-[28px] translate-y-[-50%]"
          size={20}
        />
        <Input
          className="pl-10"
          placeholder="Pesquisar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Active chats */}
      <div className="relative flex grow flex-col w-full overflow-hidden overflow-y-auto">
        {shouldShowDataState ? (
          <>
            {data.map((edital) => (
              <div
                key={edital.id}
                onClick={() => {
                  setCurrentChatHistory([]);
                  setCurrentSelectedChat(edital);
                }}
              >
                <ChatItem data={edital} />
              </div>
            ))}
          </>
        ) : null}

        {shouldShowEmptyState ? <ChatSidebarChatsEmptyCTA /> : null}

        {shouldShowSearchEmptyState ? (
          <ChatSidebarChatsEmptyCTA searchMessage={search} />
        ) : null}
      </div>
    </div>
  );
}
