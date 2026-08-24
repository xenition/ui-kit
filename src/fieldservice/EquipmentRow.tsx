import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, Badge, type BadgeTone } from '../primitives';
import { DISC_TINT, type FieldSlot } from './internal/format';

/** Asset condition — text + glyph + color (never color-alone). */
export type EquipmentStatus = 'operational' | 'maintenance' | 'down' | 'retired';

interface StatusDescriptor {
  label: string;
  glyph: string;
  tone: BadgeTone;
  /** Semantic slot used for the tinted disc. */
  slot: FieldSlot;
}

const EQUIPMENT_STATUS: Record<EquipmentStatus, StatusDescriptor> = {
  operational: { label: 'Operational', glyph: '✓', tone: 'success', slot: 'success' },
  maintenance: { label: 'Maintenance', glyph: '⚙', tone: 'warn', slot: 'warn' },
  down: { label: 'Down', glyph: '✕', tone: 'danger', slot: 'danger' },
  retired: { label: 'Retired', glyph: '⏻', tone: 'neutral', slot: 'muted' },
};

export interface EquipmentRowProps {
  /** Equipment / asset name (e.g. "Bobcat S650"). */
  name: string;
  /** Asset tag / serial (e.g. "AST-3391"). */
  assetTag: string;
  /** Operating condition — text + glyph + color. */
  status: EquipmentStatus;
  /** Leading glyph for the asset disc (emoji or symbol). */
  glyph?: string;
  /** Localized next-service date, shown as a meta line. */
  nextService?: string;
  /** Current site / location, shown as a meta line. */
  location?: string;
  /** Fires on row click (e.g. open the asset detail). */
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * One line in an equipment / asset register: a tinted status glyph disc, a
 * name/tag stack, meta (location, next service), and a status pill. The status
 * is conveyed redundantly (glyph + label + a color that traces to a semantic
 * token: operational → success, down → danger) so it is never color-alone.
 * Becomes a `role="button"` surface only when `onClick` is supplied. No literals.
 */
export const EquipmentRow = React.forwardRef<HTMLDivElement, EquipmentRowProps>(
  function EquipmentRow(
    { name, assetTag, status, glyph = '🚜', nextService, location, onClick, className, style },
    ref
  ) {
    const sd = EQUIPMENT_STATUS[status] ?? EQUIPMENT_STATUS.operational;
    const meta = [location, nextService != null ? `Service ${nextService}` : null]
      .filter((v): v is string => v != null)
      .join(' · ');
    const interactive = onClick != null;

    return (
      <div
        ref={ref}
        style={style}
        {...(interactive
          ? {
              role: 'button',
              tabIndex: 0,
              'aria-label': `${name}, ${assetTag}, ${sd.label}`,
              onClick,
              onKeyDown: (e: React.KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick?.();
                }
              },
            }
          : {})}
        className={cn(
          'flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
          interactive && 'cursor-pointer',
          className
        )}
      >
        <span
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-[var(--xen-radius-md)]',
            DISC_TINT[sd.slot]
          )}
        >
          <Icon glyph={glyph} aria-label="Equipment" />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-base font-semibold text-on-surface">{name}</span>
          <div className="flex items-center gap-[var(--xen-space-xs)]">
            <span className="text-xs text-muted">{assetTag}</span>
            {meta !== '' ? <span className="text-xs text-muted">· {meta}</span> : null}
          </div>
        </div>
        <Badge tone={sd.tone}>{`${sd.glyph} ${sd.label}`}</Badge>
      </div>
    );
  }
);
