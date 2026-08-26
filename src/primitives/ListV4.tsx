import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from './cn';
import { V4_ROW_CSS, V4_ROW_STYLE_ID } from './internal/v4-data';
import type { ListItemData, ListProps } from './List';

export type { ListProps as ListV4Props, ListItemData };

/**
 * **V4 list** — the web twin of the native `ListV4`, same props as
 * {@link List}, a different design line.
 *
 * The base list puts `divide-y` between every pair of rows, gives the title
 * and the description the same `text-sm`, and hovers with `bg-neutral-50`.
 * That is three problems with one cause: structure is being drawn instead of
 * typeset, and the ink it is drawn with came from the wrong ramp.
 *
 * Three changes:
 *
 * 1. **Typography carries the hierarchy.** The title steps up to `text-base`
 *    semibold; the description drops to `text-xs` and stays muted. §10 asks
 *    for size, weight and contrast before containers and dividers, and a title
 *    bigger than its description does not need a line under the row to say
 *    where the row ends.
 * 2. **No divider between rows.** The gap between one row's description and
 *    the next row's title is the full vertical padding of both — many times
 *    the gap inside a row — so the grouping is already unambiguous. §9:
 *    spacing IS the structure. What is left is the one border around the list,
 *    because a list is a single object and earns a container (§11).
 * 3. **Hover follows the scheme, and tints rather than lifts.**
 *    `bg-neutral-50` is the light-oriented ramp — under `[data-theme="dark"]`
 *    the emitted var mirrors to the far end and the hover becomes a near-white
 *    slab across a dark row. V4 mixes `--xen-on-surface` into `--xen-surface`,
 *    which darkens a light row and lightens a dark one with no dark rule to
 *    keep in step. The same rule arms `:focus-visible`, so a keyboard sees
 *    what a pointer sees.
 *
 * Every row keeps the `2xl` minimum height the rest of the V4 line uses, so a
 * pressable row is a real target. Nothing gains a shadow: a list row that
 * lifts is a card, and a stack of cards inside a bordered list is exactly the
 * "cards inside cards inside cards" §8 bans.
 */
export function ListV4({ items, className }: ListProps): React.ReactElement {
  injectStyleOnce(V4_ROW_STYLE_ID, V4_ROW_CSS);

  return (
    <ul
      className={cn(
        'overflow-hidden rounded-[var(--xen-radius-md)] border border-border bg-surface',
        className
      )}
    >
      {items.map((it, i) => {
        const inner = (
          <>
            {it.leading != null && <span className="shrink-0">{it.leading}</span>}
            <span className="min-w-0 flex-1">
              <span className="block truncate text-base font-semibold text-on-surface">
                {it.title}
              </span>
              {it.description != null && (
                <span className="block truncate text-xs text-muted-text">{it.description}</span>
              )}
            </span>
            {it.trailing != null && <span className="shrink-0">{it.trailing}</span>}
          </>
        );
        // No `divide-y`: the gap between rows already says where one ends (§9).
        const row =
          'flex w-full items-center gap-[var(--xen-space-md)] bg-surface px-[var(--xen-space-lg)] py-[var(--xen-space-md)] text-left min-h-[var(--xen-space-2xl)]';
        return (
          <li key={i}>
            {it.onClick ? (
              <button
                type="button"
                data-xen-v4-row=""
                data-interactive="true"
                onClick={it.onClick}
                className={cn(row, 'transition-colors')}
              >
                {inner}
              </button>
            ) : (
              <div data-xen-v4-row="" data-interactive="false" className={row}>
                {inner}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
