import * as React from 'react';
import { cn } from '../primitives/cn';
import { Tag } from '../primitives/Tag';

export interface TagListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The tag labels to render. */
  tags: string[];
  /** Called with the tag label (and its index) when a tag is clicked — web mirror of native `onTagPress`. */
  onTagClick?: (tag: string, index: number) => void;
  /** Optional cap; extra tags collapse into a "+N" chip. */
  max?: number;
  /** Text shown when `tags` is empty. Pass `null` to render nothing. */
  emptyLabel?: string | null;
}

/**
 * A wrapping row of keyword / topic tags for an article — the web (React DOM)
 * mirror of the native `TagList`. Composes the `Tag` primitive; an optional
 * `onTagClick` makes each tag a keyboard-activatable button (to open a topic
 * feed). Respects a `max` cap with a "+N" overflow chip and renders an
 * `emptyLabel` when there are no tags. All colors come from `--xen-*` tokens.
 */
export const TagList = React.forwardRef<HTMLDivElement, TagListProps>(function TagList(
  { tags, onTagClick, max, emptyLabel = 'No tags', className, ...rest },
  ref
) {
  if (tags.length === 0) {
    if (emptyLabel == null) return null;
    return (
      <p ref={ref as React.Ref<HTMLParagraphElement>} className={cn('text-sm text-muted', className)}>
        {emptyLabel}
      </p>
    );
  }

  const visible = typeof max === 'number' && max >= 0 ? tags.slice(0, max) : tags;
  const overflow = tags.length - visible.length;

  return (
    <div
      ref={ref}
      role="list"
      className={cn('flex flex-wrap gap-[var(--xen-space-xs)]', className)}
      {...rest}
    >
      {visible.map((tag, i) =>
        onTagClick ? (
          <button
            key={`${tag}-${i}`}
            type="button"
            aria-label={`Tag ${tag}`}
            onClick={() => onTagClick(tag, i)}
            className="cursor-pointer"
          >
            <Tag tone="neutral">{`#${tag}`}</Tag>
          </button>
        ) : (
          <Tag key={`${tag}-${i}`} tone="neutral">{`#${tag}`}</Tag>
        )
      )}
      {overflow > 0 ? <Tag tone="primary">{`+${overflow}`}</Tag> : null}
    </div>
  );
});
