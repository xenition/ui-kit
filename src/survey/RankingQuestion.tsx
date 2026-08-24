import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';
import { EmptyState } from '../commerce';
import type { SurveyChoice } from './types';

export interface RankingQuestionProps {
  /** The rankable items (looked up by id). Empty renders the empty state. */
  items: SurveyChoice[];
  /**
   * Controlled ranked order as a list of item ids, best→worst. Ids missing from
   * `items` are skipped; items missing from `value` are appended in their source
   * order so the control is always complete.
   */
  value: string[];
  /** Fires with the full next ordered id list after a move. */
  onChange: (orderedIds: string[]) => void;
  /** Accessible name for the list. Default `'Ranking'`. */
  'aria-label'?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * A ranking / ordering question — items shown in their current rank with a rank
 * number and up/down controls that reorder the list. Emits the full next id
 * order on every move; the move buttons disable at the ends and are labelled
 * ("Move X up") so the action is never icon-only for screen readers. Resolves a
 * complete order even when `value` is partial or stale. Empty items render a
 * muted {@link EmptyState}. No literal colors.
 */
export const RankingQuestion = React.forwardRef<HTMLDivElement, RankingQuestionProps>(
  function RankingQuestion(
    { items, value, onChange, 'aria-label': ariaLabel = 'Ranking', disabled = false, className },
    ref
  ) {
    const byId = React.useMemo(() => new Map(items.map((it) => [it.id, it])), [items]);

    // Build a complete, valid order: known-valid ids from `value`, then any
    // items not yet referenced (keeps the control usable if `value` is partial).
    const orderedIds = React.useMemo(() => {
      const seen = new Set<string>();
      const out: string[] = [];
      for (const id of value) {
        if (byId.has(id) && !seen.has(id)) {
          seen.add(id);
          out.push(id);
        }
      }
      for (const it of items) {
        if (!seen.has(it.id)) out.push(it.id);
      }
      return out;
    }, [value, items, byId]);

    const move = (index: number, dir: -1 | 1): void => {
      const target = index + dir;
      if (target < 0 || target >= orderedIds.length) return;
      const next = orderedIds.slice();
      const a = next[index];
      const b = next[target];
      if (a === undefined || b === undefined) return;
      next[index] = b;
      next[target] = a;
      onChange(next);
    };

    if (items.length === 0) {
      return <EmptyState ref={ref} title="Nothing to rank." className={className} />;
    }

    return (
      <div ref={ref} role="list" aria-label={ariaLabel} className={cn('flex flex-col gap-sm', className)}>
        {orderedIds.map((id, index) => {
          const item = byId.get(id);
          if (!item) return null;
          const isFirst = index === 0;
          const isLast = index === orderedIds.length - 1;
          return (
            <div
              key={id}
              role="listitem"
              aria-label={`Rank ${index + 1}: ${item.label}`}
              className={cn(
                'flex items-center gap-sm rounded-md border border-border bg-surface px-md py-sm',
                disabled && 'opacity-50'
              )}
            >
              <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-primary text-sm font-bold text-on-primary">
                {index + 1}
              </span>

              {item.icon ? <Icon glyph={item.icon} size="base" color="onSurface" /> : null}

              <span className="flex-1 text-base font-semibold text-on-surface">{item.label}</span>

              <button
                type="button"
                aria-label={`Move ${item.label} up`}
                disabled={disabled || isFirst}
                onClick={() => move(index, -1)}
                className={cn('p-xs', isFirst ? 'opacity-30' : 'opacity-100', 'disabled:pointer-events-none')}
              >
                <Icon glyph="▲" size="sm" color="onSurface" />
              </button>
              <button
                type="button"
                aria-label={`Move ${item.label} down`}
                disabled={disabled || isLast}
                onClick={() => move(index, 1)}
                className={cn('p-xs', isLast ? 'opacity-30' : 'opacity-100', 'disabled:pointer-events-none')}
              >
                <Icon glyph="▼" size="sm" color="onSurface" />
              </button>
            </div>
          );
        })}
      </div>
    );
  }
);
