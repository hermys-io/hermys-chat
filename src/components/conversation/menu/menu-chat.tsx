import { cn } from "@/lib/utils";
import { Knowledge } from "@/services/knowledge/interfaces";
import { cva } from "class-variance-authority";

interface MenuChatProps {
  data: Knowledge;
  variant: "default" | "selected";
  onSelect: (conversationID: string) => void;
}

export default function MenuChat(props: MenuChatProps) {
  const { data, variant, onSelect } = props;

  const handleSelect = () => {
    onSelect(data.id);
  };

  const buttonVariants = cva(
    "flex cursor-pointer flex-col gap-4 transition duration-500 rounded-[8px] border-[1px] border-border bg-card p-6 lg:h-[72px] lg:flex-row lg:items-center lg:rounded-none lg:border-none lg:px-6 lg:py-0",
    {
      variants: {
        variant: {
          default: "lg:bg-background",
          selected: "lg:bg-card",
        },
      },
      defaultVariants: {
        variant: "default",
      },
    },
  );

  return (
    <div onClick={handleSelect} className={cn(buttonVariants({ variant }))}>
      <div className="flex justify-between">
        <div
          style={{
            backgroundImage: `url('${data.photo}')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
          className="h-10 w-10 rounded-full bg-primary"
        />
        <span className="text-[10px] font-medium text-muted-foreground lg:hidden">
          12:35
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <p className="font-bold text-primary">{data.name}</p>
        <p className="text-sm italic text-muted-foreground">{data.alt_text}</p>
        {/* <p className="text-sm italic text-muted-foreground lg:hidden">
          Data prevista prova Qui, 01/08/2024
        </p> */}
      </div>

      <div className="flex h-full pt-4">
        <p className="hidden text-nowrap text-[10px] text-muted-foreground lg:block">
          12:35 PM
        </p>
      </div>
    </div>
  );
}
