import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { Switch } from '../primitives/Switch';
import { Badge } from '../primitives/Badge';

export interface ScheduleRowProps {
  /** Schedule label (e.g. "Wake-up lights"). */
  label: string;
  /** Time string (e.g. "06:30", "Sunset"). */
  time?: string;
  /** Active weekdays (e.g. ["Mon","Tue"]). Rendered as chips; guarded when empty. */
  days?: string[];
  /** Leading glyph/emoji. Default "⏰". */
  icon?: string;
  /** Whether the schedule is enabled. */
  enabled?: boolean;
  /** Fires with the requested enabled value. */
  onToggle?: (next: boolean) => void;
  /** Hide the bottom divider. */
  last?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * A schedule / timer row — a clock glyph, the time (emphasized), a label, and a
 * row of weekday chips, closed by an enable {@link Switch}. Disabled schedules
 * dim to `muted`; the enabled state is carried by the switch's `aria-checked`
 * state (not color). `days` is mapped defensively (nothing renders when empty),
 * and a hairline divider separates rows unless `last`. Token-bound throughout.
 */
export const ScheduleRow = React.forwardRef<HTMLDivElement, ScheduleRowProps>(function ScheduleRow(
  { label, time, days, icon = '⏰', enabled = false, onToggle, last = false, className, style },
  ref
) {
  const dayList = Array.isArray(days) ? days.filter((d) => d != null && d !== '') : [];

  return (
    <div
      ref={ref}
      style={style}
      className={cn(
        'flex items-center gap-[var(--xen-space-sm)] py-[var(--xen-space-sm)]',
        !last && 'border-b border-border',
        !enabled && 'opacity-70',
        className
      )}
    >
      <Icon glyph={icon} color={enabled ? 'primary' : 'muted'} size="lg" />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-[var(--xen-space-xs)]">
          {time != null ? <span className="font-heading text-base font-bold text-on-surface">{time}</span> : null}
          <span className="min-w-0 shrink truncate text-sm text-muted">{label}</span>
        </div>
        {dayList.length > 0 ? (
          <div className="mt-1 flex flex-wrap gap-1">
            {dayList.map((day, i) => (
              <Badge key={`${day}-${i}`} tone="neutral">
                {day}
              </Badge>
            ))}
          </div>
        ) : null}
      </div>
      <Switch checked={enabled} onCheckedChange={onToggle} aria-label={`${label} schedule`} />
    </div>
  );
});
