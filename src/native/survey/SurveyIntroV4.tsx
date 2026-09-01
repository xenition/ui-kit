import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { GradientSurface } from './internal/GradientSurface';
import { focusGradient, focusInk, focusInkSoft, focusTile, focusBorder } from './internal/focus';
import type { SurveyIntroProps } from './SurveyIntro';

/** Drop-in for {@link SurveyIntroProps} — same props, the V4 "focus" design. */
export type SurveyIntroV4Props = SurveyIntroProps;

/**
 * SurveyIntro — **V4** "clean form / focus" design. The start of a survey is a
 * peak moment, so this variant leads with a brand gradient hero band
 * (`focusGradient`) carrying near-white ink (`focusInk` / `focusInkSoft`): an
 * optional glyph mark, the title, the purpose line, and any meta stats rendered
 * as frosted glass tiles (`focusTile` / `focusBorder`). Below the band a big
 * ≥44px primary Start CTA sits in the thumb zone with an accessible name, and the
 * footnote is quiet muted fine print. `hero` centers the band and enlarges the
 * mark. Same props/behavior as {@link SurveyIntroProps}; token-only colors via
 * `useXenitionTheme()` + `focus*(tokens.ramps)` (no literals), dark-mode safe.
 */
export function SurveyIntroV4({
  title,
  description,
  logoGlyph,
  meta,
  startLabel = 'Start survey',
  onStart,
  footnote,
  variant = 'default',
  style,
}: SurveyIntroV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const ink = focusInk(r);
  const inkSoft = focusInkSoft(r);
  const hero = variant === 'hero';

  return (
    <View
      style={[
        {
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.card,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      {/* Brand gradient hero band — the peak/start moment. */}
      <GradientSurface
        colors={focusGradient(r)}
        style={{ padding: tokens.spacing.lg, gap: tokens.spacing.md, alignItems: hero ? 'center' : 'stretch' }}
      >
        {logoGlyph ? (
          <View
            style={{
              width: hero ? 72 : 52,
              height: hero ? 72 : 52,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: tokens.radius.full,
              backgroundColor: focusTile(r),
              borderWidth: 1,
              borderColor: focusBorder(r),
              alignSelf: hero ? 'center' : 'flex-start',
            }}
          >
            <Text allowFontScaling={false} style={{ fontSize: hero ? tokens.typography.scale['2xl'] : tokens.typography.scale.xl }}>
              {logoGlyph}
            </Text>
          </View>
        ) : null}

        <Text
          accessibilityRole="header"
          style={{
            color: ink,
            fontSize: tokens.typography.scale['2xl'],
            fontWeight: '800',
            textAlign: hero ? 'center' : 'left',
          }}
        >
          {title}
        </Text>

        {description ? (
          <Text
            style={{
              color: inkSoft,
              fontSize: tokens.typography.scale.base,
              textAlign: hero ? 'center' : 'left',
              lineHeight: Math.round(tokens.typography.scale.base * 1.5),
            }}
          >
            {description}
          </Text>
        ) : null}

        {meta && meta.length > 0 ? (
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: hero ? 'center' : 'flex-start',
              gap: tokens.spacing.sm,
            }}
          >
            {meta.map((m, i) => (
              <View
                key={`${m.label}-${i}`}
                style={{
                  flex: 1,
                  minWidth: 84,
                  alignItems: 'center',
                  gap: 2,
                  borderRadius: tokens.radius.md,
                  backgroundColor: focusTile(r),
                  borderWidth: 1,
                  borderColor: focusBorder(r),
                  paddingHorizontal: tokens.spacing.md,
                  paddingVertical: tokens.spacing.sm,
                }}
              >
                {m.icon ? (
                  <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.lg }}>
                    {m.icon}
                  </Text>
                ) : null}
                <Text style={{ color: ink, fontSize: tokens.typography.scale.lg, fontWeight: '800' }}>{m.value}</Text>
                <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.xs }}>{m.label}</Text>
              </View>
            ))}
          </View>
        ) : null}
      </GradientSurface>

      {/* Calm form footer — big primary CTA in the thumb zone. */}
      <View style={{ padding: tokens.spacing.lg, gap: tokens.spacing.sm }}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={startLabel}
          onPress={onStart}
          style={({ pressed }) => ({
            minHeight: 44,
            paddingVertical: tokens.spacing.md,
            borderRadius: tokens.radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.primary,
            opacity: pressed ? 0.9 : 1,
          })}
        >
          <Text style={{ color: colors.onPrimary, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>
            {startLabel}
          </Text>
        </Pressable>

        {footnote ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'center' }}>
            {footnote}
          </Text>
        ) : null}
      </View>
    </View>
  );
}
