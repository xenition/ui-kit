import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';

/** Kinds of staged attachment, driving the fallback glyph. */
export type AttachmentKind = 'image' | 'video' | 'file' | 'audio';

export interface StagedAttachment {
  /** Stable identifier passed back to `onRemove`. */
  id: string;
  /** Display name (file name / caption). */
  name?: string;
  /** Attachment kind → fallback glyph when there's no thumbnail. */
  kind?: AttachmentKind;
  /** Optional thumbnail URL (shown for image/video). */
  thumbnailUri?: string;
}

export interface AttachmentBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Staged attachments to preview before sending. */
  attachments: StagedAttachment[];
  /** Called with an attachment id when its remove button is clicked. */
  onRemove?: (id: string) => void;
}

const KIND_GLYPH: Record<AttachmentKind, string> = {
  image: '🖼️',
  video: '🎬',
  file: '📄',
  audio: '🎵',
};

const TILE = 56;

/**
 * Horizontal strip of staged attachments shown above the composer before a
 * message is sent. Each tile shows a thumbnail (or a kind glyph) and a remove
 * button. Scrolls horizontally; renders nothing when empty. No literal colors.
 */
export const AttachmentBar = React.forwardRef<HTMLDivElement, AttachmentBarProps>(
  function AttachmentBar({ attachments, onRemove, className, ...rest }, ref) {
    if (attachments.length === 0) return null;
    return (
      <div
        ref={ref}
        aria-label="Staged attachments"
        className={cn('flex gap-2 overflow-x-auto p-2', className)}
        {...rest}
      >
        {attachments.map((att) => {
          const kind = att.kind ?? 'file';
          return (
            <div key={att.id} className="relative shrink-0" style={{ width: TILE }}>
              <div
                className="flex items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] border border-border bg-surface"
                style={{ width: TILE, height: TILE }}
              >
                {att.thumbnailUri ? (
                  <img
                    src={att.thumbnailUri}
                    alt={att.name ?? 'Attachment'}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Icon glyph={KIND_GLYPH[kind]} aria-label={att.name ?? kind} />
                )}
              </div>
              <button
                type="button"
                aria-label={`Remove ${att.name ?? 'attachment'}`}
                onClick={() => onRemove?.(att.id)}
                className={cn(
                  'absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-danger',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger'
                )}
              >
                <Icon glyph="×" size="sm" color="onDanger" />
              </button>
              {att.name ? (
                <span className="mt-0.5 block truncate text-center text-xs text-muted">{att.name}</span>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  }
);
