import { Button } from "@/components/ui/button";
import { FileClockIcon, FileCheck2Icon, FileBadgeIcon } from "lucide-react";

export default function ChatSidebarHeader() {
  return (
    <header className="flex flex-col items-center w-16 h-full pt-4 gap-4 bg-primary">
      <Button className="flex items-center justify-center rounded-full p-0 w-10 h-10">
        <FileClockIcon size={20} />
      </Button>
      <Button className="flex items-center justify-center rounded-full p-0 w-10 h-10">
        <FileCheck2Icon size={20} />
      </Button>
      <Button className="flex items-center justify-center rounded-full p-0 w-10 h-10">
        <FileBadgeIcon size={20} />
      </Button>
    </header>
  );
}
