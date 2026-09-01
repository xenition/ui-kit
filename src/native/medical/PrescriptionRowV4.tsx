import * as React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge, Button } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { PrescriptionRowProps, PrescriptionStatus } from './PrescriptionRow';

/** V4 layout choices for the "clinic" design. */
export type PrescriptionRowLayout = 'full' | 'compact';

/** Drop-in for {@link PrescriptionRowProps} — same props, the V4 "clinic" design. */
export interface PrescriptionRowV4Props extends PrescriptionRowProps {
  /** V4 layout: `full` (default) or `compact` (denser single line). */
  variant?: PrescriptionRowLayout;
}

type Tone = 'neutral' | 'primary' | 'success' | 'warn' | 'danger';

const STATUS_META: Record<PrescriptionStatus, { glyph: string; label: string; tone: Tone }> = {
  active: { glyph: '●', label: 'Active', tone: 'success' },
  'refill-due': { glyph: '↻', label: 'Refill due', tone: 'warn' },
  paused: { glyph: '⏸', label: 'Paused', tone: 'neutral' },
  expired: { glyph: '✕', label: 'Expired', tone: 'danger' },
};

/**
 * PrescriptionRow — **V4** "clinic" design. The calm, clinical take on a
 * medication row: an elevated rounded row with a soft shadow, a pill glyph, the
 * drug name, dose · directions · refills, and a status marker (active /
 * refill-due / paused / expired) drawn as a glyph + labelled Badge + token tone,
 * so it never relies on color alone (accessibility + the token contract). A
 * "Refill" action surfaces when a refill is due. Honors the V4 `variant` —
 * `full` (default) and `compact` (a denser single line that hides the secondary
 * detail line) — identical props/behavior to {@link PrescriptionRowProps}.
 * Token-only colors via `useXenitionTheme()`. Web/native parity of the V4 web
 * component. Informational UI only — not a medical device.
 */
export function PrescriptionRowV4({
  name,
  dose,
  frequency,
  refillsLeft,
  status = 'active',
  onRefill,
  onPress,
  variant = 'full',
  style,
}: PrescriptionRowV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = STATUS_META[status];

  const shell: ViewStyle = {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  };

  const detailParts = [
    dose,
    frequency,
    refillsLeft != null ? `${refillsLeft} refill${refillsLeft === 1 ? '' : 's'} left` : undefined,
  ].filter(Boolean) as string[];

  const a11y = `${name}${dose ? `, ${dose}` : ''}${frequency ? `, ${frequency}` : ''}, ${meta.label}`;

  const statusBadge = (
    <Badge tone={meta.tone} variant="soft" size="sm">
      {`${meta.glyph} ${meta.label}`}
    </Badge>
  );

  const refillBtn =
    status === 'refill-due' && onRefill ? (
      <Button size="sm" variant="soft" tone="default" onPress={onRefill}>
        Refill
      </Button>
    ) : null;

  // ── compact: denser single line ──
  const content =
    variant === 'compact' ? (
      <View
        style={[
          shell,
          {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.sm,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
            minHeight: 44,
          },
          style,
        ]}
      >
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.base }}>
          💊
        </Text>
        <Text numberOfLines={1} style={{ flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {name}
        </Text>
        {dose ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {dose}
          </Text>
        ) : null}
        <View style={{ marginLeft: 'auto', flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          {statusBadge}
          {refillBtn}
        </View>
      </View>
    ) : (
      <View
        style={[
          shell,
          {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
            minHeight: 56,
          },
          style,
        ]}
      >
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.lg }}>
          💊
        </Text>
        <View style={{ flex: 1, gap: 4 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
            {name}
          </Text>
          {detailParts.length ? (
            <View style={{ alignSelf: 'flex-start', backgroundColor: withAlpha(colors.primary, 0.1), borderRadius: tokens.radius.sm, paddingHorizontal: tokens.spacing.xs }}>
              <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
                {detailParts.join('  ·  ')}
              </Text>
            </View>
          ) : null}
          <View style={{ flexDirection: 'row' }}>{statusBadge}</View>
        </View>
        {refillBtn}
      </View>
    );

  if (!onPress) {
    return <View accessibilityLabel={a11y}>{content}</View>;
  }
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={a11y}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
    >
      {content}
    </Pressable>
  );
}
