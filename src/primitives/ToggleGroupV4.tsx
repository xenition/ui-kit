import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from './cn';
import type { ToggleGroupOption, ToggleGroupProps } from './ToggleGroup';
import { CHROME_V4_CSS, CHROME_V4_STYLE_ID } from './internal/chrome-v4';

export type { ToggleGroupProps as ToggleGroupV4Props, ToggleGroupOption };

/**
 * `ToggleGroup`, V4 — the same props, at the height every other control in the
 * form is.
 *
 * ## One form, one edge
 *
 * The single biggest quality signal a form can send is that every control in it
 * agrees. So this takes the shared V4 control metrics: `2xl` tall,
 * `radius.md` — the same numbers `InputV4` shipped and `internal/field-v4`
 * holds for the eleven other form controls. The base's `py-sm` put it around
 * 34, so a toggle group stacked next to a select in the same form was visibly a
 * different family and missed the 44px target as well.
 *
 * ## The seam
 *
 * A hairline `<span>` between cells rather than a `border-l` on each, matching
 * `ButtonGroupV4`. A border on the cell stops at the cell's own padding box, so
 * when one neighbour is filled and the other is not the divider reads as a step
 * rather than a seam; a stretched span is full-bleed in every combination.
 *
 * The group is joined by adjacency and one hairline. No fill, no gradient, no
 * shadow (§9, §11) — the selected cell is what carries colour, and it is the
 * only thing that does.
 *
 * ## Feedback
 *
 * Hover and press are the M3 state layer, and each cell layers over **its own**
 * ground: an unselected cell mixes `on-surface` into `surface`, a selected one
 * mixes `on-primary` into `primary`. The base's `hover:bg-neutral-100` is a
 * light-oriented ramp step that paints a near-white slab on a dark page, and it
 * skipped the selected cell entirely, so the chosen option was the one thing in
 * the control that never answered the pointer.
 *
 * Focus is `--xen-ring` — one ring for the whole kit — inset by 2px so it stays
 * inside the joined shape instead of being clipped by it.
 *
 * ## What the group announces
 *
 * `radiogroup` in single mode, `group` in `multiple` mode. The base said
 * `group` on the web and `radiogroup` on native in **both** modes, so a
 * multi-select group announced itself to a screen reader as a set of mutually
 * exclusive choices — which is the opposite of what it does. `radio` children
 * also require a `radiogroup` parent to be valid at all, so the single-mode
 * case was under-described in the same breath.
 */
export function ToggleGroupV4({
  options,
  value,
  onChange,
  multiple = false,
  disabled = false,
  accessibilityLabel,
  className,
}: ToggleGroupProps): React.ReactElement {
  injectStyleOnce(CHROME_V4_STYLE_ID, CHROME_V4_CSS);

  const selected = React.useMemo<string[]>(() => {
    if (multiple) return Array.isArray(value) ? value : [];
    return typeof value === 'string' && value ? [value] : [];
  }, [value, multiple]);

  const toggle = (v: string): void => {
    if (multiple) {
      const set = new Set(selected);
      if (set.has(v)) set.delete(v);
      else set.add(v);
      onChange?.(Array.from(set));
    } else {
      onChange?.(selected[0] === v ? '' : v);
    }
  };

  return (
    <div
      // `radiogroup` only when the choices actually are exclusive; `radio`
      // children are not valid outside one.
      role={multiple ? 'group' : 'radiogroup'}
      aria-label={accessibilityLabel}
      aria-disabled={disabled || undefined}
      data-xen-v4-toggle-group=""
      className={cn(
        'inline-flex items-stretch overflow-hidden',
        'min-h-[var(--xen-space-2xl)] rounded-[var(--xen-radius-md)] border border-border',
        className
      )}
    >
      {options.map((opt, i) => {
        const active = selected.includes(opt.value);
        const itemDisabled = disabled || opt.disabled === true;
        return (
          <React.Fragment key={opt.value}>
            {i > 0 ? <span aria-hidden="true" className="w-px self-stretch bg-border" /> : null}
            <button
              type="button"
              role={multiple ? 'checkbox' : 'radio'}
              aria-checked={active}
              aria-label={opt.label}
              disabled={itemDisabled}
              onClick={() => toggle(opt.value)}
              // Each cell layers over ITS OWN ground, so the selected one
              // answers the pointer too.
              data-xen-v4-chrome={active ? 'filled-primary' : 'on-surface'}
              className={cn(
                'flex items-center justify-center px-md font-body text-sm',
                'focus-visible:outline-none',
                active
                  ? 'bg-primary font-semibold text-on-primary'
                  : 'bg-surface font-medium text-on-surface'
              )}
            >
              {opt.label}
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
}
