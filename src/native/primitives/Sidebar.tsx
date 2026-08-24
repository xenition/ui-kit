import * as React from 'react';
import { Pressable, ScrollView, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface SidebarItem {
  /** Row label (also the accessible name). */
  label: string;
  /** Optional leading icon slot. */
  icon?: React.ReactNode;
  /** Marks the row as the current destination. */
  active?: boolean;
  /** Fires on press. */
  onSelect?: () => void;
}

export interface SidebarGroup {
  /** Optional section heading rendered above the rows. */
  label?: string;
  items: SidebarItem[];
}

export interface SidebarProps {
  /** Brand slot pinned to the top (logo, wordmark, …). */
  brand?: React.ReactNode;
  /** Flat list of nav rows (mutually exclusive with `groups`). */
  items?: SidebarItem[];
  /** Grouped nav rows, each with an optional section heading. */
  groups?: SidebarGroup[];
  /** Optional footer slot pinned to the bottom. */
  footer?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Vertical nav rail — the native mirror of the web `Sidebar`. A `brand` slot on
 * top, one or more groups of token-styled `Pressable` nav rows with an active
 * state, and an optional `footer`. Used as a persistent rail on tablet or inside
 * the `AppShell` drawer on phones. No literal colors.
 */
export function Sidebar({
  brand,
  items,
  groups,
  footer,
  style,
}: SidebarProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const resolvedGroups: SidebarGroup[] = groups ?? (items ? [{ items }] : []);

  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: colors.surface,
          borderRightWidth: 1,
          borderColor: colors.border,
          paddingHorizontal: tokens.spacing.sm,
          paddingVertical: tokens.spacing.lg,
        },
        style,
      ]}
    >
      {brand != null ? (
        <View style={{ paddingHorizontal: tokens.spacing.sm, marginBottom: tokens.spacing.md }}>
          {typeof brand === 'string' ? (
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
              {brand}
            </Text>
          ) : (
            brand
          )}
        </View>
      ) : null}

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ gap: tokens.spacing.lg }}>
        {resolvedGroups.map((group, gi) => (
          <View key={gi} style={{ gap: tokens.spacing.xs }}>
            {group.label != null ? (
              <Text
                style={{
                  color: colors.muted,
                  fontSize: tokens.typography.scale.xs,
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: 0.6,
                  paddingHorizontal: tokens.spacing.sm,
                  paddingBottom: tokens.spacing.xs,
                }}
              >
                {group.label}
              </Text>
            ) : null}
            {group.items.map((item, ii) => (
              <Pressable
                key={ii}
                accessibilityRole="button"
                accessibilityState={{ selected: item.active }}
                onPress={item.onSelect}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: tokens.spacing.sm,
                  borderRadius: tokens.radius.md,
                  paddingHorizontal: tokens.spacing.md,
                  paddingVertical: tokens.spacing.sm,
                  backgroundColor: item.active ? colors.primary : 'transparent',
                }}
              >
                {item.icon != null ? <View>{item.icon}</View> : null}
                <Text
                  style={{
                    color: item.active ? colors.onPrimary : colors.onSurface,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: '500',
                  }}
                >
                  {item.label}
                </Text>
              </Pressable>
            ))}
          </View>
        ))}
      </ScrollView>

      {footer != null ? (
        <View style={{ borderTopWidth: 1, borderColor: colors.border, paddingTop: tokens.spacing.md }}>
          {footer}
        </View>
      ) : null}
    </View>
  );
}
