import * as React from 'react';
import { Badge, type BadgeProps, type BadgeTone } from '../primitives';
import type { Condition } from './internal';

export type ConditionBadgeSize = 'sm' | 'md';
export type ConditionBadgeVariant = 'solid' | 'soft' | 'outline';

export interface ConditionBadgeProps extends Omit<BadgeProps, 'tone' | 'children'> {
  /** Item condition grade. */
  condition: Condition;
  /**
   * Visual weight — retained for parity with the native chip. The web `Badge`
   * ships a single soft-pill treatment, so this is currently informational.
   * Default `soft`.
   */
  variant?: ConditionBadgeVariant;
  /** Size scale — retained for native parity; the web `Badge` is a fixed size. Default `md`. */
  size?: ConditionBadgeSize;
  /** Override the visible label (defaults to a humanized condition). */
  label?: string;
}

// The web `Badge` has no `accent` tone; `refurb` maps to `primary` (mirrors the
// "Icon has no accent → primary" web rule).
const CONDITION_TONE: Record<Condition, BadgeTone> = {
  new: 'success',
  'like-new': 'primary',
  used: 'neutral',
  refurb: 'primary',
};

const CONDITION_LABEL: Record<Condition, string> = {
  new: 'New',
  'like-new': 'Like New',
  used: 'Used',
  refurb: 'Refurbished',
};

/**
 * A themed condition chip for a marketplace listing — `new` / `like-new` /
 * `used` / `refurb`. A thin, presentational wrapper over the shared `Badge` that
 * maps each grade to a semantic tone and a readable label, so condition is
 * conveyed by text (never color alone). Token-only colors via `Badge`.
 */
export const ConditionBadge = React.forwardRef<HTMLSpanElement, ConditionBadgeProps>(
  function ConditionBadge({ condition, variant: _variant = 'soft', size: _size = 'md', label, ...rest }, ref) {
    const tone = CONDITION_TONE[condition] ?? 'neutral';
    const text = label ?? CONDITION_LABEL[condition] ?? String(condition);
    return (
      <Badge ref={ref} tone={tone} {...rest}>
        {text}
      </Badge>
    );
  }
);
