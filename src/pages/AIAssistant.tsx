import { useState } from "react";
import { Send, Paperclip, Mic, Sparkles, Lightbulb } from "lucide-react";

const suggestedActions = [
  "Show equipment at high risk",
  "Generate maintenance report",
  "Check lab availability today",
  "Predict next failures",
];

const initialMessages = [
  {
    role: "ai" as const,
    content: "Hello Dr. Chen! I'm your LabSync AI Assistant. I can help you analyze equipment data, predict maintenance needs, and optimize lab scheduling. What would you like to know?",
    time: "10:30 AM",
    table: null,
  },
  {
    role: "user" as const,
    content: "Show me equipment that needs maintenance soon",
    time: "10:31 AM",
    table: null,
  },
  {
    role: "ai" as const,
    content: "Based on usage patterns and maintenance history, here are the top equipment items requiring attention:",
    time: "10:31 AM",
    table: {
      headers: ["Equipment", "Lab", "Risk Score", "Recommended Action"],
      rows: [
        ["Centrifuge X200", "Biochemistry", "92%", "Immediate service"],
        ["Fume Hood B3", "Chemistry", "85%", "Schedule this week"],
        ["Autoclave Unit", "Chemistry", "78%", "Schedule next week"],
      ],
    },
  },
];

export default function AIAssistant() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", content: input, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), table: null },
      {
        role: "ai",
        content: "I'm analyzing your request. Based on current data, I recommend reviewing the maintenance schedule for the flagged equipment. Would you like me to generate a detailed report?",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        table: null,
      },
    ]);
    setInput("");
  };

  return (
    <div className="h-[calc(100vh-7rem)] flex gap-4">
      {/* Left Panel */}
      <div className="w-72 shrink-0 space-y-4 hidden lg:block">
        <div className="bg-card border border-border rounded-xl p-4 space-y-3">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" /> Suggested Actions
          </h3>
          {suggestedActions.map((a) => (
            <button key={a} onClick={() => setInput(a)}
              className="w-full text-left px-3 py-2 rounded-lg bg-secondary border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
              {a}
            </button>
          ))}
        </div>
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-primary">PRO TIP</span>
          </div>
          <p className="text-xs text-muted-foreground">Ask me to predict equipment failures using historical usage data and maintenance records for proactive scheduling.</p>
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 flex flex-col bg-card border border-border rounded-xl overflow-hidden">
        <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"} rounded-xl px-4 py-3`}>
                <p className="text-sm">{msg.content}</p>
                {msg.table && (
                  <div className="mt-3 overflow-x-auto rounded-lg border border-border">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-border bg-muted/30">
                          {msg.table.headers.map((h) => (
                            <th key={h} className="px-3 py-2 text-left font-medium text-muted-foreground">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {msg.table.rows.map((row, ri) => (
                          <tr key={ri} className="border-b border-border/50">
                            {row.map((cell, ci) => (
                              <td key={ci} className="px-3 py-2 text-foreground">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                <p className={`text-[10px] mt-2 ${msg.role === "user" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{msg.time}</p>
              </div>
            </div>
          ))}
          {/* Typing indicator */}
          <div className="flex justify-start">
            <div className="bg-secondary rounded-xl px-4 py-3 flex items-center gap-1">
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse-glow" />
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse-glow" style={{ animationDelay: "0.3s" }} />
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse-glow" style={{ animationDelay: "0.6s" }} />
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-2">
            <button className="p-2 text-muted-foreground hover:text-foreground"><Paperclip className="w-5 h-5" /></button>
            <button className="p-2 text-muted-foreground hover:text-foreground"><Mic className="w-5 h-5" /></button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask LabSync AI..."
              className="flex-1 h-10 px-4 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button onClick={handleSend} className="p-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
