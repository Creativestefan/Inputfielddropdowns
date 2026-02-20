import { useState, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

import { DropdownSelect } from "./ui/DropdownSelect";
import { AppsDropdown } from "./ui/AppsDropdown";
import { ToggleButton } from "./ui/ToggleButton";
import { IconButton } from "./ui/IconButton";
import { SendButton } from "./ui/SendButton";
import {
  AppsIcon,
  WorkspaceIcon,
  ResearchIcon,
  PlusIcon,
} from "./icons/InputIcons";
import {
  NotionIcon,
  JiraIcon,
  GmailIcon,
  SlackIcon,
  GitHubIcon,
} from "./ui/AppsDropdown";

import svgPaths from "../../imports/svg-865aketb4c";

// ─── Active app icon map ───────────────────────────────────────────────────────

const APP_ICON_MAP: Record<string, React.ReactNode> = {
  notion: <NotionIcon />,
  jira: <JiraIcon />,
  gmail: <GmailIcon />,
  slack: <SlackIcon />,
  github: <GitHubIcon />,
};

// ─── Option lists ─────────────────────────────────────────────────────────────

const APP_OPTIONS = [
  "All Apps",
  "Figma",
  "Notion",
  "Slack",
  "GitHub",
  "Jira",
];
const WORKSPACE_OPTIONS = [
  "AI Productivity Agent",
  "Professional Development",
  "Design System",
  "Creative Projects",
];
const MODEL_OPTIONS = [
  "Mistral 3",
  "Opus 4.6",
  "GPT-5.2",
  "Gemini 3.0",
];

// ─── Quote block ──────────────────────────────────────────────────────────────

function QuoteBlock({
  text,
  onDismiss,
}: {
  text: string;
  onDismiss: () => void;
}) {
  return (
    <div
      className="relative shrink-0 w-full overflow-hidden"
      style={{
        background: "var(--muted)",
        borderRadius: "10px",
        maxHeight: 56,
      }}
    >
      <div
        className="flex gap-[8px] items-start w-full"
        style={{ padding: "8px 12px", maxHeight: 56, overflow: "hidden" }}
      >
        {/* Quote text */}
        <p
          className="whitespace-pre-wrap"
          style={{
            flex: "1 0 0",
            minHeight: "1px",
            minWidth: "1px",
            fontSize: "var(--text-sm)",
            fontFamily: "var(--font-family-open-runde)",
            fontWeight: "var(--font-weight-regular)",
            color: "var(--muted-foreground)",
            lineHeight: "20px",
            opacity: 0.8,
            margin: 0,
          }}
        >
          {text}
        </p>

        {/* Dismiss button */}
        <button
          onClick={onDismiss}
          aria-label="Remove quote"
          className="group flex items-center justify-center shrink-0 cursor-pointer rounded-[8px] transition-colors"
          style={{
            width: 32,
            height: 32,
            background: "transparent",
            border: "none",
            padding: 8,
            color: "var(--muted-foreground)",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.background =
              "rgba(255,255,255,0.045)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.background =
              "transparent")
          }
        >
          <div className="relative shrink-0" style={{ width: 16, height: 16 }}>
            <div className="absolute inset-1/4">
              <div className="absolute" style={{ inset: "-8.31%" }}>
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 9.33 9.33"
                >
                  <path
                    d={svgPaths.p24442000}
                    stroke="var(--muted-foreground)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.33"
                  />
                </svg>
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

// ─── InputField ───────────────────────────────────────────────────────────────

export function InputField() {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // Textarea auto-resize ─────────────────────────────────────────────────────
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const LINE_HEIGHT = 20;          // must match lineHeight: "20px" in style
  const MAX_LINES   = 12;
  const MAX_CONTENT_HEIGHT = LINE_HEIGHT * MAX_LINES; // 240 px

  useLayoutEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    // Reset height so scrollHeight reflects true content height
    ta.style.height = "0px";
    const scrollH = ta.scrollHeight;
    const capped   = Math.min(scrollH, MAX_CONTENT_HEIGHT);
    ta.style.height        = `${capped}px`;
    ta.style.overflowY     = scrollH > MAX_CONTENT_HEIGHT ? "auto" : "hidden";
  }, [text]);

  // Quote state
  const [quoteText, setQuoteText] = useState<string | null>(
    "That\u2019s a strong framing. If the core pain is \u201cattention allocation,\u201d then the product isn\u2019t a task tracker\u2014it\u2019s a prioritisation engine.",
  );

  // Dropdown open states — kept here so we can close siblings
  const [appsOpen, setAppsOpen] = useState(false);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);

  // Apps: multi-select via toggles
  const [enabledApps, setEnabledApps] = useState<string[]>([]);

  // Selected values
  const [selectedWorkspace, setSelectedWorkspace] =
    useState("Workspace");
  const [selectedModel, setSelectedModel] = useState("Mistral 3");

  // Toggle state
  const [researchActive, setResearchActive] = useState(false);

  // Workspace error state — set when send is clicked with text but no workspace chosen
  const [workspaceError, setWorkspaceError] = useState(false);

  // Helper: open one dropdown, close the rest
  const openOnly = (target: "apps" | "workspace" | "model") => {
    setAppsOpen(target === "apps");
    setWorkspaceOpen(target === "workspace");
    setModelOpen(target === "model");
  };

  const isBlue = enabledApps.length > 0 || selectedWorkspace !== "Workspace";

  return (
    // Outer wrapper is a layout motion.div so the entire component (including
    // top-bar) participates in FLIP. Because App.tsx uses justify-end, the
    // bottom edge is always pinned → every height change pushes the top edge
    // upward, giving "grows bottom-to-top" behaviour for free.
    <motion.div
      layout
      className="w-[555px] rounded-2xl flex flex-col items-start p-[4px]"
      style={{
        background: (enabledApps.length > 0 || selectedWorkspace !== "Workspace") ? "var(--switch-active-bg)" : "var(--border)",
        transition: "background 0.25s ease",
      }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ── Top bar ── */}
      <motion.div
        layout
        className="w-full px-[6px] py-[6px] flex items-center gap-[6px]"
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <AppsDropdown
          open={appsOpen}
          onOpenChange={(o) =>
            o ? openOnly("apps") : setAppsOpen(false)
          }
          enabledApps={enabledApps}
          onEnabledAppsChange={setEnabledApps}
          bgActive={isBlue}
          triggerIcon={
            enabledApps.length > 0 ? (
              APP_ICON_MAP[enabledApps[0]]
            ) : (
              <AppsIcon color={isBlue ? "white" : "var(--muted-foreground)"} />
            )
          }
        />

        <DropdownSelect
          icon={
            <WorkspaceIcon
              color={
                enabledApps.length > 0
                  ? "white"
                  : selectedWorkspace !== "Workspace"
                    ? "var(--foreground)"
                    : "var(--muted-foreground)"
              }
            />
          }
          value={selectedWorkspace}
          options={WORKSPACE_OPTIONS}
          onChange={(val) => {
            setSelectedWorkspace(val);
            setWorkspaceError(false);
          }}
          open={workspaceOpen}
          onOpenChange={(o) => {
            if (o) setWorkspaceError(false);
            o ? openOnly("workspace") : setWorkspaceOpen(false);
          }}
          triggerVariant="pill"
          appsActive={enabledApps.length > 0}
          bgActive={isBlue}
          defaultValue="Workspace"
          error={workspaceError}
          errorMessage="Select a workspace"
          onErrorClear={() => setWorkspaceError(false)}
          placement="top"
        />
      </motion.div>

      {/* ── Input card ── */}
      <div className="relative w-full">
        {/*
          motion.div with layout — the card itself is the animated container.
          When the quote mounts/unmounts, layout smoothly re-sizes the card height.
        */}
        <motion.div
          layout
          className="w-full rounded-xl flex flex-col overflow-visible"
          style={{ background: "var(--card)", padding: "4px", gap: "4px" }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Quote block ─ exit uses only transform+opacity (no height), so the
              card's layout prop stays frozen during the quote animation and only
              fires its own height animation after AnimatePresence removes the
              element from the DOM → giving a clean two-phase sequence. */}
          <AnimatePresence initial={false}>
            {quoteText && (
              <motion.div
                key="quote"
                initial={{ opacity: 0, scaleY: 0.8 }}
                animate={{
                  opacity: 1,
                  scaleY: 1,
                  transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
                }}
                exit={{
                  opacity: 0,
                  scaleY: 0.8,
                  transition: { duration: 0.18, ease: [0.4, 0, 1, 1] },
                }}
                style={{ transformOrigin: "top center" }}
              >
                <QuoteBlock
                  text={quoteText}
                  onDismiss={() => setQuoteText(null)}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Textarea */}
          <div className="px-[12px] pt-[12px] pb-[4px]">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={(e) => {
                // Stop keyboard events from bubbling out of the textarea into
                // parent DOM nodes / the iframe's window listeners (e.g. Figma
                // global shortcuts). stopPropagation does NOT call
                // preventDefault, so all native browser text-editing shortcuts
                // (Ctrl/Cmd + A, C, X, V, Z, …) continue to work as expected.
                e.stopPropagation();
              }}
              placeholder="Explore an idea…"
              className="w-full bg-transparent resize-none outline-none border-none placeholder:opacity-80"
              style={{
                fontSize: "var(--text-sm)",
                fontFamily: "var(--font-family-open-runde)",
                fontWeight: "var(--font-weight-regular)",
                color: "var(--foreground)",
                lineHeight: `${LINE_HEIGHT}px`,
                caretColor: "var(--foreground)",
                // 2-line floor; JS overrides upward up to MAX_CONTENT_HEIGHT
                minHeight: `${LINE_HEIGHT * 2}px`,
                height: `${LINE_HEIGHT * 2}px`,
                overflowY: "hidden",
              }}
            />
          </div>

          {/* Bottom bar */}
          <div className="px-[12px] pb-[12px] pt-[6px] flex items-center justify-between">
            {/* Left controls */}
            <div className="flex items-center gap-[6px]">
              <IconButton
                icon={<PlusIcon />}
                ariaLabel="Attach"
                variant="default"
              />

              <ToggleButton
                active={researchActive}
                onToggle={() => setResearchActive((v) => !v)}
                icon={(color) => <ResearchIcon color={color} />}
                label="Research"
              />

              <DropdownSelect
                value={selectedModel}
                options={MODEL_OPTIONS}
                onChange={setSelectedModel}
                open={modelOpen}
                onOpenChange={(o) =>
                  o ? openOnly("model") : setModelOpen(false)
                }
                triggerVariant="ghost"
                labelColor="var(--muted-foreground)"
                hideSearch
                noSelectedBg
                disableDeselect
                menuWidth="max-content"
                placement="bottom"
              />
            </div>

            <SendButton
              hasText={text.length > 0}
              appsActive={enabledApps.length > 0}
              onClick={() => {
                if (
                  text.length > 0 &&
                  !WORKSPACE_OPTIONS.includes(selectedWorkspace)
                ) {
                  setWorkspaceError(true);
                  return;
                }
                setWorkspaceError(false);
              }}
            />
          </div>
        </motion.div>

        {/* Focus ring overlay — fades in/out on textarea focus */}
        <motion.div
          aria-hidden="true"
          animate={{ opacity: isFocused ? 1 : 0 }}
          transition={{ duration: 0.15, ease: "easeInOut" }}
          className="absolute inset-0 pointer-events-none rounded-[var(--radius-input)]"
          style={{
            pointerEvents: "none",
            border: "1px solid var(--input-focus-border)",
            boxShadow:
              "0px 0px 0px 3px var(--input-focus-glow)",
          }}
        />
      </div>
    </motion.div>
  );
}