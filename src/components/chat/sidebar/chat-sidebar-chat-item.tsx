"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChatContext } from "@/contexts/chat";
import { Edital } from "@/services/edital-chat/interfaces";

interface ChatItemProps {
  data: Edital;
}

export default function ChatItem(props: ChatItemProps) {
  const { data } = props;

  const chatContext = useChatContext();

  const [currentSelectedChat] = chatContext.selectedChatState;

  // TODO: Mover isso para o backend
  const getStatus = (status: string) => {
    if (status === "in_progress") return "Em andamento";
    return "";
  };

  const isSelected = currentSelectedChat
    ? currentSelectedChat.id === data.id
    : false;

  return (
    <div
      className={`flex gap-3 w-full cursor-pointer p-4 hover:bg-background hover:transition transition ${
        isSelected ? "bg-background" : ""
      }`}
    >
      <div className="flex items-center justify-center min-w-12 min-h-12 rounded-full bg-primary">
        <Avatar>
          {/* TODO: Pegar alt da resposta da API */}
          <AvatarImage
            alt="AI profile photo"
            src="https://raw.githubusercontent.com/pierrelapalu/icones-bandeiras-br-uf/master/dist/square-rounded/png-200/18-pernambuco-square-rounded.png"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-col grow gap-[2px] border-b-2 overflow-hidden">
        <span className="truncate">{data.name}</span>
        <span className="text-sm text-muted-foreground truncate ">
          {getStatus(data.status)}
        </span>
      </div>
    </div>
  );
}
