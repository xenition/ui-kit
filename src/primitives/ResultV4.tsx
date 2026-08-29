import * as React from 'react';
import { ButtonV4 } from './ButtonV4';
import { cn } from './cn';
import { TONE_SLOTS, tintArbitrary } from './internal/feedback-v4';
import type { ResultProps, ResultStatus } from './Result';

export type { ResultProps as ResultV4Props, ResultStatus };

const GLYPH: Record<ResultStatus, string> = {
  success: '✓',
  error: '✕',
  empty: '∅',
  '404': '?',
};

/**
 * The status seal. `empty` and `404` take **no semantic colour at all** — an
 * empty list is not a warning and a missing page is not a failure, and tinting
 * either spends a meaning §35.4 reserves for real ones. Their disc is a shade
 * of `on-surface`, not a signal.
 */
const SEAL: Record<ResultStatus, { disc: string; mark: string }> = {
  success: {
    disc: `bg-[${tintArbitrary(TONE_SLOTS.success.fill)}]`,
    mark: 'text-success-text',
  },
  error: {
    disc: `bg-[${tintArbitrary(TONE_SLOTS.danger.fill)}]`,
    mark: 'text-danger-text',
  },
  empty: { disc: `bg-[${tintArbitrary('onSurface')}]`, mark: 'text-muted-text' },
  '404': { disc: `bg-[${tintArbitrary('onSurface')}]`, mark: 'text-muted-text' },
};

/**
 * **V4 result** — the web twin of the native `ResultV4`, same props as
 * {@link Result}, a different design line.
 *
 * ## §15 says the action is the component
 *
 * "Empty states should help users progress." Not decorate the absence of
 * content — *progress*. The base drew a `text-3xl` glyph at the top, then a
 * title, then a description, then a hand-rolled `<button>` at the bottom, all
 * four at roughly equal weight. That is a screen where the illustration is the
 * loudest thing and the way out is the quietest.
 *
 * V4 inverts it:
 *
 * - **The action is `ButtonV4`**, at `lg`, not a local button with its own
 *   padding and its own focus ring. It is the kit's real primary action, and
 *   §35.11's one licensed gradient lands here — on the one primary action of
 *   the screen — rather than being spread over a status card. The way out of a
 *   dead end should look like the most solid thing on it.
 * - **The glyph shrinks** from `3xl` to `xl` and moves inside a tinted disc.
 *   §8 lists "icon inside a coloured rounded square for every row" among the
 *   tells of generic AI UI, and the escape from that rule is *for every row* —
 *   this is one mark at the centre of one full-screen state, and it is a circle,
 *   which reads as a status seal rather than as an app icon.
 * - **The description gets a measure.** Capped at eight of the largest spacing
 *   step, so a sentence of explanation stays a column instead of stretching the
 *   width of a monitor (§33 — a line too long to scan is not read).
 *
 * The mark uses the compiler's contrast-safe `*-text` form rather than the raw
 * fill, which has no promise against the tint behind it. The native twin
 * re-measures the same pairing with `ensureContrast`.
 */
export const ResultV4 = React.forwardRef<HTMLDivElement, ResultProps>(function ResultV4(
  { status = 'success', title, description, actionLabel, onAction, icon, className, ...rest },
  ref
) {
  const seal = SEAL[status];
  return (
    <div
      ref={ref}
      data-xen-v4-result={status}
      role="status"
      className={cn(
        'flex w-full flex-col items-center justify-center text-center',
        'gap-[var(--xen-space-md)] bg-surface p-[var(--xen-space-xl)]',
        className
      )}
      {...rest}
    >
      {icon != null ? (
        <span className="inline-flex">{icon}</span>
      ) : (
        <span
          aria-hidden="true"
          className={cn(
            'inline-flex items-center justify-center rounded-full',
            'h-[var(--xen-space-2xl)] w-[var(--xen-space-2xl)]',
            'text-xl leading-none',
            seal.disc,
            seal.mark
          )}
        >
          {GLYPH[status]}
        </span>
      )}
      <h2 className="font-heading text-2xl font-bold text-on-surface">{title}</h2>
      {description != null && (
        <p className="max-w-[calc(var(--xen-space-2xl)*8)] text-base text-muted-text">{description}</p>
      )}
      {actionLabel && (
        <ButtonV4 size="lg" onClick={onAction} className="mt-[var(--xen-space-sm)]">
          {actionLabel}
        </ButtonV4>
      )}
    </div>
  );
});
