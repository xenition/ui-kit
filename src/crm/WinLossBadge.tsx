import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives';
import { OUTCOME_META, toneBadgeTone, toneTextClass, type DealOutcome } from './internal';
export type { DealOutcome } from './internal';

export type WinLossSize = 'sm' | 'md';
export type WinLossVariant = 'badge' | 'inline';

export interface WinLossBadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Deal result. `won` reads success, `lost` reads danger — plus a glyph. */
  outcome: DealOutcome;
  /** `badge` (default) is a filled pill; `inline` is a bare glyph + label. */
  variant?: WinLossVariant;
  size?: WinLossSize;
  /** Hide the text label, leaving only the glyph (still a11y-labelled). */
  hideLabel?: boolean;
}

/**
 * Outcome badge for a deal — `won` / `lost` / `open` / `pending`. The result is
 * carried by a glyph **and** a word (never color alone): won `✓`, lost `✕`,
 * open `◔`, pending `⋯`. Won maps to the `text-success` token, lost to
 * `text-danger`. Use `badge` on cards and `inline` inside dense rows. Every
 * color is a `--xen-*` token class — no literals.
 */
export const WinLossBadge = React.forwardRef<HTMLSpanElement, WinLossBadgeProps>(
  function WinLossBadge({ outcome, variant = 'badge', size = 'md', hideLabel = false, className, ...rest }, ref) {
    const meta = OUTCOME_META[outcome];
    const label = `${meta.label} deal`;

    if (variant === 'inline') {
      const sizeClass = size === 'sm' ? 'text-xs' : 'text-sm';
      return (
        <span
          ref={ref}
          role="img"
          aria-label={label}
          className={cn('inline-flex items-center gap-1', toneTextClass(meta.tone), sizeClass, className)}
          {...rest}
        >
          <span aria-hidden="true">{meta.glyph}</span>
          {hideLabel ? null : <span className="font-semibold">{meta.label}</span>}
        </span>
      );
    }

    return (
      <Badge
        ref={ref}
        tone={toneBadgeTone(meta.tone)}
        role="img"
        aria-label={label}
        className={cn('align-middle', className)}
        {...rest}
      >
        <span aria-hidden="true">{meta.glyph}</span>
        {hideLabel ? null : <span>{meta.label}</span>}
      </Badge>
    );
  }
);
