"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChatContext } from "@/contexts/chat";
import { Edital } from "@/services/edital-chat/interfaces";
import { Loader2Icon, SearchIcon, XIcon } from "lucide-react";
import { useState } from "react";
import ChatItem from "./chat-sidebar-chat-item";
import ChatSidebarChatsEmptyCTA from "./chat-sidebar-chats-empty-cta";

export default function ChatSidebarCreateChat() {
  const chatContext = useChatContext();

  const [search, setSearch] = useState("");

  const [_currentChatState, setCurrentSelectedChat] =
    chatContext.selectedChatState;
  const [_currentChatChisotry, setCurrentChatHistory] =
    chatContext.chatHistoryState;
  const [newChatDrwaerOpen, setNewChatDrwaerOpen] =
    chatContext.newChatDrawerState;

  const handleClose = () => {
    setNewChatDrwaerOpen(false);
  };

  const handleCreate = async (edital: Edital) => {
    if (!chatContext.session?.id) return;
    if (!chatContext.addEditalMutation.isIdle) return;

    setCurrentChatHistory([]);
    await chatContext.addEditalMutation.mutateAsync({
      sessionId: chatContext.session.id,
      editalId: edital.id,
    });
    setCurrentSelectedChat(edital);
    handleClose();
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

  const data = getFilteredData(chatContext.avaliableQuery.data || []);

  const shouldShowDataState = data && data.length > 0;
  const shouldShowEmptyState = data && data.length === 0 && search === "";
  const shouldShowSearchEmptyState = data && data.length === 0 && search !== "";

  const hiddenClass = newChatDrwaerOpen ? "left-[64px]" : "left-[-300px]";

  return (
    <div
      className={`flex flex-col gap-6 absolute pt-4 top-0 ${hiddenClass} w-[300px] h-full bg-muted border-r-2 z-10`}
      style={{ transition: "left .3s ease-in-out" }}
    >
      <div className="flex justify-between items-center px-4 text-secondary-foreground">
        <div className="text-2xl text-bold font-bold">Nova conversa</div>
        <div className="flex items-center">
          <Button
            className="p-0 w-[24] h-[24]"
            variant="ghost"
            onClick={handleClose}
          >
            <XIcon size={24} />
          </Button>
        </div>
      </div>

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

      <div className="relative flex grow flex-col w-full overflow-hidden overflow-y-auto">
        {chatContext.avaliableQuery.isLoading ? (
          <div className="absolute top-[10%] left-[50%] translate-x-[-50%] translate-y-[-10%]">
            <Loader2Icon size={32} className="animate-spin" />
          </div>
        ) : (
          <>
            {shouldShowDataState ? (
              <>
                {data.map((edital) => (
                  <div key={edital.id} onClick={() => handleCreate(edital)}>
                    <ChatItem data={edital} />
                  </div>
                ))}
              </>
            ) : null}

            {shouldShowEmptyState ? (
              <ChatSidebarChatsEmptyCTA button={false} />
            ) : null}

            {shouldShowSearchEmptyState ? (
              <ChatSidebarChatsEmptyCTA searchMessage={search} button={false} />
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
