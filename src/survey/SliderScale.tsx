import * as React from 'react';
import { cn } from '../primitives/cn';

export interface SliderScaleProps {
  /** Current numeric value. Kept controlled — always render what you're told. */
  value: number;
  /** Fires with the new value after clamping and snapping to `step`. */
  onChange: (value: number) => void;
  /** Low end of the range. Default `0`. */
  min?: number;
  /** High end of the range. Default `10`. */
  max?: number;
  /** Snap increment between stops. Default `1`. */
  step?: number;
  /** Anchor caption under the `min` end (e.g. `'Not at all'`). */
  minLabel?: string;
  /** Anchor caption under the `max` end (e.g. `'Completely'`). */
  maxLabel?: string;
  /** Show the big current-value numeral above the track. Default `true`. */
  showValue?: boolean;
  /** Accessible name for the slider. Default `'Rating'`. */
  'aria-label'?: string;
  /** Non-interactive + dimmed when `true`. Default `false`. */
  disabled?: boolean;
  /** Extra classes on the root. */
  className?: string;
}

/** Clamp `v` into `[min, max]` then snap to the nearest `step` stop. */
function clampSnap(v: number, min: number, max: number, step: number): number {
  const clamped = Math.max(min, Math.min(max, v));
  const snapped = Math.round((clamped - min) / step) * step + min;
  return Math.max(min, Math.min(max, snapped));
}

/**
 * SliderScale — **V4** "clean form / focus" numeric slider question. A calm,
 * legible take: a big current-value numeral sits above a primary-filled track
 * with a large (≥44px) draggable thumb, flanked by min/max anchor captions. The
 * single accent is `primary`; the rail is `border`, the surface is neutral — no
 * gradients. Fully keyboard driven (Arrow / Home / End / PageUp / PageDown) and
 * exposed as `role="slider"` with `aria-valuemin/max/now`. Controlled via
 * `value` + `onChange`. All colors come from `--xen-*` token classes.
 */
export const SliderScale = React.forwardRef<HTMLDivElement, SliderScaleProps>(function SliderScale(
  {
    value,
    onChange,
    min = 0,
    max = 10,
    step = 1,
    minLabel,
    maxLabel,
    showValue = true,
    'aria-label': ariaLabel = 'Rating',
    disabled = false,
    className,
  },
  ref
) {
  const safe = clampSnap(value, min, max, step);
  const ratio = max > min ? (safe - min) / (max - min) : 0;
  const pct = `${Math.round(ratio * 100)}%`;

  const emit = (v: number): void => {
    if (disabled) return;
    onChange(clampSnap(v, min, max, step));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (disabled) return;
    const bigStep = Math.max(step, (max - min) / 10);
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        e.preventDefault();
        emit(safe + step);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        e.preventDefault();
        emit(safe - step);
        break;
      case 'PageUp':
        e.preventDefault();
        emit(safe + bigStep);
        break;
      case 'PageDown':
        e.preventDefault();
        emit(safe - bigStep);
        break;
      case 'Home':
        e.preventDefault();
        emit(min);
        break;
      case 'End':
        e.preventDefault();
        emit(max);
        break;
      default:
        break;
    }
  };

  return (
    <div ref={ref} className={cn('flex flex-col gap-sm', disabled && 'opacity-50', className)}>
      {showValue ? (
        <span className="self-center text-4xl font-extrabold leading-none text-primary tabular-nums">{safe}</span>
      ) : null}

      {/* Native range input carries the interaction + a11y; the visual track
          mirrors its state. The transparent input is a `peer` so its keyboard
          focus can drive a token ring on the thumb. Visual layers are
          `pointer-events-none`, so taps/drags fall through to the input. */}
      <div className="relative flex h-11 items-center">
        <input
          type="range"
          role="slider"
          aria-label={ariaLabel}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={safe}
          min={min}
          max={max}
          step={step}
          value={safe}
          disabled={disabled}
          onChange={(e) => emit(Number(e.target.value))}
          onKeyDown={onKeyDown}
          className={cn('peer absolute inset-0 z-10 h-11 w-full cursor-pointer opacity-0', 'disabled:cursor-not-allowed')}
        />
        {/* Rail */}
        <div className="h-1.5 w-full rounded-full bg-border" aria-hidden="true" />
        {/* Filled portion */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 h-1.5 rounded-full bg-primary"
          style={{ width: pct }}
        />
        {/* Thumb — gains a token focus ring while the input is keyboard-focused. */}
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute h-6 w-6 -translate-x-1/2 rounded-full border-2 border-surface bg-primary shadow-sm',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-surface'
          )}
          style={{ left: pct }}
        />
      </div>

      {minLabel || maxLabel ? (
        <div className="flex justify-between">
          <span className="shrink text-xs text-muted">{minLabel}</span>
          <span className="shrink text-right text-xs text-muted">{maxLabel}</span>
        </div>
      ) : null}
    </div>
  );
});
