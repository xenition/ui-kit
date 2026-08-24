import * as React from 'react';
import { Card } from '../primitives/Card';
import { Avatar } from '../primitives/Avatar';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { Button } from '../primitives/Button';

/** Party affiliation — drives a neutral, non-partisan label badge. */
export type Party = 'democratic' | 'republican' | 'independent' | 'green' | 'other' | 'nonpartisan';

const PARTY_LABEL: Record<Party, string> = {
  democratic: 'Democratic',
  republican: 'Republican',
  independent: 'Independent',
  green: 'Green',
  other: 'Other',
  nonpartisan: 'Nonpartisan',
};

export interface RepresentativeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Representative's full name. */
  name: string;
  /** Office / title held (e.g. "City Council · District 4"). */
  office: string;
  /** Photo URL; falls back to initials in the Avatar. */
  photoUrl?: string;
  /** Party affiliation — rendered as a neutral label badge. */
  party?: Party;
  /** District / jurisdiction served. */
  district?: string;
  /** Contact phone (already formatted). */
  phone?: string;
  /** Contact email. */
  email?: string;
  /** Localized next-election / term-end date. */
  termInfo?: string;
  /** Whether the representative is currently in office (text+glyph badge). */
  inOffice?: boolean;
  /** Fires "Call" (shown only when `phone` + handler are present). */
  onCall?: () => void;
  /** Fires "Email" (shown only when `email` + handler are present). */
  onEmail?: () => void;
}

/**
 * An elected-official / representative contact card: avatar, name, office, a
 * neutral party label, jurisdiction, and gated Call / Email actions (real
 * `<button>`s). Party is a plain label (never encoded by color alone), and an
 * in-office flag reads as a text + glyph badge. Token-bound throughout — no
 * literal colors. Web parity of the native `RepresentativeCard`.
 */
export const RepresentativeCard = React.forwardRef<HTMLDivElement, RepresentativeCardProps>(
  function RepresentativeCard(
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
      className,
      ...rest
    },
    ref
  ) {
    const partyLabel = party ? PARTY_LABEL[party] ?? PARTY_LABEL.other : undefined;
    const showCall = onCall != null && phone != null && phone !== '';
    const showEmail = onEmail != null && email != null && email !== '';
    const officeTone: BadgeTone = inOffice ? 'success' : 'neutral';

    return (
      <Card ref={ref} className={className} {...rest}>
        <div className="flex items-center gap-[var(--xen-space-md)]">
          <Avatar src={photoUrl} name={name} size="lg" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-lg font-bold text-on-surface">{name}</p>
            <p className="truncate text-sm text-muted">{office}</p>
            <div className="mt-1 flex flex-wrap items-center gap-[var(--xen-space-xs)]">
              {partyLabel != null ? <Badge tone="neutral">{partyLabel}</Badge> : null}
              {inOffice != null ? (
                <Badge tone={officeTone}>
                  {inOffice ? (
                    <>
                      <span aria-hidden="true">✓</span> In office
                    </>
                  ) : (
                    <>
                      <span aria-hidden="true">—</span> Former
                    </>
                  )}
                </Badge>
              ) : null}
            </div>
          </div>
        </div>

        {district != null || termInfo != null ? (
          <div className="mt-[var(--xen-space-sm)] flex flex-col gap-0.5">
            {district != null ? (
              <p className="text-xs text-muted">
                <span aria-hidden="true">📍</span> {district}
              </p>
            ) : null}
            {termInfo != null ? (
              <p className="text-xs text-muted">
                <span aria-hidden="true">🗳️</span> {termInfo}
              </p>
            ) : null}
          </div>
        ) : null}

        {showCall || showEmail ? (
          <div className="mt-[var(--xen-space-md)] flex justify-end gap-[var(--xen-space-sm)]">
            {showCall ? (
              <Button size="sm" variant="outline" onClick={onCall}>
                Call
              </Button>
            ) : null}
            {showEmail ? (
              <Button size="sm" onClick={onEmail}>
                Email
              </Button>
            ) : null}
          </div>
        ) : null}
      </Card>
    );
  }
);
