import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { Switch } from '../primitives/Switch';
import { EmptyState } from '../commerce/EmptyState';
import { DeviceToggleRow } from './DeviceToggleRow';
import type { RoomGroupProps } from './RoomGroup';

/** Drop-in for {@link RoomGroupProps} — same props, the V4 "ambient" design. */
export type RoomGroupV4Props = RoomGroupProps;

/**
 * RoomGroup — **V4** "ambient" design (web parity of the native V4). The
 * control-panel take on a room card: when **any** device is on, the whole card
 * takes a soft `primary`-tinted wash, a primary border, and a glowing icon disc
 * so an active room reads at a glance. A **bold numeral** summarizes how many
 * devices are on, and a group all-on/off {@link Switch} keeps parity with the
 * base header. Idle rooms stay calm and muted; status is carried by icon + a
 * text summary (never color alone). Same props/behavior as
 * {@link RoomGroupProps}; all colors from `--xen-*` token classes (no literals).
 */
export const RoomGroupV4 = React.forwardRef<HTMLDivElement, RoomGroupV4Props>(function RoomGroupV4(
  { name, icon = '🛋️', devices, onDeviceToggle, onToggleAll, emptyTitle = 'No devices in this room', children, className, style },
  ref
) {
  const list = Array.isArray(devices) ? devices : [];
  const reachable = list.filter((d) => !d.offline);
  const onCount = reachable.filter((d) => d.on).length;
  const allOn = reachable.length > 0 && onCount === reachable.length;
  const anyOn = onCount > 0;
  const offlineCount = list.length - reachable.length;

  return (
    <Card
      ref={ref}
      style={style}
      className={cn(
        'rounded-[var(--xen-radius-lg)] border',
        anyOn ? 'border-primary/50 bg-primary/[0.08] shadow-md' : 'border-border bg-surface shadow-sm',
        className
      )}
    >
      <div className="flex items-center gap-[var(--xen-space-sm)]">
        {/* Glowing icon disc — the ambient signature. */}
        <span
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-[var(--xen-radius-md)] border',
            anyOn ? 'border-primary/40 bg-primary/15' : 'border-border bg-on-surface/5'
          )}
        >
          <Icon glyph={icon} color={anyOn ? 'primary' : 'muted'} size="xl" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-heading text-lg font-bold text-on-surface">{name}</p>
          <p className="text-xs text-muted">
            {list.length === 0 ? (
              'No devices'
            ) : (
              <>
                <span className="font-bold text-on-surface">{onCount}</span>
                {` of ${reachable.length} on${offlineCount > 0 ? ` · ${offlineCount} offline` : ''}`}
              </>
            )}
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
