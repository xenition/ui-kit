import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Card, Badge } from '../primitives';
import { formatMoney, withAlpha } from './internal/format';
import { claimStatus } from './internal/status';
import type { ClaimRowProps } from './ClaimRow';

/** Drop-in replacement for {@link ClaimRow} — identical props, distinct design. */
export type ClaimRowV2Props = ClaimRowProps;

/** Happy-path stage labels the timeline chip walks through (denied is off-path). */
const STAGES = ['Filed', 'Review', 'Approved', 'Paid'] as const;

/**
 * ClaimRow, alternate design **V2** — an elevated card carrying a compact
 * status **timeline chip**: a row of stage dots (Filed → Review → Approved →
 * Paid) with the reached stages filled and the current one ringed, so progress
 * reads at a glance. A denied claim collapses the timeline to a single danger
 * marker. Status stays glyph + text + color; the amount anchors the top-right.
 * Same `ClaimRowProps`; drops in for `ClaimRow`. Token-pure.
 */
export function ClaimRowV2({
  claimNumber,
  title,
  status,
  amountCents,
  currency = 'USD',
  date,
  formatMoney: format = formatMoney,
  onPress,
  style,
}: ClaimRowV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const sd = claimStatus(status);
  const denied = status === 'denied';
  const tint = denied ? colors.danger : colors.primary;

  const body = (
    <Card variant={onPress ? 'interactive' : 'elevated'} padding="md" radius="md" style={style}>
      <View style={{ gap: tokens.spacing.sm }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.md }}>
          <View style={{ flex: 1, gap: 2 }}>
            <Text
              numberOfLines={1}
              style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
            >
              {title}
            </Text>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{claimNumber}</Text>
          </View>
          <View style={{ alignItems: 'flex-end', gap: 2 }}>
            {amountCents != null ? (
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }}>
                {format(Math.max(0, Math.trunc(amountCents)), currency)}
              </Text>
            ) : null}
            {date != null ? (
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{date}</Text>
            ) : null}
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          {denied ? (
            <Badge tone="danger" variant="soft" size="sm">
              {`${sd.glyph} ${sd.label}`}
            </Badge>
          ) : (
            <>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, gap: tokens.spacing.xs }}>
                {STAGES.map((stage, i) => {
                  const done = i < sd.step;
                  const current = i === sd.step;
                  const on = done || current;
                  return (
                    <View key={stage} style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                      <View
                        accessibilityLabel={current ? `${stage}, current stage` : undefined}
                        style={{
                          width: current ? 12 : 8,
                          height: current ? 12 : 8,
                          borderRadius: tokens.radius.full,
                          backgroundColor: on ? tint : withAlpha(colors.muted, 0.25),
                          borderWidth: current ? 2 : 0,
                          borderColor: withAlpha(tint, 0.35),
                        }}
                      />
                      {i < STAGES.length - 1 ? (
                        <View
                          style={{
                            flex: 1,
                            height: 2,
                            marginHorizontal: tokens.spacing.xs,
                            backgroundColor: done ? tint : withAlpha(colors.muted, 0.2),
                          }}
                        />
                      ) : null}
                    </View>
                  );
                })}
              </View>
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
                {sd.glyph} {sd.label}
              </Text>
            </>
          )}
        </View>
      </View>
    </Card>
  );

  if (!onPress) return body;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Claim ${claimNumber}, ${title}, ${sd.label}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
    >
      {body}
    </Pressable>
  );
}
