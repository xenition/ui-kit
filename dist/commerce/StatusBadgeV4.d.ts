import * as React from 'react';
import type { BadgeSize } from '../primitives/Badge';
import type { IconName } from '../primitives/icon-names';
import { STATUS_ANATOMY } from './internal/status-v4';
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
export declare const StatusBadgeV4: React.ForwardRefExoticComponent<StatusBadgeV4Props & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=StatusBadgeV4.d.ts.map