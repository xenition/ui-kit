import * as React from 'react';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { IconV4 } from '../primitives/IconV4';
import type { BadgeSize } from '../primitives/Badge';
import type { IconName } from '../primitives/icon-names';
import { STATUS_ANATOMY, STATUS_PREFIX, statusLabel } from './internal/status-v4';
import type { StatusAnatomy, StatusInk, StatusTone } from './internal/status-v4';
import type { OrderStatus, StatusBadgeProps } from './StatusBadge';

export type { OrderStatus, StatusAnatomy, StatusInk, StatusTone };
export { STATUS_ANATOMY };

export interface StatusBadgeV4Props extends StatusBadgeProps {
  /**
   * Override the glyph for a status. The default per status is in
   * {@link STATUS_ANATOMY} and is almost always the right one; this exists for
   * a store whose "fulfilled" genuinely means something else.
   */
  iconName?: IconName;
  /** Badge size. Default `'md'`, matching `BadgeV4`. */
  size?: BadgeSize;
}

/**
 * **V4 status badge** — the web twin of the native `StatusBadgeV4`, same props
 * as {@link StatusBadge} plus two, a different design line.
 *
 * Three changes.
 *
 * 1. **An icon and a word, never colour alone.** The status → tone / glyph /
 *    ink table is {@link STATUS_ANATOMY}, in `internal/status-v4.ts` so both
 *    twins read one copy of it; the argument for the rule is written out
 *    there. This is the whole reason the file exists.
 * 2. **It composes `BadgeV4`.** The base re-rolled a pill: its own radius, its
 *    own padding, its own `py-0.5` (a literal, and the only one in the file),
 *    its own tone table. All four are decisions `BadgeV4` already makes —
 *    including the one the base got wrong, that a badge's shape should follow
 *    the seed rather than defaulting to a capsule, so a `sharp` brand gets
 *    square tags instead of pills. §10.5: a V4 composite composes V4 children.
 * 3. **It says what it is.** "Paid" on its own is a word floating in a list.
 *    The badge now announces "Order status: Paid" through a visually-hidden
 *    prefix — the `LabelV4` spelling — rather than an `aria-label` on a bare
 *    `<span>`, which has no role for a name to attach to and is honoured
 *    inconsistently across screen readers. The glyph stays decorative, so
 *    nothing reads out "label" or "clock face" before the status.
 *
 * The badge variant is deliberately **not** a prop. `soft` and `outline` label
 * themselves with the contrast-corrected `*Text` slots, which the ten
 * `IconColor` slots do not include — a status badge offering a variant whose
 * glyph could not be tinted to match its own label would be an option that is
 * always the wrong one (§7: subtraction before addition).
 */
export const StatusBadgeV4 = React.forwardRef<HTMLSpanElement, StatusBadgeV4Props>(
  function StatusBadgeV4({ status, iconName, size = 'md', children, className, ...rest }, ref) {
    const anatomy = STATUS_ANATOMY[status];
    const label = children ?? statusLabel(status);

    return (
      <BadgeV4
        ref={ref}
        data-xen-status-badge={status}
        data-xen-v4-status-badge={status}
        tone={anatomy.tone}
        variant="solid"
        size={size}
        className={cn('whitespace-nowrap', className)}
        {...rest}
      >
        {/*
          Read before the word, never instead of it. `IconV4` with no
          `aria-label` is decorative, so the announcement is
          "Order status: Paid" and not "check mark, Order status: Paid".
        */}
        <IconV4 name={iconName ?? anatomy.icon} size="xs" color={anatomy.ink} />
        <span className="sr-only">{STATUS_PREFIX}</span>
        {label}
      </BadgeV4>
    );
  }
);
