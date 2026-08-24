import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives';

export interface InboxHeaderAction {
  id: string;
  /** Glyph rendered in the tap target. */
  glyph: string;
  /** Accessible label. */
  label: string;
  onPress?: () => void;
}

export interface InboxHeaderProps {
  /** Mailbox / folder title (e.g. "Inbox"). */
  title: string;
  /** Unread count shown next to the title. */
  unreadCount?: number;
  /** Back affordance; shown when provided. */
  onBack?: () => void;
  /** Trailing action buttons (search, compose, refresh…). */
  actions?: InboxHeaderAction[];
  /** Syncing state → shows a "Syncing…" caption under the title. */
  syncing?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * Top bar for an inbox / mailbox screen — optional back button, the folder
 * title with an unread count, an optional "Syncing…" caption, and a row of
 * trailing icon actions. Uses the `header` role and token-bound surface/border.
 * Data + callbacks only. No literal colors.
 */
export function InboxHeader({
  title,
  unreadCount = 0,
  onBack,
  actions,
  syncing = false,
  style,
}: InboxHeaderProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const safeActions = actions ?? [];

  return (
    <View
      accessibilityRole="header"
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
          paddingVertical: tokens.spacing.sm,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          backgroundColor: colors.surface,
        },
        style,
      ]}
    >
      {onBack ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back"
          onPress={onBack}
          hitSlop={8}
          style={({ pressed }) => ({ padding: tokens.spacing.xs, opacity: pressed ? 0.6 : 1 })}
        >
          <Icon glyph="‹" size="2xl" color="onSurface" />
        </Pressable>
      ) : null}

      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text
            numberOfLines={1}
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700' }}
          >
            {title}
          </Text>
          {unreadCount > 0 ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
              {unreadCount > 999 ? '999+' : String(unreadCount)}
            </Text>
          ) : null}
        </View>
        {syncing ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Syncing…</Text>
        ) : null}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
        {safeActions.map((a) => (
          <Pressable
            key={a.id}
            accessibilityRole="button"
            accessibilityLabel={a.label}
            onPress={a.onPress}
            hitSlop={8}
            style={({ pressed }) => ({ padding: tokens.spacing.xs, opacity: pressed ? 0.6 : 1 })}
          >
            <Icon glyph={a.glyph} size="xl" color="onSurface" />
          </Pressable>
        ))}
      </View>
    </View>
  );
}
