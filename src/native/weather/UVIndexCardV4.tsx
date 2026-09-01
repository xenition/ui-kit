import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { SemanticColors } from '../theme';
import { Icon } from '../primitives/Icon';
import { clamp, withAlpha } from './weather-utils';
import type { UVIndexCardProps } from './UVIndexCard';

/** Drop-in for {@link UVIndexCardProps} — same props, a different design. */
export type UVIndexCardV4Props = UVIndexCardProps;

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

/** `onSuccess`/`onWarn`/`onDanger` ink for a given severity tone. */
const ON_TONE: Record<UvMeta['tone'], keyof SemanticColors> = {
  success: 'onSuccess',
  warn: 'onWarn',
  danger: 'onDanger',
};

/**
 * UVIndexCard — **elevated card** design (v4). A polished white card sitting on
 * the page: an oversized UV numeral, its exposure band as a solid pill (glyph +
 * text — never color alone), a token-tinted 0–11 scale track with a marker, and
 * an optional protection tip. Band severity maps to success/warn/danger tokens,
 * every color/size traces to the compiled theme via `useXenitionTheme()` — no
 * literal colors. Renders a muted empty state when `uv` is absent. Same props as
 * {@link UVIndexCardProps}.
 */
export function UVIndexCardV4({
  uv,
  advice,
  emptyLabel = 'UV index unavailable',
  style,
}: UVIndexCardV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const surface: StyleProp<ViewStyle> = [
    {
      backgroundColor: colors.card,
      borderRadius: tokens.radius.lg,
      padding: tokens.spacing.lg,
      shadowColor: colors.onSurface,
      shadowOpacity: 0.12,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 6 },
      elevation: 3,
    },
    style,
  ];

  if (uv == null) {
    return (
      <View accessibilityRole="summary" style={surface}>
        <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.sm }}>
          {emptyLabel}
        </Text>
      </View>
    );
  }

  const meta = uvBand(uv);
  const toneColor = colors[meta.tone];
  const onTone = colors[ON_TONE[meta.tone]];
  const markerPct = clamp(uv, 0, 11) / 11;

  return (
    <View
      accessibilityRole="summary"
      accessibilityLabel={`UV index ${uv}, ${meta.label}`}
      style={surface}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <Icon glyph="🌞" size="lg" accessibilityLabel="UV index" />
        <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          UV Index
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: tokens.spacing.sm,
          marginTop: tokens.spacing.sm,
        }}
      >
        <Text
          allowFontScaling={false}
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale['3xl'],
            fontWeight: '800',
            letterSpacing: -1,
          }}
        >
          {uv}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.md,
            paddingVertical: tokens.spacing.xs,
            borderRadius: tokens.radius.full,
            backgroundColor: toneColor,
          }}
        >
          <Icon glyph={meta.glyph} size="sm" accessibilityLabel={meta.label} />
          <Text style={{ color: onTone, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            {meta.label}
          </Text>
        </View>
      </View>

      <View
        style={{
          height: 10,
          borderRadius: tokens.radius.full,
          backgroundColor: withAlpha(toneColor, 0.15),
          marginTop: tokens.spacing.md,
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            position: 'absolute',
            left: `${markerPct * 100}%`,
            width: 4,
            height: 16,
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
            marginTop: tokens.spacing.md,
          }}
        >
          {advice}
        </Text>
      ) : null}
    </View>
  );
}
