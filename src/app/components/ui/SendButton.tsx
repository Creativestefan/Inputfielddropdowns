import { motion, AnimatePresence } from "motion/react";
import { MicIcon, ArrowUpIcon } from "../icons/InputIcons";

interface SendButtonProps {
  /** When true, shows the arrow-up (send) icon; when false, shows the mic */
  hasText: boolean;
  /** Kept for API compatibility — no longer drives icon state */
  appsActive?: boolean;
  onClick?: () => void;
}

const ICON_SPRING = {
  opacity: { duration: 0.12 },
  y: { type: "spring" as const, stiffness: 480, damping: 18, mass: 0.8 },
};

export function SendButton({ hasText, onClick }: SendButtonProps) {
  const showArrow = hasText;

  return (
    <button
      onClick={onClick}
      aria-label={showArrow ? "Send" : "Voice input"}
      className="flex items-center justify-center rounded-md shrink-0 size-[28px] hover:opacity-90 cursor-pointer overflow-hidden"
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 60%), #048af5",
        boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.05), 0px 0px 0px 1px #048af5",
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {showArrow ? (
          <motion.span
            key="arrow"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={ICON_SPRING}
            className="flex items-center justify-center"
          >
            <ArrowUpIcon />
          </motion.span>
        ) : (
          <motion.span
            key="mic"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={ICON_SPRING}
            className="flex items-center justify-center"
          >
            <MicIcon color="white" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}