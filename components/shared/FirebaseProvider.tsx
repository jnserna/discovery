"use client";

// Firebase is initialized client-side via lib/firebase/config.ts
// This component ensures the Firebase app is initialized before any
// component in the tree tries to use auth/db/storage.
import { useEffect } from "react";
import app from "@/lib/firebase/config";

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Firebase app is initialized on import of config.ts
    void app;
  }, []);

  return <>{children}</>;
}
