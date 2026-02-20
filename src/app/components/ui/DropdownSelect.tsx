import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDownIcon } from "../icons/InputIcons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon, Tick01Icon } from "@hugeicons/core-free-icons";

interface DropdownSelectProps {
  /** Icon rendered to the left of the label — pass `null` to omit */
  icon?: React.ReactNode;
  /** Currently selected value (shown as the trigger label) */
  value: string;
  /** Options to list in the menu */
  options: string[];
  /** Called when the user picks an option */
  onChange: (val: string) => void;
  /** Controls open state (lifted to parent so siblings can close each other) */
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Extra bg opacity when open vs. closed (defaults to top‑bar pill style) */
  triggerVariant?: "pill" | "ghost";
  /** Color of the trigger label text. Accepts any CSS value or variable. Defaults to var(--foreground) */
  labelColor?: string;
  /** When true (apps active), forces icon, label and chevron to white */
  appsActive?: boolean;
  /** When true, hides the search field in the dropdown panel */
  hideSearch?: boolean;
  /** When true, suppresses the persistent selected-state background on the trigger */
  noSelectedBg?: boolean;
  /** The value to restore when a selected item is clicked again (deselect). Defaults to "" */
  defaultValue?: string;
  /** When true, clicking the already-selected item just closes the menu without deselecting */
  disableDeselect?: boolean;
  /** Override the dropdown panel width. Accepts any CSS value or number (px). Defaults to 286 */
  menuWidth?: number | string;
  /** When true, forces chevron to white because the outer background is blue */
  bgActive?: boolean;
  /** When true, shows error background, border and tooltip on the trigger */
  error?: boolean;
  /** Message shown in the error tooltip. Defaults to "Select a workspace" */
  errorMessage?: string;
  /** Called when the error should be dismissed (after 3 s or outside click) */
  onErrorClear?: () => void;
  /** Which direction the menu opens. Defaults to "bottom" */
  placement?: "bottom" | "top";
}

export function DropdownSelect({
  icon,
  value,
  options,
  onChange,
  open,
  onOpenChange,
  triggerVariant = "pill",
  labelColor = "var(--foreground)",
  appsActive = false,
  hideSearch = false,
  noSelectedBg = false,
  defaultValue = "",
  disableDeselect = false,
  menuWidth = 286,
  bgActive = false,
  error = false,
  errorMessage = "Select a workspace",
  onErrorClear,
  placement = "bottom",
}: DropdownSelectProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");

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
    return () =>
      document.removeEventListener(
        "mousedown",
        handlePointerDown,
      );
  }, [open, onOpenChange]);

  // Auto-dismiss error after 3 s
  useEffect(() => {
    if (!error) return;
    const id = setTimeout(() => onErrorClear?.(), 3000);
    return () => clearTimeout(id);
  }, [error, onErrorClear]);

  // Dismiss error on outside click (when tooltip is visible)
  useEffect(() => {
    if (!error || open) return;
    function handlePointerDown(e: MouseEvent) {
      if (triggerRef.current?.contains(e.target as Node))
        return;
      onErrorClear?.();
    }
    document.addEventListener("mousedown", handlePointerDown);
    return () =>
      document.removeEventListener(
        "mousedown",
        handlePointerDown,
      );
  }, [error, open, onErrorClear]);

  // Focus search when opened, clear when closed
  useEffect(() => {
    if (open) {
      setTimeout(() => searchRef.current?.focus(), 50);
    } else {
      setSearch("");
    }
  }, [open]);

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(search.toLowerCase()),
  );

  const pillBg =
    triggerVariant === "pill"
      ? open
        ? "rgba(255,255,255,0.10)"
        : "rgba(0,0,0,0)"
      : open
        ? "rgba(255,255,255,0.06)"
        : "rgba(0,0,0,0)";

  const pillBgHover =
    triggerVariant === "pill"
      ? open
        ? "rgba(255,255,255,0.10)"
        : "rgba(255,255,255,0.06)"
      : open
        ? "rgba(255,255,255,0.06)"
        : "rgba(255,255,255,0.04)";

  return (
    <div className="relative">
      {/* Trigger */}
      <motion.button
        layout
        ref={triggerRef}
        onClick={() => onOpenChange(!open)}
        className="flex items-center gap-[6px] px-[10px] py-[4px] rounded-md cursor-pointer relative"
        initial={{
          background: "rgba(0,0,0,0)",
          boxShadow: "0 0 0 0px rgba(231,0,11,0)",
        }}
        animate={{
          background:
            error && !open
              ? "rgba(255,255,255,0.06)"
              : open
                ? pillBg
                : !noSelectedBg && options.includes(value)
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(0,0,0,0)",
          boxShadow:
            error && !open
              ? "0 0 0 1px rgba(231,0,11,1)"
              : "0 0 0 0px rgba(231,0,11,0)",
        }}
        whileHover={{
          background:
            error && !open
              ? "rgba(231,0,11,0.18)"
              : pillBgHover,
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        {icon && (
          <motion.span
            layout="preserve-aspect"
            className="shrink-0"
          >
            {icon}
          </motion.span>
        )}
        <motion.span
          layout="preserve-aspect"
          key={value}
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          style={{
            fontSize: "var(--text-sm)",
            fontFamily: "var(--font-family-open-runde)",
            fontWeight: "var(--font-weight-medium)",
            color: appsActive ? "white" : labelColor,
            lineHeight: "20px",
            whiteSpace: "nowrap",
          }}
        >
          {value}
        </motion.span>
        <motion.span
          layout="preserve-aspect"
          className="shrink-0"
        >
          <ChevronDownIcon
            color={appsActive || bgActive ? "white" : undefined}
          />
        </motion.span>

        {/* Error tooltip — positioned above the trigger */}
        <AnimatePresence>
          {error && !open && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.96 }}
              transition={{
                duration: 0.18,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute pointer-events-none"
              style={{
                bottom: "calc(100% + 10px)",
                left: 0,
                right: 0,
                marginLeft: "auto",
                marginRight: "auto",
                width: "fit-content",
                zIndex: 100,
              }}
            >
              {/* Tooltip body */}
              <div
                style={{
                  background: "var(--foreground)",
                  borderRadius: 8,
                  padding: "6px 12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  whiteSpace: "nowrap",
                  boxShadow:
                    "0 4px 12px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.08)",
                  position: "relative",
                }}
              >
                <p
                  style={{
                    fontSize: "var(--text-xs)",
                    fontFamily: "var(--font-family-open-runde)",
                    fontWeight: "var(--font-weight-regular)",
                    color: "var(--primary-foreground)",
                    lineHeight: "16px",
                    letterSpacing: "0.12px",
                    margin: 0,
                  }}
                >
                  {errorMessage}
                </p>

                {/* Caret — rotated square matching Figma spec */}
                <div
                  style={{
                    position: "absolute",
                    bottom: -7,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 14.142,
                    height: 14.142,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      background: "var(--foreground)",
                      borderRadius: 2,
                      transform: "rotate(-45deg)",
                    }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Animated panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            layout
            initial={{ opacity: 0, scale: 0.95, y: placement === "top" ? 6 : -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: placement === "top" ? 6 : -6 }}
            transition={{
              duration: 0.15,
              ease: [0.16, 1, 0.3, 1],
              layout: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
            }}
            className={`absolute ${placement === "bottom" ? "top-full mt-1 origin-top" : "bottom-full mb-1 origin-bottom"} left-0 z-50 overflow-hidden`}
            style={{
              width: menuWidth,
              minWidth: 192,
              maxWidth: 576,
              borderRadius: "var(--radius-input)",
              background: "var(--popover)",
              border: "1px solid var(--border)",
              boxShadow:
                "0px 2px 4px -2px rgba(0,0,0,0.12), 0px 4px 6px -1px rgba(0,0,0,0.16)",
            }}
          >
            {/* Search field */}
            {!hideSearch && (
              <div className="relative shrink-0 w-full">
                <div className="flex items-center px-[12px] py-[10px] gap-[8px]">
                  {/* Search icon */}
                  <HugeiconsIcon icon={Search01Icon} size={16} strokeWidth={1.5} color="var(--muted-foreground)" className="shrink-0" />
                  {/* Search input */}
                  <input
                    ref={searchRef}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search workspace"
                    className="flex-1 bg-transparent outline-none border-none min-w-0"
                    style={{
                      fontSize: "var(--text-sm)",
                      fontFamily:
                        "var(--font-family-open-runde)",
                      fontWeight: "var(--font-weight-regular)",
                      color: "var(--popover-foreground)",
                      lineHeight: "20px",
                    }}
                  />
                </div>
                {/* Bottom border divider */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    borderBottom:
                      "1px solid var(--border)",
                  }}
                />
              </div>
            )}

            {/* Options list */}
            <motion.div layout className="max-h-[300px] overflow-y-auto">
              <motion.div layout className="flex flex-col items-start px-[4px] py-[6px]">
                <AnimatePresence initial={false}>
                  {filteredOptions.length > 0 ? (
                   filteredOptions.map((opt) => {
                     const isSelected = opt === value;
                     return (
                       <motion.button
                         key={opt}
                         layout
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         exit={{ opacity: 0 }}
                         transition={{ duration: 0.14, ease: "easeInOut" }}
                         onClick={() => {
                           if (isSelected && disableDeselect) {
                             onOpenChange(false);
                             return;
                           }
                           onChange(isSelected ? defaultValue : opt);
                           onOpenChange(false);
                         }}
                         className="w-full text-left rounded-[8px] flex items-center gap-[8px] px-[8px] py-[6px] cursor-pointer transition-colors"
                         style={{
                           background: "transparent",
                         }}
                         onMouseEnter={(e) =>
                           (e.currentTarget.style.background =
                             "rgba(255, 255, 255, 0.045)")
                         }
                         onMouseLeave={(e) =>
                           (e.currentTarget.style.background =
                             "transparent")
                         }
                       >
                         {/* Label */}
                         <span
                           className="flex-1 min-w-0 truncate"
                           style={{
                             fontSize: "var(--text-sm)",
                             fontFamily:
                               "var(--font-family-open-runde)",
                             fontWeight:
                               "var(--font-weight-regular)",
                             color: "var(--popover-foreground)",
                             lineHeight: "20px",
                           }}
                         >
                           {opt}
                         </span>
                         {/* Check on the right for selected */}
                         {isSelected && (
                           <HugeiconsIcon
                             icon={Tick01Icon}
                             size={16}
                             strokeWidth={1.5}
                             color="var(--popover-foreground)"
                             className="shrink-0"
                           />
                         )}
                       </motion.button>
                     );
                   })
                  ) : (
                    <motion.p
                      key="no-results"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.14, ease: "easeInOut" }}
                      className="px-[8px] py-[6px]"
                      style={{
                        fontSize: "var(--text-sm)",
                        fontFamily:
                          "var(--font-family-open-runde)",
                        fontWeight: "var(--font-weight-regular)",
                        color: "var(--muted-foreground)",
                        lineHeight: "20px",
                      }}
                    >
                      No results
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>

            {/* Outer inset border overlay */}
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