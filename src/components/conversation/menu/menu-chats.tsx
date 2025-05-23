import { ScrollArea } from "@/components/ui/scroll-area";
import MenuChat from "./menu-chat";
import { useListKnowledges } from "@/services/knowledge/query";
import { useEffect } from "react";

interface MenuChatsProps {
  onSelect: (conversationID: string) => void;
  clerkSlug: string;
  current: string | null;
  clerkTitle?: string;
}

export default function MenuChats(props: MenuChatsProps) {
  const { current, clerkSlug, onSelect, clerkTitle } = props;

  const knowledgesQuery = useListKnowledges({ clerk_slug: clerkSlug });

  useEffect(() => {
    if (knowledgesQuery.data && knowledgesQuery.data.length == 1 && !current) {
      onSelect(knowledgesQuery.data[0].id);
    }
  }, [current, knowledgesQuery.data, onSelect]);

  return (
    <section className="flex flex-col gap-2 p-4 lg:px-0">
      <p className="text-2xl font-bold text-primary lg:px-4">{clerkTitle}</p>
      <ScrollArea>
        <div className="flex h-[calc(100svh-140px)] flex-grow flex-col gap-4 pb-5 lg:h-[calc(100svh-128px)] lg:gap-0">
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
