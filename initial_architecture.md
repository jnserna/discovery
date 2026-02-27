Build a bilingual (English/Spanish) personal psychology companion web app using Next.js and AI SDK Vercel.

CORE FEATURES:

1.	Things to use on a regular basis:
a.	CONVERSATIONAL THERAPY COMPANION – You just wanna talk with somebody
- Chat interface where users can discuss feelings, fears, thoughts, and emotions
- AI responds with empathy, active listening, and psychological insights
- Supportive, non-judgmental tone focused on self-reflection
So, the chat has to be available with lo no loggin. Hoewever, if the user is logged in, then Chat history persists for each user session.

b.	 Journal
This is a section to do entries about: how do you feel today, concerns, issues, problems. Feeling happy about something? Feeling grateful about something?
The intend here is like having a diary, a personal journal.
This is only for like registered users. But this should be somehow visible from the main UI.
It would be nice and cool to have for each entry the option of upload images and the option of save a URL (example: of a video, a speech, or something like that).

2.	Things to use without a specific frequency:
Tools for Personality Assessment
Like quiz sections for these things:
Enneagram: to understand Core Motivations. Understanding why you do what you do.
Attachment Style: to understand Relationships. Understanding how you connect with others. Secure, anxious, avoidant, disorganized.
Big Five (OCEAN): to understand Personality Traits. Practical, science-backed behavioral insights. Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism
Love Languages: Quality time, words of affirmation, acts of service, gifts, physical touch
Values Assessment: Rank top 10 personal values
Strengths Finder: Identify top character strengths
In this section to use once in a while create something for couples:
-	Compatibility (for existing couples)
-	Desire profile (for your personality, someone like… would be highly compatible with you)

3.	Inputs section - PERSONALITY PROFILE BUILDER
User inputs for analysis:
- Gender (optional)
- Age or Birthday (automatically get zodiac sign)
- Living environment (city/countryside)
- Education level
- Favorite sport/physical activities
- Hobbies and interests
- Relationship status (optional)
- Career/work situation
- Enneatype (optional). Say something like: if you don’t know your enneatype, go find it out (engagement to our other page)
- Absolute Favorite Singer
- Absolute Favorite Movie

Based on inputs, generate:
- Personality insights dashboard
- Zodiac-based profile (if birthday provided)
- Lifestyle analysis
- Personalized growth suggestions
Optional: get your horoscope. Get your horoscope should be instantly deployed. It should be triggered by onclick on a button.

*Option of – Save your inputs (Database) – Firebase
If you saved your inputs, then CONVERSATIONAL THERAPY COMPANION will use that info to guide you better (with more empathy).


KNOWLEDGE BASE (RAG)
- Search psychological resources, mental health information, and coping strategies
- First search curated mental health documentation/resources
- Fall back to web search if answer not found in docs
- Then use LLM reasoning for nuanced psychological questions
- Cite sources when providing information
- The LLM should provide the answers in the selected language by the user in the app at that moment. The LLM should always do thinking, reasoning and planning in English. Then, if English is not the selected language, do translate after reasoning and planning.


Requirements for specific things in the app:
For the ENNEAGRAM TEST
- Interactive 10-question assessment
- Questions designed to identify enneagram type (1-9)
- Results page showing:
  - Primary enneagram type with detailed description
  - Wing tendencies
  - Growth and stress arrows
  - Personalized recommendations for personal development
  - Compatibility insights with other types

5. ADDITIONAL FEATURES
- Wheel of life: option of fill in the blanks to save your own and current Wheel of Life. I guess we need here connection with Firebase.
- Additional feature of: my personal goals. This is only for logged in users. I guess we need here connection with Firebase.
- Additional feature: Things that I like to remember once in a while. Imagine a tab where you can save elements such us: The cars I’ve had in my life’, ‘The countries I’ve visited so far’. Things like that. This is only for logged in users. I guess we need here connection with Firebase.

UI Things:
- Dark/light mode for comfortable reading
- Mobile-responsive design optimized for phone use and optimized android tablet and ipad use.

TECHNICAL REQUIREMENTS:
- Framework: Next.js (App Router)
- AI: AI SDK Vercel with model fallback chain:
  1. Google Gemini API (primary)
  2. Anthropic Claude (secondary) - Commented
  3. OpenAI GPT (tertiary) - Commented
- Languages: Full i18n support for English and Spanish
- Responsive: Mobile-first design, works seamlessly on all devices
- Data: for everything related with logged in users, that will be on Firebase.
- Privacy: Emphasize user data privacy and anonymity
Note on the code for this app: this app should support being served under a subpath. In other words: I am going to use a separated github project for this, but this will be deployed in an existing website that is using a separated github repo.

DESIGN AESTHETIC:
- Calming, therapeutic color palette (soft blues, greens, warm neutrals)
- Clean, minimal interface to reduce anxiety
- Accessible typography and spacing
- Smooth transitions and animations
- Trust-building design elements

USER FLOW:
In general, try to give the user a sense of needing less clicks. Example 1: not just a landing page with no functionality. Even in the main page (the landing page) we should have some functionality. Example 2: if this is not a security risk, even in the landing page, perhaps as a section, we should have the login. So that user can type write in there the credentials. Yes, may be in top right side of the screen we will only want to see a somehow discrete login button.
1. Landing page with app introduction
2. Language selection (EN/ES) - toggle
3. Optional: Basic profile setup OR direct chat access
4. Main dashboard with sections: Chat, Profile, Enneagram Test, Journal, Mood Tracker
5. Each section accessible via navigation

IMPORTANT CONSIDERATIONS:
- Include disclaimer that this is not a replacement for professional therapy
- Warm, empathetic AI personality that validates emotions
- Crisis resources easily accessible (suicide hotline numbers for both languages)
- Ethical AI responses that don't diagnose but support self-reflection


**Iff possible, be aware of this (if possible):**
When you build the 10-question quiz, don't just ask about traits. Ask about fears.
•	Bad Question: "Are you a perfectionist?"
•	Good Question (Type 1): "When you make a mistake, is the voice in your head a gentle reminder or a harsh critic?"
Pro-Tip for Vibe Coding: Ask your tool to create a "Global Context Object." This object should store the Enneatype, Zodiac, and Language preference. Then, you can pass this object as "System Instructions" to the Chat component so the AI always remembers who it is talking to, even if that person is not logged in at the moment.
