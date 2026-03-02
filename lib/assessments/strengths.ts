interface StrengthsQuestion {
  id: string;
  text: string;
  textEs: string;
  strength: string;
}

export const strengthsQuestions: StrengthsQuestion[] = [
  { id: "s1", text: "I often find creative solutions that others haven't thought of.", textEs: "A menudo encuentro soluciones creativas que otros no han pensado.", strength: "Creativity" },
  { id: "s2", text: "I love learning new things and rarely feel like I know enough.", textEs: "Me encanta aprender cosas nuevas y rara vez siento que sé suficiente.", strength: "Love of Learning" },
  { id: "s3", text: "I can see the bigger picture and help others understand what really matters.", textEs: "Puedo ver el panorama general y ayudar a otros a entender lo que realmente importa.", strength: "Wisdom" },
  { id: "s4", text: "I feel energized when I can be brave and stand up for what is right.", textEs: "Me siento con energía cuando puedo ser valiente y defender lo que es correcto.", strength: "Bravery" },
  { id: "s5", text: "I persist through challenges and rarely give up on important goals.", textEs: "Persisto a través de los desafíos y rara vez me rindo ante metas importantes.", strength: "Perseverance" },
  { id: "s6", text: "I am deeply honest — with myself and with others.", textEs: "Soy profundamente honesto/a — conmigo mismo/a y con los demás.", strength: "Honesty" },
  { id: "s7", text: "I bring energy and enthusiasm to everything I do.", textEs: "Traigo energía y entusiasmo a todo lo que hago.", strength: "Zest" },
  { id: "s8", text: "I genuinely love people and am loved in return.", textEs: "Genuinamente amo a las personas y soy amado/a a cambio.", strength: "Love" },
  { id: "s9", text: "I look for ways to help others, even when it's inconvenient.", textEs: "Busco formas de ayudar a los demás, incluso cuando es inconveniente.", strength: "Kindness" },
  { id: "s10", text: "I am good at understanding different perspectives in social situations.", textEs: "Soy bueno/a entendiendo diferentes perspectivas en situaciones sociales.", strength: "Social Intelligence" },
  { id: "s11", text: "I work well in a team and feel responsibility for the group's success.", textEs: "Trabajo bien en equipo y siento responsabilidad por el éxito del grupo.", strength: "Teamwork" },
  { id: "s12", text: "I treat everyone fairly, regardless of their background.", textEs: "Trato a todos de manera justa, independientemente de su origen.", strength: "Fairness" },
  { id: "s13", text: "I naturally step into leadership roles when no one else does.", textEs: "Naturalmente asumo roles de liderazgo cuando nadie más lo hace.", strength: "Leadership" },
  { id: "s14", text: "I forgive easily and don't hold grudges.", textEs: "Perdono fácilmente y no guardo rencor.", strength: "Forgiveness" },
  { id: "s15", text: "I am humble about my accomplishments and don't need recognition.", textEs: "Soy humilde sobre mis logros y no necesito reconocimiento.", strength: "Humility" },
  { id: "s16", text: "I think carefully before acting and rarely do things I regret.", textEs: "Pienso cuidadosamente antes de actuar y rara vez hago cosas de las que me arrepiento.", strength: "Prudence" },
  { id: "s17", text: "I am very good at managing my emotions and impulses.", textEs: "Soy muy bueno/a manejando mis emociones e impulsos.", strength: "Self-Regulation" },
  { id: "s18", text: "I notice and appreciate beauty in everyday life.", textEs: "Noto y aprecio la belleza en la vida cotidiana.", strength: "Appreciation of Beauty" },
  { id: "s19", text: "I feel deeply grateful for my life and express it often.", textEs: "Me siento profundamente agradecido/a por mi vida y lo expreso con frecuencia.", strength: "Gratitude" },
  { id: "s20", text: "I maintain optimism even in difficult circumstances.", textEs: "Mantengo el optimismo incluso en circunstancias difíciles.", strength: "Hope" },
];

const ratingOptions = [
  { en: "Not at all like me", es: "Para nada como yo", value: 1 },
  { en: "Slightly like me", es: "Ligeramente como yo", value: 2 },
  { en: "Somewhat like me", es: "Algo como yo", value: 3 },
  { en: "Mostly like me", es: "Mayormente como yo", value: 4 },
  { en: "Very much like me", es: "Muy como yo", value: 5 },
];

export function getStrengthsQuestions(lang: "en" | "es") {
  return strengthsQuestions.map((q) => ({
    id: q.id,
    text: lang === "es" ? q.textEs : q.text,
    options: ratingOptions.map((o) => ({
      label: lang === "es" ? o.es : o.en,
      value: o.value,
    })),
  }));
}

export function scoreStrengths(answers: Record<string, string | number>): { strength: string; score: number }[] {
  return strengthsQuestions
    .map((q) => ({ strength: q.strength, score: Number(answers[q.id]) || 0 }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}
