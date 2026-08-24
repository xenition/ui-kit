import * as React from 'react';
import {
  Modal as RNModal,
  Pressable,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useXenitionTheme } from '../theme';

export interface AppShellProps {
  /** The nav rail (typically a `<Sidebar />`). Shown in a slide-in drawer. */
  sidebar: React.ReactNode;
  /** Optional top-bar slot: title or actions. A string renders as the title. */
  header?: React.ReactNode;
  /** Main content area. */
  children: React.ReactNode;
  /** Accessible label for the drawer toggle. */
  menuLabel?: string;
  /** Drawer width in px. */
  sidebarWidth?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * Dashboard layout — the native mirror of the web `AppShell`. Renders a top bar
 * (with a hamburger that opens the `sidebar` in a slide-in drawer `Modal`) above
 * a content area. This is the simplified phone form: the sidebar is always a
 * drawer rather than a persistent rail. No literal colors.
 */
export function AppShell({
  sidebar,
  header,
  children,
  menuLabel = 'Toggle navigation',
  sidebarWidth = 280,
  style,
}: AppShellProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const [open, setOpen] = React.useState(false);
  // Push the top bar below the status bar / notch by adding the top safe-area
  // inset to its token padding. Needs a `SafeAreaProvider` above it (Expo default).
  const insets = useSafeAreaInsets();

  return (
    <View style={[{ flex: 1, backgroundColor: colors.surface }, style]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          borderBottomWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          paddingHorizontal: tokens.spacing.lg,
          paddingTop: tokens.spacing.md + insets.top,
          paddingBottom: tokens.spacing.md,
        }}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={menuLabel}
          onPress={() => setOpen(true)}
          style={{
            borderRadius: tokens.radius.sm,
            padding: tokens.spacing.xs,
          }}
        >
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xl }}>{'≡'}</Text>
        </Pressable>
        <View style={{ flex: 1 }}>
          {typeof header === 'string' ? (
            <Text
              style={{
                color: colors.onSurface,
                fontSize: tokens.typography.scale.lg,
                fontWeight: '600',
              }}
            >
              {header}
            </Text>
          ) : (
            header
          )}
        </View>
      </View>

      <View style={{ flex: 1, padding: tokens.spacing.lg }}>{children}</View>

      <RNModal visible={open} transparent animationType="slide" onRequestClose={() => setOpen(false)}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ width: sidebarWidth, maxWidth: '85%' }}>{sidebar}</View>
          <Pressable
            accessibilityLabel="Close navigation"
            onPress={() => setOpen(false)}
            style={{
              flex: 1,
              backgroundColor: colors.onSurface,
              opacity: 0.5,
            }}
          />
        </View>
      </RNModal>
    </View>
  );
}
