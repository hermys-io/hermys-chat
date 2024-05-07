"use client";
import { Button } from "../ui/button";
import {
  AirplayIcon,
  MessageSquarePlusIcon,
  SearchIcon,
  FileBadgeIcon,
  FileClockIcon,
  FileCheck2Icon,
} from "lucide-react";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { listEditais } from "@/services/chat";
import { Edital } from "@/lib/chat";
import { useAtom } from "jotai";
import { chatHistory, selectedChat } from "@/store/chat";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface ChatSideBarProps {
  clerkId: string;
}

export default function ChatSideBar(props: ChatSideBarProps) {
  const { clerkId } = props;

  const [editais, setEditais] = useState<Edital[]>([]);
  const [currentSelectedChat, setCurrentSelectedChat] = useAtom(selectedChat);
  const [currentChatHistory, setCurrentChatHistory] = useAtom(chatHistory);

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

  useEffect(() => {
    const fetch = async () => {
      const result = await listEditais(clerkId);
      setEditais(result);
    };

    fetch();
  }, [clerkId]);

  return (
    <>
      <header className="flex flex-col items-center w-16 h-full pt-4 gap-4 bg-primary">
        <Button className="flex items-center justify-center rounded-full p-0 w-10 h-10">
          <FileClockIcon size={20} />
        </Button>
        <Button className="flex items-center justify-center rounded-full p-0 w-10 h-10">
          <FileCheck2Icon size={20} />
        </Button>
        <Button className="flex items-center justify-center rounded-full p-0 w-10 h-10">
          <FileBadgeIcon size={20} />
        </Button>
      </header>

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
        <div className="flex flex-col w-full">
          {getFilteredData(editais).map((edital) => (
            <div
              key={edital.id}
              onClick={() => {
                setCurrentChatHistory([]);
                setCurrentSelectedChat(edital.id);
              }}
            >
              <ChatItem data={edital} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

interface CreateDialogProps {
  children?: React.ReactNode;
}

const CreateDialog = (props: CreateDialogProps) => {
  const { children } = props;

  const [editais, setEditais] = useState<Edital[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const result = await listEditais("66369969fc3b65b2f4c7f7e0");
      setEditais(result);
    };

    fetch();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Iniciar conversa</DialogTitle>
          <DialogDescription>
            Selecioane o edital para iniciar a conversa
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6 mt-6">
          {editais.map((edital) => (
            <ChatItem key={edital.id} data={edital} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface ChatItemProps {
  data: Edital;
}

const ChatItem = (props: ChatItemProps) => {
  const { data } = props;

  const [currentSelectedChat, setCurrentSelectedChat] = useAtom(selectedChat);

  const getStatus = (status: string) => {
    if (status === "in_progress") return "Em andamento";
    return "";
  };

  const isSelected = currentSelectedChat === data.id;

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
};
