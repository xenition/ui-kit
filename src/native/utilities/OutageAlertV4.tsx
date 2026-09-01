import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Icon, Button } from '../primitives';
import { withAlpha } from './internal/format';
import { outageState, utilityKind } from './internal/status';
import { GradientSurface } from './internal/GradientSurface';
import { brandDisc, brandInk } from './internal/brand';
import type { OutageAlertProps } from './OutageAlert';

/** Drop-in for {@link OutageAlertProps} — same props, a different design. */
export type OutageAlertV4Props = OutageAlertProps;

/**
 * OutageAlert — **V4** design. A cleaner elevated card that keeps the severity
 * signal (active → danger, scheduled → warn, resolved → success via
 * `outageState`) carried by glyph + heading + a semantic tint (never color
 * alone): a thin tinted top rail and tinted ETA line. The kind glyph sits in the
 * signature brand-gradient disc. ETA is surfaced for active/scheduled and
 * suppressed once resolved; the details `Button` renders only when `onDetails`
 * is supplied. Same props as {@link OutageAlertProps}; token-only colors.
 */
export function OutageAlertV4({
  state = 'active',
  kind,
  area,
  eta,
  message,
  detailsLabel = 'View details',
  onDetails,
  style,
}: OutageAlertV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const od = outageState(state);
  const kd = kind != null ? utilityKind(kind) : null;
  const tint = colors[od.color];
  const heading = kd != null ? `${kd.label} ${od.heading.toLowerCase()}` : od.heading;
  const showEta = eta != null && state !== 'resolved';
  const discGlyph = kd != null ? kd.glyph : od.glyph;

  const card = {
    backgroundColor: colors.card,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.lg,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.1,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  } as const;

  return (
    <View
      accessibilityLabel={`${heading}${area != null ? `, ${area}` : ''}`}
      style={[card, { gap: tokens.spacing.md, borderTopWidth: 3, borderTopColor: tint }, style]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.md }}>
        <GradientSurface
          colors={brandDisc(r)}
          style={{ width: 48, height: 48, borderRadius: tokens.radius.md, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
        >
          <Icon glyph={discGlyph} size="xl" accessibilityLabel={od.label} style={{ color: brandInk(r) }} />
        </GradientSurface>
        <View style={{ flex: 1, gap: 2 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flexWrap: 'wrap' }}>
            <View
              style={{
                paddingHorizontal: tokens.spacing.sm,
                paddingVertical: 2,
                borderRadius: tokens.radius.full,
                backgroundColor: withAlpha(tint, 0.14),
              }}
            >
              <Text style={{ color: tint, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
                {`${od.glyph} ${od.label}`}
              </Text>
            </View>
          </View>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {heading}
          </Text>
          {area != null ? (
            <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.sm }}>{area}</Text>
          ) : null}
          {message != null ? (
            <Text style={{ marginTop: 2, color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>
              {message}
            </Text>
          ) : null}
          {showEta ? (
            <Text style={{ marginTop: 2, color: tint, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
              Estimated restoration: {eta}
            </Text>
          ) : null}
        </View>
      </View>
      {onDetails != null ? (
        <Button variant="outline" onPress={onDetails}>
          {detailsLabel}
        </Button>
      ) : null}
    </View>
  );
}
