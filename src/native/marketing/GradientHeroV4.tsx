import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Eyebrow } from '../primitives/Eyebrow';
import { Gradient } from '../commerce/internal/Gradient';
import type { GradientHeroProps } from './GradientHero';

/** Drop-in for {@link GradientHeroProps} — same props, the V4 "showcase" design. */
export type GradientHeroV4Props = GradientHeroProps;

/**
 * GradientHero — **V4** "showcase" design (native mirror of the web V4). The
 * bold, conversion-forward landing moment: a vibrant primary→accent brand
 * gradient ground (via the shared `expo-linear-gradient` wrapper — the
 * CTABannerV4 technique) carrying a soft eyebrow, an extra-bold tight-tracked
 * near-white headline, generous whitespace, and a call-to-action row. Honors
 * every prop of {@link GradientHeroProps} (`eyebrow`/`title`/`subtitle`/
 * `actions`/`media`/`align`); token-only colors via `useXenitionTheme()`
 * (`tokens.ramps.primary` near-white ink on the saturated ground), dark-mode
 * safe.
 */
export function GradientHeroV4({
  eyebrow,
  title,
  subtitle,
  actions,
  media,
  align = 'center',
  style,
}: GradientHeroV4Props): React.ReactElement {
  const { tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const centered = align === 'center';
  const ink = r.primary[50];
  const inkSoft = r.primary[100];

  return (
    <View
      style={[
        {
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: r.primary[600],
          borderRadius: tokens.radius.lg,
          paddingVertical: tokens.spacing['2xl'],
          paddingHorizontal: tokens.spacing.lg,
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
      <View
        style={{
          gap: tokens.spacing.lg,
          alignItems: centered ? 'center' : 'flex-start',
        }}
      >
        {eyebrow !== undefined && eyebrow !== null ? (
          typeof eyebrow === 'string' ? (
            <Eyebrow tone="primary" align={centered ? 'center' : 'start'} style={{ color: ink }}>
              {eyebrow}
            </Eyebrow>
          ) : (
            eyebrow
          )
        ) : null}

        {typeof title === 'string' ? (
          <Text
            style={{
              color: ink,
              fontSize: tokens.typography.scale['3xl'],
              fontWeight: '800',
              letterSpacing: -0.5,
              textAlign: centered ? 'center' : 'left',
            }}
          >
            {title}
          </Text>
        ) : (
          title
        )}

        {subtitle !== undefined && subtitle !== null ? (
          typeof subtitle === 'string' ? (
            <Text
              style={{
                color: inkSoft,
                fontSize: tokens.typography.scale.lg,
                textAlign: centered ? 'center' : 'left',
              }}
            >
              {subtitle}
            </Text>
          ) : (
            subtitle
          )
        ) : null}

        {actions !== undefined && actions !== null ? (
          <View
            style={{
              marginTop: tokens.spacing.sm,
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: tokens.spacing.sm,
              justifyContent: centered ? 'center' : 'flex-start',
            }}
          >
            {actions}
          </View>
        ) : null}

        {media !== undefined && media !== null ? (
          <View style={{ marginTop: tokens.spacing.xl, width: '100%' }}>{media}</View>
        ) : null}
      </View>
    </View>
  );
}
