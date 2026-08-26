import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from './cn';
import {
  gradientCss,
  gradientInk,
  shadowCss,
  useOptionalCompiledTheme,
} from './internal/v4-depth';
import type { FloatButtonPlacement, FloatButtonProps } from './FloatButton';
import { transitionCss, V4_MOTION } from './internal/v4-motion';

export type { FloatButtonProps as FloatButtonV4Props, FloatButtonPlacement };

/**
 * `box-shadow`, `background-image`, the `[data-theme="dark"]` switch and the
 * safe-area inset are none of them expressible as a utility class bound to a
 * token. Every colour here is a custom property — a `--xen-*` token, or a
 * `--xen-v4-*` the component computed from the compiled theme.
 */
const FLOAT_BUTTON_V4_CSS = `
[data-xen-v4-fab] {
  /* Clear of the home indicator on a mobile browser, and unchanged on a desktop. */
  bottom: calc(var(--xen-space-xl) + env(safe-area-inset-bottom, 0px));
  background-image: var(--xen-v4-image-l, none);
  color: var(--xen-v4-on-l, var(--xen-on-primary));
  box-shadow: var(--xen-v4-shadow-l, none);
  transition: ${transitionCss(['box-shadow'])}, ${transitionCss(['transform'], V4_MOTION.quick)};
}
[data-theme="dark"] [data-xen-v4-fab] {
  background-image: var(--xen-v4-image-d, none);
  color: var(--xen-v4-on-d, var(--xen-on-primary));
  box-shadow: var(--xen-v4-shadow-d, none);
}
[data-xen-v4-fab]:active { transform: scale(0.96); box-shadow: var(--xen-v4-shadow-held-l, none); }
[data-theme="dark"] [data-xen-v4-fab]:active { box-shadow: var(--xen-v4-shadow-held-d, none); }
[data-xen-v4-fab]:focus-visible {
  outline: 2px solid var(--xen-ring);
  outline-offset: 3px;
}
@media (prefers-reduced-motion: reduce) {
  [data-xen-v4-fab] { transition: none; }
  [data-xen-v4-fab]:active { transform: none; }
}
`;

/** Anchored on the spacing scale, not on Tailwind's `right-6`. */
const ANCHOR: Record<FloatButtonPlacement, string> = {
  'bottom-right': 'right-lg',
  'bottom-left': 'left-lg',
  'bottom-center': 'left-1/2 -translate-x-1/2',
};

/** 56px from the scale — comfortably past the 44 a finger needs. */
const SIZE = 'h-[calc(var(--xen-space-2xl)_+_var(--xen-space-sm))]';
const WIDTH = 'w-[calc(var(--xen-space-2xl)_+_var(--xen-space-sm))]';

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
export const FloatButtonV4 = React.forwardRef<HTMLButtonElement, FloatButtonProps>(
  function FloatButtonV4(
    { icon, label, placement = 'bottom-right', type = 'button', className, style, disabled, ...rest },
    ref
  ) {
    injectStyleOnce('xen-v4-float-button-styles', FLOAT_BUTTON_V4_CSS);
    const theme = useOptionalCompiledTheme();

    const vars: Record<string, string> = {};
    if (theme !== null) {
      vars['--xen-v4-shadow-l'] = shadowCss(theme.lightElevation.action);
      vars['--xen-v4-shadow-d'] = shadowCss(theme.darkElevation.action);
      vars['--xen-v4-shadow-held-l'] = shadowCss(theme.lightElevation.action, 0.5);
      vars['--xen-v4-shadow-held-d'] = shadowCss(theme.darkElevation.action, 0.5);

      const extremes = { darkest: theme.ramps.neutral[950], lightest: theme.ramps.neutral[50] };
      // One legible pair per scheme; the provider stamps `data-theme` on a
      // wrapper rather than putting the scheme in context, so both go down and
      // the sheet picks.
      const light = gradientInk(theme.lightGradient.brand, theme.light.onPrimary, extremes);
      const dark = gradientInk(theme.darkGradient.brand, theme.dark.onPrimary, extremes);
      vars['--xen-v4-image-l'] = gradientCss(theme.lightGradient.brand.angle, light.from, light.to);
      vars['--xen-v4-image-d'] = gradientCss(theme.darkGradient.brand.angle, dark.from, dark.to);
      vars['--xen-v4-on-l'] = light.ink;
      vars['--xen-v4-on-d'] = dark.ink;
    }

    return (
      <button
        ref={ref}
        data-xen-v4-fab=""
        type={type}
        disabled={disabled}
        aria-label={rest['aria-label'] ?? label}
        className={cn(
          'fixed z-40 inline-flex items-center justify-center gap-xs',
          'rounded-[var(--xen-radius-full)] bg-primary font-body font-semibold',
          'focus-visible:outline-none',
          'disabled:pointer-events-none disabled:opacity-[0.38]',
          SIZE,
          label ? 'px-lg' : WIDTH,
          ANCHOR[placement],
          className
        )}
        style={{ ...vars, ...style } as React.CSSProperties}
        {...rest}
      >
        {icon != null ? <span className="inline-flex shrink-0">{icon}</span> : null}
        {label ? <span>{label}</span> : null}
      </button>
    );
  }
);
