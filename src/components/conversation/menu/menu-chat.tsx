export default function MenuChat() {
  return (
    <div className="flex cursor-pointer flex-col gap-4 rounded-[8px] border-[1px] border-border bg-card p-6">
      <div className="flex justify-between">
        <div className="h-10 w-10 rounded-full bg-primary" />
        <span className="text-[10px] font-medium text-secondary">12:35</span>
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-bold text-primary">Prefeitura de Olinda</p>
        <p className="text-sm italic text-secondary">
          Edital ultima atualização em 28/05/2024
        </p>
        <p className="text-sm italic text-secondary">
          Data prevista prova Qui, 01/08/2024
        </p>
      </div>
    </div>
  );
}
