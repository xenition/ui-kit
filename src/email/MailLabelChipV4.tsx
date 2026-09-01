import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { TONE_BG, TONE_VAR, toneGround } from '../primitives/internal/tone-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import { labelInkClass, TONE_ON } from './internal/mail-v4';
import type { MailLabelChipProps, MailLabelTone, MailLabelVariant } from './MailLabelChip';

export interface MailLabelChipV4Props extends MailLabelChipProps {
  /**
   * How the remove control is named. Default
   * `` (label) => `Remove label ${label}` ``.
   */
  removeLabel?: (label: string) => string;
}

/** 44 on both axes for the remove control, composed from the spacing scale. */
const TAP_SQUARE = 'min-w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]';

/** The chip's silhouette and type, shared by every variant. */
const CHIP_CLASS = 'inline-flex max-w-full items-center gap-xs self-start rounded-full text-xs font-semibold';

/**
 * **V4 mail label chip** — same props as {@link MailLabelChip} plus
 * `removeLabel`.
 *
 * ## Four changes
 *
 * 1. **`soft` is soft for all six tones.** The `SOFT` and `SOLID` maps were
 *    byte-identical for `success`, `warn` and `danger`, so the same
 *    `variant="soft"` chip was a pale wash on the phone and a saturated block
 *    on the web. Soft is now one recipe — the tone mixed 10% into the card —
 *    applied to every tone by the same function.
 * 2. **A mail label is identity, so its ink is neutral.** A "Receipts" chip in
 *    the `danger` slot was indistinguishable from a genuine failure sitting in
 *    the same list. `labelInkClass` folds the three status tones to the neutral
 *    ink; the label's own word carries which label it is.
 * 3. **The remove `×` is a control, not a character.** It was a bare glyph with
 *    no box, roughly 12px of hit area, and it dimmed itself on hover at the
 *    band M3 spends on disabled. It is now a real target that clears 44 and
 *    answers with a state layer.
 * 4. **`solid` neutral gets a guaranteed pair.** It was `bg-muted` with
 *    `text-surface` — a page colour used as ink on a ramp step, a pairing
 *    nothing had measured.
 */
export const MailLabelChipV4 = React.forwardRef<HTMLSpanElement, MailLabelChipV4Props>(
  function MailLabelChipV4(
    {
      label,
      tone = 'neutral',
      variant = 'soft',
      glyph,
      onRemove,
      onClick,
      removeLabel = (value: string) => `Remove label ${value}`,
      className,
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const skin = variantClass(variant, tone);
    const solid = variant === 'solid';
    // `soft` mixes its ground inline, because `color-mix()` over a custom
    // property is not something a class bound to a token can say.
    const ground = variant === 'soft' ? toneGround(tone) : undefined;
    const interactive = onClick != null || onRemove != null;

    const inner = (
      <>
        {glyph ? (
          <span aria-hidden="true" className="text-xs leading-none">
            {glyph}
          </span>
        ) : null}
        <span className="truncate">{label}</span>
      </>
    );

    return (
      <span
        ref={ref}
        style={ground ? { backgroundColor: ground } : undefined}
        className={cn(
          CHIP_CLASS,
          skin,
          // A static chip stays chip-sized; one with controls in it has to be
          // tall enough to hold a target.
          interactive ? cn(MIN_TAP_CLASS, 'px-xs') : 'px-sm py-xs',
          className
        )}
      >
        {onClick ? (
          <button
            type="button"
            aria-label={`Label ${label}`}
            onClick={onClick}
            data-xen-v4-state=""
            style={
              stateGroundVars(
                solid ? TONE_VAR[tone] : 'var(--xen-card)',
                'currentColor'
              ) as React.CSSProperties
            }
            className={cn(
              'inline-flex min-w-0 items-center gap-xs rounded-full px-sm',
              MIN_TAP_CLASS,
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            )}
          >
            {inner}
          </button>
        ) : (
          <span className={cn('inline-flex min-w-0 items-center gap-xs', interactive && 'px-sm')}>
            {inner}
          </span>
        )}
        {onRemove ? (
          <button
            type="button"
            aria-label={removeLabel(label)}
            onClick={onRemove}
            data-xen-v4-state=""
            style={
              stateGroundVars(
                solid ? TONE_VAR[tone] : 'var(--xen-card)',
                'currentColor'
              ) as React.CSSProperties
            }
            className={cn(
              'inline-flex shrink-0 items-center justify-center rounded-full leading-none',
              MIN_TAP_CLASS,
              TAP_SQUARE,
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            )}
          >
            <span aria-hidden="true">×</span>
          </button>
        ) : null}
      </span>
    );
  }
);

/**
 * The chip's ground and ink for one variant.
 *
 * `soft` paints its ground inline (see the call site) and takes only the ink
 * here; `solid` and `outline` are expressible as classes. Every ink is either
 * the tone's guaranteed pair (`solid`) or the identity-folded ink the module's
 * own vocabulary decides (`soft`, `outline`).
 */
function variantClass(variant: MailLabelVariant, tone: MailLabelTone): string {
  if (variant === 'solid') return cn(TONE_BG[tone], TONE_ON[tone]);
  if (variant === 'outline') return cn('border border-border bg-transparent', labelInkClass(tone));
  return labelInkClass(tone);
}
