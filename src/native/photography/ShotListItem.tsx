import * as React from 'react';
import {
  Pressable,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge } from '../primitives/Badge';
import { Icon } from '../primitives/Icon';

/** Priority of a shot-list entry. */
export type ShotPriority = 'must' | 'nice' | 'optional';

const PRIORITY_LABEL: Record<ShotPriority, string> = {
  must: 'Must-have',
  nice: 'Nice-to-have',
  optional: 'Optional',
};

export interface ShotListItemProps {
  /** The shot description (e.g. "Bride & groom first look"). */
  title: string;
  /** Notes / setup line (pose, lens, lighting). */
  notes?: string;
  /** Whether the shot has been captured. */
  done?: boolean;
  /** Priority tag (shown as a labelled badge). */
  priority?: ShotPriority;
  /** Toggles the captured state when the row is pressed. */
  onToggle?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A shot-list checklist row — a check affordance, the shot title (struck when
 * `done`), an optional notes line, and a priority `Badge`. The whole row is a
 * `checkbox` when `onToggle` is provided: its captured state is announced via
 * the accessibility `checked` state and a ✓ glyph, never color alone. Composes
 * `Icon` and `Badge`. Token-only colors.
 */
export function ShotListItem({
  title,
  notes,
  done = false,
  priority,
  onToggle,
  style,
}: ShotListItemProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const rowStyle: StyleProp<ViewStyle> = [
    {
      flexDirection: 'row',
      alignItems: 'center',
      gap: tokens.spacing.md,
      paddingVertical: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.md,
      borderRadius: tokens.radius.md,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
    },
    style,
  ];

  const checkbox = (
    <View
      style={{
        width: 24,
        height: 24,
        borderRadius: tokens.radius.sm,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: done ? 0 : 1,
        borderColor: colors.border,
        backgroundColor: done ? colors.success : 'transparent',
      }}
    >
      {done ? <Icon glyph="✓" size="sm" color="onSuccess" /> : null}
    </View>
  );

  const inner = (
    <>
      {checkbox}
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={2}
          style={{
            color: done ? colors.muted : colors.onSurface,
            fontSize: tokens.typography.scale.base,
            fontWeight: '600',
            textDecorationLine: done ? 'line-through' : 'none',
          }}
        >
          {title}
        </Text>
        {notes ? (
          <Text numberOfLines={2} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {notes}
          </Text>
        ) : null}
      </View>
      {priority ? (
        <Badge tone={priority === 'must' ? 'danger' : 'neutral'} variant="soft" size="sm">
          {PRIORITY_LABEL[priority]}
        </Badge>
      ) : null}
    </>
  );

  if (onToggle) {
    return (
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked: done }}
        accessibilityLabel={title}
        onPress={onToggle}
        style={({ pressed }) => [rowStyle, { opacity: pressed ? 0.9 : 1 }]}
      >
        {inner}
      </Pressable>
    );
  }

  return <View style={rowStyle}>{inner}</View>;
}
