export interface AttachmentQuestion {
  id: string;
  text: string;
  textEs: string;
  options: { label: string; labelEs: string; style: "secure" | "anxious" | "avoidant" | "disorganized" }[];
}

export const attachmentQuestions: AttachmentQuestion[] = [
  {
    id: "a1",
    text: "When someone I love doesn't text back for a few hours, I...",
    textEs: "Cuando alguien que quiero no responde mis mensajes por unas horas, yo...",
    options: [
      { label: "Assume they're busy and wait comfortably", labelEs: "Asumo que están ocupados y espero tranquilamente", style: "secure" },
      { label: "Start wondering if they're upset with me", labelEs: "Empiezo a preguntarme si están molestos conmigo", style: "anxious" },
      { label: "Feel relieved — I enjoy the space", labelEs: "Me siento aliviado/a — disfruto el espacio", style: "avoidant" },
      { label: "Feel a mix of panic and numbness", labelEs: "Siento una mezcla de pánico y entumecimiento", style: "disorganized" },
    ],
  },
  {
    id: "a2",
    text: "In a close relationship, I...",
    textEs: "En una relación cercana, yo...",
    options: [
      { label: "Feel comfortable depending on others and being depended on", labelEs: "Me siento cómodo/a dependiendo de otros y siendo dependido/a", style: "secure" },
      { label: "Worry my partner doesn't love me as much as I love them", labelEs: "Me preocupa que mi pareja no me ame tanto como yo a ellos", style: "anxious" },
      { label: "Feel uncomfortable with too much closeness or dependency", labelEs: "Me siento incómodo/a con demasiada cercanía o dependencia", style: "avoidant" },
      { label: "Both want closeness deeply and feel terrified of it", labelEs: "Tanto quiero la cercanía profundamente como me aterroriza", style: "disorganized" },
    ],
  },
  {
    id: "a3",
    text: "When I'm going through something difficult, I tend to...",
    textEs: "Cuando estoy pasando por algo difícil, tiendo a...",
    options: [
      { label: "Reach out to people I trust for support", labelEs: "Comunicarme con personas de confianza para buscar apoyo", style: "secure" },
      { label: "Cling to my partner or closest person and need constant reassurance", labelEs: "Aferrarme a mi pareja o persona más cercana y necesitar tranquilidad constante", style: "anxious" },
      { label: "Handle it alone — I don't like burdening others", labelEs: "Manejarlo solo/a — no me gusta ser una carga para otros", style: "avoidant" },
      { label: "Want help but push people away when they try to give it", labelEs: "Querer ayuda pero alejar a las personas cuando intentan dárla", style: "disorganized" },
    ],
  },
  {
    id: "a4",
    text: "After a fight with someone I care about, I usually...",
    textEs: "Después de una pelea con alguien que me importa, generalmente...",
    options: [
      { label: "Address it directly and work toward resolution", labelEs: "Lo abordo directamente y trabajo hacia una resolución", style: "secure" },
      { label: "Need immediate reassurance that we're okay", labelEs: "Necesito tranquilidad inmediata de que estamos bien", style: "anxious" },
      { label: "Need space and time before reconnecting", labelEs: "Necesito espacio y tiempo antes de reconectarme", style: "avoidant" },
      { label: "Feel confused — want to make up but also want to flee", labelEs: "Me siento confundido/a — quiero reconciliarme pero también quiero huir", style: "disorganized" },
    ],
  },
  {
    id: "a5",
    text: "My general view of people is...",
    textEs: "Mi visión general de las personas es...",
    options: [
      { label: "Most people are trustworthy and well-meaning", labelEs: "La mayoría de las personas son confiables y bien intencionadas", style: "secure" },
      { label: "People I love might leave or betray me", labelEs: "Las personas que amo podrían abandonarme o traicionarme", style: "anxious" },
      { label: "People are generally unreliable — better to be self-sufficient", labelEs: "Las personas son generalmente poco confiables — mejor ser autosuficiente", style: "avoidant" },
      { label: "People are simultaneously my greatest need and my greatest threat", labelEs: "Las personas son simultáneamente mi mayor necesidad y mi mayor amenaza", style: "disorganized" },
    ],
  },
  {
    id: "a6",
    text: "When I think about my childhood attachment to caregivers...",
    textEs: "Cuando pienso en mi apego de infancia hacia los cuidadores...",
    options: [
      { label: "I felt mostly safe and loved, even when there were difficulties", labelEs: "Me sentí mayormente seguro/a y amado/a, incluso cuando había dificultades", style: "secure" },
      { label: "I was often anxious about whether they would be there for me", labelEs: "A menudo estaba ansioso/a sobre si estarían para mí", style: "anxious" },
      { label: "I learned early to be independent and not need much from them", labelEs: "Aprendí temprano a ser independiente y no necesitar mucho de ellos", style: "avoidant" },
      { label: "My caregivers were sometimes a source of comfort and sometimes frightening", labelEs: "Mis cuidadores a veces eran fuente de consuelo y a veces aterradores", style: "disorganized" },
    ],
  },
  {
    id: "a7",
    text: "In romantic relationships, I often feel...",
    textEs: "En relaciones románticas, a menudo me siento...",
    options: [
      { label: "Secure and able to be vulnerable without constant fear", labelEs: "Seguro/a y capaz de ser vulnerable sin miedo constante", style: "secure" },
      { label: "Like I need more reassurance than my partner gives", labelEs: "Como que necesito más tranquilidad de la que me da mi pareja", style: "anxious" },
      { label: "Like closeness makes me uncomfortable or even suffocated", labelEs: "Como que la cercanía me incomoda o incluso me asfixia", style: "avoidant" },
      { label: "Confused — I want deep connection but it also feels unsafe", labelEs: "Confundido/a — quiero conexión profunda pero también se siente peligroso", style: "disorganized" },
    ],
  },
  {
    id: "a8",
    text: "When my partner asks for space or independence, I...",
    textEs: "Cuando mi pareja pide espacio o independencia, yo...",
    options: [
      { label: "Understand and give it without feeling threatened", labelEs: "Entiendo y lo doy sin sentirme amenazado/a", style: "secure" },
      { label: "Feel anxious and wonder if they're pulling away", labelEs: "Me siento ansioso/a y me pregunto si se están alejando", style: "anxious" },
      { label: "Feel relieved — I value my own space too", labelEs: "Me siento aliviado/a — yo también valoro mi propio espacio", style: "avoidant" },
      { label: "Feel both relieved and terrified at the same time", labelEs: "Me siento aliviado/a y aterrorizado/a al mismo tiempo", style: "disorganized" },
    ],
  },
  {
    id: "a9",
    text: "When someone expresses deep feelings for me, I...",
    textEs: "Cuando alguien me expresa sentimientos profundos, yo...",
    options: [
      { label: "Feel touched and respond openly", labelEs: "Me siento conmovido/a y respondo abiertamente", style: "secure" },
      { label: "Feel overjoyed but also worry it won't last", labelEs: "Me siento muy feliz pero también me preocupa que no dure", style: "anxious" },
      { label: "Feel uncomfortable and may pull back", labelEs: "Me siento incómodo/a y puedo alejarme", style: "avoidant" },
      { label: "Feel overwhelmed — wanting to embrace it and run from it", labelEs: "Me siento abrumado/a — queriendo abrazarlo y huir de él", style: "disorganized" },
    ],
  },
  {
    id: "a10",
    text: "My biggest relationship fear is...",
    textEs: "Mi mayor miedo en las relaciones es...",
    options: [
      { label: "Losing someone I love — but I know I could cope", labelEs: "Perder a alguien que amo — pero sé que podría manejarlo", style: "secure" },
      { label: "Being abandoned or replaced", labelEs: "Ser abandonado/a o reemplazado/a", style: "anxious" },
      { label: "Losing my independence or being too dependent", labelEs: "Perder mi independencia o ser demasiado dependiente", style: "avoidant" },
      { label: "Being hurt by the very person I need most", labelEs: "Ser lastimado/a por la misma persona que más necesito", style: "disorganized" },
    ],
  },
  {
    id: "a11",
    text: "My internal self-talk about relationships tends to be...",
    textEs: "Mi diálogo interno sobre las relaciones tiende a ser...",
    options: [
      { label: "\"I am lovable and relationships are generally good\"", labelEs: "\"Soy amable y las relaciones son generalmente buenas\"", style: "secure" },
      { label: "\"I need to be better/more to keep love\"", labelEs: "\"Necesito ser mejor/más para mantener el amor\"", style: "anxious" },
      { label: "\"I'm fine on my own, I don't really need anyone\"", labelEs: "\"Estoy bien solo/a, en realidad no necesito a nadie\"", style: "avoidant" },
      { label: "\"Love is dangerous, but I desperately need it anyway\"", labelEs: "\"El amor es peligroso, pero lo necesito desesperadamente de todos modos\"", style: "disorganized" },
    ],
  },
  {
    id: "a12",
    text: "When it comes to emotional intimacy, I...",
    textEs: "Cuando se trata de intimidad emocional, yo...",
    options: [
      { label: "Can share deeply and receive deeply without much fear", labelEs: "Puedo compartir profundamente y recibir profundamente sin mucho miedo", style: "secure" },
      { label: "Over-share early in relationships to feel connected fast", labelEs: "Comparto demasiado temprano en las relaciones para sentirme conectado/a rápidamente", style: "anxious" },
      { label: "Keep things surface-level for a long time", labelEs: "Mantengo las cosas en un nivel superficial durante mucho tiempo", style: "avoidant" },
      { label: "Swing between sharing too much and shutting down completely", labelEs: "Oscilo entre compartir demasiado y cerrarme completamente", style: "disorganized" },
    ],
  },
  {
    id: "a13",
    text: "I believe that in relationships...",
    textEs: "Creo que en las relaciones...",
    options: [
      { label: "Conflict is normal and can strengthen the bond", labelEs: "El conflicto es normal y puede fortalecer el vínculo", style: "secure" },
      { label: "Conflict is a signal that the relationship is in danger", labelEs: "El conflicto es una señal de que la relación está en peligro", style: "anxious" },
      { label: "Conflict is best avoided or resolved quickly with distance", labelEs: "El conflicto se evita mejor o se resuelve rápidamente con distancia", style: "avoidant" },
      { label: "Conflict is dangerous and I often don't know how to handle it", labelEs: "El conflicto es peligroso y a menudo no sé cómo manejarlo", style: "disorganized" },
    ],
  },
  {
    id: "a14",
    text: "When a relationship ends, I typically...",
    textEs: "Cuando una relación termina, típicamente...",
    options: [
      { label: "Grieve, but recover with time and maintain self-worth", labelEs: "Hago duelo, pero me recupero con el tiempo y mantengo mi autoestima", style: "secure" },
      { label: "Feel devastated and struggle to let go", labelEs: "Me siento devastado/a y lucho por soltar", style: "anxious" },
      { label: "Move on relatively quickly — detachment comes naturally", labelEs: "Sigo adelante relativamente rápido — el desapego me llega naturalmente", style: "avoidant" },
      { label: "Feel a chaotic mix of relief and overwhelming grief", labelEs: "Siento una mezcla caótica de alivio y duelo abrumador", style: "disorganized" },
    ],
  },
  {
    id: "a15",
    text: "Overall, my relationship to needing other people is...",
    textEs: "En general, mi relación con necesitar a otras personas es...",
    options: [
      { label: "Healthy — I value connection AND independence in balance", labelEs: "Saludable — valoro la conexión Y la independencia en equilibrio", style: "secure" },
      { label: "Intense — I feel I need people deeply to feel okay", labelEs: "Intensa — siento que necesito a las personas profundamente para sentirme bien", style: "anxious" },
      { label: "Minimal — I prefer to need no one, or at least not show it", labelEs: "Mínima — prefiero no necesitar a nadie, o al menos no mostrarlo", style: "avoidant" },
      { label: "Complicated — I need people but needing feels threatening", labelEs: "Complicada — necesito a las personas pero necesitar se siente amenazante", style: "disorganized" },
    ],
  },
];

export function scoreAttachment(answers: Record<string, string | number>): string {
  const counts: Record<string, number> = {
    secure: 0, anxious: 0, avoidant: 0, disorganized: 0,
  };

  for (const question of attachmentQuestions) {
    const selectedLabel = answers[question.id];
    const option = question.options.find(
      (o) => o.label === selectedLabel || o.labelEs === selectedLabel
    );
    if (option) counts[option.style]++;
  }

  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

export const attachmentDescriptions = {
  secure: {
    name: "Secure",
    nameEs: "Seguro/a",
    color: "#10b981",
    en: "You have a healthy relationship with closeness and independence. You trust others and yourself, can be vulnerable without excessive fear, and handle conflict constructively. You serve as a stabilizing force in relationships.",
    es: "Tienes una relación saludable con la cercanía y la independencia. Confías en los demás y en ti mismo/a, puedes ser vulnerable sin miedo excesivo y manejas el conflicto de manera constructiva.",
    growth: "Continue to be an anchor for others while staying connected to your own needs.",
    growthEs: "Continúa siendo un ancla para los demás mientras permaneces conectado/a a tus propias necesidades.",
  },
  anxious: {
    name: "Anxious",
    nameEs: "Ansioso/a",
    color: "#f59e0b",
    en: "You crave deep connection but often fear it won't last. You may need more reassurance than others, and your emotions in relationships run intense. This comes from a deep capacity for love — and a core wound around abandonment.",
    es: "Anhelas una conexión profunda pero a menudo temes que no dure. Puedes necesitar más tranquilidad que otros y tus emociones en las relaciones son intensas. Esto viene de una profunda capacidad de amar.",
    growth: "Practice self-soothing before reaching out. Ask: 'Is this fear real, or is it the past speaking?'",
    growthEs: "Practica la autocalmación antes de comunicarte. Pregúntate: '¿Es este miedo real, o es el pasado hablando?'",
  },
  avoidant: {
    name: "Avoidant",
    nameEs: "Evitativo/a",
    color: "#3b82f6",
    en: "You've learned to rely on yourself and value independence highly. Intimacy can feel uncomfortable or threatening. This self-sufficiency is a strength — but it can keep you from the deep connection you likely also crave.",
    es: "Has aprendido a depender de ti mismo/a y valoras mucho la independencia. La intimidad puede sentirse incómoda o amenazante. Esta autosuficiencia es una fortaleza, pero puede alejarte de la conexión profunda.",
    growth: "Practice staying in discomfort when someone reaches toward you emotionally. Vulnerability is not weakness.",
    growthEs: "Practica permanecer en la incomodidad cuando alguien se acerca a ti emocionalmente. La vulnerabilidad no es debilidad.",
  },
  disorganized: {
    name: "Disorganized",
    nameEs: "Desorganizado/a",
    color: "#8b5cf6",
    en: "You experience a powerful push-pull in relationships: you desperately want closeness and simultaneously fear it. This often develops when early caregivers were both comforting and frightening. Healing is absolutely possible.",
    es: "Experimentas un poderoso tira y afloja en las relaciones: deseas desesperadamente la cercanía y simultáneamente la temes. Esto a menudo se desarrolla cuando los cuidadores tempranos eran tanto reconfortantes como aterradores.",
    growth: "Consider working with a therapist. Learning to feel safe in relationships is one of the most transformative journeys you can take.",
    growthEs: "Considera trabajar con un terapeuta. Aprender a sentirte seguro/a en las relaciones es uno de los viajes más transformadores que puedes emprender.",
  },
};
