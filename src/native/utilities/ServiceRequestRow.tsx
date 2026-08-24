import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Icon, Badge } from '../primitives';
import { withAlpha } from './internal/format';
import { requestState, type RequestState } from './internal/status';

export type { RequestState };

/** Kind of service request — drives the leading glyph. */
export type ServiceRequestKind =
  | 'repair'
  | 'connect'
  | 'disconnect'
  | 'transfer'
  | 'inspection'
  | 'meter'
  | 'other';

const KIND_GLYPH: Record<ServiceRequestKind, string> = {
  repair: '🔧',
  connect: '🔌',
  disconnect: '⛔',
  transfer: '📦',
  inspection: '🔍',
  meter: '📟',
  other: '📋',
};

export interface ServiceRequestRowProps {
  /** Request reference / ticket number (e.g. "SR-10482"). */
  requestNumber: string;
  /** Short summary (e.g. "Water heater leak"). */
  title: string;
  /** Lifecycle state — conveyed by text + glyph + color. */
  status: RequestState;
  /** Request kind — drives the leading glyph (default `other`). */
  kind?: ServiceRequestKind;
  /** Localized scheduled/updated date. */
  date?: string;
  /** Priority — surfaces an extra "Urgent" tag when `high`. */
  priority?: 'low' | 'normal' | 'high';
  /** Fires on row press (e.g. open request detail); becomes a button when supplied. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * One line in a service-request / work-order list: a tinted kind glyph disc, a
 * title/number stack, an optional date, and a status pill. The state is conveyed
 * redundantly (glyph + label + a color that traces to a `SemanticColors` slot:
 * completed → success, cancelled → neutral) so it is never color-alone; a `high`
 * priority adds an explicit "Urgent" tag rather than relying on color. Becomes a
 * button only when `onPress` is supplied.
 */
export function ServiceRequestRow({
  requestNumber,
  title,
  status,
  kind = 'other',
  date,
  priority = 'normal',
  onPress,
  style,
}: ServiceRequestRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const sd = requestState(status);
  const tint = sd.tone === 'neutral' ? colors.muted : colors[sd.tone];
  const glyph = KIND_GLYPH[kind] ?? KIND_GLYPH.other;

  const row = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          paddingVertical: tokens.spacing.sm,
        },
        style,
      ]}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: tokens.radius.md,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: withAlpha(tint, 0.14),
        }}
      >
        <Icon glyph={glyph} accessibilityLabel={`${kind} request`} />
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}
        >
          {title}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{requestNumber}</Text>
          {date != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>· {date}</Text>
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
