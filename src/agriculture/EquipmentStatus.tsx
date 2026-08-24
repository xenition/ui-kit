import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Icon, Badge, Progress } from '../primitives';
import type { BadgeTone, IconColor } from '../primitives';

/** Operational state of a machine. Colors the status label + chip. */
export type EquipmentState = 'operational' | 'idle' | 'maintenance' | 'offline';

export interface EquipmentStatusProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Machine name (e.g. "Tractor 04"). */
  name: string;
  /** Equipment type / model line (e.g. "John Deere 6M"). */
  type?: string;
  /** Leading glyph/emoji. Default `'🚜'`. */
  icon?: string;
  /** Operational state. Default `'operational'`. */
  state?: EquipmentState;
  /** Fuel or battery level 0–100 (rendered as a bar). Clamped/guarded. */
  fuelPct?: number;
  /** Label for the level bar (e.g. "Fuel", "Battery"). Default "Fuel". */
  fuelLabel?: string;
  /** Hours / usage hint (e.g. "1,204 hrs"). */
  hours?: string;
  /** Fires when the card is activated. */
  onClick?: () => void;
}

const STATE_META: Record<EquipmentState, { label: string; tone: BadgeTone; icon: IconColor }> = {
  operational: { label: 'Operational', tone: 'success', icon: 'success' },
  idle: { label: 'Idle', tone: 'neutral', icon: 'muted' },
  maintenance: { label: 'Maintenance', tone: 'warn', icon: 'warn' },
  offline: { label: 'Offline', tone: 'danger', icon: 'danger' },
};

/**
 * An equipment status card — machine glyph, name + type, and an operational
 * {@link Badge} whose text label (not color alone) carries the state. An
 * optional fuel/battery {@link Progress} bar and usage-hours line sit below.
 * The level is clamped to [0,100]; a low reading is stated as "· Low" text, not
 * color alone. When `onClick` is set the card is an accessible `role="button"`
 * with keyboard activation. Token-bound throughout — no literal colors.
 */
export const EquipmentStatus = React.forwardRef<HTMLDivElement, EquipmentStatusProps>(
  function EquipmentStatus(
    {
      name,
      type,
      icon = '🚜',
      state = 'operational',
      fuelPct,
      fuelLabel = 'Fuel',
      hours,
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    const meta = STATE_META[state];
    const pct = typeof fuelPct === 'number' ? Math.max(0, Math.min(100, fuelPct)) : undefined;
    const lowFuel = pct != null && pct < 20;
    const interactive = typeof onClick === 'function';
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
      if (interactive && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick?.();
      }
    };

    return (
      <Card
        ref={ref}
        data-xen-equipment-status=""
        className={cn(
          interactive && 'cursor-pointer transition-colors hover:bg-neutral-50',
          className
        )}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={interactive ? `${name}, ${meta.label}` : undefined}
        onClick={interactive ? () => onClick?.() : undefined}
        onKeyDown={interactive ? handleKeyDown : undefined}
        {...rest}
      >
        <div className="flex items-center gap-2">
          <Icon glyph={icon} size="xl" color={meta.icon} />
          <div className="min-w-0 flex-1">
            <p className="truncate font-heading text-base font-bold text-on-surface">{name}</p>
            {type != null ? <p className="truncate text-sm text-muted">{type}</p> : null}
          </div>
          <Badge tone={meta.tone}>{meta.label}</Badge>
        </div>

        {pct != null ? (
          <div className="mt-3">
            <div className="mb-1 flex justify-between">
              <span className="text-xs text-muted">{fuelLabel}</span>
              <span
                className={cn(
                  'text-xs font-semibold',
                  lowFuel ? 'text-danger' : 'text-on-surface'
                )}
              >
                {pct}%{lowFuel ? ' · Low' : ''}
              </span>
            </div>
            <Progress value={pct} tone={lowFuel ? 'danger' : 'primary'} />
          </div>
        ) : null}

        {hours != null ? <p className="mt-2 text-xs text-muted">⏱️ {hours}</p> : null}
      </Card>
    );
  }
);
