import { useState } from "react";

const PROMPTS = [
  "ICU capacity forecast?",
  "Nearest available beds",
  "Oxygen stock status",
  "Route ambulance AMB-003",
];

const REPLIES: Record<string, string> = {
  default:
    "Based on current network data: Regional Trauma is at 95% ICU capacity. I recommend initiating resource transfer from Riverside Medical (9 ICU beds free) and alerting emergency dispatch.",
};

export function AssistantPanel() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    {
      role: "ai",
      text: "MedSync AI ready. Ask about capacity, resources, ambulances, or water quality risks.",
    },
  ]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [
      ...m,
      { role: "user", text },
      { role: "ai", text: REPLIES.default },
    ]);
    setInput("");
  };

  return (
    <>
      <button
        type="button"
        className={`ai-fab${open ? " ai-fab--open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close assistant" : "Open AI assistant"}
      >
        {open ? "✕" : "◎"}
      </button>

      {open && (
        <aside className="ai-panel glass-card">
          <div className="ai-panel__header">
            <div>
              <strong>MedSync AI</strong>
              <span>Clinical decision assistant</span>
            </div>
            <span className="ai-panel__status">
              <span className="pulse" /> Online
            </span>
          </div>
          <div className="ai-panel__prompts">
            {PROMPTS.map((p) => (
              <button key={p} type="button" onClick={() => send(p)}>
                {p}
              </button>
            ))}
          </div>
          <div className="ai-panel__messages">
            {messages.map((msg, i) => (
              <div key={i} className={`ai-msg ai-msg--${msg.role}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <form
            className="ai-panel__input"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask MedSync AI…"
            />
            <button type="submit">→</button>
          </form>
        </aside>
      )}
    </>
  );
}




