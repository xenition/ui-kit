import * as React from 'react';
import type { EyebrowProps, EyebrowTone } from './Eyebrow';
export type { EyebrowProps as EyebrowV4Props, EyebrowTone };
/**
 * **V4 eyebrow** — the web twin of the native `EyebrowV4`, same props as
 * {@link Eyebrow}, a different design line.
 *
 * The eyebrow is the smallest type in the kit — 12px, bold, uppercase — which
 * makes it the last place that can afford a colour nobody measured. The base
 * one used `text-primary` and `text-accent` **as ink**. Those are fill slots:
 * the preset says so in as many words ("`text-primary` still resolves to the
 * fill … new work colouring text with a brand colour wants these"), and the
 * `-text` slots are the ones the compiler walked to AA on `surface`.
 *
 * Two more things:
 *
 * - **The twins agree on tracking.** The web tracked at `0.22em` and native at
 *   `2px` (0.167em at the `xs` step), so the same eyebrow was a different width
 *   on a laptop and on a phone. Both now derive from one ratio.
 * - **The flanking rule stops competing.** Drawn with `bg-current`, a tick
 *   either side is the label's own colour and weight and reads as part of the
 *   word. In V4 it drops to the `border` hairline: it frames the label instead
 *   of shouting alongside it (§6 — hierarchy before styling; §7 — subtraction
 *   before addition).
 *
 * There is no gradient and no container. An eyebrow is typography doing the
 * work a card would otherwise be asked to do (§10), and §35.11 keeps the brand
 * sweep for the hero and the one primary action.
 */
export declare const EyebrowV4: React.ForwardRefExoticComponent<EyebrowProps & React.RefAttributes<HTMLParagraphElement>>;
//# sourceMappingURL=EyebrowV4.d.ts.map