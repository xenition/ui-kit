import * as React from 'react';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { V4_STATE } from '../primitives/internal/v4-state';
import { flowGroundVars, type OnboardingAccentV4 } from './internal/flow-v4';
import type { FeatureLockCardProps } from './FeatureLockCard';

export interface FeatureLockCardV4Props extends FeatureLockCardProps {
  /** Which brand slot the badge and CTA answer in. Default `'primary'`. */
  accent?: OnboardingAccentV4;
  /**
   * What the user would get — up to three short outcome lines under the
   * description.
   *
   * The base named the feature and stopped, which makes a teaser a *label on a
   * locked door*. §27-28 asks a gate to sell.
   */
  benefits?: string[];
  /**
   * A dimmed glimpse of the gated feature, above the copy.
   *
   * The most persuasive thing a gate can show is the thing itself. Pass a
   * chart, a screenshot, a sample row — the kit ships no artwork.
   */
  preview?: React.ReactNode;
  /** A price or terms hint under the CTA. `xs`, muted, centred. */
  priceHint?: string;
}

/** At most this many benefit lines. A gate that lists six is a feature page. */
const MAX_BENEFITS = 3;

/**
 * **V4 locked-feature teaser** — the web twin of the native
 * `FeatureLockCardV4`, same props as {@link FeatureLockCard} plus `accent`,
 * `benefits`, `preview` and `priceHint`.
 *
 * Still drawn as a §8 feature row, so a teaser met mid-app reads as the same
 * object as the rows on the paywall it leads to.
 *
 * ## Four changes
 *
 * 1. **The badge tint is a `color-mix()`, not `bg-primary-50`.** The ramp step
 *    carries the light orientation, so on a dark page the base's badge was a
 *    near-white circle. A mix of `surface` and `primary` inverts with the
 *    scheme because both sides of it already have.
 * 2. **It sells** — `benefits` and `priceHint`.
 * 3. **The card is `CardV4`'s raised ground**, which is what makes a teaser
 *    inside a scrolling page read as an object rather than a region.
 * 4. **The glyph takes the contrast-corrected brand slot.**
 *
 * `inline` still collapses to a compact borderless row, and drops the preview
 * and the price hint with it. **Renders nothing without a `title`** (§4.5).
 */
export const FeatureLockCardV4 = React.forwardRef<HTMLDivElement, FeatureLockCardV4Props>(
  function FeatureLockCardV4(
    {
      title,
      description,
      icon = '🔒',
      planLabel = 'Pro',
      unlockLabel = 'Unlock',
      onUnlock,
      variant = 'card',
      accent = 'primary',
      benefits,
      preview,
      priceHint,
      className,
      style,
      ...rest
    },
    ref
  ) {
    if (!title) return null;

    const lines = benefits?.filter(Boolean).slice(0, MAX_BENEFITS) ?? [];
    const vars = { ...flowGroundVars('plain', accent), ...style };

    const row = (
      <>
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--flow-badge)] text-[var(--flow-ink)]"
          aria-label="Locked"
        >
          <IconV4 glyph={icon} size="lg" />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-xs">
          <div className="flex flex-wrap items-center gap-sm">
            <TextV4 size="base" weight="semibold" tone="onSurface">
              {title}
            </TextV4>
            {planLabel ? (
              <BadgeV4 tone={accent === 'accent' ? 'accent' : 'primary'} size="sm">
                {planLabel}
              </BadgeV4>
            ) : null}
          </div>
          {description ? (
            <TextV4 size="sm" tone="mutedText">
              {description}
            </TextV4>
          ) : null}
        </div>
      </>
    );

    if (variant === 'inline') {
      return (
        <div
          ref={ref}
          style={vars}
          className={cn('flex items-center gap-md', className)}
          {...rest}
        >
          {row}
          <ButtonV4 variant="secondary" size="sm" onClick={onUnlock} aria-label={unlockLabel}>
            {unlockLabel}
          </ButtonV4>
        </div>
      );
    }

    return (
      <CardV4 ref={ref} style={vars} className={cn('flex flex-col gap-md', className)} {...rest}>
        {preview ? (
          <div
            // A picture of something the user does not have yet: hidden from the
            // reader, inert to the pointer, and dimmed at M3's `disabledContent`
            // rather than blurred — CSS blur on arbitrary content is a lottery,
            // and a fake frosted panel is worse than an honest dim.
            aria-hidden
            className="pointer-events-none overflow-hidden rounded-[var(--xen-radius-md)]"
            style={{ opacity: V4_STATE.disabledContent }}
          >
            {preview}
          </div>
        ) : null}

        <div className="flex items-center gap-md">{row}</div>

        {lines.length > 0 ? (
          <ul className="flex flex-col gap-xs">
            {lines.map((line) => (
              <li key={line} className="flex items-start gap-sm">
                <IconV4 name="check" size="sm" className="text-success-text" />
                <TextV4 size="sm" tone="onSurface">
                  {line}
                </TextV4>
              </li>
            ))}
          </ul>
        ) : null}

        <ButtonV4
          variant="primary"
          size="md"
          onClick={onUnlock}
          aria-label={unlockLabel}
          className="w-full"
        >
          {unlockLabel}
        </ButtonV4>

        {priceHint ? (
          <TextV4 size="xs" tone="mutedText" align="center">
            {priceHint}
          </TextV4>
        ) : null}
      </CardV4>
    );
  }
);
