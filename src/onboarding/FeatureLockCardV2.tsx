import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives/Badge';
import { Button } from '../primitives/Button';
import { Icon } from '../primitives/Icon';
import { Text } from '../primitives/Text';
import type { FeatureLockCardProps } from './FeatureLockCard';

/** Drop-in for {@link FeatureLockCard} — identical props, different design. */
export type FeatureLockCardV2Props = FeatureLockCardProps;

/**
 * Locked feature — V2, the editorial line: a **banner** on the brand fill,
 * with the plan ribbon over it and the CTA as a light button on the colour.
 *
 * The base is a quiet card that says "this is locked". This one is an
 * advertisement: it is the loudest thing on whatever screen it lands on, which
 * is right when the gate IS the screen — an empty state, a feature the user
 * just tried to open — and wrong in a list, which is what V3 is for.
 *
 * The copy is `on-primary` throughout rather than `on-surface`, so the contrast
 * promise is the one the compiler actually made about this fill; the CTA
 * inverts to a `surface` fill with `primary-text` on it, which is the only
 * shape that stays legible on a saturated band.
 *
 * `variant="inline"` is accepted and ignored: an inline banner is a
 * contradiction, and an app that wants a compact row wants V3.
 *
 * Same props as {@link FeatureLockCard}. Token-pure.
 */
export const FeatureLockCardV2 = React.forwardRef<HTMLDivElement, FeatureLockCardV2Props>(
  function FeatureLockCardV2(
    {
      title,
      description,
      icon = '🔒',
      planLabel = 'Pro',
      unlockLabel = 'Unlock',
      onUnlock,
      className,
      ...rest
    },
    ref
  ) {
    if (!title) return null;

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-md rounded-[var(--xen-radius-lg)] bg-primary p-lg',
          className
        )}
        {...rest}
      >
        <div className="flex items-center gap-md">
          <span
            aria-label="Locked"
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[var(--xen-radius-lg)] bg-surface"
          >
            <Icon glyph={icon} size="2xl" />
          </span>
          <span className="flex min-w-0 flex-1 flex-col gap-xs">
            {planLabel ? (
              <span>
                <Badge tone="neutral" size="sm">
                  {planLabel}
                </Badge>
              </span>
            ) : null}
            <Text size="lg" weight="bold" tone="onPrimary">
              {title}
            </Text>
          </span>
        </div>

        {description ? (
          <Text size="sm" tone="onPrimary" className="opacity-90">
            {description}
          </Text>
        ) : null}

        <Button
          variant="secondary"
          size="md"
          onClick={onUnlock}
          aria-label={unlockLabel}
          className="w-full bg-surface text-primary-text"
        >
          {unlockLabel}
        </Button>
      </div>
    );
  }
);
