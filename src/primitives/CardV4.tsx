import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from './cn';
import { shadowCss, useOptionalCompiledTheme } from './internal/v4-depth';
import type { CardPadding, CardProps, CardRadius, CardVariant } from './Card';

export type { CardProps as CardV4Props, CardPadding, CardRadius, CardVariant };

/**
 * Depth lives in this sheet because `box-shadow`, `backdrop-filter` and the
 * `[data-theme="dark"]` switch cannot be expressed as utility classes bound to
 * a token. Every colour is a custom property — a `--xen-*` token, or a
 * `--xen-v4-*` this component computed from the compiled theme — and the
 * fallbacks are `color-mix` over tokens, the same recipe `GlassPanel` uses.
 */
const CARD_V4_CSS = `
[data-xen-v4-card][data-raised="true"] { box-shadow: var(--xen-v4-shadow-l, none); }
[data-theme="dark"] [data-xen-v4-card][data-raised="true"] { box-shadow: var(--xen-v4-shadow-d, none); }
[data-xen-v4-card][data-glass="true"] {
  background-color: var(--xen-v4-tint-l, color-mix(in srgb, var(--xen-surface) 72%, transparent));
  border-color: var(--xen-v4-edge-l, color-mix(in srgb, var(--xen-border) 60%, transparent));
  -webkit-backdrop-filter: blur(var(--xen-v4-blur, 24px));
  backdrop-filter: blur(var(--xen-v4-blur, 24px));
}
[data-theme="dark"] [data-xen-v4-card][data-glass="true"] {
  background-color: var(--xen-v4-tint-d, color-mix(in srgb, var(--xen-surface) 72%, transparent));
  border-color: var(--xen-v4-edge-d, color-mix(in srgb, var(--xen-border) 60%, transparent));
}
`;

const PADDING: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-[var(--xen-space-sm)]',
  md: 'p-[var(--xen-space-md)]',
  lg: 'p-[var(--xen-space-lg)]',
};

const RADIUS: Record<CardRadius, string> = {
  sm: 'rounded-[var(--xen-radius-sm)]',
  md: 'rounded-[var(--xen-radius-md)]',
  lg: 'rounded-[var(--xen-radius-lg)]',
  full: 'rounded-[var(--xen-radius-full)]',
};

/**
 * **V4 card** — the web twin of the native `CardV4`, same props as
 * {@link Card}, a different design line.
 *
 * Three deliberate changes, and nothing else:
 *
 * 1. **A real shadow.** `elevation.card` replaces Tailwind's `shadow-sm` /
 *    `shadow-md`, so depth is a seed decision made once — and a shadow on a
 *    dark page gets MORE opacity, not less, which a fixed utility class cannot
 *    express.
 * 2. **A hairline that survives.** A raised surface keeps its border in V4;
 *    dropping it reads fine on a tinted page and dissolves on a same-colour
 *    one. `border-border` is re-derived per scheme by the provider, so the
 *    edge holds in dark as well as light.
 * 3. **Glass, when the seed asked for it.** `depth: 'glass'` swaps the fill
 *    and the edge for the translucent pair and turns on a real
 *    `backdrop-filter`. This is the one place a V4 component reads `depth`
 *    directly: the compiler neutralises gradients and shadows for a flat seed,
 *    but it always builds the glass pair — a component that used it
 *    unconditionally would frost an app that asked for a flat utility, which
 *    is the "glassmorphism without purpose" `design.md` §8 bans.
 *
 * No card gains a gradient. §35.11 keeps that for the hero and the one primary
 * action, and a kit that tints every card is the kit §8 is describing.
 */
export const CardV4 = React.forwardRef<HTMLDivElement, CardProps>(function CardV4(
  { className, style, variant = 'outlined', padding, radius, ...rest },
  ref
) {
  injectStyleOnce('xen-v4-card-styles', CARD_V4_CSS);
  const theme = useOptionalCompiledTheme();

  const glassy = theme?.depth === 'glass';
  // `flat` is the only variant that gives up its edge; a surface meant to read
  // as a container keeps one (§11 — containers must earn their existence).
  const bordered = variant !== 'flat';
  const raised = variant === 'elevated' || variant === 'interactive';

  const vars: Record<string, string> = {};
  if (theme !== null && raised) {
    vars['--xen-v4-shadow-l'] = shadowCss(theme.lightElevation.card);
    vars['--xen-v4-shadow-d'] = shadowCss(theme.darkElevation.card);
  }
  if (theme !== null && glassy) {
    vars['--xen-v4-tint-l'] = theme.lightGlass.tint;
    vars['--xen-v4-tint-d'] = theme.darkGlass.tint;
    vars['--xen-v4-edge-l'] = theme.lightGlass.border;
    vars['--xen-v4-edge-d'] = theme.darkGlass.border;
    vars['--xen-v4-blur'] = `${theme.lightGlass.blur}px`;
  }

  return (
    <div
      ref={ref}
      data-xen-v4-card=""
      data-raised={raised ? 'true' : 'false'}
      data-glass={glassy ? 'true' : 'false'}
      className={cn(
        'bg-surface text-on-surface',
        bordered ? 'border border-border' : null,
        RADIUS[radius ?? 'lg'],
        PADDING[padding ?? 'lg'],
        className
      )}
      style={{ ...vars, ...style } as React.CSSProperties}
      {...rest}
    />
  );
});
