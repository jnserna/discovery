"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

export type Locale = "en" | "es";

export interface OceanScores {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
}

export interface LoveLanguageRanks {
  qualityTime: number;
  wordsOfAffirmation: number;
  actsOfService: number;
  gifts: number;
  physicalTouch: number;
}

export interface UserProfile {
  gender?: string;
  birthday?: string;
  livingEnvironment?: string;
  education?: string;
  sports?: string;
  hobbies?: string[];
  relationship?: string;
  career?: string;
  enneatype?: number;
  favoriteSinger?: string;
  favoriteMovie?: string;
}

export interface GlobalContextType {
  language: Locale;
  setLanguage: (lang: Locale) => void;
  enneatype: number | null;
  setEnneatype: (type: number | null) => void;
  zodiacSign: string | null;
  setZodiacSign: (sign: string | null) => void;
  profile: UserProfile | null;
  setProfile: (profile: UserProfile | null) => void;
  attachmentStyle: string | null;
  setAttachmentStyle: (style: string | null) => void;
  bigFive: OceanScores | null;
  setBigFive: (scores: OceanScores | null) => void;
  loveLanguages: LoveLanguageRanks | null;
  setLoveLanguages: (ranks: LoveLanguageRanks | null) => void;
}

const STORAGE_KEY = "innerbloom_global_ctx";

const GlobalContext = createContext<GlobalContextType | null>(null);

function loadFromStorage(): Partial<GlobalContextType> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveToStorage(data: Partial<GlobalContextType>) {
  if (typeof window === "undefined") return;
  try {
    const { setLanguage, setEnneatype, setZodiacSign, setProfile,
            setAttachmentStyle, setBigFive, setLoveLanguages, ...rest } = data as Record<string, unknown>;
    void setLanguage; void setEnneatype; void setZodiacSign; void setProfile;
    void setAttachmentStyle; void setBigFive; void setLoveLanguages;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rest));
  } catch {
    // ignore storage errors
  }
}

export function GlobalContextProvider({ children }: { children: ReactNode }) {
  const saved = loadFromStorage();

  const [language, setLanguageState] = useState<Locale>(
    (saved as GlobalContextType).language ?? "en"
  );
  const [enneatype, setEnneatypeState] = useState<number | null>(
    (saved as GlobalContextType).enneatype ?? null
  );
  const [zodiacSign, setZodiacSignState] = useState<string | null>(
    (saved as GlobalContextType).zodiacSign ?? null
  );
  const [profile, setProfileState] = useState<UserProfile | null>(
    (saved as GlobalContextType).profile ?? null
  );
  const [attachmentStyle, setAttachmentStyleState] = useState<string | null>(
    (saved as GlobalContextType).attachmentStyle ?? null
  );
  const [bigFive, setBigFiveState] = useState<OceanScores | null>(
    (saved as GlobalContextType).bigFive ?? null
  );
  const [loveLanguages, setLoveLanguagesState] = useState<LoveLanguageRanks | null>(
    (saved as GlobalContextType).loveLanguages ?? null
  );

  // Persist on every change
  useEffect(() => {
    saveToStorage({ language, enneatype, zodiacSign, profile, attachmentStyle, bigFive, loveLanguages });
  }, [language, enneatype, zodiacSign, profile, attachmentStyle, bigFive, loveLanguages]);

  const setLanguage = useCallback((lang: Locale) => {
    setLanguageState(lang);
    // Also set cookie for server-side rendering
    document.cookie = `locale=${lang};path=/;max-age=31536000`;
  }, []);

  const setEnneatype = useCallback((type: number | null) => setEnneatypeState(type), []);
  const setZodiacSign = useCallback((sign: string | null) => setZodiacSignState(sign), []);
  const setProfile = useCallback((p: UserProfile | null) => setProfileState(p), []);
  const setAttachmentStyle = useCallback((s: string | null) => setAttachmentStyleState(s), []);
  const setBigFive = useCallback((scores: OceanScores | null) => setBigFiveState(scores), []);
  const setLoveLanguages = useCallback((ranks: LoveLanguageRanks | null) => setLoveLanguagesState(ranks), []);

  return (
    <GlobalContext.Provider
      value={{
        language,
        setLanguage,
        enneatype,
        setEnneatype,
        zodiacSign,
        setZodiacSign,
        profile,
        setProfile,
        attachmentStyle,
        setAttachmentStyle,
        bigFive,
        setBigFive,
        loveLanguages,
        setLoveLanguages,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  const ctx = useContext(GlobalContext);
  if (!ctx) throw new Error("useGlobalContext must be used inside GlobalContextProvider");
  return ctx;
}
