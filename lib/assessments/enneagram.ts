// Enneagram assessment: 10 fear-based questions, types 1-9

export interface EnneagramQuestion {
  id: string;
  text: string;
  textEs: string;
  options: {
    label: string;
    labelEs: string;
    scores: number[]; // index 0-8 = types 1-9
  }[];
}

export interface EnneagramType {
  type: number;
  name: string;
  nameEs: string;
  color: string;
  wing1: number;
  wing2: number;
  growth: number;
  stress: number;
}

export interface TypeDescription {
  en: string;
  es: string;
  strengths: string[];
  challenges: string[];
  growth: string;
}

export const enneagramQuestions: EnneagramQuestion[] = [
  {
    id: "q1",
    text: "When you make a mistake, your inner voice is most like:",
    textEs: "Cuando cometes un error, tu voz interior es más como:",
    options: [
      { label: "A harsh critic demanding perfection", labelEs: "Un crítico severo que exige perfección", scores: [3,0,0,0,0,0,0,0,0] },
      { label: "A worried voice asking if others still care for you", labelEs: "Una voz preocupada preguntando si los demás aún se preocupan por ti", scores: [0,3,0,0,0,0,0,0,0] },
      { label: "A competitive push to recover and succeed", labelEs: "Un impulso competitivo para recuperarse y tener éxito", scores: [0,0,3,0,0,0,0,0,0] },
      { label: "A deep sense of being fundamentally flawed", labelEs: "Una profunda sensación de ser fundamentalmente defectuoso", scores: [0,0,0,3,0,0,0,0,0] },
      { label: "A detached analysis of what went wrong", labelEs: "Un análisis distante de qué salió mal", scores: [0,0,0,0,3,0,0,0,0] },
      { label: "A fearful scan for what this might mean for your safety", labelEs: "Un escaneo temeroso de lo que esto podría significar para tu seguridad", scores: [0,0,0,0,0,3,0,0,0] },
      { label: "A quick reframe to find the silver lining", labelEs: "Una rápida reformulación para encontrar el lado positivo", scores: [0,0,0,0,0,0,3,0,0] },
      { label: "A surge of anger at whoever or whatever caused it", labelEs: "Un aumento de ira hacia quien o lo que lo causó", scores: [0,0,0,0,0,0,0,3,0] },
      { label: "A calm acceptance and desire to move on peacefully", labelEs: "Una aceptación tranquila y el deseo de seguir adelante en paz", scores: [0,0,0,0,0,0,0,0,3] },
    ],
  },
  {
    id: "q2",
    text: "Your deepest fear is:",
    textEs: "Tu miedo más profundo es:",
    options: [
      { label: "Being corrupt, evil, or wrong", labelEs: "Ser corrupto, malvado o estar equivocado", scores: [3,0,0,0,0,0,0,0,0] },
      { label: "Being unwanted or unloved", labelEs: "Ser no querido o no amado", scores: [0,3,0,0,0,0,0,0,0] },
      { label: "Being worthless or without value", labelEs: "Ser inútil o sin valor", scores: [0,0,3,0,0,0,0,0,0] },
      { label: "Having no identity or personal significance", labelEs: "No tener identidad o significado personal", scores: [0,0,0,3,0,0,0,0,0] },
      { label: "Being useless, incapable, or incompetent", labelEs: "Ser inútil, incapaz o incompetente", scores: [0,0,0,0,3,0,0,0,0] },
      { label: "Being without support or guidance", labelEs: "Estar sin apoyo o guía", scores: [0,0,0,0,0,3,0,0,0] },
      { label: "Being deprived or trapped in pain", labelEs: "Ser privado o atrapado en el dolor", scores: [0,0,0,0,0,0,3,0,0] },
      { label: "Being controlled or harmed by others", labelEs: "Ser controlado o dañado por otros", scores: [0,0,0,0,0,0,0,3,0] },
      { label: "Loss and separation from others", labelEs: "La pérdida y la separación de los demás", scores: [0,0,0,0,0,0,0,0,3] },
    ],
  },
  {
    id: "q3",
    text: "In relationships, you most naturally:",
    textEs: "En las relaciones, naturalmente tiendes a:",
    options: [
      { label: "Try to be helpful and guide others toward what's right", labelEs: "Intentar ser útil y guiar a otros hacia lo correcto", scores: [3,1,0,0,0,0,0,0,1] },
      { label: "Give generously and anticipate what others need", labelEs: "Dar generosamente y anticipar lo que otros necesitan", scores: [0,3,0,0,0,0,0,0,1] },
      { label: "Impress and adapt to what others seem to want", labelEs: "Impresionar y adaptarte a lo que otros parecen querer", scores: [0,1,3,0,0,0,0,0,0] },
      { label: "Seek deep emotional connection and authenticity", labelEs: "Buscar conexión emocional profunda y autenticidad", scores: [0,0,0,3,0,0,0,0,0] },
      { label: "Maintain boundaries and observe from a safe distance", labelEs: "Mantener límites y observar desde una distancia segura", scores: [0,0,0,0,3,0,0,0,0] },
      { label: "Build loyalty and test trustworthiness", labelEs: "Construir lealtad y probar la confiabilidad", scores: [0,0,0,0,0,3,0,0,0] },
      { label: "Keep things fun and avoid heavy emotional weight", labelEs: "Mantener las cosas divertidas y evitar el peso emocional pesado", scores: [0,0,0,0,0,0,3,0,0] },
      { label: "Protect loved ones and take charge when needed", labelEs: "Proteger a los seres queridos y tomar el control cuando sea necesario", scores: [0,0,0,0,0,0,0,3,0] },
      { label: "Create harmony and avoid rocking the boat", labelEs: "Crear armonía y evitar crear conflictos", scores: [0,0,0,0,0,0,0,0,3] },
    ],
  },
  {
    id: "q4",
    text: "Under stress, you typically:",
    textEs: "Bajo estrés, típicamente:",
    options: [
      { label: "Become overly critical of yourself and others", labelEs: "Te vuelves excesivamente crítico contigo mismo y con los demás", scores: [3,0,0,1,0,0,0,0,0] },
      { label: "Become possessive and emotionally demanding", labelEs: "Te vuelves posesivo y emocionalmente exigente", scores: [0,3,0,0,0,0,0,0,0] },
      { label: "Overwork and cut off emotions to stay efficient", labelEs: "Trabajas demasiado y cortas las emociones para mantenerte eficiente", scores: [0,0,3,0,0,0,0,0,0] },
      { label: "Withdraw and become overly self-absorbed in feelings", labelEs: "Te retiras y te vuelves excesivamente absorto en los sentimientos", scores: [0,0,0,3,0,0,0,0,0] },
      { label: "Become scattered and unable to focus", labelEs: "Te vuelves disperso e incapaz de concentrarte", scores: [0,0,0,0,3,0,0,0,0] },
      { label: "Become indecisive and seek constant reassurance", labelEs: "Te vuelves indeciso y buscas tranquilización constante", scores: [0,0,0,0,0,3,0,0,0] },
      { label: "Become scattered across too many projects and escape", labelEs: "Te dispersas en demasiados proyectos y escapas", scores: [0,0,0,0,0,0,3,0,0] },
      { label: "Become confrontational and bulldoze opposition", labelEs: "Te vuelves conflictivo y arrollas la oposición", scores: [0,0,0,0,0,0,0,3,0] },
      { label: "Become stubborn and shut down completely", labelEs: "Te vuelves terco y te cierras por completo", scores: [0,0,0,0,0,0,0,0,3] },
    ],
  },
  {
    id: "q5",
    text: "You feel most alive and energized when:",
    textEs: "Te sientes más vivo y con energía cuando:",
    options: [
      { label: "Things are orderly, ethical, and done correctly", labelEs: "Las cosas son ordenadas, éticas y están bien hechas", scores: [3,0,0,0,0,0,0,0,0] },
      { label: "Someone genuinely needs and appreciates you", labelEs: "Alguien genuinamente te necesita y aprecia", scores: [0,3,0,0,0,0,0,0,0] },
      { label: "You achieve a goal and get recognized for it", labelEs: "Logras una meta y te reconocen por ello", scores: [0,0,3,0,0,0,0,0,0] },
      { label: "You experience something deeply beautiful or meaningful", labelEs: "Experimentas algo profundamente hermoso o significativo", scores: [0,0,0,3,0,0,0,0,0] },
      { label: "You discover a fascinating new idea or system", labelEs: "Descubres una nueva idea o sistema fascinante", scores: [0,0,0,0,3,0,0,0,0] },
      { label: "You have a clear plan and trusted allies around you", labelEs: "Tienes un plan claro y aliados de confianza a tu alrededor", scores: [0,0,0,0,0,3,0,0,0] },
      { label: "Life is full of adventure, fun, and new possibilities", labelEs: "La vida está llena de aventura, diversión y nuevas posibilidades", scores: [0,0,0,0,0,0,3,0,0] },
      { label: "You can make a real impact and stand up for what matters", labelEs: "Puedes tener un impacto real y defender lo que importa", scores: [0,0,0,0,0,0,0,3,0] },
      { label: "Everyone around you is peaceful and content", labelEs: "Todos a tu alrededor están tranquilos y contentos", scores: [0,0,0,0,0,0,0,0,3] },
    ],
  },
  {
    id: "q6",
    text: "Which desire feels most true to you?",
    textEs: "¿Cuál deseo se siente más verdadero para ti?",
    options: [
      { label: "To be good and maintain high standards", labelEs: "Ser bueno y mantener altos estándares", scores: [3,0,0,0,0,0,0,0,0] },
      { label: "To be loved and feel needed", labelEs: "Ser amado y sentirme necesitado", scores: [0,3,0,0,0,0,0,0,0] },
      { label: "To feel valuable and admired", labelEs: "Sentirme valioso y admirado", scores: [0,0,3,0,0,0,0,0,0] },
      { label: "To be authentic and find my unique identity", labelEs: "Ser auténtico y encontrar mi identidad única", scores: [0,0,0,3,0,0,0,0,0] },
      { label: "To be knowledgeable and capable", labelEs: "Ser conocedor y capaz", scores: [0,0,0,0,3,0,0,0,0] },
      { label: "To feel safe and supported", labelEs: "Sentirme seguro y apoyado", scores: [0,0,0,0,0,3,0,0,0] },
      { label: "To be free and experience joy", labelEs: "Ser libre y experimentar alegría", scores: [0,0,0,0,0,0,3,0,0] },
      { label: "To be self-reliant and strong", labelEs: "Ser autosuficiente y fuerte", scores: [0,0,0,0,0,0,0,3,0] },
      { label: "To have inner stability and peace of mind", labelEs: "Tener estabilidad interior y tranquilidad mental", scores: [0,0,0,0,0,0,0,0,3] },
    ],
  },
  {
    id: "q7",
    text: "When in a group, you tend to:",
    textEs: "Cuando estás en un grupo, tiendes a:",
    options: [
      { label: "Notice what needs improving and offer to fix it", labelEs: "Notar qué necesita mejorar y ofrecerte a arreglarlo", scores: [3,0,0,0,0,0,0,0,0] },
      { label: "Focus on each person's needs and help them feel welcomed", labelEs: "Enfocarte en las necesidades de cada persona y ayudarlas a sentirse bienvenidas", scores: [0,3,0,0,0,0,0,0,0] },
      { label: "Take a leadership role and drive the group forward", labelEs: "Tomar un papel de liderazgo y llevar al grupo hacia adelante", scores: [0,0,3,0,0,0,0,0,0] },
      { label: "Feel slightly separate, observing the emotional dynamics", labelEs: "Sentirte ligeramente separado, observando las dinámicas emocionales", scores: [0,0,0,3,0,0,0,0,0] },
      { label: "Listen and analyze before contributing", labelEs: "Escuchar y analizar antes de contribuir", scores: [0,0,0,0,3,0,0,0,0] },
      { label: "Watch for threats and check the reliability of others", labelEs: "Vigilar las amenazas y verificar la confiabilidad de los demás", scores: [0,0,0,0,0,3,0,0,0] },
      { label: "Energize the room and keep spirits high", labelEs: "Energizar el ambiente y mantener el ánimo alto", scores: [0,0,0,0,0,0,3,0,0] },
      { label: "Assert your view and challenge weak ideas", labelEs: "Afirmar tu punto de vista y desafiar las ideas débiles", scores: [0,0,0,0,0,0,0,3,0] },
      { label: "Smooth tensions and make sure everyone is included", labelEs: "Suavizar las tensiones y asegurarte de que todos estén incluidos", scores: [0,0,0,0,0,0,0,0,3] },
    ],
  },
  {
    id: "q8",
    text: "Your biggest challenge in personal growth is:",
    textEs: "Tu mayor desafío en el crecimiento personal es:",
    options: [
      { label: "Learning to accept imperfection and relax standards", labelEs: "Aprender a aceptar la imperfección y relajar los estándares", scores: [3,0,0,0,0,0,0,0,0] },
      { label: "Setting limits on giving and acknowledging your own needs", labelEs: "Establecer límites en el dar y reconocer tus propias necesidades", scores: [0,3,0,0,0,0,0,0,0] },
      { label: "Slowing down and connecting with authentic feelings", labelEs: "Reducir el ritmo y conectar con sentimientos auténticos", scores: [0,0,3,0,0,0,0,0,0] },
      { label: "Moving out of emotional turbulence into action", labelEs: "Salir de la turbulencia emocional hacia la acción", scores: [0,0,0,3,0,0,0,0,0] },
      { label: "Engaging emotionally and being present with people", labelEs: "Comprometerte emocionalmente y estar presente con las personas", scores: [0,0,0,0,3,0,0,0,0] },
      { label: "Trusting your own judgment and taking decisive action", labelEs: "Confiar en tu propio juicio y tomar decisiones decisivas", scores: [0,0,0,0,0,3,0,0,0] },
      { label: "Committing fully and sitting with discomfort", labelEs: "Comprometerte plenamente y tolerar la incomodidad", scores: [0,0,0,0,0,0,3,0,0] },
      { label: "Allowing vulnerability and accepting others' help", labelEs: "Permitir la vulnerabilidad y aceptar la ayuda de los demás", scores: [0,0,0,0,0,0,0,3,0] },
      { label: "Prioritizing your own desires and standing up for yourself", labelEs: "Priorizar tus propios deseos y defenderte a ti mismo", scores: [0,0,0,0,0,0,0,0,3] },
    ],
  },
  {
    id: "q9",
    text: "When making a big decision, you primarily:",
    textEs: "Al tomar una gran decisión, principalmente:",
    options: [
      { label: "Check it against your values and ethical standards", labelEs: "La comparas con tus valores y estándares éticos", scores: [3,0,0,0,0,0,0,0,0] },
      { label: "Consider how it affects people you care about", labelEs: "Consideras cómo afecta a las personas que te importan", scores: [0,3,0,0,0,0,0,0,0] },
      { label: "Assess which option makes you look most successful", labelEs: "Evalúas qué opción te hace ver más exitoso", scores: [0,0,3,0,0,0,0,0,0] },
      { label: "Ask what feels most authentic and true to yourself", labelEs: "Preguntas qué se siente más auténtico y verdadero para ti", scores: [0,0,0,3,0,0,0,0,0] },
      { label: "Research thoroughly before committing", labelEs: "Investigas a fondo antes de comprometerte", scores: [0,0,0,0,3,0,0,0,0] },
      { label: "Seek advice and weigh all possible risks", labelEs: "Buscas consejo y sopesas todos los riesgos posibles", scores: [0,0,0,0,0,3,0,0,0] },
      { label: "Go with what opens the most exciting possibilities", labelEs: "Optas por lo que abre las posibilidades más emocionantes", scores: [0,0,0,0,0,0,3,0,0] },
      { label: "Trust your gut and act with confidence", labelEs: "Confías en tu instinto y actúas con confianza", scores: [0,0,0,0,0,0,0,3,0] },
      { label: "Choose whatever keeps the peace and feels comfortable", labelEs: "Eliges lo que mantiene la paz y se siente cómodo", scores: [0,0,0,0,0,0,0,0,3] },
    ],
  },
  {
    id: "q10",
    text: "Others would most likely describe you as:",
    textEs: "Otros probablemente te describirían como:",
    options: [
      { label: "Principled, responsible, and detail-oriented", labelEs: "Íntegro, responsable y orientado a los detalles", scores: [3,0,0,0,0,0,0,0,0] },
      { label: "Warm, caring, and always there for others", labelEs: "Cálido, afectuoso y siempre disponible para los demás", scores: [0,3,0,0,0,0,0,0,0] },
      { label: "Ambitious, confident, and goal-driven", labelEs: "Ambicioso, seguro y orientado a metas", scores: [0,0,3,0,0,0,0,0,0] },
      { label: "Creative, sensitive, and deeply feeling", labelEs: "Creativo, sensible y profundamente emotivo", scores: [0,0,0,3,0,0,0,0,0] },
      { label: "Insightful, perceptive, and private", labelEs: "Perspicaz, perceptivo y reservado", scores: [0,0,0,0,3,0,0,0,0] },
      { label: "Loyal, prepared, and security-conscious", labelEs: "Leal, preparado y consciente de la seguridad", scores: [0,0,0,0,0,3,0,0,0] },
      { label: "Enthusiastic, spontaneous, and optimistic", labelEs: "Entusiasta, espontáneo y optimista", scores: [0,0,0,0,0,0,3,0,0] },
      { label: "Strong, decisive, and protective", labelEs: "Fuerte, decisivo y protector", scores: [0,0,0,0,0,0,0,3,0] },
      { label: "Easy-going, agreeable, and calming to be around", labelEs: "Tranquilo, agradable y relajante para estar cerca", scores: [0,0,0,0,0,0,0,0,3] },
    ],
  },
];

export const enneagramTypes: EnneagramType[] = [
  { type: 1, name: "The Reformer",    nameEs: "El Reformador",   color: "#E8A838", wing1: 9, wing2: 2, growth: 7, stress: 4 },
  { type: 2, name: "The Helper",      nameEs: "El Ayudador",     color: "#E53935", wing1: 1, wing2: 3, growth: 4, stress: 8 },
  { type: 3, name: "The Achiever",    nameEs: "El Triunfador",   color: "#43A047", wing1: 2, wing2: 4, growth: 6, stress: 9 },
  { type: 4, name: "The Individualist",nameEs:"El Individualista",color: "#8E24AA", wing1: 3, wing2: 5, growth: 1, stress: 2 },
  { type: 5, name: "The Investigator",nameEs: "El Investigador", color: "#1E88E5", wing1: 4, wing2: 6, growth: 8, stress: 7 },
  { type: 6, name: "The Loyalist",    nameEs: "El Leal",         color: "#F4511E", wing1: 5, wing2: 7, growth: 9, stress: 3 },
  { type: 7, name: "The Enthusiast",  nameEs: "El Entusiasta",   color: "#00897B", wing1: 6, wing2: 8, growth: 5, stress: 1 },
  { type: 8, name: "The Challenger",  nameEs: "El Retador",      color: "#C62828", wing1: 7, wing2: 9, growth: 2, stress: 5 },
  { type: 9, name: "The Peacemaker",  nameEs: "El Pacificador",  color: "#558B2F", wing1: 8, wing2: 1, growth: 3, stress: 6 },
];

export const typeDescriptions: Record<number, TypeDescription> = {
  1: {
    en: "Type 1s are principled, purposeful, and self-controlled. They have a strong sense of right and wrong and strive to improve everything around them. Their inner critic pushes them to be better, but can lead to perfectionism and rigidity.",
    es: "Los Tipo 1 son íntegros, decididos y autocontrolados. Tienen un fuerte sentido del bien y el mal y se esfuerzan por mejorar todo a su alrededor. Su crítico interior los impulsa a ser mejores, pero puede llevar al perfeccionismo y la rigidez.",
    strengths: ["Ethical", "Responsible", "Improvement-focused", "Diligent", "Honest"],
    challenges: ["Perfectionism", "Self-criticism", "Rigidity", "Resentment", "Difficulty relaxing"],
    growth: "Practice self-compassion. Allow yourself to be 'good enough' and explore joy without guilt. Notice when your inner critic speaks and respond with kindness.",
  },
  2: {
    en: "Type 2s are empathetic, sincere, and warmhearted. They're driven by a deep desire to be loved and to help others, sometimes at the cost of their own needs. At their best, they are genuinely caring; at their worst, they can be manipulative or possessive.",
    es: "Los Tipo 2 son empáticos, sinceros y de buen corazón. Los impulsa un profundo deseo de ser amados y ayudar a los demás, a veces a costa de sus propias necesidades. En su mejor momento, son genuinamente afectuosos; en su peor momento, pueden ser manipuladores o posesivos.",
    strengths: ["Generous", "Empathetic", "Nurturing", "Emotionally intelligent", "Supportive"],
    challenges: ["People-pleasing", "Difficulty receiving", "Repressing own needs", "Codependency", "Pride"],
    growth: "Learn to identify and express your own needs. Practice receiving help gracefully. Recognize that you are lovable even without doing anything for others.",
  },
  3: {
    en: "Type 3s are success-oriented, adaptable, and driven. They are highly motivated to excel and be admired, often shaping their image to match what succeeds in their environment. At their best they're inspiring; at their worst, they can lose touch with their authentic self.",
    es: "Los Tipo 3 están orientados al éxito, son adaptables e impulsivos. Están muy motivados para sobresalir y ser admirados, a menudo moldeando su imagen para adaptarse a lo que triunfa en su entorno. En su mejor momento son inspiradores; en su peor momento pueden perder contacto con su yo auténtico.",
    strengths: ["Driven", "Adaptable", "Efficient", "Inspiring", "Confident"],
    challenges: ["Image-consciousness", "Workaholism", "Emotional avoidance", "Deceit", "Competitiveness"],
    growth: "Slow down and reconnect with your feelings and values beyond achievement. Ask yourself what truly matters to you, independent of success or others' approval.",
  },
  4: {
    en: "Type 4s are expressive, dramatic, and self-absorbed. They long for meaning, beauty, and deep connection. They feel fundamentally different from others, which can create rich creativity or intense melancholy. At their best they are creative and empathetic; at their worst, they can be moody and withdrawn.",
    es: "Los Tipo 4 son expresivos, dramáticos y ensimismados. Anhelan el significado, la belleza y la conexión profunda. Se sienten fundamentalmente diferentes a los demás, lo que puede generar rica creatividad o intensa melancolía. En su mejor momento son creativos y empáticos; en su peor momento pueden ser temperamentales y reservados.",
    strengths: ["Creative", "Empathetic", "Authentic", "Self-aware", "Depth of feeling"],
    challenges: ["Envy", "Melancholy", "Self-absorption", "Emotional volatility", "Feeling misunderstood"],
    growth: "Ground yourself in the present and take action despite emotional turbulence. Notice what you already have. Practice gratitude for ordinary moments.",
  },
  5: {
    en: "Type 5s are perceptive, innovative, and secretive. They seek to understand the world deeply by observing and collecting knowledge, often retreating into their minds. At their best they are groundbreaking thinkers; at their worst, they can be isolated and detached.",
    es: "Los Tipo 5 son perceptivos, innovadores y reservados. Buscan entender el mundo profundamente observando y recopilando conocimiento, a menudo retirándose a su mente. En su mejor momento son pensadores revolucionarios; en su peor momento pueden estar aislados y distantes.",
    strengths: ["Analytical", "Perceptive", "Innovative", "Objective", "Self-sufficient"],
    challenges: ["Isolation", "Emotional detachment", "Hoarding energy", "Overthinking", "Stinginess"],
    growth: "Engage more with people and feelings. Share your knowledge and insights generously. Notice that connection with others gives you energy rather than draining it.",
  },
  6: {
    en: "Type 6s are engaging, responsible, and anxious. They seek security and certainty in an uncertain world, often oscillating between trust and doubt. At their best they are courageous, loyal, and grounded; at their worst, fearful, suspicious, and defensive.",
    es: "Los Tipo 6 son comprometidos, responsables y ansiosos. Buscan seguridad y certeza en un mundo incierto, a menudo oscilando entre la confianza y la duda. En su mejor momento son valientes, leales y arraigados; en su peor momento son temerosos, desconfiados y defensivos.",
    strengths: ["Loyal", "Responsible", "Committed", "Practical", "Courageous"],
    challenges: ["Anxiety", "Indecisiveness", "Suspicion", "Worst-case thinking", "Seeking reassurance"],
    growth: "Practice trusting your own inner guidance. Take small courageous actions to build self-trust. Recognize that you are more resilient than your fears suggest.",
  },
  7: {
    en: "Type 7s are spontaneous, versatile, and scattered. They seek adventure and new experiences to escape pain and limitation. At their best they are joyful, accomplished, and grateful; at their worst, scattered, impulsive, and escapist.",
    es: "Los Tipo 7 son espontáneos, versátiles e impulsivos. Buscan aventura y nuevas experiencias para escapar del dolor y la limitación. En su mejor momento son alegres, realizados y agradecidos; en su peor momento están dispersos, impulsivos y escapistas.",
    strengths: ["Enthusiastic", "Optimistic", "Creative", "Versatile", "Fun-loving"],
    challenges: ["Escapism", "Lack of commitment", "Impulsiveness", "Avoiding pain", "Scattered focus"],
    growth: "Practice staying present with discomfort and difficult emotions. Commit fully to people and projects. Discover that depth brings a richer kind of joy than constant novelty.",
  },
  8: {
    en: "Type 8s are self-confident, decisive, and confrontational. They protect themselves by being strong and never showing weakness. At their best they are magnanimous and inspiring leaders; at their worst, intimidating and domineering.",
    es: "Los Tipo 8 son seguros de sí mismos, decisivos y confrontacionales. Se protegen siendo fuertes y nunca mostrando debilidad. En su mejor momento son magnánimos y líderes inspiradores; en su peor momento son intimidantes y dominantes.",
    strengths: ["Decisive", "Protective", "Energetic", "Direct", "Courageous"],
    challenges: ["Control", "Intimidation", "Vulnerability avoidance", "Excessive force", "Impulsiveness"],
    growth: "Open yourself to vulnerability. Allow yourself to be cared for. Recognize that showing tenderness is a form of strength, not weakness.",
  },
  9: {
    en: "Type 9s are easygoing, receptive, and agreeable. They seek harmony and avoid conflict, sometimes at the cost of their own priorities. At their best they are inclusive, reassuring, and deeply insightful; at their worst, passive and conflict-avoidant to a fault.",
    es: "Los Tipo 9 son tranquilos, receptivos y agradables. Buscan la armonía y evitan el conflicto, a veces a costa de sus propias prioridades. En su mejor momento son inclusivos, reconfortantes y profundamente perspicaces; en su peor momento son pasivos y evitan el conflicto de forma excesiva.",
    strengths: ["Peaceful", "Supportive", "Patient", "Inclusive", "Empathetic"],
    challenges: ["Passivity", "Conflict avoidance", "Self-forgetting", "Stubbornness", "Inertia"],
    growth: "Identify and express your own desires and opinions. Practice saying no. Remember that your presence and priorities matter just as much as everyone else's.",
  },
};

export function scoreEnneagram(answers: Record<string, string | number>): number {
  const totals = new Array(9).fill(0);

  for (const question of enneagramQuestions) {
    const selectedLabel = answers[question.id];
    const option = question.options.find(
      (o) => o.label === selectedLabel || o.labelEs === selectedLabel
    );
    if (option) {
      option.scores.forEach((score, i) => {
        totals[i] += score;
      });
    }
  }

  const maxScore = Math.max(...totals);
  const winnerIndex = totals.indexOf(maxScore);
  return winnerIndex + 1; // types are 1-9
}
