export type ChatStateProps = "online" | "reading" | "typing" | "breathe";

export type ChatMessageProps = {
  content: string;
  wpm?: number;
  role: "assistent" | "user";
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

export const getTypingDelay = (text: string, wpm: number = 300): number => {
  const numWords = text.split(" ").length;
  const timeInMinutes = numWords / wpm;
  const timeInMilliseconds = timeInMinutes * 60000;

  const roundedTime: number = Math.ceil(timeInMilliseconds);

  return roundedTime;
};

export const getReadingDelay = (text: string, wpm: number = 500): number => {
  const numWords = text.split(" ").length;
  const timeInMinutes = numWords / wpm;
  const timeInMilliseconds = timeInMinutes * 60000;

  const roundedTime = Math.ceil(timeInMilliseconds);

  return roundedTime;
};

// export const mockResponse = ()
