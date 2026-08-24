import * as React from 'react';
import { cn } from '../primitives/cn';
import { Spinner } from '../primitives';
import { ConversationRow, type ConversationRowProps } from './ConversationRow';

/** A conversation item — the row props plus a stable id for keying/callbacks. */
export interface ConversationListItem
  extends Omit<ConversationRowProps, 'onClick' | 'onLongPress'> {
  id: string;
}

export interface ConversationListProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Conversation data. Each item is rendered as a `ConversationRow`. Omit to
   * supply `ConversationRow` children directly instead.
   */
  items?: ConversationListItem[];
  /** Called with the item id when a row is clicked. */
  onPressItem?: (id: string) => void;
  /** Called with the item id on context-menu / long-press (context actions). */
  onLongPressItem?: (id: string) => void;
  /** Show the loading state (spinner) instead of rows. */
  loading?: boolean;
  /** Empty-state message when there are no items/children (default provided). */
  emptyLabel?: string;
  /** Divider line between rows (default true). */
  dividers?: boolean;
  /** Custom `ConversationRow` children (used when `items` is not provided). */
  children?: React.ReactNode;
}

/**
 * Scrollable inbox / DM list. Pass `items` for the data-driven path (each mapped
 * to a `ConversationRow`) or `children` for full control. Handles `loading` and
 * empty states out of the box and exposes the `list` role. No literal colors.
 */
export const ConversationList = React.forwardRef<HTMLDivElement, ConversationListProps>(
  function ConversationList(
    {
      items,
      onPressItem,
      onLongPressItem,
      loading = false,
      emptyLabel = 'No conversations yet',
      dividers = true,
      children,
      className,
      ...rest
    },
    ref
  ) {
    if (loading) {
      return (
        <div
          ref={ref}
          role="progressbar"
          aria-label="Loading conversations"
          className={cn('flex flex-1 items-center justify-center p-8', className)}
          {...rest}
        >
          <Spinner size="lg" />
        </div>
      );
    }

    const usingItems = items != null;
    const isEmpty = usingItems ? items.length === 0 : React.Children.count(children) === 0;

    if (isEmpty) {
      return (
        <div
          ref={ref}
          role="status"
          className={cn('flex flex-1 items-center justify-center p-8', className)}
          {...rest}
        >
          <span className="text-center text-base text-muted">{emptyLabel}</span>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="list"
        className={cn('flex-1 overflow-y-auto bg-surface', className)}
        {...rest}
      >
        {usingItems
          ? items.map((item, i) => {
              const { id, ...rowProps } = item;
              return (
                <div key={id} role="listitem">
                  <ConversationRow
                    {...rowProps}
                    onClick={() => onPressItem?.(id)}
                    onLongPress={() => onLongPressItem?.(id)}
                  />
                  {dividers && i < items.length - 1 ? (
                    <span className="ml-4 block h-px bg-border" />
                  ) : null}
                </div>
              );
            })
          : children}
      </div>
    );
  }
);
