import { useState } from "react";

export default function ChatScreen({ patientId }: { patientId?: string }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    setLoading(true);
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input, history: messages }),
    });
    const { response } = await res.json();
    setMessages([...messages, { role: "user", text: input }, { role: "assistant", text: response }]);
    setInput("");
    setLoading(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Chat MTC</h1>
      <div className="h-64 overflow-y-auto border p-2 mb-2">
        {messages.map((m, i) => <p key={i}><strong>{m.role}:</strong> {m.text}</p>)}
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)} className="border p-2 w-full" />
      <button onClick={sendMessage} disabled={loading} className="mt-2 bg-blue-500 text-white p-2 w-full">Enviar{loading ? "..." : ""}</button>
    </div>
  );
}
