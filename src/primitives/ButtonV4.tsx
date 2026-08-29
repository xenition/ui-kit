import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from './cn';
import {
  gradientCss,
  gradientInk,
  shadowCss,
  useOptionalCompiledTheme,
} from './internal/v4-depth';
import type { ButtonProps, ButtonSize, ButtonTone, ButtonVariant } from './Button';
import { transitionCss, V4_MOTION } from './internal/v4-motion';

export type { ButtonProps as ButtonV4Props, ButtonSize, ButtonTone, ButtonVariant };

/**
 * Depth lives in this sheet because `box-shadow`, `background-image` and the
 * `[data-theme="dark"]` switch cannot be expressed as utility classes bound to
 * a token. Every colour in it is a custom property — either a `--xen-*` token
 * or a `--xen-v4-*` the component computed from the compiled theme — so the
 * kit's no-literal-colours rule holds.
 */
const BUTTON_V4_CSS = `
[data-xen-v4-btn] {
  transition: ${transitionCss(['box-shadow', 'background-color', 'border-color'])},
    ${transitionCss(['transform'], V4_MOTION.quick)};
}
[data-xen-v4-btn]:focus-visible {
  outline: 2px solid var(--xen-ring);
  outline-offset: 2px;
}
[data-xen-v4-btn]:active { transform: scale(0.985); }
[data-xen-v4-btn][data-depth] { box-shadow: var(--xen-v4-shadow-l, none); }
[data-theme="dark"] [data-xen-v4-btn][data-depth] { box-shadow: var(--xen-v4-shadow-d, none); }
[data-xen-v4-btn][data-depth]:active { box-shadow: var(--xen-v4-shadow-held-l, none); }
[data-theme="dark"] [data-xen-v4-btn][data-depth]:active { box-shadow: var(--xen-v4-shadow-held-d, none); }
[data-xen-v4-btn][data-depth="action"] {
  background-image: var(--xen-v4-image-l, none);
  color: var(--xen-v4-on-l, var(--xen-on-primary));
}
[data-theme="dark"] [data-xen-v4-btn][data-depth="action"] {
  background-image: var(--xen-v4-image-d, none);
  color: var(--xen-v4-on-d, var(--xen-on-primary));
}
@media (prefers-reduced-motion: reduce) {
  [data-xen-v4-btn] { transition: none; }
  [data-xen-v4-btn]:active { transform: none; }
}
`;

/**
 * Per-tone token references. `default`/`primary` share the primary slot.
 *
 * There is no `ring` here any more. A focus indicator is an accessibility
 * affordance, not a decoration, and it should look identical on every control
 * a keyboard can reach — so it comes off `--xen-ring`, the one slot, exactly as
 * shadcn/ui's `--ring` does. A per-tone ring meant that tabbing across a row of
 * buttons changed the shape of the focus signal for no reason the user could
 * act on.
 */
const TONE: Record<ButtonTone, { fill: string; text: string; mix: string }> = {
  default: {
    fill: 'bg-primary text-on-primary',
    text: 'text-primary-text',
    mix: 'var(--xen-primary)',
  },
  primary: {
    fill: 'bg-primary text-on-primary',
    text: 'text-primary-text',
    mix: 'var(--xen-primary)',
  },
  danger: {
    fill: 'bg-danger text-on-danger',
    text: 'text-danger-text',
    mix: 'var(--xen-danger)',
  },
  success: {
    fill: 'bg-success text-on-success',
    text: 'text-success-text',
    mix: 'var(--xen-success)',
  },
};

/**
 * Heights composed from the spacing scale, not chosen: `md` and `lg` clear the
 * 44px touch target, and the horizontal padding widens with the height so the
 * label never crowds the edge.
 */
const SIZE: Record<ButtonSize, string> = {
  sm: 'min-h-[calc(var(--xen-space-xl)_+_var(--xen-space-xs))] px-md text-sm',
  md: 'min-h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] px-lg text-base',
  lg: 'min-h-[calc(var(--xen-space-2xl)_+_var(--xen-space-sm))] px-xl text-lg',
};

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
export const ButtonV4 = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function ButtonV4(
    {
      variant = 'primary',
      size = 'md',
      tone = 'default',
      className,
      style,
      type = 'button',
      href,
      target,
      rel,
      ...rest
    },
    ref
  ) {
    injectStyleOnce('xen-v4-button-styles', BUTTON_V4_CSS);
    const theme = useOptionalCompiledTheme();
    const t = TONE[tone];

    // The one place a gradient is allowed: the brand-toned primary action.
    const brandAction = variant === 'primary' && (tone === 'default' || tone === 'primary');

    let depth: 'action' | 'card' | undefined;
    let color: string;
    switch (variant) {
      case 'primary':
        // A gradient primary paints its label from the sheet (it has to clear
        // both stops); a semantic primary keeps the plain on-fill pair.
        color = brandAction ? 'bg-primary' : t.fill;
        depth = 'action';
        break;
      case 'danger':
        color = 'bg-danger text-on-danger';
        depth = 'action';
        break;
      case 'secondary':
        color = cn('bg-surface border border-border', t.text);
        break;
      case 'ghost':
        color = cn('bg-transparent', tone === 'default' ? 'text-on-surface' : t.text);
        break;
      case 'outline':
        color = cn(
          'bg-transparent border border-border',
          tone === 'default' ? 'text-on-surface' : t.text
        );
        break;
      case 'soft':
        color = cn(`bg-[color-mix(in_srgb,${t.mix}_12%,transparent)]`, t.text);
        break;
      case 'link':
        color = cn('bg-transparent underline underline-offset-4', t.text);
        break;
      case 'elevated':
        color = cn(
          'bg-surface border border-border',
          tone === 'default' ? 'text-on-surface' : t.text
        );
        depth = 'card';
        break;
    }

    const vars: Record<string, string> = {};
    if (theme !== null && depth !== undefined) {
      const level = depth === 'action' ? 'action' : 'card';
      vars['--xen-v4-shadow-l'] = shadowCss(theme.lightElevation[level]);
      vars['--xen-v4-shadow-d'] = shadowCss(theme.darkElevation[level]);
      vars['--xen-v4-shadow-held-l'] = shadowCss(theme.lightElevation[level], 0.5);
      vars['--xen-v4-shadow-held-d'] = shadowCss(theme.darkElevation[level], 0.5);
    }
    if (theme !== null && brandAction) {
      const extremes = {
        darkest: theme.ramps.neutral[950],
        lightest: theme.ramps.neutral[50],
      };
      // One legible pair per scheme; the provider stamps `data-theme` on a
      // wrapper rather than putting the scheme in context, so both go down and
      // the sheet picks.
      const light = gradientInk(theme.lightGradient.brand, theme.light.onPrimary, extremes);
      const dark = gradientInk(theme.darkGradient.brand, theme.dark.onPrimary, extremes);
      vars['--xen-v4-image-l'] = gradientCss(
        theme.lightGradient.brand.angle,
        light.from,
        light.to
      );
      vars['--xen-v4-image-d'] = gradientCss(theme.darkGradient.brand.angle, dark.from, dark.to);
      vars['--xen-v4-on-l'] = light.ink;
      vars['--xen-v4-on-d'] = dark.ink;
    }

    const classes = cn(
      'inline-flex items-center justify-center gap-sm font-body font-semibold',
      'rounded-[var(--xen-radius-md)]',
      'focus-visible:outline-none',
      'disabled:pointer-events-none disabled:opacity-[0.38]',
      color,
      SIZE[size],
      className
    );
    const attrs = {
      'data-xen-v4-btn': '',
      'data-depth': depth,
      className: classes,
      style: { ...vars, ...style } as React.CSSProperties,
    };

    if (href !== undefined) {
      // Anchor form. `rest` carries button-typed DOM props; the DOM shape is
      // identical at runtime, so cast for the spread. `type` is dropped.
      return (
        <a
          ref={ref as React.Ref<never>}
          href={href}
          target={target}
          rel={rel}
          {...attrs}
          {...(rest as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        />
      );
    }

    return <button ref={ref as React.Ref<never>} type={type} {...attrs} {...rest} />;
  }
);
