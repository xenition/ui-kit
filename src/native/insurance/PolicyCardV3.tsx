import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../primitives';
import { Icon } from '../primitives';
import { formatMoney, withAlpha } from './internal/format';
import { policyVariant, type PolicyVariant } from './internal/status';
import type { PolicyCardProps, PolicyStatus } from './PolicyCard';

/** Drop-in replacement for {@link PolicyCard} — identical props, distinct design. */
export type PolicyCardV3Props = PolicyCardProps;

/** Decorative per-line category hue for the leading dot (not a status signal). */
const VARIANT_TONE: Record<PolicyVariant, keyof SemanticColors> = {
  auto: 'primary',
  home: 'accent',
  life: 'success',
  health: 'warn',
};

const STATUS_META: Record<PolicyStatus, { label: string; glyph: string; slot: keyof SemanticColors }> = {
  active: { label: 'Active', glyph: '✓', slot: 'successText' },
  pending: { label: 'Pending', glyph: '⋯', slot: 'warnText' },
  lapsed: { label: 'Lapsed', glyph: '!', slot: 'dangerText' },
  cancelled: { label: 'Cancelled', glyph: '✕', slot: 'muted' },
};

/**
 * PolicyCard, alternate design **V3** — a minimal single line. A colored type
 * dot (a category hue, reinforced by the glyph and the line label — never
 * color-alone) leads into the plan name and number; the coverage sits quietly
 * on the right, with the policy status shown as a small glyph + label. No card
 * chrome — separation comes from spacing. Same `PolicyCardProps`; drops in for
 * dense lists. Token-pure.
 */
export function PolicyCardV3({
  variant,
  name,
  policyNumber,
  coverageCents,
  status = 'active',
  currency = 'USD',
  formatMoney: format = formatMoney,
  onPress,
  style,
}: PolicyCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const colorRec = colors as unknown as Record<string, string>;
  const vd = policyVariant(variant);
  const toneSlot = VARIANT_TONE[variant] ?? 'primary';
  const dotColor = colorRec[toneSlot] ?? colors.primary;
  const sm = STATUS_META[status] ?? STATUS_META.active;
  const statusColor = colorRec[sm.slot] ?? colors.muted;

  const coverage = format(Math.max(0, Math.trunc(coverageCents || 0)), currency);

  const row = (
    <View
      style={[
        { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, paddingVertical: tokens.spacing.sm },
        style,
      ]}
    >
      <View
        style={{
          width: 30,
          height: 30,
          borderRadius: tokens.radius.full,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: withAlpha(dotColor, 0.16),
          borderWidth: 1,
          borderColor: withAlpha(dotColor, 0.4),
        }}
      >
        <Icon glyph={vd.glyph} size="sm" accessibilityLabel={`${vd.label} policy`} />
      </View>

      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}
        >
          {name}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {policyNumber}
          </Text>
          <Text style={{ color: statusColor, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
            {sm.glyph} {sm.label}
          </Text>
        </View>
      </View>

      <Text
        accessibilityLabel={`Coverage ${coverage}`}
        style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}
      >
        {coverage}
      </Text>
    </View>
  );

  if (!onPress) return row;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${name}, ${vd.label} policy, ${sm.label}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
    >
      {row}
    </Pressable>
  );
}
