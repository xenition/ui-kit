import * as React from 'react';
import type { CountdownBadgeProps } from './CountdownBadge';
export interface CountdownBadgeV4Props extends CountdownBadgeProps {
    /**
     * The singular and plural unit words the countdown is announced with.
     * Default `day` / `days`, `hour` / `hours`, `minute` / `minutes`.
     */
    unitLabels?: {
        day?: string;
        days?: string;
        hour?: string;
        hours?: string;
        minute?: string;
        minutes?: string;
    };
    /** Shown when there is nothing to count down to. Default `'Date to be announced'`. */
    unknownLabel?: string;
}
/**
 * **V4 countdown badge** — same props as {@link CountdownBadge} plus
 * `unitLabels` and `unknownLabel`.
 *
 * ## Four changes
 *
 * 1. **It stops announcing "Started" when it was given nothing at all.** With
 *    neither `remainingMs` nor `target` the base fell through to `ms = 0`, and
 *    zero reads as elapsed — so a badge on an event with no date confidently
 *    told everyone it had already begun. `countdownParts()` reports
 *    `known: false` for that case and the badge says `unknownLabel` instead.
 * 2. **The announcement is pluralised, and it lands.** It read "1 days 1 hours
 *    1 minutes", on a `View` with no role, where the label is ignored anyway.
 *    `countdownSentence()` supplies the words and the badge is a `timer`.
 * 3. **The elapsed chip stops inking `onSurface` on a `border` fill** — a
 *    hairline token spent as a background, with no contrast promise behind the
 *    text on it. Ground and ink now come from the shared tone pair.
 * 4. **The figures are tabular**, so a countdown ticking from `09` to `10`
 *    does not shuffle the tiles sideways once a minute.
 */
export declare function CountdownBadgeV4({ target, remainingMs, now, label, elapsedLabel, unitLabels, unknownLabel, variant, tone, style, }: CountdownBadgeV4Props): React.ReactElement;
//# sourceMappingURL=CountdownBadgeV4.d.ts.map