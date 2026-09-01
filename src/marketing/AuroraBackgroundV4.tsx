import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import {
  AuroraBackground,
  type AuroraBackgroundProps,
  type AuroraPattern,
  type AuroraVariant,
} from './AuroraBackground';

/** Drop-in for {@link AuroraBackgroundProps} — same props, the V4 "showcase" design. */
export type AuroraBackgroundV4Props = AuroraBackgroundProps;

/**
 * AuroraBackground — **V4** "showcase" design (web parity of the native V4).
 *
 * Same effect engine as the base {@link AuroraBackground}: blurred, slowly
 * drifting radial-gradient blobs built from the theme's `primary`/`accent`
 * ramp steps, with optional grain and dot/grid pattern overlays. The V4 is a
 * *refined* take — richer **multi-stop** primary→accent blobs (three-stop
 * radial gradients instead of the base's single-stop-to-transparent) for a
 * smoother, more confident falloff, a slightly deeper blur, and a warmer
 * `screen` blend so the aurora reads bolder while staying subtle enough to sit
 * behind content. Every `variant`/`grain`/`pattern` value is honored exactly.
 *
 * The base `AuroraBackground` is rendered underneath as the geometry/animation
 * layer (so its keyframes, blob placement, grain and pattern all still apply
 * and stay in one place); the V4 sheet only re-tints those same blobs. Every
 * color is a `--xen-*` token — no literals.
 *
 * **Reduced motion:** inherited from the base, which disables the blob
 * keyframes under `prefers-reduced-motion: reduce`; the V4 adds no new motion,
 * so it degrades to the same static token-only rest state.
 */

/** Ramp steps a V4 blob may re-tint — theme variables only, never literals. */
const BLOB_RAMPS = [
  'primary-400',
  'primary-500',
  'primary-600',
  'primary-700',
  'accent-400',
  'accent-500',
  'accent-600',
] as const;

/**
 * V4 re-tint sheet. Targets the *same* `[data-xen-aurora-blob]` elements the
 * base renders, but paints each with a richer multi-stop radial gradient and a
 * softer, wider falloff — so the base owns geometry + timing + reduced-motion,
 * and this owns only the refined look. Color-bearing declarations reference
 * `--xen-*` variables exclusively.
 */
const AURORA_V4_CSS = `
[data-xen-aurora-v4] [data-xen-aurora-blob] {
  filter: blur(72px);
  mix-blend-mode: screen;
}
${BLOB_RAMPS.map(
  (ramp) =>
    `[data-xen-aurora-v4] [data-xen-aurora-blob="${ramp}"] { background-image: radial-gradient(circle closest-side, var(--xen-${ramp}) 0%, color-mix(in srgb, var(--xen-${ramp}) 55%, transparent) 46%, transparent 78%); }`
).join('\n')}
`;

export const AuroraBackgroundV4 = React.forwardRef<HTMLDivElement, AuroraBackgroundV4Props>(
  function AuroraBackgroundV4(
    { variant = 'aurora', grain = false, pattern = 'none', className, ...rest }: AuroraBackgroundV4Props,
    ref
  ) {
    injectStyleOnce('xen-aurora-v4-styles', AURORA_V4_CSS);

    // Keep referenced so the exported prop unions stay live for tooling/tests.
    const v: AuroraVariant = variant;
    const p: AuroraPattern = pattern;

    return (
      <AuroraBackground
        ref={ref}
        data-xen-aurora-v4=""
        variant={v}
        grain={grain}
        pattern={p}
        className={cn(className)}
        {...rest}
      />
    );
  }
);
