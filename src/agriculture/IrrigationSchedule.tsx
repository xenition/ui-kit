import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Icon, Badge, Switch } from '../primitives';
import type { BadgeTone } from '../primitives';
import { EmptyState } from '../commerce';

/** Run status of an irrigation slot. */
export type IrrigationRunState = 'scheduled' | 'running' | 'done' | 'skipped';

/** A single irrigation slot / zone run. */
export interface IrrigationSlot {
  /** Stable key. */
  id: string;
  /** Zone / valve name (e.g. "Zone 1 · Drip"). */
  zone: string;
  /** Start time (e.g. "06:00"). */
  time?: string;
  /** Duration hint (e.g. "20 min"). */
  duration?: string;
  /** Run state — drives the state chip. Default `'scheduled'`. */
  state?: IrrigationRunState;
  /** Whether the slot is enabled. */
  enabled?: boolean;
}

export interface IrrigationScheduleProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Slots in run order. Empty → empty state. Guarded indexing. */
  slots: IrrigationSlot[];
  /** Card title. Default "Irrigation". */
  title?: string;
  /** Fires with the slot id + requested enabled value. */
  onToggle?: (id: string, next: boolean) => void;
  /** Empty-state title. */
  emptyTitle?: string;
}

const STATE_META: Record<IrrigationRunState, { label: string; tone: BadgeTone }> = {
  scheduled: { label: 'Scheduled', tone: 'neutral' },
  running: { label: 'Running', tone: 'primary' },
  done: { label: 'Done', tone: 'success' },
  skipped: { label: 'Skipped', tone: 'warn' },
};

/**
 * An irrigation schedule — a titled {@link Card} listing zone runs (zone, time,
 * duration) each with a run-state {@link Badge} and an enable {@link Switch}.
 * The enabled state rides the switch's a11y `checked` state (not color), and the
 * run state is stated as text. Toggling fires `onToggle(id, next)`. When `slots`
 * is empty an {@link EmptyState} stands in. Rows are keyed + indexed defensively.
 * Token-bound throughout — no literal colors.
 */
export const IrrigationSchedule = React.forwardRef<HTMLDivElement, IrrigationScheduleProps>(
  function IrrigationSchedule(
    { slots, title = 'Irrigation', onToggle, emptyTitle = 'No irrigation scheduled', className, ...rest },
    ref
  ) {
    const list = Array.isArray(slots) ? slots : [];

    return (
      <Card ref={ref} data-xen-irrigation-schedule="" className={className} {...rest}>
        <div className="flex items-center gap-1">
          <Icon glyph="🚿" color="primary" size="base" />
          <span className="flex-1 text-base font-semibold text-on-surface">{title}</span>
        </div>

        {list.length === 0 ? (
          <div className="mt-3">
            <EmptyState
              icon={<Icon glyph="💧" size="2xl" color="muted" />}
              title={emptyTitle}
              description="Add a zone run to get started."
            />
          </div>
        ) : (
          <div className="mt-1">
            {list.map((slot, i) => {
              const meta = STATE_META[slot.state ?? 'scheduled'];
              const enabled = slot.enabled ?? true;
              const isLast = i === list.length - 1;
              return (
                <div
                  key={slot.id ?? `slot-${i}`}
                  data-xen-irrigation-slot=""
                  className={cn(
                    'flex items-center gap-2 py-2',
                    !isLast && 'border-b border-border',
                    !enabled && 'opacity-60'
                  )}
                >
                  {slot.time != null ? (
                    <span className="w-[52px] font-heading text-sm font-bold text-on-surface">
                      {slot.time}
                    </span>
                  ) : null}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-on-surface">{slot.zone}</p>
                    {slot.duration != null ? (
                      <p className="text-xs text-muted">{slot.duration}</p>
                    ) : null}
                  </div>
                  <Badge tone={meta.tone}>{meta.label}</Badge>
                  <Switch
                    checked={enabled}
                    onCheckedChange={(next) => onToggle?.(slot.id, next)}
                    aria-label={`${slot.zone} irrigation`}
                  />
                </div>
              );
            })}
          </div>
        )}
      </Card>
    );
  }
);
