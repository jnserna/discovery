import { GlobalContextType } from "@/lib/context/GlobalContext";

interface SystemPromptOptions {
  context: Partial<GlobalContextType>;
  ragContext?: string;
}

const zodiacDescriptions: Record<string, string> = {
  Aries: "energetic and driven",
  Taurus: "grounded and reliable",
  Gemini: "curious and adaptable",
  Cancer: "empathetic and nurturing",
  Leo: "warm-hearted and expressive",
  Virgo: "thoughtful and analytical",
  Libra: "harmonious and fair-minded",
  Scorpio: "intense and perceptive",
  Sagittarius: "optimistic and freedom-loving",
  Capricorn: "disciplined and ambitious",
  Aquarius: "independent and innovative",
  Pisces: "compassionate and intuitive",
};

const enneagramDescriptions: Record<number, string> = {
  1: "Type 1 (The Reformer) — principled, purposeful, and strives for integrity",
  2: "Type 2 (The Helper) — caring, generous, and people-pleasing",
  3: "Type 3 (The Achiever) — success-oriented, adaptable, and driven",
  4: "Type 4 (The Individualist) — creative, sensitive, and self-aware",
  5: "Type 5 (The Investigator) — perceptive, innovative, and private",
  6: "Type 6 (The Loyalist) — committed, responsible, and security-seeking",
  7: "Type 7 (The Enthusiast) — spontaneous, versatile, and optimistic",
  8: "Type 8 (The Challenger) — self-confident, decisive, and protective",
  9: "Type 9 (The Peacemaker) — accepting, trusting, and easygoing",
};

export function buildSystemPrompt({ context, ragContext }: SystemPromptOptions): string {
  const {
    language,
    enneatype,
    zodiacSign,
    profile,
    attachmentStyle,
    bigFive,
    loveLanguages,
  } = context;

  let userContextSection = "";

  if (enneatype) {
    userContextSection += `\n- Enneagram: ${enneagramDescriptions[enneatype] ?? `Type ${enneatype}`}`;
  }
  if (zodiacSign) {
    const desc = zodiacDescriptions[zodiacSign] ?? "";
    userContextSection += `\n- Zodiac: ${zodiacSign}${desc ? ` (${desc})` : ""}`;
  }
  if (attachmentStyle) {
    userContextSection += `\n- Attachment Style: ${attachmentStyle}`;
  }
  if (bigFive) {
    userContextSection += `\n- Big Five snapshot: O=${bigFive.openness}, C=${bigFive.conscientiousness}, E=${bigFive.extraversion}, A=${bigFive.agreeableness}, N=${bigFive.neuroticism}`;
  }
  if (loveLanguages) {
    const top = Object.entries(loveLanguages)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2)
      .map(([k]) => k)
      .join(", ");
    userContextSection += `\n- Primary Love Languages: ${top}`;
  }
  if (profile) {
    if (profile.favoriteSinger) userContextSection += `\n- Favorite singer: ${profile.favoriteSinger}`;
    if (profile.favoriteMovie) userContextSection += `\n- Favorite movie: ${profile.favoriteMovie}`;
    if (profile.hobbies?.length) userContextSection += `\n- Hobbies: ${profile.hobbies.join(", ")}`;
    if (profile.relationship) userContextSection += `\n- Relationship status: ${profile.relationship}`;
  }

  const ragSection = ragContext
    ? `\n\n## Relevant Knowledge Base Context\n${ragContext}\n(When using this information, briefly mention "Source: innerBloom Knowledge Base" in your response.)`
    : "";

  const languageInstruction =
    language === "es"
      ? "\n\nIMPORTANT: Always reason, plan, and think internally in English. Once your reasoning is complete, translate your final response to Spanish before outputting it."
      : "";

  return `You are innerBloom, a warm, empathetic, and psychologically-informed AI companion. Your purpose is to provide a safe, non-judgmental space for self-reflection and emotional support.

## Your Approach
- Listen actively and reflect back what the user shares
- Ask thoughtful follow-up questions to deepen self-awareness
- Use psychological insights from humanistic and positive psychology
- Validate emotions without toxic positivity
- Encourage self-reflection over giving direct advice
- Never diagnose or prescribe — you support, not treat
- If the user mentions suicidal thoughts or a crisis, gently encourage them to call 988 (US) or reach a crisis line in their region

## Who You Are Talking To${userContextSection || " A user who hasn't shared their profile yet — treat them with open curiosity."}
${ragSection}

## Your Tone
- Warm, calm, and grounding
- Like a wise friend who happens to understand psychology
- Not clinical, not preachy — human and present
${languageInstruction}`;
}

export function buildHoroscopePrompt(zodiacSign: string, language: string): string {
  const langInstruction =
    language === "es"
      ? "Translate your final response to Spanish."
      : "Respond in English.";

  return `You are an insightful astrology guide. Generate an uplifting, psychologically-grounded daily horoscope for ${zodiacSign}. Make it feel personal, meaningful, and encouraging. Focus on themes of growth, relationships, and inner wisdom. Keep it to 3-4 sentences. ${langInstruction}`;
}

export function buildInsightsPrompt(
  profile: Record<string, unknown>,
  language: string
): string {
  const langInstruction =
    language === "es"
      ? "Translate your final response to Spanish."
      : "Respond in English.";

  return `You are a compassionate psychologist and personality expert. Based on the following profile, generate rich, empathetic personality insights. Include: (1) Core personality strengths, (2) Potential growth areas, (3) How their interests reflect their personality, (4) Personalized suggestions for wellbeing and self-development. Be warm, specific, and avoid generic statements.

Profile data:
${JSON.stringify(profile, null, 2)}

${langInstruction}

Format your response with clear sections using markdown headers.`;
}
