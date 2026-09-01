import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { TONE_BG, TONE_VAR } from '../primitives/internal/tone-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import { TONE_ON, toneInkClass } from './internal/crm-v4';
import type { CrmTone } from './internal';
import type { TagFilterBarProps } from './TagFilterBar';

export interface TagFilterBarV4Props extends TagFilterBarProps {
  /**
   * How a chip's accessible name is built from its label and its count.
   * Default `` `${label}, ${count}` ``, or the bare label when there is none.
   */
  formatFilterLabel?: (label: string, count?: number) => string;
}

/**
 * A selected chip's paired ink, as a custom property.
 *
 * `TONE_VAR` already gives the fill; the state layer needs the **ink** as a
 * variable too, so the layer it mixes is the chip's own content colour over the
 * chip's own ground rather than the page's. Same six rows as `TONE_ON`, in the
 * one spelling `color-mix()` can read.
 */
const TONE_ON_VAR: Record<CrmTone, string> = {
  neutral: 'var(--xen-on-surface)',
  primary: 'var(--xen-on-primary)',
  accent: 'var(--xen-on-accent)',
  success: 'var(--xen-on-success)',
  warn: 'var(--xen-on-warn)',
  danger: 'var(--xen-on-danger)',
};

/**
 * **V4 tag filter bar** — the web twin of the native `TagFilterBarV4`, same
 * props as {@link TagFilterBar} plus `formatFilterLabel`.
 *
 * ## Five changes
 *
 * 1. **A selected chip is readable, on both twins.** Native filled with
 *    `colors[tone]` and inked with `colors.onSurface` for every tone but
 *    `primary` and `accent` — body ink on a saturated brand fill, with no
 *    contrast promise anywhere in it — and `neutral` filled the chip with
 *    `colors.muted`, a **text** token. The fill and its ink now come from one
 *    table, so they can never disagree about which tone they are.
 * 2. **The idle chip's ground is opaque.** Web painted a `bg-neutral-100` ramp
 *    step and native a translucent wash whose rendered colour depended on
 *    whatever the caller put behind the bar.
 * 3. **The chips and the Clear control clear 44**, and Clear is a real button
 *    with a border rather than a word of red text floating in the row.
 * 4. **The count joins the chip's name.** It was drawn and never announced, so
 *    a reader could not tell a filter with 40 matches from one with none.
 * 5. **Selection is announced once.** The base said `aria-pressed` *and*
 *    appended ", selected" to the label, so a screen reader said it twice.
 *
 * Rule B applies throughout: a press is the M3 state layer, not an opacity.
 */
export const TagFilterBarV4 = React.forwardRef<HTMLDivElement, TagFilterBarV4Props>(
  function TagFilterBarV4(
    {
      tags,
      selected,
      onToggle,
      onClear,
      tone = 'primary',
      emptyLabel = 'No filters',
      formatFilterLabel,
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const list = tags ?? [];
    const active = selected ?? [];
    const spellLabel =
      formatFilterLabel ?? ((label: string, count?: number) => (count != null ? `${label}, ${count}` : label));

    if (list.length === 0) {
      return (
        <div
          ref={ref}
          role="status"
          aria-label={emptyLabel}
          className={cn('py-sm text-sm text-muted-text', className)}
          {...rest}
        >
          {emptyLabel}
        </div>
      );
    }

    return (
      <div ref={ref} className={cn('flex w-full items-center gap-xs overflow-x-auto', className)} {...rest}>
        {list.map((tag) => {
          const isOn = active.includes(tag.key);
          return (
            <button
              key={tag.key}
              type="button"
              // Once, not twice: `aria-pressed` already says "selected".
              aria-pressed={isOn}
              aria-label={spellLabel(tag.label, tag.count)}
              onClick={() => onToggle(tag.key)}
              data-xen-v4-state=""
              style={
                // A selected chip wears its tone's pair, so its press layer is
                // that tone's ink over that tone's fill — not `on-surface` over
                // the page, which is a layer for a ground the chip is not on.
                stateGroundVars(
                  isOn ? TONE_VAR[tone] : 'var(--xen-card)',
                  isOn ? TONE_ON_VAR[tone] : 'var(--xen-on-card)'
                ) as React.CSSProperties
              }
              className={cn(
                'inline-flex shrink-0 items-center gap-xs rounded-[var(--xen-radius-full)] border px-sm py-xs text-sm',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                MIN_TAP_CLASS,
                isOn
                  ? // One table decides the fill and the ink together, so the
                    // pair is the compiler's guaranteed one for this tone.
                    cn(TONE_BG[tone], TONE_ON[tone], 'border-transparent font-bold')
                  : // Opaque, and the raised slot rather than a ramp step.
                    'border-border bg-card text-on-card font-medium'
              )}
            >
              {isOn ? (
                <span aria-hidden="true" className="text-xs font-bold">
                  ✓
                </span>
              ) : null}
              <span aria-hidden="true">{tag.label}</span>
              {tag.count != null ? (
                <span aria-hidden="true" className="text-xs font-semibold">
                  {tag.count}
                </span>
              ) : null}
            </button>
          );
        })}

        {onClear && active.length > 0 ? (
          <button
            type="button"
            aria-label="Clear filters"
            onClick={onClear}
            data-xen-v4-state=""
            style={stateGroundVars('var(--xen-card)', 'var(--xen-on-card)') as React.CSSProperties}
            className={cn(
              'inline-flex shrink-0 items-center rounded-[var(--xen-radius-full)] border border-border bg-card px-sm py-xs text-sm font-semibold',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              MIN_TAP_CLASS,
              toneInkClass('danger')
            )}
          >
            Clear
          </button>
        ) : null}
      </div>
    );
  }
);
