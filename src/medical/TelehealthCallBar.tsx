import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { Button } from '../primitives/Button';

export type CallState = 'idle' | 'connecting' | 'active' | 'ended';

const STATE_META: Record<CallState, { label: string; glyph: string }> = {
  idle: { label: 'Ready to connect', glyph: '📹' },
  connecting: { label: 'Connecting…', glyph: '⏳' },
  active: { label: 'In call', glyph: '🟢' },
  ended: { label: 'Call ended', glyph: '⏹' },
};

interface RoundControlProps {
  glyph: string;
  label: string;
  danger?: boolean;
  onClick?: () => void;
}

function RoundControl({ glyph, label, danger = false, onClick }: RoundControlProps): React.ReactElement {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        'inline-flex h-12 w-12 items-center justify-center rounded-full text-xl transition-opacity hover:opacity-80',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1',
        danger ? 'bg-danger text-on-danger' : 'bg-neutral-100 text-on-surface'
      )}
    >
      <span aria-hidden="true">{glyph}</span>
    </button>
  );
}

export interface TelehealthCallBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** The other party's display name. */
  participantName: string;
  /** Optional avatar image for the participant. */
  participantAvatar?: string;
  /** Call lifecycle state; drives the status line and controls. Defaults `idle`. */
  state?: CallState;
  /** Preformatted elapsed time, e.g. "04:12". Shown while `active`. */
  elapsed?: string;
  /** Whether the local mic is muted. */
  muted?: boolean;
  /** Whether the local camera is off. */
  cameraOff?: boolean;
  /** Fires when the join/connect action is pressed (shown while `idle`). */
  onJoin?: () => void;
  /** Toggles the mic; receives the next muted state. */
  onToggleMute?: (nextMuted: boolean) => void;
  /** Toggles the camera; receives the next off state. */
  onToggleCamera?: (nextOff: boolean) => void;
  /** Ends the call. */
  onEnd?: () => void;
}

/**
 * A persistent telehealth call bar — the web mirror of the native
 * `TelehealthCallBar`. Shows the participant's identity, a connection status
 * line (idle / connecting / active / ended), an elapsed timer, and the standard
 * round controls (mute, camera, end) plus a "Join call" CTA while idle.
 * Mute/camera state is conveyed by a glyph swap + `aria-label`, not color
 * alone. Composes `Avatar` + `Button`; token-only colors. Informational UI only
 * — not a medical device.
 */
export const TelehealthCallBar = React.forwardRef<HTMLDivElement, TelehealthCallBarProps>(
  function TelehealthCallBar(
    {
      participantName,
      participantAvatar,
      state = 'idle',
      elapsed,
      muted = false,
      cameraOff = false,
      onJoin,
      onToggleMute,
      onToggleCamera,
      onEnd,
      className,
      ...rest
    },
    ref
  ) {
    const meta = STATE_META[state] ?? STATE_META.idle;
    const isActive = state === 'active';
    const isIdle = state === 'idle';

    return (
      <div
        ref={ref}
        data-xen-telehealth-call-bar=""
        aria-label={`Telehealth call with ${participantName}, ${meta.label}${
          isActive && elapsed ? `, ${elapsed}` : ''
        }`}
        className={cn(
          'flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)] text-on-surface',
          className
        )}
        {...rest}
      >
        <Avatar src={participantAvatar} name={participantName} size="md" />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-base font-bold text-on-surface">{participantName}</span>
          <span className="truncate text-xs text-muted">
            <span aria-hidden="true">{meta.glyph}</span> {meta.label}
            {isActive && elapsed ? `  ·  ${elapsed}` : ''}
          </span>
        </div>

        {isIdle ? (
          <Button variant="primary" onClick={() => onJoin?.()}>
            <span aria-hidden="true" className="mr-[var(--xen-space-xs)]">
              📞
            </span>
            Join call
          </Button>
        ) : state === 'ended' ? null : (
          <div className="flex items-center gap-[var(--xen-space-sm)]">
            <RoundControl
              glyph={muted ? '🔇' : '🎙'}
              label={muted ? 'Unmute microphone' : 'Mute microphone'}
              onClick={() => onToggleMute?.(!muted)}
            />
            <RoundControl
              glyph={cameraOff ? '📷' : '📹'}
              label={cameraOff ? 'Turn camera on' : 'Turn camera off'}
              onClick={() => onToggleCamera?.(!cameraOff)}
            />
            <RoundControl glyph="📵" label="End call" danger onClick={() => onEnd?.()} />
          </div>
        )}
      </div>
    );
  }
);
