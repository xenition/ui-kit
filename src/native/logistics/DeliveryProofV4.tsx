import * as React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { PROOF_META, toneColor, type ProofKind } from './internal';
import type { DeliveryProofProps, ProofOutcome } from './DeliveryProof';

/** Drop-in for {@link DeliveryProofProps} — same props, the V4 "dispatch" design. */
export type DeliveryProofV4Props = DeliveryProofProps;

const OUTCOME_META: Record<ProofOutcome, { glyph: string; label: string; tone: 'success' | 'warn' | 'danger'; slot: 'success' | 'warn' | 'danger' }> = {
  delivered: { glyph: '✓', label: 'Delivered', tone: 'success', slot: 'success' },
  attempted: { glyph: '⏳', label: 'Attempted', tone: 'warn', slot: 'warn' },
  refused: { glyph: '✕', label: 'Refused', tone: 'danger', slot: 'danger' },
};

/**
 * DeliveryProof — **V4** "dispatch" design (native twin of the web V4). The
 * confident, operations-desk take on a proof-of-delivery record: an elevated
 * rounded card with a soft shadow, a captured-media placeholder (a soft-primary
 * panel stands in for the signature/photo — no media dependency), a labelled
 * glyph + word outcome badge (never color alone), the recipient, drop location
 * and timestamp, and an optional driver note. Tappable when `onPress` is set.
 * Empty (`hasMedia={false}`) and loading states supported. Token-only colors via
 * `useXenitionTheme()`.
 */
export function DeliveryProofV4({
  kind,
  outcome = 'delivered',
  recipient,
  time,
  location,
  note,
  hasMedia = true,
  loading = false,
  onPress,
  testID,
  style,
}: DeliveryProofV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const proof = PROOF_META[kind] ?? PROOF_META.signature;
  const oc = OUTCOME_META[outcome];
  const shell: ViewStyle = {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.lg,
    gap: tokens.spacing.md,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  };

  if (loading) {
    return (
      <View accessibilityLabel="Loading proof of delivery" style={[shell, style]}>
        <View style={{ height: 84, borderRadius: tokens.radius.md, backgroundColor: tokens.ramps.neutral[100] }} />
        <View style={{ height: 12, width: '60%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] }} />
      </View>
    );
  }

  const body = (
    <>
      <View
        accessibilityRole="image"
        accessibilityLabel={hasMedia ? `${proof.label} captured` : `No ${proof.label.toLowerCase()} captured`}
        style={{ height: 88, borderRadius: tokens.radius.md, alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.xs, backgroundColor: hasMedia ? withAlpha(colors.primary, 0.1) : tokens.ramps.neutral[100], borderWidth: hasMedia ? 0 : 1, borderColor: colors.border }}
      >
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale['2xl'], color: hasMedia ? toneColor(colors, proof.tone) : colors.muted }}>{proof.glyph}</Text>
        <Text style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>{hasMedia ? proof.label : `No ${proof.label.toLowerCase()}`}</Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <Badge tone={oc.tone} variant="soft" size="sm">
          {`${oc.glyph} ${oc.label}`}
        </Badge>
        {recipient ? <Text numberOfLines={1} style={{ flex: 1, fontSize: tokens.typography.scale.sm, fontWeight: '600', color: colors.onSurface }}>{recipient}</Text> : null}
      </View>

      {location || time ? (
        <Text style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>{[location, time].filter(Boolean).join('  ·  ')}</Text>
      ) : null}

      {note ? <Text numberOfLines={3} style={{ fontSize: tokens.typography.scale.xs, color: colors.onSurface }}>{note}</Text> : null}
    </>
  );

  if (onPress) {
    return (
      <Pressable accessibilityRole="button" accessibilityLabel={`Proof of delivery, ${oc.label}`} onPress={onPress} testID={testID} style={({ pressed }) => [shell, { opacity: pressed ? 0.9 : 1 }, style]}>
        {body}
      </Pressable>
    );
  }
  return <View testID={testID} style={[shell, style]}>{body}</View>;
}
