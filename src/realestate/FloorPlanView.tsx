import * as React from 'react';
import { cn } from '../primitives/cn';
import { clamp01, clickableProps } from './internal';

/** A single room rectangle, positioned as fractions (0–1) of the frame. */
export interface FloorPlanRoom {
  /** Room label (e.g. "Bedroom", "Kitchen"). */
  label: string;
  /** Left edge, 0–1 of frame width. */
  x: number;
  /** Top edge, 0–1 of frame height. */
  y: number;
  /** Width, 0–1 of frame width. */
  w: number;
  /** Height, 0–1 of frame height. */
  h: number;
}

export interface FloorPlanViewProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Heading (e.g. "Floor 1"). */
  title?: string;
  /**
   * Rooms to draw as token-styled rectangles. Empty renders a labelled
   * placeholder frame (still dependency-free).
   */
  rooms?: FloorPlanRoom[];
  /** Frame height in px (default 200). */
  height?: number;
}

/**
 * Web parity of the native `FloorPlanView`: a schematic floor plan — a STATIC,
 * dependency-free styled placeholder built from plain `div` rectangles positioned
 * as fractions of the frame. No image, SVG, or map dependency; it renders
 * anywhere. Rooms in, nothing fetches; an empty `rooms` array shows a labelled
 * placeholder. All colors come from the `--xen-*` tokens — no literal colors
 * (rooms tinted with the `border` fill and `on-surface` labels).
 */
export const FloorPlanView = React.forwardRef<HTMLDivElement, FloorPlanViewProps>(
  function FloorPlanView(
    { title = 'Floor plan', rooms = [], height = 200, onClick, className, ...rest },
    ref
  ) {
    const interactive = clickableProps(
      onClick as React.MouseEventHandler | undefined,
      `${title}${rooms.length ? `, ${rooms.length} rooms` : ', schematic'}`
    );

    return (
      <div
        ref={ref}
        onClick={onClick}
        className={cn('flex flex-col gap-2', onClick && 'cursor-pointer', className)}
        {...interactive}
        {...rest}
      >
        <span className="text-base font-semibold text-on-surface">{title}</span>
        <div
          style={{ height }}
          className="relative overflow-hidden border border-border bg-surface rounded-[var(--xen-radius-lg)]"
        >
          {rooms.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <span className="text-sm text-muted">Floor plan unavailable</span>
            </div>
          ) : (
            rooms.map((room, i) => (
              <div
                key={`${room.label}-${i}`}
                className="absolute flex items-center justify-center border border-primary bg-border p-1"
                style={{
                  left: `${clamp01(room.x) * 100}%`,
                  top: `${clamp01(room.y) * 100}%`,
                  width: `${clamp01(room.w) * 100}%`,
                  height: `${clamp01(room.h) * 100}%`,
                }}
              >
                <span className="truncate text-xs font-medium text-on-surface">{room.label}</span>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
);
