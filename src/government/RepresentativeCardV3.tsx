import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { Button } from '../primitives/Button';
import type { RepresentativeCardProps, Party } from './RepresentativeCard';

/** Same public contract as {@link RepresentativeCard} — a drop-in alternate design. */
export type RepresentativeCardV3Props = RepresentativeCardProps;

const PARTY_LABEL: Record<Party, string> = { democratic: 'Democratic', republican: 'Republican', independent: 'Independent', green: 'Green', other: 'Other', nonpartisan: 'Nonpartisan' };

/**
 * RepresentativeCard, redesigned (v3): a **compact official row**. A small avatar,
 * the name over an office·party·district line with an in-office ✓, and a Call/Email
 * glyph pair on the right — hairline-bordered for a directory. The opposite of v2's
 * banner. Same props, token-only.
 */
export const RepresentativeCardV3 = React.forwardRef<HTMLDivElement, RepresentativeCardV3Props>(
  function RepresentativeCardV3({ name, office, photoUrl, party, district, phone, email, termInfo, inOffice, onCall, onEmail, className, ...rest }, ref) {
    void termInfo;
    const sub = [office, party ? PARTY_LABEL[party] : null, district].filter((s): s is string => !!s).join(' · ');
    return (
      <div ref={ref} data-xen-representative-card="" className={cn('flex items-center gap-3 border-b border-border py-2.5', className)} {...rest}>
        <Avatar src={photoUrl} name={name} size="sm" />
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1 truncate text-sm font-semibold text-on-surface">
            {name}
            {inOffice ? <span className="text-success" aria-label="In office">✓</span> : null}
          </p>
          {sub ? <p className="truncate text-xs text-muted">{sub}</p> : null}
        </div>
        {onCall && phone ? <button type="button" aria-label="Call" onClick={onCall} className="text-lg text-primary">📞</button> : null}
        {onEmail && email ? <button type="button" aria-label="Email" onClick={onEmail} className="text-lg text-primary">✉️</button> : null}
      </div>
    );
  }
);
