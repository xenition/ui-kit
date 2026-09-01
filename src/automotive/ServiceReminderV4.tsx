import * as React from 'react';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { IconV4 } from '../primitives/IconV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { metaLine, TONE_INK, TONE_VAR, toneGround, type ToneV4 } from './internal/fleet-v4';
import type { ServiceReminderProps, ServiceUrgency } from './ServiceReminder';

export interface ServiceReminderV4Props extends ServiceReminderProps {
  /** Override the urgency words — three English phrases lived inside. */
  urgencyLabels?: Partial<Record<ServiceUrgency, string>>;
  /** Accessible name for the dismiss control. Default `'Dismiss reminder'`. */
  dismissLabel?: string;
}

const URGENCY_META: Record<ServiceUrgency, { label: string; tone: ToneV4 }> = {
  upcoming: { label: 'Upcoming', tone: 'primary' },
  due: { label: 'Due now', tone: 'warn' },
  overdue: { label: 'Overdue', tone: 'danger' },
};

/**
 * **V4 service reminder** — the web twin of the native `ServiceReminderV4`,
 * same props as {@link ServiceReminder} plus `urgencyLabels` and
 * `dismissLabel`.
 *
 * ## Four changes
 *
 * 1. **Urgency survives greyscale** — a badge word and a leading rail beside
 *    the tint, which was the only signal.
 * 2. **`overdue` announces itself**, and the other two do not: a component
 *    that announces every state as an alert teaches the user to ignore it.
 * 3. **The dismiss control is a 44px target with a name.**
 * 4. **The tint is a `color-mix()` over the semantic variables**, so it lands
 *    correctly in dark mode.
 *
 * **Renders nothing without a `service`** (§4.5).
 */
export const ServiceReminderV4 = React.forwardRef<HTMLDivElement, ServiceReminderV4Props>(
  function ServiceReminderV4(
    {
      service,
      urgency = 'upcoming',
      glyph = '🔧',
      dueLabel,
      mileageLabel,
      detail,
      variant = 'card',
      urgencyLabels,
      dismissLabel = 'Dismiss reminder',
      actionLabel,
      onAction,
      onDismiss,
      className,
      style,
      ...rest
    },
    ref
  ) {
    if (!service) return null;

    const meta = URGENCY_META[urgency];
    const word = urgencyLabels?.[urgency] ?? meta.label;
    const caption = metaLine([dueLabel, mileageLabel, detail]);
    const card = variant === 'card';

    return (
      <div
        ref={ref}
        role={urgency === 'overdue' ? 'alert' : 'status'}
        data-xen-service-reminder={urgency}
        aria-label={metaLine([word, service, caption])}
        className={cn(
          'flex gap-md overflow-hidden',
          card
            ? 'rounded-[var(--xen-radius-lg)] border border-border p-md'
            : 'p-sm',
          className
        )}
        style={card ? { background: toneGround(meta.tone), ...style } : style}
        {...rest}
      >
        {card ? (
          <span
            aria-hidden
            className="w-[3px] shrink-0 self-stretch rounded-full"
            style={{ background: TONE_VAR[meta.tone] }}
          />
        ) : null}

        <IconV4 glyph={glyph} size="lg" className={TONE_INK[meta.tone]} />

        <div className="flex min-w-0 flex-1 flex-col gap-xs">
          <div className="flex items-center gap-sm">
            <p className="min-w-0 flex-1 truncate font-heading text-base font-bold text-on-card">
              {service}
            </p>
            <BadgeV4 tone={meta.tone} variant="soft" size="sm">
              {word}
            </BadgeV4>
          </div>

          {caption ? (
            <p className="text-xs text-muted-text [font-variant-numeric:tabular-nums]">{caption}</p>
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

        {onDismiss ? (
          <button
            type="button"
            aria-label={dismissLabel}
            onClick={onDismiss}
            data-xen-v4-chrome="on-surface"
            className={cn(
              '-my-sm -mr-sm flex w-11 shrink-0 items-center justify-center rounded-full text-muted-text',
              MIN_TAP_CLASS
            )}
          >
            <IconV4 name="close" size="base" />
          </button>
        ) : null}
      </div>
    );
  }
);
