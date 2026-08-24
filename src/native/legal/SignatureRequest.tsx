import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card, Avatar, Button } from '../primitives';
import { StatusPill } from './StatusPill';
import { SIGNATURE_STATUS_META, type SignatureStatus } from './internal';

export type SignatureRequestVariant = 'default' | 'compact';

export interface SignatureRequestProps {
  /** Document title awaiting signature. */
  document: string;
  /** Name of the party who must sign. */
  signer: string;
  /** Signer role / relationship (e.g. "Client", "Opposing counsel"). */
  signerRole?: string;
  /** Signer avatar URL (initials fallback otherwise). */
  signerAvatarUrl?: string;
  /** Request lifecycle state — glyph + word pill, never color alone. */
  status?: SignatureStatus;
  /** Pre-formatted sent / due label. */
  sentDate?: string;
  /** Pre-formatted expiry / due label. */
  dueDate?: string;
  /** Density. */
  variant?: SignatureRequestVariant;
  /**
   * Send the request for signature — renders a "Request signature" button when
   * the request is still a `draft`.
   */
  onRequest?: () => void;
  /** Send a reminder — renders "Remind" while awaiting (sent / viewed). */
  onRemind?: () => void;
  /** Sign the document — renders "Sign" while awaiting. */
  onSign?: () => void;
  /** Tap handler for the whole card. */
  onPress?: () => void;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * An e-signature request: the document, the signer (avatar + role), and a
 * lifecycle pill (glyph + word so state never rests on color alone). A `draft`
 * shows a "Request signature" button (`onRequest`); an in-flight request
 * (`sent` / `viewed`) shows "Sign" / "Remind". Terminal states hide actions. All
 * colors are theme tokens — no literals.
 */
export function SignatureRequest({
  document,
  signer,
  signerRole,
  signerAvatarUrl,
  status = 'draft',
  sentDate,
  dueDate,
  variant = 'default',
  onRequest,
  onRemind,
  onSign,
  onPress,
  testID,
  style,
}: SignatureRequestProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const isDraft = status === 'draft';
  const awaiting = status === 'sent' || status === 'viewed';

  const meta = [sentDate ? `Sent ${sentDate}` : undefined, dueDate ? `Due ${dueDate}` : undefined]
    .filter(Boolean)
    .join(' · ');

  const body = (
    <Card variant="outlined" padding={compact ? 'sm' : 'md'} style={[{ gap: tokens.spacing.sm }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <Text accessibilityElementsHidden importantForAccessibility="no" style={{ fontSize: tokens.typography.scale.lg }}>✍</Text>
        <View style={{ flex: 1, gap: 2 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            {document}
          </Text>
          {meta ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{meta}</Text> : null}
        </View>
        <StatusPill meta={SIGNATURE_STATUS_META[status]} size="sm" />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <Avatar size="sm" name={signer} src={signerAvatarUrl} />
        <View style={{ flex: 1, gap: 2 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{signer}</Text>
          {signerRole ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{signerRole}</Text> : null}
        </View>
      </View>

      {isDraft && onRequest ? (
        <Button size="sm" variant="primary" onPress={onRequest} style={{ alignSelf: 'flex-start' }}>
          Request signature
        </Button>
      ) : awaiting && (onSign || onRemind) ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.xs }}>
          {onSign ? (
            <Button size="sm" variant="primary" tone="success" onPress={onSign}>
              Sign
            </Button>
          ) : null}
          {onRemind ? (
            <Button size="sm" variant="outline" onPress={onRemind}>
              Remind
            </Button>
          ) : null}
        </View>
      ) : null}
    </Card>
  );

  if (onPress) {
    return (
      <Pressable accessibilityRole="button" accessibilityLabel={`Signature request: ${document}`} onPress={onPress} testID={testID}>
        {body}
      </Pressable>
    );
  }
  return <View testID={testID}>{body}</View>;
}
