import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { Spinner } from '../primitives/Spinner';
import { WaveformEditor } from './WaveformEditor';
import {
  ACCENT_BORDER_CLASS,
  ACCENT_BG_CLASS,
  ACCENT_ICON_COLOR,
  ACCENT_SOFT_BG_CLASS,
  ACCENT_STRONG_BG_CLASS,
  padAccentKey,
  type AccentSlot,
} from './types';

export type SamplePadVariant = 'tile' | 'row';

export interface SamplePadProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'color'> {
  /** Sample display name; when omitted the pad reads as an empty slot. */
  name?: string;
  /** Optional sub-label, e.g. `'Vinyl Kick'`, `'0:02'`. */
  detail?: string;
  /** Icon glyph / emoji for the sample. */
  glyph?: string;
  /** Pre-computed peaks for the inline mini-waveform (no audio decoded here). */
  peaks?: number[];
  /** Accent slot; otherwise derived from `index`. */
  color?: AccentSlot;
  /** Position used to derive the accent when `color` is omitted. */
  index?: number;
  /**
   * - `tile` — square pad with glyph + name (default).
   * - `row` — horizontal pad with an inline mini-waveform.
   */
  variant?: SamplePadVariant;
  /** Whether the sample is currently playing (lit + non-color affordance). */
  playing?: boolean;
  /** Whether the sample is still loading (shows a spinner, blocks presses). */
  loading?: boolean;
  /** Fires when a loaded pad is triggered, with the sample name (or `''`). */
  onClick?: (name: string) => void;
}

/**
 * A single sample trigger pad — a UI shell only, it plays no audio, and the DOM
 * parity of `native/music`'s `SamplePad`. When `name` is set it shows the sample
 * (glyph + name, an inline mini-`WaveformEditor` in the `row` variant) and fires
 * `onClick(name)` on a hit; when `name` is omitted it renders a dimmed "empty"
 * slot. `playing` lights the pad and adds a non-color dot; `loading` swaps in a
 * `Spinner` and blocks presses. Accent comes from a semantic token class; no
 * literal colors.
 */
export const SamplePad = React.forwardRef<HTMLButtonElement, SamplePadProps>(function SamplePad(
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
        'rounded-[var(--xen-radius-md)] border transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
        isRow ? 'min-h-[56px] flex-row justify-start' : 'min-h-[88px] flex-col justify-center',
        isEmpty
          ? 'border-border bg-surface opacity-50'
          : cn(
              playing
                ? cn('border-2', ACCENT_BORDER_CLASS[accent], ACCENT_STRONG_BG_CLASS[accent])
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
            isEmpty ? 'bg-neutral-100' : ACCENT_SOFT_BG_CLASS[accent]
          )}
        >
          <Icon glyph={isEmpty ? '＋' : glyph} size="base" color={isEmpty ? 'muted' : ACCENT_ICON_COLOR[accent]} />
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
