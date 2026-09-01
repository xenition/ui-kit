import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { Badge } from '../primitives/Badge';
import type { CameraTileProps } from './CameraTile';

/** Drop-in for {@link CameraTileProps} — same props, the V4 "ambient" design. */
export type CameraTileV4Props = CameraTileProps;

/**
 * CameraTile — **V4** "ambient" design (web parity of the native V4). The
 * immersive take on a feed tile: a **dark, rounded video frame** (drawn on the
 * `on-surface` token so it reads as a screen in both light and dark, with a
 * `surface`-toned scrim behind the overlays — no literal colors) fills the tile,
 * a **live pulse dot** rides beside the "LIVE"/"OFFLINE" chip when streaming, and
 * a `REC` chip appears while recording. The camera name + timestamp sit in a
 * scrim overlay along the bottom of the frame rather than a separate bar, so the
 * framing stays clean and immersive. Status is always text, never color alone.
 * The tile is a `<button>` firing `onClick`. Same props/behavior as
 * {@link CameraTileProps}; all colors from `--xen-*` token classes (no literals).
 */
export const CameraTileV4 = React.forwardRef<HTMLButtonElement, CameraTileV4Props>(function CameraTileV4(
  { name, online = false, recording = false, timestamp, previewHeight = 140, onClick, className, style, ...rest },
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
        'block w-full overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-on-surface text-left shadow-sm transition-opacity hover:opacity-90',
        className
      )}
      {...rest}
    >
      {/* Dark, immersive video / snapshot frame */}
      <div
        className="relative flex items-center justify-center bg-on-surface"
        style={{ height: previewHeight }}
      >
        <Icon glyph={online ? '📹' : '🚫'} color="onPrimary" size="3xl" />

        {/* Status chips — a live pulse dot rides beside the LIVE chip. */}
        <div className="absolute left-[var(--xen-space-xs)] top-[var(--xen-space-xs)] flex items-center gap-[var(--xen-space-xs)]">
          {online ? (
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
          ) : null}
          <Badge tone={online ? 'success' : 'danger'}>{online ? 'LIVE' : 'OFFLINE'}</Badge>
          {recording && online ? <Badge tone="danger">REC</Badge> : null}
        </div>

        {/* Bottom scrim overlay — name + timestamp over the frame, clean framing. */}
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-[var(--xen-space-sm)] bg-on-surface/60 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]">
          <span className="min-w-0 flex-1 truncate text-sm font-semibold text-surface">{name}</span>
          {timestamp != null ? <span className="shrink-0 text-xs text-surface opacity-80">{timestamp}</span> : null}
        </div>
      </div>
    </button>
  );
});
