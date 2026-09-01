import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { Button } from '../primitives/Button';
import { Rating } from '../primitives/Rating';
import type { DoctorCardProps, DoctorAvailability } from './DoctorCard';

/** V4 layout choices for the "clinic" design. */
export type DoctorCardLayout = 'full' | 'compact';

/** Drop-in for {@link DoctorCardProps} — same props, the V4 "clinic" design. */
export interface DoctorCardV4Props extends DoctorCardProps {
  /** V4 layout: `full` (card, default) or `compact` (dense single row). */
  variant?: DoctorCardLayout;
}

const AVAIL_META: Record<DoctorAvailability, { label: string; tone: BadgeTone; glyph: string }> = {
  available: { label: 'Available today', tone: 'success', glyph: '●' },
  busy: { label: 'Limited slots', tone: 'warn', glyph: '◐' },
  off: { label: 'Not accepting', tone: 'neutral', glyph: '○' },
};

/**
 * DoctorCard — **V4** "clinic" design (web parity of the native V4). The calm,
 * clinical take on a clinician profile: an elevated rounded card with a soft
 * shadow, the avatar + name + specialty, a star rating with review count, an
 * optional credential line, a labelled availability badge (glyph + label + tone,
 * never color alone), and a "Book" CTA. Honors the V4 `variant` — `full` (card,
 * default) and `compact` (a dense single row) — identical props/behavior to
 * {@link DoctorCardProps}. All colors from `--xen-*` token classes (no
 * literals). Informational UI only — not a medical device.
 */
export const DoctorCardV4 = React.forwardRef<HTMLDivElement, DoctorCardV4Props>(function DoctorCardV4(
  { name, specialty, avatar, rating, reviewCount, credentials, availability, onBook, bookLabel = 'Book', variant = 'full', className, ...rest },
  ref
) {
  const meta = availability ? AVAIL_META[availability] : undefined;
  const shell = 'rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm';
  const a11y = `${name}, ${specialty}${rating != null ? `, rated ${rating} out of 5` : ''}${meta ? `, ${meta.label}` : ''}`;

  // ── compact: dense single row ──
  if (variant === 'compact') {
    return (
      <div ref={ref} data-xen-doctor-card="" aria-label={a11y} className={cn(shell, 'flex items-center gap-[var(--xen-space-sm)] p-[var(--xen-space-sm)]', className)} {...rest}>
        <Avatar src={avatar} name={name} size="sm" />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-sm font-bold text-on-surface">{name}</span>
          <span className="truncate text-xs tabular-nums text-muted">
            {specialty}
            {rating != null ? ` · ★ ${rating.toFixed(1)}` : ''}
          </span>
        </div>
        {meta ? (
          <Badge tone={meta.tone} variant="soft">
            <span aria-hidden="true">{meta.glyph}</span> {meta.label}
          </Badge>
        ) : null}
      </div>
    );
  }

  return (
    <div ref={ref} data-xen-doctor-card="" aria-label={a11y} className={cn(shell, 'flex flex-col gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]', className)} {...rest}>
      <div className="flex items-center gap-[var(--xen-space-md)]">
        <Avatar src={avatar} name={name} size="lg" />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-base font-bold text-on-surface">{name}</span>
          <span className="truncate text-sm text-muted">{specialty}</span>
          {credentials ? <span className="truncate text-xs text-muted">{credentials}</span> : null}
        </div>
        {meta ? (
          <Badge tone={meta.tone} variant="soft">
            <span aria-hidden="true">{meta.glyph}</span> {meta.label}
          </Badge>
        ) : null}
      </div>

      {rating != null ? (
        <div className="flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] bg-primary/10 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]">
          <Rating value={rating} />
          {reviewCount != null ? (
            <span className="text-xs tabular-nums text-muted">
              {rating.toFixed(1)} ({reviewCount})
            </span>
          ) : null}
        </div>
      ) : null}

      {onBook ? (
        <Button variant="primary" onClick={() => onBook()}>
          {bookLabel}
        </Button>
      ) : null}
    </div>
  );
});
