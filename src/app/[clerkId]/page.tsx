import Chat from "@/components/chat/chat";
import { ChatContextProvider } from "@/contexts/chat";

interface HomePageProps {
  params: { clerkId: string };
}

export default function Home(props: HomePageProps) {
  const { params } = props;

  // const editaisQuery = useListEditais(params.clerkId);

  // useEffect(() => {
  //   if (editaisQuery.error) notFound();
  // }, [editaisQuery.error]);

  // if (editaisQuery.isLoading) return <ChatSplashScreen />;

  return (
    <ChatContextProvider clerkId={params.clerkId}>
      <Chat />
    </ChatContextProvider>
  );
}
