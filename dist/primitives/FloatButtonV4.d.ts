import * as React from 'react';
import type { FloatButtonPlacement, FloatButtonProps } from './FloatButton';
export type { FloatButtonProps as FloatButtonV4Props, FloatButtonPlacement };
/**
 * **V4 floating action button** — the web twin of the native `FloatButtonV4`,
 * same props as {@link FloatButton}, a different design line.
 *
 * §35.11 asks that gradients stay rare and purposeful, and §5 asks every screen
 * for exactly one dominant action. A FAB is both of those things at once: it is
 * the single primary action, and it is literally floating above the content. If
 * a brand gradient and `elevation.action` are right anywhere in this kit, they
 * are right here — and nowhere else in the identity group has earned either.
 *
 * So:
 *
 * - **The fill is `gradient.brand`**, one legible pair per scheme, run through
 *   {@link gradientInk} so the label and the icon clear AA against **both**
 *   stops rather than against the one flat colour `on-primary` was measured on.
 *   A `depth: 'flat'` seed has already had its two stops collapsed to one
 *   colour by the compiler, so it lands on a solid `primary` FAB with no branch
 *   in this file.
 * - **The lift is `elevation.action`**, the seed's own decision, instead of
 *   Tailwind's fixed `shadow-lg` — which cannot know that a shadow on a dark
 *   page needs MORE opacity, not less.
 * - **The press is a press.** The base dipped opacity on hover and did nothing
 *   at all on click. V4 scales down and drops the shadow to half, so the button
 *   sits back down; under `prefers-reduced-motion` the transform goes and the
 *   shadow carries the feedback alone (§36.10).
 * - **The focus ring is the brand, not a ramp step.** `ring-primary-300` is a
 *   pale tint whose contrast against the page nobody measured; the outline is
 *   now `--xen-primary`, which the compiler resolves per scheme.
 * - **It clears the home indicator.** The anchor adds
 *   `env(safe-area-inset-bottom)`, which the native twin has always done
 *   through `useSafeAreaInsets` and the web twin never did.
 *
 * With no `XenitionUIProvider` above it there is no compiled theme, so it falls
 * back to the flat `bg-primary` look rather than guessing at a gradient it
 * cannot contrast-check.
 */
export declare const FloatButtonV4: React.ForwardRefExoticComponent<FloatButtonProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=FloatButtonV4.d.ts.map