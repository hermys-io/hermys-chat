import Chat from "@/components/chat/chat";
import { ChatContextProvider } from "@/contexts/chat";

interface HomePageProps {
  params: { clerkId: string };
}

export default function Home(props: HomePageProps) {
  const { params } = props;

  return (
    <ChatContextProvider clerkId={params.clerkId}>
      <Chat />
    </ChatContextProvider>
  );
}
