export interface Knowledge {
  id: string;
  name: string;
  alt_text: string;
  clerk: string;
  active: boolean;
  chunk_size: number;
  chunk_overlap: number;
  top_k: number;
  photo?: string;
}

export interface KnowledgeFilterPayload {
  clerk_slug?: string;
}

export interface ChatHistory {
  knowledge: Knowledge;
  history: History[];
}

export interface History {
  id: string;
  sessionId: string;
  type: "human" | "ai";
  content: string;
}

export interface Clerk {
  active: boolean;
  description: string;
  gpt_model: string;
  id: string;
  name: string;
  photo_light: string | null;
  photo_dark: string | null;
  prompt: string;
  slug: string;
  chat_title: string;
}
