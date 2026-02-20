import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { InputField } from "./components/InputField";
import { NewChatButton } from "./components/ui/NewChatButton";

export default function App() {
  const [showInput, setShowInput] = useState(false);

  // Hoist .dark to <html> so every CSS layer (html, body, app div)
  // resolves tokens from the same dark scope — one background colour.
  useEffect(() => {
    document.documentElement.classList.add("dark");
    return () => document.documentElement.classList.remove("dark");
  }, []);

  return (
    <div
      className="size-full flex flex-col items-center justify-center"
      style={{ background: "var(--background)" }}
    >
      <AnimatePresence mode="wait">
        {!showInput ? (
          /* ── New Chat trigger button ── */
          <motion.div
            key="trigger"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{
              duration: 0.1,
              ease: "easeIn",
            }}
          >
            <NewChatButton onClick={() => setShowInput(true)} />
          </motion.div>
        ) : (
          /* ── Input field with physics bounce entrance ── */
          <motion.div
            key="input"
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{
              type: "spring",
              stiffness: 340,
              damping: 22,
              mass: 1,
              // stagger opacity slightly ahead of the spring so it feels snappy
              opacity: { duration: 0.18, ease: "easeOut" },
            }}
          >
            <InputField />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}