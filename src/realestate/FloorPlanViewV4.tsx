import * as React from 'react';
import { cn } from '../primitives/cn';
import { clamp01, clickableProps } from './internal';
import type { FloorPlanViewProps } from './FloorPlanView';

/** Drop-in for {@link FloorPlanViewProps} — same props, the V4 "listing" design. */
export type FloorPlanViewV4Props = FloorPlanViewProps;

/**
 * FloorPlanView — **V4** "listing" design (web parity of the native V4). The
 * image-forward, editorial take on the schematic plan: a rounded elevated frame
 * with a soft-primary gradient "ground", the `title` shown as an active level tab,
 * rooms drawn as soft-primary tinted token rectangles, and a room-count area
 * caption. STATIC and dependency-free — no image, SVG, or map dep; it renders
 * anywhere. Same props/behavior as {@link FloorPlanViewProps}; an empty `rooms`
 * array shows a labelled placeholder. All colors come from the `--xen-*` tokens
 * (no literals). When `onClick` is set the frame is keyboard-activatable.
 */
export const FloorPlanViewV4 = React.forwardRef<HTMLDivElement, FloorPlanViewV4Props>(
  function FloorPlanViewV4(
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
        className={cn(
          'flex flex-col gap-2 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-2 shadow-md',
          onClick && 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          className
        )}
        {...interactive}
        {...rest}
      >
        {/* Level tab — the title as an active soft-primary chip. */}
        <div className="flex items-center gap-1 px-1 pt-1">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-on-surface">
            {title}
          </span>
        </div>

        {/* Plan ground — subtle soft-primary gradient scrim. */}
        <div
          style={{ height }}
          className="relative overflow-hidden rounded-[var(--xen-radius-md)] border border-border bg-gradient-to-br from-primary/10 to-surface"
        >
          {rooms.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <span className="text-sm text-muted">Floor plan unavailable</span>
            </div>
          ) : (
            rooms.map((room, i) => (
              <div
                key={`${room.label}-${i}`}
                className="absolute flex items-center justify-center rounded-[var(--xen-radius-sm)] border border-primary bg-primary/10 p-1"
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

        {/* Area caption. */}
        <span className="px-1 pb-1 text-xs text-muted">
          {rooms.length ? `${rooms.length} rooms` : 'Schematic'}
        </span>
      </div>
    );
  }
);
