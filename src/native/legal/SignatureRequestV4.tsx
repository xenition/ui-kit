import * as React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { Avatar, Button } from '../primitives';
import { StatusPill } from './StatusPill';
import { SIGNATURE_STATUS_META } from './internal';
import type { SignatureRequestProps } from './SignatureRequest';

/** Drop-in for {@link SignatureRequestProps} — same props, the V4 "chambers" design. */
export type SignatureRequestV4Props = SignatureRequestProps;

/**
 * SignatureRequest — **V4** "chambers" design (native twin of the web V4). An
 * elevated rounded card with a soft shadow, a signature glyph + document title, a
 * sent / due meta line, a labelled glyph + word lifecycle pill (never color
 * alone), and the signer (avatar + role) in a soft-primary well. A `draft` shows
 * a "Request signature" button; an in-flight request (`sent` / `viewed`) shows
 * "Sign" / "Remind"; terminal states hide actions. Tappable when `onPress` is
 * set. Reuses the base `variant` (`default` / `compact`). Token-only colors via
 * `useXenitionTheme()`.
 */
export function SignatureRequestV4({
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
}: SignatureRequestV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const isDraft = status === 'draft';
  const awaiting = status === 'sent' || status === 'viewed';
  const meta = [sentDate ? `Sent ${sentDate}` : undefined, dueDate ? `Due ${dueDate}` : undefined].filter(Boolean).join(' · ');
  const shell: ViewStyle = {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    padding: compact ? tokens.spacing.md : tokens.spacing.lg,
    gap: tokens.spacing.md,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  };

  const content = (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <View style={{ width: 36, height: 36, borderRadius: tokens.radius.md, alignItems: 'center', justifyContent: 'center', backgroundColor: withAlpha(colors.primary, 0.1) }}>
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.lg }}>✍</Text>
        </View>
        <View style={{ flex: 1, minWidth: 0, gap: 2 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{document}</Text>
          {meta ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{meta}</Text> : null}
        </View>
        <StatusPill meta={SIGNATURE_STATUS_META[status]} variant="soft" size="sm" />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, backgroundColor: withAlpha(colors.primary, 0.05), borderRadius: tokens.radius.md, paddingHorizontal: tokens.spacing.sm, paddingVertical: tokens.spacing.xs }}>
        <Avatar size="sm" name={signer} src={signerAvatarUrl} />
        <View style={{ flex: 1, minWidth: 0, gap: 2 }}>
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
          {onSign ? <Button size="sm" variant="primary" onPress={onSign}>Sign</Button> : null}
          {onRemind ? <Button size="sm" variant="outline" onPress={onRemind}>Remind</Button> : null}
        </View>
      ) : null}
    </>
  );

  if (onPress) {
    return (
      <Pressable accessibilityRole="button" accessibilityLabel={`Signature request: ${document}`} onPress={onPress} testID={testID} style={({ pressed }) => [shell, { opacity: pressed ? 0.9 : 1 }, style]}>
        {content}
      </Pressable>
    );
  }
  return <View testID={testID} style={[shell, style]}>{content}</View>;
}
