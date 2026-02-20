interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  /** "default" = secondary filled pill; "primary" = blue gradient */
  variant?: "default" | "primary";
  className?: string;
  ariaLabel?: string;
}

export function IconButton({
  icon,
  onClick,
  variant = "default",
  className = "",
  ariaLabel,
}: IconButtonProps) {
  const bg =
    variant === "primary"
      ? "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 60%), #048af5"
      : "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 100%), var(--secondary)";

  const shadow =
    variant === "primary"
      ? "0px 1px 2px 0px rgba(0,0,0,0.05), 0px 0px 0px 1px #048af5"
      : "0px 1px 2px 0px rgba(0,0,0,0.05), 0px 0px 0px 1px var(--border)";

  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`flex items-center justify-center rounded-md shrink-0 size-[28px] transition-opacity hover:opacity-80 cursor-pointer ${className}`}
      style={{ background: bg, boxShadow: shadow }}
    >
      {icon}
    </button>
  );
}
