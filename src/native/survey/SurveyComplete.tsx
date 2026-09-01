import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { GradientSurface } from './internal/GradientSurface';
import { focusCelebrate, focusInk, focusInkSoft, focusTile, focusBorder } from './internal/focus';

export interface SurveyCompleteProps {
  /** Headline — the celebratory payoff. Default `'All done!'`. */
  title?: string;
  /** Optional supporting line under the title (a thank-you note). */
  message?: string;
  /** Big celebratory glyph over the title (an emoji or a check). Default `'🎉'`. */
  emoji?: string;
  /**
   * Optional single highlight stat rendered as a frosted glass tile
   * (e.g. `{ label: 'Completed in', value: '2:14' }`).
   */
  stat?: { label: string; value: string };
  /** Primary CTA label. Default `'Done'`. */
  primaryLabel?: string;
  /** Fires on the primary CTA. The button is hidden when unset. */
  onPrimary?: () => void;
  /** Optional secondary CTA label (e.g. `'View results'`). */
  secondaryLabel?: string;
  /** Fires on the secondary CTA. The secondary button is hidden when unset. */
  onSecondary?: () => void;
  /** Container style override. */
  style?: StyleProp<ViewStyle>;
}

/**
 * SurveyComplete — the survey's peak-end **celebration hero** (V4 "focus" line).
 * A full two-hue celebratory gradient ground (`focusCelebrate`, accent→primary)
 * carries near-white ink (`focusInk` / `focusInkSoft`): a big emoji/check mark,
 * the headline, an optional thank-you message, and an optional highlight stat as
 * a frosted glass tile (`focusTile` / `focusBorder`). Big ≥44px CTAs sit in the
 * thumb zone — a near-white primary pill and an optional ghost secondary.
 * Presentational only (shaped data + callbacks). Token-only colors via
 * `useXenitionTheme()` + `focus*(tokens.ramps)` (no literals), dark-mode safe.
 */
export function SurveyComplete({
  title = 'All done!',
  message,
  emoji = '🎉',
  stat,
  primaryLabel = 'Done',
  onPrimary,
  secondaryLabel,
  onSecondary,
  style,
}: SurveyCompleteProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const ink = focusInk(r);
  const inkSoft = focusInkSoft(r);

  return (
    <View style={[{ borderRadius: tokens.radius.lg }, style]}>
      <GradientSurface
        colors={focusCelebrate(r)}
        style={{ borderRadius: tokens.radius.lg, padding: tokens.spacing.xl, alignItems: 'center', overflow: 'hidden' }}
      >
        {/* Celebratory mark on a frosted disc. */}
        <View
          accessibilityRole="image"
          accessibilityLabel={title}
          style={{
            width: 64,
            height: 64,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tokens.radius.full,
            backgroundColor: focusTile(r),
            borderWidth: 1,
            borderColor: focusBorder(r),
          }}
        >
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale['2xl'] }}>
            {emoji}
          </Text>
        </View>

        <Text
          accessibilityRole="header"
          style={{
            color: ink,
            fontSize: tokens.typography.scale['2xl'],
            fontWeight: '800',
            textAlign: 'center',
            marginTop: tokens.spacing.md,
          }}
        >
          {title}
        </Text>

        {message ? (
          <Text
            style={{
              color: inkSoft,
              fontSize: tokens.typography.scale.base,
              textAlign: 'center',
              lineHeight: Math.round(tokens.typography.scale.base * 1.5),
              marginTop: tokens.spacing.xs,
            }}
          >
            {message}
          </Text>
        ) : null}

        {stat ? (
          <View
            style={{
              alignSelf: 'stretch',
              alignItems: 'center',
              gap: 2,
              marginTop: tokens.spacing.lg,
              borderRadius: tokens.radius.md,
              backgroundColor: focusTile(r),
              borderWidth: 1,
              borderColor: focusBorder(r),
              paddingHorizontal: tokens.spacing.md,
              paddingVertical: tokens.spacing.md,
            }}
          >
            <Text style={{ color: ink, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }}>{stat.value}</Text>
            <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.xs }}>{stat.label}</Text>
          </View>
        ) : null}

        {onPrimary || onSecondary ? (
          <View style={{ alignSelf: 'stretch', gap: tokens.spacing.sm, marginTop: tokens.spacing.lg }}>
            {onPrimary ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={primaryLabel}
                onPress={onPrimary}
                style={({ pressed }) => ({
                  minHeight: 44,
                  paddingVertical: tokens.spacing.md,
                  borderRadius: tokens.radius.md,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: ink,
                  opacity: pressed ? 0.9 : 1,
                })}
              >
                <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>
                  {primaryLabel}
                </Text>
              </Pressable>
            ) : null}
            {onSecondary && secondaryLabel ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={secondaryLabel}
                onPress={onSecondary}
                style={({ pressed }) => ({
                  minHeight: 44,
                  paddingVertical: tokens.spacing.md,
                  borderRadius: tokens.radius.md,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 1,
                  borderColor: focusBorder(r),
                  opacity: pressed ? 0.85 : 1,
                })}
              >
                <Text style={{ color: ink, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
                  {secondaryLabel}
                </Text>
              </Pressable>
            ) : null}
          </View>
        ) : null}
      </GradientSurface>
    </View>
  );
}
