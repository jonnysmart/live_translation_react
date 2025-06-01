import React, { useState, useEffect, useRef } from "react";
import MessageInput from "./MessageInput";
import TranslationBubble from "./TranslationBubble";
import SidePanel from "./SidePanel";
import { useTranslator } from "../hooks/useTranslator";
import { FaMicrophone, FaCopy, FaShareAlt, FaInfoCircle } from "react-icons/fa";
import toast from "react-hot-toast";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [notes, setNotes] = useState([]);
  const [sessionTime, setSessionTime] = useState("00:00");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const translate = useTranslator();
  const transcriptRef = useRef(null);

  /* timer */
  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      const t = Date.now() - start;
      setSessionTime(
        `${String(Math.floor(t / 60000)).padStart(2, "0")}:${String(
          Math.floor((t % 60000) / 1000)
        ).padStart(2, "0")}`
      );
    }, 1000);
    return () => clearInterval(id);
  }, []);

  /* send handler */
  const handleTranslate = async (txt, speaker = "en") => {
    if (!txt.trim()) return;
    const { translation, note } = await translate(txt, speaker);

    setMessages((p) => [
      ...p,
      {
        id: crypto.randomUUID(),
        text: txt,
        translation,
        note,
        direction: speaker === "en" ? "en-cz" : "cz-en",
      },
    ]);
    if (note) setNotes((p) => [...p, note]);

    requestAnimationFrame(() =>
      transcriptRef.current?.scrollTo({
        top: transcriptRef.current.scrollHeight,
        behavior: "smooth",
      })
    );
  };

  /* copy/share helpers */
  const copyLast = () => {
    if (!messages.length) return;
    navigator.clipboard.writeText(messages.at(-1).translation);
    toast.success("Copied!");
  };
  const shareLast = () => {
    if (navigator.share && messages.length) {
      navigator
        .share({
          title: "Translation",
          text: messages.at(-1).translation,
        })
        .then(() => toast.success("Shared!"))
        .catch(() => {});
    } else {
      toast.error("Web Share not supported");
    }
  };

  /* layout */
  return (
    <>
      <div className="mx-auto w-full max-w-7xl grid lg:grid-cols-[1fr_20rem] gap-6 px-4 lg:px-8 pb-32">
        {/* chat column */}
        <div className="flex flex-col">
          <header className="flex items-center gap-2 py-2 lg:py-4">
            <span className="live-badge">LIVE</span>
            <span className="font-medium tracking-wider">{sessionTime}</span>
          </header>

          <div
            ref={transcriptRef}
            className="flex-1 overflow-y-auto space-y-4 pr-2 pb-36"
          >
            {messages.map((m) => (
              <TranslationBubble key={m.id} {...m} className="fade-in" />
            ))}
          </div>

          <MessageInput onSubmit={handleTranslate} />
        </div>

        {/* desktop note panel */}
        <div className="hidden lg:block">
          <SidePanel notes={notes} />
        </div>
      </div>

      {/* fixed action bar */}
      <div className="fixed inset-x-0 bottom-0 z-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-t shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-center gap-6">
          <button
            className="p-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 active:scale-95 transition"
            aria-label="Voice input (coming soon)"
          >
            <FaMicrophone />
          </button>

          {/* info button only on mobile */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="lg:hidden p-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 active:scale-95 transition"
            aria-label="Show cultural notes"
          >
            <FaInfoCircle />
          </button>

          <button
            onClick={copyLast}
            className="p-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 active:scale-95 transition"
            aria-label="Copy last translation"
          >
            <FaCopy />
          </button>
          <button
            onClick={shareLast}
            className="p-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 active:scale-95 transition"
            aria-label="Share last translation"
          >
            <FaShareAlt />
          </button>
        </div>
      </div>

      {/* slide-over drawer for notes on mobile */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 lg:hidden"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-80 max-w-[90%] bg-white dark:bg-slate-900 p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="mb-4 text-sm text-blue-600 dark:text-blue-400 underline"
              onClick={() => setDrawerOpen(false)}
            >
              Close
            </button>
            <SidePanel notes={notes} />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBox;
