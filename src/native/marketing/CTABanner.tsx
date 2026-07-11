import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { Gradient } from '../commerce/internal/Gradient';

export interface CTABannerProps {
  /** Banner headline. */
  title: React.ReactNode;
  /**
   * Supporting copy under the title. (The web `CTABanner` names this slot
   * `subtitle`; native uses `description` per the section spec, and accepts
   * `subtitle` as an alias for full web prop parity — `description` wins.)
   */
  description?: React.ReactNode;
  /** Alias of {@link CTABannerProps.description} for web parity. */
  subtitle?: React.ReactNode;
  /** Call-to-action slot — rendered as-is. */
  action?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Closing call-to-action band — the native mirror of the web `CTABanner`.
 *
 * The web version reuses the animated `AuroraBackground`; native **simplifies
 * to a static primary→accent linear-gradient tint** (via the shared
 * `expo-linear-gradient` wrapper) over a bordered rounded panel — no blur,
 * grain, or pattern. The web `variant`/`grain`/`pattern` props are dropped as
 * aurora/DOM-specific. Always centered, matching the web layout. Token-only.
 */
export function CTABanner({
  title,
  description,
  subtitle,
  action,
  style,
}: CTABannerProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const body = description ?? subtitle;

  return (
    <View
      style={[
        {
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: tokens.radius.lg,
          paddingVertical: tokens.spacing['2xl'],
          paddingHorizontal: tokens.spacing.xl,
        },
        style,
      ]}
    >
      <Gradient
        colors={[withAlpha(colors.primary, 0.22), withAlpha(colors.accent, 0.16)]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={{ gap: tokens.spacing.md, alignItems: 'center' }}>
        {typeof title === 'string' ? (
          <Text
            style={{
              color: colors.onSurface,
              fontSize: tokens.typography.scale['3xl'],
              fontWeight: '700',
              textAlign: 'center',
            }}
          >
            {title}
          </Text>
        ) : (
          title
        )}

        {body !== undefined && body !== null ? (
          typeof body === 'string' ? (
            <Text
              style={{
                color: colors.muted,
                fontSize: tokens.typography.scale.lg,
                textAlign: 'center',
              }}
            >
              {body}
            </Text>
          ) : (
            body
          )
        ) : null}

        {action !== undefined && action !== null ? (
          <View
            style={{
              marginTop: tokens.spacing.sm,
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: tokens.spacing.sm,
              justifyContent: 'center',
            }}
          >
            {action}
          </View>
        ) : null}
      </View>
    </View>
  );
}
