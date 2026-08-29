import * as React from 'react';
import type { ResultProps, ResultStatus } from './Result';
export type { ResultProps as ResultV4Props, ResultStatus };
/**
 * **V4 result** — the web twin of the native `ResultV4`, same props as
 * {@link Result}, a different design line.
 *
 * ## §15 says the action is the component
 *
 * "Empty states should help users progress." Not decorate the absence of
 * content — *progress*. The base drew a `text-3xl` glyph at the top, then a
 * title, then a description, then a hand-rolled `<button>` at the bottom, all
 * four at roughly equal weight. That is a screen where the illustration is the
 * loudest thing and the way out is the quietest.
 *
 * V4 inverts it:
 *
 * - **The action is `ButtonV4`**, at `lg`, not a local button with its own
 *   padding and its own focus ring. It is the kit's real primary action, and
 *   §35.11's one licensed gradient lands here — on the one primary action of
 *   the screen — rather than being spread over a status card. The way out of a
 *   dead end should look like the most solid thing on it.
 * - **The glyph shrinks** from `3xl` to `xl` and moves inside a tinted disc.
 *   §8 lists "icon inside a coloured rounded square for every row" among the
 *   tells of generic AI UI, and the escape from that rule is *for every row* —
 *   this is one mark at the centre of one full-screen state, and it is a circle,
 *   which reads as a status seal rather than as an app icon.
 * - **The description gets a measure.** Capped at eight of the largest spacing
 *   step, so a sentence of explanation stays a column instead of stretching the
 *   width of a monitor (§33 — a line too long to scan is not read).
 *
 * The mark uses the compiler's contrast-safe `*-text` form rather than the raw
 * fill, which has no promise against the tint behind it. The native twin
 * re-measures the same pairing with `ensureContrast`.
 */
export declare const ResultV4: React.ForwardRefExoticComponent<ResultProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ResultV4.d.ts.map