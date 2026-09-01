import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';
import { EmptyState } from '../commerce';
import type { RankingQuestionProps } from './RankingQuestion';

/** Drop-in for {@link RankingQuestionProps} — same props, the V4 "focus" design. */
export type RankingQuestionV4Props = RankingQuestionProps;

/**
 * RankingQuestion — **V4** "focus" design. The calm, legible take on an ordering
 * control: big (~44px) rounded surface rows, each led by a solid **primary** rank
 * pill (1, 2, 3…) and trailed by generous up/down reorder targets. Emits the full
 * next id order on every move; the move buttons disable at the ends and stay
 * labelled ("Move X up") so the action is never icon-only for screen readers.
 * Resolves a complete order even when `value` is partial or stale. One accent
 * (primary), no gradients. Same props/behavior as {@link RankingQuestionProps};
 * all colors from `--xen-*` token classes (no literal colors).
 */
export const RankingQuestionV4 = React.forwardRef<HTMLDivElement, RankingQuestionV4Props>(
  function RankingQuestionV4(
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
                'flex min-h-[44px] items-center gap-sm rounded-lg border border-border bg-surface px-md py-sm',
                disabled && 'opacity-50'
              )}
            >
              {/* Solid-primary rank pill — the single V4 accent. */}
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-base font-extrabold tabular-nums text-on-primary">
                {index + 1}
              </span>

              {item.icon ? <Icon glyph={item.icon} size="base" color="onSurface" /> : null}

              <span className="flex-1 text-base font-semibold text-on-surface">{item.label}</span>

              <button
                type="button"
                aria-label={`Move ${item.label} up`}
                disabled={disabled || isFirst}
                onClick={() => move(index, -1)}
                className={cn(
                  'flex h-11 w-11 items-center justify-center rounded-md',
                  isFirst ? 'opacity-30' : 'opacity-100 hover:bg-primary/10',
                  'disabled:pointer-events-none'
                )}
              >
                <Icon glyph="▲" size="sm" color="primary" />
              </button>
              <button
                type="button"
                aria-label={`Move ${item.label} down`}
                disabled={disabled || isLast}
                onClick={() => move(index, 1)}
                className={cn(
                  'flex h-11 w-11 items-center justify-center rounded-md',
                  isLast ? 'opacity-30' : 'opacity-100 hover:bg-primary/10',
                  'disabled:pointer-events-none'
                )}
              >
                <Icon glyph="▼" size="sm" color="primary" />
              </button>
            </div>
          );
        })}
      </div>
    );
  }
);
