import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Button, Rating } from '../primitives';
import type { AgentCardProps } from './AgentCard';

/** Same public contract as {@link AgentCard} — a drop-in alternate design. */
export type AgentCardV2Props = AgentCardProps;

/**
 * AgentCard, redesigned (v2): a **banner profile card**. A primary-tinted cover
 * carries a large avatar straddling its edge; the name, title·agency, rating, and
 * a full-width Contact CTA center beneath. Elevated. Distinct from v1's compact
 * row. Same props, token-only.
 */
export const AgentCardV2 = React.forwardRef<HTMLDivElement, AgentCardV2Props>(function AgentCardV2(
  { name, title, agency, avatarUrl, rating, reviewCount, contactLabel = 'Contact', onContact, variant, className, ...rest },
  ref
) {
  void variant;
  const sub = [title, agency].filter((s): s is string => !!s).join(' · ');

  return (
    <div ref={ref} data-xen-agent-card="" className={cn('overflow-hidden rounded-lg bg-surface text-center shadow-md', className)} {...rest}>
      <div className="h-14 bg-primary/20" />
      <div className="flex flex-col items-center gap-1 px-md pb-md">
        <div className="-mt-10 rounded-full border-4 border-surface">
          <Avatar src={avatarUrl} name={name} size="xl" />
        </div>
        <p className="text-lg font-bold text-on-surface">{name}</p>
        {sub ? <p className="text-xs text-muted">{sub}</p> : null}
        {typeof rating === 'number' ? (
          <div className="flex items-center gap-1.5">
            <Rating value={rating} size="sm" showValue />
            {typeof reviewCount === 'number' ? <span className="text-xs text-muted">({reviewCount})</span> : null}
          </div>
        ) : null}
        {onContact ? (
          <Button size="md" variant="primary" className="mt-1 w-full" onClick={onContact}>
            {contactLabel}
          </Button>
        ) : null}
      </div>
    </div>
  );
});
