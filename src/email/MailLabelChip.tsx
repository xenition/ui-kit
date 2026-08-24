import * as React from 'react';
import { cn } from '../primitives/cn';

export type MailLabelTone = 'neutral' | 'primary' | 'accent' | 'success' | 'warn' | 'danger';
export type MailLabelVariant = 'soft' | 'solid' | 'outline';

const SOFT: Record<MailLabelTone, string> = {
  neutral: 'bg-neutral-100 text-on-surface',
  primary: 'bg-primary-50 text-primary',
  accent: 'bg-accent-50 text-accent',
  success: 'bg-success text-on-success',
  warn: 'bg-warn text-on-warn',
  danger: 'bg-danger text-on-danger',
};

const SOLID: Record<MailLabelTone, string> = {
  neutral: 'bg-muted text-surface',
  primary: 'bg-primary text-on-primary',
  accent: 'bg-accent text-on-accent',
  success: 'bg-success text-on-success',
  warn: 'bg-warn text-on-warn',
  danger: 'bg-danger text-on-danger',
};

const OUTLINE: Record<MailLabelTone, string> = {
  neutral: 'bg-transparent border border-border text-muted',
  primary: 'bg-transparent border border-primary text-primary',
  accent: 'bg-transparent border border-accent text-accent',
  success: 'bg-transparent border border-success text-success',
  warn: 'bg-transparent border border-warn text-warn',
  danger: 'bg-transparent border border-danger text-danger',
};

const VARIANT: Record<MailLabelVariant, Record<MailLabelTone, string>> = {
  soft: SOFT,
  solid: SOLID,
  outline: OUTLINE,
};

export interface MailLabelChipProps {
  /** Label text (e.g. "Work", "Receipts"). */
  label: string;
  /** Color tone. Default `'neutral'`. */
  tone?: MailLabelTone;
  /** Fill treatment. Default `'soft'`. */
  variant?: MailLabelVariant;
  /** Optional leading glyph (emoji / symbol). */
  glyph?: string;
  /** When provided, renders a removable "×" affordance (a real `<button>`). */
  onRemove?: () => void;
  /** Clicking the chip (e.g. filter by label). */
  onClick?: () => void;
  className?: string;
}

/**
 * A colored label / category chip for mail (Gmail-style labels). `tone` selects
 * a semantic slot and `variant` picks a fill: `soft` tints the tone, `solid`
 * fills it, `outline` rings it — every color resolved from a `--xen-*` token
 * class. Optionally removable via `onRemove` (a real button); the whole chip is
 * clickable via `onClick`. No literal colors.
 */
export const MailLabelChip = React.forwardRef<HTMLSpanElement, MailLabelChipProps>(
  function MailLabelChip(
    { label, tone = 'neutral', variant = 'soft', glyph, onRemove, onClick, className },
    ref
  ) {
    const toneClasses = VARIANT[variant][tone];
    const inner = (
      <>
        {glyph ? (
          <span aria-hidden="true" className="text-xs leading-none">
            {glyph}
          </span>
        ) : null}
        <span className="truncate">{label}</span>
      </>
    );

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex max-w-full items-center gap-[var(--xen-space-xs)] self-start rounded-full px-[var(--xen-space-sm)] py-0.5 text-xs font-semibold',
          toneClasses,
          className
        )}
      >
        {onClick ? (
          <button
            type="button"
            aria-label={`Label ${label}`}
            onClick={onClick}
            className="inline-flex items-center gap-[var(--xen-space-xs)] transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {inner}
          </button>
        ) : (
          <span className="inline-flex items-center gap-[var(--xen-space-xs)]">{inner}</span>
        )}
        {onRemove ? (
          <button
            type="button"
            aria-label={`Remove label ${label}`}
            onClick={onRemove}
            className="ml-0.5 inline-flex leading-none opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            ×
          </button>
        ) : null}
      </span>
    );
  }
);
