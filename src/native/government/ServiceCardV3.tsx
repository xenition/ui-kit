import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Icon } from '../primitives';
import type { ServiceCardProps, ServiceCategory, ServiceChannel } from './ServiceCard';

/** Drop-in replacement for {@link ServiceCard} — identical props, distinct design. */
export type ServiceCardV3Props = ServiceCardProps;

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

const CHANNEL: Record<ServiceChannel, { label: string; glyph: string }> = {
  online: { label: 'Online', glyph: '🌐' },
  'in-person': { label: 'In person', glyph: '🏢' },
  phone: { label: 'By phone', glyph: '☎️' },
  unavailable: { label: 'Unavailable', glyph: '⛔' },
};

/**
 * ServiceCard, alternate design **V3** — a minimal directory line. A small
 * primary category dot and glyph lead, the title and category label share the
 * line, and the delivery channel (text + glyph, never color alone) plus
 * turnaround close it on the right. Tight rhythm for long service lists. Same
 * `ServiceCardProps`; drops in for `ServiceCard`. Token-pure.
 */
export function ServiceCardV3({
  category,
  title,
  description,
  channel,
  estimatedTime,
  onStart,
  onPress,
  style,
}: ServiceCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const cat = CATEGORY[category] ?? CATEGORY.other;
  const ch = channel ? CHANNEL[channel] : undefined;
  // A whole-line press falls back to the start handler, so a bare list line is
  // still actionable even when only `onStart` was supplied.
  const activate = onPress ?? onStart;

  const row = (
    <View
      style={[
        { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, paddingVertical: tokens.spacing.sm },
        style,
      ]}
    >
      <View
        accessibilityLabel={cat.label}
        style={{ width: 8, height: 8, borderRadius: tokens.radius.full, backgroundColor: colors.primary }}
      />
      <Icon glyph={cat.glyph} size="base" accessibilityLabel={cat.label} />
      <View style={{ flex: 1, gap: 1 }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}
        >
          {title}
        </Text>
        <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {cat.label}
          {description != null ? ` · ${description}` : ''}
        </Text>
      </View>
      <View style={{ alignItems: 'flex-end', gap: 1 }}>
        {ch != null ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
            {ch.glyph} {ch.label}
          </Text>
        ) : null}
        {estimatedTime != null ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            ⏱ {estimatedTime}
          </Text>
        ) : null}
      </View>
    </View>
  );

  if (activate == null) return row;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${title}, ${cat.label}`}
      onPress={activate}
      style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
    >
      {row}
    </Pressable>
  );
}
