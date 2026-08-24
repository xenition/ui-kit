import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge } from '../primitives';
import { OUTCOME_META, toneColor, type DealOutcome } from './internal';

export type WinLossSize = 'sm' | 'md';
export type WinLossVariant = 'badge' | 'inline';

export interface WinLossBadgeProps {
  /** Deal result. `won` reads success, `lost` reads danger — plus a glyph. */
  outcome: DealOutcome;
  /** `badge` (default) is a filled pill; `inline` is a bare glyph + label. */
  variant?: WinLossVariant;
  size?: WinLossSize;
  /** Hide the text label, leaving only the glyph (still a11y-labelled). */
  hideLabel?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * Outcome badge for a deal — `won` / `lost` / `open` / `pending`. The result is
 * carried by a glyph **and** a word (never color alone): won `✓`, lost `✕`,
 * open `◔`, pending `⋯`. Won maps to the `success` token, lost to `danger`. Use
 * the `badge` variant on cards and the `inline` variant inside dense rows. All
 * colors come from the theme via the tone map — no literals.
 */
export function WinLossBadge({
  outcome,
  variant = 'badge',
  size = 'md',
  hideLabel = false,
  style,
}: WinLossBadgeProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = OUTCOME_META[outcome];
  const label = `${meta.label} deal`;

  if (variant === 'inline') {
    const color = toneColor(colors, meta.tone);
    const fontSize = tokens.typography.scale[size === 'sm' ? 'xs' : 'sm'];
    return (
      <View
        accessibilityRole="text"
        accessibilityLabel={label}
        style={[{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, style]}
      >
        <Text allowFontScaling={false} style={{ fontSize, color }}>
          {meta.glyph}
        </Text>
        {hideLabel ? null : (
          <Text style={{ fontSize, color, fontWeight: '600' }}>{meta.label}</Text>
        )}
      </View>
    );
  }

  return (
    <View accessibilityRole="text" accessibilityLabel={label} style={[{ alignSelf: 'flex-start' }, style]}>
      <Badge tone={meta.tone} variant="soft" size={size}>
        {hideLabel ? meta.glyph : `${meta.glyph} ${meta.label}`}
      </Badge>
    </View>
  );
}
