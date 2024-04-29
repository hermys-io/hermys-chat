export const fetchChatId = async () => {
  const res = await fetch(
    "https://api.hermys.io/api/chat/select-event-support?event_id=1",
    // "http://localhost:8000/api/chat/select-event-support?event_id=1",
    {
      method: "POST",
    }
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
};

export const askToAI = async (chatId: string, message: string) => {
  const searchParams = new URLSearchParams();
  searchParams.append("chat_id", chatId);
  searchParams.append("message", message);

  const params = searchParams.toString();

  const url = `https://api.hermys.io/api/chat/send-message?${params}`;
  // const url = `http://localhost:8000/api/chat/send-message?${params}`;

  const res = await fetch(url, {
    method: "POST",
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
};
