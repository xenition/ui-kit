import * as React from 'react';
import { cn } from '../primitives/cn';
import { DISCLAIMER_META, toneSoftBgClass, toneTextClass, toneBgClass, type LegalTone } from './internal';
import type { DisclaimerBannerProps } from './DisclaimerBanner';

/** Drop-in for {@link DisclaimerBannerProps} — same props, the V4 "chambers" design. */
export type DisclaimerBannerV4Props = DisclaimerBannerProps;

/** `text-on-*` token class paired to a solid tone fill. */
const ON_TEXT: Record<LegalTone, string> = {
  neutral: 'text-on-surface',
  primary: 'text-on-primary',
  accent: 'text-on-accent',
  success: 'text-on-success',
  warn: 'text-on-warn',
  danger: 'text-on-danger',
};

/** `bg-*` solid fill token class per tone (for the `solid` variant). */
const SOLID_BG: Record<LegalTone, string> = {
  neutral: 'bg-neutral-200',
  primary: 'bg-primary',
  accent: 'bg-accent',
  success: 'bg-success',
  warn: 'bg-warn',
  danger: 'bg-danger',
};

/** `border-*` token class per tone (for the `outline` variant). */
const BORDER: Record<LegalTone, string> = {
  neutral: 'border-border',
  primary: 'border-primary',
  accent: 'border-accent',
  success: 'border-success',
  warn: 'border-warn',
  danger: 'border-danger',
};

/**
 * DisclaimerBanner — **V4** "chambers" design (web parity of the native V4). The
 * distinguished, chambers take on a legal notice / disclaimer: the severity is
 * carried by a glyph in its own toned chip + a heading + a token tint (never
 * color alone), and it exposes `role="alert"`. `soft` (default) rides a tinted
 * well with a toned left rail; `solid` fills for critical notices; `outline`
 * rings for a lighter footprint. Reuses the base `variant`
 * (`soft` / `solid` / `outline`). All colors from `--xen-*` token classes
 * (no literals).
 */
export const DisclaimerBannerV4 = React.forwardRef<HTMLDivElement, DisclaimerBannerV4Props>(function DisclaimerBannerV4(
  { tone = 'info', title, message, variant = 'soft', onDismiss, testID, className, ...rest },
  ref
) {
  const meta = DISCLAIMER_META[tone];
  const heading = title ?? meta.label;
  const solid = variant === 'solid';
  const outline = variant === 'outline';

  const containerTone = solid
    ? SOLID_BG[meta.tone]
    : outline
      ? cn('border', BORDER[meta.tone], 'bg-surface')
      : cn(toneSoftBgClass(meta.tone), 'shadow-sm');

  const bodyText = solid ? ON_TEXT[meta.tone] : 'text-on-surface';
  const accentText = solid ? ON_TEXT[meta.tone] : toneTextClass(meta.tone);

  return (
    <div
      ref={ref}
      role="alert"
      data-testid={testID}
      data-xen-disclaimer-banner={meta.tone}
      aria-label={`${heading}. ${message}`}
      className={cn(
        'flex items-start gap-[var(--xen-space-sm)] overflow-hidden rounded-[var(--xen-radius-lg)] p-[var(--xen-space-md)]',
        containerTone,
        className
      )}
      {...rest}
    >
      <span
        aria-hidden="true"
        className={cn(
          'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold leading-none',
          solid ? 'bg-primary-50/20' : toneBgClass(meta.tone),
          ON_TEXT[meta.tone]
        )}
      >
        {meta.glyph}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className={cn('text-sm font-bold', accentText)}>{heading}</span>
        <span className={cn('text-xs leading-relaxed', bodyText)}>{message}</span>
      </div>
      {onDismiss ? (
        <button
          type="button"
          aria-label="Dismiss notice"
          onClick={onDismiss}
          className={cn(
            'shrink-0 rounded-[var(--xen-radius-sm)] px-[var(--xen-space-xs)] text-base font-bold leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
            accentText
          )}
        >
          ✕
        </button>
      ) : null}
    </div>
  );
});
