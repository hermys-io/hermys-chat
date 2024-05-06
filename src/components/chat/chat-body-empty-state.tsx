import RemindersSVG from "../svg/reminders";

export default function ChatBodyEmptystate() {
  return (
    <div className="flex items-center justify-center w-full h-full overflow-hidden">
      <div className="flex flex-col items-center w-auto h-auto">
        <RemindersSVG className="text-primary mt-[-220px]" />
        <div className="flex flex-col gap-4 max-w-xl text-center mt-[-140px]">
          <h1 className="text-3xl font-semibold">
            Seja bem-vindo ao nosso chat
          </h1>
          <p className="text-muted-foreground">
            Escolha o edital que deseja atendimento no menu lateral para que
            nossos atendentes possam esclarecer suas dúvidas.
          </p>
        </div>
      </div>
    </div>
  );
}
