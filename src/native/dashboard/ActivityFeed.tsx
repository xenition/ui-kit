import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { EmptyState } from '../primitives';

export interface ActivityItem {
  id: string;
  title: string;
  /** Secondary line, e.g. "by Ada · Billing". */
  meta?: string;
  /** Relative or absolute timestamp label, e.g. "2h ago". */
  time?: string;
}

export interface ActivityFeedProps {
  items: ActivityItem[];
  /** Optional section heading. */
  title?: string;
  /** Copy for the empty state when `items` is empty. */
  emptyMessage?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A vertical activity/event log with a dot rail. Renders a real empty state
 * (per design.md §15) when there is nothing to show rather than a blank box.
 * Token-only.
 */
export function ActivityFeed({
  items,
  title,
  emptyMessage = 'Activity will appear here as things happen.',
  style,
}: ActivityFeedProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  return (
    <View style={[{ gap: tokens.spacing.sm }, style]}>
      {title ? (
        <Text
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale.lg,
            fontWeight: '700',
          }}
        >
          {title}
        </Text>
      ) : null}
      {items.length === 0 ? (
        <EmptyState title="No activity yet" description={emptyMessage} />
      ) : (
        <View accessibilityRole="list" style={{ gap: tokens.spacing.md }}>
          {items.map((item) => (
            <View
              key={item.id}
              accessibilityRole="text"
              accessibilityLabel={`${item.title}${item.meta ? `, ${item.meta}` : ''}${
                item.time ? `, ${item.time}` : ''
              }`}
              style={{ flexDirection: 'row', gap: tokens.spacing.sm }}
            >
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: tokens.radius.full,
                  backgroundColor: colors.primary,
                  marginTop: 6,
                }}
              />
              <View style={{ flex: 1, gap: 2 }}>
                <Text
                  style={{
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.base,
                    fontWeight: '600',
                  }}
                >
                  {item.title}
                </Text>
                {item.meta ? (
                  <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
                    {item.meta}
                  </Text>
                ) : null}
              </View>
              {item.time ? (
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                  {item.time}
                </Text>
              ) : null}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
