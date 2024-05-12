"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChatContext } from "@/contexts/chat";
import { Edital } from "@/lib/chat";
import { MessageSquarePlusIcon, SearchIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";
import ChatItem from "./chat-sidebar-chat-item";
import ChatSidebarChatsEmptyCTA from "./chat-sidebar-chats-empty-cta";
import { useAtom } from "jotai";
import { chatState } from "@/store/chat";

export default function ChatSidebarCahts() {
  const chatContext = useChatContext();

  const [currentChatState, setCurrentChatState] = useAtom(chatState);

  const [_currentChatState, setCurrentSelectedChat] =
    chatContext.selectedChatState;
  const [_currentChatChisotry, setCurrentChatHistory] =
    chatContext.chatHistoryState;
  const [newChatDrwaerOpen, setNewChatDrwaerOpen] =
    chatContext.newChatDrawerState;

  const [search, setSearch] = useState("");

  const handleSelectChat = (edital: Edital) => {
    if (disbled) return;

    setCurrentSelectedChat(edital);
  };

  const handleOpen = () => {
    if (disbled) return;

    setNewChatDrwaerOpen(true);
    setTimeout(() => {
      setSearch("");
    }, 400);
  };

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

  const data = getFilteredData(chatContext.conversationQuery.data || []);

  const shouldShowDataState = data && data.length > 0;
  const shouldShowEmptyState = data && data.length === 0 && search === "";
  const shouldShowSearchEmptyState = data && data.length === 0 && search !== "";

  const disbled = currentChatState !== "online";

  return (
    <div className="flex flex-col gap-6 w-[300px] h-full pt-4 bg-secondary border-r-2">
      {/* Header */}
      <div className="flex justify-between items-center px-4 text-secondary-foreground">
        <div className="text-2xl text-bold font-bold">Chats</div>
        <div className="flex items-center">
          <Button
            className="p-0 w-[24] h-[24]"
            variant="ghost"
            onClick={handleOpen}
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
        {chatContext.conversationQuery.isLoading ? (
          <div className="absolute top-[10%] left-[50%] translate-x-[-50%] translate-y-[-10%]">
            <Loader2Icon size={32} className="animate-spin" />
          </div>
        ) : (
          <>
            {shouldShowDataState ? (
              <>
                {data.map((edital) => (
                  <div key={edital.id} onClick={() => handleSelectChat(edital)}>
                    <ChatItem data={edital} />
                  </div>
                ))}
              </>
            ) : null}

            {shouldShowEmptyState ? (
              <ChatSidebarChatsEmptyCTA onClick={handleOpen} />
            ) : null}

            {shouldShowSearchEmptyState ? (
              <ChatSidebarChatsEmptyCTA
                searchMessage={search}
                onClick={handleOpen}
              />
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
