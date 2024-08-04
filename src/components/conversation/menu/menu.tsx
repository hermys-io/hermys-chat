import MenuChats from "./menu-chats";
import MenuHeader from "./menu-header";

interface MenuProps {
  current: string | null;
  clerkSlug: string;
  clerkPhotoLight?: string | null;
  clerkPhotoDark?: string | null;
  clerkTitle?: string;
  onSelect: (conversationID: string) => void;
}

export default function Menu(props: MenuProps) {
  const {
    current,
    clerkSlug,
    onSelect,
    clerkPhotoLight,
    clerkPhotoDark,
    clerkTitle,
  } = props;

  return (
    <section className="z-10 flex h-full w-full flex-grow flex-col lg:min-w-[340px] lg:max-w-[340px]">
      <MenuHeader
        clerkPhotoLight={clerkPhotoLight}
        clerkPhotoDark={clerkPhotoDark}
      />
      <MenuChats
        onSelect={onSelect}
        current={current}
        clerkSlug={clerkSlug}
        clerkTitle={clerkTitle}
      />
    </section>
  );
}
