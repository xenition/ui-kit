import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives/Badge';

export type NewsTickerVariant = 'scroll' | 'stacked';

export interface NewsTickerItem {
  /** Stable unique id. */
  id: string;
  /** Headline text. */
  text: string;
}

export interface NewsTickerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Breaking / latest headlines. */
  items: NewsTickerItem[];
  /** Optional leading label chip, e.g. `'LIVE'` or `'BREAKING'`. Pass `null` to hide. */
  label?: string | null;
  /** Called with an item's id when a headline is clicked — web mirror of native `onItemPress`. */
  onItemClick?: (id: string) => void;
  /**
   * - `scroll`  — single horizontal strip of headlines (default).
   * - `stacked` — vertical list of headline rows.
   */
  variant?: NewsTickerVariant;
  /** Show a placeholder while headlines load. */
  loading?: boolean;
  /** Message when there are no headlines. */
  emptyLabel?: string;
}

/** A single clickable headline (or plain text when no handler). */
function Headline({
  item,
  onItemClick,
  clamp,
}: {
  item: NewsTickerItem;
  onItemClick?: (id: string) => void;
  clamp: string;
}): React.ReactElement {
  const text = <span className={cn('text-sm font-semibold text-on-surface', clamp)}>{item.text}</span>;
  if (!onItemClick) return text;
  return (
    <button
      type="button"
      aria-label={item.text}
      onClick={() => onItemClick(item.id)}
      className="min-w-0 shrink cursor-pointer text-left transition-opacity hover:opacity-70"
    >
      {text}
    </button>
  );
}

/**
 * A breaking-news ticker — the accent "LIVE / BREAKING" strip of latest
 * headlines. Web (React DOM) mirror of the native `NewsTicker`. `scroll` lays
 * the headlines out in a single horizontally scrollable strip (separated by
 * middots); `stacked` renders them as vertical rows. Clicking a headline fires
 * `onItemClick(id)`. Handles `loading` and empty states. The label chip reuses
 * the `Badge` primitive; all colors from `--xen-*` token classes.
 */
export const NewsTicker = React.forwardRef<HTMLDivElement, NewsTickerProps>(function NewsTicker(
  { items, label = 'LIVE', onItemClick, variant = 'scroll', loading = false, emptyLabel = 'No headlines', className, ...rest },
  ref
) {
  const scroll = variant === 'scroll';

  const shell = (children: React.ReactNode): React.ReactElement => (
    <div
      ref={ref}
      role="region"
      aria-label="Latest headlines"
      className={cn(
        'gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-border bg-surface px-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
        scroll ? 'flex items-center' : 'flex flex-col items-stretch',
        className
      )}
      {...rest}
    >
      {label != null ? (
        <Badge tone="danger" className="shrink-0 self-center font-extrabold tracking-wide">
          {label}
        </Badge>
      ) : null}
      {children}
    </div>
  );

  if (loading) {
    return shell(<span className="text-sm text-muted">Loading headlines…</span>);
  }

  if (items.length === 0) {
    return shell(<span className="text-sm text-muted">{emptyLabel}</span>);
  }

  if (variant === 'stacked') {
    return shell(
      <div className="flex flex-1 flex-col gap-[var(--xen-space-xs)]">
        {items.map((item) => (
          <Headline key={item.id} item={item} onItemClick={onItemClick} clamp="line-clamp-2" />
        ))}
      </div>
    );
  }

  return shell(
    <div className="flex flex-1 items-center gap-[var(--xen-space-sm)] overflow-x-auto">
      {items.map((item, i) => (
        <div key={item.id} className="flex items-center gap-[var(--xen-space-sm)]">
          {i > 0 ? <span className="text-muted">·</span> : null}
          <Headline item={item} onItemClick={onItemClick} clamp="whitespace-nowrap" />
        </div>
      ))}
    </div>
  );
});
