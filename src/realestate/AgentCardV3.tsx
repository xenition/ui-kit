import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Button, Rating } from '../primitives';
import type { AgentCardProps } from './AgentCard';

/** Same public contract as {@link AgentCard} — a drop-in alternate design. */
export type AgentCardV3Props = AgentCardProps;

/**
 * AgentCard, redesigned (v3): a **compact directory row**. A small avatar, the
 * name over a title·agency line with an inline rating, and a quiet Contact button
 * on the trailing edge — hairline-bordered for an agents list. The opposite of
 * v2's banner. Same props, token-only.
 */
export const AgentCardV3 = React.forwardRef<HTMLDivElement, AgentCardV3Props>(function AgentCardV3(
  { name, title, agency, avatarUrl, rating, reviewCount, contactLabel = 'Contact', onContact, variant, className, ...rest },
  ref
) {
  void variant;
  void reviewCount;
  const sub = [title, agency].filter((s): s is string => !!s).join(' · ');

  return (
    <div ref={ref} data-xen-agent-card="" className={cn('flex items-center gap-3 border-b border-border py-2.5', className)} {...rest}>
      <Avatar src={avatarUrl} name={name} size="sm" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-on-surface">{name}</p>
        <div className="flex items-center gap-1.5">
          {typeof rating === 'number' ? <Rating value={rating} size="sm" showValue /> : null}
          {sub ? <span className="truncate text-xs text-muted">{sub}</span> : null}
        </div>
      </div>
      {onContact ? (
        <Button size="sm" variant="outline" onClick={onContact}>
          {contactLabel}
        </Button>
      ) : null}
    </div>
  );
});
