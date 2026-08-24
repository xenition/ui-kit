import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { EmptyState } from '../commerce/EmptyState';
import { VolumeFader } from './VolumeFader';
import { clamp, type MixerChannel } from './types';

export type MixerVariant = 'full' | 'compact';

export interface MixerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onVolumeChange'> {
  /** The channel strips to render. */
  channels: MixerChannel[];
  /**
   * - `full` — fader + mute/solo + meter per strip (default).
   * - `compact` — fader + mute only.
   */
  variant?: MixerVariant;
  /** Optional mixer title. */
  title?: string;
  /** Message shown when there are no channels. */
  emptyLabel?: string;
  /** Fires as a strip's fader is dragged. */
  onVolumeChange?: (channel: MixerChannel, value: number) => void;
  /** Fires when a strip's mute is toggled. */
  onToggleMute?: (channel: MixerChannel) => void;
  /** Fires when a strip's solo is toggled. */
  onToggleSolo?: (channel: MixerChannel) => void;
}

/**
 * A channel mixer — a UI shell only, no audio routing, and the DOM parity of
 * `native/music`'s `Mixer`. Each `MixerChannel` becomes a strip with a
 * `VolumeFader`, a mute toggle, and (in `full`) a solo toggle plus a level
 * meter. Mute / solo are surfaced in the control's `aria-pressed` and its label,
 * never by color alone. Renders an `EmptyState` when there are no channels.
 * Composes `Card`, `VolumeFader`; token-only.
 */
export const Mixer = React.forwardRef<HTMLDivElement, MixerProps>(function Mixer(
  {
    channels,
    variant = 'full',
    title,
    emptyLabel = 'No channels',
    onVolumeChange,
    onToggleMute,
    onToggleSolo,
    className,
    ...rest
  },
  ref
) {
  if (channels.length === 0) {
    return (
      <EmptyState
        ref={ref}
        icon={<Icon glyph="🎚️" size="2xl" color="muted" aria-label="Mixer" />}
        title={emptyLabel}
        className={className}
        {...rest}
      />
    );
  }

  return (
    <Card ref={ref} className={cn('flex flex-col gap-[var(--xen-space-md)]', className)} {...rest}>
      {title ? (
        <p role="heading" aria-level={3} className="text-base font-bold text-on-surface">
          {title}
        </p>
      ) : null}
      {channels.map((ch) => (
        <div key={ch.id} className="flex flex-col gap-[var(--xen-space-xs)]">
          <VolumeFader
            label={ch.name}
            value={ch.volume}
            muted={ch.muted}
            onValueChange={(v) => onVolumeChange?.(ch, v)}
          />
          {variant === 'full' ? <Meter level={ch.level} muted={ch.muted} /> : null}
          <div className="flex gap-[var(--xen-space-xs)]">
            <StripToggle
              label="M"
              a11y={`${ch.muted ? 'Unmute' : 'Mute'} ${ch.name}`}
              active={ch.muted === true}
              activeClass="border-warn bg-warn/20 text-warn"
              onClick={() => onToggleMute?.(ch)}
            />
            {variant === 'full' ? (
              <StripToggle
                label="S"
                a11y={`${ch.soloed ? 'Unsolo' : 'Solo'} ${ch.name}`}
                active={ch.soloed === true}
                activeClass="border-primary bg-primary/20 text-primary"
                onClick={() => onToggleSolo?.(ch)}
              />
            ) : null}
          </div>
        </div>
      ))}
    </Card>
  );
});

function Meter({ level, muted }: { level?: number; muted?: boolean }): React.ReactElement {
  const pct = muted ? 0 : clamp((level ?? 0) * 100, 0, 100);
  const tone = pct > 85 ? 'bg-danger' : pct > 60 ? 'bg-warn' : 'bg-success';
  return (
    <div
      role="img"
      aria-label={`Output level ${Math.round(pct)} percent`}
      className="h-1 overflow-hidden rounded-full bg-border"
    >
      <div className={cn('h-full', tone)} style={{ width: `${pct}%` }} />
    </div>
  );
}

function StripToggle({
  label,
  a11y,
  active,
  activeClass,
  onClick,
}: {
  label: string;
  a11y: string;
  active: boolean;
  activeClass: string;
  onClick: () => void;
}): React.ReactElement {
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={a11y}
      onClick={onClick}
      className={cn(
        'min-w-[32px] rounded-[var(--xen-radius-sm)] border px-[var(--xen-space-sm)] py-1 text-center text-xs font-bold transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
        active ? activeClass : 'border-border bg-transparent text-muted hover:opacity-80'
      )}
    >
      {label}
    </button>
  );
}
