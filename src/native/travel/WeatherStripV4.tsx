import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { GradientSurface } from './internal/GradientSurface';
import { journeyDisc, journeyInk, journeyInkSoft } from './internal/journey';
import type { WeatherStripProps } from './WeatherStrip';

/** Drop-in for {@link WeatherStripProps} — same props, the V4 "journey" design. */
export type WeatherStripV4Props = WeatherStripProps;

/**
 * WeatherStrip — **V4** "journey" design. The boarding-pass take on a multi-day
 * forecast: a horizontal strip of day tiles where the `highlightIndex` day is
 * lifted onto a brand-gradient fill with near-white ink (the signature V4 touch)
 * and announced as "today", while the other tiles stay clean surface with a
 * hairline edge and muted labels. Condition glyphs and high/low temperatures are
 * preserved. Renders an empty hint when there are no days. Same props/behavior as
 * {@link WeatherStripProps}; token-only colors via `useXenitionTheme()`.
 */
export function WeatherStripV4({
  days,
  unit = '°',
  highlightIndex,
  scrollEnabled = true,
  style,
}: WeatherStripV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;

  if (days.length === 0) {
    return <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.sm }}>No forecast available.</Text>;
  }

  const tiles = days.map((d, i) => {
    const active = i === highlightIndex;
    const fg = active ? journeyInk(r) : colors.onSurface;
    const sub = active ? journeyInkSoft(r) : colors.mutedText;

    const inner = (
      <>
        <Text style={{ color: sub, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{d.day}</Text>
        <Text style={{ fontSize: tokens.typography.scale.lg, color: fg }}>{d.glyph ?? '—'}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
          <Text style={{ color: fg, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            {d.high}
            {unit}
          </Text>
          {typeof d.low === 'number' ? (
            <Text style={{ color: sub, fontSize: tokens.typography.scale.xs }}>
              {d.low}
              {unit}
            </Text>
          ) : null}
        </View>
      </>
    );

    const a11y = `${d.day}${active ? ' today' : ''}, ${d.condition ? `${d.condition}, ` : ''}high ${d.high}${unit}${
      typeof d.low === 'number' ? `, low ${d.low}${unit}` : ''
    }`;

    if (active) {
      return (
        <GradientSurface
          key={`${d.day}-${i}`}
          colors={journeyDisc(r)}
          style={{
            minWidth: 64,
            alignItems: 'center',
            gap: tokens.spacing.xs,
            borderRadius: tokens.radius.md,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
            overflow: 'hidden',
          }}
        >
          <View accessible accessibilityLabel={a11y} style={{ alignItems: 'center', gap: tokens.spacing.xs }}>
            {inner}
          </View>
        </GradientSurface>
      );
    }

    return (
      <View
        key={`${d.day}-${i}`}
        accessible
        accessibilityLabel={a11y}
        style={{
          minWidth: 64,
          alignItems: 'center',
          gap: tokens.spacing.xs,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          borderRadius: tokens.radius.md,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
        }}
      >
        {inner}
      </View>
    );
  });

  if (!scrollEnabled) {
    return (
      <View style={[{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, style]}>{tiles}</View>
    );
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: tokens.spacing.sm }}
      style={style}
    >
      {tiles}
    </ScrollView>
  );
}
