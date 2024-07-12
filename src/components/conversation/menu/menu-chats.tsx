import { ScrollArea } from "@/components/ui/scroll-area";
import MenuChat from "./menu-chat";

interface MenuChatsProps {
  onSelect: (conversationID: string) => void;
}

export default function MenuChats(props: MenuChatsProps) {
  const { onSelect } = props;

  return (
    <section className="flex flex-col gap-2 p-4 lg:px-0">
      <p className="text-2xl font-bold text-primary lg:hidden">
        Editais em andamento
      </p>
      <ScrollArea>
        <div className="flex h-[calc(100svh-140px)] flex-grow flex-col gap-4 pb-5 lg:h-[calc(100svh-96px)]">
          <div onClick={() => onSelect("1")}>
            <MenuChat />
          </div>
          <div onClick={() => onSelect("2")}>
            <MenuChat />
          </div>
          <div onClick={() => onSelect("2")}>
            <MenuChat />
          </div>
          <div onClick={() => onSelect("2")}>
            <MenuChat />
          </div>
          <div onClick={() => onSelect("2")}>
            <MenuChat />
          </div>
          <div onClick={() => onSelect("2")}>
            <MenuChat />
          </div>
        </div>
      </ScrollArea>
    </section>
  );
}
