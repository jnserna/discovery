export interface BigFiveQuestion {
  id: string;
  text: string;
  textEs: string;
  trait: "O" | "C" | "E" | "A" | "N";
  reverse?: boolean;
}

export const bigFiveQuestions: BigFiveQuestion[] = [
  // Openness (O)
  { id: "O1", text: "I have a vivid imagination and enjoy creative activities.", textEs: "Tengo una imaginación vívida y disfruto las actividades creativas.", trait: "O" },
  { id: "O2", text: "I am curious about many different things.", textEs: "Soy curioso/a sobre muchas cosas diferentes.", trait: "O" },
  { id: "O3", text: "I enjoy exploring abstract ideas and theories.", textEs: "Disfruto explorar ideas abstractas y teorías.", trait: "O" },
  { id: "O4", text: "I appreciate art, music, and poetry deeply.", textEs: "Aprecio profundamente el arte, la música y la poesía.", trait: "O" },
  // Conscientiousness (C)
  { id: "C1", text: "I always come prepared and follow through on plans.", textEs: "Siempre llego preparado/a y cumplo con los planes.", trait: "C" },
  { id: "C2", text: "I am a very organized person.", textEs: "Soy una persona muy organizada.", trait: "C" },
  { id: "C3", text: "I pay close attention to detail in my work.", textEs: "Presto mucha atención a los detalles en mi trabajo.", trait: "C" },
  { id: "C4", text: "I rarely leave tasks unfinished.", textEs: "Rara vez dejo tareas sin terminar.", trait: "C" },
  // Extraversion (E)
  { id: "E1", text: "I feel energized being around lots of people.", textEs: "Me siento con energía cuando estoy rodeado/a de muchas personas.", trait: "E" },
  { id: "E2", text: "I am talkative and comfortable starting conversations.", textEs: "Soy hablador/a y me siento cómodo/a iniciando conversaciones.", trait: "E" },
  { id: "E3", text: "I enjoy being the center of attention.", textEs: "Disfruto ser el centro de atención.", trait: "E" },
  { id: "E4", text: "I feel drained after spending a lot of time alone.", textEs: "Me siento agotado/a después de pasar mucho tiempo solo/a.", trait: "E" },
  // Agreeableness (A)
  { id: "A1", text: "I go out of my way to help others.", textEs: "Me esfuerzo por ayudar a los demás.", trait: "A" },
  { id: "A2", text: "I am genuinely interested in other people's feelings.", textEs: "Me interesan genuinamente los sentimientos de otras personas.", trait: "A" },
  { id: "A3", text: "I tend to trust people easily.", textEs: "Tiendo a confiar en las personas fácilmente.", trait: "A" },
  { id: "A4", text: "I try to avoid conflict and keep the peace.", textEs: "Intento evitar el conflicto y mantener la paz.", trait: "A" },
  // Neuroticism (N)
  { id: "N1", text: "I often feel anxious or worried about things.", textEs: "A menudo me siento ansioso/a o preocupado/a por las cosas.", trait: "N" },
  { id: "N2", text: "My mood shifts frequently throughout the day.", textEs: "Mi estado de ánimo cambia frecuentemente durante el día.", trait: "N" },
  { id: "N3", text: "I get stressed out easily.", textEs: "Me estreso fácilmente.", trait: "N" },
  { id: "N4", text: "I often feel insecure about myself.", textEs: "A menudo me siento inseguro/a sobre mí mismo/a.", trait: "N" },
];

const ratingOptions = [
  { en: "Strongly Disagree", es: "Totalmente en desacuerdo", value: 1 },
  { en: "Disagree", es: "En desacuerdo", value: 2 },
  { en: "Neutral", es: "Neutral", value: 3 },
  { en: "Agree", es: "De acuerdo", value: 4 },
  { en: "Strongly Agree", es: "Totalmente de acuerdo", value: 5 },
];

export function getBigFiveQuestions(lang: "en" | "es") {
  return bigFiveQuestions.map((q) => ({
    id: q.id,
    text: lang === "es" ? q.textEs : q.text,
    options: ratingOptions.map((o) => ({
      label: lang === "es" ? o.es : o.en,
      value: o.value,
    })),
  }));
}

export interface OceanScores {
  O: number; C: number; E: number; A: number; N: number;
}

export function scoreBigFive(answers: Record<string, string | number>): OceanScores {
  const traitAnswers: Record<string, number[]> = { O: [], C: [], E: [], A: [], N: [] };

  for (const question of bigFiveQuestions) {
    const val = Number(answers[question.id]);
    if (!isNaN(val)) traitAnswers[question.trait].push(val);
  }

  const avg = (arr: number[]) =>
    arr.length ? Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 20) : 50;

  return { O: avg(traitAnswers.O), C: avg(traitAnswers.C), E: avg(traitAnswers.E), A: avg(traitAnswers.A), N: avg(traitAnswers.N) };
}

export const traitInfo = {
  en: {
    O: { name: "Openness", desc: "Imagination, curiosity, appreciation for art and creativity.", color: "#6366f1" },
    C: { name: "Conscientiousness", desc: "Organization, dependability, and a tendency to show self-discipline.", color: "#3b82f6" },
    E: { name: "Extraversion", desc: "Energy, sociability, and enthusiasm in the world.", color: "#f59e0b" },
    A: { name: "Agreeableness", desc: "Compassion, cooperation, and a trusting nature.", color: "#10b981" },
    N: { name: "Neuroticism", desc: "Tendency toward emotional instability, anxiety, and moodiness.", color: "#ef4444" },
  },
  es: {
    O: { name: "Apertura", desc: "Imaginación, curiosidad, apreciación por el arte y la creatividad.", color: "#6366f1" },
    C: { name: "Responsabilidad", desc: "Organización, confiabilidad y tendencia a la autodisciplina.", color: "#3b82f6" },
    E: { name: "Extroversión", desc: "Energía, sociabilidad y entusiasmo en el mundo.", color: "#f59e0b" },
    A: { name: "Amabilidad", desc: "Compasión, cooperación y una naturaleza confiada.", color: "#10b981" },
    N: { name: "Neuroticismo", desc: "Tendencia hacia la inestabilidad emocional, la ansiedad y los cambios de humor.", color: "#ef4444" },
  },
};
