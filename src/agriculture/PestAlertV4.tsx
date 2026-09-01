import * as React from 'react';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { IconV4 } from '../primitives/IconV4';
import { TONE_FILL, TONE_INK, toneGround, type FarmTone } from './internal/farm-v4';
import type { PestAlertProps, PestSeverity } from './PestAlert';

export interface PestAlertV4Props extends PestAlertProps {
  /** Override the severity names — four English words lived inside the component. */
  severityLabels?: Partial<Record<PestSeverity, string>>;
  /** Label above the recommendation. Default `'Recommended action'`. */
  recommendationLabel?: string;
  /** Label above the affected area. Default `'Affected'`. */
  affectedLabel?: string;
}

/**
 * Severity → tone and default label.
 *
 * `critical` and `high` share `danger` deliberately: the tone scale has three
 * steps and the severity scale has four, and collapsing them at the top is
 * right — a colour that means "worse than the worst" does not exist, and the
 * **word** is what separates them.
 */
const SEVERITY_META: Record<PestSeverity, { label: string; tone: FarmTone }> = {
  low: { label: 'Low', tone: 'success' },
  moderate: { label: 'Moderate', tone: 'warn' },
  high: { label: 'High', tone: 'danger' },
  critical: { label: 'Critical', tone: 'danger' },
};

/**
 * **V4 pest alert** — the web twin of the native `PestAlertV4`, same props as
 * {@link PestAlert} plus `severityLabels`, `recommendationLabel` and
 * `affectedLabel`.
 *
 * ## Four changes
 *
 * 1. **Severity reads without colour.** A tinted ground and a coloured glyph
 *    are both colour-only signals; V4 keeps them and adds the badge word and a
 *    leading rail, so severity survives greyscale and CVD.
 * 2. **The tint is a `color-mix()` over the semantic variables**, so it lands
 *    on the correct side of the page in dark mode instead of being a pale wash.
 * 3. **The glyph and headings take the contrast-corrected ink** (`*-text`)
 *    rather than the fill slots the base put on text.
 * 4. **The recommendation is labelled.** The base rendered it as a bare
 *    paragraph under the pest name, so the most actionable line on the card
 *    read as more description.
 *
 * **Renders nothing without a `pest`** (§4.5).
 */
export const PestAlertV4 = React.forwardRef<HTMLDivElement, PestAlertV4Props>(
  function PestAlertV4(
    {
      pest,
      severity = 'moderate',
      affected,
      recommendation,
      detectedAt,
      icon = '🐛',
      actionLabel,
      onAction,
      severityLabels,
      recommendationLabel = 'Recommended action',
      affectedLabel = 'Affected',
      className,
      style,
      ...rest
    },
    ref
  ) {
    if (!pest) return null;

    const meta = SEVERITY_META[severity];
    const label = severityLabels?.[severity] ?? meta.label;

    return (
      <div
        ref={ref}
        role="alert"
        data-xen-pest-alert={severity}
        className={cn(
          'flex gap-md overflow-hidden rounded-[var(--xen-radius-lg)] border border-border p-md',
          className
        )}
        style={{ background: toneGround(meta.tone), ...style }}
        {...rest}
      >
        {/* The rail is the non-colour half of the severity signal. */}
        <span
          aria-hidden
          className="w-[3px] shrink-0 self-stretch rounded-full"
          style={{ background: TONE_FILL[meta.tone] }}
        />

        <div className="flex min-w-0 flex-1 flex-col gap-sm">
          <div className="flex items-center gap-sm">
            <IconV4 glyph={icon} size="lg" className={TONE_INK[meta.tone]} />
            <p className="min-w-0 flex-1 font-heading text-base font-bold text-on-card">{pest}</p>
            <BadgeV4 tone={meta.tone} variant="soft" size="sm">
              {label}
            </BadgeV4>
          </div>

          {affected ? (
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-semibold text-muted-text">{affectedLabel}</span>
              <span className="text-sm text-on-card">{affected}</span>
            </div>
          ) : null}

          {recommendation ? (
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-semibold text-muted-text">
                {recommendationLabel}
              </span>
              <span className="text-sm text-on-card">{recommendation}</span>
            </div>
          ) : null}

          {detectedAt ? (
            <p className="flex items-center gap-xs text-xs text-muted-text">
              <IconV4 name="clock" size="xs" />
              {detectedAt}
            </p>
          ) : null}

          {actionLabel && onAction ? (
            <ButtonV4
              variant="secondary"
              size="sm"
              onClick={onAction}
              aria-label={actionLabel}
              className="self-start"
            >
              {actionLabel}
            </ButtonV4>
          ) : null}
        </div>
      </div>
    );
  }
);
