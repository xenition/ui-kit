import * as React from 'react';
import { ButtonV4 } from '../primitives/ButtonV4';
import { SpinnerV4 } from '../primitives/SpinnerV4';
import { cn } from '../primitives/cn';
import type { ButtonVariant } from '../primitives/Button';
import type { ApplyButtonProps } from './ApplyButton';
import { MIN_TAP_CLASS } from './internal/tone-v4';

export interface ApplyButtonV4Props extends ApplyButtonProps {
  /** Copy in the `apply` state. Default `'Apply'`. */
  applyLabel?: string;
  /** Copy in the `applied` state. Default `'Applied'`. */
  appliedLabel?: string;
  /** Copy in the `withdrawn` state. Default `'Re-apply'`. */
  reapplyLabel?: string;
}

/**
 * How long after a press a second press is treated as a bounce and dropped.
 *
 * 500ms is the default double-click interval on Windows and the value macOS
 * and GTK both sit near, so it is the interval a user's own hardware already
 * calls "one gesture" — not a number picked to feel about right. Long enough
 * to swallow a fumbled double-tap on a phone; far short of any deliberate
 * second decision.
 */
const DOUBLE_SUBMIT_MS = 500;

/**
 * The tick the `applied` state wears.
 *
 * Decoration, not copy. It is drawn beside `appliedLabel` and hidden from the
 * reader, because a screen reader reads `✓` as "check mark" and "Applied check
 * mark — press to withdraw" is not a sentence. Keeping it out of the prop also
 * keeps a glyph out of the translator's string: `appliedLabel` is the word
 * "Applied" in whatever language, and the tick is drawn either way. The native
 * twin holds the same constant and hides it the same way.
 */
const APPLIED_TICK = '✓';

interface StateConfig {
  label: string;
  variant: ButtonVariant;
  onPress?: () => void;
  /** Whether this state's press submits something and needs guarding. */
  submits: boolean;
  a11y: string;
}

/**
 * **V4 apply button** — same props as {@link ApplyButton} plus `applyLabel`,
 * `appliedLabel` and `reapplyLabel`.
 *
 * ## Four changes
 *
 * 1. **A double-tap no longer submits the application twice.** The base wired
 *    the press straight through to `onApply`, and an application is the least
 *    forgiving thing in the module to send twice — a recruiter sees two
 *    identical candidates and the applicant cannot un-send either. A press is
 *    now dropped when it lands within {@link DOUBLE_SUBMIT_MS} of the previous
 *    one, and the window is reset the moment `state` changes, so a genuine
 *    "apply, then immediately withdraw" is never blocked. Nothing is
 *    remembered across a state change, so the button can never end up
 *    permanently dead waiting for an acknowledgement the app never sends.
 * 2. **The button stays focusable while it is busy.** `disabled={loading}`
 *    removes an element from the tab order *and* blurs it, so the moment a
 *    keyboard user pressed Apply their focus was dumped on `<body>` and the
 *    next Tab restarted from the top of the page. Busy is now
 *    `aria-disabled` + `aria-busy`, which announces "dimmed, busy", keeps the
 *    focus ring where the user put it, and still refuses the press.
 * 3. **`loading` and `disabled` are finally different things.** On web they
 *    were the same expression — `disabled={disabled || loading}` — so a job
 *    you cannot apply for and a job you are *currently applying for* looked
 *    and announced identically; native, meanwhile, drew them differently
 *    again. Loading keeps full contrast and adds a spinner; disabled takes
 *    M3's 0.38 disabled band and the real `disabled` attribute, because a
 *    control that will not respond at all should not be in the tab order.
 * 4. **The copy is translatable, and only the copy.** Three English strings
 *    were hard-coded in a component whose entire content is those strings.
 *    The applied state's tick stays out of them: it is drawn as decoration
 *    beside the label and hidden from the reader (see {@link APPLIED_TICK}),
 *    so `appliedLabel` is a word a translator can translate and the accessible
 *    name is the same tick-free sentence the native twin says.
 */
export const ApplyButtonV4 = React.forwardRef<HTMLButtonElement, ApplyButtonV4Props>(
  function ApplyButtonV4(
    {
      state = 'apply',
      onApply,
      onWithdraw,
      loading = false,
      disabled = false,
      size = 'md',
      block = false,
      applyLabel = 'Apply',
      appliedLabel = 'Applied',
      reapplyLabel = 'Re-apply',
      className,
    },
    ref
  ) {
    const lastPress = React.useRef(0);

    // The app answered — the state it moved to *is* the acknowledgement — so
    // the next press is a new intent rather than the tail of the last one.
    React.useEffect(() => {
      lastPress.current = 0;
    }, [state]);

    const config: StateConfig = {
      apply: {
        label: applyLabel,
        variant: 'primary' as const,
        onPress: onApply,
        submits: true,
        a11y: `${applyLabel} to this job`,
      },
      applied: {
        label: appliedLabel,
        variant: 'secondary' as const,
        onPress: onWithdraw,
        submits: false,
        a11y: `${appliedLabel} — press to withdraw`,
      },
      withdrawn: {
        label: reapplyLabel,
        variant: 'ghost' as const,
        onPress: onApply,
        submits: true,
        a11y: `Application withdrawn — press to ${reapplyLabel.toLowerCase()}`,
      },
    }[state];

    const busy = loading && !disabled;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
      // `aria-disabled` is a promise to the reader, not an enforcement — the
      // element is still clickable, so the refusal has to be written out.
      if (busy || disabled) {
        event.preventDefault();
        return;
      }
      if (config.submits) {
        const now = Date.now();
        if (now - lastPress.current < DOUBLE_SUBMIT_MS) return;
        lastPress.current = now;
      }
      config.onPress?.();
    };

    return (
      <ButtonV4
        ref={ref as React.Ref<HTMLButtonElement>}
        variant={config.variant}
        size={size}
        disabled={disabled}
        aria-disabled={busy || undefined}
        aria-busy={busy || undefined}
        aria-label={config.a11y}
        onClick={handleClick}
        className={cn(MIN_TAP_CLASS, block && 'w-full', className)}
      >
        {busy ? <SpinnerV4 size="sm" /> : null}
        {config.label}
        {/*
          The visible row is still "Applied ✓" — the tick just is not part of
          the name, so what the reader hears and what `appliedLabel` carries
          are the same tick-free words on both twins. `ButtonV4`'s own `gap-sm`
          sets it off the label.
        */}
        {state === 'applied' ? <span aria-hidden="true">{APPLIED_TICK}</span> : null}
      </ButtonV4>
    );
  }
);
