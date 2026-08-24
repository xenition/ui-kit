import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives';

export type TrialBannerTone = 'info' | 'warn' | 'success';

export interface TrialBannerProps {
  /** Headline (e.g. `'7 days of Pro, on us'`). */
  title: string;
  /** Optional supporting line (e.g. `'No charge until Aug 30'`). */
  subtitle?: string;
  /** Days remaining — when set, renders a `'N days left'` chip. */
  daysLeft?: number;
  /** Tone → accent/warn/success surface. Default `'info'`. */
  tone?: TrialBannerTone;
  /** Inline action copy (e.g. `'Manage'`). Hidden without `onActionPress`. */
  actionLabel?: string;
  /** Fires on the inline action. */
  onActionPress?: () => void;
  /** Leading glyph. Default `'✨'`. */
  icon?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Free-trial status strip — a tinted banner that advertises an active or
 * available trial and, optionally, a countdown chip and an inline action. Sits
 * atop the paywall (value-first framing, design.md §27) or in-app once a trial
 * is running. Tone maps to the accent/warn/success token pairs. No literal
 * colors.
 */
export function TrialBanner({
  title,
  subtitle,
  daysLeft,
  tone = 'info',
  actionLabel,
  onActionPress,
  icon = '✨',
  style,
}: TrialBannerProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const bgKey = tone === 'warn' ? 'warn' : tone === 'success' ? 'success' : 'accent';
  const fgKey = tone === 'warn' ? 'onWarn' : tone === 'success' ? 'onSuccess' : 'onAccent';

  return (
    <View
      accessibilityRole="summary"
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          backgroundColor: colors[bgKey],
          borderRadius: tokens.radius.md,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
        },
        style,
      ]}
    >
      <Icon glyph={icon} size="lg" color={fgKey} />
      <View style={{ flex: 1 }}>
        <Text style={{ color: colors[fgKey], fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={{ color: colors[fgKey], fontSize: tokens.typography.scale.sm, opacity: 0.9 }}>
            {subtitle}
          </Text>
        ) : null}
      </View>

      {typeof daysLeft === 'number' ? (
        <View
          style={{
            borderRadius: tokens.radius.full,
            paddingVertical: 2,
            paddingHorizontal: tokens.spacing.sm,
            backgroundColor: colors.surface,
          }}
        >
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
            {Math.max(0, daysLeft)} {Math.max(0, daysLeft) === 1 ? 'day' : 'days'} left
          </Text>
        </View>
      ) : null}

      {actionLabel && onActionPress ? (
        <Pressable accessibilityRole="button" accessibilityLabel={actionLabel} onPress={onActionPress} hitSlop={tokens.spacing.sm}>
          <Text style={{ color: colors[fgKey], fontSize: tokens.typography.scale.sm, fontWeight: '700', textDecorationLine: 'underline' }}>
            {actionLabel}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
