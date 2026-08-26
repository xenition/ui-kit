import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from './cn';
import type { KanbanCard, KanbanColumn, KanbanProps } from './Kanban';
import { CHROME_V4_CSS, CHROME_V4_STYLE_ID } from './internal/chrome-v4';
import { NAV_V4_CSS } from './internal/nav-v4';

export type { KanbanProps as KanbanV4Props, KanbanColumn, KanbanCard };

/**
 * `Kanban`, V4 — the same props, and the board stops being boxes inside boxes.
 *
 * ## The nesting problem, and what fixes it
 *
 * The base gives the column a `border` and a `surface` fill, then fills every
 * card inside it with `surface` and gives it a `border` too. Two nested
 * rectangles on identical grounds, separated only by a hairline each — which is
 * §8's "cards inside cards inside cards" almost exactly, and it makes a busy
 * board read as a grid of empty frames before it reads as work.
 *
 * V4 splits the two levels apart by **ground** rather than by outline. The
 * column becomes a recessed tray — one 4% step towards `on-surface`, the same
 * step the V4 tables band with — and loses its border entirely. The cards keep
 * `surface` and their hairline, so they now sit *on* something instead of
 * inside something. One level of depth, said once, and the outline that was
 * doing the work goes away (§9 — spacing and ground as structure).
 *
 * Neither level gets a shadow. A card on a board is not a layer; it is an item
 * in a list that happens to be laid out in columns.
 *
 * ## The count chip
 *
 * It shared a bug with several other chips in the kit: `bg-muted` with
 * `text-surface`. `muted` is a decorative slot with no contrast promise and
 * `surface` is a *page* colour, so the pair was never measured against
 * anything — and both move independently per scheme. V4 uses the same recipe
 * the V4 navigation badges use: an opaque mix of `on-surface` into `surface`,
 * carrying `on-surface` as its ink, which is a compiler-guaranteed pair.
 *
 * ## Feedback
 *
 * Cards hover and press with the M3 state layer over `surface`, replacing
 * `hover:bg-neutral-50` — a light-oriented ramp step, so the base's hover is a
 * near-white slab on a dark board. Focus is `--xen-ring`, the one ring the kit
 * shares, replacing `ring-primary-300`, which is a ramp step and inverts the
 * same way.
 *
 * Still non-drag: `onCardPress` is the whole interaction, and a DnD layer is
 * the caller's. Saying so is better than implying reordering the board cannot
 * do.
 */
export const KanbanV4 = React.forwardRef<HTMLDivElement, KanbanProps>(function KanbanV4(
  { className, columns, onCardPress, columnWidth = 260, ...rest },
  ref
) {
  injectStyleOnce(CHROME_V4_STYLE_ID, CHROME_V4_CSS);
  injectStyleOnce('xen-v4-nav-styles', NAV_V4_CSS);

  return (
    <div ref={ref} className={cn('flex gap-md overflow-x-auto', className)} {...rest}>
      {columns.map((column) => (
        <section
          key={column.key}
          data-xen-v4-kanban-column=""
          // The recessed tray, painted from the injected sheet: a `color-mix()`
          // in an inline style is dropped outright by a CSSOM that does not
          // parse custom properties (jsdom, SSR extractors).
          data-xen-v4-tray=""
          style={{ width: columnWidth, minWidth: columnWidth }}
          // No border: the ground is what separates the tray from the page.
          className="flex shrink-0 flex-col gap-sm rounded-[var(--xen-radius-md)] p-sm"
        >
          <header className="flex items-center justify-between gap-sm px-xs pb-xs">
            <span className="min-w-0 truncate font-heading text-sm font-semibold text-on-surface">
              {column.title}
            </span>
            {/*
              The same opaque mix the V4 navigation badges use. `bg-muted` +
              `text-surface` was a pair nothing had measured.
            */}
            <span
              data-xen-v4-nav-badge=""
              className="inline-flex min-w-[var(--xen-space-lg)] shrink-0 items-center justify-center rounded-[var(--xen-radius-full)] px-xs font-body text-xs font-semibold"
            >
              {column.cards.length}
            </span>
          </header>

          {column.cards.length === 0 ? (
            <div className="py-lg text-center font-body text-xs text-muted-text">No cards</div>
          ) : (
            column.cards.map((card) => (
              <button
                key={card.id}
                type="button"
                data-xen-v4-chrome="on-surface"
                onClick={() => onCardPress?.(card, column)}
                className={cn(
                  'flex flex-col gap-xs rounded-[var(--xen-radius-sm)] border border-border',
                  'bg-surface p-sm text-left focus-visible:outline-none'
                )}
              >
                <div className="flex items-start justify-between gap-xs">
                  <span className="min-w-0 flex-1 font-body text-sm font-semibold text-on-surface">
                    {card.title}
                  </span>
                  {card.trailing != null ? <span className="shrink-0">{card.trailing}</span> : null}
                </div>
                {card.description != null ? (
                  <span className="font-body text-xs leading-relaxed text-muted-text">
                    {card.description}
                  </span>
                ) : null}
              </button>
            ))
          )}
        </section>
      ))}
    </div>
  );
});
