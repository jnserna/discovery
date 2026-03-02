import { streamText } from "ai";
import { primaryModel } from "@/lib/ai/models";
import { buildInsightsPrompt } from "@/lib/ai/prompts";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  const { profile, language } = await req.json();

  if (!profile) {
    return new Response("profile is required", { status: 400 });
  }

  const result = streamText({
    model: primaryModel,
    prompt: buildInsightsPrompt(profile, language ?? "en"),
  });

  return result.toTextStreamResponse();
}
