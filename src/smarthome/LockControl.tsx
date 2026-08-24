import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Icon, type IconColor } from '../primitives/Icon';
import { Button, type ButtonVariant } from '../primitives/Button';
import { Badge, type BadgeTone } from '../primitives/Badge';

/** State of a smart lock. */
export type LockState = 'locked' | 'unlocked' | 'jammed' | 'offline';

export interface LockControlProps {
  /** Lock display name (e.g. "Front Door"). */
  name: string;
  /** Current lock state. */
  state?: LockState;
  /** Battery percentage 0–100. Shows a low-battery hint under 20%. */
  batteryPct?: number;
  /** Fires with the requested locked value when the action button is clicked. */
  onToggle?: (next: boolean) => void;
  /** Show a busy label and block the action (command in flight). */
  busy?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const STATE_META: Record<
  LockState,
  { glyph: string; label: string; accent: IconColor; border: string; tone: BadgeTone }
> = {
  locked: { glyph: '🔒', label: 'Locked', accent: 'success', border: 'border-success', tone: 'success' },
  unlocked: { glyph: '🔓', label: 'Unlocked', accent: 'warn', border: 'border-warn', tone: 'warn' },
  jammed: { glyph: '⚠️', label: 'Jammed', accent: 'danger', border: 'border-danger', tone: 'danger' },
  offline: { glyph: '🚫', label: 'Offline', accent: 'muted', border: 'border-muted', tone: 'muted' },
};

/**
 * Smart-lock control — a state glyph + a status {@link Badge} over a single
 * lock/unlock {@link Button}. `state` selects the accent slot and a text label
 * (`locked`→success, `unlocked`→warn, `jammed`→danger, `offline`→muted) so the
 * status reads without color; the action button flips between "Lock"/"Unlock",
 * uses the `danger` variant when unlocking, and is disabled when
 * `offline`/`jammed` or `busy` (the web {@link Button} has no `loading`, so busy
 * maps to disabled + a "Working…" label). Optional `batteryPct` surfaces a low
 * hint under 20%. No literal colors.
 */
export const LockControl = React.forwardRef<HTMLDivElement, LockControlProps>(function LockControl(
  { name, state = 'locked', batteryPct, onToggle, busy = false, className, style },
  ref
) {
  const meta = STATE_META[state];
  const isLocked = state === 'locked';
  const actionable = state === 'locked' || state === 'unlocked';
  const lowBattery = typeof batteryPct === 'number' && batteryPct <= 20;
  const variant: ButtonVariant = isLocked ? 'primary' : 'danger';

  const label = busy
    ? 'Working…'
    : state === 'offline'
      ? 'Unavailable'
      : state === 'jammed'
        ? 'Jammed'
        : isLocked
          ? 'Unlock'
          : 'Lock';

  return (
    <Card ref={ref} style={style} className={cn(state === 'offline' && 'opacity-70', className)}>
      <div className="flex items-center gap-[var(--xen-space-sm)]">
        <span className={cn('flex h-11 w-11 items-center justify-center rounded-full border bg-surface', meta.border)}>
          <Icon glyph={meta.glyph} color={meta.accent} size="xl" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-semibold text-on-surface">{name}</p>
          <div className="mt-0.5 flex items-center gap-[var(--xen-space-xs)]">
            <Badge tone={meta.tone}>{meta.label}</Badge>
            {typeof batteryPct === 'number' ? (
              <span className={cn('text-xs', lowBattery ? 'text-danger' : 'text-muted')}>
                {`🔋 ${Math.round(Math.min(Math.max(batteryPct, 0), 100))}%`}
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-[var(--xen-space-md)]">
        <Button
          variant={variant}
          className="w-full"
          disabled={!actionable || busy}
          aria-busy={busy || undefined}
          onClick={() => onToggle?.(!isLocked)}
        >
          {label}
        </Button>
      </div>
    </Card>
  );
});
