import * as React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { SemanticColors } from '../theme';
import { StatusDot } from '../primitives';

/** Presence states a user can be in. */
export type Presence = 'online' | 'away' | 'busy' | 'offline';

export interface PresenceDotProps {
  /** Current presence state (default `offline`). */
  status?: Presence;
  /** Dot diameter in px (default 10). */
  size?: number;
  /**
   * Draw a contrasting ring around the dot so it reads when overlaid on an
   * avatar (default true).
   */
  ring?: boolean;
  /**
   * Accessible name. When omitted a sensible default is derived from `status`
   * (e.g. "Online"). Pass an empty string to make it decorative.
   */
  label?: string;
  style?: StyleProp<ViewStyle>;
}

/** Maps a presence state to its semantic color slot. */
const TONE: Record<Presence, keyof SemanticColors> = {
  online: 'success',
  away: 'warn',
  busy: 'danger',
  offline: 'muted',
};

const DEFAULT_LABEL: Record<Presence, string> = {
  online: 'Online',
  away: 'Away',
  busy: 'Busy',
  offline: 'Offline',
};

/**
 * Small presence indicator for avatars and headers. Online pulses (reusing the
 * primitive `StatusDot` echo); the other states render a solid token-colored
 * dot. A `ring` in the surface color separates it from a busy avatar. No literal
 * colors — every color traces to a semantic token.
 */
export function PresenceDot({
  status = 'offline',
  size = 10,
  ring = true,
  label,
  style,
}: PresenceDotProps): React.ReactElement {
  const { colors } = useXenitionTheme();
  const tone = TONE[status];
  const a11yLabel = label ?? DEFAULT_LABEL[status];
  const decorative = a11yLabel === '';

  const ringPad = ring ? 2 : 0;
  const outer = size + ringPad * 2;

  return (
    <View
      accessible={!decorative}
      accessibilityRole={decorative ? undefined : 'image'}
      accessibilityLabel={decorative ? undefined : a11yLabel}
      importantForAccessibility={decorative ? 'no-hide-descendants' : 'yes'}
      style={[
        {
          width: outer,
          height: outer,
          borderRadius: outer / 2,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: ring ? colors.surface : 'transparent',
        },
        style,
      ]}
    >
      {status === 'online' ? (
        <StatusDot tone="success" size={size} pulse />
      ) : (
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: colors[tone],
          }}
        />
      )}
    </View>
  );
}
