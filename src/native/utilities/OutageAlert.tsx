import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Icon, Button } from '../primitives';
import { withAlpha } from './internal/format';
import { outageState, utilityKind, type OutageState, type UtilityKind } from './internal/status';

export type { OutageState };

export interface OutageAlertProps {
  /** Outage lifecycle — drives glyph + heading + tint (default `active`). */
  state?: OutageState;
  /** Optional affected utility line (adds its glyph/label to the heading). */
  kind?: UtilityKind;
  /** Affected area / description (e.g. "Downtown · ~1,200 customers"). */
  area?: string;
  /** Localized estimated-restoration string (shown for active/scheduled). */
  eta?: string;
  /** Longer message body. */
  message?: string;
  /** Details button label (default "View details"). Hidden when no `onDetails`. */
  detailsLabel?: string;
  /** Fires when the details action is pressed. */
  onDetails?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A prominent banner for a service outage / planned-maintenance event. Severity
 * is conveyed by **glyph + heading + a tint that traces to a `SemanticColors`
 * slot** (active → danger, scheduled → warn, resolved → success) — never color
 * alone. The estimated restoration is surfaced for active/scheduled events and
 * suppressed once resolved. An optional details `Button` renders only when
 * `onDetails` is supplied. Token-bound throughout.
 */
export function OutageAlert({
  state = 'active',
  kind,
  area,
  eta,
  message,
  detailsLabel = 'View details',
  onDetails,
  style,
}: OutageAlertProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const od = outageState(state);
  const kd = kind != null ? utilityKind(kind) : null;
  const tint = colors[od.color];
  const heading = kd != null ? `${kd.label} ${od.heading.toLowerCase()}` : od.heading;
  const showEta = eta != null && state !== 'resolved';

  return (
    <View
      accessibilityLabel={`${heading}${area != null ? `, ${area}` : ''}`}
      style={[
        {
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: tint,
          backgroundColor: withAlpha(tint, 0.1),
          padding: tokens.spacing.lg,
          gap: tokens.spacing.md,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.md }}>
        <Icon glyph={od.glyph} size="xl" accessibilityLabel={od.label} />
        <View style={{ flex: 1, gap: 2 }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {heading}
          </Text>
          {area != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{area}</Text>
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
