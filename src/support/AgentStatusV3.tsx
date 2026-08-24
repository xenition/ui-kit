import * as React from 'react';
import { cn } from '../primitives/cn';
import { activateOnKey } from './internal';
import type { AgentStatusProps, AgentPresence } from './AgentStatus';

/** Same public contract as {@link AgentStatus} — a drop-in alternate design. */
export type AgentStatusV3Props = AgentStatusProps;

const PRESENCE: Record<AgentPresence, { label: string; dot: string }> = {
  online: { label: 'Online', dot: 'bg-success' },
  away: { label: 'Away', dot: 'bg-warn' },
  offline: { label: 'Offline', dot: 'bg-neutral-400' },
};

/**
 * AgentStatus, redesigned (v3): an **inline presence tag**. A tiny status dot, the
 * name, and the presence word (with an optional detail) — all on one dense line,
 * no avatar. The opposite of v2's chip. Status is dot + word, never color alone.
 * Same props, token-only.
 */
export const AgentStatusV3 = React.forwardRef<HTMLDivElement, AgentStatusV3Props>(function AgentStatusV3(
  { presence, name, avatar, detail, variant, onClick, className, ...rest },
  ref
) {
  void variant;
  void avatar;
  const p = PRESENCE[presence];
  const interactive = typeof onClick === 'function';

  return (
    <div
      ref={ref}
      data-xen-agent-status=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={`${name ?? 'Agent'}, ${p.label}`}
      onClick={interactive ? () => onClick?.() : undefined}
      onKeyDown={interactive ? activateOnKey(() => onClick?.()) : undefined}
      className={cn('inline-flex items-center gap-2 text-sm', interactive && 'cursor-pointer', className)}
      {...rest}
    >
      <span className={cn('inline-block h-2.5 w-2.5 rounded-full', p.dot)} aria-hidden />
      {name ? <span className="font-medium text-on-surface">{name}</span> : null}
      <span className="text-muted">{p.label}{detail ? ` · ${detail}` : ''}</span>
    </div>
  );
});
