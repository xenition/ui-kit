import * as React from 'react';
import type { LeadRowProps } from './LeadRow';
export interface LeadRowV4Props extends LeadRowProps {
    /** Unit for the score, used in the accessible name. Default `'Score'`. */
    scoreLabel?: string;
    /** How the score is spelled. Default the bare clamped number. */
    formatScore?: (score: number) => string;
}
/**
 * **V4 lead row** — same props as {@link LeadRow} plus `scoreLabel` and
 * `formatScore`.
 *
 * ## Seven changes
 *
 * 1. **The score badge stops being coloured by temperature.** It took its tone
 *    from `TEMPERATURE_META`, so a lead scored **5** rendered a `danger` badge
 *    purely because the lead was `hot` — the colour said nothing about the
 *    number inside it, and a status colour was spent on identity. The badge is
 *    `neutral`; temperature keeps its own glyph and word.
 * 2. **The score carries a unit.** A bare `72` announced as the number
 *    seventy-two and nothing else; `scoreLabel` names it.
 * 3. **`selected` is announced and marked by more than a border colour** — it
 *    gains the leading accent bar the native docblock has always claimed, plus
 *    `accessibilityState`.
 * 4. **The row is only a button when it is interactive.** The base set
 *    `accessibilityRole="button"` unconditionally with `disabled={!onPress}`,
 *    so a plain row announced as a **disabled button**.
 * 5. **The temperature column fits its own label.** "Warm" at 12px does not
 *    fit 28px and nothing truncated it; the column is a full tap width and the
 *    label may wrap.
 * 6. **The glyph scales with Dynamic Type.** It carried
 *    `allowFontScaling={false}` while the word beside it scaled, so the pair
 *    came apart at larger text sizes.
 * 7. **Money is tabular**, plus rules A, B and C.
 *
 * **Renders nothing without a `name`.**
 */
export declare function LeadRowV4({ name, company, temperature, valueCents, currency, score, avatarUrl, selected, scoreLabel, formatScore, onPress, testID, style, }: LeadRowV4Props): React.ReactElement | null;
//# sourceMappingURL=LeadRowV4.d.ts.map