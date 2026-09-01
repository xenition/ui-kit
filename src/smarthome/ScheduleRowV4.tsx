import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { Switch } from '../primitives/Switch';
import { Badge } from '../primitives/Badge';
import type { ScheduleRowProps } from './ScheduleRow';

/** Drop-in for {@link ScheduleRowProps} — same props, the V4 "ambient" design. */
export type ScheduleRowV4Props = ScheduleRowProps;

/**
 * ScheduleRow — **V4** "ambient" design (web parity of the native V4). The
 * control-panel take on a schedule row: an **enabled schedule glows** — when on
 * the row takes a soft `primary`-tinted wash, a primary border, and a glowing
 * clock disc; disabled schedules stay calm and muted. The **time reads big and
 * legible**, active weekday pills carry a soft-`primary` tint, and the scene /
 * action label sits alongside. The enable state is carried by the {@link Switch}'s
 * `aria-checked` (not color alone). Same props/behavior as {@link ScheduleRowProps};
 * all colors from `--xen-*` token classes (no literals).
 */
export const ScheduleRowV4 = React.forwardRef<HTMLDivElement, ScheduleRowV4Props>(function ScheduleRowV4(
  { label, time, days, icon = '⏰', enabled = false, onToggle, last = false, className, style },
  ref
) {
  const dayList = Array.isArray(days) ? days.filter((d) => d != null && d !== '') : [];

  return (
    <div
      ref={ref}
      style={style}
      className={cn(
        'flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border p-[var(--xen-space-md)]',
        enabled ? 'border-primary/50 bg-primary/[0.08] shadow-md' : 'border-border bg-surface shadow-sm',
        !last && 'mb-[var(--xen-space-sm)]',
        !enabled && 'opacity-70',
        className
      )}
    >
      {/* Glowing clock disc — the ambient signature. */}
      <span
        className={cn(
          'flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] border',
          enabled ? 'border-primary/40 bg-primary/15' : 'border-border bg-on-surface/5'
        )}
      >
        <Icon glyph={icon} color={enabled ? 'primary' : 'muted'} size="lg" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-[var(--xen-space-xs)]">
          {time != null ? <span className="font-heading text-xl font-bold text-on-surface">{time}</span> : null}
          <span className="min-w-0 shrink truncate text-sm text-muted">{label}</span>
        </div>
        {dayList.length > 0 ? (
          <div className="mt-1 flex flex-wrap gap-1">
            {dayList.map((day, i) => (
              <Badge key={`${day}-${i}`} tone={enabled ? 'primary' : 'neutral'} variant="soft" size="sm">
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
