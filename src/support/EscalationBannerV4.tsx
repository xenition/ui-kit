import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button, type ButtonVariant } from '../primitives/Button';
import type { EscalationBannerProps, EscalationLevel } from './EscalationBanner';

/** Drop-in for {@link EscalationBannerProps} — same props, the V4 "calm console" design. */
export type EscalationBannerV4Props = EscalationBannerProps;

interface LevelSpec {
  glyph: string;
  role: string;
  /** Left accent-bar token bg. */
  bar: string;
  /** Soft severity tint background (never a full saturated fill). */
  tint: string;
  /** Glyph/accent text token. */
  accent: string;
  /** Escalate button variant. */
  escalateVariant: ButtonVariant;
}

// critical → danger, warning → warn, info → primary. The role word + glyph carry
// severity so it's never color-alone. Tints are soft (`/10`) to stay calm.
const LEVEL: Record<EscalationLevel, LevelSpec> = {
  info: { glyph: 'ℹ', role: 'Notice', bar: 'bg-primary', tint: 'bg-primary/10', accent: 'text-primary', escalateVariant: 'primary' },
  warning: { glyph: '⚠', role: 'Warning', bar: 'bg-warn', tint: 'bg-warn/10', accent: 'text-warn', escalateVariant: 'primary' },
  critical: { glyph: '⛔', role: 'Critical', bar: 'bg-danger', tint: 'bg-danger/10', accent: 'text-danger', escalateVariant: 'danger' },
};

/**
 * EscalationBanner — **V4** "calm console" design (web parity of the native V4).
 * A prominent-but-calm banner: an elevated rounded card with a left severity-
 * accent bar (the signature at-a-glance cue), a leading glyph in a soft-tint
 * chip, and a role word ("Warning"/"Critical") — severity is encoded by glyph
 * **and** color (never color alone), mapping `critical`→danger, `warning`→warn,
 * `info`→primary. Exposes an "Escalate" primary action (`onEscalate`; disabled
 * while `escalating`) and an "Acknowledge" dismiss (`onAcknowledge`); both
 * actions are ≥44px tall. Same props/behavior as {@link EscalationBannerProps};
 * all colors from `--xen-*` token classes (no literal hex).
 */
export const EscalationBannerV4 = React.forwardRef<HTMLDivElement, EscalationBannerV4Props>(
  function EscalationBannerV4(
    {
      level = 'warning',
      title,
      message,
      onEscalate,
      onAcknowledge,
      escalateLabel = 'Escalate',
      acknowledgeLabel = 'Acknowledge',
      escalating = false,
      className,
      ...rest
    },
    ref
  ) {
    const spec = LEVEL[level] ?? LEVEL.warning;

    return (
      <div
        ref={ref}
        role="alert"
        aria-label={`${spec.role}: ${title}${message ? `. ${message}` : ''}`}
        className={cn(
          'flex overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface shadow-sm',
          className
        )}
        {...rest}
      >
        {/* Left severity-accent bar — the V4 at-a-glance cue. */}
        <span className={cn('w-1 shrink-0', spec.bar)} aria-hidden="true" />

        <div className="flex flex-1 items-start gap-3 p-3">
          {/* Soft-tint severity chip with leading glyph. */}
          <span
            aria-hidden="true"
            className={cn(
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] text-lg font-bold',
              spec.tint,
              spec.accent
            )}
          >
            {spec.glyph}
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <span className="text-base font-bold text-on-surface">{title}</span>
            {message ? <span className="text-sm text-muted">{message}</span> : null}
            {onEscalate || onAcknowledge ? (
              <div className="mt-1 flex flex-wrap gap-2">
                {onEscalate ? (
                  <Button
                    size="sm"
                    variant={spec.escalateVariant}
                    disabled={escalating}
                    onClick={onEscalate}
                    className="min-h-[44px]"
                  >
                    {escalateLabel}
                  </Button>
                ) : null}
                {onAcknowledge ? (
                  <Button size="sm" variant="ghost" onClick={onAcknowledge} className="min-h-[44px]">
                    {acknowledgeLabel}
                  </Button>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
);
