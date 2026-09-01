import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import type { ProfileStatsProps } from './ProfileStats';

/** Drop-in for {@link ProfileStatsProps} — same props, the V4 "feed" design. */
export type ProfileStatsV4Props = ProfileStatsProps;

/**
 * ProfileStats — **V4** "feed" design. The clean, airy take on a profile stat
 * row: big bold numerals stacked over muted labels, generous 8-pt spacing, and
 * a soft-primary tint on press for any tappable column. Same props/behavior as
 * {@link ProfileStatsProps} (values, labels, per-column `onPress`, optional
 * dividers); token-only colors via `useXenitionTheme()`. Renders bare so it
 * drops into any header.
 */
export function ProfileStatsV4({ stats, dividers = false, style }: ProfileStatsV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const softPrimary = withAlpha(colors.primary, 0.12);

  return (
    <View accessibilityRole="summary" style={[{ flexDirection: 'row', alignItems: 'stretch' }, style]}>
      {stats.map((s, i) => {
        const inner = (
          <View style={{ alignItems: 'center', gap: 2, paddingVertical: tokens.spacing.xs }}>
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }}>
              {String(s.value)}
            </Text>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '500' }}>{s.label}</Text>
          </View>
        );
        return (
          <React.Fragment key={`${s.label}-${i}`}>
            {dividers && i > 0 ? (
              <View style={{ width: 1, alignSelf: 'stretch', backgroundColor: colors.border, marginVertical: tokens.spacing.sm }} />
            ) : null}
            {s.onPress ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`${s.value} ${s.label}`}
                onPress={s.onPress}
                style={({ pressed }) => ({
                  flex: 1,
                  minHeight: 44,
                  justifyContent: 'center',
                  borderRadius: tokens.radius.md,
                  backgroundColor: pressed ? softPrimary : 'transparent',
                })}
              >
                {inner}
              </Pressable>
            ) : (
              <View style={{ flex: 1, justifyContent: 'center' }}>{inner}</View>
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
}
