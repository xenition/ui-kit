import * as React from 'react';
import { Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { GradientSurface } from './internal/GradientSurface';
import { listingGradient, listingInk, listingInkSoft, listingTile, listingBorder } from './internal/listing';

export interface AgentProfileHeaderProps {
  /** Agent's full name (the headline). */
  name: string;
  /** Role line under the name (e.g. "Listing Agent"). */
  title?: string;
  /** Brokerage / agency name. */
  agency?: string;
  /** Avatar photo URI. Omit for a token-styled monogram fallback. */
  photoUrl?: string;
  /** Average rating, 0–5, rendered as stars. Omit to hide the rating row. */
  rating?: number;
  /** Headline stats as frosted tiles (e.g. sales, years, reviews). */
  stats?: readonly { label: string; value: string }[];
  /** Shows a verified check next to the name when true. */
  verified?: boolean;
  /** Fires on the primary Call CTA. Hidden when unset. */
  onCall?: () => void;
  /** Fires on the Message CTA. Hidden when unset. */
  onMessage?: () => void;
  style?: StyleProp<ViewStyle>;
}

function stars(rating: number): string {
  const clamped = Math.max(0, Math.min(5, rating));
  const full = Math.round(clamped);
  return '★★★★★'.slice(0, full) + '☆☆☆☆☆'.slice(0, 5 - full);
}

/**
 * AgentProfileHeader — a brand-gradient agent hero for the real-estate V4
 * "listing" line. The avatar (photo or token monogram), near-white name +
 * agency, an optional star rating, and headline stats as frosted tiles sit on the
 * brand gradient (`listingGradient`); near-white Call / Message CTAs anchor the
 * bottom. Presentational — shaped data + callbacks, nothing fetches. Token-only
 * colors via `useXenitionTheme()` + the listing ramp helpers, dark-mode safe.
 */
export function AgentProfileHeader({
  name,
  title,
  agency,
  photoUrl,
  rating,
  stats,
  verified = false,
  onCall,
  onMessage,
  style,
}: AgentProfileHeaderProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const ink = listingInk(r);
  const inkSoft = listingInkSoft(r);
  const monogram = name.trim().charAt(0).toUpperCase() || '?';
  const hasRating = typeof rating === 'number';
  const ratingValue = hasRating ? Math.max(0, Math.min(5, rating)).toFixed(1) : '';

  return (
    <View style={[{ borderRadius: tokens.radius.lg }, style]}>
      <GradientSurface
        colors={listingGradient(r)}
        style={{ borderRadius: tokens.radius.lg, padding: tokens.spacing.lg, overflow: 'hidden', gap: tokens.spacing.lg }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
          {photoUrl ? (
            <Image
              source={{ uri: photoUrl }}
              accessibilityLabel={name}
              style={{ width: 64, height: 64, borderRadius: tokens.radius.full, borderWidth: 1, borderColor: listingBorder(r) }}
            />
          ) : (
            <View
              accessibilityRole="image"
              accessibilityLabel={name}
              style={{
                width: 64,
                height: 64,
                borderRadius: tokens.radius.full,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: listingTile(r),
                borderWidth: 1,
                borderColor: listingBorder(r),
              }}
            >
              <Text allowFontScaling={false} style={{ color: ink, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }}>
                {monogram}
              </Text>
            </View>
          )}
          <View style={{ flex: 1, minWidth: 0 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
              <Text numberOfLines={1} style={{ color: ink, fontSize: tokens.typography.scale.xl, fontWeight: '800', flexShrink: 1 }}>
                {name}
              </Text>
              {verified ? (
                <Text accessibilityLabel="Verified" allowFontScaling={false} style={{ color: ink, fontSize: tokens.typography.scale.sm }}>
                  ✓
                </Text>
              ) : null}
            </View>
            {title ? (
              <Text numberOfLines={1} style={{ color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600', marginTop: 2 }}>
                {title}
              </Text>
            ) : null}
            {agency ? (
              <Text numberOfLines={1} style={{ color: inkSoft, fontSize: tokens.typography.scale.sm }}>
                {agency}
              </Text>
            ) : null}
            {hasRating ? (
              <Text
                accessibilityLabel={`Rated ${ratingValue} out of 5`}
                style={{ color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '600', marginTop: 2 }}
              >
                {`${stars(rating)} ${ratingValue}`}
              </Text>
            ) : null}
          </View>
        </View>

        {stats && stats.length > 0 ? (
          <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
            {stats.map((s) => (
              <View
                key={s.label}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  gap: tokens.spacing.xs,
                  paddingHorizontal: tokens.spacing.sm,
                  paddingVertical: tokens.spacing.md,
                  borderRadius: tokens.radius.md,
                  backgroundColor: listingTile(r),
                  borderWidth: 1,
                  borderColor: listingBorder(r),
                }}
              >
                <Text style={{ color: ink, fontSize: tokens.typography.scale.lg, fontWeight: '800' }}>{s.value}</Text>
                <Text numberOfLines={1} style={{ color: inkSoft, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
                  {s.label}
                </Text>
              </View>
            ))}
          </View>
        ) : null}

        {onCall || onMessage ? (
          <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
            {onCall ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Call ${name}`}
                onPress={onCall}
                style={({ pressed }) => ({
                  flex: 1,
                  minHeight: 44,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: tokens.spacing.xs,
                  paddingVertical: tokens.spacing.md,
                  borderRadius: tokens.radius.md,
                  backgroundColor: ink,
                  opacity: pressed ? 0.9 : 1,
                })}
              >
                <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.base }}>
                  📞
                </Text>
                <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>Call</Text>
              </Pressable>
            ) : null}
            {onMessage ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Message ${name}`}
                onPress={onMessage}
                style={({ pressed }) => ({
                  flex: 1,
                  minHeight: 44,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: tokens.spacing.xs,
                  paddingVertical: tokens.spacing.md,
                  borderRadius: tokens.radius.md,
                  borderWidth: 1,
                  borderColor: listingBorder(r),
                  opacity: pressed ? 0.85 : 1,
                })}
              >
                <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.base }}>
                  💬
                </Text>
                <Text style={{ color: ink, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>Message</Text>
              </Pressable>
            ) : null}
          </View>
        ) : null}
      </GradientSurface>
    </View>
  );
}
