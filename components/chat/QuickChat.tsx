"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { TextStreamChatTransport } from "ai";
import { useGlobalContext } from "@/lib/context/GlobalContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
import { MessageBubble } from "./MessageBubble";
import Link from "next/link";

export function QuickChat() {
  const { language, enneatype, zodiacSign, profile, attachmentStyle, bigFive, loveLanguages } = useGlobalContext();
  const [input, setInput] = useState("");

  const { messages, sendMessage, status } = useChat({
    transport: new TextStreamChatTransport({
      api: "/api/chat",
      body: {
        context: { language, enneatype, zodiacSign, profile, attachmentStyle, bigFive, loveLanguages },
      },
    }),
  });

  const isLoading = status === "streaming" || status === "submitted";

  const placeholder = language === "es"
    ? "Comparte lo que tienes en mente..."
    : "Share what's on your mind...";

  const sendLabel = language === "es" ? "Enviar" : "Send";
  const fullChatLabel = language === "es" ? "Abrir chat completo →" : "Open full chat →";

  async function handleSend() {
    if (!input.trim() || isLoading) return;
    const text = input.trim();
    setInput("");
    await sendMessage({ text });
  }

  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
      {/* Messages */}
      {messages.length > 0 && (
        <div className="p-4 space-y-3 max-h-72 overflow-y-auto">
          {messages.map((m) => (
            <MessageBubble key={m.id} message={m} />
          ))}
          {status === "submitted" && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Loader2 className="h-3 w-3 animate-spin" />
              {language === "es" ? "innerBloom está escuchando..." : "innerBloom is listening..."}
            </div>
          )}
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-border bg-muted/20">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            rows={2}
            className="resize-none text-sm"
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
            className="shrink-0 h-full"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            <span className="sr-only">{sendLabel}</span>
          </Button>
        </div>
        {messages.length > 0 && (
          <div className="mt-2 text-center">
            <Link href="/chat" className="text-xs text-primary hover:underline">
              {fullChatLabel}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
