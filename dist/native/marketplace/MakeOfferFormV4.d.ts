import * as React from 'react';
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
 * **V4 make-an-offer form** — the one place in `marketplace` where the user is
 * typing rather than choosing, so it is the one place the field metric and the
 * error exception both land.
 *
 * What changes against the base:
 *
 * 1. **The V4 field metric, from the primitive that owns it.** `InputV4` is
 *    `spacing['2xl']` (48) tall on `radius.md` with the shared focus halo — the
 *    metric `primitives/internal/field-v4.ts` exists to decide once so eleven
 *    controls cannot each pick their own height. The base composed the v0
 *    `Input`, so an offer field and a checkout field in the same flow were
 *    different objects.
 * 2. **The rejection is a sentence, not a colour.** The base already wrote the
 *    message — it just wrote it itself, in `colors.danger`, in a `Text` beside
 *    a field whose only link to it was proximity. `InputV4 error` renders it in
 *    the contrast-corrected `dangerText` slot (`danger` is a *fill* and was
 *    being used as an ink) and announces it, so the recovery copy is attached
 *    to the control it is about instead of "invalid".
 * 3. **The panel is a card, on `card`.** Brief rule 4: a card's ground is
 *    `colors.card`, not `colors.surface`. `CardV4` still paints `surface`
 *    itself — it predates the split — so the ground is named here, which is the
 *    same override the dashboard cards make.
 * 4. **The asking price is tabular and goes through `formatMoney`** (rules 1
 *    and 2), like every other amount in these two modules.
 * 5. **The submit is full width.** An offer form has exactly one thing to do,
 *    and §5 asks a block to have one dominant action rather than a
 *    shrink-wrapped button floating at the end of a stack.
 * 6. **One name for the field.** The base drew a visible "Your offer" label and
 *    then set `accessibilityLabel="Offer amount"` over it, so the spoken name
 *    was a string the visible label did not contain — WCAG 2.5.3, and a
 *    voice-control user saying "your offer" hit nothing. `InputV4 label` is the
 *    name, and the override is gone.
 *
 * Presentational: nothing is sent. A valid submit calls
 * `onSubmit(offerCents, message?)`.
 */
export declare function MakeOfferFormV4({ listPriceCents, currency, minOfferCents, withMessage, submitLabel, loading, onSubmit, testID, error, style, }: MakeOfferFormV4Props): React.ReactElement;
//# sourceMappingURL=MakeOfferFormV4.d.ts.map