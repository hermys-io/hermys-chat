import { ScrollArea } from "@/components/ui/scroll-area";
import MenuChat from "./menu-chat";
import { useListKnowledges } from "@/services/knowledge/query";

interface MenuChatsProps {
  onSelect: (conversationID: string) => void;
  clerkSlug: string;
  current: string | null;
}

export default function MenuChats(props: MenuChatsProps) {
  const { current, clerkSlug, onSelect } = props;

  const knowledgesQuery = useListKnowledges({ clerk_slug: clerkSlug });

  return (
    <section className="flex flex-col gap-2 p-4 lg:px-0">
      <p className="text-2xl font-bold text-primary lg:hidden">
        Editais em andamento
      </p>
      <ScrollArea>
        <div className="flex h-[calc(100svh-140px)] flex-grow flex-col gap-4 pb-5 lg:h-[calc(100svh-96px)] lg:gap-0">
          {knowledgesQuery.data
            ? knowledgesQuery.data.map((item) => (
                <MenuChat
                  key={item.id}
                  data={item}
                  onSelect={onSelect}
                  variant={current == item.id ? "selected" : "default"}
                />
              ))
            : null}
        </div>
      </ScrollArea>
    </section>
  );
}
