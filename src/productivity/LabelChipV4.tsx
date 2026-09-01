import * as React from 'react';
import { cn } from '../primitives/cn';
import type { LabelChipProps, LabelTone } from './LabelChip';

/** Drop-in for {@link LabelChipProps} — same props, the V4 "flow" design. */
export type LabelChipV4Props = LabelChipProps;

/** Maps a tone to its soft-tint background + accent-dot token classes. */
const TONE: Record<LabelTone, { tint: string; dot: string }> = {
  neutral: { tint: 'bg-muted/10', dot: 'bg-muted' },
  primary: { tint: 'bg-primary/[0.10]', dot: 'bg-primary' },
  success: { tint: 'bg-success/[0.10]', dot: 'bg-success' },
  warn: { tint: 'bg-warn/[0.10]', dot: 'bg-warn' },
  danger: { tint: 'bg-danger/[0.10]', dot: 'bg-danger' },
};

/**
 * LabelChip — **V4** "flow" design (web parity of the native V4). The
 * focused-workspace take on a label: a rounded, **soft-tint** chip carrying a
 * small tone-colored dot and its text, with an optional remove (×). Calm and
 * borderless — the tone lives in a gentle wash rather than an outline, and the
 * single accent dot does the work. Same props/behavior as {@link LabelChipProps}
 * (`tone` dot, `onClick`, `onRemove`); all colors from `--xen-*` token classes
 * (no literals).
 */
export const LabelChipV4 = React.forwardRef<HTMLDivElement, LabelChipV4Props>(function LabelChipV4(
  { label, tone = 'neutral', onRemove, onClick, className },
  ref
) {
  const t = TONE[tone] ?? TONE.neutral;

  const container = cn(
    'inline-flex items-center gap-1.5 self-start rounded-full px-2.5 py-1',
    t.tint,
    onClick && 'cursor-pointer transition-opacity hover:opacity-70',
    className
  );

  const body = (
    <>
      <span aria-hidden className={cn('inline-block h-2 w-2 rounded-full', t.dot)} />
      <span className="text-sm font-medium text-on-surface">{label}</span>
      {onRemove ? (
        <button
          type="button"
          aria-label={`Remove ${label}`}
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-0.5 text-sm font-semibold text-muted transition-opacity hover:opacity-100"
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
