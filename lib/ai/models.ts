import { google } from "@ai-sdk/google";
// import { anthropic } from "@ai-sdk/anthropic"; // Fallback — uncomment to activate
// import { openai } from "@ai-sdk/openai";        // Tertiary — uncomment to activate

/**
 * Primary model: Google Gemini
 * Fallback chain (commented):
 *   1. Google Gemini (primary)
 *   2. Anthropic Claude (secondary)
 *   3. OpenAI GPT (tertiary)
 */
export const primaryModel = google("gemini-2.0-flash");

// export const secondaryModel = anthropic("claude-opus-4-6");
// export const tertiaryModel = openai("gpt-4o");
