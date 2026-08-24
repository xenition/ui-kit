import * as React from 'react';
import { cn } from '../primitives/cn';

export type BeforeAfterVariant = 'split' | 'toggle';

export interface BeforeAfterProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** "Before" image URL. */
  beforeUrl?: string;
  /** "After" image URL. */
  afterUrl?: string;
  /**
   * Split position 0–100 (percent of width showing the "after" image). Clamped.
   * In `split` mode a step control nudges it; ignored in `toggle` mode.
   */
  position?: number;
  /** How the two images are compared. `split` overlays; `toggle` swaps. */
  variant?: BeforeAfterVariant;
  /** Fixed height of the compare area in px (default 220). */
  height?: number;
  /** Labels for the two sides. */
  beforeLabel?: string;
  afterLabel?: string;
  /** Fires with the new split position when the divider is nudged. */
  onPositionChange?: (position: number) => void;
}

const clamp = (n: number): number => Math.max(0, Math.min(100, n));

const Tag = ({ label, side }: { label: string; side: 'left' | 'right' }): React.ReactElement => (
  <span
    className={cn(
      'absolute bottom-[var(--xen-space-sm)] rounded-[var(--xen-radius-sm)] bg-on-surface px-[var(--xen-space-sm)] py-0.5 text-xs font-bold text-surface opacity-80',
      side === 'left' ? 'left-[var(--xen-space-sm)]' : 'right-[var(--xen-space-sm)]'
    )}
  >
    {label}
  </span>
);

/**
 * A before/after image comparison built from plain styled `div`s + `img` (no
 * gesture/slider library). `variant="split"` overlays the "after" image clipped
 * to `position`% width with a divider and −/+ nudge buttons; `variant="toggle"`
 * swaps between the two full images on click. Missing images render a
 * token-tinted placeholder. Token-only colors — dimensions come from inline
 * px/percent, never literal colors.
 */
export const BeforeAfter = React.forwardRef<HTMLDivElement, BeforeAfterProps>(
  function BeforeAfter(
    {
      beforeUrl,
      afterUrl,
      position = 50,
      variant = 'split',
      height = 220,
      beforeLabel = 'Before',
      afterLabel = 'After',
      onPositionChange,
      className,
      ...rest
    },
    ref
  ) {
    const [showAfter, setShowAfter] = React.useState(false);
    const pos = clamp(position);

    const placeholder = (label: string): React.ReactElement => (
      <span className="flex h-full w-full items-center justify-center bg-neutral-100 text-sm text-muted">
        {label}
      </span>
    );

    if (variant === 'toggle') {
      const label = showAfter ? afterLabel : beforeLabel;
      const url = showAfter ? afterUrl : beforeUrl;
      return (
        <button
          ref={ref as React.Ref<never>}
          type="button"
          data-xen-before-after="toggle"
          aria-label={`Showing ${label}. Activate to compare.`}
          onClick={() => setShowAfter((v) => !v)}
          style={{ height }}
          className={cn(
            'relative block w-full overflow-hidden rounded-[var(--xen-radius-lg)] border border-border',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
            className
          )}
          {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {url ? (
            <img src={url} alt={label} className="h-full w-full object-cover" />
          ) : (
            placeholder(label)
          )}
          <Tag label={label} side="left" />
        </button>
      );
    }

    return (
      <div
        ref={ref}
        data-xen-before-after="split"
        aria-label={`Before and after comparison, ${pos}% after`}
        style={{ height }}
        className={cn(
          'relative w-full overflow-hidden rounded-[var(--xen-radius-lg)] border border-border',
          className
        )}
        {...rest}
      >
        {/* Base = before */}
        {beforeUrl ? (
          <img src={beforeUrl} alt={beforeLabel} className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <span className="absolute inset-0">{placeholder(beforeLabel)}</span>
        )}
        {/* Overlay = after, clipped to pos% width */}
        <span
          className="absolute inset-y-0 left-0 block overflow-hidden"
          style={{ width: `${pos}%` }}
        >
          {afterUrl ? (
            <img src={afterUrl} alt={afterLabel} className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            placeholder(afterLabel)
          )}
        </span>
        {/* Divider */}
        <span
          aria-hidden="true"
          className="absolute inset-y-0 w-0.5 bg-surface"
          style={{ left: `${pos}%` }}
        />
        <Tag label={beforeLabel} side="right" />
        <Tag label={afterLabel} side="left" />

        {onPositionChange ? (
          <span className="absolute right-[var(--xen-space-sm)] top-[var(--xen-space-sm)] flex gap-[var(--xen-space-xs)]">
            <NudgeButton label="Show less after" glyph="−" onClick={() => onPositionChange(clamp(pos - 10))} />
            <NudgeButton label="Show more after" glyph="+" onClick={() => onPositionChange(clamp(pos + 10))} />
          </span>
        ) : null}
      </div>
    );
  }
);

function NudgeButton({
  label,
  glyph,
  onClick,
}: {
  label: string;
  glyph: string;
  onClick: () => void;
}): React.ReactElement {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-7 w-7 items-center justify-center rounded-full bg-on-surface text-base font-bold text-surface opacity-80 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
    >
      {glyph}
    </button>
  );
}
