import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon, Text } from '../primitives';
import type { PaywallFeatureRowsProps } from './PaywallScreen';

/** Drop-in for {@link PaywallFeatureRows} — identical props, different design. */
export type PaywallFeatureRowsV3Props = PaywallFeatureRowsProps;

/**
 * Feature rows — V3, the compact line: **a checklist**. One `✓` per row in the
 * success tone, the title inline beside it, and the description folded onto
 * the same block at caption size.
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
export function PaywallFeatureRowsV3({
  rows,
  heading,
  dense = false,
  style,
}: PaywallFeatureRowsV3Props): React.ReactElement | null {
  const { tokens } = useXenitionTheme();
  const list = rows?.filter((row) => row.title) ?? [];
  if (list.length === 0) return null;

  const gap = dense ? tokens.spacing.xs : tokens.spacing.sm;

  return (
    <View accessibilityRole="list" style={[{ alignSelf: 'stretch', gap }, style]}>
      {heading ? (
        <Text size="sm" weight="semibold" tone="mutedText">
          {heading}
        </Text>
      ) : null}

      {list.map((row) => (
        <View
          key={row.id ?? row.title}
          style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }}
        >
          <Icon name="check" size="base" color="successText" />
          <View style={{ flex: 1 }}>
            <Text size="base" weight="semibold" tone="onSurface">
              {row.title}
            </Text>
            {row.description ? (
              <Text size="xs" tone="mutedText">
                {row.description}
              </Text>
            ) : null}
          </View>
        </View>
      ))}
    </View>
  );
}
