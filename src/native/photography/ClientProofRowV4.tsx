import * as React from 'react';
import { Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Button } from '../primitives/Button';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { withAlpha } from '../primitives/internal/color';
import type { ClientProofRowProps, ProofDecision } from './ClientProofRow';

/** Drop-in for {@link ClientProofRowProps} — same props, the V4 "studio" design. */
export type ClientProofRowV4Props = ClientProofRowProps;

const DECISION: Record<ProofDecision, { label: string; tone: BadgeTone; glyph: string }> = {
  pending: { label: 'Pending', tone: 'neutral', glyph: '⏳' },
  approved: { label: 'Approved', tone: 'success', glyph: '✅' },
  rejected: { label: 'Rejected', tone: 'danger', glyph: '⛔' },
};

/**
 * ClientProofRow — **V4** "studio" design (native parity of the web V4). The
 * matted proofing row: an elevated clean-surface row whose thumbnail floats
 * inside a thin neutral **mat** (a soft-primary selection ring when picked for a
 * batch), a bold filename, and a labelled decision `Badge` carrying glyph + token
 * tone + label (never color alone). While `pending` the base's approve/reject
 * actions render as trailing `Button`s. The row body is a keyboard/press
 * `checkbox` when `onToggleSelect` is provided (selection carries an
 * accessibility `checked` state, never color alone). Identical props/behavior to
 * {@link ClientProofRowProps}; token-only colors via `useXenitionTheme()`.
 */
export function ClientProofRowV4({
  filename,
  thumbUrl,
  decision = 'pending',
  selected = false,
  onToggleSelect,
  onApprove,
  onReject,
  approveLabel = 'Approve',
  rejectLabel = 'Reject',
  style,
}: ClientProofRowV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = DECISION[decision];

  const body = (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, flex: 1 }}>
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: tokens.radius.md,
          overflow: 'hidden',
          backgroundColor: tokens.ramps.neutral[100],
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: selected ? 2 : 1,
          borderColor: selected ? colors.accent : colors.border,
        }}
      >
        {thumbUrl ? (
          <Image
            source={{ uri: thumbUrl }}
            accessible={false}
            resizeMode="cover"
            style={{ width: '100%', height: '100%' }}
          />
        ) : (
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.lg }}>
            🖼
          </Text>
        )}
      </View>
      <View style={{ flex: 1, gap: tokens.spacing.xs }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}
        >
          {filename}
        </Text>
        <Badge tone={meta.tone} variant="soft" size="sm">
          {`${meta.glyph} ${meta.label}`}
        </Badge>
      </View>
    </View>
  );

  const rowStyle: StyleProp<ViewStyle> = [
    {
      flexDirection: 'row',
      alignItems: 'center',
      gap: tokens.spacing.sm,
      padding: tokens.spacing.md,
      borderRadius: tokens.radius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
      shadowColor: colors.onSurface,
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
      elevation: 3,
    },
    style,
  ];

  const actions =
    decision === 'pending' && (onApprove || onReject) ? (
      <View style={{ flexDirection: 'row', gap: tokens.spacing.xs }}>
        {onReject ? (
          <Button size="sm" variant="outline" tone="danger" onPress={onReject}>
            {rejectLabel}
          </Button>
        ) : null}
        {onApprove ? (
          <Button size="sm" tone="success" onPress={onApprove}>
            {approveLabel}
          </Button>
        ) : null}
      </View>
    ) : null;

  return (
    <View style={rowStyle}>
      {onToggleSelect ? (
        <Pressable
          accessibilityRole="checkbox"
          accessibilityState={{ checked: selected }}
          accessibilityLabel={`${filename}, ${meta.label}`}
          onPress={onToggleSelect}
          style={({ pressed }) => [
            {
              flex: 1,
              borderRadius: tokens.radius.md,
              backgroundColor: pressed ? withAlpha(colors.primary, 0.1) : 'transparent',
            },
          ]}
        >
          {body}
        </Pressable>
      ) : (
        body
      )}
      {actions}
    </View>
  );
}
