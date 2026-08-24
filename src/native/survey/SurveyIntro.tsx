import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Button, Card, Icon } from '../primitives';

/** A single meta stat shown in the intro (question count, time, anonymity…). */
export interface SurveyIntroMeta {
  /** Leading glyph/emoji. */
  icon?: string;
  /** The stat value (e.g. `'12'`, `'~3 min'`). */
  value: string;
  /** The stat caption (e.g. `'questions'`, `'to finish'`). */
  label: string;
}

export type SurveyIntroVariant = 'default' | 'hero';

export interface SurveyIntroProps {
  /** Survey title. */
  title: string;
  /** Short description / purpose. */
  description?: string;
  /** Optional leading glyph for a hero mark. */
  logoGlyph?: string;
  /** Meta stats row (question count, est. time…). */
  meta?: SurveyIntroMeta[];
  /** Primary CTA label. Default `'Start survey'`. */
  startLabel?: string;
  /** Fires when the CTA is pressed. */
  onStart?: () => void;
  /** Optional fine print under the CTA (e.g. `'Responses are anonymous.'`). */
  footnote?: string;
  /** `hero` centers the content and enlarges the mark. Default `'default'`. */
  variant?: SurveyIntroVariant;
  style?: StyleProp<ViewStyle>;
}

/**
 * Survey landing / intro screen — a token `Card` leading with the title and
 * purpose, an optional meta stats row (question count, estimated time), and a
 * primary start `Button`. `hero` centers the layout behind an enlarged mark.
 * The CTA carries an accessible name; no literal colors.
 */
export function SurveyIntro({
  title,
  description,
  logoGlyph,
  meta,
  startLabel = 'Start survey',
  onStart,
  footnote,
  variant = 'default',
  style,
}: SurveyIntroProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const hero = variant === 'hero';

  return (
    <Card variant="elevated" padding="lg" style={style}>
      <View style={{ gap: tokens.spacing.md, alignItems: hero ? 'center' : 'stretch' }}>
        {logoGlyph ? (
          <View
            style={{
              width: hero ? 72 : 52,
              height: hero ? 72 : 52,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: tokens.radius.full,
              backgroundColor: colors.primary,
              alignSelf: hero ? 'center' : 'flex-start',
            }}
          >
            <Icon glyph={logoGlyph} size={hero ? '2xl' : 'xl'} color="onPrimary" />
          </View>
        ) : null}

        <Text
          accessibilityRole="header"
          style={{
            color: colors.onSurface,
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
              color: colors.muted,
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
              justifyContent: hero ? 'center' : 'flex-start',
              gap: tokens.spacing.lg,
              paddingVertical: tokens.spacing.sm,
            }}
          >
            {meta.map((m, i) => (
              <View key={`${m.label}-${i}`} style={{ alignItems: 'center', gap: 2 }}>
                {m.icon ? <Icon glyph={m.icon} size="lg" color="primary" /> : null}
                <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
                  {m.value}
                </Text>
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{m.label}</Text>
              </View>
            ))}
          </View>
        ) : null}

        <Button variant="primary" size="lg" onPress={onStart} accessibilityLabel={startLabel}>
          {startLabel}
        </Button>

        {footnote ? (
          <Text
            style={{
              color: colors.muted,
              fontSize: tokens.typography.scale.xs,
              textAlign: 'center',
            }}
          >
            {footnote}
          </Text>
        ) : null}
      </View>
    </Card>
  );
}
