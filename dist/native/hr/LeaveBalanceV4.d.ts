import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { LeaveType } from './internal';
export type LeaveBalanceV4Variant = 'default' | 'compact';
export interface LeaveBalanceV4Props {
    /** Which entitlement this is. Supplies the glyph and, unless overridden, the name. */
    type?: LeaveType;
    /** Name for the balance. Default: the leave type's own word. */
    label?: string;
    /** Days earned this period, before anything was taken. */
    accruedDays: number;
    /** Days already used. */
    takenDays: number;
    /** Days brought forward. Counts toward the entitlement. */
    carryoverDays?: number;
    /** Which period the balance covers, pre-formatted (e.g. `'2026'`). */
    periodLabel?: string;
    /** Density. `compact` drops the breakdown row. */
    variant?: LeaveBalanceV4Variant;
    /** Build a day count. Default `'12 days'` / `'1 day'`. */
    formatDays?: (days: number) => string;
    /** Caption for the accrued figure. Default `'Accrued'`. */
    accruedLabel?: string;
    /** Caption for the used figure. Default `'Taken'`. */
    takenLabel?: string;
    /** Caption for the available figure. Default `'Remaining'`. */
    remainingLabel?: string;
    /** Caption for the carried-forward figure. Default `'Carryover'`. */
    carryoverLabel?: string;
    /**
     * The word an over-drawn balance shows in place of a negative figure.
     * Default `'Over entitlement'`.
     */
    overdrawnLabel?: string;
    /** Tap handler for the balance. */
    onPress?: () => void;
    testID?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * **V4 leave balance** — a new component. There is no base to extend, so the
 * props are plain `LeaveBalanceV4Props`.
 *
 * ## Why it exists
 *
 * `LeaveRequest` asks the employee for a number of `days` and there is no
 * entitlement context anywhere in the module — not on the request, not on the
 * approval card, not in the directory. So the one number the requester needs
 * before deciding whether to ask for a fortnight ("how much do I actually
 * have?") is the one number the module could not draw, and the one an approver
 * has to open another system to check.
 *
 * ## What it does that the rest of the module did not
 *
 * 1. **The meter is a real meter, and it is a sibling.** The group carries
 *    `accessibilityRole="progressbar"` with a value, so a reader is told
 *    "Taken, 13 days of 25" rather than handed four loose numerals — and it
 *    sits **beside** the card's activation rather than under it, because a
 *    `progressbar` inside a `Pressable` has its value flattened away.
 * 2. **An over-drawn balance is a word.** Taken can exceed the entitlement —
 *    unpaid days, an advance, a correction — and the honest rendering of that
 *    is not a negative number in a field labelled "Remaining". Remaining floors
 *    at zero and the overage says
 *    {@link LeaveBalanceV4Props.overdrawnLabel}.
 * 3. **Every figure is validated.** A negative or non-finite accrual is bad
 *    data rather than a small entitlement.
 * 4. **The leave type is identity.** Glyph, word, neutral chip, from the same
 *    table `LeaveRequestV4` reads — and deliberately no tone: `sick` is not
 *    `danger` and `parental` is not `success`.
 * 5. **Every visible string is a prop**, and the day count goes through
 *    `pluralizeCount` rather than an appended `'s'`. That now includes the
 *    overage word, which used to be the one English string in the file a
 *    caller could not reach.
 * 6. **A balance with nothing to name draws nothing.** With neither `type` nor
 *    `label`, this used to invent an English heading of its own — "Leave
 *    balance" — and meter an entitlement nobody had said the name of. It
 *    returns `null` instead, as the web twin already did.
 */
export declare function LeaveBalanceV4({ type, label, accruedDays, takenDays, carryoverDays, periodLabel, variant, formatDays, accruedLabel, takenLabel, remainingLabel, carryoverLabel, overdrawnLabel, onPress, testID, style, }: LeaveBalanceV4Props): React.ReactElement | null;
//# sourceMappingURL=LeaveBalanceV4.d.ts.map