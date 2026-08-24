import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Button } from '../primitives';

/** Certificate emphasis — sets the seal tone. */
export type CertificateVariant = 'standard' | 'honors' | 'professional';

interface VariantMeta {
  seal: string;
  tone: keyof SemanticColors;
  label: string;
}

const VARIANT_META: Record<CertificateVariant, VariantMeta> = {
  standard: { seal: '🎓', tone: 'primary', label: 'Certificate of Completion' },
  honors: { seal: '🏅', tone: 'accent', label: 'Certificate with Honors' },
  professional: { seal: '📜', tone: 'success', label: 'Professional Certificate' },
};

export interface CertificateCardProps {
  /** Course / program the certificate is for. */
  courseTitle: string;
  /** The learner's name. */
  recipient: string;
  /** Issuer / academy name. */
  issuer?: string;
  /** Human issue date, e.g. "May 2026". */
  issuedOn?: string;
  /** Credential id / verification code. */
  credentialId?: string;
  /** Emphasis variant. */
  variant?: CertificateVariant;
  /** Share / download CTA label. */
  actionLabel?: string;
  /** Fires when the CTA is pressed. */
  onAction?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * An earned-certificate card: a seal, the certificate type, the course, the
 * recipient, and issuer / date / credential metadata, plus an optional
 * share/download action. `variant` sets the seal glyph and tone. Token-only
 * colors.
 */
export function CertificateCard({
  courseTitle,
  recipient,
  issuer,
  issuedOn,
  credentialId,
  variant = 'standard',
  actionLabel = 'Share',
  onAction,
  style,
}: CertificateCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = VARIANT_META[variant];

  return (
    <View
      accessibilityLabel={`${meta.label} for ${courseTitle}, awarded to ${recipient}`}
      style={[
        {
          alignItems: 'center',
          gap: tokens.spacing.sm,
          padding: tokens.spacing.xl,
          backgroundColor: colors.surface,
          borderColor: colors[meta.tone],
          borderWidth: 2,
          borderRadius: tokens.radius.lg,
        },
        style,
      ]}
    >
      <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale['3xl'] }}>
        {meta.seal}
      </Text>
      <Text style={{ color: colors[meta.tone], fontSize: tokens.typography.scale.xs, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 }}>
        {meta.label}
      </Text>
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>This certifies that</Text>
      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700', textAlign: 'center' }}>
        {recipient}
      </Text>
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>has completed</Text>
      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '600', textAlign: 'center' }}>
        {courseTitle}
      </Text>

      <View style={{ alignItems: 'center', gap: 2, marginTop: tokens.spacing.sm }}>
        {issuer ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Issued by {issuer}</Text>
        ) : null}
        {issuedOn ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{issuedOn}</Text>
        ) : null}
        {credentialId ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>ID: {credentialId}</Text>
        ) : null}
      </View>

      {onAction ? (
        <View style={{ marginTop: tokens.spacing.sm, alignSelf: 'stretch' }}>
          <Button variant="secondary" onPress={onAction}>
            {actionLabel}
          </Button>
        </View>
      ) : null}
    </View>
  );
}
