import React from "react";
import PropTypes from "prop-types";

export default function TranslationBubble({
  text,
  translation,
  note,
  direction,
}) {
  const isEnToCz = direction === "en-cz";
  const header = isEnToCz ? "EN → CZ" : "CZ → EN";

  return (
    <div className="rounded-lg bg-indigo-50 p-4 border-l-4 border-indigo-400">
      <p className="text-xs font-semibold mb-1">{header}</p>

      <p className="flex gap-2 items-start">
        <span role="img" aria-label="original">
          📄
        </span>
        <span className="italic">
          <strong>Original:</strong> {text}
        </span>
      </p>

      <p className="flex gap-2 items-start mt-1">
        <span role="img" aria-label="translation">
          🌐
        </span>
        <span>
          <strong>Translation:</strong> {translation}
        </span>
      </p>

      {note && (
        <div className="mt-3 rounded bg-amber-50 border-l-4 border-amber-400 p-3 text-sm">
          <p className="flex items-start gap-2 font-semibold">
            <span role="img" aria-label="globe">
              🌍
            </span>
            Cultural Note:
          </p>
          <p className="pl-7">{note}</p>
        </div>
      )}
    </div>
  );
}

TranslationBubble.propTypes = {
  text: PropTypes.string.isRequired,
  translation: PropTypes.string.isRequired,
  note: PropTypes.string,
  direction: PropTypes.oneOf(["en-cz", "cz-en"]),
};

TranslationBubble.defaultProps = {
  note: null,
  direction: "en-cz",
};
