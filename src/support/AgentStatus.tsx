import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { StatusDot } from '../primitives/StatusDot';
import { activateOnKey } from './internal';

/** Availability of a support agent. */
export type AgentPresence = 'online' | 'away' | 'offline';

export interface AgentStatusProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Presence state. Drives dot tone + label — never color alone. */
  presence: AgentPresence;
  /** Agent display name. */
  name?: string;
  /** Optional avatar URL (falls back to initials). */
  avatar?: string;
  /** Optional secondary line (e.g. `"3 active chats"`). */
  detail?: string;
  /** `dot` = compact dot+label; `row` = avatar + name + status line. */
  variant?: 'dot' | 'row';
  /** Fires when the row is activated (only meaningful for `row`). */
  onClick?: () => void;
}

interface PresenceSpec {
  label: string;
  /** Token text class for the label. */
  textCls: string;
}

const PRESENCE: Record<AgentPresence, PresenceSpec> = {
  online: { label: 'Online', textCls: 'text-success' },
  away: { label: 'Away', textCls: 'text-warn' },
  offline: { label: 'Offline', textCls: 'text-muted' },
};

/** Presence dot — reuses `StatusDot` for online/away; a muted token dot offline. */
function PresenceDot({ presence, size }: { presence: AgentPresence; size?: number }): React.ReactElement {
  if (presence === 'offline') {
    return (
      <span
        aria-hidden="true"
        className="inline-block rounded-full bg-muted"
        style={{ width: size ?? 8, height: size ?? 8 }}
      />
    );
  }
  return <StatusDot tone={presence === 'online' ? 'success' : 'warn'} pulse={presence === 'online'} />;
}

/**
 * Agent availability indicator (`online`/`away`/`offline`). The `dot` variant
 * is a status dot + text label; the `row` variant adds an avatar and an optional
 * detail line and can be activated (click / Enter / Space). Presence is
 * announced by text and dot, not color alone. Online reuses the pulsing
 * `StatusDot` (inert under reduced-motion); offline is a muted token dot. Token
 * classes only — no literal hex.
 */
export const AgentStatus = React.forwardRef<HTMLDivElement, AgentStatusProps>(function AgentStatus(
  { presence, name, avatar, detail, variant = 'row', onClick, className, ...rest },
  ref
) {
  const spec = PRESENCE[presence] ?? PRESENCE.offline;
  const a11y = `${name ? `${name}, ` : ''}${spec.label}${detail ? `, ${detail}` : ''}`;

  if (variant === 'dot') {
    return (
      <span
        ref={ref as React.Ref<HTMLDivElement>}
        role="img"
        aria-label={a11y}
        className={cn('inline-flex items-center gap-1', className)}
        {...rest}
      >
        <PresenceDot presence={presence} />
        <span className={cn('text-sm font-semibold', spec.textCls)}>{spec.label}</span>
      </span>
    );
  }

  const interactive = typeof onClick === 'function';
  const body = (
    <>
      <Avatar size="md" name={name} src={avatar} />
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        {name ? (
          <span className="truncate text-base font-semibold text-on-surface">{name}</span>
        ) : null}
        <span className="flex items-center gap-1">
          <PresenceDot presence={presence} size={7} />
          <span className={cn('text-xs font-semibold', spec.textCls)}>{spec.label}</span>
          {detail ? <span className="text-xs text-muted">· {detail}</span> : null}
        </span>
      </span>
    </>
  );

  return (
    <div
      ref={ref}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={a11y}
      onClick={onClick}
      onKeyDown={interactive ? activateOnKey(onClick!) : undefined}
      className={cn(
        'flex items-center gap-3',
        interactive &&
          'cursor-pointer rounded-[var(--xen-radius-md)] hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...rest}
    >
      {body}
    </div>
  );
});
