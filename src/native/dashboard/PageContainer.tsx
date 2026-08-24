import * as React from 'react';
import {
  ScrollView,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useXenitionTheme } from '../theme';

export interface PageContainerProps {
  /** Optional page title rendered at the top. */
  title?: string;
  /** Optional subtitle under the title. */
  subtitle?: string;
  /** Trailing header slot next to the title (e.g. a primary action). */
  headerAction?: React.ReactNode;
  /** Set false to disable scrolling (static page). */
  scroll?: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /** Extra padding at the bottom of the scroll content (for tab bars, etc). */
  bottomInset?: number;
}

/**
 * The outer wrapper for a screen: fills with the `surface` token, applies
 * consistent padding, and (by default) scrolls its content. Renders an optional
 * title/subtitle header with a trailing action. Token-only.
 */
export function PageContainer({
  title,
  subtitle,
  headerAction,
  scroll = true,
  children,
  style,
  bottomInset = 0,
}: PageContainerProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  // Derive top/bottom padding from the device safe-area insets so the screen
  // clears the status bar / notch and home indicator; the explicit `bottomInset`
  // prop stacks on top of the inset. Needs a `SafeAreaProvider` above it (Expo default).
  const insets = useSafeAreaInsets();

  const header = title ? (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: tokens.spacing.md,
        marginBottom: tokens.spacing.lg,
      }}
    >
      <View style={{ flex: 1, gap: tokens.spacing.xs }}>
        <Text
          accessibilityRole="header"
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale['2xl'],
            fontWeight: '700',
          }}
        >
          {title}
        </Text>
        {subtitle ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base }}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {headerAction ? <View>{headerAction}</View> : null}
    </View>
  ) : null;

  const padding = {
    paddingHorizontal: tokens.spacing.lg,
    paddingTop: tokens.spacing.lg + insets.top,
    paddingBottom: tokens.spacing.lg + insets.bottom + bottomInset,
  };

  if (!scroll) {
    return (
      <View style={[{ flex: 1, backgroundColor: colors.surface }, padding, style]}>
        {header}
        {children}
      </View>
    );
  }

  return (
    <ScrollView
      style={[{ flex: 1, backgroundColor: colors.surface }, style]}
      contentContainerStyle={padding}
      keyboardShouldPersistTaps="handled"
    >
      {header}
      {children}
    </ScrollView>
  );
}
