import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';

/** The three RSVP states plus `null` for "no response yet". */
export type RSVPStatus = 'going' | 'maybe' | 'declined';

export type RSVPButtonSize = 'sm' | 'md';

export interface RSVPButtonProps {
  /** The current selection, or `null`/`undefined` when unanswered. */
  value?: RSVPStatus | null;
  /** Fires with the tapped status (tapping the active one keeps it selected). */
  onChange?: (status: RSVPStatus) => void;
  /** Control size. */
  size?: RSVPButtonSize;
  /** Disable the whole control. */
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

interface Option {
  status: RSVPStatus;
  label: string;
  /** A distinct glyph so state is conveyed by shape + text, not color alone. */
  glyph: string;
  /** Semantic accent slot used when this option is selected. */
  tone: keyof SemanticColors;
  onTone: keyof SemanticColors;
}

const OPTIONS: Option[] = [
  { status: 'going', label: 'Going', glyph: '✓', tone: 'success', onTone: 'onSuccess' },
  { status: 'maybe', label: 'Maybe', glyph: '?', tone: 'warn', onTone: 'onWarn' },
  { status: 'declined', label: "Can't go", glyph: '✕', tone: 'danger', onTone: 'onDanger' },
];

/**
 * Segmented RSVP control with `going` / `maybe` / `declined` states. The
 * selected state is communicated three ways — a filled background, a distinct
 * glyph (✓ / ? / ✕), and `accessibilityState.selected` — so it is never
 * conveyed by color alone (WCAG 1.4.1). Colors come from the compiled theme
 * tokens; no literal colors.
 */
export function RSVPButton({
  value,
  onChange,
  size = 'md',
  disabled = false,
  style,
}: RSVPButtonProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const padV = size === 'sm' ? tokens.spacing.xs : tokens.spacing.sm;
  const fontSize = size === 'sm' ? tokens.typography.scale.xs : tokens.typography.scale.sm;

  return (
    <View
      accessibilityRole="radiogroup"
      style={[
        {
          flexDirection: 'row',
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: colors.border,
          overflow: 'hidden',
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {OPTIONS.map((opt, i) => {
        const selected = value === opt.status;
        return (
          <Pressable
            key={opt.status}
            accessibilityRole="radio"
            accessibilityState={{ selected, disabled }}
            accessibilityLabel={opt.label}
            disabled={disabled}
            onPress={() => onChange?.(opt.status)}
            style={({ pressed }) => ({
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: tokens.spacing.xs,
              paddingVertical: padV,
              paddingHorizontal: tokens.spacing.sm,
              borderLeftWidth: i === 0 ? 0 : 1,
              borderLeftColor: colors.border,
              backgroundColor: selected ? colors[opt.tone] : pressed ? tokens.ramps.neutral[100] : colors.surface,
            })}
          >
            <Text style={{ color: selected ? colors[opt.onTone] : colors.muted, fontSize, fontWeight: '700' }}>
              {opt.glyph}
            </Text>
            <Text
              style={{
                color: selected ? colors[opt.onTone] : colors.onSurface,
                fontSize,
                fontWeight: selected ? '700' : '500',
              }}
            >
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
