import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';

/** Connection health of the network. */
export type NetworkStatus = 'connected' | 'congested' | 'disconnected';

export type NetworkBadgeSize = 'sm' | 'md';

export interface NetworkBadgeProps {
  /** Chain / network name (e.g. `Ethereum`, `Polygon`, `Arbitrum`). */
  name: string;
  /**
   * Connection health. Drives the dot color AND a text/label hint so the
   * status is never conveyed by color alone.
   */
  status?: NetworkStatus;
  /**
   * Accent slot for the identity dot (default `primary`). Independent of
   * `status`, which only colors the health indicator.
   */
  tone?: keyof SemanticColors;
  /** Leading glyph/emoji for the chain (e.g. `'⟠'`). */
  glyph?: string;
  size?: NetworkBadgeSize;
  style?: StyleProp<ViewStyle>;
}

const STATUS_SLOT: Record<NetworkStatus, keyof SemanticColors> = {
  connected: 'success',
  congested: 'warn',
  disconnected: 'danger',
};

const STATUS_LABEL: Record<NetworkStatus, string> = {
  connected: 'Connected',
  congested: 'Congested',
  disconnected: 'Offline',
};

/**
 * Compact chain identifier pill — a dot (accented by `tone`) plus the network
 * name, and, when `status` is set, a second health dot with an accessible
 * label so the connection state is announced, not just colored. Token-bound;
 * the accent dot uses a subtle ramp-tinted background. No literal colors.
 */
export function NetworkBadge({
  name,
  status,
  tone = 'primary',
  glyph,
  size = 'md',
  style,
}: NetworkBadgeProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const textKey = size === 'sm' ? 'xs' : 'sm';
  const dotSize = size === 'sm' ? 6 : 8;
  const statusLabel = status ? STATUS_LABEL[status] : undefined;

  return (
    <View
      accessibilityRole="text"
      accessibilityLabel={statusLabel ? `${name}, ${statusLabel}` : name}
      style={[
        {
          alignSelf: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.xs,
          backgroundColor: tokens.ramps.neutral[100],
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: tokens.radius.full,
          paddingVertical: 2,
          paddingHorizontal: tokens.spacing.sm,
        },
        style,
      ]}
    >
      {glyph != null ? (
        <Text style={{ fontSize: tokens.typography.scale[textKey], color: colors[tone] }}>
          {glyph}
        </Text>
      ) : (
        <View
          style={{
            width: dotSize,
            height: dotSize,
            borderRadius: dotSize / 2,
            backgroundColor: colors[tone],
          }}
        />
      )}
      <Text
        numberOfLines={1}
        style={{ color: colors.onSurface, fontSize: tokens.typography.scale[textKey], fontWeight: '600' }}
      >
        {name}
      </Text>
      {status != null ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
          <View
            style={{
              width: dotSize,
              height: dotSize,
              borderRadius: dotSize / 2,
              backgroundColor: colors[STATUS_SLOT[status]],
            }}
          />
          <Text
            style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}
          >
            {statusLabel}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
