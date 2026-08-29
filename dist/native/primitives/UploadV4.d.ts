import * as React from 'react';
import type { UploadFile, UploadProps } from './Upload';
export type { UploadProps as UploadV4Props, UploadFile };
/**
 * What this dropzone will accept, in a sentence — or `null` when there is
 * nothing worth saying.
 *
 * §15 asks an empty state to answer "what belongs here". `accept` and
 * `multiple` are the only two facts the component actually knows, so they are
 * the only two it claims. When it knows neither, it says nothing rather than
 * filling the space with "Any file type", which is noise dressed as help
 * (§7 — reduce visual noise).
 */
export declare function acceptHint(accept?: string, multiple?: boolean): string | null;
/**
 * **V4 upload** — the same props as {@link Upload}, a different design line.
 *
 * ## The empty state IS the component
 *
 * An upload control has no content of its own. Whatever it looks like before a
 * file exists is the whole thing, which makes §15 the entire brief: an empty
 * state has to say **what belongs here**, and **what to do next**.
 *
 * The base says neither loudly. It renders one line of `muted` `sm` text inside
 * a dashed box — the quietest type in the kit, used for the only thing on
 * screen. So the hierarchy is inverted here (§6):
 *
 *   - **A mark.** A brand-washed disc with an upward glyph. `brandWash` is the
 *     brand composited ONCE against the surface into an opaque colour — not
 *     `ramps.primary[50]`, which keeps the light orientation in both schemes
 *     and would be a near-white blob on a dark page.
 *   - **A headline that is not muted.** The caller's `label` at `base` in
 *     `onSurface`, semibold. It is the loudest thing in the box because it is
 *     the only thing in the box.
 *   - **A line about what fits**, derived from `accept` and `multiple` — the
 *     only two facts the component actually has. When it has neither it says
 *     nothing rather than padding the space (§7).
 *   - **A word while it works.** Pressing hands off to the host's `pickFiles`,
 *     which opens a system sheet and can take a moment; the zone says
 *     "Opening…" rather than sitting inert (§37 — make system status visible).
 *
 * ## The zone
 *
 * Three tap targets tall, so it reads as a place rather than a button, with the
 * dashed edge the universal "drop here" convention (§31). Pressing washes the
 * ground and turns the edge `primary`, so the whole zone acknowledges the touch
 * rather than only the text inside it. No shadow: a drop target is a hole, not
 * a raised object, and depth here would say the opposite of what it means.
 */
export declare function UploadV4({ onFiles, pickFiles, accept, multiple, label, invalid, disabled, accessibilityLabel, style, }: UploadProps): React.ReactElement;
//# sourceMappingURL=UploadV4.d.ts.map