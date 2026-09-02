import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { SkeletonV4 } from '../primitives/SkeletonV4';
import { ChoreCardV4, type ChoreCardV4Props } from './ChoreCardV4';
import { KIDS_CARD_CLASS, KIDS_CARD_GROUND_CLASS } from './internal/tone-v4';

/**
 * One chore in the list — a card's own props, plus an identity.
 *
 * `id` shadows the DOM `id` deliberately: a list item's identity is what comes
 * back on `onSelectItem`, and a caller who wants a DOM id on a chore card
 * renders `ChoreCardV4` directly.
 */
export interface ChoreListItem
  extends Omit<ChoreCardV4Props, 'loading' | 'onClick' | 'onComplete' | 'id'> {
  /** React key and the identity handed back to `onSelectItem` / `onCompleteItem`. */
  id?: string | number;
}

export interface ChoreListV4Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** The chores to draw. An empty array is a real empty state, not a blank region. */
  items: ChoreListItem[];
  /** Loading placeholder state. Draws the shape the list is about to be. */
  loading?: boolean;
  /** How many placeholder cards a loading list draws. Default 3. */
  skeletonCount?: number;
  /** The loading placeholder's spoken name. Default `'Loading chores'`. */
  loadingLabel?: string;
  /** Headline when there are no chores. Default `'No chores yet'`. */
  emptyLabel?: string;
  /** A sentence under the headline — an empty list needs a next step. */
  emptyDescription?: string;
  /** Build the list's spoken name. Default `'3 chores'`. */
  formatCount?: (count: number) => string;
  /** Fires with the chore's `id` (or its index) when a card is opened. */
  onSelectItem?: (id: string | number, index: number) => void;
  /** Fires with the chore's `id` (or its index) when its action is pressed. */
  onCompleteItem?: (id: string | number, index: number) => void;
}

/** How many placeholder cards a loading list draws. */
const SKELETON_CARDS = 3;

/**
 * **V4 chore list** — new in V4; there is no base component.
 *
 * ## Three changes
 *
 * 1. **A chore screen with no chores renders something.** There was no list
 *    container at all, so an app looping over an empty array drew a blank
 *    region and nothing told the parent whether the week was clear or the
 *    request had failed. The list owns a real empty state with a headline and a
 *    next-step sentence.
 * 2. **Loading is the list's job, not the card's.** Every card carried its own
 *    `loading` prop and its own skeleton, so a loading screen meant the caller
 *    inventing how many placeholder cards to render and passing `loading` down
 *    to each — and the empty and loading states were duplicated inside all
 *    twelve components. The list draws the shape it is about to be.
 * 3. **The list is a list.** A stack of `div`s is not one: a screen reader gets
 *    no count and no "item 3 of 7" while moving through it. This is a `<ul>`
 *    with a count in its name.
 */
export const ChoreListV4 = React.forwardRef<HTMLDivElement, ChoreListV4Props>(function ChoreListV4(
  {
    items,
    loading = false,
    skeletonCount = SKELETON_CARDS,
    loadingLabel = 'Loading chores',
    emptyLabel = 'No chores yet',
    emptyDescription,
    formatCount,
    onSelectItem,
    onCompleteItem,
    children,
    className,
    ...rest
  },
  ref
) {
  const list = Array.isArray(items) ? items : [];
  const count = formatCount ?? ((n: number) => `${n} ${n === 1 ? 'chore' : 'chores'}`);

  if (loading) {
    return (
      <div
        {...rest}
        ref={ref}
        data-xen-chore-list=""
        role="status"
        aria-live="polite"
        aria-label={loadingLabel}
        className={cn('flex flex-col gap-md', className)}
      >
        {Array.from({ length: Math.max(1, Math.floor(skeletonCount)) }).map((_, index) => (
          <div
            key={index}
            className={cn('flex flex-col gap-sm', KIDS_CARD_CLASS, KIDS_CARD_GROUND_CLASS)}
          >
            <SkeletonV4 className="h-4 w-3/5" />
            <SkeletonV4 className="h-3 w-2/5" />
          </div>
        ))}
      </div>
    );
  }

  if (list.length === 0 && children == null) {
    return (
      <div {...rest} ref={ref} data-xen-chore-list="" className={className}>
        <EmptyStateV4
          icon={<span className="text-3xl">🧹</span>}
          title={emptyLabel}
          description={emptyDescription}
        />
      </div>
    );
  }

  return (
    <div {...rest} ref={ref} data-xen-chore-list="" className={className}>
      <ul aria-label={count(list.length)} className="flex flex-col gap-md">
        {list.map((item, index) => {
          const { id, ...card } = item;
          const key = id ?? index;
          return (
            <li key={key}>
              <ChoreCardV4
                {...card}
                onClick={onSelectItem ? () => onSelectItem(key, index) : undefined}
                onComplete={onCompleteItem ? () => onCompleteItem(key, index) : undefined}
              />
            </li>
          );
        })}
      </ul>
      {children}
    </div>
  );
});
