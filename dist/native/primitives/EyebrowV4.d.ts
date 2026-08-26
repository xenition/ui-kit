import * as React from 'react';
import type { EyebrowProps, EyebrowTone } from './Eyebrow';
export type { EyebrowProps as EyebrowV4Props, EyebrowTone };
/**
 * **V4 eyebrow** — same props as {@link Eyebrow}, a different design line.
 *
 * The eyebrow is the smallest type in the kit — 12px, bold, uppercase — which
 * makes it the last place that can afford a colour nobody measured. The base
 * one used `colors.primary` and `colors.accent` **as ink**. Those are fill
 * slots: the compiler promises `onPrimary` reads on `primary`, and promises
 * nothing about `primary` reading on `surface`. `muted` is `neutral[600]` with
 * no promise either. V4 takes the contrast-safe text forms the compiler already
 * builds for this exact case, and walks `muted` to AA as well.
 *
 * Two more things:
 *
 * - **The twins agree on tracking.** Native tracked at `2px` (0.167em at the
 *   `xs` step) and the web at `0.22em`, so the same eyebrow was a different
 *   width on a phone and on a laptop. Both now derive from one ratio.
 * - **The flanking rule stops competing.** Drawn in the label's own colour and
 *   weight, a tick either side reads as part of the word. In V4 it drops to the
 *   `border` hairline: it frames the label instead of shouting alongside it
 *   (§6 — hierarchy before styling; §7 — subtraction before addition).
 *
 * There is no gradient and no container. An eyebrow is typography doing the
 * work a card would otherwise be asked to do (§10), and §35.11 keeps the brand
 * sweep for the hero and the one primary action.
 */
export declare function EyebrowV4({ tone, rule, align, style, children, }: EyebrowProps): React.ReactElement;
//# sourceMappingURL=EyebrowV4.d.ts.map