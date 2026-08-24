import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../primitives';
import { formatMoney } from './internal/format';
import { claimStatus } from './internal/status';
import type { ClaimRowProps } from './ClaimRow';

/** Drop-in replacement for {@link ClaimRow} — identical props, distinct design. */
export type ClaimRowV3Props = ClaimRowProps;

/** Status → text-slot key (approved reads success, denied reads danger). */
const TONE_TEXT_SLOT: Record<string, keyof SemanticColors> = {
  neutral: 'muted',
  primary: 'primaryText',
  success: 'successText',
  warn: 'warnText',
  danger: 'dangerText',
  accent: 'accentText',
};

/**
 * ClaimRow, alternate design **V3** — a dense one-liner. A small status dot
 * (colored by the claim tone) sits ahead of the status glyph, then the title
 * and claim number share the line, and the amount + date close it on the right.
 * Status is still glyph + text + color (the glyph and label ride beside the
 * dot, never color-alone). Tight vertical rhythm for long lists. Same
 * `ClaimRowProps`; drops in for `ClaimRow`. Token-pure.
 */
export function ClaimRowV3({
  claimNumber,
  title,
  status,
  amountCents,
  currency = 'USD',
  date,
  formatMoney: format = formatMoney,
  onPress,
  style,
}: ClaimRowV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const colorRec = colors as unknown as Record<string, string>;
  const sd = claimStatus(status);
  const dotColor = sd.tone === 'neutral' ? colors.muted : colorRec[sd.tone] ?? colors.muted;
  const textColor = colorRec[TONE_TEXT_SLOT[sd.tone] ?? 'muted'] ?? colors.muted;

  const row = (
    <View
      style={[
        { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, paddingVertical: tokens.spacing.xs },
        style,
      ]}
    >
      <View
        accessibilityLabel={sd.label}
        style={{
          width: 8,
          height: 8,
          borderRadius: tokens.radius.full,
          backgroundColor: dotColor,
        }}
      />
      <Text
        numberOfLines={1}
        style={{ color: textColor, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}
      >
        {sd.glyph} {sd.label}
      </Text>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
        <Text
          numberOfLines={1}
          style={{ flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}
        >
          {title}
        </Text>
        <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {claimNumber}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
        {amountCents != null ? (
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            {format(Math.max(0, Math.trunc(amountCents)), currency)}
          </Text>
        ) : null}
        {date != null ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{date}</Text>
        ) : null}
      </View>
    </View>
  );

  if (!onPress) return row;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Claim ${claimNumber}, ${title}, ${sd.label}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
    >
      {row}
    </Pressable>
  );
}
