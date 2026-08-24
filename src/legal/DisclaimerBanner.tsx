import * as React from 'react';
import { cn } from '../primitives/cn';
import {
  DISCLAIMER_META,
  toneSoftBgClass,
  toneTextClass,
  type DisclaimerTone,
  type LegalTone,
} from './internal';

export type DisclaimerBannerVariant = 'soft' | 'solid' | 'outline';

export interface DisclaimerBannerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Severity — drives the glyph, default title, and token tint. */
  tone?: DisclaimerTone;
  /** Heading; defaults to the tone's label ("Legal notice", "Warning", …). */
  title?: string;
  /** Body copy (the disclaimer text). */
  message: string;
  /** Visual treatment. `soft` (default) tints; `solid` fills; `outline` rings. */
  variant?: DisclaimerBannerVariant;
  /** Optional dismiss affordance. */
  onDismiss?: () => void;
  testID?: string;
}

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
 * A legal disclaimer / notice banner — "not legal advice", attorney-client
 * privilege, confidentiality, statute-of-limitations warnings, etc. Severity is
 * carried by a glyph + heading + token tint (never color alone), and it exposes
 * `role="alert"` so screen readers announce it. `solid` fills for critical
 * notices; `outline` for a lighter footprint. All colors are `--xen-*` token
 * classes — no literals.
 */
export const DisclaimerBanner = React.forwardRef<HTMLDivElement, DisclaimerBannerProps>(
  function DisclaimerBanner(
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
        ? cn('border', BORDER[meta.tone])
        : toneSoftBgClass(meta.tone);

    const bodyText = solid ? ON_TEXT[meta.tone] : 'text-on-surface';
    const accentText = solid ? ON_TEXT[meta.tone] : toneTextClass(meta.tone);

    return (
      <div
        ref={ref}
        role="alert"
        data-testid={testID}
        aria-label={`${heading}. ${message}`}
        className={cn(
          'flex gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] p-[var(--xen-space-sm)]',
          containerTone,
          className
        )}
        {...rest}
      >
        <span aria-hidden="true" className={cn('text-base font-bold leading-none', accentText)}>
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
  }
);
