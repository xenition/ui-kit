import * as React from 'react';
import { Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar, Rating, Button, Badge } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { DoctorCardProps, DoctorAvailability } from './DoctorCard';

/** V4 layout choices for the "clinic" design. */
export type DoctorCardLayout = 'full' | 'compact';

/** Drop-in for {@link DoctorCardProps} — same props, the V4 "clinic" design. */
export interface DoctorCardV4Props extends DoctorCardProps {
  /** V4 layout: `full` (card, default) or `compact` (dense single row). */
  variant?: DoctorCardLayout;
}

const AVAIL_META: Record<
  DoctorAvailability,
  { label: string; tone: 'success' | 'warn' | 'neutral'; glyph: string }
> = {
  available: { label: 'Available today', tone: 'success', glyph: '●' },
  busy: { label: 'Limited slots', tone: 'warn', glyph: '◐' },
  off: { label: 'Not accepting', tone: 'neutral', glyph: '○' },
};

/**
 * DoctorCard — **V4** "clinic" design. The calm, clinical take on a clinician
 * profile: an elevated rounded card with a soft shadow, the avatar + name +
 * specialty, a star rating with review count, an optional credential line, a
 * labelled availability badge (glyph + label + tone, never color alone), and a
 * "Book" CTA. Honors the V4 `variant` — `full` (card, default) and `compact`
 * (a dense single row) — identical props/behavior to {@link DoctorCardProps}.
 * Token-only colors via `useXenitionTheme()`. Informational UI only — not a
 * medical device.
 */
export function DoctorCardV4({
  name,
  specialty,
  avatar,
  rating,
  reviewCount,
  credentials,
  availability,
  onBook,
  bookLabel = 'Book',
  variant = 'full',
  style,
}: DoctorCardV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = availability ? AVAIL_META[availability] : undefined;

  const shell: ViewStyle = {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  };

  const a11y = `${name}, ${specialty}${rating != null ? `, rated ${rating} out of 5` : ''}${meta ? `, ${meta.label}` : ''}`;

  // ── compact: dense single row ──
  if (variant === 'compact') {
    return (
      <View accessibilityLabel={a11y} style={[shell, { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, padding: tokens.spacing.sm }, style]}>
        <Avatar src={avatar} name={name} size="sm" />
        <View style={{ flex: 1, gap: 2 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{name}</Text>
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {specialty}
            {rating != null ? ` · ★ ${rating.toFixed(1)}` : ''}
          </Text>
        </View>
        {meta ? (
          <Badge tone={meta.tone} variant="soft" size="sm">
            {`${meta.glyph} ${meta.label}`}
          </Badge>
        ) : null}
      </View>
    );
  }

  return (
    <View accessibilityLabel={a11y} style={[shell, { padding: tokens.spacing.lg, gap: tokens.spacing.md }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <Avatar src={avatar} name={name} size="lg" />
        <View style={{ flex: 1, gap: 3 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{name}</Text>
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{specialty}</Text>
          {credentials ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{credentials}</Text>
          ) : null}
        </View>
        {meta ? (
          <Badge tone={meta.tone} variant="soft" size="sm">
            {`${meta.glyph} ${meta.label}`}
          </Badge>
        ) : null}
      </View>

      {rating != null ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, backgroundColor: withAlpha(colors.primary, 0.1), borderRadius: tokens.radius.md, paddingHorizontal: tokens.spacing.sm, paddingVertical: tokens.spacing.xs }}>
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
