import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge, Button } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { GroomingCardProps, GroomingService, GroomingStatus } from './GroomingCard';

/** V4 layout choices for the "companion" design. */
export type GroomingCardLayout = 'card' | 'compact';

/** Drop-in for {@link GroomingCardProps} — same props, the V4 "companion" design. */
export interface GroomingCardV4Props extends GroomingCardProps {
  /** V4 layout: `card` (default) or `compact` (dense single row). */
  variant?: GroomingCardLayout;
}

const SERVICE_META: Record<GroomingService, { glyph: string; label: string }> = {
  bath: { glyph: '🛁', label: 'Bath' },
  haircut: { glyph: '✂️', label: 'Haircut' },
  nails: { glyph: '💅', label: 'Nail trim' },
  teeth: { glyph: '🦷', label: 'Teeth cleaning' },
  deshedding: { glyph: '🧹', label: 'De-shedding' },
  full: { glyph: '🐩', label: 'Full groom' },
};

const STATUS_META: Record<GroomingStatus, { label: string; tone: 'primary' | 'warn' | 'danger' | 'success' }> = {
  scheduled: { label: 'Scheduled', tone: 'primary' },
  due: { label: 'Due', tone: 'warn' },
  overdue: { label: 'Overdue', tone: 'danger' },
  done: { label: 'Done', tone: 'success' },
};

/**
 * GroomingCard — **V4** "companion" design (native parity of the web V4). The
 * warm, friendly take on a grooming service: an elevated rounded card with a soft
 * shadow (no gradient — a clean surface), the service glyph in a soft-primary
 * tinted well, a bold service name, a muted groomer line, a labelled status Badge,
 * and the last/next dates shown as soft-primary chips beside a rounded book CTA.
 * "Book" stays for anything not yet done. Same props/behavior as
 * {@link GroomingCardProps}; service + status both read via glyph + labelled chip
 * (never color alone). Token-only colors via `useXenitionTheme()`.
 */
export function GroomingCardV4({
  service,
  status,
  groomer,
  lastDone,
  nextDue,
  price,
  bookLabel = 'Book',
  onBook,
  style,
  variant = 'card',
}: GroomingCardV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = SERVICE_META[service];
  const statusMeta = STATUS_META[status];
  const showBook = onBook != null && status !== 'done';
  const a11y = `${meta.label}, ${statusMeta.label}${nextDue ? `, next due ${nextDue}` : ''}`;

  const chipStyle = {
    backgroundColor: withAlpha(colors.primary, 0.1),
    borderRadius: tokens.radius.full,
    paddingHorizontal: tokens.spacing.sm,
    paddingVertical: 2,
  } as const;

  const glyphWell = (size: number, fontSize: number) => (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: tokens.radius.full,
        backgroundColor: withAlpha(colors.primary, 0.1),
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text allowFontScaling={false} style={{ fontSize }}>
        {meta.glyph}
      </Text>
    </View>
  );

  const statusBadge = (
    <Badge tone={statusMeta.tone} variant="soft" size="sm">
      {statusMeta.label}
    </Badge>
  );

  if (variant === 'compact') {
    return (
      <View
        accessibilityLabel={a11y}
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            minHeight: 44,
            gap: tokens.spacing.sm,
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.sm,
            shadowColor: colors.onSurface,
            shadowOpacity: 0.08,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 6 },
            elevation: 3,
          },
          style,
        ]}
      >
        {glyphWell(36, tokens.typography.scale.lg)}
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.sm }}>
          <Text numberOfLines={1} style={{ flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            {meta.label}
          </Text>
          {groomer ? (
            <Text numberOfLines={1} style={{ flexShrink: 1, color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              ✂️ {groomer}
            </Text>
          ) : null}
        </View>
        {statusBadge}
        {price ? (
          <View style={chipStyle}>
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{price}</Text>
          </View>
        ) : null}
      </View>
    );
  }

  return (
    <View
      accessibilityLabel={a11y}
      style={[
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.md,
          shadowColor: colors.onSurface,
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 3,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        {glyphWell(44, tokens.typography.scale.xl)}
        <View style={{ flex: 1, gap: 2 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
            {meta.label}
          </Text>
          {groomer ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
              ✂️ {groomer}
            </Text>
          ) : null}
        </View>
        {statusBadge}
      </View>

      {lastDone || nextDue ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }}>
          {lastDone ? (
            <View style={chipStyle}>
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>Last · {lastDone}</Text>
            </View>
          ) : null}
          {nextDue ? (
            <View style={chipStyle}>
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>Next · {nextDue}</Text>
            </View>
          ) : null}
        </View>
      ) : null}

      {showBook ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: tokens.spacing.sm,
            marginTop: tokens.spacing.xs,
          }}
        >
          {price ? (
            <View style={chipStyle}>
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{price}</Text>
            </View>
          ) : (
            <View />
          )}
          <Button variant="primary" size="sm" onPress={onBook}>
            {bookLabel}
          </Button>
        </View>
      ) : null}
    </View>
  );
}
