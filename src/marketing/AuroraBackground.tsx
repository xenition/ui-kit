import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';

export type AuroraVariant = 'aurora' | 'mesh' | 'radial';
export type AuroraPattern = 'none' | 'dots' | 'grid';

export interface AuroraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Blob composition: drifting aurora, corner mesh, or a single radial glow. */
  variant?: AuroraVariant;
  /** Overlay an SVG noise/grain texture (inline feTurbulence data URI). */
  grain?: boolean;
  /** Overlay a subtle dot or grid pattern. */
  pattern?: AuroraPattern;
}

/** Ramp steps a blob may use — theme variables only, never literal colors. */
const BLOB_RAMPS = [
  'primary-400',
  'primary-500',
  'primary-600',
  'primary-700',
  'accent-400',
  'accent-500',
  'accent-600',
] as const;

type BlobRamp = (typeof BLOB_RAMPS)[number];

interface BlobSpec {
  /** `--xen-*` ramp variable feeding the blob's radial gradient. */
  ramp: BlobRamp;
  top: string;
  left: string;
  size: string;
  opacity: number;
  animation: string;
  duration: string;
}

const AURORA_BLOBS: readonly BlobSpec[] = [
  { ramp: 'primary-500', top: '-20%', left: '-10%', size: '55%', opacity: 0.45, animation: 'xen-aurora-a', duration: '26s' },
  { ramp: 'accent-400', top: '-10%', left: '55%', size: '50%', opacity: 0.35, animation: 'xen-aurora-b', duration: '32s' },
  { ramp: 'primary-700', top: '45%', left: '20%', size: '60%', opacity: 0.3, animation: 'xen-aurora-c', duration: '38s' },
  { ramp: 'accent-600', top: '55%', left: '65%', size: '45%', opacity: 0.3, animation: 'xen-aurora-b', duration: '29s' },
];

const MESH_BLOBS: readonly BlobSpec[] = [
  { ramp: 'primary-400', top: '-25%', left: '-15%', size: '70%', opacity: 0.4, animation: 'xen-aurora-c', duration: '40s' },
  { ramp: 'accent-500', top: '-20%', left: '60%', size: '65%', opacity: 0.35, animation: 'xen-aurora-a', duration: '34s' },
  { ramp: 'primary-600', top: '55%', left: '55%', size: '70%', opacity: 0.35, animation: 'xen-aurora-b', duration: '42s' },
  { ramp: 'accent-400', top: '60%', left: '-20%', size: '60%', opacity: 0.3, animation: 'xen-aurora-a', duration: '36s' },
];

const RADIAL_BLOBS: readonly BlobSpec[] = [
  { ramp: 'primary-600', top: '10%', left: '15%', size: '70%', opacity: 0.4, animation: 'xen-aurora-pulse', duration: '18s' },
  { ramp: 'accent-500', top: '25%', left: '30%', size: '40%', opacity: 0.3, animation: 'xen-aurora-pulse', duration: '24s' },
];

const BLOBS: Record<AuroraVariant, readonly BlobSpec[]> = {
  aurora: AURORA_BLOBS,
  mesh: MESH_BLOBS,
  radial: RADIAL_BLOBS,
};

/**
 * Inline SVG grain (feTurbulence) as a data URI — self-contained, no asset,
 * no colors (a monochrome noise rect blended at low opacity).
 */
const GRAIN_DATA_URI =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

/**
 * All color-bearing declarations live in this injected sheet and reference
 * `--xen-*` variables exclusively — the aurora restyles by theme seed alone,
 * and the kit's no-literal-colors rule stays greppable/testable in one place.
 * Inline styles on the elements carry geometry and timing only.
 */
const AURORA_CSS = `
@keyframes xen-aurora-a {
  0%, 100% { transform: translate3d(-6%, -4%, 0) scale(1); }
  50% { transform: translate3d(10%, 8%, 0) scale(1.15); }
}
@keyframes xen-aurora-b {
  0%, 100% { transform: translate3d(6%, 8%, 0) scale(1.1); }
  50% { transform: translate3d(-10%, -6%, 0) scale(0.95); }
}
@keyframes xen-aurora-c {
  0%, 100% { transform: translate3d(0, 6%, 0) scale(0.95) rotate(0deg); }
  50% { transform: translate3d(4%, -8%, 0) scale(1.2) rotate(12deg); }
}
@keyframes xen-aurora-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.18); }
}
[data-xen-aurora-blob] {
  position: absolute;
  aspect-ratio: 1 / 1;
  border-radius: 9999px;
  filter: blur(64px);
  will-change: transform;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}
${BLOB_RAMPS.map(
  (ramp) =>
    `[data-xen-aurora-blob="${ramp}"] { background-image: radial-gradient(circle closest-side, var(--xen-${ramp}), transparent); }`
).join('\n')}
[data-xen-aurora-pattern="dots"] {
  background-image: radial-gradient(var(--xen-on-surface) 1px, transparent 1px);
  background-size: 24px 24px;
  opacity: 0.07;
}
[data-xen-aurora-pattern="grid"] {
  background-image: linear-gradient(var(--xen-border) 1px, transparent 1px), linear-gradient(90deg, var(--xen-border) 1px, transparent 1px);
  background-size: 48px 48px;
  opacity: 0.35;
}
[data-xen-aurora-grain] {
  background-image: url("${GRAIN_DATA_URI}");
  background-repeat: repeat;
  opacity: 0.05;
  mix-blend-mode: overlay;
}
@media (prefers-reduced-motion: reduce) {
  [data-xen-aurora-blob] { animation: none !important; }
}
`;

/**
 * Animated layered gradient background: blurred radial "aurora" blobs built
 * from the theme's primary/accent ramp steps (400–700), drifting on slow CSS
 * keyframe paths, with optional grain and dot/grid pattern overlays.
 *
 * Shared machinery behind `GradientHero` and `CTABanner`; use it directly to
 * build custom striking sections. Position it inside a `relative
 * overflow-hidden` parent — it renders `absolute inset-0` and is
 * `aria-hidden` (purely decorative). Dark mode needs nothing special: the
 * ramp variables are the theme, so the blobs read correctly over either
 * surface.
 */
export const AuroraBackground = React.forwardRef<HTMLDivElement, AuroraBackgroundProps>(
  function AuroraBackground(
    { variant = 'aurora', grain = false, pattern = 'none', className, ...rest },
    ref
  ) {
    injectStyleOnce('xen-aurora-styles', AURORA_CSS);

    return (
      <div
        ref={ref}
        aria-hidden="true"
        data-xen-aurora={variant}
        className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
        {...rest}
      >
        {BLOBS[variant].map((blob, index) => (
          <div
            key={index}
            data-xen-aurora-blob={blob.ramp}
            style={{
              top: blob.top,
              left: blob.left,
              width: blob.size,
              opacity: blob.opacity,
              animationName: blob.animation,
              animationDuration: blob.duration,
            }}
          />
        ))}
        {pattern !== 'none' ? (
          <div data-xen-aurora-pattern={pattern} className="absolute inset-0" />
        ) : null}
        {grain ? <div data-xen-aurora-grain="" className="absolute inset-0" /> : null}
      </div>
    );
  }
);
