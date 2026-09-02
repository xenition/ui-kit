import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { V4_STATE_CSS, V4_STATE_STYLE_ID } from '../primitives/internal/v4-state';
import type { SkillTagProps, SkillTagVariant } from './SkillTag';
import {
  cardStateVars,
  FOCUS_RING_CLASS,
  MIN_TAP_CLASS,
  MIN_TAP_SQUARE_CLASS,
  spokenLine,
} from './internal/tone-v4';

export interface SkillTagV4Props extends SkillTagProps {
  /** Names the ✕. Default `'Remove <label>'`, so it never announces "button". */
  removeLabel?: string;
  /** What each variant means, in words. `default` says nothing extra. */
  variantLabels?: Partial<Record<SkillTagVariant, string>>;
}

/** The chip's ground and ink per variant. `default` is identity, so neutral. */
const VARIANT_CLASS: Record<SkillTagVariant, string> = {
  // `bg-neutral-100` mirrors under `[data-theme="dark"]` and paints a near-white
  // slab on a dark page; `card` is the slot for a raised chip in both schemes.
  default: 'border border-border bg-card text-on-card',
  matched: 'border border-success bg-success text-on-success',
  missing: 'border border-danger bg-danger text-on-danger',
};

/** The state layer's ground/ink pair per variant — the fill it actually wears. */
const VARIANT_STATE: Record<SkillTagVariant, [string, string]> = {
  default: ['var(--xen-card)', 'var(--xen-on-card)'],
  matched: ['var(--xen-success)', 'var(--xen-on-success)'],
  missing: ['var(--xen-danger)', 'var(--xen-on-danger)'],
};

/** A non-colour signal, so the variant survives monochrome and colour blindness. */
const MARKER: Record<SkillTagVariant, string> = {
  default: '',
  matched: '✓ ',
  missing: '! ',
};

/** What each variant *means*, said out loud. The marker is only half of it. */
const VARIANT_LABEL: Record<SkillTagVariant, string | undefined> = {
  default: undefined,
  matched: 'on your résumé',
  missing: 'missing from your résumé',
};

/**
 * **V4 skill tag** — same props as {@link SkillTag} plus `removeLabel` and
 * `variantLabels`.
 *
 * ## Five changes
 *
 * 1. **A removable, pressable chip is no longer a `<button>` inside a
 *    `<button>`.** That is invalid HTML — the parser closes the outer button
 *    before the inner one even opens — and invalid ARIA, and it is what the
 *    base emitted for every chip that had both `onClick` and `onRemove`. What
 *    the browser actually built was two sibling buttons with the ✕ outside the
 *    chip's own box, so the guard around its click (`stopPropagation`) was
 *    guarding against a bubble that no longer happened, while the chip's press
 *    target silently lost its trailing half. The pill is now a plain `<span>`
 *    that *contains* two siblings: the chip's activation, and the ✕.
 * 2. **The variant stops being lost in the name.** `aria-label={label}`
 *    overrode the whole subtree, marker included, so a chip visibly marked
 *    "! React" — required and *not* on your résumé — announced "React", which
 *    is the opposite reading. The name is now the label and the variant's
 *    meaning together.
 * 3. **The chip is a real tap target.** It was roughly 20px tall (`py-[3px]`
 *    around a 12px label) and it is the most-tapped control in the module,
 *    because `JobFilterBar` is built out of these. Both the activation and
 *    the ✕ clear 44.
 * 4. **Press is a state layer, not `hover:opacity-90`.** Dimming fades the
 *    chip's own *content*, which is the signal M3 spends 0.38 on to mean
 *    disabled — so a hovered chip and a dead one looked alike.
 * 5. **The default chip stops painting itself with a hairline colour.**
 *    `bg-neutral-100` is a ramp step that inverts under a dark seed; the
 *    neutral chip now takes `card` with a `border` hairline, which is what
 *    `border` is for.
 */
export const SkillTagV4 = React.forwardRef<HTMLSpanElement, SkillTagV4Props>(function SkillTagV4(
  {
    label,
    variant = 'default',
    selected = false,
    onClick,
    onRemove,
    removeLabel,
    variantLabels,
    className,
    ...rest
  },
  ref
) {
  React.useEffect(() => {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
  }, []);

  const meaning = variantLabels?.[variant] ?? VARIANT_LABEL[variant];
  const name = spokenLine([label, meaning]);
  const [ground, ink] = VARIANT_STATE[variant];

  const text = (
    <>
      <span aria-hidden="true">{MARKER[variant]}</span>
      {label}
    </>
  );

  return (
    <span
      ref={ref}
      data-xen-v4-skill-tag=""
      className={cn(
        'inline-flex shrink-0 items-center gap-xs self-start overflow-hidden',
        'rounded-[var(--xen-radius-sm)] text-xs font-medium',
        VARIANT_CLASS[variant],
        selected && 'ring-2 ring-ring',
        className
      )}
      {...rest}
    >
      {onClick ? (
        <button
          type="button"
          aria-label={name}
          aria-pressed={selected}
          onClick={onClick}
          data-xen-v4-state=""
          style={cardStateVars(ground, ink)}
          className={cn(
            'inline-flex items-center px-sm text-inherit',
            MIN_TAP_CLASS,
            FOCUS_RING_CLASS
          )}
        >
          {text}
        </button>
      ) : (
        /*
          Not interactive, so it is not a target and does not pay the 44 floor.
          The meaning still rides with it, as text a reader will actually read
          rather than as a label on something that cannot carry one.
        */
        <span className="inline-flex items-center px-sm py-xs">
          {text}
          {meaning ? <span className="sr-only">{`, ${meaning}`}</span> : null}
        </span>
      )}

      {/*
        A sibling of the chip's activation, never a descendant of it. This is
        the whole defect: nesting made the markup invalid and split the chip in
        two places the base never intended.
      */}
      {onRemove ? (
        <button
          type="button"
          aria-label={removeLabel ?? `Remove ${label}`}
          onClick={onRemove}
          data-xen-v4-state=""
          style={cardStateVars(ground, ink)}
          className={cn(
            'inline-flex items-center justify-center font-semibold text-inherit',
            MIN_TAP_SQUARE_CLASS,
            FOCUS_RING_CLASS
          )}
        >
          <span aria-hidden="true">×</span>
        </button>
      ) : null}
    </span>
  );
});
