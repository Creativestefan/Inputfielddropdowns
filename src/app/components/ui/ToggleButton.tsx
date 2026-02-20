import { motion } from "motion/react";
import { useState } from "react";

interface ToggleButtonProps {
  /** Whether the toggle is in its active/pressed state */
  active: boolean;
  onToggle: () => void;
  /** Render prop — receives the resolved colour string so the icon can match */
  icon: (color: string) => React.ReactNode;
  label: string;
  /** CSS variable or value for active icon/text colour */
  activeColor?: string;
  /** CSS variable or value for active background */
  activeBg?: string;
}

export function ToggleButton({
  active,
  onToggle,
  icon,
  label,
  activeColor = "var(--research-active-color)",
  activeBg = "var(--research-active-bg)",
}: ToggleButtonProps) {
  const [hovered, setHovered] = useState(false);
  const resolvedColor = active ? activeColor : "var(--muted-foreground)";

  // Derive background from state only — never from gesture props —
  // so Motion always has a single target and never flashes.
  const bg = active
    ? activeBg
    : hovered
      ? "rgba(255,255,255,0.04)"
      : "rgba(0,0,0,0)";

  return (
    <motion.button
      onClick={onToggle}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="flex items-center gap-[6px] px-[6px] py-[4px] rounded-md cursor-pointer"
      animate={{ background: bg }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.18, ease: "easeInOut" }}
    >
      {icon(resolvedColor)}

      <motion.span
        animate={{ color: resolvedColor }}
        transition={{ duration: 0.18, ease: "easeInOut" }}
        style={{
          fontSize: "var(--text-sm)",
          fontFamily: "var(--font-family-open-runde)",
          fontWeight: "var(--font-weight-medium)",
          lineHeight: "20px",
        }}
      >
        {label}
      </motion.span>
    </motion.button>
  );
}
