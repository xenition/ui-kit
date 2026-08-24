import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Card, Badge } from '../primitives';
import { formatMoney, withAlpha } from './internal/format';
import type { CoverageItemProps } from './CoverageItem';

/** Drop-in replacement for {@link CoverageItem} — identical props, distinct design. */
export type CoverageItemV2Props = CoverageItemProps;

/**
 * CoverageItem, alternate design **V2** — a standalone card. An included /
 * excluded pill (glyph + text + color, never color-alone) sits top-right of the
 * coverage label and detail; the limit lives in its own tinted block below so
 * the benefit ceiling is easy to scan. Excluded coverage dims and strikes the
 * label and shows "Not covered". Same `CoverageItemProps` (integer cents via
 * `formatMoney`); drops in for `CoverageItem`. Token-pure.
 */
export function CoverageItemV2({
  label,
  included = true,
  limitCents,
  detail,
  currency = 'USD',
  formatMoney: format = formatMoney,
  style,
}: CoverageItemV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const limit = included && limitCents != null ? format(Math.max(0, Math.trunc(limitCents)), currency) : null;

  return (
    <Card variant="elevated" padding="md" radius="md" style={style}>
      <View style={{ gap: tokens.spacing.sm }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.md }}>
          <View style={{ flex: 1, gap: 2 }}>
            <Text
              numberOfLines={2}
              style={{
                color: included ? colors.onSurface : colors.muted,
                fontSize: tokens.typography.scale.base,
                fontWeight: '700',
                textDecorationLine: included ? 'none' : 'line-through',
              }}
            >
              {label}
            </Text>
            {detail != null ? (
              <Text numberOfLines={3} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                {detail}
              </Text>
            ) : null}
          </View>
          <Badge tone={included ? 'success' : 'neutral'} variant="soft" size="sm">
            {included ? '✓ Included' : '✕ Excluded'}
          </Badge>
        </View>

        <View
          style={{
            borderRadius: tokens.radius.sm,
            backgroundColor: included ? withAlpha(colors.success, 0.08) : withAlpha(colors.muted, 0.08),
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
            {included ? 'Coverage limit' : 'Status'}
          </Text>
          <Text
            style={{
              color: included ? colors.onSurface : colors.muted,
              fontSize: tokens.typography.scale.sm,
              fontWeight: '700',
            }}
          >
            {included ? limit ?? 'No limit' : 'Not covered'}
          </Text>
        </View>
      </View>
    </Card>
  );
}
