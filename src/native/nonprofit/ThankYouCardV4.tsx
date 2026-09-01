import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Button, Icon } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { formatMoney } from './internal';
import {
  rallyGradient,
  rallyInk,
  rallyInkSoft,
  rallyTile,
  rallyBorder,
} from './internal/rally';
import { GradientSurface } from './internal/GradientSurface';
import type { ThankYouCardProps } from './ThankYouCard';

/** Drop-in for {@link ThankYouCardProps} — same props, the V4 "rally" design. */
export type ThankYouCardV4Props = ThankYouCardProps;

/**
 * ThankYouCard — **V4** "rally" design. The post-donation confirmation card and
 * the ONE reserved gradient moment of the nonprofit "rally" line: a celebratory
 * glyph, a thank-you headline (optionally naming the donor), the gift amount in
 * integer cents, a mission message, an optional concrete impact chip, and share
 * / receipt actions. Honors both `variant`s and is prop-identical to
 * {@link ThankYouCardProps}.
 *
 * - `celebratory` = the reserved gradient celebration: a `rallyGradient` ground
 *   filling a rounded, overflow-hidden container, near-white `rallyInk` /
 *   `rallyInkSoft` ink, and frosted (`rallyTile` + `rallyBorder`) amount / impact
 *   tiles.
 * - `default` = a clean, warm thank-you on the plain surface (no gradient): a
 *   soft-shadowed rounded card, with the amount as a soft-primary chip.
 *
 * Token-only colors via `useXenitionTheme()` + the rally ramp helpers — no
 * literal colors. Web/native parity with the web `ThankYouCardV4`.
 */
export function ThankYouCardV4({
  donorName,
  amountCents,
  currency = 'USD',
  headline,
  message,
  impactLabel,
  variant = 'default',
  onShare,
  onViewReceipt,
  style,
}: ThankYouCardV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const celebratory = variant === 'celebratory';

  const ink = celebratory ? rallyInk(r) : colors.onSurface;
  const inkSoft = celebratory ? rallyInkSoft(r) : colors.muted;

  const resolvedHeadline =
    headline ?? (donorName ? `Thank you, ${donorName}!` : 'Thank you for your gift!');
  const hasAmount = typeof amountCents === 'number';

  const content = (
    <View style={{ alignItems: 'center', gap: tokens.spacing.sm, padding: tokens.spacing.lg }}>
      <View
        style={{
          width: tokens.spacing['2xl'],
          height: tokens.spacing['2xl'],
          borderRadius: tokens.radius.full,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: celebratory ? rallyTile(r) : withAlpha(colors.success, 0.16),
          borderWidth: celebratory ? 1 : 0,
          borderColor: rallyBorder(r),
        }}
      >
        <Icon glyph={celebratory ? '💝' : '🎉'} size="xl" />
      </View>

      <Text style={{ color: ink, fontSize: tokens.typography.scale.xl, fontWeight: '800', textAlign: 'center' }}>
        {resolvedHeadline}
      </Text>

      {hasAmount ? (
        <View
          style={{
            paddingVertical: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.md,
            borderRadius: tokens.radius.full,
            backgroundColor: celebratory ? rallyTile(r) : withAlpha(colors.primary, 0.1),
            borderWidth: celebratory ? 1 : 0,
            borderColor: rallyBorder(r),
          }}
        >
          <Text
            style={{
              color: celebratory ? rallyInk(r) : colors.primary,
              fontSize: tokens.typography.scale['2xl'],
              fontWeight: '800',
            }}
          >
            {formatMoney(amountCents as number, currency)}
          </Text>
        </View>
      ) : null}

      {message ? (
        <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.sm, textAlign: 'center' }}>
          {message}
        </Text>
      ) : null}

      {impactLabel ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            paddingVertical: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.md,
            borderRadius: tokens.radius.full,
            backgroundColor: celebratory ? rallyTile(r) : withAlpha(colors.success, 0.12),
            borderWidth: celebratory ? 1 : 0,
            borderColor: rallyBorder(r),
          }}
        >
          <Icon glyph="🌱" size="sm" />
          <Text
            style={{
              color: celebratory ? rallyInk(r) : colors.success,
              fontSize: tokens.typography.scale.sm,
              fontWeight: '600',
            }}
          >
            {impactLabel}
          </Text>
        </View>
      ) : null}

      {onShare || onViewReceipt ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.sm, marginTop: tokens.spacing.xs }}>
          {onShare ? (
            <Button variant="primary" onPress={onShare}>
              Share
            </Button>
          ) : null}
          {onViewReceipt ? (
            <Button variant="outline" onPress={onViewReceipt}>
              View receipt
            </Button>
          ) : null}
        </View>
      ) : null}
    </View>
  );

  if (celebratory) {
    return (
      <View
        accessibilityRole="summary"
        accessibilityLabel={resolvedHeadline}
        style={[
          {
            borderRadius: tokens.radius.lg,
            overflow: 'hidden',
            shadowColor: colors.onSurface,
            shadowOpacity: 0.12,
            shadowRadius: 16,
            shadowOffset: { width: 0, height: 8 },
            elevation: 4,
          },
          style,
        ]}
      >
        <GradientSurface colors={rallyGradient(r)} style={{ ...absoluteFill }} />
        {content}
      </View>
    );
  }

  return (
    <View
      accessibilityRole="summary"
      accessibilityLabel={resolvedHeadline}
      style={[
        {
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          shadowColor: colors.onSurface,
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 3,
        },
        style,
      ]}
    >
      {content}
    </View>
  );
}

const absoluteFill = { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 } as const;
