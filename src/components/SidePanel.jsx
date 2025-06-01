import React from "react";
import PropTypes from "prop-types";

const SidePanel = ({ notes }) => {
  if (!notes.length) return null;

  return (
    <aside className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l pt-4 lg:pt-0 lg:pl-6">
      <h3 className="font-semibold mb-2">Cultural Notes</h3>

      <ul className="space-y-2">
        {notes.map((n, i) => (
          <li
            key={i}
            className="note-card p-3 rounded bg-gray-50 shadow-sm text-sm leading-relaxed"
          >
            <span role="img" aria-label="info">
              ℹ️
            </span>{" "}
            {n}
          </li>
        ))}
      </ul>
    </aside>
  );
};

SidePanel.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SidePanel;
