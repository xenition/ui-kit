import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { Badge } from '../primitives/Badge';

export interface CameraTileProps {
  /** Camera name (e.g. "Front Door"). */
  name: string;
  /** Whether the camera is reachable / streaming. */
  online?: boolean;
  /** Whether the camera is actively recording. */
  recording?: boolean;
  /** Last-seen / timestamp caption (e.g. "Live", "2m ago"). */
  timestamp?: string;
  /** Preview aspect height in px. Default 140. */
  previewHeight?: number;
  /** Fires when the tile is clicked to open the stream. */
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * A camera feed tile — a token-surface preview area (the kit ships no image
 * decoder, so an offline/placeholder frame is drawn with a `muted` glyph) topped
 * by status {@link Badge}s: a "LIVE" (success) / "OFFLINE" (danger) chip and a
 * "REC" chip when recording. Status is always text, never color alone. The name
 * and timestamp sit in a footer bar. The tile is a `<button>` firing `onClick`.
 * No literal colors.
 */
export const CameraTile = React.forwardRef<HTMLButtonElement, CameraTileProps>(function CameraTile(
  { name, online = false, recording = false, timestamp, previewHeight = 140, onClick, className, style },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      style={style}
      aria-label={`${name} camera, ${online ? 'online' : 'offline'}`}
      className={cn(
        'block w-full overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface text-left transition-opacity hover:opacity-90',
        className
      )}
    >
      {/* Preview / placeholder frame */}
      <div className="relative flex items-center justify-center bg-neutral-200" style={{ height: previewHeight }}>
        <Icon glyph={online ? '📹' : '🚫'} color="muted" size="3xl" />
        {/* Status chips */}
        <div className="absolute left-[var(--xen-space-xs)] top-[var(--xen-space-xs)] flex gap-[var(--xen-space-xs)]">
          <Badge tone={online ? 'success' : 'danger'}>{online ? 'LIVE' : 'OFFLINE'}</Badge>
          {recording && online ? <Badge tone="danger">REC</Badge> : null}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between p-[var(--xen-space-sm)]">
        <span className="min-w-0 flex-1 truncate text-sm font-semibold text-on-surface">{name}</span>
        {timestamp != null ? <span className="text-xs text-muted">{timestamp}</span> : null}
      </div>
    </button>
  );
});
