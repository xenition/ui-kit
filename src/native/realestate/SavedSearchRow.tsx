import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, Badge, Switch, Icon } from '../primitives';

export interface SavedSearchRowProps {
  /** Search name (e.g. "2BR under $600k, Brooklyn"). */
  name: string;
  /** One-line summary of the filters. */
  summary?: string;
  /** Count of new matches since last viewed; shows a primary badge when > 0. */
  newCount?: number;
  /** Whether alert notifications are on. Renders a toggle when `onToggleAlerts` is set. */
  alertsOn?: boolean;
  /** Fires when the alerts toggle changes. */
  onToggleAlerts?: (on: boolean) => void;
  /** Fires when the row body is pressed (e.g. run the search). */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A row in a saved-searches list — name, filter summary, a "new matches" count
 * badge, and an optional alerts toggle. Data + callbacks only; nothing fetches.
 * The alert switch renders only when `onToggleAlerts` is provided and is kept
 * out of the row's press target so toggling never runs the search. Reuses the
 * shared `Badge`, `Switch`, and `Icon`; token-only colors; a11y-labelled.
 */
export function SavedSearchRow({
  name,
  summary,
  newCount = 0,
  alertsOn = false,
  onToggleAlerts,
  onPress,
  style,
}: SavedSearchRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const content = (
    <View style={{ flex: 1, gap: 2 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <Text
          numberOfLines={1}
          style={{ flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}
        >
          {name}
        </Text>
        {newCount > 0 ? <Badge tone="primary">{`${newCount} new`}</Badge> : null}
      </View>
      {summary ? (
        <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
          {summary}
        </Text>
      ) : null}
    </View>
  );

  const alertsControl = onToggleAlerts ? (
    <View style={{ alignItems: 'center', gap: 2 }}>
      <Switch
        checked={alertsOn}
        onCheckedChange={onToggleAlerts}
        accessibilityLabel={`Alerts for ${name}, ${alertsOn ? 'on' : 'off'}`}
      />
    </View>
  ) : null;

  const rowStyle: StyleProp<ViewStyle> = [
    {
      flexDirection: 'row',
      alignItems: 'center',
      gap: tokens.spacing.md,
      borderRadius: tokens.radius.md,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      paddingVertical: tokens.spacing.md,
      paddingHorizontal: tokens.spacing.lg,
    },
    style,
  ];

  return (
    <View style={rowStyle}>
      {onPress ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${name}${newCount > 0 ? `, ${newCount} new matches` : ''}`}
          onPress={onPress}
          style={({ pressed }) => ({ flex: 1, opacity: pressed ? 0.85 : 1, flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm })}
        >
          {content}
          <Icon glyph="›" size="lg" color="muted" />
        </Pressable>
      ) : (
        content
      )}
      {alertsControl}
    </View>
  );
}
