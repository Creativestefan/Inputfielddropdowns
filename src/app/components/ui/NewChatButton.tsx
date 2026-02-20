import { motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { AiEditingIcon } from "@hugeicons/core-free-icons";

interface NewChatButtonProps {
  onClick: () => void;
}

export function NewChatButton({ onClick }: NewChatButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      aria-label="New chat"
      whileHover={{ scale: 1.03, opacity: 0.95 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
      className="relative flex items-center gap-[6px] px-[16px] py-[8px] rounded-[10px] cursor-pointer overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 60%), var(--switch-active-bg)",
        boxShadow:
          "0px 1px 2px 0px rgba(0,0,0,0.05), 0px 0px 0px 1px var(--switch-active-bg), inset 0px 0px 0px 1px rgba(255,255,255,0.2)",
        border: "none",
      }}
    >
      {/* Radial highlight overlay (matches Figma) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0) 100%)",
        }}
      />

      <HugeiconsIcon
        icon={AiEditingIcon}
        size={16}
        strokeWidth={1.5}
        color="white"
      />

      <span
        style={{
          fontSize: "var(--text-sm)",
          fontFamily: "var(--font-family-open-runde)",
          fontWeight: "var(--font-weight-medium)",
          color: "white",
          lineHeight: "20px",
          whiteSpace: "nowrap",
          position: "relative",
        }}
      >
        New chat
      </span>
    </motion.button>
  );
}
