import * as React from 'react';
import { Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Button } from '../primitives';
import { GradientSurface } from './internal/GradientSurface';
import { campusGradient, campusInk, campusInkSoft } from './internal/campus';
import type { CertificateCardProps, CertificateVariant } from './CertificateCard';

/** Drop-in for {@link CertificateCardProps} — same props, the V4 "campus" design. */
export type CertificateCardV4Props = CertificateCardProps;

const VARIANT_META: Record<CertificateVariant, { seal: string; label: string }> = {
  standard: { seal: '🎓', label: 'Certificate of Completion' },
  honors: { seal: '🏅', label: 'Certificate with Honors' },
  professional: { seal: '📜', label: 'Professional Certificate' },
};

/**
 * CertificateCard — **V4** "campus" design (native twin of the web V4), and the
 * ONE reserved gradient moment of the learning V4 "campus" line: the award hero
 * (seal, certificate type, "This certifies that", recipient) rides a rounded,
 * overflow-hidden `GradientSurface` on the brand gradient (`campusGradient`) in
 * near-white ink (`campusInk` / `campusInkSoft`). The body — the course, plus
 * issuer / date / credential metadata and an optional share action — stays on the
 * plain surface. Reuses the base `variant`
 * (`standard` / `honors` / `professional`), which sets the seal glyph + label.
 * Token-only colors via `useXenitionTheme()` + the campus ramp helpers.
 */
export function CertificateCardV4({
  courseTitle,
  recipient,
  issuer,
  issuedOn,
  credentialId,
  variant = 'standard',
  actionLabel = 'Share',
  onAction,
  style,
}: CertificateCardV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const ink = campusInk(r);
  const inkSoft = campusInkSoft(r);
  const meta = VARIANT_META[variant];
  const shell: ViewStyle = {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    overflow: 'hidden',
  };

  return (
    <View accessibilityLabel={`${meta.label} for ${courseTitle}, awarded to ${recipient}`} style={[shell, style]}>
      {/* Reserved gradient moment: the certificate award hero. */}
      <GradientSurface colors={campusGradient(r)} style={{ alignItems: 'center', gap: tokens.spacing.xs, padding: tokens.spacing.xl }}>
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale['3xl'] }}>{meta.seal}</Text>
        <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.xs, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 }}>{meta.label}</Text>
        <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.sm }}>This certifies that</Text>
        <Text style={{ color: ink, fontSize: tokens.typography.scale.xl, fontWeight: '700', textAlign: 'center' }}>{recipient}</Text>
      </GradientSurface>

      {/* Clean body: the course + metadata on the plain surface. */}
      <View style={{ alignItems: 'center', gap: tokens.spacing.xs, padding: tokens.spacing.lg }}>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>has completed</Text>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '600', textAlign: 'center' }}>{courseTitle}</Text>

        {issuer || issuedOn || credentialId ? (
          <View style={{ alignItems: 'center', gap: 2, marginTop: tokens.spacing.sm }}>
            {issuer ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Issued by {issuer}</Text> : null}
            {issuedOn ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{issuedOn}</Text> : null}
            {credentialId ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontVariant: ['tabular-nums'] }}>ID: {credentialId}</Text> : null}
          </View>
        ) : null}

        {onAction ? (
          <View style={{ marginTop: tokens.spacing.md, alignSelf: 'stretch' }}>
            <Button variant="secondary" onPress={onAction}>{actionLabel}</Button>
          </View>
        ) : null}
      </View>
    </View>
  );
}
