import * as React from 'react';
import { cn } from '../primitives/cn';
import type { OpenHouseBadgeProps, OpenHouseStatus } from './OpenHouseBadge';

/** Drop-in for {@link OpenHouseBadgeProps} — same props, the V4 "listing" design. */
export type OpenHouseBadgeV4Props = OpenHouseBadgeProps;

/**
 * Per-status editorial styling. ONE accent = primary for upcoming; the live
 * state promotes to the success token so "open now" reads at a glance. Status is
 * carried by an icon + label (never color alone). All classes resolve to
 * `--xen-*` tokens — no literal colors.
 */
const STATUS: Record<OpenHouseStatus, { glyph: string; prefix: string; pill: string; text: string }> = {
  upcoming: {
    glyph: '📅',
    prefix: 'Open house',
    pill: 'bg-primary/10 border-primary/20',
    text: 'text-on-surface',
  },
  live: {
    glyph: '🟢',
    prefix: 'Open now',
    pill: 'bg-success/15 border-success/30',
    text: 'text-on-surface',
  },
  ended: {
    glyph: '✓',
    prefix: 'Ended',
    pill: 'bg-on-surface/5 border-border',
    text: 'text-muted',
  },
};

/**
 * OpenHouseBadge — **V4** "listing" design (web parity of the native V4). The
 * editorial take on the open-house indicator: a calendar glyph and the
 * date/time window inside a soft-primary tinted pill, promoting to a
 * success-toned "open now" pill for the live state. Same props/behavior as
 * {@link OpenHouseBadgeProps}; still pure presentation (strings in, no
 * callbacks). The full window is rendered as one phrase so it is announced as a
 * single string, and status is conveyed by icon + label, not color alone. All
 * colors come from the `--xen-*` tokens — no literal colors.
 */
export const OpenHouseBadgeV4 = React.forwardRef<HTMLSpanElement, OpenHouseBadgeV4Props>(
  function OpenHouseBadgeV4({ dateLabel, startTime, endTime, status = 'upcoming', className, ...rest }, ref) {
    const { glyph, prefix, pill, text } = STATUS[status];
    const window = [startTime, endTime].filter(Boolean).join('–');
    const label = `${prefix} · ${dateLabel}${window ? ` ${window}` : ''}`;

    return (
      <span
        ref={ref}
        aria-label={label}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-semibold',
          pill,
          text,
          className
        )}
        {...rest}
      >
        <span aria-hidden="true">{glyph}</span>
        <span className="font-bold">{prefix}</span>
        <span aria-hidden="true" className="text-muted">·</span>
        <span>{dateLabel}</span>
        {window ? <span className="text-muted">{window}</span> : null}
      </span>
    );
  }
);
