import * as React from 'react';
import { cn } from '../primitives/cn';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CardV4 } from '../primitives/CardV4';
import { injectStyleOnce } from '../motion/internal/inject';
import {
  V4_CARD_GROUND_ATTR,
  V4_CARD_GROUND_CSS,
  V4_CARD_GROUND_STYLE_ID,
} from '../primitives/internal/card-ground-v4';
import { InputV4 } from '../primitives/InputV4';
import { TextV4 } from '../primitives/TextV4';
import { formatMoney } from '../commerce';
import type { MakeOfferFormProps } from './MakeOfferForm';

export interface MakeOfferFormV4Props extends MakeOfferFormProps {
  /**
   * A rejection the form cannot work out for itself — the listing ended, the
   * seller stopped taking offers, the payment method was declined.
   *
   * This is the **`error?: string` exception** (`ONBOARDING-DESIGN-SPEC.md`
   * Addendum item 2, and this brief's Group D note): a V4 takes exactly its
   * base's props, except that a field-shaped component may add `error`, and it
   * must render the message rather than tint a border. A red outline is
   * invisible to a colour-blind buyer and says "wrong" without saying what to
   * do; parity is a maintenance convenience, and it yields.
   *
   * The form's **own** validation wins while it applies. What is in the box now
   * is the more actionable of the two facts: telling someone their offer was
   * declined while the amount field holds "12,,3" sends them to fix the wrong
   * thing.
   */
  error?: string;
}

/**
 * Parse a currency string ("1,250.50") into integer cents, or null.
 *
 * Unchanged from the base, deliberately. It is the one piece of this component
 * that is not presentation, `MakeOfferForm.parseCents` is not exported, and a
 * V4 may not edit its base — so it is duplicated rather than shared, and the
 * duplication is noted here so the next reader does not think one of them
 * drifted.
 */
function parseCents(raw: string): number | null {
  const cleaned = raw.replace(/[^0-9.]/g, '');
  if (cleaned === '' || cleaned === '.') return null;
  const value = Number.parseFloat(cleaned);
  if (!Number.isFinite(value) || value <= 0) return null;
  return Math.round(value * 100);
}

/**
 * **V4 make-an-offer form** — the one place in `marketplace` where the user is
 * typing rather than choosing, so it is the one place the field metric and the
 * error exception both land.
 *
 * What changes against the base:
 *
 * 1. **The V4 field metric, from the primitive that owns it.** `InputV4` is
 *    `spacing['2xl']` (48) tall on `radius.md` with the shared focus halo, from
 *    `primitives/internal/field-v4.ts` — the file that exists so eleven
 *    controls cannot each pick their own height. The base composed the v0
 *    `Input`, so an offer field and a checkout field in the same flow were
 *    different objects.
 * 2. **The rejection is a sentence, not a colour.** The base already wrote the
 *    message — it just wrote it itself, in `text-danger`, in a `<p>` beside a
 *    field whose only link to it was proximity. `InputV4 error` renders it in
 *    `danger-text` (the contrast-corrected slot; `danger` is a *fill* and was
 *    being used as an ink), gives it `role="alert"`, and points the field's
 *    `aria-describedby` at it — so a screen reader gets the recovery copy
 *    attached to the control it is about instead of "invalid".
 * 3. **The panel is a card, on `card`.** Brief rule 4: a card's ground is
 *    `colors.card`, not `colors.surface`. `CardV4` still paints `surface`
 *    itself — it predates the split — so the ground is named here, which is the
 *    same override the dashboard cards make.
 * 4. **The asking price is tabular and goes through `formatMoney`** (rules 1
 *    and 2), like every other amount in these two modules.
 * 5. **The submit is full width.** An offer form has exactly one thing to do,
 *    and §5 asks a block to have one dominant action rather than a
 *    shrink-wrapped button floating at the end of a stack.
 *
 * 6. **One name for the field.** The base drew a visible "Your offer" label and
 *    then set `aria-label="Offer amount"` over it, so the accessible name was a
 *    string the visible label did not contain — WCAG 2.5.3, and a voice-control
 *    user saying "your offer" hit nothing. `InputV4 label` wires the visible
 *    text to the control by `id`, and the override is gone.
 *
 * Presentational: nothing is sent. A valid submit calls
 * `onSubmit(offerCents, message?)`.
 */
export const MakeOfferFormV4 = React.forwardRef<HTMLDivElement, MakeOfferFormV4Props>(
  function MakeOfferFormV4(
    {
      listPriceCents,
      currency = 'USD',
      minOfferCents,
      withMessage = false,
      submitLabel = 'Send offer',
      loading = false,
      onSubmit,
      testId = 'xen-mkt-offer-amount',
      error,
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(V4_CARD_GROUND_STYLE_ID, V4_CARD_GROUND_CSS);

    const [amount, setAmount] = React.useState('');
    const [message, setMessage] = React.useState('');

    const cents = parseCents(amount);
    const belowMin = cents != null && typeof minOfferCents === 'number' && cents < minOfferCents;
    const valid = cents != null && !belowMin;

    // The words. Below-minimum is spelled out with the actual figure, because
    // "too low" is not a recovery instruction and "at least $40.00" is.
    const localError =
      amount.length > 0 && cents == null
        ? 'Enter a valid amount'
        : belowMin && typeof minOfferCents === 'number'
          ? `Offer must be at least ${formatMoney(minOfferCents, currency)}`
          : undefined;

    // What is in the box now outranks what the server said a moment ago.
    const shownError = localError ?? (error !== '' ? error : undefined);

    const submit = (): void => {
      if (!valid || loading || cents == null) return;
      onSubmit?.(cents, withMessage && message.trim() ? message.trim() : undefined);
    };

    return (
      <CardV4
        ref={ref}
        data-xen-offer-form=""
        variant="outlined"
        padding="lg"
        radius="lg"
        // Rule 4: a card's ground is `card`, not `surface` — and this cannot
        // be said in `className`. `cn()` is a plain join with no
        // `tailwind-merge`, so `bg-card` and `CardV4`'s own `bg-surface` both
        // land on the element and the sheet's ordering picks the winner, which
        // is `bg-surface`. This panel shipped painting the page colour while
        // every card around it was lifted. The ground comes from the shared
        // specificity rule instead.
        {...V4_CARD_GROUND_ATTR}
        className={cn('flex flex-col gap-md', className)}
        {...rest}
      >
        {typeof listPriceCents === 'number' ? (
          <TextV4 size="sm" tone="mutedText" numeric="tabular">
            {`Asking ${formatMoney(listPriceCents, currency)}`}
          </TextV4>
        ) : null}
        <InputV4
          data-testid={testId}
          label="Your offer"
          inputMode="decimal"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          error={shownError}
        />
        {withMessage ? (
          <InputV4
            data-testid="xen-mkt-offer-message"
            label="Message (optional)"
            placeholder="Add a note to the seller"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        ) : null}
        <ButtonV4 variant="primary" onClick={submit} disabled={!valid || loading} className="w-full">
          {loading ? 'Sending…' : submitLabel}
        </ButtonV4>
      </CardV4>
    );
  }
);
