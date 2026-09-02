import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import type { BadgeSize } from '../primitives/Badge';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { V4_STATE_CSS, V4_STATE_STYLE_ID } from '../primitives/internal/v4-state';
import type { BehaviorBadgeProps, BehaviorTone } from './BehaviorBadge';
import { FOCUS_RING_CLASS, spokenLine, surfaceStateVars } from './internal/tone-v4';

export interface BehaviorBadgeV4Props
  extends BehaviorBadgeProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'onClick'> {
  /** A neutral sentence of context under the chip — what happened, not a verdict. */
  note?: string;
  /** Replace the three tone words. They were hard-coded English. */
  toneLabels?: Partial<Record<BehaviorTone, string>>;
  /** Chip size. The base declared this prop on web and never read it. */
  size?: BadgeSize;
}

/** The glyph each tone carries when the caller gives no `icon`. */
const TONE_GLYPH: Record<BehaviorTone, string> = {
  positive: '👍',
  negative: '👎',
  neutral: '•',
};

/** The sign the point value wears. `−` is U+2212, not a hyphen. */
const TONE_SIGN: Record<BehaviorTone, string> = {
  positive: '+',
  negative: '−',
  neutral: '',
};

/**
 * The default word each tone says out loud.
 *
 * `'negative'` was being read to a parent verbatim — "negative behavior:
 * Interrupted (−2)" — which is a verdict on a child rather than a description
 * of a moment. These three are descriptive instead, and all three are
 * replaceable through `toneLabels`.
 */
const TONE_LABEL: Record<BehaviorTone, string> = {
  positive: 'Positive',
  negative: 'Needs work',
  neutral: 'Noted',
};

/**
 * **V4 behavior badge** — same props as {@link BehaviorBadge} plus `note`,
 * `toneLabels` and a `size` that is finally read, on the standard
 * `className`/`style` surface.
 *
 * ## Six changes
 *
 * 1. **A child's conduct is no longer drawn in the error colour.** The base
 *    mapped `negative → danger`, and the web `Badge` defaults to `solid`, so
 *    `<BehaviorBadge tone="negative" label="Interrupted" points={2} />` put a
 *    saturated red chip against a six-year-old's name. `danger` means
 *    *something has gone wrong with the system*; spending it on a child is
 *    both a status-colour-on-identity violation and a shaming pattern. All
 *    three tones now wear one neutral chip, and the tone is carried by a glyph,
 *    a word and the signed number instead.
 * 2. **The spoken name stopped passing judgement.** It was the raw enum:
 *    "negative behavior: Interrupted (−2)". It is now the tone's *word* —
 *    "Needs work, Interrupted, −2" — and every word in it is overridable.
 * 3. **The chip can be positioned.** `BehaviorBadgeProps` extended nothing, so
 *    a caller could not pass `className`, `style`, `id` or a data attribute; a
 *    chip that cannot be placed is a chip that gets re-implemented. It now
 *    takes the standard HTML attribute surface.
 * 4. **`size` does something.** The base declared it "for prop parity" and
 *    dropped it on the floor, so `size="sm"` was silently `md` on web and `sm`
 *    on native — the same call, two chips.
 * 5. **`note` gives the neutral explanation a home.** Logging that a child
 *    interrupted without room to say why is how a log becomes a tally.
 * 6. **A press is the M3 state layer and clears 44.** It was
 *    `hover:opacity-70` — the band M3 spends on *disabled* — on a chip-sized
 *    target, in a module whose users are children.
 */
export const BehaviorBadgeV4 = React.forwardRef<
  HTMLButtonElement | HTMLSpanElement,
  BehaviorBadgeV4Props
>(function BehaviorBadgeV4(
  { label, tone = 'neutral', points, icon, size = 'md', note, toneLabels, onClick, className, ...rest },
  ref
) {
  React.useEffect(() => {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
  }, []);

  if (!label) return null;

  const glyph = icon ?? TONE_GLYPH[tone];
  const word = toneLabels?.[tone] ?? TONE_LABEL[tone];
  const pointsText =
    typeof points === 'number' && Number.isFinite(points)
      ? `${TONE_SIGN[tone]}${Math.abs(points)}`
      : undefined;

  const name = spokenLine([word, label, pointsText, note]);

  const chip = (
    <>
      <BadgeV4 tone="neutral" variant="soft" size={size}>
        <span aria-hidden="true">{glyph}</span>
        <span>{label}</span>
        {pointsText ? <span className="font-bold">{pointsText}</span> : null}
      </BadgeV4>
      {note ? <span className="text-xs text-muted-text">{note}</span> : null}
    </>
  );

  if (!onClick) {
    return (
      <span
        {...rest}
        ref={ref as React.Ref<HTMLSpanElement>}
        data-xen-behavior-badge=""
        role="group"
        aria-label={name}
        className={cn('inline-flex flex-col items-start gap-xs', className)}
      >
        {chip}
      </span>
    );
  }

  return (
    <button
      // Spread first: the base put `{...rest}` after `onClick`, so a caller
      // passing any handler through silently replaced the chip's own.
      {...rest}
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      data-xen-behavior-badge=""
      aria-label={name}
      onClick={() => onClick()}
      data-xen-v4-state=""
      style={surfaceStateVars()}
      className={cn(
        'inline-flex flex-col items-start justify-center gap-xs rounded-[var(--xen-radius-md)]',
        MIN_TAP_CLASS,
        FOCUS_RING_CLASS,
        className
      )}
    >
      {chip}
    </button>
  );
});
