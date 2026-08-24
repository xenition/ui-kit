import * as React from 'react';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { Switch } from '../primitives/Switch';
import { EmptyState } from '../commerce/EmptyState';
import { DeviceToggleRow } from './DeviceToggleRow';

/** A device summarized inside a room. */
export interface RoomDevice {
  /** Stable identity. */
  id: string;
  /** Row label. */
  label: string;
  /** Row glyph/emoji. */
  icon?: string;
  /** Secondary line. */
  subtitle?: string;
  /** Whether the device is on. */
  on?: boolean;
  /** Whether the device is unreachable. */
  offline?: boolean;
}

export interface RoomGroupProps {
  /** Room name (e.g. "Living Room"). */
  name: string;
  /** Leading glyph/emoji. Default "🛋️". */
  icon?: string;
  /** Devices in the room. Empty → an inline empty state. */
  devices?: RoomDevice[];
  /** Fires with `(id, next)` when a device row is toggled. */
  onDeviceToggle?: (id: string, next: boolean) => void;
  /** Fires with `next` when the header "all" switch is toggled. */
  onToggleAll?: (next: boolean) => void;
  /** Copy for the empty state title. */
  emptyTitle?: string;
  /** Optional extra content rendered under the device list. */
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * A room grouping card — a header (glyph, name, "N on" summary + an all-devices
 * {@link Switch}) over a list of {@link DeviceToggleRow}s. The header switch is
 * on when **every** reachable device is on and fires `onToggleAll`; the summary
 * count is derived defensively from the `devices` array. When there are no
 * devices it renders the shared {@link EmptyState} instead of an empty list.
 * Token-bound throughout — no literal colors.
 */
export const RoomGroup = React.forwardRef<HTMLDivElement, RoomGroupProps>(function RoomGroup(
  { name, icon = '🛋️', devices, onDeviceToggle, onToggleAll, emptyTitle = 'No devices in this room', children, className, style },
  ref
) {
  const list = Array.isArray(devices) ? devices : [];
  const reachable = list.filter((d) => !d.offline);
  const onCount = reachable.filter((d) => d.on).length;
  const allOn = reachable.length > 0 && onCount === reachable.length;

  return (
    <Card ref={ref} style={style} className={className}>
      <div className="flex items-center gap-[var(--xen-space-sm)]">
        <Icon glyph={icon} color="onSurface" size="xl" />
        <div className="min-w-0 flex-1">
          <p className="truncate font-heading text-lg font-bold text-on-surface">{name}</p>
          <p className="text-xs text-muted">
            {list.length === 0
              ? 'No devices'
              : `${onCount} of ${reachable.length} on${list.length !== reachable.length ? ` · ${list.length - reachable.length} offline` : ''}`}
          </p>
        </div>
        {reachable.length > 0 ? (
          <Switch checked={allOn} onCheckedChange={onToggleAll} aria-label={`Toggle all devices in ${name}`} />
        ) : null}
      </div>

      {list.length === 0 ? (
        <div className="mt-[var(--xen-space-md)]">
          <EmptyState
            icon={<Icon glyph="🔌" color="muted" size="2xl" />}
            title={emptyTitle}
            description="Add a device to control it from here."
          />
        </div>
      ) : (
        <div className="mt-[var(--xen-space-sm)]">
          {list.map((d, i) => (
            <DeviceToggleRow
              key={d.id}
              label={d.label}
              icon={d.icon}
              subtitle={d.subtitle}
              checked={!!d.on}
              offline={!!d.offline}
              last={i === list.length - 1}
              onCheckedChange={(next) => onDeviceToggle?.(d.id, next)}
            />
          ))}
        </div>
      )}

      {children != null ? <div className="mt-[var(--xen-space-sm)]">{children}</div> : null}
    </Card>
  );
});
