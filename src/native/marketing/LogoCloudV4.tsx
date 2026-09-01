import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { LogoCloudProps } from './LogoCloud';

/** Drop-in for {@link LogoCloudProps} — same props, the V4 "showcase" design. */
export type LogoCloudV4Props = LogoCloudProps;

/**
 * LogoCloud — **V4** "showcase" design (native mirror of the web V4). A tidy,
 * refined logo strip: an optional muted "Trusted by…" `label` above a soft,
 * evenly-spaced wrapped row of `logos` in a muted tone (string logos render as
 * muted text; nodes render as-is). Native has no hover and no CSS marquee, so
 * the web's optional drift degrades to a calm static strip — the same visual
 * resting state the reduced-motion web path shows. NOT a brand-gradient
 * surface — clean and understated. Same props/behavior as
 * {@link LogoCloudProps}; token-only colors via `useXenitionTheme()`
 * (`colors.muted`), dark-mode safe.
 */
export function LogoCloudV4({ logos, label, style }: LogoCloudV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  return (
    <View testID="xen-logo-cloud" style={[{ alignItems: 'center', gap: tokens.spacing.lg }, style]}>
      {label !== undefined ? (
        <Text
          style={{
            color: colors.muted,
            fontSize: tokens.typography.scale.sm,
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: 3,
          }}
        >
          {label}
        </Text>
      ) : null}
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: tokens.spacing.xl,
        }}
      >
        {logos.map((logo, i) => (
          <View key={i} testID="xen-logo" style={{ opacity: 0.7 }}>
            {typeof logo === 'string' ? (
              <Text
                style={{
                  color: colors.muted,
                  fontSize: tokens.typography.scale.lg,
                  fontWeight: '600',
                }}
              >
                {logo}
              </Text>
            ) : (
              logo
            )}
          </View>
        ))}
      </View>
    </View>
  );
}
