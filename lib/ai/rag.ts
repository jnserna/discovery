import { readFileSync } from "fs";
import path from "path";

interface KBSection {
  heading: string;
  content: string;
  keywords: string[];
}

let cachedSections: KBSection[] | null = null;

function loadKnowledgeBase(): KBSection[] {
  if (cachedSections) return cachedSections;

  try {
    const filePath = path.join(process.cwd(), "knowledge-base", "mental-health.md");
    const raw = readFileSync(filePath, "utf-8");

    const sections: KBSection[] = [];
    const parts = raw.split(/^## /m).slice(1); // skip preamble

    for (const part of parts) {
      const lines = part.split("\n");
      const heading = lines[0].trim();
      const content = lines
        .slice(1)
        .join("\n")
        .replace(/<!--[\s\S]*?-->/g, "") // remove HTML comments (placeholders)
        .trim();

      if (!content || content.length < 20) continue; // skip empty placeholder sections

      const keywords = [
        heading.toLowerCase(),
        ...heading.toLowerCase().split(/\s+/),
        ...content.toLowerCase().split(/\W+/).filter((w) => w.length > 4).slice(0, 20),
      ];

      sections.push({ heading, content, keywords: [...new Set(keywords)] });
    }

    cachedSections = sections;
    return sections;
  } catch {
    return [];
  }
}

function scoreRelevance(query: string, section: KBSection): number {
  const queryWords = query
    .toLowerCase()
    .split(/\W+/)
    .filter((w) => w.length > 3);

  let score = 0;
  for (const word of queryWords) {
    if (section.keywords.includes(word)) score += 1;
    if (section.heading.toLowerCase().includes(word)) score += 2; // heading match = stronger signal
  }
  return score;
}

/**
 * Search the knowledge base for content relevant to the query.
 * Returns formatted context string if found, null if no relevant sections.
 */
export function retrieveKBContext(query: string, topK = 2): string | null {
  const sections = loadKnowledgeBase();
  if (!sections.length) return null;

  const scored = sections
    .map((s) => ({ ...s, score: scoreRelevance(query, s) }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  if (!scored.length) return null;

  return scored
    .map((s) => `### ${s.heading}\n${s.content}`)
    .join("\n\n");
}

/** Clear cache (useful for dev hot-reload) */
export function clearKBCache() {
  cachedSections = null;
}
