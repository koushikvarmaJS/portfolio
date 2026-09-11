import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Check, Copy, ExternalLink } from "lucide-react";
import type { IconType } from "react-icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export type ContactItem = {
  icon: IconType;
  /** Accessible name, e.g. "Email" */
  label: string;
  /** The detail a visitor actually wants to read, e.g. the address itself */
  value: string;
  href: string;
  /** Wording for the button that follows `href` */
  actionLabel: string;
  /**
   * "copy" opens a panel showing the value with a copy button — used for email
   * and phone, where following the link hands the visitor off to a mail client
   * or does nothing at all on desktop.
   * "link" just opens the URL, which is what people expect from a social icon.
   */
  behavior: "copy" | "link";
};

const iconButtonClass =
  "text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm";

/** Copies text, falling back to a hidden textarea when the Clipboard API is
 *  unavailable (it needs a secure context, which plain http:// previews lack). */
const copyText = async (text: string) => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to the legacy path */
  }

  try {
    const el = document.createElement("textarea");
    el.value = text;
    el.setAttribute("readonly", "");
    el.style.position = "fixed";
    el.style.opacity = "0";
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(el);
    return ok;
  } catch {
    return false;
  }
};

const ContactLink = ({ item, delay = 0 }: { item: ContactItem; delay?: number }) => {
  const [tipOpen, setTipOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<number>();

  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  const handleCopy = async () => {
    const ok = await copyText(item.value);
    if (!ok) return;
    setCopied(true);
    window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setCopied(false), 2000);
  };

  const Icon = item.icon;

  const trigger = (
    <motion.span
      className="inline-flex"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      whileHover={{ scale: 1.2, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
    >
      <Icon className="w-6 h-6" />
    </motion.span>
  );

  // Tooltip is driven manually so it can stay out of the way while the popover
  // is open — otherwise both panels sit on screen at once.
  const withTooltip = (node: ReactNode) => (
    <Tooltip open={tipOpen && !popoverOpen} onOpenChange={setTipOpen}>
      <TooltipTrigger asChild>{node}</TooltipTrigger>
      <TooltipContent side="bottom">
        <span className="font-mono text-xs">{item.value}</span>
      </TooltipContent>
    </Tooltip>
  );

  if (item.behavior === "link") {
    return withTooltip(
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${item.label}: ${item.value}`}
        className={iconButtonClass}
      >
        {trigger}
      </a>,
    );
  }

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      {withTooltip(
        <PopoverTrigger
          aria-label={`${item.label}: ${item.value}`}
          className={iconButtonClass}
        >
          {trigger}
        </PopoverTrigger>,
      )}

      <PopoverContent align="end" className="w-auto min-w-56 p-3">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
          {item.label}
        </p>
        <p className="font-mono text-sm text-foreground mb-3 select-all break-all">
          {item.value}
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied" : "Copy"}
          </button>

          <a
            href={item.href}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-2.5 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {item.actionLabel}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Screen readers announce the copy result, which is otherwise only
            conveyed by the icon swapping to a checkmark. */}
        <span role="status" aria-live="polite" className="sr-only">
          {copied ? `${item.label} copied to clipboard` : ""}
        </span>
      </PopoverContent>
    </Popover>
  );
};

export default ContactLink;
