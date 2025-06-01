import React, { useState } from "react";
import PropTypes from "prop-types";

export default function MessageInput({ onSubmit }) {
  const [text, setText] = useState("");
  const [speaker, setSpeaker] = useState("en");

  function handleSend() {
    if (!text.trim()) return;
    onSubmit(text.trim(), speaker);
    setText("");
  }

  return (
    <div className="mt-4 flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        className="flex-1 rounded border px-3 py-2 text-sm focus:outline-none focus:ring"
        placeholder="Type a message…"
      />

      <select
        value={speaker}
        onChange={(e) => setSpeaker(e.target.value)}
        className="rounded border px-2 text-sm"
      >
        <option value="en">🇬🇧 English</option>
        <option value="cz">🇨🇿 Czech</option>
      </select>

      <button
        onClick={handleSend}
        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 rounded"
      >
        Send
      </button>
    </div>
  );
}

MessageInput.propTypes = {
  /** callback(text, speaker) */
  onSubmit: PropTypes.func.isRequired,
};
