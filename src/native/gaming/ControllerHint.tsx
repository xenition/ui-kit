import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';

export type ControllerHintVariant = 'pill' | 'inline';
export type ControllerHintSize = 'sm' | 'md';

export interface ControllerHintItem {
  /** The button glyph / label to render in the key cap, e.g. `'A'`, `'▢'`, `'⏵'`. */
  button: string;
  /** What the button does, e.g. `'Jump'`. */
  action: string;
}

export interface ControllerHintProps {
  /** A single hint (shorthand) — or use `hints` for a row of them. */
  button?: string;
  /** Action label for the single-hint shorthand. */
  action?: string;
  /** A row of hints; takes precedence over the `button`/`action` shorthand. */
  hints?: ControllerHintItem[];
  /**
   * - `pill`   — key cap + action inside a bordered pill (default).
   * - `inline` — key cap + action with no surrounding chrome (for a HUD strip).
   */
  variant?: ControllerHintVariant;
  /** Size scale. */
  size?: ControllerHintSize;
  style?: StyleProp<ViewStyle>;
}

const CAP: Record<ControllerHintSize, { box: number; text: 'xs' | 'sm'; label: 'xs' | 'sm' }> = {
  sm: { box: 20, text: 'xs', label: 'xs' },
  md: { box: 26, text: 'sm', label: 'sm' },
};

/**
 * A controller / keybind hint — a rounded "key cap" showing the button glyph
 * next to its action label (e.g. `Ⓐ Jump`). Pass a single `button`/`action`
 * or a `hints` array for a HUD strip. The action text always accompanies the
 * glyph, so the mapping never relies on the symbol alone. Reads only the theme
 * primitive; token-only.
 */
export function ControllerHint({
  button,
  action,
  hints,
  variant = 'pill',
  size = 'md',
  style,
}: ControllerHintProps): React.ReactElement | null {
  const { colors, tokens } = useXenitionTheme();
  const sz = CAP[size];

  const list: ControllerHintItem[] =
    hints && hints.length > 0
      ? hints
      : button != null
        ? [{ button, action: action ?? '' }]
        : [];

  if (list.length === 0) return null;

  const renderHint = (hint: ControllerHintItem, key: React.Key): React.ReactElement => (
    <View
      key={key}
      accessible
      accessibilityRole="text"
      accessibilityLabel={hint.action ? `${hint.action}: ${hint.button}` : hint.button}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.xs,
        ...(variant === 'pill'
          ? {
              borderWidth: 1,
              borderColor: colors.border,
              backgroundColor: colors.surface,
              borderRadius: tokens.radius.full,
              paddingVertical: 3,
              paddingHorizontal: tokens.spacing.sm,
            }
          : null),
      }}
    >
      <View
        style={{
          minWidth: sz.box,
          height: sz.box,
          paddingHorizontal: 4,
          borderRadius: tokens.radius.sm,
          backgroundColor: colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text allowFontScaling={false} style={{ color: colors.onPrimary, fontSize: tokens.typography.scale[sz.text], fontWeight: '700' }}>
          {hint.button}
        </Text>
      </View>
      {hint.action ? (
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale[sz.label] }}>{hint.action}</Text>
      ) : null}
    </View>
  );

  if (list.length === 1) {
    return <View style={style}>{renderHint(list[0]!, 'h0')}</View>;
  }

  return (
    <View style={[{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, style]}>
      {list.map((h, i) => renderHint(h, `h${i}`))}
    </View>
  );
}
