import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import type { LocationBlockProps } from './LocationBlock';

/** Drop-in for {@link LocationBlockProps} — same props, the V4 "showcase" design. */
export type LocationBlockV4Props = LocationBlockProps;

/**
 * LocationBlock — **V4** "showcase" design (native mirror of the web V4). An
 * elevated contact card: the venue `name`, `address`, an opening-`hours` list,
 * and `phone`/`email` lines seated in a clean `colors.card` surface with a soft
 * border and a subtle shadow, above the map slot. The map is a **static
 * `mapImageUri` image** when provided, otherwise a **soft-primary well**
 * placeholder carrying the address (native has no interactive `<iframe>`). NOT a
 * brand-gradient surface — refined and elevated. Same props/behavior as
 * {@link LocationBlockProps}; token-only colors via `useXenitionTheme()`,
 * dark-mode safe.
 */
export function LocationBlockV4({
  name,
  address,
  hours,
  phone,
  email,
  mapImageUri,
  style,
}: LocationBlockV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const well = withAlpha(colors.primary, 0.06);

  return (
    <View
      testID="xen-location-block"
      style={[
        {
          gap: tokens.spacing.xl,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.card,
          padding: tokens.spacing.lg,
          shadowColor: colors.onSurface,
          shadowOpacity: 0.06,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
          elevation: 2,
        },
        style,
      ]}
    >
      <View style={{ gap: tokens.spacing.md }}>
        {name ? (
          <Text
            style={{
              color: colors.onSurface,
              fontSize: tokens.typography.scale['2xl'],
              fontWeight: '800',
              letterSpacing: -0.5,
            }}
          >
            {name}
          </Text>
        ) : null}

        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base }}>
          {address}
        </Text>

        {hours && hours.length > 0 ? (
          <View style={{ gap: 0 }}>
            {hours.map((row, i) => (
              <View
                key={i}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: tokens.spacing.sm,
                  borderBottomWidth: i === hours.length - 1 ? 0 : 1,
                  borderBottomColor: colors.border,
                }}
              >
                <Text
                  style={{
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: '600',
                  }}
                >
                  {row.label}
                </Text>
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
                  {row.value}
                </Text>
              </View>
            ))}
          </View>
        ) : null}

        {phone || email ? (
          <View style={{ gap: tokens.spacing.xs }}>
            {phone ? (
              <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '500' }}>
                {phone}
              </Text>
            ) : null}
            {email ? (
              <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '500' }}>
                {email}
              </Text>
            ) : null}
          </View>
        ) : null}
      </View>

      <View
        style={{
          aspectRatio: 16 / 9,
          width: '100%',
          overflow: 'hidden',
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: well,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {mapImageUri ? (
          <Image
            source={{ uri: mapImageUri }}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
        ) : (
          <Text
            style={{
              color: colors.muted,
              fontSize: tokens.typography.scale.sm,
              textAlign: 'center',
              paddingHorizontal: tokens.spacing.md,
            }}
          >
            {address}
          </Text>
        )}
      </View>
    </View>
  );
}
