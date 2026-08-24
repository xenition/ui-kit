import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { activateOnKey } from './internal';
import type { AgentStatusProps, AgentPresence } from './AgentStatus';

/** Same public contract as {@link AgentStatus} — a drop-in alternate design. */
export type AgentStatusV2Props = AgentStatusProps;

const PRESENCE: Record<AgentPresence, { label: string; dot: string; pill: string }> = {
  online: { label: 'Online', dot: 'bg-success', pill: 'bg-success/10 text-success' },
  away: { label: 'Away', dot: 'bg-warn', pill: 'bg-warn/10 text-warn' },
  offline: { label: 'Offline', dot: 'bg-neutral-400', pill: 'bg-neutral-100 text-muted' },
};

/**
 * AgentStatus, redesigned (v2): an **elevated agent chip**. The avatar carries a
 * presence dot, the name leads, and the presence renders as a tinted pill with
 * the detail beneath — a raised card row. Distinct from v1. Same props,
 * token-only.
 */
export const AgentStatusV2 = React.forwardRef<HTMLDivElement, AgentStatusV2Props>(function AgentStatusV2(
  { presence, name, avatar, detail, variant, onClick, className, ...rest },
  ref
) {
  void variant;
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
      className={cn('flex items-center gap-3 rounded-lg bg-surface p-2.5 shadow-sm', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className)}
      {...rest}
    >
      <div className="relative">
        <Avatar src={avatar} name={name} size="md" />
        <span className={cn('absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-surface', p.dot)} aria-hidden />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-on-surface">{name ?? 'Agent'}</p>
        {detail ? <p className="truncate text-xs text-muted">{detail}</p> : null}
      </div>
      <span className={cn('rounded-full px-2 py-0.5 text-xs font-semibold', p.pill)}>{p.label}</span>
    </div>
  );
});
