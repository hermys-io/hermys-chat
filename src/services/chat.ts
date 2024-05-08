const BASE_URL = "https://hermys-api-production.up.railway.app/api";
// const BASE_URL = "http://localhost:8000/api";

export const askToAI = async (
  question: string,
  editalId: string,
  sessionId: string
) => {
  const searchParams = new URLSearchParams();
  searchParams.append("question", question);
  searchParams.append("edital_id", editalId);
  searchParams.append("session_id", sessionId);

  const params = searchParams.toString();

  const url = `${BASE_URL}/edital-chat/ask?${params}`;

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
