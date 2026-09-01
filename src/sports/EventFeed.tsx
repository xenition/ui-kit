import * as React from 'react';
import { cn } from '../primitives/cn';

/** The kind of match event carried by an {@link EventFeedItem}. */
export type EventFeedKind =
  | 'goal'
  | 'own-goal'
  | 'yellow'
  | 'red'
  | 'sub'
  | 'var'
  | 'penalty';

/** One entry in the {@link EventFeed} — a single match moment. */
export interface EventFeedItem {
  /** Match minute label as text (e.g. `"45+2'"`, `"78'"`). */
  minute: string;
  /** The kind of event — selects the glyph and semantic tint. */
  kind: EventFeedKind;
  /** Human-readable description (e.g. `"Haaland (assist: De Bruyne)"`). */
  text: string;
  /**
   * Which team the event belongs to. When set the row aligns to that side
   * (home→left, away→right); when omitted the row is left-aligned.
   */
  side?: 'home' | 'away';
}

/** Glyph + accessible label + semantic tint per kind (color reinforces the glyph, never alone). */
const KIND_META: Record<EventFeedKind, { glyph: string; label: string; node: string; ink: string }> = {
  goal: { glyph: '⚽', label: 'Goal', node: 'bg-primary/10', ink: 'text-primary' },
  'own-goal': { glyph: '🥅', label: 'Own goal', node: 'bg-warn/10', ink: 'text-warn' },
  penalty: { glyph: '🅿', label: 'Penalty', node: 'bg-primary/10', ink: 'text-primary' },
  yellow: { glyph: '🟨', label: 'Yellow card', node: 'bg-warn/10', ink: 'text-warn' },
  red: { glyph: '🟥', label: 'Red card', node: 'bg-danger/10', ink: 'text-danger' },
  sub: { glyph: '🔁', label: 'Substitution', node: 'bg-success/10', ink: 'text-success' },
  var: { glyph: '📺', label: 'VAR', node: 'bg-muted/10', ink: 'text-muted' },
};

export interface EventFeedProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The match events, in the order they should appear (typically newest-first
   * or chronological — the caller controls it). Each renders as a row with a
   * minute chip, a kind glyph and its text.
   */
  events: readonly EventFeedItem[];
  /** Optional card heading (e.g. `"Key events"`). Omit for the list alone. */
  title?: string;
  /** Text shown when {@link events} is empty. Default `"No events yet"`. */
  emptyLabel?: string;
}

/**
 * EventFeed — **V4** "broadcast" design. A vertical feed of match moments on an
 * elevated card: each row pairs a bold minute chip with a round glyph node
 * (goal ⚽ / card 🟨·🟥 / sub 🔁 / VAR 📺) tinted from its semantic token and the
 * event text. Goals are emphasized (heavier text); rows with a `side` align
 * home→left / away→right. Kind is always legible from glyph + shape, not color
 * alone. All colors from `--xen-*` token classes (no literals); dark-mode safe.
 */
export const EventFeed = React.forwardRef<HTMLDivElement, EventFeedProps>(function EventFeed(
  { events, title, emptyLabel = 'No events yet', className, ...rest },
  ref
) {
  const shell = cn(
    'flex flex-col gap-2 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-4 text-on-surface shadow-sm',
    className
  );

  const header = title ? (
    <span className="text-sm font-extrabold text-on-surface">{title}</span>
  ) : null;

  if (events.length === 0) {
    return (
      <div ref={ref} className={shell} {...rest}>
        {header}
        <p className="py-3 text-center text-sm text-muted">{emptyLabel}</p>
      </div>
    );
  }

  return (
    <div ref={ref} className={shell} {...rest}>
      {header}
      <div role="list" className="flex flex-col gap-1.5">
        {events.map((e, i) => {
          const meta = KIND_META[e.kind] ?? KIND_META.goal;
          const isGoal = e.kind === 'goal' || e.kind === 'own-goal' || e.kind === 'penalty';
          const away = e.side === 'away';
          const a11y = `${e.minute}, ${meta.label}${
            e.side ? `, ${e.side === 'home' ? 'home' : 'away'}` : ''
          }: ${e.text}`;

          return (
            <div
              key={i}
              role="listitem"
              aria-label={a11y}
              className={cn(
                'flex items-center gap-2 rounded-[var(--xen-radius-md)] px-1 py-1',
                away ? 'flex-row-reverse text-right' : 'flex-row text-left'
              )}
            >
              <span className="inline-flex min-w-[44px] flex-none justify-center">
                <span className="rounded-full border border-border bg-surface px-1.5 py-px text-xs font-extrabold text-on-surface">
                  {e.minute}
                </span>
              </span>
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
              <span
                className={cn(
                  'min-w-0 flex-1 truncate text-sm',
                  isGoal ? 'font-extrabold text-on-surface' : 'font-medium text-on-surface'
                )}
              >
                {e.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
});
