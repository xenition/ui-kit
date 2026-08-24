import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives/Badge';
import { Button } from '../primitives/Button';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';

export type FeatureLockVariant = 'card' | 'inline';

export interface FeatureLockCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Name of the gated capability (e.g. `'Unlimited exports'`). */
  title: string;
  /** One-line description of what unlocking delivers. */
  description?: string;
  /** Lock glyph. Default `'🔒'`. */
  icon?: string;
  /** Ribbon copy on the badge. Default `'Pro'`. */
  planLabel?: string;
  /** Unlock CTA copy. Default `'Unlock'` — override with the outcome. */
  unlockLabel?: string;
  /** Fires on the unlock CTA. */
  onUnlock?: () => void;
  /** `'inline'` renders a compact borderless row. Default `'card'`. */
  variant?: FeatureLockVariant;
}

/**
 * Locked-feature teaser — shown where a free user hits a gated capability. It
 * names the feature, says what unlocking gets them and offers the upgrade CTA,
 * turning a dead end into a value pitch (paywall-after-value, design.md §27-28).
 * The `inline` variant collapses to a compact row for list contexts. Colors are
 * token-bound via the {@link Card}/{@link Badge} primitives. No literal colors.
 */
export const FeatureLockCard = React.forwardRef<HTMLDivElement, FeatureLockCardProps>(
  function FeatureLockCard(
    {
      title,
      description,
      icon = '🔒',
      planLabel = 'Pro',
      unlockLabel = 'Unlock',
      onUnlock,
      variant = 'card',
      className,
      ...rest
    },
    ref
  ) {
    const body = (
      <>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-border">
          <Icon glyph={icon} size="lg" color="muted" aria-label="Locked" />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-on-surface">{title}</span>
            <Badge tone="primary">{planLabel}</Badge>
          </div>
          {description ? <span className="text-sm text-muted">{description}</span> : null}
        </div>
      </>
    );

    if (variant === 'inline') {
      return (
        <div ref={ref} className={cn('flex items-center gap-4', className)} {...rest}>
          {body}
          <Button variant="secondary" size="sm" onClick={onUnlock} aria-label={unlockLabel}>
            {unlockLabel}
          </Button>
        </div>
      );
    }

    return (
      <Card ref={ref} className={cn('flex flex-col gap-4', className)} {...rest}>
        <div className="flex items-center gap-4">{body}</div>
        <Button variant="primary" size="md" onClick={onUnlock} aria-label={unlockLabel} className="w-full">
          {unlockLabel}
        </Button>
      </Card>
    );
  }
);
