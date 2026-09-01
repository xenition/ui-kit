import * as React from 'react';
import { cn } from '../primitives/cn';
import { AvatarV4 } from '../primitives/AvatarV4';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CardV4 } from '../primitives/CardV4';
import type { Party, RepresentativeCardProps } from './RepresentativeCard';
import { BADGE_V4, CARD_V4, IDENTITY_TONE, spokenLine } from './internal/civic-v4';

/**
 * The two words the `inOffice` flag can take.
 *
 * A named pair rather than two inline optional fields: `inOffice` is a
 * boolean and has no enum of its own, so this is the only place the two keys
 * are written down — and the native twin imports the same shape rather than
 * spelling it again.
 */
export type OfficeTenure = 'inOffice' | 'former';

export interface RepresentativeCardV4Props extends RepresentativeCardProps {
  /** Override the six party words — `'Democratic'`, `'Nonpartisan'`, … */
  partyLabels?: Partial<Record<Party, string>>;
  /** Override the two tenure words. Default `'In office'` / `'Former'`. */
  officeLabels?: Partial<Record<OfficeTenure, string>>;
}

const PARTY_V4: Record<Party, string> = {
  democratic: 'Democratic',
  republican: 'Republican',
  independent: 'Independent',
  green: 'Green',
  other: 'Other',
  nonpartisan: 'Nonpartisan',
};

const TENURE_V4: Record<OfficeTenure, { label: string; glyph: string }> = {
  inOffice: { label: 'In office', glyph: '✓' },
  former: { label: 'Former', glyph: '—' },
};

/**
 * **V4 representative card** — the web twin of the native
 * `RepresentativeCardV4`, same props as {@link RepresentativeCard} plus
 * `partyLabels` and `officeLabels`.
 *
 * ## Four changes
 *
 * 1. **Holding office stops being `success`.** Whether someone is currently in
 *    office is a factual attribute of a public official, not a good outcome —
 *    and this is a card careful enough to keep the *party* badge neutral for
 *    exactly that reason, then spent the module's approval colour on the seat.
 *    Tenure takes the neutral identity chip, with a glyph and a word doing the
 *    work.
 * 2. **The card is one readable block, not five stops.** Name, office, party,
 *    tenure, district and term were six separate leaves; the district and the
 *    term now sit in one caption line, and each control names the person it
 *    acts on, so "Call" is never a bare verb with no object.
 * 3. **Call and Email clear 44.** They were `size="sm"`, about 32px, and
 *    neither `Button` primitive sets a minimum height — a defect shared by all
 *    fifteen actions in this module.
 * 4. **Every word is a prop.** Six party names and two tenure words were
 *    hard-coded English, on a component whose whole subject is a local
 *    jurisdiction that may not be English-speaking at all.
 */
export const RepresentativeCardV4 = React.forwardRef<HTMLDivElement, RepresentativeCardV4Props>(
  function RepresentativeCardV4(
    {
      name,
      office,
      photoUrl,
      party,
      district,
      phone,
      email,
      termInfo,
      inOffice,
      onCall,
      onEmail,
      partyLabels,
      officeLabels,
      className,
      ...rest
    },
    ref
  ) {
    if (!name) return null;

    const partyWord = party ? (partyLabels?.[party] ?? PARTY_V4[party] ?? PARTY_V4.other) : undefined;
    const tenureKey: OfficeTenure | undefined =
      inOffice == null ? undefined : inOffice ? 'inOffice' : 'former';
    const tenure = tenureKey != null ? TENURE_V4[tenureKey] : undefined;
    const tenureWord =
      tenureKey != null ? (officeLabels?.[tenureKey] ?? tenure?.label) : undefined;

    const showCall = onCall != null && phone != null && phone !== '';
    const showEmail = onEmail != null && email != null && email !== '';

    return (
      <CardV4 ref={ref} variant={CARD_V4} className={className} {...rest}>
        <div className="flex items-center gap-md">
          <AvatarV4 src={photoUrl} name={name} size="lg" alt="" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-lg font-bold text-on-surface">{name}</p>
            <p className="truncate text-sm text-muted-text">{office}</p>
            <div className="mt-xs flex flex-wrap items-center gap-xs">
              {partyWord != null ? (
                <BadgeV4 tone={IDENTITY_TONE} {...BADGE_V4}>
                  {partyWord}
                </BadgeV4>
              ) : null}
              {tenure != null && tenureWord != null ? (
                // A seat held is identity, not an approval.
                <BadgeV4 tone={IDENTITY_TONE} {...BADGE_V4}>
                  {`${tenure.glyph} ${tenureWord}`}
                </BadgeV4>
              ) : null}
            </div>
          </div>
        </div>

        {district != null || termInfo != null ? (
          <div className="mt-sm flex flex-col gap-xs">
            {district != null ? (
              <p className="text-xs text-muted-text">
                <span aria-hidden="true">📍</span> {district}
              </p>
            ) : null}
            {termInfo != null ? (
              <p className="text-xs text-muted-text">
                <span aria-hidden="true">🗳️</span> {termInfo}
              </p>
            ) : null}
          </div>
        ) : null}

        {showCall || showEmail ? (
          <div className={cn('mt-md flex flex-wrap justify-end gap-sm')}>
            {showCall ? (
              <ButtonV4
                size="md"
                variant="outline"
                aria-label={spokenLine(['Call', name, phone])}
                onClick={onCall}
              >
                Call
              </ButtonV4>
            ) : null}
            {showEmail ? (
              <ButtonV4
                size="md"
                aria-label={spokenLine(['Email', name, email])}
                onClick={onEmail}
              >
                Email
              </ButtonV4>
            ) : null}
          </div>
        ) : null}
      </CardV4>
    );
  }
);
