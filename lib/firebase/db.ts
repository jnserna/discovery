import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./config";

// ── User profile ─────────────────────────────────────────────
export async function saveUserProfile(uid: string, data: Record<string, unknown>) {
  await setDoc(doc(db, "users", uid, "profile", "main"), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function getUserProfile(uid: string) {
  const snap = await getDoc(doc(db, "users", uid, "profile", "main"));
  return snap.exists() ? snap.data() : null;
}

// ── Chat sessions ─────────────────────────────────────────────
export async function saveChatSession(
  uid: string,
  sessionId: string,
  messages: unknown[]
) {
  await setDoc(doc(db, "users", uid, "chatSessions", sessionId), {
    messages,
    updatedAt: serverTimestamp(),
  });
}

export async function getChatSessions(uid: string) {
  const q = query(
    collection(db, "users", uid, "chatSessions"),
    orderBy("updatedAt", "desc"),
    limit(20)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// ── Journal entries ───────────────────────────────────────────
export async function addJournalEntry(uid: string, entry: Record<string, unknown>) {
  return addDoc(collection(db, "users", uid, "journalEntries"), {
    ...entry,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateJournalEntry(
  uid: string,
  entryId: string,
  data: Record<string, unknown>
) {
  await updateDoc(doc(db, "users", uid, "journalEntries", entryId), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteJournalEntry(uid: string, entryId: string) {
  await deleteDoc(doc(db, "users", uid, "journalEntries", entryId));
}

export async function getJournalEntries(uid: string) {
  const q = query(
    collection(db, "users", uid, "journalEntries"),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// ── Wheel of Life ─────────────────────────────────────────────
export async function saveWheelSnapshot(uid: string, scores: Record<string, number>) {
  return addDoc(collection(db, "users", uid, "wheelOfLife"), {
    scores,
    createdAt: serverTimestamp(),
  });
}

export async function getWheelSnapshots(uid: string) {
  const q = query(
    collection(db, "users", uid, "wheelOfLife"),
    orderBy("createdAt", "desc"),
    limit(10)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// ── Goals ─────────────────────────────────────────────────────
export async function addGoal(uid: string, goal: Record<string, unknown>) {
  return addDoc(collection(db, "users", uid, "goals"), {
    ...goal,
    status: "active",
    createdAt: serverTimestamp(),
  });
}

export async function updateGoal(
  uid: string,
  goalId: string,
  data: Record<string, unknown>
) {
  await updateDoc(doc(db, "users", uid, "goals", goalId), data);
}

export async function deleteGoal(uid: string, goalId: string) {
  await deleteDoc(doc(db, "users", uid, "goals", goalId));
}

export async function getGoals(uid: string) {
  const q = query(
    collection(db, "users", uid, "goals"),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// ── Memories ──────────────────────────────────────────────────
export async function addMemoryCollection(uid: string, name: string) {
  return addDoc(collection(db, "users", uid, "memories"), {
    name,
    createdAt: serverTimestamp(),
  });
}

export async function addMemoryItem(
  uid: string,
  collectionId: string,
  item: Record<string, unknown>
) {
  return addDoc(
    collection(db, "users", uid, "memories", collectionId, "items"),
    { ...item, createdAt: serverTimestamp() }
  );
}

export async function getMemoryCollections(uid: string) {
  const snap = await getDocs(collection(db, "users", uid, "memories"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getMemoryItems(uid: string, collectionId: string) {
  const q = query(
    collection(db, "users", uid, "memories", collectionId, "items"),
    orderBy("createdAt", "asc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// ── Assessment results ─────────────────────────────────────────
export async function saveAssessmentResult(
  uid: string,
  type: string,
  result: Record<string, unknown>
) {
  await setDoc(doc(db, "users", uid, "assessments", type), {
    ...result,
    completedAt: serverTimestamp(),
  });
}

export { serverTimestamp, Timestamp };
