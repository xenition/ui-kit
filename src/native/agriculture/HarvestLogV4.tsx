import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { EmptyStateV4 } from '../commerce/EmptyStateV4';
import { metaLine } from './internal/farm-v4';
import type { HarvestLogProps } from './HarvestLog';

export interface HarvestLogV4Props extends HarvestLogProps {
  /** Label for the period total. Default `'Total'`. */
  totalLabel?: string;
  /**
   * Copy for the "and N more" line. Default `'+3 more'`, which the base built
   * inline — so a host could not localize it or say "3 further harvests".
   */
  formatRemaining?: (remaining: number) => string;
}

/**
 * **V4 harvest log** — same props as {@link HarvestLog} plus `totalLabel` and
 * `formatRemaining`.
 *
 * ## Four changes
 *
 * 1. **The total is labelled.** The base rendered it as a bare figure in the
 *    header, so the most important number on the card had nothing saying what
 *    it counted.
 * 2. **Quantities are tabular and right-aligned in a fixed column**, which is
 *    the only way a log of harvests reads as a column rather than as ragged
 *    text — with proportional figures `40` and `1,180` have no shared edge.
 * 3. **The empty state is `EmptyStateV4`**, the same one the commerce line
 *    uses, rather than the base line's.
 * 4. **Type comes from `TextV4`** — the base hand-wrote `color`, `fontSize`,
 *    `fontWeight` and `fontFamily` on raw `<Text>` seven times in one file —
 *    and every caption moves to `mutedText`.
 *
 * A `maxRows` cap still truncates the list and says how many were hidden.
 */
export function HarvestLogV4({
  entries,
  title = 'Harvest log',
  total,
  totalLabel = 'Total',
  maxRows,
  emptyTitle = 'No harvests logged',
  emptyDescription = 'Recorded harvests will appear here.',
  formatRemaining,
  style,
}: HarvestLogV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const list = Array.isArray(entries) ? entries : [];
  const visible = typeof maxRows === 'number' ? list.slice(0, Math.max(0, maxRows)) : list;
  const remaining = list.length - visible.length;
  const more = formatRemaining ?? ((n: number) => `+${n} more`);

  return (
    <CardV4 style={[{ gap: tokens.spacing.sm }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <IconV4 glyph="🧺" size="base" />
        <TextV4 size="base" weight="semibold" tone="onCard" style={{ flex: 1 }}>
          {title}
        </TextV4>
        {total != null ? (
          <View style={{ alignItems: 'flex-end' }}>
            <TextV4 size="xs" tone="mutedText">
              {totalLabel}
            </TextV4>
            <TextV4 face="heading" size="base" weight="bold" tone="onCard" numeric="tabular">
              {total}
            </TextV4>
          </View>
        ) : null}
      </View>

      {list.length === 0 ? (
        <EmptyStateV4
          icon={<IconV4 glyph="🌾" size="2xl" color="mutedText" />}
          title={emptyTitle}
          description={emptyDescription}
        />
      ) : (
        <View>
          {visible.map((entry, i) => {
            const last = i === visible.length - 1 && remaining <= 0;
            return (
              <View
                key={entry.id ?? `harvest-${i}`}
                accessible
                accessibilityLabel={metaLine([
                  entry.crop,
                  `${entry.quantity}${entry.unit ? ` ${entry.unit}` : ''}`,
                  entry.grade,
                  entry.field,
                  entry.date,
                ])}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: tokens.spacing.sm,
                  paddingVertical: tokens.spacing.sm,
                  borderBottomWidth: last ? 0 : 1,
                  borderBottomColor: colors.border,
                }}
              >
                <View style={{ flex: 1 }}>
                  <TextV4 size="sm" weight="semibold" tone="onCard" numberOfLines={1}>
                    {entry.crop}
                  </TextV4>
                  <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
                    {metaLine([entry.field, entry.date])}
                  </TextV4>
                </View>

                {entry.grade != null ? (
                  <BadgeV4 tone="neutral" variant="outline" size="sm">
                    {entry.grade}
                  </BadgeV4>
                ) : null}

                <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
                  <TextV4 face="heading" size="sm" weight="bold" tone="onCard" numeric="tabular">
                    {String(entry.quantity)}
                  </TextV4>
                  {entry.unit != null ? (
                    <TextV4 size="xs" tone="mutedText">
                      {entry.unit}
                    </TextV4>
                  ) : null}
                </View>
              </View>
            );
          })}

          {remaining > 0 ? (
            <TextV4 size="xs" tone="mutedText" style={{ marginTop: tokens.spacing.xs }}>
              {more(remaining)}
            </TextV4>
          ) : null}
        </View>
      )}
    </CardV4>
  );
}
