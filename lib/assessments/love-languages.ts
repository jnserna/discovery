type LoveLanguage = "qualityTime" | "wordsOfAffirmation" | "actsOfService" | "gifts" | "physicalTouch";

interface LLQuestion {
  id: string;
  text: string;
  textEs: string;
  options: { label: string; labelEs: string; value: LoveLanguage }[];
}

export const loveLanguageQuestions: LLQuestion[] = [
  {
    id: "ll1",
    text: "After a hard week, what would mean the most to you?",
    textEs: "Después de una semana difícil, ¿qué significaría más para ti?",
    options: [
      { label: "Undivided one-on-one time with someone I love", labelEs: "Tiempo exclusivo con alguien que amo", value: "qualityTime" },
      { label: "Hearing 'I'm so proud of you' or 'I love you'", labelEs: "Escuchar 'Estoy muy orgulloso/a de ti' o 'Te amo'", value: "wordsOfAffirmation" },
      { label: "Someone cooking for me or taking care of a task", labelEs: "Alguien cocinando para mí o encargándose de una tarea", value: "actsOfService" },
      { label: "A thoughtful gift, even something small", labelEs: "Un regalo considerado, incluso algo pequeño", value: "gifts" },
      { label: "A long hug or physical comfort", labelEs: "Un abrazo largo o consuelo físico", value: "physicalTouch" },
    ],
  },
  {
    id: "ll2",
    text: "In a relationship, I feel most loved when...",
    textEs: "En una relación, me siento más amado/a cuando...",
    options: [
      { label: "My partner puts their phone away and really listens to me", labelEs: "Mi pareja guarda el teléfono y realmente me escucha", value: "qualityTime" },
      { label: "My partner tells me how much I mean to them", labelEs: "Mi pareja me dice cuánto significo para ellos", value: "wordsOfAffirmation" },
      { label: "My partner does something helpful without being asked", labelEs: "Mi pareja hace algo útil sin que se lo pida", value: "actsOfService" },
      { label: "My partner surprises me with something special", labelEs: "Mi pareja me sorprende con algo especial", value: "gifts" },
      { label: "My partner reaches out to touch my hand or sit close to me", labelEs: "Mi pareja extiende la mano para tocarme o sentarse cerca de mí", value: "physicalTouch" },
    ],
  },
  {
    id: "ll3",
    text: "I feel hurt when...",
    textEs: "Me siento herido/a cuando...",
    options: [
      { label: "The people I love are too busy or distracted to spend time with me", labelEs: "Las personas que amo están demasiado ocupadas para pasar tiempo conmigo", value: "qualityTime" },
      { label: "I don't receive words of thanks or appreciation", labelEs: "No recibo palabras de agradecimiento o apreciación", value: "wordsOfAffirmation" },
      { label: "I do everything and no one helps me in return", labelEs: "Hago todo y nadie me ayuda a cambio", value: "actsOfService" },
      { label: "Important occasions pass without any gesture", labelEs: "Ocasiones importantes pasan sin ningún gesto", value: "gifts" },
      { label: "I'm going through something and no one offers physical comfort", labelEs: "Estoy pasando por algo y nadie ofrece consuelo físico", value: "physicalTouch" },
    ],
  },
  {
    id: "ll4",
    text: "What do I naturally do to show love?",
    textEs: "¿Qué hago naturalmente para mostrar amor?",
    options: [
      { label: "Plan activities and make time to be fully present", labelEs: "Planifico actividades y hago tiempo para estar completamente presente", value: "qualityTime" },
      { label: "Write notes, give compliments, express appreciation verbally", labelEs: "Escribo notas, doy cumplidos, expreso apreciación verbalmente", value: "wordsOfAffirmation" },
      { label: "Help with errands, cook, fix things, take care of tasks", labelEs: "Ayudo con recados, cocino, arreglo cosas, me encargo de tareas", value: "actsOfService" },
      { label: "Give gifts that show I was thinking about them", labelEs: "Doy regalos que muestran que estaba pensando en ellos", value: "gifts" },
      { label: "Hug, hold hands, pat on the back, sit close", labelEs: "Abrazar, tomarse de la mano, palmear la espalda, sentarse cerca", value: "physicalTouch" },
    ],
  },
  {
    id: "ll5",
    text: "A perfect date would be...",
    textEs: "Una cita perfecta sería...",
    options: [
      { label: "A slow walk with deep conversation, no distractions", labelEs: "Un paseo tranquilo con conversación profunda, sin distracciones", value: "qualityTime" },
      { label: "Sharing what we love about each other over dinner", labelEs: "Compartir lo que amamos el uno del otro durante la cena", value: "wordsOfAffirmation" },
      { label: "Having my partner handle the planning so I can relax", labelEs: "Que mi pareja se encargue de la planificación para que yo pueda relajarme", value: "actsOfService" },
      { label: "Receiving a surprise or meaningful gift during the evening", labelEs: "Recibir una sorpresa o regalo significativo durante la velada", value: "gifts" },
      { label: "Cuddling and being physically close all evening", labelEs: "Acurrucarse y estar físicamente cerca toda la noche", value: "physicalTouch" },
    ],
  },
  {
    id: "ll6",
    text: "What makes me feel most appreciated at work or in friendships?",
    textEs: "¿Qué me hace sentir más apreciado/a en el trabajo o en las amistades?",
    options: [
      { label: "Someone making time to truly engage with me", labelEs: "Alguien que hace tiempo para involucrarse verdaderamente conmigo", value: "qualityTime" },
      { label: "A genuine 'thank you' or recognition of my efforts", labelEs: "Un genuino 'gracias' o reconocimiento de mis esfuerzos", value: "wordsOfAffirmation" },
      { label: "Someone helping me when I'm overwhelmed", labelEs: "Alguien que me ayuda cuando estoy abrumado/a", value: "actsOfService" },
      { label: "A small token of appreciation — even a coffee", labelEs: "Un pequeño gesto de apreciación — incluso un café", value: "gifts" },
      { label: "A warm hug or friendly physical gesture", labelEs: "Un abrazo cálido o gesto físico amistoso", value: "physicalTouch" },
    ],
  },
  {
    id: "ll7",
    text: "When I'm sick or going through something hard, I most want...",
    textEs: "Cuando estoy enfermo/a o pasando algo difícil, más quiero...",
    options: [
      { label: "Someone to sit with me, even in silence", labelEs: "Alguien que se siente conmigo, incluso en silencio", value: "qualityTime" },
      { label: "Encouragement and kind words", labelEs: "Ánimo y palabras amables", value: "wordsOfAffirmation" },
      { label: "Help with practical things — food, errands, logistics", labelEs: "Ayuda con cosas prácticas — comida, recados, logística", value: "actsOfService" },
      { label: "A thoughtful get-well gift or gesture", labelEs: "Un regalo o gesto considerado de mejorate", value: "gifts" },
      { label: "Physical presence and comfort — holding hands or hugging", labelEs: "Presencia física y consuelo — tomarse de la mano o abrazar", value: "physicalTouch" },
    ],
  },
  {
    id: "ll8",
    text: "I feel disconnected from my partner when...",
    textEs: "Me siento desconectado/a de mi pareja cuando...",
    options: [
      { label: "We haven't had quality time together in a while", labelEs: "No hemos tenido tiempo de calidad juntos en un tiempo", value: "qualityTime" },
      { label: "I haven't heard 'I love you' or felt appreciated recently", labelEs: "No he escuchado 'Te amo' o me he sentido apreciado/a recientemente", value: "wordsOfAffirmation" },
      { label: "We're not supporting each other in practical ways", labelEs: "No nos estamos apoyando mutuamente de maneras prácticas", value: "actsOfService" },
      { label: "No effort has been made to show thoughtfulness", labelEs: "No se ha hecho ningún esfuerzo para mostrar consideración", value: "gifts" },
      { label: "We've been physically distant or not affectionate", labelEs: "Hemos estado físicamente distantes o sin ser afectuosos", value: "physicalTouch" },
    ],
  },
  {
    id: "ll9",
    text: "An unexpected gesture that would melt my heart:",
    textEs: "Un gesto inesperado que me derretiría el corazón:",
    options: [
      { label: "Spontaneous road trip or adventure together", labelEs: "Viaje espontáneo o aventura juntos", value: "qualityTime" },
      { label: "A heartfelt letter or voice message", labelEs: "Una carta sincera o mensaje de voz", value: "wordsOfAffirmation" },
      { label: "Having my to-do list handled without being asked", labelEs: "Que se encarguen de mi lista de tareas sin que lo pida", value: "actsOfService" },
      { label: "Something they knew I'd love, from memory", labelEs: "Algo que sabían que me encantaría, de memoria", value: "gifts" },
      { label: "A random, tender kiss or long embrace", labelEs: "Un beso tierno e inesperado o un abrazo largo", value: "physicalTouch" },
    ],
  },
  {
    id: "ll10",
    text: "My favorite way to spend a Sunday with someone I love:",
    textEs: "Mi forma favorita de pasar un domingo con alguien que amo:",
    options: [
      { label: "Cooking and talking all day with no agenda", labelEs: "Cocinando y hablando todo el día sin agenda", value: "qualityTime" },
      { label: "Reminiscing about good memories and sharing gratitude", labelEs: "Recordando buenos momentos y compartiendo gratitud", value: "wordsOfAffirmation" },
      { label: "Taking care of home tasks together and feeling like a team", labelEs: "Encargándose de tareas del hogar juntos y sintiéndonos como un equipo", value: "actsOfService" },
      { label: "Exchanging small surprise gifts or tokens", labelEs: "Intercambiando pequeñas sorpresas o tokens", value: "gifts" },
      { label: "Snuggling on the couch watching a movie", labelEs: "Acurrucándonos en el sofá viendo una película", value: "physicalTouch" },
    ],
  },
  {
    id: "ll11",
    text: "The most meaningful thing someone can give me:",
    textEs: "Lo más significativo que alguien puede darme:",
    options: [
      { label: "Their full, undivided attention", labelEs: "Su atención plena e indivisa", value: "qualityTime" },
      { label: "Genuine, sincere words of affection", labelEs: "Palabras genuinas y sinceras de afecto", value: "wordsOfAffirmation" },
      { label: "Taking something off my plate without being asked", labelEs: "Quitarme algo de encima sin que se lo pida", value: "actsOfService" },
      { label: "A gift that shows they really know me", labelEs: "Un regalo que muestre que realmente me conocen", value: "gifts" },
      { label: "Consistent warmth and physical closeness", labelEs: "Calidez constante y cercanía física", value: "physicalTouch" },
    ],
  },
  {
    id: "ll12",
    text: "I tend to show love by...",
    textEs: "Tiendo a mostrar amor...",
    options: [
      { label: "Clearing my schedule to be with them", labelEs: "Despejando mi agenda para estar con ellos", value: "qualityTime" },
      { label: "Saying 'I love you' and giving compliments freely", labelEs: "Diciendo 'Te amo' y dando cumplidos libremente", value: "wordsOfAffirmation" },
      { label: "Anticipating their needs and taking action", labelEs: "Anticipando sus necesidades y tomando acción", value: "actsOfService" },
      { label: "Bringing them small treats that made me think of them", labelEs: "Llevándoles pequeños detalles que me los recordaron", value: "gifts" },
      { label: "Hugging often and creating physical connection", labelEs: "Abrazando frecuentemente y creando conexión física", value: "physicalTouch" },
    ],
  },
  {
    id: "ll13",
    text: "Which of these bothers you the most in relationships?",
    textEs: "¿Cuál de estas cosas te molesta más en las relaciones?",
    options: [
      { label: "Too much time apart or never really connecting", labelEs: "Demasiado tiempo separados o nunca conectar realmente", value: "qualityTime" },
      { label: "Feeling taken for granted without acknowledgment", labelEs: "Sentirse dado/a por hecho/a sin reconocimiento", value: "wordsOfAffirmation" },
      { label: "Being with someone who never helps or contributes", labelEs: "Estar con alguien que nunca ayuda ni contribuye", value: "actsOfService" },
      { label: "A partner who never makes special gestures or efforts", labelEs: "Una pareja que nunca hace gestos o esfuerzos especiales", value: "gifts" },
      { label: "Lack of physical affection or warmth", labelEs: "Falta de afecto físico o calidez", value: "physicalTouch" },
    ],
  },
  {
    id: "ll14",
    text: "An apology feels complete when...",
    textEs: "Una disculpa se siente completa cuando...",
    options: [
      { label: "We sit and talk it through completely, face to face", labelEs: "Nos sentamos y lo hablamos completamente, cara a cara", value: "qualityTime" },
      { label: "I hear 'I'm sorry' sincerely, with real words", labelEs: "Escucho 'Lo siento' sinceramente, con palabras reales", value: "wordsOfAffirmation" },
      { label: "They do something that shows they've changed their behavior", labelEs: "Hacen algo que muestra que han cambiado su comportamiento", value: "actsOfService" },
      { label: "They bring a peace offering — flowers, a card, something", labelEs: "Traen una ofrenda de paz — flores, una tarjeta, algo", value: "gifts" },
      { label: "We hug and physically reconnect", labelEs: "Nos abrazamos y nos reconectamos físicamente", value: "physicalTouch" },
    ],
  },
  {
    id: "ll15",
    text: "I know I'm deeply loved when...",
    textEs: "Sé que soy profundamente amado/a cuando...",
    options: [
      { label: "Someone consistently makes time for me, even when busy", labelEs: "Alguien consistentemente hace tiempo para mí, incluso cuando está ocupado/a", value: "qualityTime" },
      { label: "People express admiration and appreciation for who I am", labelEs: "Las personas expresan admiración y apreciación por quien soy", value: "wordsOfAffirmation" },
      { label: "Others help me without expecting anything in return", labelEs: "Los demás me ayudan sin esperar nada a cambio", value: "actsOfService" },
      { label: "I receive meaningful gifts that show I was thought of", labelEs: "Recibo regalos significativos que muestran que fui pensado/a", value: "gifts" },
      { label: "I'm held, touched, and physically present with those I love", labelEs: "Me sostienen, tocan y tengo presencia física con quienes amo", value: "physicalTouch" },
    ],
  },
];

export function scoreLoveLanguages(answers: Record<string, string | number>): Record<LoveLanguage, number> {
  const counts: Record<LoveLanguage, number> = {
    qualityTime: 0, wordsOfAffirmation: 0, actsOfService: 0, gifts: 0, physicalTouch: 0,
  };
  for (const q of loveLanguageQuestions) {
    const selected = answers[q.id];
    const opt = q.options.find((o) => o.label === selected || o.labelEs === selected);
    if (opt) counts[opt.value]++;
  }
  return counts;
}

export const loveLanguageInfo = {
  qualityTime: {
    en: { name: "Quality Time", desc: "Undivided attention and being truly present is how you feel most loved." },
    es: { name: "Tiempo de Calidad", desc: "La atención plena y estar verdaderamente presente es como te sientes más amado/a." },
    color: "#6366f1",
  },
  wordsOfAffirmation: {
    en: { name: "Words of Affirmation", desc: "Verbal expressions of love, appreciation, and encouragement fill your heart." },
    es: { name: "Palabras de Afirmación", desc: "Las expresiones verbales de amor, apreciación y aliento llenan tu corazón." },
    color: "#10b981",
  },
  actsOfService: {
    en: { name: "Acts of Service", desc: "Actions speak louder than words for you — love is in the doing." },
    es: { name: "Actos de Servicio", desc: "Para ti, las acciones hablan más que las palabras — el amor está en el hacer." },
    color: "#f59e0b",
  },
  gifts: {
    en: { name: "Receiving Gifts", desc: "Thoughtful gifts symbolize love and show that someone was thinking of you." },
    es: { name: "Recibir Regalos", desc: "Los regalos considerados simbolizan el amor y muestran que alguien pensó en ti." },
    color: "#ec4899",
  },
  physicalTouch: {
    en: { name: "Physical Touch", desc: "Physical connection — hugs, holding hands, closeness — is your love language." },
    es: { name: "Contacto Físico", desc: "La conexión física — abrazos, tomarse de la mano, cercanía — es tu lenguaje del amor." },
    color: "#ef4444",
  },
};
