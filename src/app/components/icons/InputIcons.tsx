import svgPaths from "../../../imports/svg-47rfj0u08o";
import arrowPaths from "../../../imports/svg-l35miheg4n";

// ─── AppsIcon ─────────────────────────────────────────────────────────────────

export function AppsIcon({
  color = "var(--muted-foreground)",
}: {
  color?: string;
}) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1.33" y="1.33" width="4" height="4" rx="0.5" stroke={color} strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="1.33" y="9.33" width="4" height="4" rx="0.5" stroke={color} strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="9.33" y="1.33" width="4" height="4" rx="0.5" stroke={color} strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="9.33" y="9.33" width="4" height="4" rx="0.5" stroke={color} strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── WorkspaceIcon ────────────────────────────────────────────────────────────

export function WorkspaceIcon({
  color = "var(--muted-foreground)",
}: {
  color?: string;
}) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d={svgPaths.p15d9c600} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" transform="scale(0.97) translate(0.2, 2.1)" />
      <path d={svgPaths.p3bb5e670} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" transform="scale(0.97) translate(0.2, 2.1)" />
    </svg>
  );
}

// ─── ChevronDownIcon ──────────────────────────────────────────────────────────

export function ChevronDownIcon({
  color = "var(--muted-foreground)",
}: {
  color?: string;
}) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d={svgPaths.p2e4aa280} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" transform="translate(3.3, 5.3)" />
    </svg>
  );
}

// ─── ResearchIcon ─────────────────────────────────────────────────────────────

export function ResearchIcon({
  color = "var(--muted-foreground)",
}: {
  color?: string;
}) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d={svgPaths.p3ae556c0} stroke={color} strokeWidth="1.33" transform="scale(0.85) translate(1.2, 0.8)" />
      <path d={svgPaths.p2f4ade80} stroke={color} strokeWidth="1.33" transform="scale(0.85) translate(1.2, 0.8)" />
      <path d={svgPaths.p2ecf0900} stroke={color} strokeWidth="1.33" transform="scale(0.85) translate(1.2, 0.8)" />
      <path d={svgPaths.p2acca280} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" transform="scale(0.85) translate(1.2, 0.8)" />
    </svg>
  );
}

// ─── PlusIcon ─────────────────────────────────────────────────────────────────

export function PlusIcon({ color = "var(--foreground)" }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d={svgPaths.pd334180} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" transform="translate(2.67, 2.67)" />
    </svg>
  );
}

// ─── MicIcon ──────────────────────────────────────────────────────────────────

export function MicIcon({ color = "white" }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d={svgPaths.p4f29f00} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" transform="translate(2.67, 0.67)" />
    </svg>
  );
}

// ─── ArrowUpIcon ──────────────────────────────────────────────────────────────

export function ArrowUpIcon({ color = "white" }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <g transform="translate(3.335, 3) scale(1, -1) translate(0, -10.665)">
        <path d={arrowPaths.p3cfb1180} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
        <path d={arrowPaths.p2d3e3e00} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
      </g>
    </svg>
  );
}
