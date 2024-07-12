import MenuChats from "./menu-chats";
import MenuHeader from "./menu-header";

interface MenuProps {
  onSelect: (conversationID: string) => void;
}

export default function Menu(props: MenuProps) {
  const { onSelect } = props;

  return (
    <section className="z-10 flex h-full w-full flex-grow flex-col lg:min-w-[340px] lg:max-w-[340px]">
      <MenuHeader />
      <MenuChats onSelect={onSelect} />
    </section>
  );
}
