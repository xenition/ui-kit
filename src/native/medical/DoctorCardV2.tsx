import * as React from 'react';
import { Animated, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar, Rating, Button, Badge } from '../primitives';
import { useEnter } from '../primitives/internal/motion';
import { shadow } from '../primitives/internal/elevation';
import type { DoctorCardProps, DoctorAvailability } from './DoctorCard';

/** Same public contract as {@link DoctorCard} — a drop-in alternate design. */
export type DoctorCardV2Props = DoctorCardProps;

const AVAIL_META: Record<
  DoctorAvailability,
  { label: string; tone: 'success' | 'warn' | 'neutral'; glyph: string }
> = {
  available: { label: 'Available today', tone: 'success', glyph: '●' },
  busy: { label: 'Limited slots', tone: 'warn', glyph: '◐' },
  off: { label: 'Not accepting', tone: 'neutral', glyph: '○' },
};

/**
 * DoctorCard, redesigned (v2): a **centered profile card**. A large ringed
 * avatar is the hero, with the name, specialty, and credential line stacked and
 * centered beneath it; the star rating and an availability badge (glyph + label)
 * sit centered above a full-width "Book" CTA. Lifted with a shadow and mounted
 * with a fade-in — distinct at a glance from v1's left-aligned row. Same props,
 * token-pure.
 */
export function DoctorCardV2({
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
}: DoctorCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();
  const meta = availability ? AVAIL_META[availability] : undefined;

  return (
    <Animated.View
      accessibilityLabel={`${name}, ${specialty}${rating != null ? `, rated ${rating} out of 5` : ''}${meta ? `, ${meta.label}` : ''}`}
      style={[
        {
          backgroundColor: colors.surface,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.md,
          alignItems: 'center',
          opacity: enter.opacity,
          transform: enter.transform,
          ...shadow('md', tokens),
        },
        style,
      ]}
    >
      <Avatar src={avatar} name={name} size="xl" ring />

      <View style={{ alignItems: 'center', gap: 2 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
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

      {meta ? (
        <Badge tone={meta.tone} variant="soft" size="sm">
          {`${meta.glyph} ${meta.label}`}
        </Badge>
      ) : null}

      {onBook ? (
        <View style={{ alignSelf: 'stretch' }}>
          <Button variant="primary" onPress={onBook}>
            {bookLabel}
          </Button>
        </View>
      ) : null}
    </Animated.View>
  );
}
