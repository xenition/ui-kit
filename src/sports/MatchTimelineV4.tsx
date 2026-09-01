import * as React from 'react';
import { cn } from '../primitives/cn';
import type { MatchTimelineProps, MatchEvent, MatchEventKind } from './MatchTimeline';

/** Drop-in for {@link MatchTimelineProps} — same props, the V4 "broadcast" design. */
export type MatchTimelineV4Props = MatchTimelineProps;

/** Glyph + accessible label + semantic tint per kind (color reinforces the glyph, never alone). */
const EVENT_META: Record<
  MatchEventKind,
  { glyph: string; label: string; node: string; ink: string }
> = {
  goal: { glyph: '⚽', label: 'Goal', node: 'bg-primary/10', ink: 'text-primary' },
  'own-goal': { glyph: '🥅', label: 'Own goal', node: 'bg-warn/10', ink: 'text-warn' },
  penalty: { glyph: '🅿', label: 'Penalty', node: 'bg-primary/10', ink: 'text-primary' },
  yellow: { glyph: '🟨', label: 'Yellow card', node: 'bg-warn/10', ink: 'text-warn' },
  red: { glyph: '🟥', label: 'Red card', node: 'bg-danger/10', ink: 'text-danger' },
  sub: { glyph: '🔁', label: 'Substitution', node: 'bg-success/10', ink: 'text-success' },
  var: { glyph: '📺', label: 'VAR', node: 'bg-muted/10', ink: 'text-muted' },
};

/**
 * MatchTimeline — **V4** "broadcast" design (web parity of the native V4). The
 * matchday feed: an elevated card with a center rail, each event hung on the
 * home (left) or away (right) side and anchored by a round node carrying the
 * kind glyph (goal ⚽ / card 🟨 / sub 🔁) tinted from its semantic token, plus a
 * bold minute chip on the rail. Kind is always legible from glyph + shape, not
 * color alone. Same props/behavior as {@link MatchTimelineProps}; all colors
 * from `--xen-*` token classes (no literals).
 */
export const MatchTimelineV4 = React.forwardRef<HTMLDivElement, MatchTimelineV4Props>(
  function MatchTimelineV4(
    {
      homeLabel = 'Home',
      awayLabel = 'Away',
      events,
      emptyLabel = 'No events yet',
      className,
      ...rest
    },
    ref
  ) {
    const shell = cn(
      'flex flex-col gap-2 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-4 text-on-surface shadow-sm',
      className
    );

    const header = (
      <div className="flex justify-between">
        <span className="flex-1 truncate text-sm font-extrabold text-primary">{homeLabel}</span>
        <span className="flex-1 truncate text-right text-sm font-extrabold text-accent">
          {awayLabel}
        </span>
      </div>
    );

    if (events.length === 0) {
      return (
        <div ref={ref} className={shell} {...rest}>
          {header}
          <p className="py-3 text-center text-sm text-muted">{emptyLabel}</p>
        </div>
      );
    }

    const cell = (e: MatchEvent, mine: boolean): React.ReactElement => {
      const meta = EVENT_META[e.kind] ?? EVENT_META.goal;
      if (!mine) return <div className="flex-1" />;
      const home = e.side === 'home';
      return (
        <div className={cn('flex flex-1', home ? 'justify-end' : 'justify-start')}>
          <div className={cn('flex items-center gap-2', home ? 'flex-row' : 'flex-row-reverse')}>
            <div className={cn('flex min-w-0 flex-col', home ? 'items-end' : 'items-start')}>
              <span className="truncate text-sm font-semibold text-on-surface">{e.label}</span>
              {e.detail ? <span className="truncate text-xs text-muted">{e.detail}</span> : null}
            </div>
            <span
              aria-hidden="true"
              className={cn(
                'flex h-7 w-7 flex-none items-center justify-center rounded-full text-base leading-none',
                meta.node,
                meta.ink
              )}
            >
              {meta.glyph}
            </span>
          </div>
        </div>
      );
    };

    return (
      <div ref={ref} role="list" className={shell} {...rest}>
        {header}
        {/* Center rail — a token hairline behind the minute chips. */}
        <div className="relative flex flex-col gap-2">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-border"
          />
          {events.map((e) => {
            const meta = EVENT_META[e.kind] ?? EVENT_META.goal;
            return (
              <div
                key={e.id}
                role="listitem"
                aria-label={`${e.minute}, ${meta.label}, ${
                  e.side === 'home' ? homeLabel : awayLabel
                }: ${e.label}${e.detail ? `, ${e.detail}` : ''}`}
                className="relative flex items-center gap-2"
              >
                {cell(e, e.side === 'home')}
                <div className="flex min-w-[44px] justify-center">
                  <span className="rounded-full border border-border bg-surface px-1.5 py-px text-xs font-extrabold text-on-surface">
                    {e.minute}
                  </span>
                </div>
                {cell(e, e.side === 'away')}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

export type { MatchEvent, MatchEventKind };
