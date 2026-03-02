"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { TextStreamChatTransport } from "ai";
import { useGlobalContext } from "@/lib/context/GlobalContext";
import { useAuthState } from "@/lib/firebase/auth";
import { saveChatSession, getChatSessions } from "@/lib/firebase/db";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageBubble } from "./MessageBubble";
import { Send, Loader2, Plus, History } from "lucide-react";
import { cn } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";

const t = {
  en: {
    placeholder: "Share what's on your mind...",
    send: "Send",
    newSession: "New Session",
    sessions: "Past Sessions",
    welcome: "Hi, I'm here to listen. How are you feeling today?",
    anonymousNote: "Sign in to save your conversation history.",
    typing: "innerBloom is listening...",
  },
  es: {
    placeholder: "Comparte lo que tienes en mente...",
    send: "Enviar",
    newSession: "Nueva Sesión",
    sessions: "Sesiones Anteriores",
    welcome: "Hola, estoy aquí para escucharte. ¿Cómo te sientes hoy?",
    anonymousNote: "Inicia sesión para guardar el historial de tu conversación.",
    typing: "innerBloom está escuchando...",
  },
};

export function ChatInterface() {
  const { language, enneatype, zodiacSign, profile, attachmentStyle, bigFive, loveLanguages } = useGlobalContext();
  const { user } = useAuthState();
  const [sessionId] = useState(() => uuidv4());
  const [showSidebar, setShowSidebar] = useState(false);
  const [pastSessions, setPastSessions] = useState<{ id: string; updatedAt: unknown }[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const labels = t[language];

  const { messages, sendMessage, status } = useChat({
    transport: new TextStreamChatTransport({
      api: "/api/chat",
      body: {
        context: { language, enneatype, zodiacSign, profile, attachmentStyle, bigFive, loveLanguages },
      },
    }),
    messages: [
      {
        id: "welcome",
        role: "assistant",
        parts: [{ type: "text", text: labels.welcome }],
      },
    ],
    onFinish: ({ messages: finalMessages }) => {
      if (user) {
        void saveChatSession(user.uid, sessionId, finalMessages);
      }
    },
  });

  const isLoading = status === "streaming" || status === "submitted";

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  // Load past sessions for logged-in users
  useEffect(() => {
    if (user) {
      getChatSessions(user.uid).then((sessions) => {
        setPastSessions(sessions as { id: string; updatedAt: unknown }[]);
      });
    }
  }, [user]);

  async function handleSend() {
    if (!input.trim() || isLoading) return;
    const text = input;
    setInput("");
    await sendMessage({ text });
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] md:h-[calc(100vh-7rem)]">
      {/* Sidebar — past sessions (auth users only) */}
      {user && (
        <div
          className={cn(
            "border-r border-border bg-muted/20 transition-all duration-300",
            showSidebar ? "w-56" : "w-0 overflow-hidden"
          )}
        >
          <div className="p-3 space-y-1.5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-2 mb-2">
              {labels.sessions}
            </p>
            {pastSessions.slice(0, 12).map((s) => (
              <button
                key={s.id}
                className="w-full text-left px-2 py-1.5 rounded-lg text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors truncate"
              >
                Session {s.id.slice(0, 8)}…
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main chat */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-background/60 backdrop-blur-sm">
          <div className="flex items-center gap-2 flex-1">
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold select-none">
              iB
            </div>
            <div>
              <p className="text-sm font-medium">innerBloom</p>
              <p className="text-xs text-muted-foreground">Psychology Companion</p>
            </div>
          </div>
          <div className="flex gap-1">
            {user && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setShowSidebar(!showSidebar)}
                aria-label={labels.sessions}
              >
                <History className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => window.location.reload()}
              aria-label={labels.newSession}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Anonymous notice */}
        {!user && (
          <div className="px-4 py-2 bg-secondary/40 border-b border-border">
            <p className="text-xs text-center text-muted-foreground">{labels.anonymousNote}</p>
          </div>
        )}

        {/* Messages */}
        <ScrollArea className="flex-1 px-4 py-4">
          <div className="space-y-4 max-w-2xl mx-auto">
            {messages.map((m) => (
              <MessageBubble key={m.id} message={m} />
            ))}
            {status === "submitted" && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Loader2 className="h-3 w-3 animate-spin" />
                {labels.typing}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="px-4 py-3 border-t border-border bg-background/80">
          <div className="max-w-2xl mx-auto flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={labels.placeholder}
              rows={2}
              className="resize-none text-sm flex-1"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void handleSend();
                }
              }}
            />
            <Button
              size="icon"
              onClick={() => void handleSend()}
              disabled={!input.trim() || isLoading}
              className="shrink-0 self-end"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
