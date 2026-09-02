import * as React from 'react';
import { cn } from '../primitives/cn';
import { CardV4 } from '../primitives/CardV4';
import { policyVariant, type PolicyVariant } from './internal/status';
import { TABULAR_CLASS, toneGroundStyle } from './internal/tone-v4';

/** The words the card prints in front of its facts. */
export interface InsuranceIdCardV4Labels {
  /** Over the policy number. Default `'Policy number'`. */
  policyNumber?: string;
  /** Over the named insured. Default `'Insured'`. */
  insured?: string;
  /** Over the covered vehicle, property or person. Default `'Covered'`. */
  subject?: string;
  /** Over the start of cover. Default `'Effective'`. */
  effective?: string;
  /** Over the end of cover. Default `'Expires'`. */
  expires?: string;
  /** Over the carrier's filing code. Default `'Issuer code'`. */
  issuerCode?: string;
}

export interface InsuranceIdCardV4Props extends React.HTMLAttributes<HTMLDivElement> {
  /** Issuing carrier. Required — a proof of insurance with no insurer is not one. */
  carrier: string;
  /** Policy identifier (e.g. `'AUTO-4821-93'`). Required for the same reason. */
  policyNumber: string;
  /** Named insured. */
  insured?: string;
  /** What is covered: `'2019 Honda Civic · 1HGBH41JXMN109186'`, an address, a person. */
  subject?: string;
  /** The carrier's filing code — the NAIC number a police officer actually reads. */
  issuerCode?: string;
  /** Start of the cover period, already formatted by the caller. */
  effectiveDate?: string;
  /** End of the cover period, already formatted by the caller. */
  expiryDate?: string;
  /** Line of insurance — drives the leading glyph and the line's own word. */
  variant?: PolicyVariant;
  /** The words in front of the facts. */
  labels?: InsuranceIdCardV4Labels;
  /** Test hook, matching the native twin's. */
  testID?: string;
}

/** Term/definition, in the one register the whole card uses. */
function Fact({ term, value }: { term: string; value: string }): React.ReactElement {
  return (
    <div className="flex min-w-0 flex-col gap-xs">
      <dt className="text-xs uppercase tracking-wide text-muted-text">{term}</dt>
      <dd className={cn('truncate text-sm font-semibold text-on-card', TABULAR_CLASS)}>{value}</dd>
    </div>
  );
}

/**
 * **V4 insurance ID card** — proof of insurance: carrier, policy number,
 * insured, what is covered and the cover period. New in V4; there is no base.
 * The web twin of the native `InsuranceIdCardV4`, whose prop shape is the
 * canonical one.
 *
 * ## Why it exists, and the three things it does that the module did not
 *
 * `PolicyDocumentRow`'s `kind` union already carries `'id-card'`, so the module
 * could list the document and had nothing to render when someone opened it —
 * and in an auto app this is the most-opened screen there is, produced at the
 * roadside with a phone in one hand.
 *
 * 1. **It is a list of labelled facts, not a picture of a card.** Every field
 *    is a `<dt>`/`<dd>` pair, so a reader gets "Policy number, AUTO-4821-93"
 *    rather than two unrelated strings — which is the failure mode of every
 *    card in this module, where a name on the container replaced the content
 *    inside it. Nothing here carries an `aria-label` at all; the content *is*
 *    the reading.
 * 2. **Carrier and policy number are required, and a card missing either
 *    renders nothing.** A frame with blanks in it is read as "the app says I
 *    am covered" by the one person who most needs it to be true. Effective and
 *    expiry are separate facts rather than one joined range, because a card
 *    that knows only when cover started still says something worth reading.
 * 3. **The figures are tabular.** A policy number and a VIN are compared
 *    character by character by someone reading them off a screen; proportional
 *    digits make that measurably harder.
 */
export const InsuranceIdCardV4 = React.forwardRef<HTMLDivElement, InsuranceIdCardV4Props>(
  function InsuranceIdCardV4(
    {
      carrier,
      policyNumber,
      insured,
      subject,
      issuerCode,
      effectiveDate,
      expiryDate,
      variant = 'auto',
      labels,
      testID,
      className,
      ...rest
    },
    ref
  ) {
    // Proof of insurance with the insurer or the policy missing is not proof.
    if (!carrier || !policyNumber) return null;

    const vd = policyVariant(variant);

    return (
      <CardV4
        ref={ref}
        data-testid={testID}
        className={cn('flex flex-col gap-md', className)}
        {...rest}
      >
        <div className="flex items-center gap-md">
          <span
            aria-hidden="true"
            className={cn(
              'flex shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] text-xl',
              'h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]',
              'w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]'
            )}
            style={toneGroundStyle('primary')}
          >
            {vd.glyph}
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base font-bold text-on-card">{carrier}</h3>
            <p className="truncate text-xs text-muted-text">{vd.label}</p>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-md">
          <Fact term={labels?.policyNumber ?? 'Policy number'} value={policyNumber} />
          {insured != null ? (
            <Fact term={labels?.insured ?? 'Insured'} value={insured} />
          ) : null}
          {subject != null ? <Fact term={labels?.subject ?? 'Covered'} value={subject} /> : null}
          {effectiveDate != null ? (
            <Fact term={labels?.effective ?? 'Effective'} value={effectiveDate} />
          ) : null}
          {expiryDate != null ? (
            <Fact term={labels?.expires ?? 'Expires'} value={expiryDate} />
          ) : null}
          {issuerCode != null ? (
            <Fact term={labels?.issuerCode ?? 'Issuer code'} value={issuerCode} />
          ) : null}
        </dl>
      </CardV4>
    );
  }
);
