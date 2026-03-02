import { streamText, convertToModelMessages, isTextUIPart } from "ai";
import type { UIMessage } from "ai";
import { primaryModel } from "@/lib/ai/models";
import { buildSystemPrompt } from "@/lib/ai/prompts";
import { retrieveKBContext } from "@/lib/ai/rag";
import { GlobalContextType } from "@/lib/context/GlobalContext";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  const body = await req.json();
  const { messages, context } = body as {
    messages: UIMessage[];
    context?: Partial<GlobalContextType>;
  };

  // Get the latest user message for RAG lookup
  const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
  const lastUserText = lastUserMessage?.parts
    .filter(isTextUIPart)
    .map((p) => p.text)
    .join("") ?? "";

  const ragContext = lastUserText ? retrieveKBContext(lastUserText) : null;

  const systemPrompt = buildSystemPrompt({
    context: context ?? {},
    ragContext: ragContext ?? undefined,
  });

  const result = streamText({
    model: primaryModel,
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
  });

  return result.toTextStreamResponse();
}
