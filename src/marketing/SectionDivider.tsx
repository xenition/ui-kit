import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { Parallax } from '../motion/Parallax';
import { cn } from '../primitives/cn';
import { OrnamentRule, OrnamentShape, OrnamentTone } from './OrnamentRule';

export type SectionDividerVariant = 'hairline' | 'ornament' | 'fade';

export interface SectionDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * `hairline` — a 1px primary→accent gradient rule (the SaaS band divider).
   * `ornament` — delegates to `OrnamentRule` (the restaurant diamond rule).
   * `fade`     — a tall gradient that melts the section into the surface.
   */
  variant?: SectionDividerVariant;
  /**
   * Optional parallax speed (±0.5, see `Parallax`). The divider drifts
   * slightly against scroll; reduced motion disables it automatically.
   */
  parallax?: number;
  /** Ornament shape when `variant="ornament"` (default `diamond`). */
  ornament?: OrnamentShape;
  /** Token tone when `variant="ornament"` (default `accent`). */
  tone?: OrnamentTone;
}

const DIVIDER_CSS = `
[data-xen-section-divider="hairline"] {
  height: 1px;
  background-image: linear-gradient(90deg, transparent, color-mix(in srgb, var(--xen-primary-500) 55%, transparent), color-mix(in srgb, var(--xen-accent-400) 55%, transparent), transparent);
}
[data-xen-section-divider="fade"] {
  height: var(--xen-space-2xl);
  background-image: linear-gradient(to bottom, transparent, var(--xen-surface));
}
`;

/**
 * Section separators distilled from all three templates, optionally
 * parallax-capable: wrap any variant with a small counter-scroll drift by
 * passing `parallax`. Decorative (`role="separator"`), token-only, and
 * motion-free unless parallax is requested (which the motion layer already
 * guards for reduced motion and SSR).
 */
export const SectionDivider = React.forwardRef<HTMLDivElement, SectionDividerProps>(
  function SectionDivider(
    { variant = 'hairline', parallax, ornament = 'diamond', tone = 'accent', className, ...rest },
    ref
  ) {
    injectStyleOnce('xen-section-divider-styles', DIVIDER_CSS);

    const divider =
      variant === 'ornament' ? (
        <OrnamentRule ref={ref} ornament={ornament} tone={tone} className={className} {...rest} />
      ) : (
        <div
          ref={ref}
          role="separator"
          aria-orientation="horizontal"
          data-xen-section-divider={variant}
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
