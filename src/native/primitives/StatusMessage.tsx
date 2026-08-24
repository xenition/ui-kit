import * as React from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';

export type StatusMessageState = 'loading' | 'empty' | 'error';

export interface StatusMessageProps {
  /** Which feedback state to render. */
  state: StatusMessageState;
  /** Copy shown to the user. Optional for `loading` (spinner alone is valid). */
  message?: string;
  style?: StyleProp<ViewStyle>;
}

const DEFAULTS: Record<StatusMessageState, string> = {
  loading: 'Loading…',
  empty: 'Nothing here yet.',
  error: 'Something went wrong.',
};

/**
 * Loading / empty / error feedback — the native mirror of the web
 * `StatusMessage`. `loading` shows an `ActivityIndicator` (tinted from the
 * `primary` token) with an optional message and a polite live region; `empty`
 * is a `muted` message; `error` is a `danger` message announced via the `alert`
 * role + an assertive live region. Token-only. Pairs with `@xenition/ui/data`'s
 * `useResource`.
 */
export function StatusMessage({
  state,
  message,
  style,
}: StatusMessageProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const container: StyleProp<ViewStyle> = [
    {
      alignItems: 'center',
      justifyContent: 'center',
      gap: tokens.spacing.sm,
      paddingVertical: tokens.spacing.xl,
    },
    style,
  ];

  if (state === 'loading') {
    return (
      <View accessibilityLiveRegion="polite" accessibilityLabel={message ?? DEFAULTS.loading} style={container}>
        <ActivityIndicator size="small" color={colors.primary} />
        {message ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center' }}>
            {message}
          </Text>
        ) : null}
      </View>
    );
  }

  if (state === 'error') {
    return (
      <View accessibilityRole="alert" accessibilityLiveRegion="assertive" style={container}>
        <Text style={{ color: colors.dangerText, fontSize: tokens.typography.scale.sm, textAlign: 'center' }}>
          {message ?? DEFAULTS.error}
        </Text>
      </View>
    );
  }

  return (
    <View style={container}>
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center' }}>
        {message ?? DEFAULTS.empty}
      </Text>
    </View>
  );
}
