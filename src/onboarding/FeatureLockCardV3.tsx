import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { Text } from '../primitives/Text';
import type { FeatureLockCardProps } from './FeatureLockCard';

/** Drop-in for {@link FeatureLockCard} — identical props, different design. */
export type FeatureLockCardV3Props = FeatureLockCardProps;

/**
 * Locked feature — V3, the compact line: **one row, the whole row is the
 * button**, ending in a chevron. No card, no badge circle, no separate CTA.
 *
 * The shape a settings list or a feature index needs. The base and V2 both put
 * a button inside a container, which means a list of eight gated features is a
 * list of eight buttons — and a user scanning it has to aim at a small target
 * inside a big one. Here the row is the target, which is how every other list
 * row in the kit behaves (§31: use the familiar interaction).
 *
 * `unlockLabel` moves to the row's accessible name rather than being drawn: the
 * chevron already says "this goes somewhere", and a visible "Unlock" beside it
 * would be the second affordance for one action.
 *
 * `variant` is accepted and ignored — this line is the compact row.
 *
 * Same props as {@link FeatureLockCard}. Token-pure.
 */
export const FeatureLockCardV3 = React.forwardRef<HTMLButtonElement, FeatureLockCardV3Props>(
  function FeatureLockCardV3(
    {
      title,
      description,
      icon = '🔒',
      planLabel = 'Pro',
      unlockLabel = 'Unlock',
      onUnlock,
      className,
      // The base's props type is a `<div>`'s; the compact line's root is the
      // button itself, so the DOM attributes are not forwarded here rather
      // than being spread onto an element that cannot take them.
      ...rest
    },
    ref
  ) {
    void rest;
    if (!title) return null;

    return (
      <button
        ref={ref}
        type="button"
        aria-label={`${title}, ${planLabel}. ${unlockLabel}`}
        onClick={onUnlock}
        data-xen-v4-chrome="on-surface"
        className={cn(
          'flex min-h-11 w-full items-center gap-md rounded-[var(--xen-radius-md)] px-md py-sm text-left',
          className
        )}
      >
        <Icon glyph={icon} size="lg" />
        <span className="flex min-w-0 flex-1 flex-col">
          <Text size="base" weight="semibold" tone="onSurface">
            {title}
          </Text>
          {description ? (
            <Text size="xs" tone="mutedText" numberOfLines={1}>
              {description}
            </Text>
          ) : null}
        </span>
        {planLabel ? (
          <Text size="xs" weight="bold" tone="primaryText">
            {planLabel}
          </Text>
        ) : null}
        <Icon name="chevron-right" size="lg" color="muted" />
      </button>
    );
  }
);
