import * as React from 'react';
import { cn } from './cn';
import { EYEBROW_TRACKING_CLASS } from './internal/identity-v4';
import type { EyebrowProps, EyebrowTone } from './Eyebrow';

export type { EyebrowProps as EyebrowV4Props, EyebrowTone };

/**
 * The **text** form of each tone, not the fill.
 *
 * `text-primary` and `text-accent` resolve to the colours you paint a button
 * with; the compiler guarantees `on-primary` reads on `primary`, and guarantees
 * nothing about `primary` reading on `surface`. The `-text` slots are the same
 * hue walked in lightness until they clear AA there — built for this exact
 * case, and documented as such in the Tailwind preset.
 */
const TONE_CLASS: Record<EyebrowTone, string> = {
  primary: 'text-primary-text',
  accent: 'text-accent-text',
  muted: 'text-muted-text',
};

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
export const EyebrowV4 = React.forwardRef<HTMLParagraphElement, EyebrowProps>(function EyebrowV4(
  { tone = 'accent', rule = false, align = 'start', className, children, ...rest },
  ref
) {
  // A frame, not a second voice — and `spacing.lg` wide, so the tick belongs to
  // the same scale as the gap beside it.
  const tick = (
    <span aria-hidden="true" className="inline-block h-px w-lg shrink-0 bg-border" />
  );

  return (
    <p
      ref={ref}
      data-xen-v4-eyebrow={tone}
      className={cn(
        'flex items-center gap-xs font-heading text-xs font-bold uppercase',
        // Caps at 12px lose the word-shape a reader scans by; tracking is the
        // repair, and it is the same ratio the native twin uses.
        EYEBROW_TRACKING_CLASS,
        align === 'center' && 'justify-center',
        TONE_CLASS[tone],
        className
      )}
      {...rest}
    >
      {rule ? tick : null}
      {children}
      {rule ? tick : null}
    </p>
  );
});
