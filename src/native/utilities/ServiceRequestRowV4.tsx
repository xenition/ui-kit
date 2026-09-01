import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Icon, Badge } from '../primitives';
import { requestState } from './internal/status';
import { GradientSurface } from './internal/GradientSurface';
import { brandDisc, brandInk } from './internal/brand';
import type { ServiceRequestRowProps, ServiceRequestKind } from './ServiceRequestRow';

/** Drop-in for {@link ServiceRequestRowProps} — same props, a different design. */
export type ServiceRequestRowV4Props = ServiceRequestRowProps;

const KIND_GLYPH: Record<ServiceRequestKind, string> = {
  repair: '🔧',
  connect: '🔌',
  disconnect: '⛔',
  transfer: '📦',
  inspection: '🔍',
  meter: '📟',
  other: '📋',
};

/**
 * ServiceRequestRow — **V4** design. An elevated row: the kind glyph in the
 * signature brand-gradient disc, a title/number stack, an optional date, and a
 * status `Badge`. The lifecycle state stays conveyed redundantly by glyph +
 * label + a color that traces to a semantic slot (completed → success,
 * cancelled → neutral) via `requestState` — never color-alone; a `high` priority
 * adds an explicit "Urgent" tag. Becomes a button only when `onPress` is
 * supplied. Same props as {@link ServiceRequestRowProps}; token-only colors.
 */
export function ServiceRequestRowV4({
  requestNumber,
  title,
  status,
  kind = 'other',
  date,
  priority = 'normal',
  onPress,
  style,
}: ServiceRequestRowV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const sd = requestState(status);
  const glyph = KIND_GLYPH[kind] ?? KIND_GLYPH.other;

  const card = {
    backgroundColor: colors.card,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.lg,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.1,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  } as const;

  const row = (
    <View
      style={[
        card,
        { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md },
        style,
      ]}
    >
      <GradientSurface
        colors={brandDisc(r)}
        style={{ width: 44, height: 44, borderRadius: tokens.radius.md, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
      >
        <Icon glyph={glyph} accessibilityLabel={`${kind} request`} style={{ color: brandInk(r) }} />
      </GradientSurface>
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}
        >
          {title}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>{requestNumber}</Text>
          {date != null ? (
            <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>· {date}</Text>
          ) : null}
          {priority === 'high' ? (
            <Badge tone="danger" variant="soft" size="sm">
              {'! Urgent'}
            </Badge>
          ) : null}
        </View>
      </View>
      <Badge tone={sd.tone} variant="soft" size="sm">
        {`${sd.glyph} ${sd.label}`}
      </Badge>
    </View>
  );

  if (!onPress) return row;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Request ${requestNumber}, ${title}, ${sd.label}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
    >
      {row}
    </Pressable>
  );
}
