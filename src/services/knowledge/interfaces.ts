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
