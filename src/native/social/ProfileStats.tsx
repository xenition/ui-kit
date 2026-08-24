import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface ProfileStat {
  /** Caption under the value (e.g. `Followers`). */
  label: string;
  /** Headline number/string (pre-formatted, e.g. `12.4k`). */
  value: string | number;
  /** Makes the column tappable (e.g. open the followers list). */
  onPress?: () => void;
}

export interface ProfileStatsProps {
  /** The stat columns, left to right (posts / followers / following …). */
  stats: ReadonlyArray<ProfileStat>;
  /** Draw thin dividers between columns. Default `false`. */
  dividers?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A horizontal row of value-over-label stat columns for a profile header
 * (posts, followers, following, …). Any column can be tappable. Renders bare
 * (not a card) so it drops into any header. Token-only.
 */
export function ProfileStats({ stats, dividers = false, style }: ProfileStatsProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  return (
    <View
      accessibilityRole="summary"
      style={[{ flexDirection: 'row', alignItems: 'center' }, style]}
    >
      {stats.map((s, i) => {
        const inner = (
          <View style={{ alignItems: 'center', gap: 2 }}>
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
              {String(s.value)}
            </Text>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{s.label}</Text>
          </View>
        );
        return (
          <React.Fragment key={`${s.label}-${i}`}>
            {dividers && i > 0 ? (
              <View style={{ width: 1, alignSelf: 'stretch', backgroundColor: colors.border, marginVertical: tokens.spacing.xs }} />
            ) : null}
            {s.onPress ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`${s.value} ${s.label}`}
                onPress={s.onPress}
                style={({ pressed }) => ({ flex: 1, opacity: pressed ? 0.6 : 1 })}
              >
                {inner}
              </Pressable>
            ) : (
              <View style={{ flex: 1 }}>{inner}</View>
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
}
