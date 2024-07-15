import ConversationRoot from "@/components/conversation/conversation-root";

interface PageProps {
  params: { clerkSlug: string };
}



export default function Page(props: PageProps) {
  const { params } = props;
  return <ConversationRoot clerkSlug={params.clerkSlug} />;
}
