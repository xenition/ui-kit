import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { Badge } from '../primitives/Badge';
import { Button } from '../primitives/Button';
import type { RepresentativeCardProps, Party } from './RepresentativeCard';

/** Same public contract as {@link RepresentativeCard} — a drop-in alternate design. */
export type RepresentativeCardV2Props = RepresentativeCardProps;

const PARTY_LABEL: Record<Party, string> = { democratic: 'Democratic', republican: 'Republican', independent: 'Independent', green: 'Green', other: 'Other', nonpartisan: 'Nonpartisan' };

/**
 * RepresentativeCard, redesigned (v2): a **banner official card**. A primary-tinted
 * cover carries a large avatar; the name/office, party + in-office badges, district
 * and term info center beneath, with Call/Email actions. Elevated. Distinct from
 * v1. Same props, token-only.
 */
export const RepresentativeCardV2 = React.forwardRef<HTMLDivElement, RepresentativeCardV2Props>(
  function RepresentativeCardV2({ name, office, photoUrl, party, district, phone, email, termInfo, inOffice, onCall, onEmail, className, ...rest }, ref) {
    const meta = [district, termInfo].filter((s): s is string => !!s).join(' · ');
    return (
      <div ref={ref} data-xen-representative-card="" className={cn('overflow-hidden rounded-lg bg-surface text-center shadow-md', className)} {...rest}>
        <div className="h-12 bg-primary/20" />
        <div className="flex flex-col items-center gap-1 px-md pb-md">
          <div className="-mt-9 rounded-full border-4 border-surface"><Avatar src={photoUrl} name={name} size="xl" /></div>
          <p className="text-lg font-bold text-on-surface">{name}</p>
          <p className="text-xs text-muted">{office}</p>
          <div className="mt-1 flex flex-wrap justify-center gap-1.5">
            {party ? <Badge tone="neutral">{PARTY_LABEL[party]}</Badge> : null}
            {inOffice != null ? <Badge tone={inOffice ? 'success' : 'neutral'}>{inOffice ? '✓ In office' : 'Not in office'}</Badge> : null}
          </div>
          {meta ? <p className="text-xs text-muted">{meta}</p> : null}
          {(onCall && phone) || (onEmail && email) ? (
            <div className="mt-1 flex w-full gap-2">
              {onCall && phone ? <Button size="md" variant="primary" className="flex-1" onClick={onCall}>Call</Button> : null}
              {onEmail && email ? <Button size="md" variant="outline" className="flex-1" onClick={onEmail}>Email</Button> : null}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
);
