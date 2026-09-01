import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { appearanceStyle } from '../primitives/internal/appearance';
import type { DateSeparatorProps } from './DateSeparator';

export type { DateSeparatorProps as DateSeparatorV4Props };

/**
 * **V4 date separator** — same props as {@link DateSeparator}.
 *
 * ## Two changes
 *
 * 1. **It is a heading, not a caption.** A date separator is the only
 *    landmark in a long thread; marking it `header` is what lets a screen
 *    reader jump between days instead of scrolling through every message.
 * 2. **The pill takes the card ground and `mutedText`**, where the base used
 *    `surface` — the same colour as the page behind it — so the chip read as
 *    floating text rather than a marker.
 */
export function DateSeparatorV4({
  label,
  appearance = 'classic',
  style,
}: DateSeparatorProps): React.ReactElement | null {
  const { colors, tokens } = useXenitionTheme();
  if (!label) return null;

  return (
    <View style={[{ alignItems: 'center', paddingVertical: tokens.spacing.sm }, style]}>
      <View
        style={{
          ...appearanceStyle(appearance, colors, tokens),
          backgroundColor: colors.card,
          borderRadius: tokens.radius.full,
          paddingHorizontal: tokens.spacing.md,
          paddingVertical: tokens.spacing.xs,
        }}
      >
        <TextV4 accessibilityRole="header" size="xs" weight="semibold" tone="mutedText">
          {label}
        </TextV4>
      </View>
    </View>
  );
}
