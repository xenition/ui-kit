import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Badge, Button } from '../primitives';

export type VaccineStatus = 'current' | 'due-soon' | 'overdue' | 'unknown';

interface StatusMeta {
  label: string;
  tone: 'success' | 'warn' | 'danger' | 'neutral';
  glyph: string;
  slot: keyof SemanticColors;
}

const STATUS_META: Record<VaccineStatus, StatusMeta> = {
  current: { label: 'Up to date', tone: 'success', glyph: '✓', slot: 'success' },
  'due-soon': { label: 'Due soon', tone: 'warn', glyph: '⏳', slot: 'warn' },
  overdue: { label: 'Overdue', tone: 'danger', glyph: '⚠', slot: 'danger' },
  unknown: { label: 'No record', tone: 'neutral', glyph: '?', slot: 'muted' },
};

export interface VaccineRecordProps {
  /** Vaccine name, e.g. "Rabies". */
  name: string;
  /** Where the record stands. Drives the status chip + accent. */
  status: VaccineStatus;
  /** Date administered (already formatted). */
  administered?: string;
  /** Next-due date (already formatted). */
  nextDue?: string;
  /** Administering vet / clinic. */
  administeredBy?: string;
  /** Batch / lot number. */
  lotNumber?: string;
  /** Label for the renew action; hidden when no `onRenew`. */
  renewLabel?: string;
  onRenew?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A single immunization line item: vaccine name with a status chip
 * (`current`/`due-soon`/`overdue`), the administered + next-due dates, and an
 * optional "Book booster" action for anything not current. Status is conveyed by
 * an icon + text label (never color alone). Token-only colors.
 */
export function VaccineRecord({
  name,
  status,
  administered,
  nextDue,
  administeredBy,
  lotNumber,
  renewLabel = 'Book booster',
  onRenew,
  style,
}: VaccineRecordProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = STATUS_META[status];
  const showRenew = onRenew != null && status !== 'current';

  return (
    <View
      accessibilityLabel={`${name} vaccine, ${meta.label}${nextDue ? `, next due ${nextDue}` : ''}`}
      style={[
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderLeftColor: colors[meta.slot],
          borderWidth: 1,
          borderLeftWidth: 4,
          borderRadius: tokens.radius.md,
          padding: tokens.spacing.md,
          gap: tokens.spacing.sm,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
        <Text numberOfLines={1} style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {name}
        </Text>
        <Badge tone={meta.tone} variant="soft" size="sm">
          {`${meta.glyph} ${meta.label}`}
        </Badge>
      </View>

      <View style={{ flexDirection: 'row', gap: tokens.spacing.xl }}>
        {administered ? (
          <View style={{ gap: 2 }}>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Given</Text>
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>{administered}</Text>
          </View>
        ) : null}
        {nextDue ? (
          <View style={{ gap: 2 }}>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Next due</Text>
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>{nextDue}</Text>
          </View>
        ) : null}
      </View>

      {administeredBy || lotNumber ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {[administeredBy, lotNumber ? `Lot ${lotNumber}` : null].filter(Boolean).join(' · ')}
        </Text>
      ) : null}

      {showRenew ? (
        <Button variant="soft" size="sm" tone={status === 'overdue' ? 'danger' : 'default'} onPress={onRenew}>
          {renewLabel}
        </Button>
      ) : null}
    </View>
  );
}
