import * as React from 'react';
import { Image, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface LocationHour {
  /** Day or range label (e.g. "Mon–Fri"). */
  label: string;
  /** Opening hours (e.g. "9:00–17:00" or "Closed"). */
  value: string;
}

export interface LocationBlockProps {
  /** Business or venue name. */
  name?: string;
  /** Street address. */
  address: string;
  /** Opening-hours rows. */
  hours?: LocationHour[];
  /** Phone number (display only on native). */
  phone?: string;
  /** Email (display only on native). */
  email?: string;
  /**
   * Static map image URL. The web embeds an interactive map `<iframe>`; native
   * shows this static image if provided, otherwise a token-styled placeholder.
   */
  mapImageUri?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Contact/location section — the native mirror of the web `LocationBlock`:
 * name, address, opening-hours rows, and contact lines above a map. The web
 * two-column desktop grid is **stacked vertically** on native (phones are
 * narrow). The web embeds an interactive map `<iframe>`; native has no
 * interactive map, so it renders a **static `mapImageUri` image** or a
 * token-styled placeholder. Phone/email are shown as plain text rather than
 * `tel:`/`mailto:` links. Token-only.
 */
export function LocationBlock({
  name,
  address,
  hours,
  phone,
  email,
  mapImageUri,
  style,
}: LocationBlockProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  return (
    <View testID="xen-location-block" style={[{ gap: tokens.spacing.xl }, style]}>
      <View style={{ gap: tokens.spacing.md }}>
        {name ? (
          <Text
            style={{
              color: colors.onSurface,
              fontSize: tokens.typography.scale['2xl'],
              fontWeight: '700',
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
                  paddingVertical: tokens.spacing.xs,
                  borderBottomWidth: i === hours.length - 1 ? 0 : 1,
                  borderBottomColor: colors.border,
                }}
              >
                <Text
                  style={{
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: '500',
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
              <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.sm }}>
                {phone}
              </Text>
            ) : null}
            {email ? (
              <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.sm }}>
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
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: tokens.ramps.neutral[100],
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
