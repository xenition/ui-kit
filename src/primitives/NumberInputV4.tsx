import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { stateCss } from './internal/v4-state';
import { cn } from './cn';
import { FIELD_V4_CSS, FIELD_V4_STYLE_ID, fieldRingVars } from './internal/field-v4';
import type { NumberInputProps } from './NumberInput';

export type { NumberInputProps as NumberInputV4Props };

const NUMBER_V4_CSS = `
/*
  The control already has steppers. The browser's own spinners are a second
  pair a few pixels away, doing the same job at a size nobody can hit — §7,
  reduce visual noise.
*/
[data-xen-v4-number]::-webkit-outer-spin-button,
[data-xen-v4-number]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
[data-xen-v4-number] {
  -moz-appearance: textfield;
  appearance: textfield;
}
/*
  The stepper's hover used to be a brand tint at a hand-picked 8%. It is now the
  shared state layer, so a stepper, a menu item and a table row all acknowledge
  a pointer identically — and it matches the native twin, which was tinting
  neutral all along.
*/
[data-xen-v4-step]:hover:not(:disabled) {
  background-color: ${stateCss('var(--xen-on-surface)', 'var(--xen-surface)', 'hover')};
}
`;

/**
 * **V4 number input** — the same props as {@link NumberInput}, a different
 * design line.
 *
 * A stepper is the control people miss most often, because the base makes both
 * of its buttons 36px inside a 34px row and puts them either side of a value
 * that shifts as it grows. V4 fixes all three:
 *
 * 1. **Square targets at the control's own height.** Each stepper is
 *    `2xl × 2xl` — the same `2xl` `InputV4` is tall, so the whole control
 *    matches the field above it in a form and each button clears 44px on its
 *    own (§30, mobile is not compressed desktop).
 * 2. **A value that does not move.** The number is centred, given a minimum
 *    width off the spacing scale, and set in `tabular-nums`, so 9 → 10 → 100
 *    does not shuffle the steppers under the pointer while someone is clicking
 *    one repeatedly (§36.11).
 * 3. **A focus ring on the whole control.** Focusing the number lights the
 *    shared brand halo around the entire stepper via `:focus-within`, because
 *    the control is the thing that has focus — not the text box inside it.
 *
 * The browser's own spinner arrows are turned off. They are a second pair of
 * steppers a few pixels from ours, at a size nobody can hit, and §7 asks for
 * the noise to go. A stepper at its limit is dimmed **and** `disabled`, so the
 * state is in the interaction and not only in the colour (§46).
 *
 * No gradient, no glass, no shadow — §16 asks that forms stay minimal.
 */
export function NumberInputV4({
  value,
  onChange,
  min,
  max,
  step = 1,
  disabled,
  className,
}: NumberInputProps): React.ReactElement {
  injectStyleOnce(FIELD_V4_STYLE_ID, FIELD_V4_CSS);
  injectStyleOnce('xen-v4-number-styles', NUMBER_V4_CSS);

  const clamp = (v: number): number => Math.max(min ?? -Infinity, Math.min(max ?? Infinity, v));
  const set = (v: number): void => {
    if (!Number.isNaN(v)) onChange(clamp(v));
  };

  const stepClass = cn(
    'flex h-[var(--xen-space-2xl)] w-[var(--xen-space-2xl)] shrink-0',
    'items-center justify-center text-lg text-on-surface',
    'disabled:pointer-events-none disabled:opacity-[0.38]'
  );

  return (
    <div
      data-xen-v4-shell=""
      className={cn(
        'inline-flex items-center overflow-hidden bg-surface',
        'rounded-[var(--xen-radius-md)] border border-border',
        disabled && 'pointer-events-none opacity-[0.38]',
        className
      )}
      style={fieldRingVars(false)}
    >
      <button
        type="button"
        data-xen-v4-step=""
        aria-label="Decrease"
        className={stepClass}
        disabled={disabled || (min != null && value <= min)}
        onClick={() => set(value - step)}
      >
        −
      </button>
      <input
        type="number"
        data-xen-v4-number=""
        value={value}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onChange={(e) => set(Number(e.target.value))}
        className={cn(
          'h-[var(--xen-space-2xl)] min-w-[var(--xen-space-2xl)] w-[var(--xen-space-2xl)]',
          'border-x border-border bg-transparent px-sm text-center text-base text-on-surface',
          'tabular-nums outline-none'
        )}
      />
      <button
        type="button"
        data-xen-v4-step=""
        aria-label="Increase"
        className={stepClass}
        disabled={disabled || (max != null && value >= max)}
        onClick={() => set(value + step)}
      >
        +
      </button>
    </div>
  );
}
