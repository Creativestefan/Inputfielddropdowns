import { useState, useRef, useEffect } from "react";
import svgPaths from "../../imports/svg-47rfj0u08o";

// ─── Icons ────────────────────────────────────────────────────────────────────

function AppsIcon({
  color = "var(--muted-foreground)",
}: {
  color?: string;
}) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect
        x="1.33"
        y="1.33"
        width="4"
        height="4"
        rx="0.5"
        stroke={color}
        strokeWidth="1.33"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="1.33"
        y="9.33"
        width="4"
        height="4"
        rx="0.5"
        stroke={color}
        strokeWidth="1.33"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="9.33"
        y="1.33"
        width="4"
        height="4"
        rx="0.5"
        stroke={color}
        strokeWidth="1.33"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="9.33"
        y="9.33"
        width="4"
        height="4"
        rx="0.5"
        stroke={color}
        strokeWidth="1.33"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WorkspaceIcon({
  color = "var(--muted-foreground)",
}: {
  color?: string;
}) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d={svgPaths.p15d9c600}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.33"
        transform="scale(0.97) translate(0.2, 2.1)"
      />
      <path
        d={svgPaths.p3bb5e670}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.33"
        transform="scale(0.97) translate(0.2, 2.1)"
      />
    </svg>
  );
}

function ChevronDownIcon({
  color = "var(--muted-foreground)",
}: {
  color?: string;
}) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d={svgPaths.p2e4aa280}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.33"
        transform="translate(3.3, 5.3)"
      />
    </svg>
  );
}

function ResearchIcon({
  color = "var(--muted-foreground)",
}: {
  color?: string;
}) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d={svgPaths.p3ae556c0}
        stroke={color}
        strokeWidth="1.33"
        transform="scale(0.85) translate(1.2, 0.8)"
      />
      <path
        d={svgPaths.p2f4ade80}
        stroke={color}
        strokeWidth="1.33"
        transform="scale(0.85) translate(1.2, 0.8)"
      />
      <path
        d={svgPaths.p2ecf0900}
        stroke={color}
        strokeWidth="1.33"
        transform="scale(0.85) translate(1.2, 0.8)"
      />
      <path
        d={svgPaths.p2acca280}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.33"
        transform="scale(0.85) translate(1.2, 0.8)"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d={svgPaths.pd334180}
        stroke="var(--foreground)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.33"
        transform="translate(2.67, 2.67)"
      />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d={svgPaths.p4f29f00}
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.33"
        transform="translate(2.67, 0.67)"
      />
    </svg>
  );
}

// ─── Dropdown ─────────────────────────────────────────────────────────────────

interface DropdownProps {
  open: boolean;
  onClose: () => void;
  options: string[];
  selected: string;
  onSelect: (val: string) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

function Dropdown({
  open,
  onClose,
  options,
  selected,
  onSelect,
  triggerRef,
}: DropdownProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () =>
      document.removeEventListener("mousedown", handleClick);
  }, [open, onClose, triggerRef]);

  if (!open) return null;

  return (
    <div
      ref={menuRef}
      className="absolute top-full mt-1 left-0 z-50 min-w-[140px] rounded-[var(--radius)] border border-[var(--border)] overflow-hidden"
      style={{
        background: "var(--card)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
      }}
    >
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => {
            onSelect(opt);
            onClose();
          }}
          className="w-full text-left px-3 py-2 flex items-center gap-2 transition-colors"
          style={{
            fontSize: "var(--text-sm)",
            fontFamily: "var(--font-family-open-runde)",
            fontWeight: "var(--font-weight-medium)",
            color:
              opt === selected
                ? "var(--foreground)"
                : "var(--muted-foreground)",
            background:
              opt === selected
                ? "rgba(255,255,255,0.06)"
                : "transparent",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background =
              "rgba(255,255,255,0.06)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background =
              opt === selected
                ? "rgba(255,255,255,0.06)"
                : "transparent")
          }
        >
          {opt === selected && (
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className="shrink-0"
            >
              <path
                d="M2 6L5 9L10 3"
                stroke="var(--foreground)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          {opt !== selected && (
            <span className="w-3 shrink-0" />
          )}
          {opt}
        </button>
      ))}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

const APP_OPTIONS = [
  "All Apps",
  "Figma",
  "Notion",
  "Slack",
  "GitHub",
  "Jira",
];
const WORKSPACE_OPTIONS = [
  "Personal",
  "Team Alpha",
  "Design System",
  "Product",
];
const MODEL_OPTIONS = [
  "Hermes",
  "Claude 3.5",
  "GPT-4o",
  "Gemini Pro",
];

export function InputField() {
  const [text, setText] = useState("");
  const [appsOpen, setAppsOpen] = useState(false);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState("Apps");
  const [selectedWorkspace, setSelectedWorkspace] =
    useState("Workspace");
  const [selectedModel, setSelectedModel] = useState("Hermes");
  const [researchActive, setResearchActive] = useState(false);

  const appsTriggerRef = useRef<HTMLButtonElement>(null);
  const workspaceTriggerRef = useRef<HTMLButtonElement>(null);
  const modelTriggerRef = useRef<HTMLButtonElement>(null);

  return (
    <div
      className="w-[555px] p-[2px] rounded-[var(--radius-card)] flex flex-col items-start"
      style={{ background: "var(--border)" }}
    >
      {/* Top bar: dropdowns */}
      <div className="w-full px-[6px] py-[6px] flex items-center gap-[6px]">
        {/* Apps Dropdown */}
        <div className="relative">
          <button
            ref={appsTriggerRef}
            onClick={() => {
              setAppsOpen((v) => !v);
              setWorkspaceOpen(false);
              setModelOpen(false);
            }}
            className="flex items-center gap-[6px] px-[10px] py-[4px] rounded-[var(--radius)] transition-colors cursor-pointer"
            style={{
              background: appsOpen
                ? "rgba(255,255,255,0.10)"
                : "rgba(255,255,255,0.05)",
            }}
          >
            <AppsIcon
              color={
                selectedApp !== "Apps"
                  ? "var(--foreground)"
                  : "var(--muted-foreground)"
              }
            />
            <span
              style={{
                fontSize: "var(--text-sm)",
                fontFamily: "var(--font-family-open-runde)",
                fontWeight: "var(--font-weight-medium)",
                color: "var(--foreground)",
                lineHeight: "20px",
              }}
            >
              {selectedApp}
            </span>
            <ChevronDownIcon />
          </button>
          <Dropdown
            open={appsOpen}
            onClose={() => setAppsOpen(false)}
            options={APP_OPTIONS}
            selected={selectedApp === "Apps" ? "" : selectedApp}
            onSelect={setSelectedApp}
            triggerRef={appsTriggerRef}
          />
        </div>

        {/* Workspace Dropdown */}
        <div className="relative">
          <button
            ref={workspaceTriggerRef}
            onClick={() => {
              setWorkspaceOpen((v) => !v);
              setAppsOpen(false);
              setModelOpen(false);
            }}
            className="flex items-center gap-[6px] px-[10px] py-[4px] rounded-[var(--radius)] transition-colors cursor-pointer"
            style={{
              background: workspaceOpen
                ? "rgba(255,255,255,0.10)"
                : "rgba(255,255,255,0.05)",
            }}
          >
            <WorkspaceIcon
              color={
                selectedWorkspace !== "Workspace"
                  ? "var(--foreground)"
                  : "var(--muted-foreground)"
              }
            />
            <span
              style={{
                fontSize: "var(--text-sm)",
                fontFamily: "var(--font-family-open-runde)",
                fontWeight: "var(--font-weight-medium)",
                color: "var(--foreground)",
                lineHeight: "20px",
              }}
            >
              {selectedWorkspace}
            </span>
            <ChevronDownIcon />
          </button>
          <Dropdown
            open={workspaceOpen}
            onClose={() => setWorkspaceOpen(false)}
            options={WORKSPACE_OPTIONS}
            selected={
              selectedWorkspace === "Workspace"
                ? ""
                : selectedWorkspace
            }
            onSelect={setSelectedWorkspace}
            triggerRef={workspaceTriggerRef}
          />
        </div>
      </div>

      {/* Input card */}
      <div
        className="w-full rounded-[14px] flex flex-col"
        style={{ background: "var(--input-background)" }}
      >
        {/* Textarea */}
        <div className="px-[12px] pt-[12px] pb-[4px] min-h-[62px]">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Explore an idea…"
            rows={2}
            className="w-full bg-transparent resize-none outline-none border-none placeholder:opacity-80"
            style={{
              fontSize: "var(--text-sm)",
              fontFamily: "var(--font-family-open-runde)",
              fontWeight: "var(--font-weight-normal)",
              color: "var(--foreground)",
              lineHeight: "20px",
              caretColor: "var(--foreground)",
            }}
          />
        </div>

        {/* Bottom bar */}
        <div className="px-[12px] pb-[12px] pt-[6px] flex items-center justify-between">
          {/* Left controls */}
          <div className="flex items-center gap-[6px]">
            {/* + Button */}
            <button
              className="flex items-center justify-center rounded-[var(--radius)] shrink-0 size-[28px] transition-opacity hover:opacity-80 cursor-pointer"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 100%), var(--secondary)",
                boxShadow:
                  "0px 1px 2px 0px rgba(0,0,0,0.05), 0px 0px 0px 1px var(--border)",
              }}
            >
              <PlusIcon />
            </button>

            {/* Research Toggle */}
            <button
              onClick={() => setResearchActive((v) => !v)}
              className="flex items-center gap-[6px] px-[6px] py-[4px] rounded-[var(--radius)] transition-all cursor-pointer"
              style={{
                background: researchActive
                  ? "rgba(255,255,255,0.08)"
                  : "transparent",
                boxShadow: researchActive
                  ? "0 0 0 1px rgba(255,255,255,0.12)"
                  : "none",
              }}
            >
              <ResearchIcon
                color={
                  researchActive
                    ? "var(--foreground)"
                    : "var(--muted-foreground)"
                }
              />
              <span
                style={{
                  fontSize: "var(--text-sm)",
                  fontFamily: "var(--font-family-open-runde)",
                  fontWeight: "var(--font-weight-medium)",
                  color: researchActive
                    ? "var(--foreground)"
                    : "var(--muted-foreground)",
                  lineHeight: "20px",
                  transition: "color 0.15s",
                }}
              >
                Research
              </span>
            </button>

            {/* Model Dropdown */}
            <div className="relative">
              <button
                ref={modelTriggerRef}
                onClick={() => {
                  setModelOpen((v) => !v);
                  setAppsOpen(false);
                  setWorkspaceOpen(false);
                }}
                className="flex items-center gap-[4px] px-[8px] py-[4px] rounded-[var(--radius)] transition-colors cursor-pointer"
                style={{
                  background: modelOpen
                    ? "rgba(255,255,255,0.06)"
                    : "transparent",
                }}
              >
                <span
                  style={{
                    fontSize: "var(--text-sm)",
                    fontFamily: "var(--font-family-open-runde)",
                    fontWeight: "var(--font-weight-medium)",
                    color: "var(--muted-foreground)",
                    lineHeight: "20px",
                  }}
                >
                  {selectedModel}
                </span>
                <ChevronDownIcon />
              </button>
              <Dropdown
                open={modelOpen}
                onClose={() => setModelOpen(false)}
                options={MODEL_OPTIONS}
                selected={selectedModel}
                onSelect={setSelectedModel}
                triggerRef={modelTriggerRef}
              />
            </div>
          </div>

          {/* Mic Button */}
          <button
            className="flex items-center justify-center rounded-[var(--radius)] shrink-0 size-[28px] transition-opacity hover:opacity-90 cursor-pointer"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 60%), #048af5",
              boxShadow:
                "0px 1px 2px 0px rgba(0,0,0,0.05), 0px 0px 0px 1px #048af5",
            }}
          >
            <MicIcon />
          </button>
        </div>
      </div>
    </div>
  );
}