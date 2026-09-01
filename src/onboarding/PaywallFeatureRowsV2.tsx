import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { Text } from '../primitives/Text';
import { isIconName } from '../primitives/icon-names';
import type { PaywallFeatureRowsProps } from './PaywallScreen';

/** Drop-in for {@link PaywallFeatureRows} — identical props, different design. */
export type PaywallFeatureRowsV2Props = PaywallFeatureRowsProps;

/**
 * Feature rows — V2, the editorial line: **tiles, not a list**. Each benefit
 * gets its own card with a large glyph plate above the copy, and the cards
 * stack full-width.
 *
 * The idea: a list says "here are four facts"; tiles say "here are four
 * things". On the screen where the value proposition IS the product — a
 * welcome-offer, a first paywall — the extra weight per row is the point, and
 * a rail joining four cards would fight the separation the cards already have.
 *
 * `rail` is therefore accepted and ignored. `dense` still tightens the stack.
 *
 * Same props as {@link PaywallFeatureRows}. Renders nothing for an empty list.
 * Token-pure.
 */
export const PaywallFeatureRowsV2 = React.forwardRef<HTMLDivElement, PaywallFeatureRowsV2Props>(
  function PaywallFeatureRowsV2({ rows, heading, dense = false, className, ...rest }, ref) {
    const list = rows?.filter((row) => row.title) ?? [];
    if (list.length === 0) return null;

    return (
      <div
        ref={ref}
        className={cn('flex w-full flex-col', dense ? 'gap-sm' : 'gap-md', className)}
        {...rest}
      >
        {heading ? (
          <Text size="sm" weight="semibold" tone="mutedText">
            {heading}
          </Text>
        ) : null}

        <ul className={cn('flex flex-col', dense ? 'gap-sm' : 'gap-md')}>
          {list.map((row) => {
            const glyph = row.icon;
            return (
              <li key={row.id ?? row.title}>
                <Card className="flex flex-col gap-sm">
                  <span className="flex h-14 w-14 items-center justify-center rounded-[var(--xen-radius-lg)] bg-primary-50">
                    {glyph && isIconName(glyph) ? (
                      <Icon name={glyph} size="2xl" color="primary" />
                    ) : (
                      <Icon glyph={glyph ?? '✦'} size="2xl" color="primary" />
                    )}
                  </span>
                  <Text size="lg" weight="bold" tone="onSurface">
                    {row.title}
                  </Text>
                  {row.description ? (
                    <Text size="sm" tone="mutedText">
                      {row.description}
                    </Text>
                  ) : null}
                </Card>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
);
