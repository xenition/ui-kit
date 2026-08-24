import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { SemanticColors } from '../theme';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { clamp, withAlpha } from './weather-utils';

/** UV exposure band. */
export type UvBand = 'low' | 'moderate' | 'high' | 'very-high' | 'extreme';

interface UvMeta {
  label: string;
  glyph: string;
  tone: Extract<keyof SemanticColors, 'success' | 'warn' | 'danger'>;
}

function uvBand(uv: number): UvMeta {
  if (uv <= 2) return { label: 'Low', glyph: '🕶️', tone: 'success' };
  if (uv <= 5) return { label: 'Moderate', glyph: '🧢', tone: 'warn' };
  if (uv <= 7) return { label: 'High', glyph: '🧴', tone: 'warn' };
  if (uv <= 10) return { label: 'Very high', glyph: '⛱️', tone: 'danger' };
  return { label: 'Extreme', glyph: '🚫', tone: 'danger' };
}

export interface UVIndexCardProps {
  /** UV index value (0–11+). */
  uv?: number;
  /** Short protection guidance. */
  advice?: string;
  /** Message shown when `uv` is absent. */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * UV index card: the numeric UV value, its exposure band shown as a glyph + text
 * label (never color alone), a token-tinted 0–11 scale track with a marker, and
 * an optional protection tip. Band severity maps to success/warn/danger tokens.
 * Renders a muted empty state when `uv` is absent. All colors/sizes come from
 * the compiled theme tokens via `useXenitionTheme()` — no literal colors.
 */
export function UVIndexCard({
  uv,
  advice,
  emptyLabel = 'UV index unavailable',
  style,
}: UVIndexCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (uv == null) {
    return (
      <Card variant="outlined" style={style} accessibilityRole="summary">
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
          {emptyLabel}
        </Text>
      </Card>
    );
  }

  const meta = uvBand(uv);
  const toneColor = colors[meta.tone];
  const markerPct = clamp(uv, 0, 11) / 11;

  return (
    <Card
      variant="outlined"
      style={style}
      accessibilityRole="summary"
      accessibilityLabel={`UV index ${uv}, ${meta.label}`}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <Icon glyph="🌞" size="lg" accessibilityLabel="UV index" />
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>UV Index</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'baseline',
          gap: tokens.spacing.sm,
          marginTop: tokens.spacing.xs,
        }}
      >
        <Text
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale['3xl'],
            fontWeight: '800',
          }}
        >
          {uv}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Icon glyph={meta.glyph} size="sm" accessibilityLabel={meta.label} />
          <Text style={{ color: toneColor, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            {meta.label}
          </Text>
        </View>
      </View>

      <View
        style={{
          height: 8,
          borderRadius: tokens.radius.full,
          backgroundColor: withAlpha(toneColor, 0.18),
          marginTop: tokens.spacing.sm,
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            position: 'absolute',
            left: `${markerPct * 100}%`,
            width: 4,
            height: 14,
            marginLeft: -2,
            borderRadius: tokens.radius.full,
            backgroundColor: toneColor,
          }}
        />
      </View>

      {advice ? (
        <Text
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale.sm,
            marginTop: tokens.spacing.sm,
          }}
        >
          {advice}
        </Text>
      ) : null}
    </Card>
  );
}
