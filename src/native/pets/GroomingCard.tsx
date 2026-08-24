import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Badge, Button } from '../primitives';

export type GroomingService = 'bath' | 'haircut' | 'nails' | 'teeth' | 'deshedding' | 'full';
export type GroomingStatus = 'scheduled' | 'due' | 'overdue' | 'done';

interface ServiceMeta {
  glyph: string;
  label: string;
}

const SERVICE_META: Record<GroomingService, ServiceMeta> = {
  bath: { glyph: '🛁', label: 'Bath' },
  haircut: { glyph: '✂️', label: 'Haircut' },
  nails: { glyph: '💅', label: 'Nail trim' },
  teeth: { glyph: '🦷', label: 'Teeth cleaning' },
  deshedding: { glyph: '🧹', label: 'De-shedding' },
  full: { glyph: '🐩', label: 'Full groom' },
};

const STATUS_META: Record<GroomingStatus, { label: string; tone: 'primary' | 'warn' | 'danger' | 'success'; slot: keyof SemanticColors }> = {
  scheduled: { label: 'Scheduled', tone: 'primary', slot: 'primary' },
  due: { label: 'Due', tone: 'warn', slot: 'warn' },
  overdue: { label: 'Overdue', tone: 'danger', slot: 'danger' },
  done: { label: 'Done', tone: 'success', slot: 'success' },
};

export interface GroomingCardProps {
  /** Grooming service; drives icon + label. */
  service: GroomingService;
  /** Where it stands; drives the chip + accent. */
  status: GroomingStatus;
  /** Groomer / salon name. */
  groomer?: string;
  /** Last-done date (already formatted). */
  lastDone?: string;
  /** Next-due date (already formatted). */
  nextDue?: string;
  /** Price label, e.g. "$45". */
  price?: string;
  /** Book action label; hidden when done or no `onBook`. */
  bookLabel?: string;
  onBook?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A grooming service card: service icon + name, a status chip, the last-done and
 * next-due dates, optional groomer + price, and a "Book" action for anything not
 * yet done. Status reads via a labelled chip + left accent bar (never color
 * alone). Token-only colors.
 */
export function GroomingCard({
  service,
  status,
  groomer,
  lastDone,
  nextDue,
  price,
  bookLabel = 'Book',
  onBook,
  style,
}: GroomingCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = SERVICE_META[service];
  const statusMeta = STATUS_META[status];
  const showBook = onBook != null && status !== 'done';

  return (
    <View
      accessibilityLabel={`${meta.label}, ${statusMeta.label}${nextDue ? `, next due ${nextDue}` : ''}`}
      style={[
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderLeftColor: colors[statusMeta.slot],
          borderWidth: 1,
          borderLeftWidth: 4,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.md,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xl }}>
          {meta.glyph}
        </Text>
        <View style={{ flex: 1, gap: 2 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
            {meta.label}
          </Text>
          {groomer ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
              {groomer}
            </Text>
          ) : null}
        </View>
        <Badge tone={statusMeta.tone} variant="soft" size="sm">
          {statusMeta.label}
        </Badge>
      </View>

      {lastDone || nextDue ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.xl }}>
          {lastDone ? (
            <View style={{ gap: 2 }}>
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Last</Text>
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>{lastDone}</Text>
            </View>
          ) : null}
          {nextDue ? (
            <View style={{ gap: 2 }}>
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Next</Text>
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>{nextDue}</Text>
            </View>
          ) : null}
        </View>
      ) : null}

      {showBook ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
          {price ? (
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{price}</Text>
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
