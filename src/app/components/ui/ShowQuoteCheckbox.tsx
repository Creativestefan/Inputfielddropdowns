import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "../../../imports/svg-j1vv09pz5d";

interface ShowQuoteCheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
}

export function ShowQuoteCheckbox({
  checked: controlledChecked,
  onChange,
  label = "Show Quote",
}: ShowQuoteCheckboxProps) {
  const [internalChecked, setInternalChecked] = useState(false);

  const isChecked =
    controlledChecked !== undefined ? controlledChecked : internalChecked;

  const handleToggle = () => {
    const next = !isChecked;
    setInternalChecked(next);
    onChange?.(next);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="flex items-center gap-[8px] cursor-pointer bg-transparent border-none p-0 outline-none"
      aria-checked={isChecked}
      role="checkbox"
    >
      {/* ── Box ── */}
      <div
        className="relative shrink-0 size-[16px]"
        style={{ borderRadius: "var(--radius-checkbox)" }}
      >
        {/* Track */}
        <div
          className="absolute inset-0"
          style={{
            borderRadius: "var(--radius-checkbox)",
            background: isChecked ? "var(--primary)" : "transparent",
            border: isChecked
              ? "1.5px solid var(--primary)"
              : "1.5px solid var(--border)",
            boxShadow: "var(--shadow-xs)",
            transition:
              "background 0.2s ease, border-color 0.2s ease",
          }}
        />

        {/* Checkmark */}
        <AnimatePresence initial={false}>
          {isChecked && (
            <motion.div
              key="check"
              className="absolute inset-0 flex items-center justify-center overflow-hidden"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.4 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 22,
                mass: 0.6,
                opacity: { duration: 0.12 },
              }}
            >
              {/* 1px inset so the svg sits inside the rounded box */}
              <div
                className="absolute"
                style={{
                  left: 1,
                  top: 1,
                  width: 14,
                  height: 14,
                  overflow: "hidden",
                }}
              >
                <div
                  className="absolute"
                  style={{
                    bottom: "29.17%",
                    left: "16.67%",
                    right: "16.67%",
                    top: "25%",
                  }}
                >
                  <div className="absolute inset-[-10.36%_-7.12%_-10.36%_-7.13%]">
                    <svg
                      className="block size-full"
                      fill="none"
                      preserveAspectRatio="none"
                      viewBox="0 0 10.6633 7.74667"
                    >
                      <path
                        d={svgPaths.p3f47e280}
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.33"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Label ── */}
      <span
        style={{
          fontFamily: "var(--font-family-open-runde)",
          fontWeight: "var(--font-weight-regular)",
          fontSize: "var(--text-sm)",
          lineHeight: "20px",
          color: "var(--muted-foreground)",
          transition: "color 0.2s ease",
          userSelect: "none",
        }}
      >
        {label}
      </span>
    </button>
  );
}