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
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
      <g transform="translate(0, 2)">
        <path d={svgPaths.p3d872d80} fill="#4285F4" />
        <path d={svgPaths.p8bd8d00}  fill="#34A853" />
        <path d={svgPaths.p2a463380} fill="#FBBC04" />
        <path d={svgPaths.p210baac0} fill="#EA4335" fillRule="evenodd" clipRule="evenodd" />
        <path d={svgPaths.p265cef00} fill="#C5221F" />
      </g>
    </svg>
  );
}

export function SlackIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
      <rect x="2" y="6" width="3" height="3" rx="1.5" fill="#E01E5A" />
      <rect x="2" y="10" width="3" height="2" rx="1" fill="#E01E5A" />
      <rect x="6" y="2" width="3" height="3" rx="1.5" fill="#36C5F0" />
      <rect x="10" y="2" width="2" height="3" rx="1" fill="#36C5F0" />
      <rect x="11" y="6" width="3" height="3" rx="1.5" fill="#2EB67D" />
      <rect x="11" y="10" width="3" height="2" rx="1" transform="rotate(180 14 11)" fill="#2EB67D" />
      <rect x="6" y="11" width="3" height="3" rx="1.5" fill="#ECB22E" />
      <rect x="10" y="11" width="2" height="3" rx="1" transform="rotate(180 11 14)" fill="#ECB22E" />
    </svg>
  );
}

export function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 1C4.133 1 1 4.21 1 8.178c0 3.17 2.013 5.86 4.806 6.808.351.065.48-.155.48-.345 0-.171-.006-.623-.01-1.224-1.955.435-2.368-.966-2.368-.966-.32-.83-.78-1.051-.78-1.051-.638-.446.048-.437.048-.437.705.05 1.076.742 1.076.742.626 1.1 1.643.782 2.043.598.064-.465.245-.783.445-.963-1.56-.181-3.2-.8-3.2-3.56 0-.787.274-1.43.724-1.934-.073-.18-.314-.915.069-1.907 0 0 .59-.194 1.932.737A6.6 6.6 0 0 1 8 4.978c.598.003 1.2.083 1.763.243 1.34-.931 1.929-.737 1.929-.737.384.992.143 1.727.07 1.907.451.504.723 1.147.723 1.934 0 2.768-1.643 3.377-3.208 3.554.252.224.476.665.476 1.34 0 .968-.009 1.748-.009 1.986 0 .192.127.414.483.344C12.989 14.035 15 11.346 15 8.178 15 4.21 11.866 1 8 1Z"
        fill="var(--foreground)"
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
        initial={{ background: "rgba(0,0,0,0)" }}
        animate={{ background: pillBg }}
        whileHover={{ background: pillBgHover }}
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
                        "var(--accent)")
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