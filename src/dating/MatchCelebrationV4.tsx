import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { AvatarV4 } from '../primitives/AvatarV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { IconV4 } from '../primitives/IconV4';
import { MIN_TAP_SQUARE_CLASS } from '../primitives/internal/nav-v4';
import {
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
  stateGroundVars,
} from '../primitives/internal/v4-state';
import { PHOTO_SCRIM_STRONG, TONE_INK, type ToneV4 } from './internal/profile-v4';
import type { MatchCelebrationProps, MatchCelebrationVariant } from './MatchCelebration';

export interface MatchCelebrationV4Props extends MatchCelebrationProps {
  /** Name for the close control. Default `'Close'`. */
  closeLabel?: string;
}

/**
 * The two celebrations, told apart by more than their copy.
 *
 * `variant="superlike"` changed the headline and the sentence and nothing
 * else, so the one moment the product is trying to make feel different looked
 * identical. It is `accent` throughout — the mark between the avatars, the
 * halo around them and the headline — and the mark itself is a star rather
 * than a heart, so the difference survives a greyscale screenshot.
 */
const VARIANT: Record<MatchCelebrationVariant, { tone: ToneV4; glyph: string; fill: string }> = {
  match: { tone: 'primary', glyph: '♥', fill: 'bg-primary text-on-primary' },
  superlike: { tone: 'accent', glyph: '★', fill: 'bg-accent text-on-accent' },
};

const FOCUSABLE = 'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])';

/**
 * **V4 match celebration** — the web twin of the native `MatchCelebrationV4`,
 * same props as {@link MatchCelebration} plus `closeLabel`.
 *
 * ## Five changes
 *
 * 1. **It can be dismissed.** The Escape handler sat on the backdrop `<div>` —
 *    a `<div>` with no `tabIndex`, which therefore never held focus, in a
 *    modal that autofocused nothing. A React `onKeyDown` only fires for keys
 *    pressed inside the subtree, so Escape reached the handler on exactly zero
 *    presses. The listener is on the document, focus moves into the dialog when
 *    it opens and back to whatever opened it when it closes, and Tab is
 *    trapped — a full-screen overlay that leaves focus behind it lets a
 *    keyboard user tab silently through a page they cannot see.
 * 2. **There is a close control.** The two buttons were "send a message" and
 *    "keep swiping", so a user with neither intention had only the backdrop —
 *    and the native twin's backdrop is not pressable at all, which is why this
 *    prop exists on both twins.
 * 3. **The backdrop stops inverting.** `bg-neutral-900` is a ramp step, and the
 *    web ramp *mirrors* under `[data-theme="dark"]`: the scrim over a dark page
 *    was drawn in the near-white step. A scrim is dark in both schemes by
 *    definition, so it is `PHOTO_SCRIM_STRONG`, which is fixed.
 * 4. **The headline is a heading**, and it names the dialog — the base labelled
 *    the dialog with the headline and the sentence glued together and left the
 *    headline itself a `<p>`, so the copy was read twice and the overlay had no
 *    structure to navigate by.
 * 5. **`superlike` looks like something.** See {@link VARIANT}. The heart
 *    between the avatars also stops being `danger`: a match is the best thing
 *    that happens in the product, drawn in the error slot.
 */
export const MatchCelebrationV4 = React.forwardRef<HTMLDivElement, MatchCelebrationV4Props>(
  function MatchCelebrationV4(
    {
      visible,
      you,
      match,
      variant = 'match',
      title,
      onMessage,
      onKeepSwiping,
      onClose,
      messageLabel = 'Send a message',
      keepSwipingLabel = 'Keep swiping',
      closeLabel = 'Close',
    },
    ref
  ) {
    React.useEffect(() => {
      injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
    }, []);

    const headingId = React.useId();
    const dialogRef = React.useRef<HTMLDivElement | null>(null);
    const restoreRef = React.useRef<Element | null>(null);

    // The handler is read through a ref so the key listener subscribes once per
    // opening rather than on every render a parent happens to trigger.
    const closeRef = React.useRef(onClose);
    closeRef.current = onClose;

    React.useEffect(() => {
      if (!visible || typeof document === 'undefined') return undefined;

      restoreRef.current = document.activeElement;
      const dialog = dialogRef.current;
      const first = dialog?.querySelectorAll<HTMLElement>(FOCUSABLE);
      (first && first.length ? first[0] : dialog)?.focus();

      const onKeyDown = (event: KeyboardEvent): void => {
        if (event.key === 'Escape') {
          event.preventDefault();
          closeRef.current?.();
          return;
        }
        if (event.key !== 'Tab') return;
        const nodes = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
        if (!nodes || nodes.length === 0) return;
        const items = Array.from(nodes);
        const head = items[0]!;
        const tail = items[items.length - 1]!;
        if (event.shiftKey && document.activeElement === head) {
          event.preventDefault();
          tail.focus();
        } else if (!event.shiftKey && document.activeElement === tail) {
          event.preventDefault();
          head.focus();
        }
      };

      document.addEventListener('keydown', onKeyDown, true);
      return () => {
        document.removeEventListener('keydown', onKeyDown, true);
        (restoreRef.current as HTMLElement | null)?.focus?.();
      };
    }, [visible]);

    const setRefs = (node: HTMLDivElement | null): void => {
      dialogRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    };

    if (!visible) return null;

    const skin = VARIANT[variant];
    const heading = title ?? (variant === 'superlike' ? 'Super Like sent!' : "It's a Match!");
    const subtitle =
      variant === 'superlike'
        ? `You super liked ${match.name}.`
        : `You and ${match.name} liked each other.`;

    return (
      <div
        // `mousedown` and not `click`: a click that STARTED inside the dialog
        // and ended on the backdrop — a drag off the edge of a button — is not
        // a dismissal, and `onClick` cannot tell the two apart.
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) onClose?.();
        }}
        style={{ backgroundColor: PHOTO_SCRIM_STRONG }}
        className="fixed inset-0 z-50 flex items-center justify-center p-xl"
      >
        <div
          ref={setRefs}
          role="dialog"
          aria-modal="true"
          aria-labelledby={headingId}
          tabIndex={-1}
          className="relative flex w-full max-w-sm flex-col items-center gap-md rounded-[var(--xen-radius-lg)] border border-border bg-surface p-xl"
        >
          <button
            type="button"
            aria-label={closeLabel}
            onClick={() => onClose?.()}
            data-xen-v4-state=""
            style={stateGroundVars('var(--xen-surface)', 'var(--xen-on-surface)')}
            className={cn(
              'absolute right-sm top-sm inline-flex items-center justify-center rounded-full text-on-surface',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              MIN_TAP_SQUARE_CLASS
            )}
          >
            <IconV4 name="close" size="lg" />
          </button>

          <h2
            id={headingId}
            className={cn('font-heading text-2xl font-bold', TONE_INK[skin.tone])}
          >
            {heading}
          </h2>

          <div className="flex items-center gap-md">
            {you ? <AvatarV4 src={you.photoUri} name={you.name} alt="" size="lg" ring /> : null}
            <span
              aria-hidden="true"
              className={cn(
                'flex h-[calc(var(--xen-space-2xl)_-_var(--xen-space-sm))] w-[calc(var(--xen-space-2xl)_-_var(--xen-space-sm))] items-center justify-center rounded-full text-lg',
                skin.fill
              )}
            >
              {skin.glyph}
            </span>
            <AvatarV4 src={match.photoUri} name={match.name} alt="" size="lg" ring />
          </div>

          <p className="text-center text-sm text-muted-text">{subtitle}</p>

          <div className="mt-xs flex w-full flex-col gap-sm">
            <ButtonV4 variant="primary" onClick={() => onMessage?.()}>
              {messageLabel}
            </ButtonV4>
            <ButtonV4 variant="ghost" onClick={() => (onKeepSwiping ?? onClose)?.()}>
              {keepSwipingLabel}
            </ButtonV4>
          </div>
        </div>
      </div>
    );
  }
);
