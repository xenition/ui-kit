import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card, Icon, Text } from '../primitives';
import { isIconName } from '../../primitives/icon-names';
import type { PaywallFeatureRowsProps } from './PaywallScreen';

/** Drop-in for {@link PaywallFeatureRows} — identical props, different design. */
export type PaywallFeatureRowsV2Props = PaywallFeatureRowsProps;

/** §10.1 geometry: the glyph plate on a tile, larger than the base's 44 badge. */
const PLATE = 56;

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
 * `rail` is therefore accepted and ignored: cards are separated objects, and
 * a line drawn between them is a diagram of a list they are deliberately not.
 * `dense` still tightens the stack for a longer set.
 *
 * Same props as {@link PaywallFeatureRows}. Renders nothing for an empty list.
 * Token-pure.
 */
export function PaywallFeatureRowsV2({
  rows,
  heading,
  dense = false,
  style,
}: PaywallFeatureRowsV2Props): React.ReactElement | null {
  const { colors, tokens, scheme } = useXenitionTheme();
  const list = rows?.filter((row) => row.title) ?? [];
  if (list.length === 0) return null;

  // The ramps carry the light orientation in both schemes, so the dark end of
  // the same ramp is what a dark page needs — see the note in `PaywallScreen`.
  const plateGround = scheme === 'dark' ? tokens.ramps.primary[900] : tokens.ramps.primary[50];
  const gap = dense ? tokens.spacing.sm : tokens.spacing.md;

  return (
    <View accessibilityRole="list" style={[{ alignSelf: 'stretch', gap }, style]}>
      {heading ? (
        <Text size="sm" weight="semibold" tone="mutedText">
          {heading}
        </Text>
      ) : null}

      {list.map((row) => {
        const glyph = row.icon;
        return (
          <Card key={row.id ?? row.title} style={{ gap: tokens.spacing.sm }}>
            <View
              style={{
                width: PLATE,
                height: PLATE,
                borderRadius: tokens.radius.lg,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: plateGround,
              }}
            >
              {glyph && isIconName(glyph) ? (
                <Icon name={glyph} size="2xl" color="primaryText" />
              ) : (
                <Icon glyph={glyph ?? '✦'} size="2xl" color="primaryText" />
              )}
            </View>
            <Text size="lg" weight="bold" tone="onSurface">
              {row.title}
            </Text>
            {row.description ? (
              <Text size="sm" tone="mutedText">
                {row.description}
              </Text>
            ) : null}
          </Card>
        );
      })}
    </View>
  );
}
