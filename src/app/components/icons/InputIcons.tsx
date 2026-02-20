import { HugeiconsIcon } from "@hugeicons/react";
import {
  GridIcon,
  LayerIcon,
  ArrowDown01Icon,
  Telescope01Icon,
  Add01Icon,
  Mic01Icon,
  ArrowUp02Icon,
} from "@hugeicons/core-free-icons";

// ─── Shared defaults ──────────────────────────────────────────────────────────

const SIZE = 16;
const STROKE = 1.5;

// ─── AppsIcon ─────────────────────────────────────────────────────────────────

export function AppsIcon({
  color = "var(--muted-foreground)",
}: {
  color?: string;
}) {
  return (
    <HugeiconsIcon icon={GridIcon} size={SIZE} color={color} strokeWidth={STROKE} />
  );
}

// ─── WorkspaceIcon ────────────────────────────────────────────────────────────

export function WorkspaceIcon({
  color = "var(--muted-foreground)",
}: {
  color?: string;
}) {
  return (
    <HugeiconsIcon icon={LayerIcon} size={SIZE} color={color} strokeWidth={STROKE} />
  );
}

// ─── ChevronDownIcon ──────────────────────────────────────────────────────────

export function ChevronDownIcon({
  color = "var(--muted-foreground)",
}: {
  color?: string;
}) {
  return (
    <HugeiconsIcon icon={ArrowDown01Icon} size={SIZE} color={color} strokeWidth={STROKE} />
  );
}

// ─── ResearchIcon ─────────────────────────────────────────────────────────────

export function ResearchIcon({
  color = "var(--muted-foreground)",
}: {
  color?: string;
}) {
  return (
    <HugeiconsIcon icon={Telescope01Icon} size={SIZE} color={color} strokeWidth={STROKE} />
  );
}

// ─── PlusIcon ─────────────────────────────────────────────────────────────────

export function PlusIcon({ color = "var(--foreground)" }: { color?: string }) {
  return (
    <HugeiconsIcon icon={Add01Icon} size={SIZE} color={color} strokeWidth={STROKE} />
  );
}

// ─── MicIcon ──────────────────────────────────────────────────────────────────

export function MicIcon({ color = "white" }: { color?: string }) {
  return (
    <HugeiconsIcon icon={Mic01Icon} size={SIZE} color={color} strokeWidth={STROKE} />
  );
}

// ─── ArrowUpIcon ──────────────────────────────────────────────────────────────

export function ArrowUpIcon({ color = "white" }: { color?: string }) {
  return (
    <HugeiconsIcon icon={ArrowUp02Icon} size={SIZE} color={color} strokeWidth={STROKE} />
  );
}