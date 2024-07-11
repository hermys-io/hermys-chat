import MenuChat from "./menu-chat";

interface MenuChatsProps {
  onSelect: (conversationID: string) => void;
}

export default function MenuChats(props: MenuChatsProps) {
  const { onSelect } = props;

  return (
    <section className="flex flex-grow flex-col gap-2 p-4">
      <p className="text-2xl font-bold text-primary">Editais em andamento</p>
      <div className="flex flex-grow flex-col gap-4">
        <div onClick={() => onSelect("1")}>
          <MenuChat />
        </div>
        <div onClick={() => onSelect("2")}>
          <MenuChat />
        </div>
      </div>
    </section>
  );
}
