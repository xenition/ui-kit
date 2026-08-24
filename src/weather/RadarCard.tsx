import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { clamp } from './weather-utils';

export interface RadarCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'aria-label'> {
  /** Card title. Default `'Radar'`. */
  title?: string;
  /** Caption under the title (e.g. `'Live · 2 min ago'`). */
  caption?: string;
  /** Height of the static radar canvas in px. Default `180`. */
  height?: number;
  /** Overlay label shown centred on the canvas. Default `'Radar preview'`. */
  placeholderLabel?: string;
}

/**
 * Static radar map placeholder (web parity of the native `RadarCard`) —
 * INTENTIONALLY dependency-free: no maps SDK, no image, no chart. The "canvas"
 * is built purely from styled `div`s: a token-tinted backdrop, three concentric
 * range rings, a crosshair, and a labelled centre. It gives weather layouts a
 * radar slot before (or without) a real tile provider is wired. Pass `onClick`
 * to open a full view (renders a keyboard-focusable button). All colors come
 * from the `--xen-*` tokens via Tailwind classes — no literal colors, no deps.
 */
export const RadarCard = React.forwardRef<HTMLDivElement, RadarCardProps>(function RadarCard(
  { title = 'Radar', caption, height = 180, placeholderLabel = 'Radar preview', className, onClick, ...rest },
  ref
) {
  const canvas = clamp(height, 96, 480);
  const rings = [0.9, 0.6, 0.3];
  const clickable = onClick != null;

  const Canvas = (
    <div
      className="relative flex items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] border border-border bg-neutral-100"
      style={{ height: canvas }}
    >
      {/* Concentric range rings. */}
      {rings.map((scale, i) => {
        const dim = canvas * scale;
        return (
          <span
            key={i}
            aria-hidden="true"
            className="pointer-events-none absolute rounded-full border border-border"
            style={{ width: dim, height: dim }}
          />
        );
      })}
      {/* Crosshair. */}
      <span aria-hidden="true" className="pointer-events-none absolute h-px w-full bg-border" />
      <span aria-hidden="true" className="pointer-events-none absolute h-full w-px bg-border" />
      {/* Centre marker + label. */}
      <div className="flex flex-col items-center gap-1">
        <Icon glyph="📡" size="xl" aria-label="Radar" />
        <span className="text-xs text-muted">{placeholderLabel}</span>
      </div>
    </div>
  );

  return (
    <Card
      ref={ref}
      role="img"
      aria-label={`${title}${caption ? `, ${caption}` : ''}, ${placeholderLabel}`}
      className={className}
      {...rest}
    >
      <div className="mb-2 flex flex-row items-center justify-between">
        <span className="text-base font-bold text-on-surface">{title}</span>
        {caption ? <span className="text-xs text-muted">{caption}</span> : null}
      </div>

      {clickable ? (
        <button
          type="button"
          aria-label="Open radar"
          onClick={onClick as unknown as React.MouseEventHandler<HTMLButtonElement>}
          className="block w-full rounded-[var(--xen-radius-md)] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
        >
          {Canvas}
        </button>
      ) : (
        Canvas
      )}
    </Card>
  );
});
