import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge, Button } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { VaccineRecordProps, VaccineStatus } from './VaccineRecord';

/** Drop-in for {@link VaccineRecordProps} — same props, the V4 "companion" design. */
export type VaccineRecordV4Props = VaccineRecordProps;

interface StatusMeta {
  label: string;
  tone: 'success' | 'warn' | 'danger' | 'neutral';
  glyph: string;
}

const STATUS_META: Record<VaccineStatus, StatusMeta> = {
  current: { label: 'Up to date', tone: 'success', glyph: '✓' },
  'due-soon': { label: 'Due soon', tone: 'warn', glyph: '⏳' },
  overdue: { label: 'Overdue', tone: 'danger', glyph: '⚠' },
  unknown: { label: 'No record', tone: 'neutral', glyph: '?' },
};

/**
 * VaccineRecord — **V4** "companion" design. The warm, friendly take on an
 * immunization line item: an elevated rounded card with a soft shadow, the status
 * glyph in a soft-primary tinted well, a bold vaccine name, a labelled status
 * Badge, the given/next-due dates and vet/lot meta shown as small soft-primary
 * chips, and a rounded "Book booster" CTA for anything not current. Same
 * props/behavior as {@link VaccineRecordProps}; every `status` reads via a glyph +
 * labelled Badge (never color alone). Token-only colors via `useXenitionTheme()`.
 * Web/native parity.
 */
export function VaccineRecordV4({
  name,
  status,
  administered,
  nextDue,
  administeredBy,
  lotNumber,
  renewLabel = 'Book booster',
  onRenew,
  style,
}: VaccineRecordV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = STATUS_META[status];
  const showRenew = onRenew != null && status !== 'current';
  const footer = [administeredBy, lotNumber ? `Lot ${lotNumber}` : null].filter(Boolean).join(' · ');

  return (
    <View
      accessibilityLabel={`${name} vaccine, ${meta.label}${nextDue ? `, next due ${nextDue}` : ''}`}
      style={[
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.sm,
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
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: tokens.radius.full,
            backgroundColor: withAlpha(colors.primary, 0.1),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xl }}>
            {meta.glyph}
          </Text>
        </View>
        <Text numberOfLines={1} style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {name}
        </Text>
        <Badge tone={meta.tone} variant="soft" size="sm">
          {`${meta.glyph} ${meta.label}`}
        </Badge>
      </View>

      {administered || nextDue ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacing.sm }}>
          {administered ? (
            <View style={{ backgroundColor: withAlpha(colors.primary, 0.1), borderRadius: tokens.radius.full, paddingHorizontal: tokens.spacing.sm, paddingVertical: 2 }}>
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>Given · {administered}</Text>
            </View>
          ) : null}
          {nextDue ? (
            <View style={{ backgroundColor: withAlpha(colors.primary, 0.1), borderRadius: tokens.radius.full, paddingHorizontal: tokens.spacing.sm, paddingVertical: 2 }}>
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>Next due · {nextDue}</Text>
            </View>
          ) : null}
        </View>
      ) : null}

      {footer ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{footer}</Text>
      ) : null}

      {showRenew ? (
        <Button variant="soft" size="sm" tone={status === 'overdue' ? 'danger' : 'default'} onPress={onRenew}>
          {renewLabel}
        </Button>
      ) : null}
    </View>
  );
}
