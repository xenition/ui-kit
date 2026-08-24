import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface ChatBubbleProps {
  /** 'me' aligns right with the primary fill; 'them' aligns left with a surface fill. */
  side?: 'me' | 'them';
  /** Optional author / timestamp shown above the bubble. */
  meta?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

/**
 * A single themed chat message bubble — the native mirror of the web
 * `ChatBubble`. For chat, support threads, comments. No literal colors.
 */
export function ChatBubble({
  side = 'them',
  meta,
  style,
  children,
}: ChatBubbleProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const me = side === 'me';
  return (
    <View style={[{ gap: tokens.spacing.xs, alignItems: me ? 'flex-end' : 'flex-start' }, style]}>
      {meta != null ? (
        typeof meta === 'string' ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{meta}</Text>
        ) : (
          meta
        )
      ) : null}
      <View
        style={{
          maxWidth: '75%',
          borderRadius: tokens.radius.lg,
          paddingHorizontal: tokens.spacing.md,
          paddingVertical: tokens.spacing.sm,
          backgroundColor: me ? colors.primary : colors.surface,
          borderWidth: me ? 0 : 1,
          borderColor: colors.border,
        }}
      >
        {typeof children === 'string' ? (
          <Text
            style={{
              color: me ? colors.onPrimary : colors.onSurface,
              fontSize: tokens.typography.scale.base,
            }}
          >
            {children}
          </Text>
        ) : (
          children
        )}
      </View>
    </View>
  );
}
