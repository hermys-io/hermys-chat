import MenuChats from "./menu-chats";
import MenuHeader from "./menu-header";

interface MenuProps {
  current: string | null
  clerkSlug: string
  clerkPhoto?: string | null
  onSelect: (conversationID: string) => void;
}

export default function Menu(props: MenuProps) {
  const { current, clerkSlug, onSelect, clerkPhoto } = props;

  return (
    <section className="z-10 flex h-full w-full flex-grow flex-col lg:min-w-[340px] lg:max-w-[340px]">
      <MenuHeader clerkPhoto={clerkPhoto} />
      <MenuChats onSelect={onSelect} current={current} clerkSlug={clerkSlug} />
    </section>
  );
}
