import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, Button } from '../primitives';
import { SLOT_BORDER, SLOT_TEXT, SLOT_TINT, type PetSlot } from './_tokens';

export type LostPetStatus = 'lost' | 'sighted' | 'found' | 'reunited';

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

export interface LostPetAlertProps {
  /** Pet's name. */
  name: string;
  /** Alert status; drives the banner tint, chip, and icon. */
  status: LostPetStatus;
  /** Last-seen location description. */
  lastSeen?: string;
  /** When last seen (already formatted). */
  lastSeenAt?: string;
  /** Reward label, e.g. "$500". */
  reward?: string;
  /** Short description / distinguishing marks. */
  description?: string;
  /** Contact phone / handle. */
  contact?: string;
  /** Whether to render the static map placeholder. */
  showMap?: boolean;
  /** Report-sighting action label; hidden when reunited/found or no handler. */
  reportLabel?: string;
  onReportSighting?: () => void;
  onShare?: () => void;
  /** Extra classes on the root. */
  className?: string;
}

/**
 * A high-visibility lost-pet alert banner: status chip + icon, pet name, last-
 * seen location/time, reward, and a dependency-free static map placeholder.
 * Exposes report-sighting + share actions for active alerts. Uses `role="alert"`
 * and conveys status by icon + label, not color alone. The tint is a token color
 * at reduced alpha (`bg-<slot>/10`) — no literal colors.
 */
export const LostPetAlert = React.forwardRef<HTMLDivElement, LostPetAlertProps>(function LostPetAlert(
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
        'flex flex-col gap-[var(--xen-space-md)] text-on-surface border rounded-[var(--xen-radius-lg)] p-[var(--xen-space-lg)]',
        SLOT_BORDER[meta.slot],
        SLOT_TINT[meta.slot],
        className
      )}
    >
      <div className="flex items-center gap-[var(--xen-space-sm)]">
        <span className="text-2xl" aria-hidden="true">
          {meta.glyph}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-lg font-bold text-on-surface">{name}</p>
          {lastSeenAt ? <p className="text-xs text-muted">{lastSeenAt}</p> : null}
        </div>
        <Badge tone={meta.tone}>{meta.label}</Badge>
      </div>

      {lastSeen ? <p className="text-sm text-on-surface">📍 Last seen: {lastSeen}</p> : null}

      {showMap ? (
        <div
          aria-hidden="true"
          className="flex h-[120px] flex-col items-center justify-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] border border-border bg-border"
        >
          <span className="text-xl">🗺️</span>
          <span className="text-xs text-muted">Map preview</span>
        </div>
      ) : null}

      {description ? <p className="line-clamp-3 text-sm text-muted">{description}</p> : null}

      {reward || contact ? (
        <div className="flex flex-wrap gap-[var(--xen-space-md)]">
          {reward ? <p className={cn('text-base font-bold', SLOT_TEXT[meta.slot])}>Reward {reward}</p> : null}
          {contact ? <p className="text-sm text-on-surface">☎ {contact}</p> : null}
        </div>
      ) : null}

      {onReportSighting || onShare ? (
        <div className="flex gap-[var(--xen-space-sm)]">
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
