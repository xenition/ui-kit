import * as React from 'react';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Gradient } from '../commerce/internal/Gradient';
import type { CTABannerProps } from './CTABanner';

/** Drop-in for {@link CTABannerProps} — same props, the V4 "showcase" design. */
export type CTABannerV4Props = CTABannerProps;

/**
 * CTABanner — **V4** "showcase" design (native mirror of the web V4). The bold,
 * conversion-forward closing band: a vibrant primary→accent brand gradient
 * ground (via the shared `expo-linear-gradient` wrapper) carrying a big
 * extra-bold near-white headline, a soft supporting line, and a centered
 * call-to-action. Same props/behavior as {@link CTABannerProps}; token-only
 * colors via `useXenitionTheme()` (`tokens.ramps.primary` near-white ink on the
 * saturated ground), dark-mode safe.
 */
export function CTABannerV4({
  title,
  description,
  subtitle,
  action,
  style,
}: CTABannerV4Props): React.ReactElement {
  const { tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const body = description ?? subtitle;
  const ink = r.primary[50];
  const inkSoft = r.primary[100];

  return (
    <View
      style={[
        {
          position: 'relative',
          overflow: 'hidden',
          borderRadius: tokens.radius.lg,
          paddingVertical: tokens.spacing['2xl'],
          paddingHorizontal: tokens.spacing.xl,
          backgroundColor: r.primary[600],
        },
        style,
      ]}
    >
      <Gradient
        colors={[r.primary[500], r.primary[600], r.accent[500]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={{ gap: tokens.spacing.md, alignItems: 'center' }}>
        {typeof title === 'string' ? (
          <Text style={{ color: ink, fontSize: tokens.typography.scale['3xl'], fontWeight: '800', letterSpacing: -0.5, textAlign: 'center' }}>
            {title}
          </Text>
        ) : (
          title
        )}

        {body !== undefined && body !== null ? (
          typeof body === 'string' ? (
            <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.lg, textAlign: 'center' }}>{body}</Text>
          ) : (
            body
          )
        ) : null}

        {action !== undefined && action !== null ? (
          <View style={{ marginTop: tokens.spacing.sm, flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm, justifyContent: 'center' }}>
            {action}
          </View>
        ) : null}
      </View>
    </View>
  );
}
