import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "../../../imports/svg-q6hi17nu13";
import { ChevronDownIcon } from "../icons/InputIcons";

// ─── App icon components (using Figma SVG paths) ─────────────────────────────

export function NotionIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
      <path d={svgPaths.p53b2000} fill="var(--foreground)" />
    </svg>
  );
}

export function JiraIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
      <g transform="translate(2.016, 2.016)">
        <path d={svgPaths.p18bee500} fill="#2684FF" />
        <path d={svgPaths.p35b1a380} fill="url(#jira-grad1)" />
        <path d={svgPaths.p3163ed00} fill="url(#jira-grad2)" />
      </g>
      <defs>
        <linearGradient id="jira-grad1" x1="7.72" x2="5.29" y1="1.66" y2="4.21" gradientUnits="userSpaceOnUse">
          <stop offset="0.18" stopColor="#0052CC" />
          <stop offset="1" stopColor="#2684FF" />
        </linearGradient>
        <linearGradient id="jira-grad2" x1="182.4" x2="77.7" y1="168.97" y2="272.57" gradientUnits="userSpaceOnUse">
          <stop offset="0.18" stopColor="#0052CC" />
          <stop offset="1" stopColor="#2684FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function GmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <path d="M3.36546 19.9944H6.55153V12.2904L2 8.86646V18.6301C2 19.3791 2.6158 19.9944 3.36546 19.9944Z" fill="#4285F4" />
      <path d="M17.4478 19.9944H20.6338C21.3835 19.9944 21.9993 19.3791 21.9993 18.6301V8.86646L17.4478 12.2637" fill="#34A853" />
      <path d="M17.4478 6.37889V12.2906L21.9993 8.89337V7.04764C21.9993 5.3624 20.0716 4.3994 18.7329 5.4159" fill="#FBBC04" />
      <path d="M6.55127 12.2904V6.37866L12.0131 10.4714L17.4482 6.37866V12.2904L11.9863 16.3563" fill="#EA4335" />
      <path d="M2 7.04732V8.86631L6.55153 12.2635V6.37858L5.26639 5.41558C3.92771 4.42584 2 5.38883 2 7.04732Z" fill="#C5221F" />
    </svg>
  );
}

export function SlackIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 25 24" fill="none" className="shrink-0">
      <path d="M6.12834 14.4362C6.12834 15.5768 5.19664 16.5085 4.05612 16.5085C2.91559 16.5085 1.98389 15.5768 1.98389 14.4362C1.98389 13.2957 2.91559 12.364 4.05612 12.364H6.12834V14.4362Z" fill="#E01E5A" />
      <path d="M7.17236 14.4362C7.17236 13.2957 8.10406 12.364 9.24459 12.364C10.3851 12.364 11.3168 13.2957 11.3168 14.4362V19.6248C11.3168 20.7654 10.3851 21.6971 9.24459 21.6971C8.10406 21.6971 7.17236 20.7654 7.17236 19.6248V14.4362Z" fill="#E01E5A" />
      <path d="M9.24459 6.11516C8.10406 6.11516 7.17236 5.18346 7.17236 4.04293C7.17236 2.9024 8.10406 1.9707 9.24459 1.9707C10.3851 1.9707 11.3168 2.9024 11.3168 4.04293V6.11516H9.24459Z" fill="#36C5F0" />
      <path d="M9.24472 7.15942C10.3852 7.15942 11.3169 8.09112 11.3169 9.23165C11.3169 10.3722 10.3852 11.3039 9.24472 11.3039H4.05612C2.91559 11.3039 1.98389 10.3722 1.98389 9.23165C1.98389 8.09112 2.91559 7.15942 4.05612 7.15942H9.24472Z" fill="#36C5F0" />
      <path d="M17.5659 9.23165C17.5659 8.09112 18.4976 7.15942 19.6381 7.15942C20.7787 7.15942 21.7104 8.09112 21.7104 9.23165C21.7104 10.3722 20.7787 11.3039 19.6381 11.3039H17.5659V9.23165Z" fill="#2EB67D" />
      <path d="M16.5219 9.23154C16.5219 10.3721 15.5902 11.3038 14.4497 11.3038C13.3091 11.3038 12.3774 10.3721 12.3774 9.23154V4.04293C12.3774 2.9024 13.3091 1.9707 14.4497 1.9707C15.5902 1.9707 16.5219 2.9024 16.5219 4.04293V9.23154Z" fill="#2EB67D" />
      <path d="M14.4497 17.5525C15.5902 17.5525 16.5219 18.4842 16.5219 19.6247C16.5219 20.7652 15.5902 21.6969 14.4497 21.6969C13.3091 21.6969 12.3774 20.7652 12.3774 19.6247V17.5525H14.4497Z" fill="#ECB22E" />
      <path d="M14.4497 16.5085C13.3091 16.5085 12.3774 15.5768 12.3774 14.4362C12.3774 13.2957 13.3091 12.364 14.4497 12.364H19.6383C20.7788 12.364 21.7105 13.2957 21.7105 14.4362C21.7105 15.5768 20.7788 16.5085 19.6383 16.5085H14.4497Z" fill="#ECB22E" />
    </svg>
  );
}

export function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9628 2C6.4496 2 1.99268 6.58331 1.99268 12.2535C1.99268 16.786 4.84838 20.6226 8.80999 21.9805C9.3053 22.0826 9.48673 21.7599 9.48673 21.4885C9.48673 21.2508 9.4704 20.436 9.4704 19.587C6.69694 20.1983 6.11939 18.3647 6.11939 18.3647C5.67368 17.1764 5.01328 16.871 5.01328 16.871C4.10552 16.2429 5.0794 16.2429 5.0794 16.2429C6.08633 16.3108 6.6147 17.2954 6.6147 17.2954C7.50592 18.857 8.94203 18.4158 9.51979 18.1441C9.60224 17.482 9.86652 17.0237 10.1471 16.7691C7.9351 16.5314 5.60776 15.6487 5.60776 11.7102C5.60776 10.5898 6.00368 9.67309 6.63102 8.96018C6.53204 8.7056 6.18531 7.65289 6.73021 6.24394C6.73021 6.24394 7.57204 5.97228 9.4702 7.29644C10.2829 7.07199 11.121 6.95782 11.9628 6.95685C12.8047 6.95685 13.6628 7.07581 14.4553 7.29644C16.3536 5.97228 17.1955 6.24394 17.1955 6.24394C17.7404 7.65289 17.3934 8.7056 17.2944 8.96018C17.9383 9.67309 18.3179 10.5898 18.3179 11.7102C18.3179 15.6487 15.9906 16.5143 13.762 16.7691C14.1253 17.0916 14.4387 17.7026 14.4387 18.6703C14.4387 20.0453 14.4224 21.1489 14.4224 21.4883C14.4224 21.7599 14.6041 22.0826 15.0992 21.9808C19.0608 20.6224 21.9165 16.786 21.9165 12.2535C21.9328 6.58331 17.4596 2 11.9628 2Z"
        fill="white"
      />
    </svg>
  );
}

// ─── App definitions ──────────────────────────────────────────────────────────

interface AppDef {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const APPS: AppDef[] = [
  { id: "notion", name: "Notion",  icon: <NotionIcon /> },
  { id: "jira",   name: "Jira",    icon: <JiraIcon /> },
  { id: "gmail",  name: "Gmail",   icon: <GmailIcon /> },
  { id: "slack",  name: "Slack",   icon: <SlackIcon /> },
  { id: "github", name: "GitHub",  icon: <GitHubIcon /> },
];

// ─── Animated Switch Toggle ───────────────────────────────────────────────────

function SwitchToggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  // Track: 36px wide, 20px tall, 2px padding → travel = 36 - 4 - 16 = 16px
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={(e) => {
        e.stopPropagation();
        onChange();
      }}
      className="relative shrink-0 cursor-pointer"
      style={{
        width: 36,
        height: 20,
        borderRadius: 9999,
        padding: 2,
        background: checked ? "var(--switch-active-bg)" : "var(--switch-inactive-bg)",
        boxShadow: "var(--elevation-sm)",
        transition: "background 0.2s ease",
        border: "none",
        display: "flex",
        alignItems: "center",
      }}
    >
      <motion.div
        animate={{ x: checked ? 16 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        style={{
          width: 16,
          height: 16,
          borderRadius: 9999,
          background: checked ? "white" : "var(--foreground)",
          boxShadow: "0px 1px 2px rgba(0,0,0,0.15)",
          flexShrink: 0,
        }}
      />
    </button>
  );
}

// ─── AppsDropdown ─────────────────────────────────────────────────────────────

interface AppsDropdownProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  enabledApps: string[];
  onEnabledAppsChange: (apps: string[]) => void;
  /** Icon shown in the pill trigger */
  triggerIcon?: React.ReactNode;
  /** When true, forces label and chevron to white (e.g. outer background is blue) */
  bgActive?: boolean;
}

export function AppsDropdown({
  open,
  onOpenChange,
  enabledApps,
  onEnabledAppsChange,
  triggerIcon,
  bgActive = false,
}: AppsDropdownProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handlePointerDown(e: MouseEvent) {
      if (
        menuRef.current?.contains(e.target as Node) ||
        triggerRef.current?.contains(e.target as Node)
      )
        return;
      onOpenChange(false);
    }
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open, onOpenChange]);

  const toggleApp = (id: string) => {
    // Only one app can be active at a time — toggle off if already selected
    if (enabledApps.includes(id)) {
      onEnabledAppsChange([]);
    } else {
      onEnabledAppsChange([id]);
    }
  };

  // Trigger label: "Apps" or the active app name when one is selected
  const activeCount = enabledApps.length;
  const activeApp = activeCount > 0 ? APPS.find((a) => a.id === enabledApps[0]) : null;
  const label = activeApp ? activeApp.name : "Apps";

  const pillBg = (activeCount > 0 || open) ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0)";
  const pillBgHover = (activeCount > 0 || open) ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.06)";

  return (
    <div className="relative">
      {/* Trigger pill */}
      <motion.button
        layout
        ref={triggerRef}
        onClick={() => onOpenChange(!open)}
        className="flex items-center gap-[6px] px-[10px] py-[4px] rounded-[10px] cursor-pointer overflow-hidden"
        style={{
          background: pillBg,
          transition: "background 0.25s cubic-bezier(0.16,1,0.3,1)",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.background = pillBgHover)
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.background = pillBg)
        }
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.span layout="preserve-aspect" className="shrink-0">
          {triggerIcon}
        </motion.span>
        <motion.span
          layout="preserve-aspect"
          key={label}
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          style={{
            fontSize: "var(--text-sm)",
            fontFamily: "var(--font-family-open-runde)",
            fontWeight: "var(--font-weight-medium)",
            color: (activeCount > 0 || bgActive) ? "white" : "var(--foreground)",
            lineHeight: "20px",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </motion.span>
        <motion.span layout="preserve-aspect" className="shrink-0">
          <ChevronDownIcon color={(activeCount > 0 || bgActive) ? "white" : "var(--muted-foreground)"} />
        </motion.span>
      </motion.button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.95, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 6 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-full mb-1 left-0 z-50 overflow-hidden origin-bottom"
            style={{
              minWidth: 200,
              borderRadius: "var(--radius-input)",
              background: "var(--popover)",
              border: "1px solid var(--border)",
              boxShadow:
                "0px 2px 4px -2px rgba(0,0,0,0.12), 0px 4px 6px -1px rgba(0,0,0,0.16)",
            }}
          >
            {/* Subtle top section border overlay (matches Figma) */}
            <div
              aria-hidden="true"
              className="absolute top-0 left-0 right-0 pointer-events-none"
              style={{
                height: 1,
                background: "var(--border)",
              }}
            />

            <div className="p-[4px]">
              {APPS.map((app) => {
                const isEnabled = enabledApps.includes(app.id);
                return (
                  <div
                    key={app.id}
                    className="flex items-center gap-[10px] px-[8px] py-[6px] rounded-[6px] cursor-pointer transition-colors"
                    style={{
                      background: "transparent",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLDivElement).style.background =
                        "rgba(255, 255, 255, 0.045)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLDivElement).style.background =
                        "transparent")
                    }
                    onClick={() => toggleApp(app.id)}
                  >
                    {/* App icon */}
                    <span className="shrink-0 size-[16px] flex items-center justify-center">
                      {app.icon}
                    </span>

                    {/* App name */}
                    <span
                      className="flex-1 min-w-0"
                      style={{
                        fontSize: "var(--text-sm)",
                        fontFamily: "var(--font-family-open-runde)",
                        fontWeight: "var(--font-weight-regular)",
                        color: "var(--popover-foreground)",
                        lineHeight: "20px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {app.name}
                    </span>

                    {/* Switch toggle */}
                    <SwitchToggle
                      checked={isEnabled}
                      onChange={() => toggleApp(app.id)}
                    />
                  </div>
                );
              })}
            </div>

            {/* Outer border overlay (matches Figma inset border) */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                borderRadius: "var(--radius-input)",
                border: "1px solid var(--border)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}