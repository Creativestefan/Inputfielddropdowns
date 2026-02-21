import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { InputField } from "./components/InputField";
import { NewChatButton } from "./components/ui/NewChatButton";
import { ShowQuoteCheckbox } from "./components/ui/ShowQuoteCheckbox";

// ── Placeholder quote shown when the checkbox is enabled ─────────────────────
const SAMPLE_QUOTE =
  "That's a strong framing. If the core pain is \"attention allocation,\" then the product isn't a task tracker—it's a prioritisation engine.";

export default function App() {
  const [showInput, setShowInput] = useState(false);
  const [quoteChecked, setQuoteChecked] = useState(false);

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
            transition={{ duration: 0.1, ease: "easeIn" }}
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
              opacity: { duration: 0.18, ease: "easeOut" },
            }}
          >
            <InputField
              quoteText={quoteChecked ? SAMPLE_QUOTE : null}
              onQuoteDismiss={() => setQuoteChecked(false)}
            />

            {/* ── Show Quote checkbox — 64 px below the input ── */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.22, ease: "easeOut" }}
              style={{ marginTop: 64 }}
              className="flex justify-center"
            >
              <ShowQuoteCheckbox
                checked={quoteChecked}
                onChange={setQuoteChecked}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}