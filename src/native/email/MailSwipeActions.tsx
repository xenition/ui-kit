import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { SemanticColors } from '../theme';
import { Icon } from '../primitives';

export type SwipeActionTone = 'neutral' | 'primary' | 'success' | 'warn' | 'danger';

const TONE_BG: Record<SwipeActionTone, keyof SemanticColors> = {
  neutral: 'muted',
  primary: 'primary',
  success: 'success',
  warn: 'warn',
  danger: 'danger',
};

const TONE_FG: Record<SwipeActionTone, keyof SemanticColors> = {
  neutral: 'surface',
  primary: 'onPrimary',
  success: 'onSuccess',
  warn: 'onWarn',
  danger: 'onDanger',
};

export interface SwipeAction {
  id: string;
  /** Glyph rendered above the label. */
  glyph: string;
  /** Short label (e.g. "Archive", "Delete"). */
  label: string;
  /** Color tone of the action panel. Default `'neutral'`. */
  tone?: SwipeActionTone;
  onPress?: () => void;
}

export interface MailSwipeActionsProps {
  /** Action panels to render (leading or trailing swipe reveal). */
  actions: SwipeAction[];
  /** Which edge these belong to — affects fill direction. Default `'trailing'`. */
  side?: 'leading' | 'trailing';
  style?: StyleProp<ViewStyle>;
}

/**
 * The revealed action panels behind a swipeable mail row (this is the static
 * action rail — the host supplies the gesture/animation). Each action is a
 * full-height, toned button with a glyph + label; tones map to semantic slots
 * (danger for delete, warn for snooze, etc). Renders nothing when `actions` is
 * empty. No literal colors.
 */
export function MailSwipeActions({
  actions,
  side = 'trailing',
  style,
}: MailSwipeActionsProps): React.ReactElement | null {
  const { colors, tokens } = useXenitionTheme();
  const safe = actions ?? [];
  if (safe.length === 0) return null;

  return (
    <View
      accessibilityRole="toolbar"
      style={[
        { flexDirection: side === 'leading' ? 'row' : 'row-reverse', alignItems: 'stretch' },
        style,
      ]}
    >
      {safe.map((a) => {
        const tone = a.tone ?? 'neutral';
        return (
          <Pressable
            key={a.id}
            accessibilityRole="button"
            accessibilityLabel={a.label}
            onPress={a.onPress}
            style={({ pressed }) => ({
              minWidth: 72,
              paddingHorizontal: tokens.spacing.md,
              paddingVertical: tokens.spacing.md,
              alignItems: 'center',
              justifyContent: 'center',
              gap: tokens.spacing.xs,
              backgroundColor: colors[TONE_BG[tone]],
              opacity: pressed ? 0.85 : 1,
            })}
          >
            <Icon glyph={a.glyph} size="lg" color={TONE_FG[tone]} />
            <Text
              numberOfLines={1}
              style={{ color: colors[TONE_FG[tone]], fontSize: tokens.typography.scale.xs, fontWeight: '600' }}
            >
              {a.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
