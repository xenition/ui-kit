import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Avatar } from '../primitives';
import { formatPct } from './internal/format';

/** Whether the beneficiary is primary or contingent (secondary). */
export type BeneficiaryKind = 'primary' | 'contingent';

const KIND_LABEL: Record<BeneficiaryKind, string> = {
  primary: 'Primary',
  contingent: 'Contingent',
};

export interface BeneficiaryRowProps {
  /** Beneficiary full name. */
  name: string;
  /** Relationship to the insured (e.g. "Spouse", "Child"). */
  relationship?: string;
  /** Benefit allocation as a whole percentage (0–100). */
  allocationPct: number;
  /** Primary vs contingent designation (default `primary`). */
  kind?: BeneficiaryKind;
  /** Optional avatar image URL. */
  avatarUrl?: string;
  /** Fires on row press (e.g. edit beneficiary). */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * One beneficiary in a policy's allocation list: avatar (initials fallback),
 * name + relationship, a primary/contingent tag, and a right-aligned
 * allocation percentage. The percentage is clamped to 0–100 and rendered whole
 * (no float drift). Token-bound throughout; becomes a button only when
 * `onPress` is supplied.
 */
export function BeneficiaryRow({
  name,
  relationship,
  allocationPct,
  kind = 'primary',
  avatarUrl,
  onPress,
  style,
}: BeneficiaryRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const pct = Number.isFinite(allocationPct) ? Math.min(100, Math.max(0, allocationPct)) : 0;

  const row = (
    <View
      style={[
        { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, paddingVertical: tokens.spacing.sm },
        style,
      ]}
    >
      <Avatar src={avatarUrl} name={name} size="md" />
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}
        >
          {name}
        </Text>
        <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {KIND_LABEL[kind]}
          {relationship != null ? ` · ${relationship}` : ''}
        </Text>
      </View>
      <Text
        accessibilityLabel={`${formatPct(pct)} allocation`}
        style={{ color: colors.primary, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}
      >
        {formatPct(pct)}
      </Text>
    </View>
  );

  if (!onPress) return row;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${name}, ${KIND_LABEL[kind]} beneficiary, ${formatPct(pct)}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
    >
      {row}
    </Pressable>
  );
}
