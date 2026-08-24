import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives/Icon';
import { withAlpha } from './internal';

/** Visual treatment of an {@link ImpactStat}. */
export type ImpactStatVariant = 'plain' | 'card' | 'tile';
export type ImpactStatTone = 'primary' | 'success' | 'accent';

export interface ImpactStatProps {
  /** The headline figure, e.g. `12,480` or `3.2M`. */
  value: React.ReactNode;
  /** What the figure counts, e.g. `Meals served`. */
  label: string;
  /** Optional unit rendered muted after the value (e.g. `liters`). */
  unit?: string;
  /** Optional leading glyph/emoji (e.g. `💧`). */
  glyph?: string;
  /** Optional supporting caption below the label. */
  caption?: string;
  /** Surface treatment (default `plain`). `tile` adds a tinted accent panel. */
  variant?: ImpactStatVariant;
  /** Accent tone for the glyph chip / tile (default `primary`). */
  tone?: ImpactStatTone;
  style?: StyleProp<ViewStyle>;
}

/**
 * A single impact metric — a large token-scaled figure, an optional unit, a
 * caption label, and an optional glyph chip. `variant` renders it bare
 * (`plain`), inside a bordered `card`, or as a tinted `tile`. The glyph is
 * decorative; the metric is announced as a `summary`. All colors come from the
 * compiled theme tokens (accent tints via `withAlpha`) — no literal colors.
 */
export function ImpactStat({
  value,
  label,
  unit,
  glyph,
  caption,
  variant = 'plain',
  tone = 'primary',
  style,
}: ImpactStatProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const accent = tone === 'success' ? colors.success : tone === 'accent' ? colors.accent : colors.primary;

  const containerStyle: StyleProp<ViewStyle> =
    variant === 'card'
      ? { padding: tokens.spacing.md, borderRadius: tokens.radius.lg, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface }
      : variant === 'tile'
        ? { padding: tokens.spacing.md, borderRadius: tokens.radius.lg, backgroundColor: withAlpha(accent, 0.1) }
        : null;

  return (
    <View accessibilityRole="summary" accessibilityLabel={`${String(value)}${unit ? ` ${unit}` : ''} ${label}`} style={[containerStyle, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        {glyph ? (
          <View
            style={{
              width: tokens.spacing.xl,
              height: tokens.spacing.xl,
              borderRadius: tokens.radius.full,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: withAlpha(accent, 0.14),
            }}
          >
            <Icon glyph={glyph} size="base" />
          </View>
        ) : null}
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: tokens.spacing.xs }}>
          {typeof value === 'string' || typeof value === 'number' ? (
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '800' }}>{value}</Text>
          ) : (
            value
          )}
          {unit ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base, marginBottom: tokens.spacing.xs }}>{unit}</Text>
          ) : null}
        </View>
      </View>
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, marginTop: tokens.spacing.xs }}>{label}</Text>
      {caption ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, marginTop: 2 }}>{caption}</Text>
      ) : null}
    </View>
  );
}
