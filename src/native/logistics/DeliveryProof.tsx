import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card } from '../primitives';
import { PROOF_META, toneColor, type ProofKind } from './internal';

export type ProofOutcome = 'delivered' | 'attempted' | 'refused';

const OUTCOME_META: Record<ProofOutcome, { glyph: string; label: string; slot: 'success' | 'warn' | 'danger' }> = {
  delivered: { glyph: '✓', label: 'Delivered', slot: 'success' },
  attempted: { glyph: '⏳', label: 'Attempted', slot: 'warn' },
  refused: { glyph: '✕', label: 'Refused', slot: 'danger' },
};

export interface DeliveryProofProps {
  /** Capture kind (signature / photo / pin / contactless). */
  kind: ProofKind;
  /** Delivery outcome — glyph + word, never color alone. */
  outcome?: ProofOutcome;
  /** Person who received (or refused) the delivery. */
  recipient?: string;
  /** Human timestamp of capture. */
  time?: string;
  /** Drop location note (e.g. `Front porch`). */
  location?: string;
  /** Optional free-text note from the driver. */
  note?: string;
  /** Whether the underlying media (photo/signature) is present. Drives the placeholder. */
  hasMedia?: boolean;
  /** Loading skeleton. */
  loading?: boolean;
  /** View the full proof. */
  onPress?: () => void;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Proof-of-delivery card: a captured-media placeholder (the kit ships no image
 * component, so a token-tinted panel stands in for the signature/photo), the
 * recipient, timestamp, drop location and an outcome carried by a glyph + word.
 * Tappable when `onPress` is set. Empty (`hasMedia={false}`) and loading states
 * supported. All colors are theme tokens.
 */
export function DeliveryProof({
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
}: DeliveryProofProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const proof = PROOF_META[kind] ?? PROOF_META.signature;
  const oc = OUTCOME_META[outcome];
  const ocColor = colors[oc.slot];

  if (loading) {
    return (
      <Card variant="outlined" style={style}>
        <View accessibilityLabel="Loading proof of delivery" style={{ gap: tokens.spacing.sm }}>
          <View style={{ height: 72, borderRadius: tokens.radius.md, backgroundColor: tokens.ramps.neutral[100] }} />
          <View style={{ height: 12, width: '60%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] }} />
        </View>
      </Card>
    );
  }

  const body = (
    <View style={{ gap: tokens.spacing.sm }}>
      <View
        accessibilityRole="image"
        accessibilityLabel={hasMedia ? `${proof.label} captured` : `No ${proof.label.toLowerCase()} captured`}
        style={{
          height: 76,
          borderRadius: tokens.radius.md,
          alignItems: 'center',
          justifyContent: 'center',
          gap: tokens.spacing.xs,
          backgroundColor: tokens.ramps.neutral[100],
          borderWidth: hasMedia ? 0 : 1,
          borderColor: colors.border,
        }}
      >
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xl, color: hasMedia ? toneColor(colors, proof.tone) : colors.muted }}>
          {proof.glyph}
        </Text>
        <Text style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>
          {hasMedia ? proof.label : `No ${proof.label.toLowerCase()}`}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.sm, color: ocColor }}>
          {oc.glyph}
        </Text>
        <Text style={{ fontSize: tokens.typography.scale.sm, fontWeight: '700', color: ocColor }}>{oc.label}</Text>
        {recipient ? (
          <Text numberOfLines={1} style={{ flex: 1, fontSize: tokens.typography.scale.sm, color: colors.onSurface }}>
            {`· ${recipient}`}
          </Text>
        ) : null}
      </View>

      {location || time ? (
        <Text style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>
          {[location, time].filter(Boolean).join(' · ')}
        </Text>
      ) : null}

      {note ? (
        <Text numberOfLines={3} style={{ fontSize: tokens.typography.scale.xs, color: colors.onSurface }}>
          {note}
        </Text>
      ) : null}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Proof of delivery, ${oc.label}`}
        onPress={onPress}
        testID={testID}
        style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }, style]}
      >
        <Card variant="interactive">{body}</Card>
      </Pressable>
    );
  }

  return (
    <Card variant="outlined" testID={testID} style={style}>
      {body}
    </Card>
  );
}
