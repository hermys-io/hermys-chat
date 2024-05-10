export type ChatMessageProps = {
  content: string;
  role: "ai" | "human";
};

export type Edital = {
  name: string;
  url: string;
  status: string;
  active: boolean;
  clerk: string;
  created_at: Date;
  updated_at: Date;
  id: string;
};

export type Session = {
  id: string;
  editais: string[];
};
