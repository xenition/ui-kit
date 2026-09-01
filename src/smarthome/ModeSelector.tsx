import * as React from 'react';
import { cn } from '../primitives/cn';

/** One selectable home mode — id, label + an optional glyph. */
export interface ModeOption {
  /** Stable identity, emitted to `onChange` (e.g. `'home'`). */
  id: string;
  /** Human-readable label shown under the glyph (e.g. `'Home'`). */
  label: string;
  /** Leading glyph/emoji for the mode tile (e.g. `'🏠'`). */
  glyph?: string;
}

/** The four canonical home modes when no custom `modes` are supplied. */
export type HomeMode = 'home' | 'away' | 'night' | 'vacation';

/** The default Home / Away / Night / Vacation mode set. */
export const DEFAULT_MODES: readonly ModeOption[] = [
  { id: 'home', label: 'Home', glyph: '🏠' },
  { id: 'away', label: 'Away', glyph: '🚶' },
  { id: 'night', label: 'Night', glyph: '🌙' },
  { id: 'vacation', label: 'Vacation', glyph: '✈️' },
];

export interface ModeSelectorProps {
  /**
   * The id of the currently selected mode (matches a `modes[].id`; defaults to
   * one of {@link HomeMode} when `modes` is omitted). Drives the solid-`primary`
   * selected tile.
   */
  value: HomeMode | string;
  /** Fires with the chosen mode id when a tile is activated. */
  onChange?: (mode: string) => void;
  /**
   * Custom mode tiles, in display order. Defaults to {@link DEFAULT_MODES}
   * (Home / Away / Night / Vacation).
   */
  modes?: readonly ModeOption[];
  /** Accessible label for the radiogroup. Defaults to `'Home mode'`. */
  label?: string;
  /** Disables every tile (e.g. while a mode change is in flight). */
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * ModeSelector — **V4** "ambient" home-mode switch. A calm control-panel
 * `radiogroup` of big (≥44px) mode tiles: the **selected** mode is a solid
 * `primary` fill with `on-primary` glyph + label, while the rest stay on a calm
 * surface with a soft tint — one accent, nothing shouting. Selection is
 * announced via `role="radio"`/`aria-checked`, arrow keys move between tiles,
 * and the meaning is carried by glyph + label (never color alone). Presentational
 * only: `value` in, `onChange` out. All colors from `--xen-*` token classes
 * (no literals); dark-mode safe.
 */
export const ModeSelector = React.forwardRef<HTMLDivElement, ModeSelectorProps>(function ModeSelector(
  { value, onChange, modes = DEFAULT_MODES, label = 'Home mode', disabled = false, className, style, ...rest },
  ref
) {
  const list = Array.isArray(modes) && modes.length > 0 ? modes : DEFAULT_MODES;
  const selectedIndex = Math.max(
    0,
    list.findIndex((m) => m.id === value)
  );

  const focusTile = (idx: number) => {
    const el = tileRefs.current[idx];
    if (el) el.focus();
  };
  const tileRefs = React.useRef<Array<HTMLButtonElement | null>>([]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, idx: number) => {
    if (disabled) return;
    let next = idx;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (idx + 1) % list.length;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (idx - 1 + list.length) % list.length;
    else return;
    e.preventDefault();
    focusTile(next);
    onChange?.(list[next].id);
  };

  return (
    <div
      ref={ref}
      role="radiogroup"
      aria-label={label}
      aria-disabled={disabled || undefined}
      style={style}
      className={cn('grid grid-cols-2 gap-[var(--xen-space-sm)] sm:grid-cols-4', className)}
      {...rest}
    >
      {list.map((mode, idx) => {
        const selected = mode.id === value;
        return (
          <button
            key={mode.id}
            ref={(el) => {
              tileRefs.current[idx] = el;
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={mode.label}
            disabled={disabled}
            tabIndex={disabled ? -1 : selected || (selectedIndex === -1 && idx === 0) ? 0 : -1}
            onClick={() => onChange?.(mode.id)}
            onKeyDown={(e) => onKeyDown(e, idx)}
            className={cn(
              'flex min-h-[64px] flex-col items-center justify-center gap-[var(--xen-space-xs)]',
              'rounded-[var(--xen-radius-lg)] border px-[var(--xen-space-sm)] py-[var(--xen-space-md)]',
              'text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              selected
                ? 'border-primary bg-primary text-on-primary shadow-md'
                : 'border-border bg-surface text-on-surface hover:bg-primary/[0.06]',
              disabled && 'cursor-not-allowed opacity-60'
            )}
          >
            <span aria-hidden="true" className="text-2xl leading-none">
              {mode.glyph ?? '•'}
            </span>
            <span className={cn('text-sm font-semibold', selected ? 'text-on-primary' : 'text-on-surface')}>
              {mode.label}
            </span>
          </button>
        );
      })}
    </div>
  );
});
