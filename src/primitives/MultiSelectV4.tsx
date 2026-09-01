import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { stateCss } from './internal/v4-state';
import { cn } from './cn';
import { useDismiss } from './useDismiss';
import {
  FIELD_V4_CSS,
  FIELD_V4_SHELL,
  FIELD_V4_STYLE_ID,
  fieldBorderClass,
  fieldRingVars,
} from './internal/field-v4';
import { PICKER_V4_CSS } from './internal/picker-v4';
import type { MultiSelectOption, MultiSelectProps } from './MultiSelect';

export type { MultiSelectProps as MultiSelectV4Props, MultiSelectOption };

/** How much brand a chip carries. Chosen, not filled. */
const CHIP_MIX = 14;

const MULTISELECT_V4_CSS = `
[data-xen-v4-chip] {
  background-color: color-mix(in srgb, var(--xen-primary) ${CHIP_MIX}%, var(--xen-surface));
  color: var(--xen-primary-text);
}
[data-xen-v4-listbox] {
  background-color: var(--xen-surface);
  box-shadow: var(--xen-elevation-sheet);
}
/*
  An option under the pointer takes the shared state layer, not a brand tint at
  a hand-picked 8%: the chip is the only thing in this control that gets to be
  brand-coloured, and hovering an option is not choosing it.
*/
[data-xen-v4-option]:hover {
  background-color: ${stateCss('var(--xen-on-surface)', 'var(--xen-surface)', 'hover')};
}
`;

/**
 * **V4 multi-select** — the same props as {@link MultiSelect}, a different
 * design line.
 *
 * The trigger is a **field**: it takes `FIELD_V4_SHELL`, which is the same
 * height, radius and padding `InputV4` and `SelectV4` take, from the same
 * shared constant. A form whose controls disagree about their own height reads
 * as parts that happened to land near each other; matching them is the cheapest
 * quality signal a kit has (§13).
 *
 * Three things changed beyond the metrics:
 *
 * 1. **The chips are not a second brand colour.** The base fills every chip
 *    with `bg-accent`, which puts the brand's secondary hue on screen once per
 *    selection — §35.5 asks for a limited number of simultaneous accents and
 *    §35.2 says the accent is for emphasis, not repetition. A V4 chip is a 14%
 *    brand tint mixed into `surface`, labelled in `--xen-primary-text`, which
 *    is the contrast-safe text form the compiler measured against `surface`.
 * 2. **The chips are not pills.** `--xen-radius-sm` from the seed, so a `sharp`
 *    brand gets square chips. §8 lists excessive pill-shaped controls among the
 *    tells of generic AI UI, and a row of capsules is exactly that shape.
 * 3. **The popover is a layer, and its rows are not.** It carries
 *    `--xen-elevation-sheet` instead of Tailwind's `shadow-lg`, so a
 *    `depth: 'flat'` seed flattens it for free; the hovered row is a token mix
 *    rather than `bg-neutral-100`, which keeps its light-mode orientation under
 *    `[data-theme="dark"]` and lit up as a pale bar on a dark page (§35.9).
 *
 * Focus is the shared V4 halo, drawn with `box-shadow` so arming it costs no
 * layout (§36.11), and `invalid` retints the border and the ring from one flag.
 */
export function MultiSelectV4({
  options,
  value = [],
  onChange,
  placeholder = 'Select…',
  invalid = false,
  disabled = false,
  accessibilityLabel,
  className,
}: MultiSelectProps): React.ReactElement {
  injectStyleOnce(FIELD_V4_STYLE_ID, FIELD_V4_CSS);
  injectStyleOnce('xen-v4-picker-styles', PICKER_V4_CSS);
  injectStyleOnce('xen-v4-multiselect-styles', MULTISELECT_V4_CSS);

  const [open, setOpen] = React.useState(false);
  const ref = useDismiss<HTMLDivElement>(open, () => setOpen(false));

  const chosen = options.filter((o) => value.includes(o.value));
  const toggle = (v: string): void => {
    onChange?.(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);
  };

  return (
    <div ref={ref} className={cn('relative w-full', className)}>
      <button
        type="button"
        data-xen-v4-field=""
        aria-label={accessibilityLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={invalid || undefined}
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          FIELD_V4_SHELL,
          fieldBorderClass(invalid),
          'flex items-center justify-between gap-sm py-xs text-left'
        )}
        style={fieldRingVars(invalid)}
      >
        {chosen.length === 0 ? (
          <span className="text-muted-text">{placeholder}</span>
        ) : (
          <span className="flex flex-1 flex-wrap gap-xs">
            {chosen.map((o) => (
              <span
                key={o.value}
                data-xen-v4-chip=""
                className="rounded-[var(--xen-radius-sm)] px-sm text-sm font-medium"
              >
                {o.label}
              </span>
            ))}
          </span>
        )}
        <span aria-hidden className="text-sm text-muted-text">
          ▾
        </span>
      </button>
      {open ? (
        <div
          role="listbox"
          aria-multiselectable
          data-xen-v4-listbox=""
          /*
            The shared picker panel, opted into the same way `ComboboxV4`,
            `AutoCompleteV4`, `DatePickerV4`, `DateRangePickerV4` and
            `TimePickerV4` do it. This was the one picker in the line that had
            never been wired to it, so its list simply appeared: no entrance at
            all, while every sibling rose an `xs` and faded over
            `PICKER_MOTION.popover` with `EASE_ENTER`.

            `"sheet"` rather than `"card"` because that is the elevation the
            list already wore. The rest of the skin the attribute brings — the
            surface, the hairline, the `lg` radius — is the same value this
            component was already painting, which is exactly why it should
            never have been painting it itself.
          */
          data-xen-v4-pop="sheet"
          className={cn(
            'absolute z-50 mt-xs max-h-60 w-full overflow-auto',
            'rounded-[var(--xen-radius-lg)] border border-border py-xs'
          )}
        >
          {options.map((opt) => {
            const active = value.includes(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                data-xen-v4-option=""
                aria-selected={active}
                onClick={() => toggle(opt.value)}
                className={cn(
                  'flex min-h-[var(--xen-space-2xl)] w-full items-center justify-between gap-sm',
                  'px-md text-left text-base',
                  active ? 'font-semibold text-primary-text' : 'text-on-surface'
                )}
              >
                <span>{opt.label}</span>
                {/* Marked as well as tinted — colour alone is not a state (§46). */}
                <span aria-hidden className="text-primary-text">
                  {active ? '✓' : ''}
                </span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
