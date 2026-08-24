import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { SemanticColors } from '../theme';
import { Icon } from '../primitives';
import { withAlpha } from './tint';

export type MailLabelTone = 'neutral' | 'primary' | 'accent' | 'success' | 'warn' | 'danger';
export type MailLabelVariant = 'soft' | 'solid' | 'outline';

const TONE_SLOT: Record<MailLabelTone, keyof SemanticColors> = {
  neutral: 'muted',
  primary: 'primary',
  accent: 'accent',
  success: 'success',
  warn: 'warn',
  danger: 'danger',
};

const ON_SLOT: Partial<Record<MailLabelTone, keyof SemanticColors>> = {
  primary: 'onPrimary',
  accent: 'onAccent',
  success: 'onSuccess',
  warn: 'onWarn',
  danger: 'onDanger',
};

export interface MailLabelChipProps {
  /** Label text (e.g. "Work", "Receipts"). */
  label: string;
  /** Color tone. Default `'neutral'`. */
  tone?: MailLabelTone;
  /** Fill treatment. Default `'soft'`. */
  variant?: MailLabelVariant;
  /** Optional leading glyph (emoji / symbol). */
  glyph?: string;
  /** When provided, renders a removable "×" affordance. */
  onRemove?: () => void;
  /** Tapping the chip (e.g. filter by label). */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A colored label / category chip for mail (Gmail-style labels). `tone` selects
 * a semantic slot and `variant` picks a fill: `soft` tints the tone, `solid`
 * fills it, `outline` rings it — every color resolved from a token (soft fills
 * use a token-derived alpha). Optionally removable via `onRemove`. No literal
 * colors.
 */
export function MailLabelChip({
  label,
  tone = 'neutral',
  variant = 'soft',
  glyph,
  onRemove,
  onPress,
  style,
}: MailLabelChipProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const accent = colors[TONE_SLOT[tone]];
  const onAccent = colors[ON_SLOT[tone] ?? 'onSurface'];

  const solid = variant === 'solid';
  const outline = variant === 'outline';
  const bg = solid ? accent : outline ? 'transparent' : withAlpha(accent, 0.16);
  const fg = solid ? onAccent : accent;

  const body = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.xs,
          alignSelf: 'flex-start',
          paddingVertical: 2,
          paddingHorizontal: tokens.spacing.sm,
          borderRadius: tokens.radius.full,
          backgroundColor: bg,
          borderWidth: outline ? 1 : 0,
          borderColor: outline ? accent : 'transparent',
        },
        style,
      ]}
    >
      {glyph ? <Icon glyph={glyph} size="xs" color={solid ? (ON_SLOT[tone] ?? 'onSurface') : TONE_SLOT[tone]} /> : null}
      <Text
        numberOfLines={1}
        style={{ color: fg, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}
      >
        {label}
      </Text>
      {onRemove ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Remove label ${label}`}
          onPress={onRemove}
          hitSlop={6}
        >
          <Icon glyph="×" size="sm" color={solid ? (ON_SLOT[tone] ?? 'onSurface') : TONE_SLOT[tone]} />
        </Pressable>
      ) : null}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Label ${label}`}
        onPress={onPress}
        style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
      >
        {body}
      </Pressable>
    );
  }
  return body;
}
