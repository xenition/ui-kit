import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar, Rating, Button, Badge } from '../primitives';

export type DoctorAvailability = 'available' | 'busy' | 'off';

const AVAIL_META: Record<
  DoctorAvailability,
  { label: string; tone: 'success' | 'warn' | 'neutral'; glyph: string }
> = {
  available: { label: 'Available today', tone: 'success', glyph: '●' },
  busy: { label: 'Limited slots', tone: 'warn', glyph: '◐' },
  off: { label: 'Not accepting', tone: 'neutral', glyph: '○' },
};

export interface DoctorCardProps {
  /** Clinician name. */
  name: string;
  /** Specialty, e.g. "Dermatology". */
  specialty: string;
  /** Optional avatar image URL. */
  avatar?: string;
  /** Average patient rating (0–5). */
  rating?: number;
  /** Number of reviews backing the rating. */
  reviewCount?: number;
  /** Years of experience or a short credential line. */
  credentials?: string;
  /** Booking availability; drives the badge (glyph + label + tone). */
  availability?: DoctorAvailability;
  /** Fires when the book CTA is pressed. */
  onBook?: () => void;
  /** Overrides the book CTA label. */
  bookLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A clinician profile card for a provider directory: avatar, name, specialty,
 * a star rating with review count, an optional credential line, an availability
 * badge (glyph + label + tone), and a "Book" CTA. Informational UI only — not a
 * medical device. Token-only colors.
 */
export function DoctorCard({
  name,
  specialty,
  avatar,
  rating,
  reviewCount,
  credentials,
  availability,
  onBook,
  bookLabel = 'Book',
  style,
}: DoctorCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = availability ? AVAIL_META[availability] : undefined;

  return (
    <View
      accessibilityLabel={`${name}, ${specialty}${rating != null ? `, rated ${rating} out of 5` : ''}${meta ? `, ${meta.label}` : ''}`}
      style={[
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.md,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <Avatar src={avatar} name={name} size="lg" />
        <View style={{ flex: 1, gap: 3 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {name}
          </Text>
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {specialty}
          </Text>
          {credentials ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {credentials}
            </Text>
          ) : null}
        </View>
        {meta ? (
          <Badge tone={meta.tone} variant="soft" size="sm">
            {`${meta.glyph} ${meta.label}`}
          </Badge>
        ) : null}
      </View>

      {rating != null ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <Rating value={rating} />
          {reviewCount != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {rating.toFixed(1)} ({reviewCount})
            </Text>
          ) : null}
        </View>
      ) : null}

      {onBook ? (
        <Button variant="primary" onPress={onBook}>
          {bookLabel}
        </Button>
      ) : null}
    </View>
  );
}
