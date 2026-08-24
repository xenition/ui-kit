import * as React from 'react';
import { Badge } from '../primitives';
import type { BadgeTone } from '../primitives';

/** Whether the behavior is positive, negative, or neutral. */
export type BehaviorTone = 'positive' | 'negative' | 'neutral';

interface ToneMeta {
  glyph: string;
  badge: BadgeTone;
  sign: string;
}

const TONE_META: Record<BehaviorTone, ToneMeta> = {
  positive: { glyph: '👍', badge: 'success', sign: '+' },
  negative: { glyph: '👎', badge: 'danger', sign: '−' },
  neutral: { glyph: '•', badge: 'neutral', sign: '' },
};

export interface BehaviorBadgeProps {
  /** Behavior label, e.g. "Shared toys" or "Interrupted". */
  label: string;
  /** Whether the behavior is positive, negative, or neutral. */
  tone?: BehaviorTone;
  /** Points awarded/deducted; rendered with a +/− sign. */
  points?: number;
  /** Explicit emoji/glyph (overrides the tone's default). */
  icon?: string;
  /** Badge size (kept for prop parity; the web {@link Badge} is single-size). */
  size?: 'sm' | 'md';
  /** Fires when the badge is activated. */
  onClick?: () => void;
}

/**
 * A compact behavior chip for logging conduct: an icon + label, optionally with
 * a signed point value. Positive/negative is conveyed by the glyph and the
 * numeric sign in addition to the {@link Badge} tone (never color alone). When
 * `onClick` is set the chip is a real `<button>`. Token-bound throughout — no
 * literal colors.
 */
export const BehaviorBadge = React.forwardRef<HTMLButtonElement | HTMLSpanElement, BehaviorBadgeProps>(
  function BehaviorBadge({ label, tone = 'neutral', points, icon, onClick }, ref) {
    const meta = TONE_META[tone] ?? TONE_META.neutral;
    const glyph = icon ?? meta.glyph;
    const pointsLabel = typeof points === 'number' ? ` (${meta.sign}${Math.abs(points)})` : '';
    const a11y = `${tone} behavior: ${label}${pointsLabel}`;
    const text = `${glyph} ${label}${pointsLabel}`;

    if (onClick) {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          data-xen-behavior-badge=""
          aria-label={a11y}
          onClick={() => onClick()}
          className="inline-flex rounded-full transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Badge tone={meta.badge}>{text}</Badge>
        </button>
      );
    }

    return (
      <Badge ref={ref as React.Ref<HTMLSpanElement>} data-xen-behavior-badge="" aria-label={a11y} tone={meta.badge}>
        {text}
      </Badge>
    );
  }
);
