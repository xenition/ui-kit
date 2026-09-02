import * as React from 'react';
import { cn } from '../primitives/cn';
import { StatusPill } from './StatusPill';
import { COURT_EVENT_META, COURT_URGENCY_META, toneTextClass, activateOnKey } from './internal';
import type { CourtDateCardProps } from './CourtDateCard';

/** Drop-in for {@link CourtDateCardProps} — same props, the V4 "chambers" design. */
export type CourtDateCardV4Props = CourtDateCardProps;

/**
 * CourtDateCard — **V4** "chambers" design (web parity of the native V4). The
 * distinguished, chambers take on a court date / filing deadline: an elevated
 * rounded card with a soft shadow, a leading soft-primary event-glyph block, the
 * date + time, event-type and urgency pills (each a glyph + word so nothing rests
 * on color alone), an optional toned countdown, and venue / judge / case
 * metadata. A `today` / `soon` urgency tints the countdown for triage. When
 * `onClick` is set the card is a keyboard-activable `role="button"`. Reuses the
 * base `variant` (`default` / `compact`). All colors from `--xen-*` token classes
 * (no literals).
 */
export const CourtDateCardV4 = React.forwardRef<HTMLDivElement, CourtDateCardV4Props>(function CourtDateCardV4(
  { type, date, time, court, judge, caseNumber, urgency = 'upcoming', countdown, variant = 'default', onClick, testID, className, ...rest },
  ref
) {
  const compact = variant === 'compact';
  const typeMeta = COURT_EVENT_META[type];
  const urgencyMeta = COURT_URGENCY_META[urgency];
  const highlighted = urgency === 'today' || urgency === 'soon';
  const interactive = Boolean(onClick);

  return (
    <div
      ref={ref}
      data-testid={testID}
      data-xen-court-date-card=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? `${typeMeta.label} on ${date}` : undefined}
      onClick={interactive ? onClick : undefined}
      onKeyDown={interactive ? activateOnKey(onClick) : undefined}
      className={cn(
        'flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm p-[var(--xen-space-lg)]',
        compact && 'p-[var(--xen-space-md)]',
        urgency === 'past' && 'opacity-70',
        interactive && 'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...rest}
    >
      <div className="flex items-start gap-[var(--xen-space-md)]">
        <div className="flex h-12 min-w-[52px] items-center justify-center rounded-[var(--xen-radius-md)] bg-primary/10">
          <span aria-hidden="true" className="text-xl leading-none">{typeMeta.glyph}</span>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-base font-bold text-on-surface">{date}</span>
          {time ? <span className="text-xs tabular-nums text-muted">{time}</span> : null}
          <div className="mt-0.5 flex flex-wrap items-center gap-[var(--xen-space-xs)]">
            <StatusPill meta={typeMeta} variant="inline" size="sm" />
            <StatusPill meta={urgencyMeta} variant="soft" size="sm" />
          </div>
        </div>
        {countdown ? (
          <span className={cn('shrink-0 text-xs font-bold', highlighted ? toneTextClass(urgencyMeta.tone) : 'text-muted')}>{countdown}</span>
        ) : null}
      </div>

      {!compact && (court || judge || caseNumber) ? (
        <div className="flex flex-col gap-0.5 rounded-[var(--xen-radius-md)] bg-primary/5 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]">
          {court ? <span className="text-xs font-semibold text-on-surface">🏛 {court}</span> : null}
          {judge ? <span className="text-xs text-muted">Before {judge}</span> : null}
          {caseNumber ? <span className="text-xs tabular-nums text-muted">{caseNumber}</span> : null}
        </div>
      ) : null}
    </div>
  );
});
