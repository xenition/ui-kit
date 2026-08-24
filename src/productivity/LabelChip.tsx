import * as React from 'react';
import { cn } from '../primitives/cn';

/** Color-coded label tone (folders, categories, tags). */
export type LabelTone = 'neutral' | 'primary' | 'success' | 'warn' | 'danger';

export interface LabelChipProps {
  /** Chip text. */
  label: string;
  /** Semantic tone for the leading dot. */
  tone?: LabelTone;
  /** Renders a remove (×) button that calls this. */
  onRemove?: () => void;
  /** Makes the whole chip clickable (e.g. to filter). */
  onClick?: () => void;
  className?: string;
}

/** Maps a tone to the token class used for its accent dot. */
const DOT: Record<LabelTone, string> = {
  neutral: 'bg-muted',
  primary: 'bg-primary',
  success: 'bg-success',
  warn: 'bg-warn',
  danger: 'bg-danger',
};

/**
 * Outlined, color-coded label chip — a token-bound accent dot plus text on a
 * surface background, with optional click + remove affordances. Web parity of the
 * native `LabelChip` (`onPress` → `onClick`). The dot tone traces to an `--xen-*`
 * token class. No literal colors.
 */
export const LabelChip = React.forwardRef<HTMLDivElement, LabelChipProps>(function LabelChip(
  { label, tone = 'neutral', onRemove, onClick, className },
  ref
) {
  const container = cn(
    'inline-flex items-center gap-1 self-start rounded-full border border-border bg-surface px-2 py-0.5',
    onClick && 'cursor-pointer transition-opacity hover:opacity-70',
    className
  );

  const body = (
    <>
      <span aria-hidden className={cn('inline-block h-2 w-2 rounded-full', DOT[tone] ?? DOT.neutral)} />
      <span className="text-xs font-medium text-on-surface">{label}</span>
      {onRemove ? (
        <button
          type="button"
          aria-label={`Remove ${label}`}
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-0.5 text-xs font-semibold text-muted transition-opacity hover:opacity-100"
        >
          ×
        </button>
      ) : null}
    </>
  );

  if (onClick) {
    // A `role="button"` div (not a `<button>`) so the nested remove button stays
    // valid DOM. Keyboard-activated via Enter/Space.
    return (
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        aria-label={label}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
        className={container}
      >
        {body}
      </div>
    );
  }

  return (
    <div ref={ref} className={container}>
      {body}
    </div>
  );
});
