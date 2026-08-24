import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';

/** The swipe/deck actions a user can take on a profile. */
export type SwipeAction = 'rewind' | 'pass' | 'superlike' | 'like' | 'boost';

export type LikePassSize = 'sm' | 'md' | 'lg';

export interface LikePassButtonsProps {
  /** Which actions to show, left→right. Defaults to pass · superlike · like. */
  actions?: SwipeAction[];
  /** Fires with the tapped action. */
  onAction?: (action: SwipeAction) => void;
  /** Per-action disable set (e.g. rewind with nothing to undo). */
  disabledActions?: SwipeAction[];
  /** Button scale. Defaults to `md`. */
  size?: LikePassSize;
  style?: StyleProp<ViewStyle>;
}

interface ActionSpec {
  glyph: string;
  label: string;
  slot: keyof SemanticColors;
  emphasis: 'primary' | 'ghost';
}

const SPEC: Record<SwipeAction, ActionSpec> = {
  rewind: { glyph: '↺', label: 'Rewind', slot: 'warn', emphasis: 'ghost' },
  pass: { glyph: '✕', label: 'Pass', slot: 'danger', emphasis: 'ghost' },
  superlike: { glyph: '★', label: 'Super like', slot: 'accent', emphasis: 'ghost' },
  like: { glyph: '♥', label: 'Like', slot: 'success', emphasis: 'ghost' },
  boost: { glyph: '⚡', label: 'Boost', slot: 'primary', emphasis: 'ghost' },
};

const DIAMETER: Record<LikePassSize, number> = { sm: 44, md: 56, lg: 68 };

const DEFAULT_ACTIONS: SwipeAction[] = ['pass', 'superlike', 'like'];

/**
 * The circular action row under a swipe deck — the native like/pass controls.
 * Each action is a round, token-tinted button with a glyph AND an
 * `accessibilityLabel`, so it is never identified by color alone. `onAction`
 * reports which control was pressed. Colors come from semantic tokens and
 * `withAlpha` tints — no literal colors.
 */
export function LikePassButtons({
  actions = DEFAULT_ACTIONS,
  onAction,
  disabledActions,
  size = 'md',
  style,
}: LikePassButtonsProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const disabledSet = React.useMemo(() => new Set(disabledActions ?? []), [disabledActions]);
  const list = actions.length > 0 ? actions : DEFAULT_ACTIONS;

  return (
    <View
      accessibilityRole="toolbar"
      style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.md }, style]}
    >
      {list.map((action) => {
        const spec = SPEC[action];
        const color = colors[spec.slot];
        const d = DIAMETER[size];
        const disabled = disabledSet.has(action);
        return (
          <Pressable
            key={action}
            accessibilityRole="button"
            accessibilityLabel={spec.label}
            accessibilityState={{ disabled }}
            disabled={disabled}
            onPress={() => onAction?.(action)}
            style={({ pressed }) => ({
              width: d,
              height: d,
              borderRadius: d / 2,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: withAlpha(color, 0.12),
              borderWidth: 1,
              borderColor: withAlpha(color, 0.5),
              opacity: disabled ? 0.4 : pressed ? 0.85 : 1,
            })}
          >
            <Text style={{ color, fontSize: Math.round(d * 0.42), fontWeight: '700' }} allowFontScaling={false}>
              {spec.glyph}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
