import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Button } from '../primitives';
import { useEnter } from '../primitives/internal/motion';
import { shadow } from '../primitives/internal/elevation';
import { withAlpha } from '../primitives/internal/color';
import type { PrescriptionRowProps, PrescriptionStatus } from './PrescriptionRow';

/** Same public contract as {@link PrescriptionRow} — a drop-in alternate design. */
export type PrescriptionRowV2Props = PrescriptionRowProps;

interface StatusMeta {
  glyph: string;
  label: string;
  color: keyof SemanticColors;
}

const STATUS_META: Record<PrescriptionStatus, StatusMeta> = {
  active: { glyph: '●', label: 'Active', color: 'successText' },
  'refill-due': { glyph: '↻', label: 'Refill due', color: 'warnText' },
  paused: { glyph: '⏸', label: 'Paused', color: 'muted' },
  expired: { glyph: '✕', label: 'Expired', color: 'dangerText' },
};

/**
 * PrescriptionRow, redesigned (v2): an **elevated med card**. A rounded, primary-
 * tinted pill-glyph tile anchors the left; the drug name sits large with dose /
 * directions / refills beneath it and a glyph + label status line. When a refill
 * is due, a full-width "Refill" CTA spans the foot. Lifted with a shadow and a
 * fade-in mount — distinct at a glance from v1's flat list row. Same props,
 * token-pure.
 */
export function PrescriptionRowV2({
  name,
  dose,
  frequency,
  refillsLeft,
  status = 'active',
  onRefill,
  onPress,
  style,
}: PrescriptionRowV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();
  const meta = STATUS_META[status];
  const statusColor = colors[meta.color];

  const detailParts = [
    dose,
    frequency,
    refillsLeft != null ? `${refillsLeft} refill${refillsLeft === 1 ? '' : 's'} left` : undefined,
  ].filter(Boolean) as string[];

  const a11y = `${name}${dose ? `, ${dose}` : ''}${frequency ? `, ${frequency}` : ''}, ${meta.label}`;

  const card = (
    <Animated.View
      style={[
        {
          backgroundColor: colors.surface,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.md,
          gap: tokens.spacing.md,
          opacity: enter.opacity,
          transform: enter.transform,
          ...shadow('md', tokens),
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: tokens.radius.md,
            backgroundColor: withAlpha(colors.primary, 0.1),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xl }}>
            💊
          </Text>
        </View>
        <View style={{ flex: 1, gap: 3 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {name}
          </Text>
          {detailParts.length ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
              {detailParts.join('  ·  ')}
            </Text>
          ) : null}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            <Text allowFontScaling={false} style={{ color: statusColor, fontSize: tokens.typography.scale.xs }}>
              {meta.glyph}
            </Text>
            <Text style={{ color: statusColor, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
              {meta.label}
            </Text>
          </View>
        </View>
      </View>

      {status === 'refill-due' && onRefill ? (
        <Button size="sm" variant="soft" tone="default" onPress={onRefill}>
          Refill
        </Button>
      ) : null}
    </Animated.View>
  );

  if (!onPress) {
    return <View accessibilityLabel={a11y}>{card}</View>;
  }
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={a11y} onPress={onPress}>
      {card}
    </Pressable>
  );
}
