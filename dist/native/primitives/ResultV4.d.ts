import * as React from 'react';
import type { ResultProps, ResultStatus } from './Result';
export type { ResultProps as ResultV4Props, ResultStatus };
/**
 * **V4 result** — same props as {@link Result}, a different design line.
 *
 * ## §15 says the action is the component
 *
 * "Empty states should help users progress." Not decorate the absence of
 * content — *progress*. The base drew a 30px glyph at the top, then a title,
 * then a description, then a hand-rolled `Pressable` at the bottom, all four at
 * roughly equal weight. That is a screen where the illustration is the loudest
 * thing and the way out is the quietest.
 *
 * V4 inverts it:
 *
 * - **The action is `ButtonV4`**, at `lg`, not a local Pressable with its own
 *   padding. It is the kit's real primary action, with the kit's touch target
 *   and press feedback, and §35.11's one licensed gradient lands here — on the
 *   one primary action of the screen — rather than being spread over a status
 *   card. The way out of a dead end should look like the most solid thing on it.
 * - **The glyph shrinks** from `3xl` to `xl` and moves inside a tinted disc.
 *   §8 lists "icon inside a coloured rounded square for every row" among the
 *   tells of generic AI UI, and the escape from that rule is *for every row* —
 *   this is one mark at the centre of one full-screen state, and it is a circle,
 *   which reads as a status seal rather than as an app icon.
 * - **The description gets a measure.** Capped at eight of the largest spacing
 *   step, so a sentence of explanation stays a column instead of stretching the
 *   width of a tablet (§33 — a line too long to scan is not read).
 *
 * ## The tone is only ever a status
 *
 * `success` takes `success`, `error` takes `danger` — and `empty` and `404`
 * take **no semantic colour at all**. An empty list is not a warning and a
 * missing page is not a failure; tinting either would spend a meaning §35.4
 * reserves for real ones. Their disc is a neutral composited from `onSurface`,
 * which is a shade, not a signal.
 *
 * Every glyph and label is re-measured against the disc or page it sits on,
 * because `successText` is guaranteed against `surface` and a tinted disc is
 * not `surface`.
 */
export declare function ResultV4({ status, title, description, actionLabel, onAction, icon, style, }: ResultProps): React.ReactElement;
//# sourceMappingURL=ResultV4.d.ts.map