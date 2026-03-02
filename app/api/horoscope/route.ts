import { streamText } from "ai";
import { primaryModel } from "@/lib/ai/models";
import { buildHoroscopePrompt } from "@/lib/ai/prompts";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: Request) {
  const { zodiacSign, language } = await req.json();

  if (!zodiacSign) {
    return new Response("zodiacSign is required", { status: 400 });
  }

  const result = streamText({
    model: primaryModel,
    prompt: buildHoroscopePrompt(zodiacSign, language ?? "en"),
  });

  return result.toTextStreamResponse();
}
