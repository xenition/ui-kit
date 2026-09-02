import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { PolicyVariant } from './internal/status';
/** The six captions an ID card draws over its fields. */
export interface InsuranceIdCardV4Labels {
    /** Over the policy number. Default `'Policy number'`. */
    policyNumber?: string;
    /** Over the named insured. Default `'Insured'`. */
    insured?: string;
    /** Over the covered vehicle or property. Default `'Covered'`. */
    subject?: string;
    /** Over the effective date. Default `'Effective'`. */
    effective?: string;
    /** Over the expiry date. Default `'Expires'`. */
    expires?: string;
    /** Over the NAIC / issuer code. Default `'NAIC'`. */
    issuerCode?: string;
}
export interface InsuranceIdCardV4Props {
    /** Carrier or underwriter name, drawn as the card's masthead. */
    carrier: string;
    /** Policy identifier, e.g. `'AUTO-4821-93'`. */
    policyNumber: string;
    /** Named insured. */
    insured?: string;
    /** What is covered — a vehicle, an address, a life. Already formatted. */
    subject?: string;
    /** Line of insurance. Drives the glyph and the line word. Default `'auto'`. */
    variant?: PolicyVariant;
    /** Localized start of the term, already formatted by the caller. */
    effectiveDate?: string;
    /** Localized end of the term, already formatted by the caller. */
    expiryDate?: string;
    /** Issuer / NAIC code, where the jurisdiction requires it on the card. */
    issuerCode?: string;
    /** Override the six English captions. */
    labels?: InsuranceIdCardV4Labels;
    /** Test hook, matching the rest of the module. */
    testID?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * **V4 insurance ID card** — a new component. There is no base to extend, so
 * the props are plain `InsuranceIdCardV4Props`.
 *
 * ## Why it exists
 *
 * `PolicyDocumentRow` already ships an `'id-card'` document kind, with a glyph
 * and a row, pointing at a component the module never had. Proof of insurance
 * is the **most-opened screen in an auto app** — it is what a person holds up
 * at a roadside stop, hands to a body shop, or reads down a phone line to
 * another driver's adjuster — and until now the kit's answer was a PDF behind a
 * download button.
 *
 * ## What the screen owes, and how each is paid
 *
 * 1. **It is read aloud, out of order, under pressure.** Someone reading a
 *    policy number over the phone reads it in groups, and someone holding the
 *    phone up at a window needs the number legible at arm's length. The policy
 *    number is set at display size in tabular figures so the digits align and
 *    a `1` cannot be mistaken for a narrower glyph, and each field is its own
 *    accessible stop with its caption — `"Policy number, AUTO-4821-93"` — so a
 *    reader can go straight to the one fact being asked for instead of hearing
 *    the whole card from the top each time.
 * 2. **The card as a whole is one stop too.** The masthead carries the carrier,
 *    the line and the term, so a first swipe answers "whose policy, what kind,
 *    still valid?" before any field is reached.
 * 3. **Nothing is carried by colour.** There is no status here at all: an ID
 *    card states a term, and whether the term has expired is arithmetic on two
 *    dates the caller has already formatted. A green or red card would be this
 *    component asserting a verdict it cannot compute — the same defect
 *    `ClaimStatusTracker` shipped with an invented denial reason.
 * 4. **The line glyph is decorative.** The line's *word* is in the masthead;
 *    a `🚗` announced as "automobile" beside the word "Auto" is one fact twice.
 *
 * **Renders nothing without a `carrier` and a `policyNumber`** (§4.5) — a proof
 * of insurance missing either is not a card with a gap in it, it is not proof.
 */
export declare function InsuranceIdCardV4({ carrier, policyNumber, insured, subject, variant, effectiveDate, expiryDate, issuerCode, labels, testID, style, }: InsuranceIdCardV4Props): React.ReactElement | null;
//# sourceMappingURL=InsuranceIdCardV4.d.ts.map