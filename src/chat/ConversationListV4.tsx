import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { SkeletonV4 } from '../primitives/SkeletonV4';
import type { ConversationListProps } from './ConversationList';
import { ConversationRowV4 } from './ConversationRowV4';

export interface ConversationListV4Props extends ConversationListProps {
  /** A sentence under the empty title — an empty inbox needs a next step. */
  emptyDescription?: string;
}

/** How many placeholder rows a loading inbox draws. */
const SKELETON_ROWS = 5;

/**
 * **V4 conversation list** — the web twin of the native `ConversationListV4`,
 * same props as {@link ConversationList} plus `emptyDescription`.
 *
 * ## Four changes
 *
 * 1. **Loading draws the rows it is about to show.** The base drew a centred
 *    spinner, so the inbox collapsed to a dot and then jumped to full height.
 * 2. **Empty is a real empty state** with a title and a sentence, not a line
 *    of grey text centred in the void.
 * 3. **The last row drops its separator**, which otherwise hung off the end of
 *    the list with nothing under it.
 * 4. **The list is a list**, with a count in its name.
 */
export const ConversationListV4 = React.forwardRef<HTMLDivElement, ConversationListV4Props>(
  function ConversationListV4(
    {
      items,
      onPressItem,
      onLongPressItem: _onLongPressItem,
      loading = false,
      emptyLabel = 'No conversations',
      emptyDescription,
      dividers: _dividers,
      children,
      className,
      ...rest
    },
    ref
  ) {
    const list = items?.filter((item) => item?.id != null) ?? [];

    if (loading) {
      return (
        <div
          ref={ref}
          role="status"
          aria-live="polite"
          aria-label="Loading conversations"
          className={cn('flex flex-col', className)}
          {...rest}
        >
          {/* The shape it is about to be, not a dot in the middle. */}
          {Array.from({ length: SKELETON_ROWS }).map((_, index) => (
            <div key={index} className="flex items-center gap-md px-md py-sm">
              <SkeletonV4 className="h-10 w-10 shrink-0 rounded-full" />
              <div className="flex min-w-0 flex-1 flex-col gap-xs">
                <SkeletonV4 className="h-3 w-1/3" />
                <SkeletonV4 className="h-3 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (list.length === 0 && children == null) {
      return (
        <div ref={ref} className={className} {...rest}>
          <EmptyStateV4 title={emptyLabel} description={emptyDescription} />
        </div>
      );
    }

    return (
      <div ref={ref} className={className} {...rest}>
        <ul
          aria-label={`${list.length} ${list.length === 1 ? 'conversation' : 'conversations'}`}
          className="flex flex-col"
        >
          {list.map((item, index) => (
            <li key={item.id}>
              <ConversationRowV4
                {...item}
                last={index === list.length - 1}
                onClick={() => onPressItem?.(item.id)}
              />
            </li>
          ))}
        </ul>
        {children}
      </div>
    );
  }
);
