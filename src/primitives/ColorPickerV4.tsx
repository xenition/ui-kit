import * as React from 'react';
import { cn } from './cn';
import type { ColorPickerProps, ColorSwatch } from './ColorPicker';

export type { ColorPickerProps as ColorPickerV4Props, ColorSwatch };

/**
 * The same default palette the base carries, drawn from the semantic tokens via
 * `bg-*` classes so no literal colour appears in source. Redeclared rather than
 * imported because the base does not export it, and a V4 that silently reported
 * different `value` strings would not be the same component.
 */
const DEFAULT_PALETTE: readonly ColorSwatch[] = [
  { label: 'Primary', value: 'primary', className: 'bg-primary' },
  { label: 'Accent', value: 'accent', className: 'bg-accent' },
  { label: 'Success', value: 'success', className: 'bg-success' },
  { label: 'Warning', value: 'warn', className: 'bg-warn' },
  { label: 'Danger', value: 'danger', className: 'bg-danger' },
  { label: 'Foreground', value: 'on-surface', className: 'bg-on-surface' },
  { label: 'Muted', value: 'muted', className: 'bg-muted' },
  { label: 'Border', value: 'border', className: 'bg-border' },
  { label: 'Neutral 300', value: 'neutral-300', className: 'bg-neutral-300' },
  { label: 'Neutral 500', value: 'neutral-500', className: 'bg-neutral-500' },
  { label: 'Neutral 700', value: 'neutral-700', className: 'bg-neutral-700' },
];

/**
 * **V4 swatch picker** — the web twin of `ColorPickerV4`, the same props as
 * {@link ColorPicker}, a different design line.
 *
 * ## Two problems, both about the selected chip
 *
 * 1. **The selection had to stop being a mark on the colour.** The native base
 *    draws a ✓ in `on-primary` on top of the chosen swatch, and `on-primary`
 *    promises AA against `primary` and against nothing else — pick a pale
 *    swatch and the tick disappears. A mark whose legibility depends on which
 *    colour you chose is not a selection state.
 *
 *    So the selection is a **ring around the chip**, never a mark on it. A ring
 *    sits on the page, so its contrast is known and identical for every swatch,
 *    and it is a shape cue rather than only a colour one — what §46 asks for.
 * 2. **The chip was too small to hit.** `h-9 w-9` — 36px — in a wrapping grid
 *    where the neighbouring target is a different colour. Every swatch here is
 *    `--xen-space-2xl` (48px) with the coloured chip drawn smaller inside it,
 *    so the thing you can click is comfortably larger than the thing you are
 *    aiming at.
 *
 * ## Two rings, deliberately
 *
 * The chip always carries a `border` hairline, so a swatch the same colour as
 * the page still has an edge. The selection ring is a second, thicker ring
 * outside it, and its space is **always reserved** — transparent when
 * unselected — so choosing a colour never reflows the grid (§36.11).
 *
 * No depth at all. A swatch grid is a set of colours; a shadow on each one
 * would be one more thing competing with the only thing the control is about.
 */
export function ColorPickerV4({
  value,
  onChange,
  swatches,
  disabled = false,
  accessibilityLabel = 'Choose a color',
  className,
}: ColorPickerProps): React.ReactElement {
  const palette = swatches ?? DEFAULT_PALETTE;

  return (
    <div
      role="radiogroup"
      aria-label={accessibilityLabel}
      className={cn(
        'flex flex-wrap gap-sm',
        disabled && 'pointer-events-none opacity-[0.38]',
        className
      )}
    >
      {palette.map((sw) => {
        const active = value === sw.value;
        return (
          <button
            key={`${sw.label}-${sw.value}`}
            type="button"
            role="radio"
            aria-label={sw.label}
            aria-checked={active}
            disabled={disabled}
            onClick={() => onChange?.(sw.value)}
            className={cn(
              'flex items-center justify-center rounded-[var(--xen-radius-full)]',
              'h-[var(--xen-space-2xl)] w-[var(--xen-space-2xl)]',
              // Always two points of ring, so selecting never reflows the grid.
              'border-2',
              active ? 'border-primary' : 'border-transparent',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                'rounded-[var(--xen-radius-full)] border border-border',
                'h-[calc(var(--xen-space-2xl)_-_var(--xen-space-md))]',
                'w-[calc(var(--xen-space-2xl)_-_var(--xen-space-md))]',
                sw.className
              )}
              style={sw.className ? undefined : { backgroundColor: sw.value }}
            />
          </button>
        );
      })}
    </div>
  );
}
