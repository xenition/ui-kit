import * as React from 'react';
import { cn } from '../primitives/cn';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import type { AttachmentBarProps, AttachmentKind } from './AttachmentBar';

export interface AttachmentBarV4Props extends AttachmentBarProps {
  /** Build the remove action's name. Default `'Remove photo.jpg'`. */
  formatRemoveLabel?: (name: string) => string;
  /** Override the kind words — four English words lived inside. */
  kindLabels?: Partial<Record<AttachmentKind, string>>;
}

const KIND_META: Record<AttachmentKind, { glyph: string; label: string }> = {
  image: { glyph: '🖼', label: 'Image' },
  video: { glyph: '🎬', label: 'Video' },
  file: { glyph: '📄', label: 'File' },
  audio: { glyph: '🎵', label: 'Audio' },
};

/**
 * **V4 attachment bar** — the web twin of the native `AttachmentBarV4`, same
 * props as {@link AttachmentBar} plus `formatRemoveLabel` and `kindLabels`.
 *
 * ## Four changes
 *
 * 1. **Remove says *what* it removes.** The base's close button was a bare
 *    `×`, so a reader heard "button" once per staged file with nothing to
 *    tell them apart.
 * 2. **Remove clears 44.** It was a 16px glyph in the corner of a thumbnail —
 *    the smallest target in the composer, and a destructive one.
 * 3. **The kind is a word, not only an emoji.** An emoji is announced by name
 *    on some readers and skipped on others; neither is "Video".
 * 4. **The bar is a labelled list**, and renders nothing when empty (§4.5).
 */
export const AttachmentBarV4 = React.forwardRef<HTMLDivElement, AttachmentBarV4Props>(
  function AttachmentBarV4(
    { attachments, onRemove, formatRemoveLabel, kindLabels, className, ...rest },
    ref
  ) {
    const list = attachments?.filter((a) => a?.id != null) ?? [];
    if (list.length === 0) return null;

    const removeLabel = formatRemoveLabel ?? ((name: string) => `Remove ${name}`);

    return (
      <div ref={ref} data-xen-attachment-bar="" className={className} {...rest}>
        <ul
          aria-label={`${list.length} ${list.length === 1 ? 'attachment' : 'attachments'}`}
          className="flex gap-sm overflow-x-auto py-xs [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {list.map((item) => {
            const kind = KIND_META[item.kind ?? 'file'];
            const word = kindLabels?.[item.kind ?? 'file'] ?? kind.label;
            const name = item.name ?? word;

            return (
              <li key={item.id} className="relative shrink-0">
                <div
                  className="flex h-[72px] w-[72px] flex-col items-center justify-center gap-xs overflow-hidden rounded-[var(--xen-radius-md)] border border-border bg-card px-xs"
                  aria-label={`${word}, ${name}`}
                >
                  {item.thumbnailUri ? (
                    <img src={item.thumbnailUri} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <>
                      <span aria-hidden className="text-lg">
                        {kind.glyph}
                      </span>
                      <span className="line-clamp-1 text-[10px] text-muted-text">{word}</span>
                    </>
                  )}
                </div>

                {onRemove && (
                  <button
                    type="button"
                    // Named, so a reader hears which file it drops.
                    aria-label={removeLabel(name)}
                    onClick={() => onRemove(item.id)}
                    data-xen-v4-chrome="on-surface"
                    className={cn(
                      'absolute -right-xs -top-xs inline-flex aspect-square items-center justify-center rounded-full border border-border bg-surface text-xs text-on-surface shadow-sm',
                      MIN_TAP_CLASS
                    )}
                  >
                    ×
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
);
