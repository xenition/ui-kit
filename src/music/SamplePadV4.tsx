import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { Spinner } from '../primitives/Spinner';
import { WaveformEditor } from './WaveformEditor';
import {
  ACCENT_BG_CLASS,
  ACCENT_BORDER_CLASS,
  ACCENT_ICON_COLOR,
  ACCENT_SOFT_BG_CLASS,
  ACCENT_STRONG_BG_CLASS,
  padAccentKey,
  type AccentSlot,
} from './types';
import type { SamplePadProps } from './SamplePad';

/** Drop-in for {@link SamplePadProps} — same props, the V4 "session" design. */
export type SamplePadV4Props = SamplePadProps;

/**
 * SamplePad — **V4** "session" design (web parity of the native V4). The clean,
 * tactile take on a sample pad: a rounded token tile that carries the cell
 * accent as a soft tint at rest, and when hit/lit flashes a stronger accent
 * fill + an accent ring + a corner marker (never color alone). `tile` is a
 * square grid cell (glyph stacked over label), `row` is a horizontal pad with
 * an inline mini-`WaveformEditor`; both keep ≥44px tap targets. Empty slots
 * read dimmed with a `＋`, `loading` swaps in a `Spinner` and blocks presses.
 * Identical props/behavior to {@link SamplePadProps}; the accent is preserved
 * via the `ACCENT_*` token slot helpers (no literal colors, no gradient).
 */
export const SamplePadV4 = React.forwardRef<HTMLButtonElement, SamplePadV4Props>(function SamplePadV4(
  {
    name,
    detail,
    glyph = '♪',
    peaks,
    color,
    index = 0,
    variant = 'tile',
    playing = false,
    loading = false,
    disabled = false,
    onClick,
    className,
    ...rest
  },
  ref
) {
  const accent: AccentSlot = color ?? padAccentKey(index);
  const isEmpty = name == null || name.length === 0;
  const isRow = variant === 'row';
  const blocked = isEmpty || loading || disabled;
  const stateNote = loading ? ', loading' : isEmpty ? ', empty' : playing ? ', playing' : '';

  return (
    <button
      ref={ref}
      type="button"
      disabled={blocked || !onClick}
      aria-pressed={playing}
      aria-busy={loading}
      aria-label={`${isEmpty ? 'Empty pad' : name}${stateNote}`}
      onClick={() => onClick?.(name ?? '')}
      className={cn(
        'relative flex items-center gap-[var(--xen-space-sm)] p-[var(--xen-space-sm)]',
        'rounded-[var(--xen-radius-lg)] border transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
        isRow ? 'min-h-[56px] flex-row justify-start' : 'min-h-[88px] flex-col justify-center',
        isEmpty
          ? 'border-dashed border-border bg-surface opacity-50'
          : cn(
              playing
                ? cn('border-2 ring-2 ring-offset-1', ACCENT_BORDER_CLASS[accent], ACCENT_STRONG_BG_CLASS[accent])
                : cn('border-border', ACCENT_SOFT_BG_CLASS[accent]),
              'hover:opacity-90'
            ),
        className
      )}
      {...rest}
    >
      {loading ? (
        <Spinner size="sm" />
      ) : (
        <span
          aria-hidden="true"
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-full',
            isEmpty ? 'bg-neutral-100' : playing ? ACCENT_STRONG_BG_CLASS[accent] : ACCENT_SOFT_BG_CLASS[accent]
          )}
        >
          <Icon
            glyph={isEmpty ? '＋' : glyph}
            size="base"
            color={isEmpty ? 'muted' : ACCENT_ICON_COLOR[accent]}
          />
        </span>
      )}
      <span
        className={cn(
          'flex min-w-0 flex-col gap-0.5',
          isRow ? 'flex-1 items-start' : 'items-center'
        )}
      >
        <span
          className={cn(
            'max-w-full truncate text-sm',
            isEmpty ? 'text-muted' : 'text-on-surface',
            playing ? 'font-bold' : 'font-semibold'
          )}
        >
          {isEmpty ? 'Empty' : name}
        </span>
        {detail ? <span className="max-w-full truncate text-xs text-muted">{detail}</span> : null}
      </span>
      {isRow && !isEmpty && !loading ? (
        <span className="w-[72px]">
          <WaveformEditor peaks={peaks} variant="mini" placeholderBars={peaks ? 0 : 20} />
        </span>
      ) : null}
      {playing && !loading ? (
        <span
          aria-hidden="true"
          className={cn('absolute right-1 top-1 h-1.5 w-1.5 rounded-full', ACCENT_BG_CLASS[accent])}
        />
      ) : null}
    </button>
  );
});
