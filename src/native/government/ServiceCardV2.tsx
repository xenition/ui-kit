import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Card, Icon, Badge } from '../primitives';
import { shadow } from '../primitives/internal/elevation';
import { useEnter, usePressScale } from '../primitives/internal/motion';
import { withAlpha } from './internal/format';
import type { ServiceCardProps, ServiceCategory, ServiceChannel } from './ServiceCard';

/** Drop-in replacement for {@link ServiceCard} — identical props, distinct design. */
export type ServiceCardV2Props = ServiceCardProps;

const CATEGORY: Record<ServiceCategory, { label: string; glyph: string }> = {
  license: { label: 'Licensing', glyph: '🪪' },
  permit: { label: 'Permits', glyph: '📋' },
  tax: { label: 'Tax', glyph: '🧾' },
  records: { label: 'Records', glyph: '🗂️' },
  benefit: { label: 'Benefits', glyph: '🤝' },
  health: { label: 'Public health', glyph: '⚕️' },
  utility: { label: 'Utilities', glyph: '💧' },
  other: { label: 'Service', glyph: '🏛️' },
};

const CHANNEL: Record<ServiceChannel, { label: string; glyph: string; tone: 'success' | 'warn' | 'neutral' | 'danger' }> = {
  online: { label: 'Online', glyph: '🌐', tone: 'success' },
  'in-person': { label: 'In person', glyph: '🏢', tone: 'warn' },
  phone: { label: 'By phone', glyph: '☎️', tone: 'neutral' },
  unavailable: { label: 'Unavailable', glyph: '⛔', tone: 'danger' },
};

/**
 * ServiceCard, alternate design **V2** — an elevated tile. A large tinted
 * category glyph tile anchors the header beside the title; the delivery channel
 * reads as a prominent text + glyph availability badge (never color alone); a
 * quiet turnaround footer sits above a **full-width primary Start CTA**. Same
 * `ServiceCardProps`; drops in for `ServiceCard`. Token-pure.
 */
export function ServiceCardV2({
  category,
  title,
  description,
  channel,
  estimatedTime,
  actionLabel = 'Start',
  onStart,
  onPress,
  style,
}: ServiceCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const cat = CATEGORY[category] ?? CATEGORY.other;
  const ch = channel ? CHANNEL[channel] : undefined;
  const enter = useEnter({ translateY: 8 });
  const press = usePressScale();

  const body = (
    <Card variant="elevated" padding="none" radius="lg" style={[{ overflow: 'hidden' }, style]}>
      <View style={{ padding: tokens.spacing.lg, gap: tokens.spacing.md }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: tokens.radius.lg,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: withAlpha(colors.primary, 0.12),
              ...shadow('sm', tokens),
            }}
          >
            <Icon glyph={cat.glyph} size="3xl" accessibilityLabel={cat.label} />
          </View>
          <View style={{ flex: 1, gap: 2 }}>
            <Text
              numberOfLines={2}
              style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '800' }}
            >
              {title}
            </Text>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
              {cat.label}
            </Text>
          </View>
        </View>

        {ch != null || estimatedTime != null ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }}>
            {ch != null ? (
              <Badge tone={ch.tone} variant="soft" size="md">
                {`${ch.glyph} ${ch.label}`}
              </Badge>
            ) : null}
            {estimatedTime != null ? (
              <Badge tone="neutral" variant="outline" size="md">
                {`⏱ ${estimatedTime}`}
              </Badge>
            ) : null}
          </View>
        ) : null}

        {description != null ? (
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>{description}</Text>
        ) : null}

        {onStart != null ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={actionLabel}
            onPress={onStart}
            style={({ pressed }) => ({
              borderRadius: tokens.radius.md,
              backgroundColor: colors.primary,
              paddingVertical: tokens.spacing.sm,
              alignItems: 'center',
              opacity: pressed ? 0.85 : 1,
            })}
          >
            <Text style={{ color: colors.onPrimary, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
              {actionLabel}
            </Text>
          </Pressable>
        ) : null}
      </View>
    </Card>
  );

  if (!onPress) {
    return <Animated.View style={{ opacity: enter.opacity, transform: enter.transform }}>{body}</Animated.View>;
  }
  return (
    <Animated.View style={{ opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${title}, ${cat.label}`}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
      >
        {body}
      </Pressable>
    </Animated.View>
  );
}
