import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge, Button } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { LostPetAlertProps, LostPetStatus } from './LostPetAlert';

/** Drop-in for {@link LostPetAlertProps} — same props, the V4 "companion" design. */
export type LostPetAlertV4Props = LostPetAlertProps;

interface StatusMeta {
  label: string;
  tone: 'danger' | 'warn' | 'success';
  slot: 'danger' | 'warn' | 'success';
  glyph: string;
}

const STATUS_META: Record<LostPetStatus, StatusMeta> = {
  lost: { label: 'Lost', tone: 'danger', slot: 'danger', glyph: '🚨' },
  sighted: { label: 'Sighted', tone: 'warn', slot: 'warn', glyph: '👀' },
  found: { label: 'Found', tone: 'success', slot: 'success', glyph: '🎉' },
  reunited: { label: 'Reunited', tone: 'success', slot: 'success', glyph: '🏠' },
};

/**
 * LostPetAlert — **V4** "companion" design (native parity of the web V4). The
 * warm, friendly take on a lost-pet alert: an elevated rounded card with a soft
 * shadow (no gradient) whose urgency is carried by a status-toned soft surface
 * accent — a token-colored left edge + reduced-alpha tint on the glyph well — plus
 * a labelled status Badge + glyph (danger for lost, etc.), never color alone. Uses
 * the `alert` a11y role, keeps the static map placeholder, and preserves the
 * report-sighting + share actions for active alerts. Same props/behavior as
 * {@link LostPetAlertProps}. Token-only colors via `useXenitionTheme()`.
 */
export function LostPetAlertV4({
  name,
  status,
  lastSeen,
  lastSeenAt,
  reward,
  description,
  contact,
  showMap = true,
  reportLabel = 'Report sighting',
  onReportSighting,
  onShare,
  style,
}: LostPetAlertV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = STATUS_META[status];
  const accent = colors[meta.slot];
  const active = status !== 'reunited' && status !== 'found';

  const chipStyle = {
    backgroundColor: withAlpha(colors.primary, 0.1),
    borderRadius: tokens.radius.full,
    paddingHorizontal: tokens.spacing.sm,
    paddingVertical: 2,
  } as const;

  return (
    <View
      accessibilityRole="alert"
      accessibilityLabel={`${meta.label}: ${name}${lastSeen ? `, last seen ${lastSeen}` : ''}`}
      style={[
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderWidth: 1,
          borderLeftWidth: 4,
          borderLeftColor: accent,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.md,
          shadowColor: colors.onSurface,
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 3,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: tokens.radius.full,
            backgroundColor: withAlpha(accent, 0.1),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xl }}>
            {meta.glyph}
          </Text>
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
            {name}
          </Text>
          {lastSeenAt ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{lastSeenAt}</Text>
          ) : null}
        </View>
        <Badge tone={meta.tone} variant="soft" size="sm">
          {meta.label}
        </Badge>
      </View>

      {lastSeen ? (
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>📍 Last seen: {lastSeen}</Text>
      ) : null}

      {showMap ? (
        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={{
            height: 120,
            borderRadius: tokens.radius.md,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: withAlpha(colors.primary, 0.1),
            alignItems: 'center',
            justifyContent: 'center',
            gap: tokens.spacing.xs,
          }}
        >
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xl }}>
            🗺️
          </Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Map preview</Text>
        </View>
      ) : null}

      {description ? (
        <Text numberOfLines={3} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
          {description}
        </Text>
      ) : null}

      {reward || contact ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }}>
          {reward ? (
            <View style={chipStyle}>
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>🏅 Reward {reward}</Text>
            </View>
          ) : null}
          {contact ? (
            <View style={chipStyle}>
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>☎ {contact}</Text>
            </View>
          ) : null}
        </View>
      ) : null}

      {onReportSighting || onShare ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.sm, marginTop: tokens.spacing.xs }}>
          {active && onReportSighting ? (
            <View style={{ flex: 1 }}>
              <Button variant="primary" size="sm" tone="danger" onPress={onReportSighting}>
                {reportLabel}
              </Button>
            </View>
          ) : null}
          {onShare ? (
            <View style={{ flex: 1 }}>
              <Button variant="outline" size="sm" onPress={onShare}>
                Share
              </Button>
            </View>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}
