import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { Parallax } from '../motion/Parallax';
import { cn } from '../primitives/cn';
import { OrnamentRuleV4 } from './OrnamentRuleV4';
import type { OrnamentShape, OrnamentTone } from './OrnamentRule';
import type { SectionDividerProps, SectionDividerVariant } from './SectionDivider';

export type { SectionDividerVariant };

/** Drop-in for {@link SectionDividerProps} — same props, the V4 "showcase" design. */
export type SectionDividerV4Props = SectionDividerProps;

/**
 * V4 re-skin sheet for the two gradient variants. `hairline` gets a fuller
 * primary→accent gradient with a confident core before it fades; `fade` gets a
 * taller, smoother two-stop melt into the surface. Every color is a `--xen-*`
 * token.
 */
const DIVIDER_V4_CSS = `
[data-xen-section-divider-v4="hairline"] {
  height: 1px;
  background-image: linear-gradient(90deg, transparent, color-mix(in srgb, var(--xen-primary-500) 70%, transparent) 32%, color-mix(in srgb, var(--xen-accent-400) 80%, transparent) 68%, transparent);
}
[data-xen-section-divider-v4="fade"] {
  height: var(--xen-space-2xl);
  background-image: linear-gradient(to bottom, transparent, color-mix(in srgb, var(--xen-surface) 60%, transparent) 55%, var(--xen-surface));
}
`;

/**
 * SectionDivider — **V4** "showcase" design (web parity of the native V4).
 *
 * Same effect engine as the base {@link SectionDivider}: three variants —
 * `hairline` (a 1px primary→accent gradient rule), `ornament` (delegates to the
 * ornament rule), and `fade` (a tall gradient melting the section into the
 * surface) — optionally wrapped in `Parallax` for a small counter-scroll drift.
 * The V4 is a *refined* take: **cleaner shape dividers per variant** — a fuller
 * primary→accent hairline with a confident core, a taller smoother fade melt,
 * and the `ornament` variant delegating to `OrnamentRuleV4` so its sharpened
 * rule/ornament carry through. Every variant/ornament/tone value is honored.
 *
 * **Reduced motion:** motion only exists on the `parallax` path, and that drift
 * is handled by the shared motion layer (`Parallax`), which already disables
 * itself under `prefers-reduced-motion` and on the server — exactly as the base
 * relies on. The V4 adds no new motion. Token-only colors, no literals.
 */
export const SectionDividerV4 = React.forwardRef<HTMLDivElement, SectionDividerV4Props>(
  function SectionDividerV4(
    {
      variant = 'hairline',
      parallax,
      ornament = 'diamond',
      tone = 'accent',
      className,
      ...rest
    }: SectionDividerV4Props,
    ref
  ) {
    injectStyleOnce('xen-section-divider-v4-styles', DIVIDER_V4_CSS);

    const shape: OrnamentShape = ornament;
    const toneValue: OrnamentTone = tone;

    const divider =
      variant === 'ornament' ? (
        <OrnamentRuleV4 ref={ref} ornament={shape} tone={toneValue} className={className} {...rest} />
      ) : (
        <div
          ref={ref}
          role="separator"
          aria-orientation="horizontal"
          data-xen-section-divider-v4={variant}
          className={cn(className)}
          {...rest}
        />
      );

    return parallax !== undefined && parallax !== 0 ? (
      <Parallax speed={parallax} aria-hidden="true">
        {divider}
      </Parallax>
    ) : (
      divider
    );
  }
);
