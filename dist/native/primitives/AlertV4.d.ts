import * as React from 'react';
import type { AlertProps, AlertTone, AlertVariant } from './Alert';
export type { AlertProps as AlertV4Props, AlertTone, AlertVariant };
/**
 * **V4 alert** — same props as {@link Alert}, a different design line.
 *
 * ## The colour IS the message
 *
 * `design.md` §35.4 is the whole brief here. An alert's red is not the alert
 * being styled red; it is the alert saying "this is dangerous". So V4 spends
 * exactly one colour decision on an alert — which tone — and refuses every
 * other one:
 *
 * - **No gradient.** Not even under a `depth` that has them. A tone that
 *   sweeps between two hues asks the reader which end was the meaning, and
 *   §35.11 keeps gradients for the hero and the one primary action anyway.
 * - **No shadow.** An alert is *in* the page, not above it. `elevation` would
 *   claim a layer the component does not occupy, and depth that lies about
 *   layer is decoration (§8).
 * - **`warn` is `warn`.** The base native alert routed `warn` to the `accent`
 *   token — a brand colour standing in for a caution, which is §35.4's exact
 *   prohibition, and which also disagreed with its own web twin. V4 uses the
 *   `warn` slot on both platforms.
 *
 * ## The tint owns its ground
 *
 * `subtle` is the default and the one people actually ship. The base painted it
 * `surface` with a coloured left rule; the web twin painted `bg-neutral-50`,
 * which is a different alert. V4 composites the tone into `surface`
 * **opaquely** at 10%, so the block carries its tone as a real colour — one
 * that does not change when the alert is dropped on a filled card, a glass
 * panel, or artwork, and one every label below can be measured against.
 *
 * The left rule survives, at full tone strength, because it is the fastest read
 * in the component: a 4px bar of colour at the start of a block is identified
 * before a single word is. It is held to 3:1, the bar WCAG sets for a non-text
 * boundary — pushing a rule to 4.5:1 would bleach the tone for no gain.
 *
 * Every piece of text is then re-measured with `ensureContrast` against the
 * fill this alert actually painted, rather than against the page it was
 * designed on.
 */
export declare function AlertV4({ tone, variant, title, onClose, icon, action, children, style, }: AlertProps): React.ReactElement;
//# sourceMappingURL=AlertV4.d.ts.map