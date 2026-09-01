import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Badge } from '../primitives';
import { GradientSurface } from './internal/GradientSurface';
import { brandDisc, brandInk } from './internal/brand';

export type PaymentMethodKind = 'card' | 'bank' | 'wallet';

export interface PaymentMethodCardProps {
  /** Which kind of instrument this is — picks the leading glyph. */
  kind: PaymentMethodKind;
  /** Primary label (e.g. "Visa" / "Checking" / "Apple Pay"). */
  label: string;
  /** Secondary line (e.g. "•••• 4242", "ACH ••6789"). */
  detail?: string;
  /** Marks this as the default method — shows a success "Default" badge. */
  isDefault?: boolean;
  /** Current selection state (drives the radio + the accent border). */
  selected?: boolean;
  /** When set, the whole row becomes a selectable radio. */
  onSelect?: () => void;
  /** When set, shows a manage affordance on the trailing edge. */
  onManage?: () => void;
  style?: StyleProp<ViewStyle>;
}

const KIND_GLYPH: Record<PaymentMethodKind, string> = {
  card: '💳',
  bank: '🏦',
  wallet: '📱',
};

/**
 * A saved payment method — the clean, trust-first row on a money surface: the
 * instrument glyph in a small brand-gradient disc (the signature V4 touch), the
 * `label` + `detail`, an optional "Default" badge (success tone), and a manage
 * affordance. When `onSelect` is set the whole row is a radio carrying
 * `accessibilityState.selected`; a selected row gains a 2px primary border. All
 * colors trace to tokens — no literals.
 */
export function PaymentMethodCard({
  kind,
  label,
  detail,
  isDefault = false,
  selected = false,
  onSelect,
  onManage,
  style,
}: PaymentMethodCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;

  const card = {
    backgroundColor: colors.card,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.lg,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.1,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
    borderWidth: selected ? 2 : 0,
    borderColor: selected ? colors.primary : undefined,
  } as const;

  const body = (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
      {onSelect ? (
        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={{
            width: 20,
            height: 20,
            borderRadius: tokens.radius.full,
            borderWidth: 2,
            borderColor: selected ? colors.primary : colors.border,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {selected ? (
            <View style={{ width: 10, height: 10, borderRadius: tokens.radius.full, backgroundColor: colors.primary }} />
          ) : null}
        </View>
      ) : null}

      <GradientSurface
        colors={brandDisc(r)}
        style={{
          width: 44,
          height: 44,
          borderRadius: tokens.radius.md,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.lg, color: brandInk(r) }}>
          {KIND_GLYPH[kind] ?? KIND_GLYPH.card}
        </Text>
      </GradientSurface>

      <View style={{ flex: 1, minWidth: 0, gap: 2 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {label}
        </Text>
        {detail ? (
          <Text numberOfLines={1} style={{ color: colors.mutedText, fontSize: tokens.typography.scale.sm }}>
            {detail}
          </Text>
        ) : null}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        {isDefault ? (
          <Badge tone="success" variant="soft">
            Default
          </Badge>
        ) : null}
        {onManage ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Manage ${label}`}
            onPress={onManage}
            hitSlop={8}
            style={({ pressed }) => ({
              paddingHorizontal: tokens.spacing.sm,
              paddingVertical: tokens.spacing.xs,
              borderRadius: tokens.radius.sm,
              opacity: pressed ? 0.6 : 1,
            })}
          >
            <Text style={{ color: colors.primaryText, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>Manage</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );

  if (!onSelect) return <View style={[card, style]}>{body}</View>;

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={detail ? `${label}, ${detail}` : label}
      onPress={onSelect}
      style={({ pressed }) => [card, { opacity: pressed ? 0.9 : 1 }, style]}
    >
      {body}
    </Pressable>
  );
}
