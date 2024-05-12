export type ChatMessageItem = {
  content: string;
  role: "ai" | "human";
};

export type APIHistoryItem = {
  type: "ai" | "human";
  data: { content: string };
};

export type History = Record<
  string,
  { loaded: boolean; history: ChatMessageItem[] }
>;

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
