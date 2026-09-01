import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { activateOnKey } from './internal';
import type { AgentStatusProps, AgentPresence } from './AgentStatus';

/** Drop-in for {@link AgentStatusProps} — same props, the V4 "console" design. */
export type AgentStatusV4Props = AgentStatusProps;

interface PresenceSpec {
  glyph: string;
  label: string;
  /** Soft-tint pill classes (bg + text) — presence is never color-only. */
  pill: string;
}

// online → success, away → warn, offline → muted. Each carries a distinct glyph
// so presence reads by shape as well as color.
const PRESENCE: Record<AgentPresence, PresenceSpec> = {
  online: { glyph: '●', label: 'Online', pill: 'bg-success/10 text-success' },
  away: { glyph: '◐', label: 'Away', pill: 'bg-warn/10 text-warn' },
  offline: { glyph: '○', label: 'Offline', pill: 'bg-muted/10 text-muted' },
};

/**
 * AgentStatus — **V4** "calm console" design (web parity of the native V4). The
 * agent-workspace take on a presence indicator: an avatar + name with a soft-tint
 * presence pill carrying glyph + label (presence is encoded by glyph **and**
 * color, never color alone), plus an optional detail chip. The compact `dot`
 * variant is just the pill; the `row` variant is an elevated-friendly, tappable
 * ≥44px row (click / Enter / Space). Same props/behavior as
 * {@link AgentStatusProps}; all colors from `--xen-*` token classes (no literal
 * hex).
 */
export const AgentStatusV4 = React.forwardRef<HTMLDivElement, AgentStatusV4Props>(function AgentStatusV4(
  { presence, name, avatar, detail, variant = 'row', onClick, className, ...rest },
  ref
) {
  const spec = PRESENCE[presence] ?? PRESENCE.offline;
  const a11y = `${name ? `${name}, ` : ''}${spec.label}${detail ? `, ${detail}` : ''}`;

  const pill = (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold',
        spec.pill
      )}
    >
      <span aria-hidden="true">{spec.glyph}</span>
      {spec.label}
    </span>
  );

  if (variant === 'dot') {
    return (
      <span
        ref={ref as React.Ref<HTMLDivElement>}
        role="img"
        aria-label={a11y}
        className={cn('inline-flex items-center', className)}
        {...rest}
      >
        {pill}
      </span>
    );
  }

  const interactive = typeof onClick === 'function';

  return (
    <div
      ref={ref}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={a11y}
      onClick={onClick}
      onKeyDown={interactive ? activateOnKey(onClick!) : undefined}
      className={cn(
        'flex min-h-[44px] items-center gap-3 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-2 shadow-sm',
        interactive &&
          'cursor-pointer hover:bg-on-surface/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...rest}
    >
      <Avatar size="md" name={name} src={avatar} />
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        {name ? (
          <span className="truncate text-base font-bold text-on-surface">{name}</span>
        ) : null}
        <span className="flex flex-wrap items-center gap-2">
          {pill}
          {detail ? (
            <span className="rounded-full bg-on-surface/[0.05] px-2 py-0.5 text-xs font-semibold text-muted">
              {detail}
            </span>
          ) : null}
        </span>
      </span>
    </div>
  );
});
