import * as React from 'react';
export interface SchoolCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** School name (e.g. `'Lincoln Elementary'`). The card's headline. */
    name: string;
    /**
     * Rating on a 0–10 scale. Shown as a big numeral inside a score-tinted disc
     * (high ≥7 → success, mid ≥4 → warn, low <4 → danger). Clamped to `0–10`.
     */
    rating: number;
    /** Optional education level (e.g. `'Elementary'`, `'High'`). Shown beside the distance. */
    level?: string;
    /** Optional distance label (e.g. `'0.4 mi'`). Shown beside the level. */
    distanceLabel?: string;
    /** Optional grade span (e.g. `'K–5'`, `'9–12'`). Shown as a muted footnote. */
    gradesLabel?: string;
    /**
     * Optional click handler. When set the whole card becomes a
     * keyboard-activatable button (Enter/Space) with an accessible summary label.
     */
    onPress?: React.MouseEventHandler<HTMLDivElement>;
}
/**
 * SchoolCard — **V4** "listing" design. A nearby-school rating card: the 0–10
 * rating in a score-tinted disc (high → success, mid → warn, low → danger) on
 * the left, the school name as the headline, the level + distance beneath, and
 * an optional grades footnote. The score is legible by BOTH its big numeral and
 * its color. Editorial, rounded elevated card, 8-pt spacing. Presentational
 * only — all colors from `--xen-*` token classes, no literals; dark-mode safe.
 * When `onPress` is set the card is a keyboard-activatable button.
 */
export declare const SchoolCard: React.ForwardRefExoticComponent<SchoolCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SchoolCard.d.ts.map