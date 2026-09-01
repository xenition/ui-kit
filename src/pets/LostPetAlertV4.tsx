import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, Button } from '../primitives';
import { SLOT_BORDER, SLOT_TINT, type PetSlot } from './_tokens';
import type { LostPetAlertProps, LostPetStatus } from './LostPetAlert';

/** Drop-in for {@link LostPetAlertProps} — same props, the V4 "companion" design. */
export type LostPetAlertV4Props = LostPetAlertProps;

interface StatusMeta {
  label: string;
  tone: 'danger' | 'warn' | 'success';
  slot: PetSlot;
  glyph: string;
}

const STATUS_META: Record<LostPetStatus, StatusMeta> = {
  lost: { label: 'Lost', tone: 'danger', slot: 'danger', glyph: '🚨' },
  sighted: { label: 'Sighted', tone: 'warn', slot: 'warn', glyph: '👀' },
  found: { label: 'Found', tone: 'success', slot: 'success', glyph: '🎉' },
  reunited: { label: 'Reunited', tone: 'success', slot: 'success', glyph: '🏠' },
};

/**
 * LostPetAlert — **V4** "companion" design (web parity of the native V4). The
 * warm, friendly take on a lost-pet alert: an elevated rounded card with a soft
 * shadow (no gradient) whose urgency is carried by a status-toned soft surface
 * accent — a token-colored left edge + reduced-alpha tint on the glyph well — plus
 * a labelled status Badge + glyph (danger for lost, etc.), never color alone.
 * Uses `role="alert"`, keeps the static map placeholder, and preserves the
 * report-sighting + share actions for active alerts. Same props/behavior as
 * {@link LostPetAlertProps}. All colors from `--xen-*` token classes (no literals).
 */
export const LostPetAlertV4 = React.forwardRef<HTMLDivElement, LostPetAlertV4Props>(function LostPetAlertV4(
  {
    name,
    status,
    lastSeen,
    lastSeenAt,
    reward,
    description,
    contact,
    showMap = true,
    reportLabel = 'Report sighting',
    onReportSighting,
    onShare,
    className,
  },
  ref
) {
  const meta = STATUS_META[status];
  const active = status !== 'reunited' && status !== 'found';

  return (
    <div
      ref={ref}
      role="alert"
      aria-label={`${meta.label}: ${name}${lastSeen ? `, last seen ${lastSeen}` : ''}`}
      className={cn(
        'flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-l-4 border-border bg-surface text-on-surface p-[var(--xen-space-lg)] shadow-md',
        SLOT_BORDER[meta.slot],
        className
      )}
    >
      <div className="flex items-center gap-[var(--xen-space-sm)]">
        <span
          className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xl', SLOT_TINT[meta.slot])}
          aria-hidden="true"
        >
          {meta.glyph}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-lg font-bold text-on-surface">{name}</p>
          {lastSeenAt ? <p className="text-xs text-muted">{lastSeenAt}</p> : null}
        </div>
        <Badge tone={meta.tone} variant="soft">
          {meta.label}
        </Badge>
      </div>

      {lastSeen ? <p className="text-sm text-on-surface">📍 Last seen: {lastSeen}</p> : null}

      {showMap ? (
        <div
          aria-hidden="true"
          className="flex h-[120px] flex-col items-center justify-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] border border-border bg-primary/10"
        >
          <span className="text-xl">🗺️</span>
          <span className="text-xs text-muted">Map preview</span>
        </div>
      ) : null}

      {description ? <p className="line-clamp-3 text-sm text-muted">{description}</p> : null}

      {reward || contact ? (
        <div className="flex flex-wrap gap-[var(--xen-space-sm)]">
          {reward ? (
            <span className="inline-flex items-center rounded-full bg-primary/10 px-[var(--xen-space-sm)] py-0.5 text-sm font-bold text-on-surface">
              🏅 Reward {reward}
            </span>
          ) : null}
          {contact ? (
            <span className="inline-flex items-center rounded-full bg-primary/10 px-[var(--xen-space-sm)] py-0.5 text-sm text-on-surface">
              ☎ {contact}
            </span>
          ) : null}
        </div>
      ) : null}

      {onReportSighting || onShare ? (
        <div className="mt-[var(--xen-space-xs)] flex gap-[var(--xen-space-sm)]">
          {active && onReportSighting ? (
            <Button variant="danger" size="sm" className="flex-1" onClick={onReportSighting}>
              {reportLabel}
            </Button>
          ) : null}
          {onShare ? (
            <Button variant="outline" size="sm" className="flex-1" onClick={onShare}>
              Share
            </Button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
});
