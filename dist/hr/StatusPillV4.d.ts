import * as React from 'react';
import type { StatusPillProps } from './StatusPill';
export interface StatusPillV4Props extends StatusPillProps {
    /**
     * Announced instead of the pill's own word. Default: `meta.label`.
     *
     * Deliberately **not** an `aria-label` on the pill — a `<span>` with no role
     * is `generic`, ARIA forbids naming a generic element, and that dropped
     * label is change 1 below. The override is drawn as visually-hidden text and
     * the visible word is hidden from the reader, so what is announced is real
     * content on both paths.
     */
    accessibilityLabel?: string;
    /**
     * Hide the pill from the screen reader.
     *
     * For the common case where the pill sits inside a row whose accessible name
     * already carries the status — announcing "Denied" twice in a row is worse
     * than announcing it once. Default `false`.
     */
    decorative?: boolean;
    /** Test hook. Every native `hr` component had one; no web one did. */
    testID?: string;
}
/**
 * **V4 status pill** — the web twin of the native `StatusPillV4`, same props as
 * {@link StatusPill} plus `accessibilityLabel`, `decorative` and `testID`.
 *
 * ## Four changes
 *
 * 1. **The word is read, not the label.** The pill put `aria-label` on a bare
 *    `<span>`. A `<span>` with no role is `generic`, and ARIA forbids naming a
 *    generic element — every browser drops the label. So the pill announced
 *    whatever its text happened to be, and the label the author wrote was
 *    never spoken by anything. The glyph is now `aria-hidden` and the word is
 *    real text, which is what the reader gets either way and is now what the
 *    author is looking at.
 * 2. **The word is inked with an ink slot.** `soft` and `inline` drew the
 *    label with `TONE_TEXT_CLASS` — `text-success`, `text-danger`,
 *    `text-muted`. Those are fill tokens; `muted` in particular is a
 *    decorative ramp step with no contrast promise, and "Cancelled",
 *    "Draft" and "Offline" were all drawn in it. Every tone now resolves to
 *    its `*-text` slot.
 * 3. **`soft` is a tint of its own tone, not `bg-neutral-100`.** A ramp step
 *    mirrors under `[data-theme="dark"]`, so the chip was a pale plate punched
 *    into a dark page. It is now the tone mixed 10% into the card — the same
 *    ground the native twin mixes, so a pending pill is one colour on two
 *    platforms.
 * 4. **The glyph scales with the word.** Native froze the glyph with
 *    `allowFontScaling={false}`, so at 200% Dynamic Type "Approved" grew to
 *    24pt beside a 12pt "✓" that no longer looked attached to it. Neither twin
 *    pins the glyph now: both halves take the pill's own text size.
 */
export declare const StatusPillV4: React.ForwardRefExoticComponent<StatusPillV4Props & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=StatusPillV4.d.ts.map