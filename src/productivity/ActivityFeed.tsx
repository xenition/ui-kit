import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives';

/** The kinds of task activity a feed row can describe. */
export type ActivityAction = 'completed' | 'created' | 'commented' | 'assigned' | 'moved';

/** One activity entry in the {@link ActivityFeed}. */
export interface ActivityItem {
  /** Stable identity for the entry; used as the row `key`. */
  id: string;
  /** Who performed the action — drives the leading avatar. */
  actor: {
    /** Display name (also the avatar's initials fallback). */
    name: string;
    /** Optional avatar image URL. */
    avatarUrl?: string;
  };
  /** What happened; selects the kind glyph and its semantic tint. */
  action: ActivityAction;
  /** Optional object of the action (e.g. a task title), rendered bold. */
  target?: string;
  /** Optional pre-formatted relative time (e.g. `'2h ago'`), rendered muted. */
  time?: string;
}

export interface ActivityFeedProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** The activity entries, newest first. */
  items: readonly ActivityItem[];
  /** Section heading above the list. Defaults to `'Activity'`. Pass `null` to hide it. */
  title?: string | null;
}

/**
 * Per-action presentation: a kind glyph and the `[disc-bg, glyph-fg]` token
 * classes that tint it. Each maps to a semantic slot — no literal colors.
 */
const ACTION: Record<ActivityAction, { glyph: string; disc: string; fg: string; verb: string }> = {
  completed: { glyph: '✓', disc: 'bg-success/[0.14]', fg: 'text-success-text', verb: 'completed' },
  created: { glyph: '＋', disc: 'bg-primary/[0.14]', fg: 'text-primary-text', verb: 'created' },
  commented: { glyph: '💬', disc: 'bg-accent/[0.14]', fg: 'text-accent-text', verb: 'commented on' },
  assigned: { glyph: '👤', disc: 'bg-warn/[0.14]', fg: 'text-warn-text', verb: 'assigned' },
  moved: { glyph: '↔', disc: 'bg-primary/[0.14]', fg: 'text-primary-text', verb: 'moved' },
};

/** A single activity row: actor avatar + kind glyph badge + action text + time. */
function Row({ item }: { item: ActivityItem }): React.ReactElement {
  const kind = ACTION[item.action] ?? ACTION.created;
  return (
    <li className="flex items-start gap-3 py-2">
      <span className="relative shrink-0">
        <Avatar size="sm" name={item.actor.name} src={item.actor.avatarUrl} />
        <span
          aria-hidden
          className={cn(
            'absolute -bottom-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full border-2 border-card text-xs font-bold',
            kind.disc,
            kind.fg
          )}
        >
          {kind.glyph}
        </span>
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-sm leading-relaxed text-on-card">
          <span className="font-semibold">{item.actor.name}</span>{' '}
          <span className="text-muted-text">{kind.verb}</span>
          {item.target ? (
            <>
              {' '}
              <span className="font-semibold">{item.target}</span>
            </>
          ) : null}
        </p>
        {item.time ? <span className="text-xs text-muted-text">{item.time}</span> : null}
      </div>
    </li>
  );
}

/**
 * ActivityFeed — **V4** "flow" task activity feed (web parity of the native
 * twin). A calm vertical list: each row an actor {@link Avatar} pinned with a
 * kind glyph badge (✓ / ＋ / 💬 / 👤 / ↔) tinted by its **semantic** token, the
 * action sentence with its **target in bold**, and a muted timestamp. Exposes a
 * `list` for screen readers. Presentational only. All colors from `--xen-*`
 * token classes — no literals.
 */
export const ActivityFeed = React.forwardRef<HTMLDivElement, ActivityFeedProps>(function ActivityFeed(
  { items, title = 'Activity', className, ...rest },
  ref
) {
  const rows = Array.isArray(items) ? items : [];
  return (
    <div
      ref={ref}
      className={cn('flex flex-col gap-2 rounded-[var(--xen-radius-lg)] bg-card p-3', className)}
      {...rest}
    >
      {title ? <h3 className="text-sm font-bold text-on-card">{title}</h3> : null}
      <ul className="flex flex-col divide-y divide-border">
        {rows.map((item) => (
          <Row key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
});
