import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Icon, type IconColor } from '../primitives/Icon';
import { Button, type ButtonVariant } from '../primitives/Button';
import { Badge, type BadgeTone } from '../primitives/Badge';
import type { LockControlProps, LockState } from './LockControl';

/** Drop-in for {@link LockControlProps} — same props, the V4 "ambient" design. */
export type LockControlV4Props = LockControlProps;

const STATE_META: Record<
  LockState,
  { glyph: string; label: string; accent: IconColor; tone: BadgeTone; glow: boolean }
> = {
  locked: { glyph: '🔒', label: 'Locked', accent: 'primary', tone: 'primary', glow: false },
  unlocked: { glyph: '🔓', label: 'Unlocked', accent: 'warn', tone: 'warn', glow: true },
  jammed: { glyph: '⚠️', label: 'Jammed', accent: 'danger', tone: 'danger', glow: false },
  offline: { glyph: '🚫', label: 'Offline', accent: 'muted', tone: 'muted', glow: false },
};

/** Map each state's accent slot to the soft-tint/border/glow token classes. */
const ACCENT_CLASS: Record<LockState, { disc: string; glow: string }> = {
  locked: { disc: 'border-primary/40 bg-primary/10', glow: '' },
  unlocked: { disc: 'border-warn/50 bg-warn/15', glow: 'shadow-md' },
  jammed: { disc: 'border-danger/40 bg-danger/10', glow: '' },
  offline: { disc: 'border-border bg-on-surface/5', glow: '' },
};

/**
 * LockControl — **V4** "ambient" design (web parity of the native V4). A calm
 * control-panel lock: a **big state glyph sits in a state-tinted disc** — `locked`
 * takes the primary slot, `unlocked` glows softly (warn wash + shadow) so an open
 * lock reads at a glance, `jammed`→danger, `offline`→muted. A status {@link Badge}
 * + optional low-battery hint keep the meaning textual (never color alone), over a
 * single big lock/unlock {@link Button} (≥44px, full width). The action flips
 * between "Lock"/"Unlock", uses the `danger` variant when unlocking, and is
 * disabled when `offline`/`jammed` or `busy` (the web {@link Button} has no
 * `loading`, so busy maps to disabled + a "Working…" label). Same props/behavior
 * as {@link LockControlProps}; all colors from `--xen-*` token classes (no
 * literals).
 */
export const LockControlV4 = React.forwardRef<HTMLDivElement, LockControlV4Props>(function LockControlV4(
  { name, state = 'locked', batteryPct, onToggle, busy = false, className, style, ...rest },
  ref
) {
  const meta = STATE_META[state];
  const accentClass = ACCENT_CLASS[state];
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
    <Card
      ref={ref}
      style={style}
      className={cn(state === 'offline' && 'opacity-70', accentClass.glow, className)}
      {...rest}
    >
      <div className="flex items-center gap-[var(--xen-space-sm)]">
        {/* State-tinted lock disc — glows soft when unlocked. */}
        <span
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-full border',
            accentClass.disc
          )}
        >
          <Icon glyph={meta.glyph} color={meta.accent} size="xl" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-semibold text-on-surface">{name}</p>
          <div className="mt-0.5 flex items-center gap-[var(--xen-space-xs)]">
            <Badge tone={meta.tone} variant="soft">
              {meta.label}
            </Badge>
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
          className="min-h-11 w-full"
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
