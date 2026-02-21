import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { BurstAnimation } from "./animations/BurstAnimation";

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

// ─── Active app icon map ───────────────────────────────────────────────────────

const APP_ICON_MAP: Record<string, React.ReactNode> = {
  notion: <NotionIcon />,
  jira: <JiraIcon />,
  gmail: <GmailIcon />,
  slack: <SlackIcon />,
  github: <GitHubIcon />,
};

// ─── Option lists ─────────────────────────────────────────────────────────────

const WORKSPACE_OPTIONS = [
  "AI Productivity Agent",
  "Professional Development",
  "Design System",
  "Creative Projects",
];
const MODEL_OPTIONS = ["Mistral 3", "Opus 4.6", "GPT-5.2", "Gemini 3.0"];

// ─── File entry type ──────────────────────────────────────────────────────────

interface AttachedFileEntry {
  id: string;
  file: File;
  objectUrl: string | null;
}

// How long (ms) the Lottie plays before the card is actually removed
// Burst animates frames 0-33 @ 30fps = ~1.1s. At 2× speed that's ~550ms.
// Hold for 480ms so the gap closes right as the burst finishes.
const REMOVE_ANIM_DURATION = 480;

// ─── File type helpers ────────────────────────────────────────────────────────

function getFileExt(name: string): string {
  return name.split(".").pop()?.toUpperCase() ?? "FILE";
}

function isImageFile(file: File): boolean {
  return file.type.startsWith("image/");
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({
  src,
  name,
  onClose,
}: {
  src: string;
  name: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex: 9999, background: "rgba(0,0,0,0.78)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex items-center justify-center"
        style={{ maxWidth: "90vw", maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={name}
          className="block"
          style={{
            maxWidth: "90vw",
            maxHeight: "90vh",
            borderRadius: "var(--radius-lg)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
            objectFit: "contain",
          }}
        />

        <div
          className="absolute bottom-0 left-0 right-0 flex items-center justify-center"
          style={{
            padding: "12px 16px",
            borderRadius: "0 0 var(--radius-lg) var(--radius-lg)",
            background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)",
          }}
        >
          <span
            style={{
              fontSize: "var(--text-xs)",
              fontFamily: "var(--font-family-open-runde)",
              fontWeight: "var(--font-weight-regular)",
              color: "rgba(255,255,255,0.75)",
              lineHeight: "16px",
            }}
          >
            {name}
          </span>
        </div>

        <button
          onClick={onClose}
          aria-label="Close preview"
          className="absolute flex items-center justify-center cursor-pointer"
          style={{
            top: -10,
            right: -10,
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "rgba(30,30,30,0.85)",
            border: "1.5px solid rgba(255,255,255,0.14)",
            padding: 0,
            color: "rgba(255,255,255,0.9)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
          }}
        >
          <HugeiconsIcon icon={Cancel01Icon} size={12} strokeWidth={2} color="rgba(255,255,255,0.9)" />
        </button>
      </motion.div>
    </motion.div>,
    document.body,
  );
}

// ─── Thumbnail card ───────────────────────────────────────────────────────────

function FileThumbnail({
  file,
  objectUrl,
  onRemove,
  onPreview,
  isRemoving,
}: {
  file: File;
  objectUrl: string | null;
  onRemove: () => void;
  onPreview: () => void;
  isRemoving: boolean;
}) {
  const isImage = isImageFile(file);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.75 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative shrink-0"
      style={{ width: 45 + 8, height: 44 + 8, paddingTop: 6, paddingRight: 6 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {isRemoving ? (
        /* ── Burst Lottie — plays once from embedded JSON ── */
        <div
          className="flex items-center justify-center overflow-hidden"
          style={{ width: 45, height: 44, borderRadius: 5 }}
        >
          <BurstAnimation size={70} />
        </div>
      ) : (
        <>
          {/* Card body */}
          <div
            className="w-full h-full overflow-hidden flex items-center justify-center"
            style={{
              width: 45,
              height: 44,
              borderRadius: 5,
              background: isImage ? "transparent" : "var(--muted)",
              boxShadow: "0px 0.28px 0.56px 0px rgba(0,0,0,0.08), 0px 0px 0px 1px var(--border)",
              cursor: isImage ? "pointer" : "default",
            }}
            onClick={isImage ? onPreview : undefined}
            role={isImage ? "button" : undefined}
            aria-label={isImage ? `Preview ${file.name}` : undefined}
          >
            {isImage && objectUrl ? (
              <img
                src={objectUrl}
                alt={file.name}
                className="w-full h-full"
                style={{ objectFit: "cover", borderRadius: 5, display: "block" }}
              />
            ) : (
              <span
                style={{
                  fontSize: "var(--text-xs)",
                  fontFamily: "var(--font-family-open-runde)",
                  fontWeight: "var(--font-weight-semibold)",
                  color: "var(--muted-foreground)",
                  lineHeight: "14px",
                  letterSpacing: "0.02em",
                }}
              >
                {getFileExt(file.name)}
              </span>
            )}
          </div>

          {/* Remove badge — animated in/out on hover */}
          <AnimatePresence>
            {hovered && (
              <motion.button
                key="remove"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                }}
                aria-label={`Remove ${file.name}`}
                className="absolute flex items-center justify-center cursor-pointer"
                style={{
                  top: 0,
                  right: 0,
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: "var(--foreground)",
                  border: "1.5px solid var(--card)",
                  padding: 0,
                  zIndex: 2,
                  transformOrigin: "center center",
                }}
              >
                <HugeiconsIcon icon={Cancel01Icon} size={8} strokeWidth={2.5} color="var(--background)" />
              </motion.button>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  );
}

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
        borderRadius: "var(--radius)",
        maxHeight: 56,
      }}
    >
      <div
        className="flex gap-[8px] items-start w-full"
        style={{ padding: "8px 12px", maxHeight: 56, overflow: "hidden" }}
      >
        <p
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
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {text}
        </p>

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
          <HugeiconsIcon icon={Cancel01Icon} size={14} strokeWidth={1.5} color="var(--muted-foreground)" />
        </button>
      </div>
    </div>
  );
}

// ─── InputField ───────────────────────────────────────────────────────────────

export function InputField({
  quoteText: externalQuoteText,
  onQuoteDismiss,
}: {
  quoteText?: string | null;
  onQuoteDismiss?: () => void;
} = {}) {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // File attachment ─────────────────────────────────────────────────────────
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [attachedFiles, setAttachedFiles] = useState<AttachedFileEntry[]>([]);
  // IDs of files currently showing the Lottie removal animation
  const [removingIds, setRemovingIds] = useState<Set<string>>(new Set());

  // Lightbox
  const [lightbox, setLightbox] = useState<{ src: string; name: string } | null>(null);

  const ACCEPTED_TYPES = [
    "image/*",
    ".pdf", ".txt", ".doc", ".docx", ".csv", ".xls", ".xlsx",
    ".js", ".jsx", ".ts", ".tsx", ".html", ".css", ".scss",
    ".json", ".xml", ".yaml", ".yml", ".md", ".py", ".rb",
    ".java", ".c", ".cpp", ".h", ".cs", ".go", ".rs", ".php",
    ".sh", ".bash", ".zsh", ".sql", ".graphql", ".toml", ".env",
  ].join(",");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    const newEntries: AttachedFileEntry[] = files.map((f) => ({
      id: `${f.name}-${Date.now()}-${Math.random()}`,
      file: f,
      objectUrl: isImageFile(f) ? URL.createObjectURL(f) : null,
    }));
    setAttachedFiles((prev) => [...prev, ...newEntries]);
    e.target.value = "";
  };

  /**
   * Step 1 — mark as removing (shows Lottie animation in place)
   * Step 2 — after REMOVE_ANIM_DURATION, remove from array
   *           Motion layout then smoothly closes the gap
   */
  const removeFile = (id: string) => {
    // Already animating → ignore double-click
    if (removingIds.has(id)) return;

    setRemovingIds((prev) => new Set(prev).add(id));

    setTimeout(() => {
      setAttachedFiles((prev) => {
        const entry = prev.find((e) => e.id === id);
        if (entry?.objectUrl) URL.revokeObjectURL(entry.objectUrl);
        return prev.filter((e) => e.id !== id);
      });
      setRemovingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, REMOVE_ANIM_DURATION);
  };

  // Revoke all object URLs on unmount
  useEffect(() => {
    return () => {
      attachedFiles.forEach((e) => {
        if (e.objectUrl) URL.revokeObjectURL(e.objectUrl);
      });
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Textarea auto-resize ─────────────────────────────────────────────────────
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const LINE_HEIGHT = 20;
  const MAX_LINES = 12;
  const MAX_CONTENT_HEIGHT = LINE_HEIGHT * MAX_LINES;

  useLayoutEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "0px";
    const scrollH = ta.scrollHeight;
    const capped = Math.min(scrollH, MAX_CONTENT_HEIGHT);
    ta.style.height = `${capped}px`;
    ta.style.overflowY = scrollH > MAX_CONTENT_HEIGHT ? "auto" : "hidden";
  }, [text]);

  // Quote state — synced from external prop when provided
  const [quoteText, setQuoteText] = useState<string | null>(externalQuoteText ?? null);

  // Keep internal state in sync whenever the external prop changes
  useEffect(() => {
    setQuoteText(externalQuoteText ?? null);
  }, [externalQuoteText]);

  // Dropdown open states
  const [appsOpen, setAppsOpen] = useState(false);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);

  // Apps multi-select
  const [enabledApps, setEnabledApps] = useState<string[]>([]);

  // Selected values
  const [selectedWorkspace, setSelectedWorkspace] = useState("Workspace");
  const [selectedModel, setSelectedModel] = useState("Mistral 3");

  // Toggle state
  const [researchActive, setResearchActive] = useState(false);

  // Workspace error state
  const [workspaceError, setWorkspaceError] = useState(false);

  const openOnly = (target: "apps" | "workspace" | "model") => {
    setAppsOpen(target === "apps");
    setWorkspaceOpen(target === "workspace");
    setModelOpen(target === "model");
  };

  const isBlue = enabledApps.length > 0 || selectedWorkspace !== "Workspace";

  return (
    <>
      {/* ── Lightbox portal ── */}
      {/* <AnimatePresence>
        {lightbox && (
          <Lightbox
            src={lightbox.src}
            name={lightbox.name}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence> */}

      <motion.div
        layout
        className="w-[555px] rounded-2xl flex flex-col items-start p-[4px]"
        style={{
          background:
            enabledApps.length > 0 || selectedWorkspace !== "Workspace"
              ? "var(--switch-active-bg)"
              : "var(--border)",
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
            onOpenChange={(o) => (o ? openOnly("apps") : setAppsOpen(false))}
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
          <motion.div
            layout
            className="w-full rounded-xl flex flex-col overflow-visible"
            style={{ background: "var(--card)", padding: "4px", gap: "4px" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Quote block */}
            <AnimatePresence initial={false}>
              {quoteText && (
                <motion.div
                  key="quote"
                  initial={{ opacity: 0, scaleY: 0.72, y: -6 }}
                  animate={{
                    opacity: 1,
                    scaleY: 1,
                    y: 0,
                    transition: {
                      opacity: { duration: 0.18, ease: "easeOut" },
                      scaleY: {
                        type: "spring",
                        stiffness: 420,
                        damping: 22,
                        mass: 0.7,
                      },
                      y: {
                        type: "spring",
                        stiffness: 420,
                        damping: 22,
                        mass: 0.7,
                      },
                    },
                  }}
                  exit={{
                    opacity: 0,
                    scaleY: 0.78,
                    y: -4,
                    transition: {
                      opacity: { duration: 0.14, ease: "easeIn" },
                      scaleY: {
                        type: "spring",
                        stiffness: 480,
                        damping: 28,
                        mass: 0.6,
                      },
                      y: { duration: 0.14, ease: "easeIn" },
                    },
                  }}
                  style={{ transformOrigin: "top center" }}
                >
                  <QuoteBlock
                    text={quoteText}
                    onDismiss={() => {
                      setQuoteText(null);
                      if (onQuoteDismiss) onQuoteDismiss();
                    }}
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
                onKeyDown={(e) => e.stopPropagation()}
                placeholder="Explore an idea…"
                className="w-full bg-transparent resize-none outline-none border-none placeholder:opacity-80"
                style={{
                  fontSize: "var(--text-sm)",
                  fontFamily: "var(--font-family-open-runde)",
                  fontWeight: "var(--font-weight-regular)",
                  color: "var(--foreground)",
                  lineHeight: `${LINE_HEIGHT}px`,
                  caretColor: "var(--foreground)",
                  minHeight: `${LINE_HEIGHT * 2}px`,
                  height: `${LINE_HEIGHT * 2}px`,
                  overflowY: "hidden",
                }}
              />
            </div>

            {/* ── Attached files carousel ── */}
            <AnimatePresence initial={false}>
              {attachedFiles.length > 0 && (
                <motion.div
                  key="file-carousel"
                  layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full overflow-visible"
                >
                  <motion.div
                    layout
                    className="flex items-center overflow-x-auto overflow-y-visible"
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      padding: "0 10px 8px 10px",
                      gap: 4,
                      scrollbarWidth: "none",
                    }}
                  >
                    <AnimatePresence initial={false}>
                      {attachedFiles.map((entry) => (
                        <FileThumbnail
                          key={entry.id}
                          file={entry.file}
                          objectUrl={entry.objectUrl}
                          isRemoving={removingIds.has(entry.id)}
                          onRemove={() => removeFile(entry.id)}
                          onPreview={() => {
                            if (entry.objectUrl)
                              setLightbox({ src: entry.objectUrl, name: entry.file.name });
                          }}
                        />
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Bottom bar ── */}
            <div className="px-[12px] pb-[12px] pt-[6px] flex items-center justify-between">
              <div className="flex items-center gap-[6px]">
                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept={ACCEPTED_TYPES}
                  onChange={handleFileChange}
                  className="hidden"
                  aria-hidden="true"
                />
                <IconButton
                  icon={<PlusIcon />}
                  ariaLabel="Attach file"
                  variant="default"
                  onClick={() => fileInputRef.current?.click()}
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

          {/* Focus ring overlay */}
          <motion.div
            aria-hidden="true"
            animate={{ opacity: isFocused ? 1 : 0 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className="absolute inset-0 pointer-events-none rounded-[var(--radius-input)]"
            style={{
              pointerEvents: "none",
              border: "1px solid var(--input-focus-border)",
              boxShadow: "0px 0px 0px 3px var(--input-focus-glow)",
            }}
          />
        </div>
      </motion.div>
    </>
  );
}