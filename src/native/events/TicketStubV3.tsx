import * as React from 'react';
import { Animated, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge } from '../primitives/Badge';
import { useEnter } from '../primitives/internal/motion';
import type { TicketStubProps } from './TicketStub';

/**
 * Alternate design (V3) for {@link TicketStub}. Same props — a drop-in swap.
 *
 * A **minimal boarding-pass line**: everything sits on one horizontal strip —
 * the event name + holder / date on the left, structured fields inline through
 * the middle, and a short vertical token-bar strip with the code on the right,
 * split off by a dashed rule. Flat and hairline-bordered rather than the tall
 * elevated stub. Token-pure; the bars carry no scan dependency.
 */
export type TicketStubV3Props = TicketStubProps;

export function TicketStubV3({
  eventTitle,
  holderName,
  dateLabel,
  fields = [],
  code,
  tier,
  variant = 'default',
  style,
}: TicketStubV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter({ translateY: 4 });

  const chars = code.length > 0 ? code.split('') : ['0'];
  const bars = Array.from({ length: 16 }, (_, i) => {
    const ch = chars[i % chars.length] ?? '0';
    const magnitude = (ch.charCodeAt(0) % 3) + 1;
    const dark = ch.charCodeAt(0) % 2 === 0;
    return { width: magnitude, dark };
  });

  const subLine = [holderName, dateLabel].filter(Boolean).join('  ·  ');

  const containerStyle: StyleProp<ViewStyle> = [
    {
      overflow: 'hidden',
      flexDirection: 'row',
      alignItems: 'stretch',
      borderRadius: tokens.radius.md,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
    },
    style,
  ];

  return (
    <Animated.View
      accessibilityRole="summary"
      accessibilityLabel={`Ticket for ${eventTitle}, code ${code}`}
      style={[containerStyle, { opacity: enter.opacity, transform: enter.transform }]}
    >
      <View style={{ flex: 1, padding: tokens.spacing.md, gap: tokens.spacing.xs, justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <Text numberOfLines={1} style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {eventTitle}
          </Text>
          {tier ? <Badge tone="primary" size="sm">{tier}</Badge> : null}
        </View>
        {subLine ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{subLine}</Text>
        ) : null}
        {variant !== 'compact' && fields.length > 0 ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.md, marginTop: 2 }}>
            {fields.map((f, i) => (
              <Text key={`${f.label}-${i}`} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs }}>
                <Text style={{ color: colors.muted, fontWeight: '700', letterSpacing: 0.5 }}>{`${f.label.toUpperCase()} `}</Text>
                <Text style={{ fontWeight: '700' }}>{f.value}</Text>
              </Text>
            ))}
          </View>
        ) : null}
      </View>

      {/* Dashed tear rule between body and the code stub. */}
      <View style={{ width: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', paddingVertical: tokens.spacing.xs }}>
        {Array.from({ length: 8 }, (_, i) => (
          <View key={i} style={{ width: 1, height: 4, backgroundColor: colors.border }} />
        ))}
      </View>

      <View style={{ alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.xs, paddingHorizontal: tokens.spacing.md, backgroundColor: tokens.ramps.neutral[50] }}>
        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 2, height: tokens.spacing.xl }}
        >
          {bars.map((b, i) => (
            <View key={i} style={{ width: b.width, height: '100%', backgroundColor: b.dark ? colors.onSurface : colors.muted }} />
          ))}
        </View>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, letterSpacing: 1, fontWeight: '600' }}>{code}</Text>
      </View>
    </Animated.View>
  );
}
