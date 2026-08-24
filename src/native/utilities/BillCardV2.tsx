import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Icon, Badge, Button } from '../primitives';
import { shadow } from '../primitives/internal/elevation';
import { usePressScale, useEnter } from '../primitives/internal/motion';
import { formatMoney, withAlpha } from './internal/format';
import { utilityKind, billStatus } from './internal/status';
import type { BillCardProps } from './BillCard';

/** Same public contract as {@link BillCard} — a drop-in alternate design. */
export type BillCardV2Props = BillCardProps;

/**
 * BillCard, redesigned (v2): a **lifted hero card**. A tinted header band carries
 * a large utility glyph tile, provider, and a status pill; the body sets the
 * amount big on the left with a bordered **due-date block** (calendar-style tile,
 * tinted danger when overdue) on the right; a full-width pay CTA anchors the
 * bottom. Enters with a fade+rise and springs on press. Distinct at a glance from
 * v1's flat horizontal disc row and v3's dense line. Same props, integer cents,
 * status by glyph+text+tone (never color alone), token-pure.
 */
export function BillCardV2({
  kind,
  provider,
  accountNumber,
  amountCents,
  dueDate,
  status = 'due',
  currency = 'USD',
  formatMoney: format = formatMoney,
  payLabel = 'Pay now',
  onPay,
  paying = false,
  onPress,
  style,
}: BillCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const kd = utilityKind(kind);
  const sd = billStatus(status);
  const amount = Math.max(0, Math.trunc(amountCents || 0));
  const settled = status === 'paid';
  const overdue = status === 'overdue';
  const enter = useEnter();
  const press = usePressScale();

  const body = (
    <View
      style={[
        {
          borderRadius: tokens.radius.lg,
          backgroundColor: colors.surface,
          overflow: 'hidden',
          ...shadow('lg', tokens),
        },
        style,
      ]}
    >
      {/* Tinted header band */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          paddingHorizontal: tokens.spacing.lg,
          paddingVertical: tokens.spacing.md,
          backgroundColor: withAlpha(colors.primary, 0.08),
        }}
      >
        <View
          style={{
            width: 52,
            height: 52,
            borderRadius: tokens.radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: withAlpha(colors.primary, 0.14),
          }}
        >
          <Icon glyph={kd.glyph} size="2xl" accessibilityLabel={`${kd.label} bill`} />
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <Text
            numberOfLines={1}
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}
          >
            {provider}
          </Text>
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {kd.label} · {accountNumber}
          </Text>
        </View>
        <Badge tone={sd.tone} variant="soft">
          {`${sd.glyph} ${sd.label}`}
        </Badge>
      </View>

      {/* Body: amount + due-date block */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: tokens.spacing.md,
          paddingHorizontal: tokens.spacing.lg,
          paddingTop: tokens.spacing.md,
        }}
      >
        <View style={{ gap: 2 }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {settled ? 'Paid' : 'Amount due'}
          </Text>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '700' }}>
            {format(amount, currency)}
          </Text>
        </View>
        {dueDate != null ? (
          <View
            style={{
              alignItems: 'center',
              gap: 2,
              minWidth: 88,
              paddingVertical: tokens.spacing.xs,
              paddingHorizontal: tokens.spacing.sm,
              borderRadius: tokens.radius.md,
              borderWidth: 1,
              borderColor: overdue ? colors.danger : colors.border,
              backgroundColor: overdue ? withAlpha(colors.danger, 0.08) : 'transparent',
            }}
          >
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
              {settled ? 'Paid on' : 'Due'}
            </Text>
            <Text
              style={{
                color: overdue ? colors.danger : colors.onSurface,
                fontSize: tokens.typography.scale.base,
                fontWeight: '700',
              }}
            >
              {dueDate}
            </Text>
          </View>
        ) : null}
      </View>

      {onPay != null && !settled ? (
        <View style={{ paddingHorizontal: tokens.spacing.lg, paddingTop: tokens.spacing.md, paddingBottom: tokens.spacing.lg }}>
          <Button
            variant="primary"
            tone={overdue ? 'danger' : 'default'}
            onPress={onPay}
            loading={paying}
          >
            {`${payLabel} · ${format(amount, currency)}`}
          </Button>
        </View>
      ) : (
        <View style={{ height: tokens.spacing.lg }} />
      )}
    </View>
  );

  if (!onPress) {
    return <Animated.View style={{ opacity: enter.opacity, transform: enter.transform }}>{body}</Animated.View>;
  }
  return (
    <Animated.View style={{ opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${provider}, ${kd.label} bill, ${sd.label}, ${format(amount, currency)}`}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
      >
        {body}
      </Pressable>
    </Animated.View>
  );
}
