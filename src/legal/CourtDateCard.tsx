import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives';
import { StatusPill } from './StatusPill';
import {
  COURT_EVENT_META,
  COURT_URGENCY_META,
  toneSoftBgClass,
  toneTextClass,
  activateOnKey,
  type CourtEventType,
  type CourtUrgency,
} from './internal';

export type CourtDateCardVariant = 'default' | 'compact';

export interface CourtDateCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Kind of court event — glyph + word chip. */
  type: CourtEventType;
  /** Pre-formatted date label (e.g. "Sep 14, 2026"). */
  date: string;
  /** Pre-formatted time label. */
  time?: string;
  /** Court / venue name. */
  court?: string;
  /** Judge / hearing officer. */
  judge?: string;
  /** Associated case number. */
  caseNumber?: string;
  /** Time-relative urgency — glyph + word pill (today/soon/upcoming/past). */
  urgency?: CourtUrgency;
  /** Optional countdown label (e.g. "in 3 days"). */
  countdown?: string;
  /** Density. */
  variant?: CourtDateCardVariant;
  /** Click handler. */
  onClick?: () => void;
  testID?: string;
}

/**
 * A court date / filing deadline card: a leading urgency-tinted date block, the
 * event type and urgency pills (each glyph + word so nothing rests on color
 * alone), and venue / judge / case metadata. A `today` or `soon` urgency tints
 * the date block and countdown for at-a-glance triage. When `onClick` is set the
 * card is an accessible `role="button"`. All colors are `--xen-*` token classes.
 */
export const CourtDateCard = React.forwardRef<HTMLDivElement, CourtDateCardProps>(
  function CourtDateCard(
    {
      type,
      date,
      time,
      court,
      judge,
      caseNumber,
      urgency = 'upcoming',
      countdown,
      variant = 'default',
      onClick,
      testID,
      className,
      ...rest
    },
    ref
  ) {
    const compact = variant === 'compact';
    const typeMeta = COURT_EVENT_META[type];
    const urgencyMeta = COURT_URGENCY_META[urgency];
    const highlighted = urgency === 'today' || urgency === 'soon';
    const interactive = Boolean(onClick);

    return (
      <Card
        ref={ref}
        data-testid={testID}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={interactive ? `${typeMeta.label} on ${date}` : undefined}
        onClick={interactive ? onClick : undefined}
        onKeyDown={interactive ? activateOnKey(onClick) : undefined}
        className={cn(
          'flex flex-col gap-[var(--xen-space-sm)]',
          compact && 'p-[var(--xen-space-md)]',
          urgency === 'past' && 'opacity-70',
          interactive && 'cursor-pointer',
          className
        )}
        {...rest}
      >
        <div className="flex items-start gap-[var(--xen-space-sm)]">
          <div
            className={cn(
              'flex min-w-[52px] items-center justify-center rounded-[var(--xen-radius-sm)] px-[var(--xen-space-xs)] py-[var(--xen-space-xs)]',
              toneSoftBgClass(highlighted ? urgencyMeta.tone : typeMeta.tone)
            )}
          >
            <span aria-hidden="true" className="text-lg leading-none">
              {typeMeta.glyph}
            </span>
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="text-base font-bold text-on-surface">{date}</span>
            {time ? <span className="text-xs text-muted">{time}</span> : null}
            <div className="mt-0.5 flex flex-wrap items-center gap-[var(--xen-space-xs)]">
              <StatusPill meta={typeMeta} variant="inline" size="sm" />
              <StatusPill meta={urgencyMeta} size="sm" />
            </div>
          </div>
          {countdown ? (
            <span
              className={cn(
                'text-xs font-bold',
                highlighted ? toneTextClass(urgencyMeta.tone) : 'text-muted'
              )}
            >
              {countdown}
            </span>
          ) : null}
        </div>

        {!compact && (court || judge || caseNumber) ? (
          <div className="flex flex-col gap-0.5">
            {court ? (
              <span className="text-xs font-semibold text-on-surface">🏛 {court}</span>
            ) : null}
            {judge ? <span className="text-xs text-muted">Before {judge}</span> : null}
            {caseNumber ? <span className="text-xs text-muted">{caseNumber}</span> : null}
          </div>
        ) : null}
      </Card>
    );
  }
);
