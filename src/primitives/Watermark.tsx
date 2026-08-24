import * as React from 'react';
import { cn } from './cn';

export interface WatermarkProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The repeated text (e.g. `'CONFIDENTIAL'`, a username). */
  text: string;
  /** Content the watermark overlays. */
  children?: React.ReactNode;
  /** Tile repetition count. Default `24`. */
  count?: number;
}

/**
 * Watermark — tiles faint, diagonally-rotated repeating text across its
 * children as a non-interactive overlay (`pointer-events-none`). The text is
 * the `muted` token at low opacity so it stays a pure theme color; the overlay
 * never intercepts clicks. Useful for "confidential" / ownership marks over
 * documents or previews. No literal colors.
 */
export const Watermark = React.forwardRef<HTMLDivElement, WatermarkProps>(function Watermark(
  { text, children, count = 24, className, ...rest },
  ref
) {
  const tiles = Array.from({ length: Math.max(1, count) });
  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)} {...rest}>
      {children}
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-0 flex flex-wrap content-center justify-center',
          'rotate-[-30deg] scale-150 opacity-[0.08]'
        )}
      >
        {tiles.map((_, i) => (
          <span key={i} className="px-6 py-3 text-sm font-bold text-muted">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
});
