import * as React from 'react';
import { Animated, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge } from '../primitives/Badge';
import { shadow } from '../primitives/internal/elevation';
import { withAlpha } from '../primitives/internal/color';
import { useEnter } from '../primitives/internal/motion';
import type { TicketStubProps } from './TicketStub';

/**
 * Alternate design (V2) for {@link TicketStub}. Same props — a drop-in swap.
 *
 * An **elevated ticket** that leans into the physical stub metaphor: a soft
 * primary-tinted header band with the event name set large, a punched
 * perforation line (edge notches + a dotted tear) instead of a plain divider,
 * and a taller token-bar "barcode" band. Drop shadow, no border. Token-pure —
 * the barcode bars ship no scan dependency; their widths seed from `code`.
 */
export type TicketStubV2Props = TicketStubProps;

export function TicketStubV2({
  eventTitle,
  holderName,
  dateLabel,
  fields = [],
  code,
  tier,
  variant = 'default',
  style,
}: TicketStubV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();

  const chars = code.length > 0 ? code.split('') : ['0'];
  const bars = Array.from({ length: 34 }, (_, i) => {
    const ch = chars[i % chars.length] ?? '0';
    const magnitude = (ch.charCodeAt(0) % 4) + 1; // 1..4
    const dark = ch.charCodeAt(0) % 2 === 0;
    return { width: magnitude, dark };
  });

  const perforationDots = Array.from({ length: 22 }, (_, i) => i);

  const containerStyle: StyleProp<ViewStyle> = [
    {
      overflow: 'hidden',
      borderRadius: tokens.radius.lg,
      backgroundColor: colors.surface,
      ...shadow('lg', tokens),
    },
    style,
  ];

  return (
    <Animated.View
      accessibilityRole="summary"
      accessibilityLabel={`Ticket for ${eventTitle}, code ${code}`}
      style={[containerStyle, { opacity: enter.opacity, transform: enter.transform }]}
    >
      {/* Tinted header band with the big event name. */}
      <View style={{ backgroundColor: withAlpha(colors.primary, 0.08), padding: tokens.spacing.lg, gap: tokens.spacing.sm }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: tokens.spacing.sm }}>
          <Text numberOfLines={2} style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }}>
            {eventTitle}
          </Text>
          {tier ? <Badge tone="primary">{tier}</Badge> : null}
        </View>
        {holderName ? (
          <Text style={{ color: colors.primaryText, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>{holderName}</Text>
        ) : null}
        {dateLabel ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{dateLabel}</Text>
        ) : null}
      </View>

      {variant !== 'compact' && fields.length > 0 ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.lg, paddingHorizontal: tokens.spacing.lg, paddingBottom: tokens.spacing.md }}>
          {fields.map((f, i) => (
            <View key={`${f.label}-${i}`} style={{ gap: 2 }}>
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700', letterSpacing: 1 }}>
                {f.label.toUpperCase()}
              </Text>
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>{f.value}</Text>
            </View>
          ))}
        </View>
      ) : null}

      {/* Punched perforation: edge notches + a dotted tear line. */}
      <View style={{ flexDirection: 'row', alignItems: 'center', height: tokens.spacing.lg }}>
        <View style={{ width: tokens.spacing.md, height: tokens.spacing.md, borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[100], marginLeft: -tokens.spacing.sm }} />
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: tokens.spacing.sm }}>
          {perforationDots.map((d) => (
            <View key={d} style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: colors.border }} />
          ))}
        </View>
        <View style={{ width: tokens.spacing.md, height: tokens.spacing.md, borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[100], marginRight: -tokens.spacing.sm }} />
      </View>

      {/* Taller token-bar barcode band + code. */}
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: 2,
          height: tokens.spacing['2xl'] + tokens.spacing.md,
          paddingHorizontal: tokens.spacing.lg,
          paddingTop: tokens.spacing.sm,
        }}
      >
        {bars.map((b, i) => (
          <View key={i} style={{ width: b.width, height: '100%', backgroundColor: b.dark ? colors.onSurface : withAlpha(colors.onSurface, 0.35) }} />
        ))}
      </View>
      <Text style={{ textAlign: 'center', color: colors.muted, fontSize: tokens.typography.scale.sm, letterSpacing: 3, fontWeight: '700', paddingVertical: tokens.spacing.md }}>
        {code}
      </Text>
    </Animated.View>
  );
}
