import * as React from 'react';
import {
  Image,
  Pressable,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';
import { Button } from '../primitives/Button';
import { Badge, type BadgeTone } from '../primitives/Badge';

/** Client decision on a proof. */
export type ProofDecision = 'pending' | 'approved' | 'rejected';

const DECISION: Record<ProofDecision, { label: string; tone: BadgeTone }> = {
  pending: { label: 'Pending', tone: 'neutral' },
  approved: { label: 'Approved', tone: 'success' },
  rejected: { label: 'Rejected', tone: 'danger' },
};

export interface ClientProofRowProps {
  /** Photo / file name (e.g. "IMG_0421.jpg"). */
  filename: string;
  /** Thumbnail URL. When absent a token-tinted placeholder is drawn. */
  thumbUrl?: string;
  /** Client's decision (default `pending`). */
  decision?: ProofDecision;
  /** Whether the proof is selected for a batch action. */
  selected?: boolean;
  /** Toggles selection when the row body is pressed. */
  onToggleSelect?: () => void;
  /** Approve handler; renders an approve button when pending. */
  onApprove?: () => void;
  /** Reject handler; renders a reject button when pending. */
  onReject?: () => void;
  /** Approve button label (default `Approve`). */
  approveLabel?: string;
  /** Reject button label (default `Reject`). */
  rejectLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A client-proofing row — thumbnail, filename, and a decision `Badge`, with
 * approve/reject actions while the proof is `pending`. The row body is a
 * `checkbox` when `onToggleSelect` is provided (selection carries an
 * accessibility `checked` state, never color alone). Composes `Button` and
 * `Badge`. Token-only colors.
 */
export function ClientProofRow({
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
}: ClientProofRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = DECISION[decision];

  const body = (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, flex: 1 }}>
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: tokens.radius.sm,
          overflow: 'hidden',
          backgroundColor: tokens.ramps.neutral[100],
          borderWidth: selected ? 2 : 0,
          borderColor: selected ? colors.accent : 'transparent',
        }}
      >
        {thumbUrl ? (
          <Image
            source={{ uri: thumbUrl }}
            accessible={false}
            resizeMode="cover"
            style={{ width: '100%', height: '100%' }}
          />
        ) : null}
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}
        >
          {filename}
        </Text>
        <Badge tone={meta.tone} variant="soft" size="sm">
          {meta.label}
        </Badge>
      </View>
    </View>
  );

  const rowStyle: StyleProp<ViewStyle> = [
    {
      flexDirection: 'row',
      alignItems: 'center',
      gap: tokens.spacing.sm,
      paddingVertical: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.md,
      borderRadius: tokens.radius.md,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
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
          style={({ pressed }) => [{ flex: 1, opacity: pressed ? 0.9 : 1 }]}
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
