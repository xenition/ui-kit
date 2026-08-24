import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { SCAN_META, toneColor, type ScanKind } from './internal';

export interface ScanRowProps {
  /** The scanned code / barcode value (headline, monospace-ish). */
  code: string;
  /** Scan kind — glyph + word, never color alone. */
  kind: ScanKind;
  /** Location / station where the scan happened. */
  location?: string;
  /** Human timestamp (e.g. `10:42:07`). */
  time?: string;
  /** Operator / device that produced the scan. */
  operator?: string;
  /** Makes the row tappable (drill into the scan). */
  onPress?: () => void;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A single scan event row. The kit ships no barcode renderer, so the code is
 * shown as text beside a **token-bar placeholder** that evokes a barcode
 * (alternating neutral-ramp bars, purely decorative and hidden from a11y). The
 * scan kind is carried by a glyph + word chip. Tappable when `onPress` is set.
 * All colors are theme tokens — no literal colors, no scan/barcode dependency.
 */
export function ScanRow({
  code,
  kind,
  location,
  time,
  operator,
  onPress,
  testID,
  style,
}: ScanRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = SCAN_META[kind] ?? SCAN_META.inbound;
  const accent = toneColor(colors, meta.tone);

  // Deterministic pseudo-barcode widths from the code (decorative placeholder).
  const bars = React.useMemo(() => {
    const out: number[] = [];
    for (let i = 0; i < 14; i += 1) {
      const ch = code.charCodeAt(i % Math.max(code.length, 1)) || 1;
      out.push((ch % 3) + 1);
    }
    return out;
  }, [code]);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${meta.label} scan ${code}${location ? ` at ${location}` : ''}`}
      disabled={!onPress}
      onPress={onPress}
      testID={testID}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.sm,
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
        },
        style,
      ]}
    >
      {/* Decorative token-bar "barcode" placeholder (no dependency). */}
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={{
          width: 40,
          height: 32,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1,
          paddingHorizontal: 3,
          borderRadius: tokens.radius.sm,
          backgroundColor: tokens.ramps.neutral[100],
        }}
      >
        {bars.map((w, i) => (
          <View key={i} style={{ width: w, height: '70%', backgroundColor: colors.onSurface }} />
        ))}
      </View>

      <View style={{ flex: 1, minWidth: 0, gap: 1 }}>
        <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.sm, fontWeight: '700', color: colors.onSurface }}>
          {code}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xs, color: accent }}>
            {meta.glyph}
          </Text>
          <Text style={{ fontSize: tokens.typography.scale.xs, fontWeight: '600', color: accent }}>{meta.label}</Text>
          {location ? (
            <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>
              {`· ${location}`}
            </Text>
          ) : null}
        </View>
      </View>

      <View style={{ alignItems: 'flex-end', gap: 1 }}>
        {time ? (
          <Text style={{ fontSize: tokens.typography.scale.xs, color: colors.onSurface, fontWeight: '600' }}>{time}</Text>
        ) : null}
        {operator ? (
          <Text numberOfLines={1} style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>{operator}</Text>
        ) : null}
      </View>
    </Pressable>
  );
}
