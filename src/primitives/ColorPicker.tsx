import * as React from 'react';
import { cn } from './cn';

export interface ColorSwatch {
  /** Accessible name for the swatch. */
  label: string;
  /** The identifier reported through `onChange` (a token name or hex string). */
  value: string;
  /**
   * Token background class (e.g. `bg-primary`) painting the swatch. When
   * omitted, `value` is applied as an inline background color — pass this for
   * the default token palette so no literal color appears in source.
   */
  className?: string;
}

export interface ColorPickerProps {
  /** Controlled selected color identifier. */
  value?: string;
  /** Fires with the chosen swatch's `value`. */
  onChange?: (value: string) => void;
  /**
   * Optional explicit swatches. When omitted, a themed palette drawn from the
   * semantic color tokens is used, so every swatch is token-pure.
   */
  swatches?: ColorSwatch[];
  disabled?: boolean;
  /** Accessible label for the grid. */
  accessibilityLabel?: string;
  className?: string;
}

/**
 * Swatch-grid color picker — a grid of tappable color chips. With no `swatches`
 * prop it builds its palette straight from the semantic theme tokens (primary,
 * accent, success, warn, danger, plus neutrals) via `bg-*` classes, so the
 * rendered colors are always token-pure — no literal colors (kit lint rule).
 * The selected chip gets a `primary` selection ring.
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

export function ColorPicker({
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
      className={cn('flex flex-wrap gap-sm', disabled && 'pointer-events-none opacity-50', className)}
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
              'flex h-9 w-9 items-center justify-center rounded-[var(--xen-radius-full)] border transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
              active ? 'border-2 border-primary' : 'border-border'
            )}
          >
            <span
              aria-hidden
              className={cn('h-5 w-5 rounded-[var(--xen-radius-full)]', sw.className)}
              style={sw.className ? undefined : { backgroundColor: sw.value }}
            />
          </button>
        );
      })}
    </div>
  );
}
