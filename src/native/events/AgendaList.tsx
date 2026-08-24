import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';

/** Status of an agenda entry — drives a small leading dot + label. */
export type AgendaItemStatus = 'upcoming' | 'live' | 'done';

export interface AgendaItem {
  /** Stable key. */
  id: string;
  /** Pre-formatted start time, e.g. `09:00`. */
  time: string;
  /** Entry title. */
  title: string;
  /** Optional room / track subtitle. */
  subtitle?: string;
  /** Optional status marker. */
  status?: AgendaItemStatus;
}

export interface AgendaListProps {
  /** Ordered agenda entries. */
  items: AgendaItem[];
  /** Fires when an entry is tapped. */
  onSelectItem?: (item: AgendaItem) => void;
  /** Message shown when `items` is empty. */
  emptyLabel?: string;
  /** Render placeholder rows instead of content. */
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

const STATUS_TONE: Record<AgendaItemStatus, keyof SemanticColors> = {
  upcoming: 'muted',
  live: 'success',
  done: 'border',
};

/**
 * A vertical, time-anchored agenda. Each row shows a time gutter, a status dot
 * (whose meaning is also spelled out for `live` entries), the title and an
 * optional subtitle. Renders a skeleton when `loading` and a centered empty
 * message when there are no items. Colors come from the compiled theme tokens;
 * no literal colors.
 */
export function AgendaList({
  items,
  onSelectItem,
  emptyLabel = 'No sessions scheduled yet',
  loading = false,
  style,
}: AgendaListProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (loading) {
    return (
      <View accessibilityLabel="Loading agenda" style={[{ gap: tokens.spacing.sm }, style]}>
        {Array.from({ length: 3 }, (_, i) => (
          <View key={i} style={{ flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'center' }}>
            <View style={{ width: tokens.spacing['2xl'], height: tokens.spacing.md, borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[200] }} />
            <View style={{ flex: 1, height: tokens.spacing.lg, borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] }} />
          </View>
        ))}
      </View>
    );
  }

  if (items.length === 0) {
    return (
      <View
        accessibilityRole="text"
        style={[
          {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: tokens.spacing.xl,
            borderRadius: tokens.radius.md,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.surface,
          },
          style,
        ]}
      >
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{emptyLabel}</Text>
      </View>
    );
  }

  return (
    <View accessibilityRole="list" style={[{ gap: tokens.spacing.xs }, style]}>
      {items.map((item) => {
        const status = item.status ?? 'upcoming';
        const Row = (
          <View style={{ flexDirection: 'row', gap: tokens.spacing.md, paddingVertical: tokens.spacing.sm }}>
            <Text style={{ width: tokens.spacing['2xl'] + tokens.spacing.md, color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
              {item.time}
            </Text>
            <View style={{ alignItems: 'center', paddingTop: tokens.spacing.xs / 2 }}>
              <View style={{ width: tokens.spacing.sm, height: tokens.spacing.sm, borderRadius: tokens.radius.full, backgroundColor: colors[STATUS_TONE[status]] }} />
            </View>
            <View style={{ flex: 1, gap: 2 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
                <Text style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
                  {item.title}
                </Text>
                {status === 'live' ? (
                  <Text style={{ color: colors.success, fontSize: tokens.typography.scale.xs, fontWeight: '700', letterSpacing: 1 }}>
                    LIVE
                  </Text>
                ) : null}
              </View>
              {item.subtitle ? (
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{item.subtitle}</Text>
              ) : null}
            </View>
          </View>
        );

        if (onSelectItem) {
          return (
            <Pressable
              key={item.id}
              accessibilityRole="button"
              accessibilityLabel={`${item.time} ${item.title}`}
              onPress={() => onSelectItem(item)}
              style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
            >
              {Row}
            </Pressable>
          );
        }
        return <View key={item.id}>{Row}</View>;
      })}
    </View>
  );
}
