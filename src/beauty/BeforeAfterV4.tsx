import * as React from 'react';
import { cn } from '../primitives/cn';
import { IconV4 } from '../primitives/IconV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import type { BeforeAfterProps } from './BeforeAfter';

export interface BeforeAfterV4Props extends BeforeAfterProps {
  /** Let the divider be dragged. Default `true`. */
  draggable?: boolean;
  /** How far each nudge moves the divider, in percent. Default `10`. */
  step?: number;
  /** Accessible names for the two nudge controls. */
  lessLabel?: string;
  moreLabel?: string;
  /** Accessible name for the slider itself. Default `'Comparison position'`. */
  sliderLabel?: string;
  /** Shown in the panel when a URL is missing. Default: the side's own label. */
  placeholderLabel?: string;
}

const clamp = (n: number): number => Math.max(0, Math.min(100, Number.isFinite(n) ? n : 50));

/**
 * **V4 before / after** — the web twin of the native `BeforeAfterV4`, same
 * props as {@link BeforeAfter} plus five copy and behaviour hooks.
 *
 * ## The change this component exists for
 *
 * **The base could not be slid.** It drew a divider at `position` and offered
 * two −/+ buttons that stepped 10% at a time. V4 overlays a real
 * `<input type="range">`, which is the correct web answer and brings the whole
 * keyboard model with it for free: arrow keys, Home/End, PageUp/PageDown, a
 * spoken value, and pointer drag on desktop and touch alike. No custom
 * pointer-event handling, because the platform already has this control.
 *
 * The **nudge buttons stay**: they are a coarse, forgiving target for anyone
 * who finds a thin slider hard to hit, and adding a drag is not a reason to
 * take them away.
 *
 * ## Two more
 *
 * 1. **The placeholder is `bg-muted`**, not a translucent wash of it that
 *    borrows whatever is behind the panel.
 * 2. **The tag chips are built from the elevation colour**, which is dark in
 *    both schemes — the base mixed `on-surface`, which inverts, so on a dark
 *    page the labels became dark text on a near-white chip over a photo.
 */
export const BeforeAfterV4 = React.forwardRef<HTMLDivElement, BeforeAfterV4Props>(
  function BeforeAfterV4(
    {
      beforeUrl,
      afterUrl,
      position = 50,
      variant = 'split',
      height = 220,
      beforeLabel = 'Before',
      afterLabel = 'After',
      draggable = true,
      step = 10,
      lessLabel = 'Show less after',
      moreLabel = 'Show more after',
      sliderLabel = 'Comparison position',
      placeholderLabel,
      onPositionChange,
      className,
      style,
      ...rest
    },
    ref
  ) {
    const [showAfter, setShowAfter] = React.useState(false);
    const pos = clamp(position);

    const placeholder = (label: string): React.ReactElement => (
      <div className="flex h-full w-full items-center justify-center bg-muted">
        <span className="text-sm text-on-surface">{placeholderLabel ?? label}</span>
      </div>
    );

    const tag = (label: string, side: 'left' | 'right'): React.ReactElement => (
      <span
        className={cn(
          'pointer-events-none absolute bottom-sm rounded-[var(--xen-radius-sm)] px-sm py-0.5',
          'text-xs font-bold text-neutral-50',
          // The elevation colour does not invert with the scheme.
          'bg-[color-mix(in_srgb,var(--xen-elevation-color)_60%,transparent)]',
          side === 'left' ? 'left-sm' : 'right-sm'
        )}
      >
        {label}
      </span>
    );

    if (variant === 'toggle') {
      const label = showAfter ? afterLabel : beforeLabel;
      const url = showAfter ? afterUrl : beforeUrl;
      return (
        <button
          type="button"
          aria-label={`Showing ${label}. Activate to compare.`}
          onClick={() => setShowAfter((v) => !v)}
          data-xen-v4-chrome="on-surface"
          className={cn(
            'relative block w-full overflow-hidden rounded-[var(--xen-radius-lg)] border border-border',
            className
          )}
          style={{ height, ...style }}
        >
          {url ? (
            <img src={url} alt={label} className="h-full w-full object-cover" />
          ) : (
            placeholder(label)
          )}
          {tag(label, 'left')}
        </button>
      );
    }

    return (
      <div ref={ref} className={cn('flex flex-col gap-sm', className)} style={style} {...rest}>
        <div
          className="relative overflow-hidden rounded-[var(--xen-radius-lg)] border border-border"
          style={{ height }}
        >
          {beforeUrl ? (
            <img src={beforeUrl} alt={beforeLabel} className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <div className="absolute inset-0">{placeholder(beforeLabel)}</div>
          )}

          <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${pos}%` }}>
            {afterUrl ? (
              <img
                src={afterUrl}
                alt={afterLabel}
                className="h-full object-cover"
                style={{ width: `${(100 / Math.max(pos, 1)) * 100}%`, maxWidth: 'none' }}
              />
            ) : (
              placeholder(afterLabel)
            )}
          </div>

          {/* The divider: a hairline rule and a visible knob. */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 w-px -translate-x-1/2 bg-surface"
            style={{ left: `${pos}%` }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-on-surface"
            style={{ left: `${pos}%` }}
          >
            <IconV4 name="sort" size="xs" />
          </span>

          {/*
            The real control. An `<input type="range">` brings arrow keys,
            Home/End, PageUp/PageDown, a spoken value and pointer drag — all
            of which a hand-rolled pointer handler would have to reimplement
            and get wrong.
          */}
          {draggable && onPositionChange ? (
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={Math.round(pos)}
              aria-label={sliderLabel}
              aria-valuetext={`${Math.round(pos)}% ${afterLabel}`}
              onChange={(e) => onPositionChange(clamp(Number(e.currentTarget.value)))}
              className="absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0"
            />
          ) : null}

          {tag(beforeLabel, 'right')}
          {tag(afterLabel, 'left')}
        </div>

        {/* The coarse path stays: a thin slider is not everyone's target. */}
        {onPositionChange ? (
          <div className="flex justify-center gap-sm">
            {[
              { label: lessLabel, glyph: '−', to: clamp(pos - step) },
              { label: moreLabel, glyph: '+', to: clamp(pos + step) },
            ].map((b) => (
              <button
                key={b.label}
                type="button"
                aria-label={b.label}
                onClick={() => onPositionChange(b.to)}
                data-xen-v4-chrome="on-surface"
                className={cn(
                  'flex w-11 items-center justify-center rounded-full border border-border bg-card text-base font-bold text-on-card',
                  MIN_TAP_CLASS
                )}
              >
                {b.glyph}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
);
