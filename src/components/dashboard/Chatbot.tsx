import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { chatbotResponses } from "@/data/mockData";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "bot";
  content: string;
}

const getResponse = (input: string): string => {
  const lower = input.toLowerCase().trim();
  if (["hi", "hello", "hey", "start"].some((g) => lower.includes(g))) return chatbotResponses.greeting;
  if (["overview", "dashboard", "summary", "balance"].some((k) => lower.includes(k))) return chatbotResponses.overview;
  if (["transaction", "list", "table"].some((k) => lower.includes(k))) return chatbotResponses.transactions;
  if (["role", "admin", "viewer", "access", "rbac"].some((k) => lower.includes(k))) return chatbotResponses.roles;
  if (["insight", "analysis", "pattern", "spending"].some((k) => lower.includes(k))) return chatbotResponses.insights;
  if (["filter", "sort", "search"].some((k) => lower.includes(k))) return chatbotResponses.filters;
  if (["export", "csv", "download"].some((k) => lower.includes(k))) return chatbotResponses.export;
  if (["help", "what", "how", "guide"].some((k) => lower.includes(k))) return chatbotResponses.help;
  return chatbotResponses.default;
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: "bot", content: chatbotResponses.greeting }]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", content: getResponse(userMsg) }]);
    }, 400);
  };

  return (
    <>
      {/* Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg glow-primary hover:scale-105 transition-transform"
      >
        {isOpen ? <X className="w-5 h-5 text-primary-foreground" /> : <MessageCircle className="w-5 h-5 text-primary-foreground" />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-20 right-5 z-50 w-[340px] max-h-[480px] glass-card flex flex-col animate-slide-up overflow-hidden">
          <div className="p-4 border-b border-border">
            <h4 className="font-semibold text-sm">💬 FinanceFlow Assistant</h4>
            <p className="text-xs text-muted-foreground">Ask me how to use the dashboard</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[280px] max-h-[340px]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                  {m.role === "bot" ? (
                    <div className="prose prose-sm prose-invert max-w-none [&>p]:m-0 [&>ul]:mt-1 [&>ul]:mb-0">
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                  ) : m.content}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="p-3 border-t border-border flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type a message..."
              className="flex-1 bg-secondary/50 text-sm rounded-lg px-3 py-2 outline-none border border-border focus:border-primary transition-colors"
            />
            <button onClick={send} className="p-2 rounded-lg bg-primary hover:bg-primary/90 transition-colors">
              <Send className="w-4 h-4 text-primary-foreground" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
