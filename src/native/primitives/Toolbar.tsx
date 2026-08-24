import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface ToolbarAction {
  key: string;
  label: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  /** Tint the label with `colors.danger` (destructive). */
  destructive?: boolean;
}

export interface ToolbarProps {
  /** Optional leading title. */
  title?: React.ReactNode;
  /** Inline action buttons (left→right). */
  actions?: ToolbarAction[];
  /** Actions collapsed behind a `⋯` overflow toggle. */
  overflowActions?: ToolbarAction[];
  style?: StyleProp<ViewStyle>;
}

/**
 * Horizontal action bar: an optional title, a row of inline action buttons, and
 * an optional `⋯` overflow that reveals extra actions in an inline panel below.
 * All colors, radii and spacing come from the compiled theme tokens via
 * `useXenitionTheme()` — no literal colors.
 */
export function Toolbar({
  title,
  actions = [],
  overflowActions = [],
  style,
}: ToolbarProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const [overflowOpen, setOverflowOpen] = React.useState(false);

  const renderAction = (action: ToolbarAction, inMenu: boolean): React.ReactElement => {
    const color = action.disabled
      ? colors.muted
      : action.destructive
        ? colors.danger
        : colors.primary;
    return (
      <Pressable
        key={action.key}
        accessibilityRole="button"
        accessibilityState={{ disabled: action.disabled }}
        disabled={action.disabled}
        onPress={() => {
          setOverflowOpen(false);
          action.onPress?.();
        }}
        style={{
          paddingHorizontal: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
          borderRadius: tokens.radius.sm,
          alignSelf: inMenu ? 'stretch' : undefined,
        }}
      >
        {typeof action.label === 'string' ? (
          <Text style={{ color, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>{action.label}</Text>
        ) : (
          action.label
        )}
      </Pressable>
    );
  };

  return (
    <View style={style}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.xs,
          paddingHorizontal: tokens.spacing.sm,
          paddingVertical: tokens.spacing.xs,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: tokens.radius.md,
          backgroundColor: colors.surface,
        }}
      >
        {title != null ? (
          typeof title === 'string' ? (
            <Text
              numberOfLines={1}
              style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
            >
              {title}
            </Text>
          ) : (
            <View style={{ flex: 1 }}>{title}</View>
          )
        ) : (
          <View style={{ flex: 1 }} />
        )}
        {actions.map((a) => renderAction(a, false))}
        {overflowActions.length > 0 ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="More actions"
            accessibilityState={{ expanded: overflowOpen }}
            onPress={() => setOverflowOpen((o) => !o)}
            style={{ paddingHorizontal: tokens.spacing.sm, paddingVertical: tokens.spacing.sm, borderRadius: tokens.radius.sm }}
          >
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>⋯</Text>
          </Pressable>
        ) : null}
      </View>

      {overflowOpen && overflowActions.length > 0 ? (
        <View
          style={{
            marginTop: tokens.spacing.xs,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: tokens.radius.md,
            backgroundColor: colors.surface,
            paddingVertical: tokens.spacing.xs,
          }}
        >
          {overflowActions.map((a) => renderAction(a, true))}
        </View>
      ) : null}
    </View>
  );
}
