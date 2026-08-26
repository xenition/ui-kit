import * as React from 'react';
import type { ButtonProps, ButtonSize, ButtonTone, ButtonVariant } from './Button';
export type { ButtonProps as ButtonV4Props, ButtonSize, ButtonTone, ButtonVariant };
/**
 * **V4 button** — the web twin of the native `ButtonV4`, same props as
 * {@link Button}, a different design line.
 *
 * What makes it premium is restraint. Exactly one thing carries the brand
 * gradient: `variant="primary"` at the default tone — the single dominant
 * action `design.md` §5 asks every screen to have. Everything else is flat
 * with a crisp hairline, because §8 lists "gradients on every button" as the
 * first tell of generic AI UI and §35.11 asks that gradients stay rare and
 * purposeful. A `danger` or `success` primary stays solid: §35.4 — semantic
 * colours are not brand colours, and a destructive action wearing the brand
 * sweep reads as a promotion.
 *
 * Depth comes from `elevation.action` and a press that genuinely depresses
 * (scale plus a shadow that sits back down), both read straight off the
 * compiled theme — so a `depth: 'flat'` seed produces a flat button with no
 * branch in this file, because the tokens are already inert. The transform is
 * dropped under `prefers-reduced-motion` (§36.10), leaving the shadow change
 * to carry the feedback on its own.
 *
 * With no `XenitionUIProvider` above it there is no compiled theme — and no
 * `--xen-*` variables either — so it falls back to the flat token look rather
 * than guessing at a gradient it cannot contrast-check.
 */
export declare const ButtonV4: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement | HTMLAnchorElement>>;
//# sourceMappingURL=ButtonV4.d.ts.map