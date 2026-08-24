import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Card, Icon, Badge, Button } from '../primitives';
import { withAlpha } from './internal/format';

/** Category of a public / civic service — drives the leading glyph + label. */
export type ServiceCategory =
  | 'license'
  | 'permit'
  | 'tax'
  | 'records'
  | 'benefit'
  | 'health'
  | 'utility'
  | 'other';

interface CategoryDescriptor {
  label: string;
  glyph: string;
}

const CATEGORY: Record<ServiceCategory, CategoryDescriptor> = {
  license: { label: 'Licensing', glyph: '🪪' },
  permit: { label: 'Permits', glyph: '📋' },
  tax: { label: 'Tax', glyph: '🧾' },
  records: { label: 'Records', glyph: '🗂️' },
  benefit: { label: 'Benefits', glyph: '🤝' },
  health: { label: 'Public health', glyph: '⚕️' },
  utility: { label: 'Utilities', glyph: '💧' },
  other: { label: 'Service', glyph: '🏛️' },
};

/** How the service is delivered — a non-color-alone availability hint. */
export type ServiceChannel = 'online' | 'in-person' | 'phone' | 'unavailable';

const CHANNEL: Record<ServiceChannel, { label: string; glyph: string; tone: 'success' | 'warn' | 'neutral' | 'danger' }> = {
  online: { label: 'Online', glyph: '🌐', tone: 'success' },
  'in-person': { label: 'In person', glyph: '🏢', tone: 'warn' },
  phone: { label: 'By phone', glyph: '☎️', tone: 'neutral' },
  unavailable: { label: 'Unavailable', glyph: '⛔', tone: 'danger' },
};

export interface ServiceCardProps {
  /** Service category — picks the tinted leading glyph + category label. */
  category: ServiceCategory;
  /** Service title (e.g. "Renew driver license"). */
  title: string;
  /** Optional one-line description of what the service does. */
  description?: string;
  /** Delivery channel — rendered as a text+glyph availability badge. */
  channel?: ServiceChannel;
  /** Typical processing / turnaround time (already localized). */
  estimatedTime?: string;
  /** Label for the primary action button (only shown with `onStart`). */
  actionLabel?: string;
  /** Fires when the action button is pressed (e.g. begin the service). */
  onStart?: () => void;
  /** Fires when the whole card is pressed; card is a button only when set. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A single public-service tile for a civic app home / directory. The `category`
 * selects a tinted leading glyph disc; a `channel` badge conveys availability by
 * **text + glyph + color** (never color alone). An optional primary `Button`
 * fires `onStart`, and the whole card becomes a button only when `onPress` is
 * supplied. Every color traces to a `SemanticColors` slot or a token-derived
 * tint — no literals.
 */
export function ServiceCard({
  category,
  title,
  description,
  channel,
  estimatedTime,
  actionLabel = 'Start',
  onStart,
  onPress,
  style,
}: ServiceCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const cat = CATEGORY[category] ?? CATEGORY.other;
  const ch = channel ? CHANNEL[channel] : undefined;

  const body = (
    <Card variant={onPress ? 'interactive' : 'elevated'} style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: tokens.radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: withAlpha(colors.primary, 0.12),
          }}
        >
          <Icon glyph={cat.glyph} size="xl" accessibilityLabel={cat.label} />
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <Text
            numberOfLines={2}
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}
          >
            {title}
          </Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{cat.label}</Text>
        </View>
        {ch != null ? (
          <Badge tone={ch.tone} variant="soft" size="sm">
            {`${ch.glyph} ${ch.label}`}
          </Badge>
        ) : null}
      </View>

      {description != null ? (
        <Text
          style={{ marginTop: tokens.spacing.sm, color: colors.onSurface, fontSize: tokens.typography.scale.sm }}
        >
          {description}
        </Text>
      ) : null}

      {estimatedTime != null || onStart != null ? (
        <View
          style={{
            marginTop: tokens.spacing.md,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: tokens.spacing.sm,
          }}
        >
          {estimatedTime != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              ⏱ {estimatedTime}
            </Text>
          ) : (
            <View />
          )}
          {onStart != null ? (
            <Button size="sm" onPress={onStart}>
              {actionLabel}
            </Button>
          ) : null}
        </View>
      ) : null}
    </Card>
  );

  if (!onPress) return body;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${title}, ${cat.label}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
    >
      {body}
    </Pressable>
  );
}
