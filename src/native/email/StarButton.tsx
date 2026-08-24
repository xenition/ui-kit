import * as React from 'react';
import { Pressable, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives';

type IconSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | number;

export interface StarButtonProps {
  /** Controlled starred state. */
  starred?: boolean;
  /** Fires with the next starred value when tapped. */
  onToggle?: (starred: boolean) => void;
  /** Glyph size (typography scale key or raw px). Default `'lg'`. */
  size?: IconSize;
  /** Block interaction and dim. */
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A star / flag toggle for a mail item. Filled (warn accent) when `starred`,
 * hollow + muted otherwise. Exposes a `button` role whose label announces the
 * state in words ("Starred" / "Not starred") so the toggle is never conveyed by
 * color alone. Controlled via `starred` / `onToggle`. No literal colors.
 */
export function StarButton({
  starred = false,
  onToggle,
  size = 'lg',
  disabled = false,
  style,
}: StarButtonProps): React.ReactElement {
  const { tokens } = useXenitionTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={starred ? 'Starred' : 'Not starred'}
      accessibilityState={{ selected: starred, disabled }}
      disabled={disabled}
      onPress={() => onToggle?.(!starred)}
      hitSlop={8}
      style={({ pressed }) => [
        { padding: tokens.spacing.xs, opacity: disabled ? 0.5 : pressed ? 0.6 : 1 },
        style,
      ]}
    >
      <Icon glyph={starred ? '★' : '☆'} size={size} color={starred ? 'warn' : 'muted'} />
    </Pressable>
  );
}
