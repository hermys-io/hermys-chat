export default function MenuChat() {
  return (
    <div className="flex cursor-pointer flex-col gap-4 rounded-[8px] border-[1px] border-border bg-card p-6 lg:h-[72px] lg:flex-row lg:items-center lg:rounded-none lg:border-none lg:bg-background lg:px-6 lg:py-0">
      <div className="flex justify-between">
        <div className="h-10 w-10 rounded-full bg-primary" />
        <span className="text-[10px] font-medium text-muted-foreground lg:hidden">
          12:35
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <p className="font-bold text-primary">Prefeitura de Olinda</p>
        <p className="text-sm italic text-muted-foreground">
          Ultima at. em 28/05/2024
        </p>
        <p className="text-sm italic text-muted-foreground lg:hidden">
          Data prevista prova Qui, 01/08/2024
        </p>
      </div>

      <div className="flex h-full pt-4">
        <p className="hidden text-nowrap text-[10px] text-muted-foreground lg:block">
          12:35 PM
        </p>
      </div>
    </div>
  );
}
