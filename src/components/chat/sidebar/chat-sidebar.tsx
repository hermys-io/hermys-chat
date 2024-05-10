import ChatSidebarHeader from "./chat-sidebar-header";
import ChatSidebarCahts from "./chat-sidebar-chats";
import ChatSidebarCreateChat from "./chat-sdebar-create-chat";

export default function ChatSideBar() {
  return (
    <>
      <ChatSidebarHeader />
      <ChatSidebarCreateChat />
      <ChatSidebarCahts />
    </>
  );
}
