import * as React from 'react';
import type { UploadProps } from './Upload';
export type { UploadProps as UploadV4Props };
/**
 * What this dropzone will accept, in a sentence — or `null` when there is
 * nothing worth saying.
 *
 * §15 asks an empty state to answer "what belongs here". `accept` and
 * `multiple` are the only two facts the component actually knows, so they are
 * the only two it claims. When it knows neither it says nothing rather than
 * filling the space with "Any file type", which is noise dressed as help
 * (§7 — reduce visual noise).
 */
export declare function acceptHint(accept?: string, multiple?: boolean): string | null;
/**
 * **V4 upload** — the web twin of `UploadV4`, the same props as
 * {@link Upload}, a different design line.
 *
 * ## The empty state IS the component
 *
 * An upload control has no content of its own. Whatever it looks like before a
 * file exists is the whole thing, which makes §15 the entire brief: an empty
 * state has to say **what belongs here** and **what to do next**.
 *
 * The base says neither loudly. It renders one line of `text-sm text-muted-text`
 * inside a dashed box — the quietest type in the kit, used for the only thing
 * on screen. So the hierarchy is inverted here (§6):
 *
 *   - **A mark.** A brand-washed disc with an upward glyph, painted through
 *     `[data-xen-v4-wash]`.
 *   - **A headline that is not muted.** The caller's `label` at `text-base` in
 *     `text-on-surface`, semibold. It is the loudest thing in the box because
 *     it is the only thing in the box.
 *   - **A line about what fits**, derived from `accept` and `multiple` — the
 *     only two facts the component has. When it has neither it says nothing.
 *
 * ## The dark-mode bug it fixes
 *
 * The base paints its drag-over state `bg-primary-50`. That is a ramp step, and
 * the ramps carry the light orientation in BOTH schemes — so on a dark page,
 * the moment you drag a file over the zone it flashes near-white. V4 uses the
 * same `color-mix` wash the range band uses: brand over `--xen-surface`,
 * correct in both schemes.
 *
 * ## The zone
 *
 * Three tap targets tall, so it reads as a place rather than a button, with the
 * dashed edge that is the universal "drop here" convention (§31). Dragging over
 * it washes the whole ground and turns the edge `primary`, so the zone
 * acknowledges the file rather than only its text doing so. No shadow: a drop
 * target is a hole, not a raised object, and depth here would say the opposite
 * of what it means.
 */
export declare function UploadV4({ onFiles, accept, multiple, label, className, }: UploadProps): React.ReactElement;
//# sourceMappingURL=UploadV4.d.ts.map