import { Button } from "@/components/ui/button";
import { PlusIcon, SearchIcon } from "lucide-react";

interface ChatSidebarChatsEmptyCTAProps {
  searchMessage?: string;
}

export default function ChatSidebarChatsEmptyCTA(
  props: ChatSidebarChatsEmptyCTAProps
) {
  const { searchMessage } = props;

  return (
    <div className="absolute flex flex-col items-center justify-center w-full px-4 top-[10%] left-[50%] translate-x-[-50%] translate-y-[-10%] text-center">
      <div className="p-3 bg-background rounded-full mb-4 shadow-lg">
        <SearchIcon className="text-primary" />
      </div>
      {searchMessage ? (
        <p className="font-bold"> Nenhuma conversa encontrada</p>
      ) : (
        <p className="font-bold">Você não tem conversas</p>
      )}

      {searchMessage ? (
        <p className="text-sm text-muted-foreground">
          Nenhum resultado para `{searchMessage}`. Tente novamente a pesquisa ou
          inicie uma nova conversa.
        </p>
      ) : (
        <p className="text-sm text-muted-foreground">
          Começe agora e inicie uma conversa
        </p>
      )}
      <Button className="felx gap-2 mt-4">
        <PlusIcon size={20} />
        Nova conversa
      </Button>
    </div>
  );
}
