import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { Text } from '../primitives/Text';
import type { PaywallFeatureRowsProps } from './PaywallScreen';

/** Drop-in for {@link PaywallFeatureRows} — identical props, different design. */
export type PaywallFeatureRowsV3Props = PaywallFeatureRowsProps;

/**
 * Feature rows — V3, the compact line: **a checklist**. One `✓` per row in the
 * success tone, the title inline beside it, the description folded onto the
 * same block at caption size.
 *
 * Where it earns its place: the confirmation half of a flow — a plan card with
 * "what's included" under it, a sheet, the second half of a screen whose hero
 * already spent the vertical budget. Six benefits as §8 rows is a scroll; six
 * as a checklist is a paragraph.
 *
 * `rail` is accepted and ignored — a rail is what makes badges read as one
 * list, and a checklist already reads as one. The row's glyph is ignored too:
 * a checklist's mark is the check, and letting each row bring its own turns
 * the column of ticks back into the icon list this line exists to compress.
 *
 * Same props as {@link PaywallFeatureRows}. Renders nothing for an empty list.
 * Token-pure.
 */
export const PaywallFeatureRowsV3 = React.forwardRef<HTMLDivElement, PaywallFeatureRowsV3Props>(
  function PaywallFeatureRowsV3({ rows, heading, dense = false, className, ...rest }, ref) {
    const list = rows?.filter((row) => row.title) ?? [];
    if (list.length === 0) return null;

    return (
      <div
        ref={ref}
        className={cn('flex w-full flex-col', dense ? 'gap-xs' : 'gap-sm', className)}
        {...rest}
      >
        {heading ? (
          <Text size="sm" weight="semibold" tone="mutedText">
            {heading}
          </Text>
        ) : null}

        <ul className={cn('flex flex-col', dense ? 'gap-xs' : 'gap-sm')}>
          {list.map((row) => (
            <li key={row.id ?? row.title} className="flex items-start gap-sm">
              <Icon name="check" size="base" color="success" />
              <span className="flex min-w-0 flex-1 flex-col">
                <Text size="base" weight="semibold" tone="onSurface">
                  {row.title}
                </Text>
                {row.description ? (
                  <Text size="xs" tone="mutedText">
                    {row.description}
                  </Text>
                ) : null}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
