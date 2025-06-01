import { useRef } from "react";
import { culturalNotes } from "../data/culturalNotes";

/**
 * Tiny stub that pretends to translate.
 * Swap the fetch() block for your real API.
 */
export function useTranslator() {
  const contextRef = useRef([]);

  async function translate(text, speaker) {
    // cultural note lookup
    const noteKey = Object.keys(culturalNotes).find((k) =>
      text.toLowerCase().includes(k)
    );
    const localNote = noteKey ? culturalNotes[noteKey] : null;

    // ── fake translator ──
    const translation =
      speaker === "en"
        ? `[CZ] ${text}`
        : `[EN] ${text.charAt(0).toUpperCase() + text.slice(1)}`;

    contextRef.current.push({ text, translation });

    return { translation, note: localNote };
  }

  return translate;
}
