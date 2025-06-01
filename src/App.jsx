import React from "react";
import ChatBox from "./components/ChatBox";
import ThemeToggle from "./components/ThemeToggle";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* top bar */}
      <header className="flex justify-end p-4">
        <ThemeToggle />
      </header>

      {/* main chat */}
      <ChatBox />

      {/* toasts */}
      <Toaster position="bottom-center" />
    </div>
  );
}
