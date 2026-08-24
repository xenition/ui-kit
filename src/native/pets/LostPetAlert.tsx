import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Badge, Button } from '../primitives';

export type LostPetStatus = 'lost' | 'sighted' | 'found' | 'reunited';

interface StatusMeta {
  label: string;
  tone: 'danger' | 'warn' | 'success';
  slot: keyof SemanticColors;
  glyph: string;
}

const STATUS_META: Record<LostPetStatus, StatusMeta> = {
  lost: { label: 'Lost', tone: 'danger', slot: 'danger', glyph: '🚨' },
  sighted: { label: 'Sighted', tone: 'warn', slot: 'warn', glyph: '👀' },
  found: { label: 'Found', tone: 'success', slot: 'success', glyph: '🎉' },
  reunited: { label: 'Reunited', tone: 'success', slot: 'success', glyph: '🏠' },
};

/** Token-derived translucent tint (no literal hex; mirrors GlassPanel). */
function withAlpha(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export interface LostPetAlertProps {
  /** Pet's name. */
  name: string;
  /** Alert status; drives the banner tint, chip, and icon. */
  status: LostPetStatus;
  /** Last-seen location description. */
  lastSeen?: string;
  /** When last seen (already formatted). */
  lastSeenAt?: string;
  /** Reward label, e.g. "$500". */
  reward?: string;
  /** Short description / distinguishing marks. */
  description?: string;
  /** Contact phone / handle. */
  contact?: string;
  /** Whether to render the static map placeholder. */
  showMap?: boolean;
  /** Report-sighting action label; hidden when reunited or no handler. */
  reportLabel?: string;
  onReportSighting?: () => void;
  onShare?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A high-visibility lost-pet alert banner: status chip + icon, pet name, last-
 * seen location/time, reward, and a static map placeholder (a real map needs a
 * native maps dep this kit doesn't bundle). Exposes report-sighting + share
 * actions for active alerts. Uses `alert` a11y role and conveys status by icon +
 * label, not color alone. Tint is a token color at reduced alpha — no literals.
 */
export function LostPetAlert({
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
}: LostPetAlertProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = STATUS_META[status];
  const accent = colors[meta.slot];
  const active = status !== 'reunited' && status !== 'found';

  return (
    <View
      accessibilityRole="alert"
      accessibilityLabel={`${meta.label}: ${name}${lastSeen ? `, last seen ${lastSeen}` : ''}`}
      style={[
        {
          backgroundColor: withAlpha(accent, 0.1),
          borderColor: accent,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.md,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale['2xl'] }}>
          {meta.glyph}
        </Text>
        <View style={{ flex: 1, gap: 2 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
            {name}
          </Text>
          {lastSeenAt ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{lastSeenAt}</Text>
          ) : null}
        </View>
        <Badge tone={meta.tone} variant="solid" size="sm">
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
            backgroundColor: colors.border,
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
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.md }}>
          {reward ? (
            <Text style={{ color: accent, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>Reward {reward}</Text>
          ) : null}
          {contact ? (
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>☎ {contact}</Text>
          ) : null}
        </View>
      ) : null}

      {onReportSighting || onShare ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
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
