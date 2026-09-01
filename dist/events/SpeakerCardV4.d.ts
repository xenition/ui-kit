import * as React from 'react';
import type { SpeakerCardProps } from './SpeakerCard';
export interface SpeakerCardV4Props extends SpeakerCardProps {
}
/**
 * **V4 speaker card** — the web twin of the native `SpeakerCardV4`, same props
 * as {@link SpeakerCard}.
 *
 * ## Four changes
 *
 * 1. **The card's activation is a real `<button>`.** The base was a `div` with
 *    `role="button"`, a `tabIndex` and a hand-written Enter/Space handler that
 *    ended in `e.preventDefault(); currentTarget.click()` — a synthesised click
 *    standing in for the one a real button dispatches for free.
 * 2. **The name carries the speaker.** `aria-label={name}` replaced the
 *    subtree, and `role="button"` makes a subtree presentational anyway — so
 *    the role, the company, the rating and every topic tag were unreachable to
 *    a screen reader. `spokenLine()` joins them.
 * 3. **`rating` is clamped before it reaches `Rating`.** A caller passing a
 *    0–10 score, or a `-1` from an unrated speaker, drew more or fewer than the
 *    five glyphs the component promises; `ratingParts()` bounds it and gives
 *    the stars the numeral a low-vision reader actually compares.
 * 4. **Press is a state layer and the tags are drawn the same way on both
 *    twins.** `hover:opacity-95` dims the card's own content, which is M3's
 *    *disabled* signal; the badges take the module's one `soft`/`sm` shape
 *    rather than this twin's solid `md` and native's soft `sm`.
 */
export declare const SpeakerCardV4: React.ForwardRefExoticComponent<SpeakerCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SpeakerCardV4.d.ts.map