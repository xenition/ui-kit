import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { SemanticColors } from '../theme';

export type AlertTone = 'info' | 'success' | 'warn' | 'danger';
export type AlertVariant = 'subtle' | 'solid' | 'outline';

export interface AlertProps {
  tone?: AlertTone;
  /** Surface treatment. `subtle` (default) is the bordered left-rule card. */
  variant?: AlertVariant;
  /** Bold heading above the body. */
  title?: React.ReactNode;
  /** Renders a dismiss (✕) button that calls this. */
  onClose?: () => void;
  /** Optional leading icon/glyph. */
  icon?: React.ReactNode;
  /** Optional trailing action (e.g. a button/link). */
  action?: React.ReactNode;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/** Tone → [rule/accent slot, text-on-solid slot]. `warn`→accent (no warn card slot). */
const TONE: Record<AlertTone, [keyof SemanticColors, keyof SemanticColors]> = {
  info: ['primary', 'onPrimary'],
  success: ['success', 'onSuccess'],
  warn: ['accent', 'onAccent'],
  danger: ['danger', 'onDanger'],
};

/** Token-derived translucent tint (no literal hex; mirrors GlassPanel). */
function withAlpha(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Inline, optionally dismissible alert — the native mirror of the web `Alert`.
 * The default (`subtle`) is a token-bound surface with a colored left rule
 * keyed to the tone (`info`→primary, `success`→success, `warn`→accent,
 * `danger`→danger). Additive `variant`s `solid` (filled) and `outline` layer
 * on top without changing the default. The `danger` tone announces via the
 * `alert` role; the rest use `summary`. No literal colors.
 */
export function Alert({
  tone = 'info',
  variant = 'subtle',
  title,
  onClose,
  icon,
  action,
  children,
  style,
}: AlertProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const [accentSlot, onAccentSlot] = TONE[tone];
  const ruleColor = colors[accentSlot];
  const onSolid = colors[onAccentSlot];

  // Per-variant surface. `subtle` is pinned to the historical look.
  let bg = colors.surface;
  let borderColor = colors.border;
  let borderWidth = 1;
  let borderLeftWidth = 4;
  let borderLeftColor = ruleColor;
  let titleColor = ruleColor;
  let bodyColor = colors.onSurface;
  let closeColor = colors.muted;
  if (variant === 'solid') {
    bg = ruleColor;
    borderWidth = 0;
    borderLeftWidth = 0;
    borderLeftColor = 'transparent';
    titleColor = onSolid;
    bodyColor = onSolid;
    closeColor = onSolid;
  } else if (variant === 'outline') {
    bg = withAlpha(ruleColor, 0.06);
    borderColor = ruleColor;
  }

  return (
    <View
      accessibilityRole={tone === 'danger' ? 'alert' : 'summary'}
      style={[
        {
          flexDirection: 'row',
          gap: tokens.spacing.sm,
          backgroundColor: bg,
          borderColor,
          borderWidth,
          borderLeftWidth,
          borderLeftColor,
          borderRadius: tokens.radius.md,
          padding: tokens.spacing.md,
        },
        style,
      ]}
    >
      {icon != null ? <View style={{ marginTop: 2 }}>{icon}</View> : null}
      <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs }}>
        {title != null ? (
          typeof title === 'string' ? (
            <Text
              style={{
                fontSize: tokens.typography.scale.sm,
                fontWeight: '600',
                color: titleColor,
              }}
            >
              {title}
            </Text>
          ) : (
            title
          )
        ) : null}
        {children != null ? (
          typeof children === 'string' ? (
            <Text style={{ fontSize: tokens.typography.scale.sm, color: bodyColor }}>
              {children}
            </Text>
          ) : (
            children
          )
        ) : null}
        {action != null ? <View style={{ marginTop: tokens.spacing.xs }}>{action}</View> : null}
      </View>
      {onClose ? (
        <Pressable accessibilityRole="button" accessibilityLabel="Dismiss" onPress={onClose} hitSlop={8}>
          <Text style={{ fontSize: tokens.typography.scale.base, color: closeColor }}>✕</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
