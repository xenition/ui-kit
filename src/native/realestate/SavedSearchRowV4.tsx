import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, Switch, Icon } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { SavedSearchRowProps } from './SavedSearchRow';

/** Drop-in for {@link SavedSearchRowProps} — same props, the V4 "listing" design. */
export type SavedSearchRowV4Props = SavedSearchRowProps;

/**
 * SavedSearchRow — **V4** "listing" design. The editorial take on a
 * saved-searches row: an elevated, rounded card with the query name, a one-line
 * filter summary, a soft-primary "new matches" count pill, and an alerts toggle.
 * Same props/behavior as {@link SavedSearchRowProps}; the alert switch renders
 * only when `onToggleAlerts` is provided and is kept out of the row's press
 * target so toggling never runs the search. Token-only colors via
 * `useXenitionTheme()` + `withAlpha`; a11y-labelled.
 */
export function SavedSearchRowV4({
  name,
  summary,
  newCount = 0,
  alertsOn = false,
  onToggleAlerts,
  onPress,
  style,
}: SavedSearchRowV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const content = (
    <View style={{ flex: 1, gap: 2 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <Text
          numberOfLines={1}
          style={{ flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
        >
          {name}
        </Text>
        {newCount > 0 ? (
          <View
            style={{
              paddingHorizontal: tokens.spacing.sm,
              paddingVertical: 2,
              borderRadius: tokens.radius.full,
              backgroundColor: withAlpha(colors.primary, 0.1),
            }}
          >
            <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
              {`${newCount} new`}
            </Text>
          </View>
        ) : null}
      </View>
      {summary ? (
        <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
          {summary}
        </Text>
      ) : null}
    </View>
  );

  const alertsControl = onToggleAlerts ? (
    <View style={{ minHeight: 44, alignItems: 'center', justifyContent: 'center' }}>
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
      borderRadius: tokens.radius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
      paddingVertical: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.lg,
      shadowColor: colors.onSurface,
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
      elevation: 3,
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
          style={({ pressed }) => ({
            flex: 1,
            minHeight: 44,
            opacity: pressed ? 0.85 : 1,
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.sm,
          })}
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
