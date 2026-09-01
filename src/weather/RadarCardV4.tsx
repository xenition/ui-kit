import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import type { RadarCardProps } from './RadarCard';

export type RadarCardV4Props = RadarCardProps;

function clamp(n: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, n));
}

/**
 * RadarCard — **sky scope** design (v4), web parity of the native `RadarCardV4`.
 * A dependency-free radar placeholder that actually looks like a scope: a gradient
 * sky canvas with concentric range rings, a crosshair, a rotated sweep beam, a
 * couple of translucent "precip" returns and a pinging center marker — all built
 * from `div`s (no maps SDK, no SVG, no image). A header carries the title and a
 * live pill. Pass `onClick` to open a full view. All colors flow through Tailwind
 * token classes; only geometry is inline. Same props as {@link RadarCardProps}.
 */
export const RadarCardV4 = React.forwardRef<HTMLDivElement, RadarCardV4Props>(function RadarCardV4(
  { title = 'Radar', caption, height = 200, placeholderLabel = 'Radar preview', className, onClick, ...rest },
  ref
) {
  const canvas = clamp(height, 120, 480);
  const clickable = onClick != null;
  const rings = [1, 0.68, 0.36];

  const Scope = (
    <div
      className="relative flex items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-gradient-to-b from-primary-400 to-primary-700"
      style={{ height: canvas }}
    >
      {rings.map((s, i) => {
        const dim = canvas * 0.86 * s;
        return (
          <div key={i} className="absolute rounded-full border border-primary-200" style={{ width: dim, height: dim }} />
        );
      })}
      {/* Crosshair. */}
      <div className="absolute bg-primary-200" style={{ width: '86%', height: 1 }} />
      <div className="absolute bg-primary-200" style={{ width: 1, height: '86%' }} />
      {/* Sweep beam. */}
      <div
        className="absolute bg-primary-100"
        style={{ width: canvas * 0.42, height: 2, left: '50%', top: '50%', transform: 'rotate(-35deg)', transformOrigin: 'left center' }}
      />
      {/* Precip returns. */}
      <div className="absolute rounded-full bg-accent" style={{ width: canvas * 0.2, height: canvas * 0.2, top: canvas * 0.24, left: canvas * 0.3, opacity: 0.5 }} />
      <div className="absolute rounded-full bg-warn" style={{ width: canvas * 0.14, height: canvas * 0.14, bottom: canvas * 0.22, right: canvas * 0.26, opacity: 0.5 }} />
      {/* Center ping. */}
      <div className="absolute rounded-full border border-accent" style={{ width: 22, height: 22 }} />
      <div className="absolute rounded-full bg-accent" style={{ width: 8, height: 8 }} />
      {/* Label pill. */}
      <div className="absolute bottom-2 flex flex-row items-center gap-1 rounded-full bg-primary-500 px-3 py-1">
        <Icon glyph="📡" size="sm" color="onPrimary" aria-label="Radar" />
        <span className="text-sm font-semibold text-on-primary">{placeholderLabel}</span>
      </div>
    </div>
  );

  return (
    <div
      ref={ref}
      role="img"
      aria-label={`${title}${caption ? `, ${caption}` : ''}, ${placeholderLabel}`}
      className={cn('flex flex-col rounded-[var(--xen-radius-lg)] border border-border bg-surface p-4 shadow-lg', className)}
      {...rest}
    >
      <div className="mb-2 flex flex-row items-center justify-between px-1">
        <span className="text-lg font-bold text-on-surface">{title}</span>
        {caption ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5">
            <span className="text-xs font-semibold text-on-accent">{caption}</span>
          </span>
        ) : null}
      </div>

      {clickable ? (
        <button
          type="button"
          aria-label="Open radar"
          onClick={onClick as unknown as React.MouseEventHandler<HTMLButtonElement>}
          className="block w-full rounded-[var(--xen-radius-md)] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
        >
          {Scope}
        </button>
      ) : (
        Scope
      )}
    </div>
  );
});
