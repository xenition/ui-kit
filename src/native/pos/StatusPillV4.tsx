import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { toneColor, onToneSlot, withAlpha } from './internal';
import type { StatusPillProps } from './StatusPill';

/** Drop-in for {@link StatusPillProps} — same props, the V4 "register" design. */
export type StatusPillV4Props = StatusPillProps;

/**
 * StatusPill — **V4** "register" design. A refined, tactile status chip: the same
 * **glyph + word** contract (state never by color alone), rendered as a crisp
 * soft-tint rounded pill with a touch more presence — bolder label, a hair more
 * padding for legibility at the counter. Color always resolves from a compiled
 * token via {@link toneColor} (or a token-tinted `withAlpha`) for the base's
 * tone, never a literal. `inline` drops the pill chrome for dense rows; `solid`
 * fills. Same props/behavior as {@link StatusPillProps} (tones + sizes
 * preserved); token-only tints via `useXenitionTheme()`.
 */
export function StatusPillV4({
  meta,
  variant = 'soft',
  size = 'md',
  style,
}: StatusPillV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const tint = toneColor(colors, meta.tone);
  const textKey = size === 'sm' ? 'xs' : 'sm';

  const solid = variant === 'solid';
  const inline = variant === 'inline';
  const bg = solid ? tint : inline ? 'transparent' : withAlpha(tint, 0.14);
  const fg = solid ? colors[onToneSlot(meta.tone)] : tint;

  return (
    <View
      accessibilityLabel={meta.label}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-start',
          gap: tokens.spacing.xs / 2,
          backgroundColor: bg,
          borderRadius: tokens.radius.full,
          paddingVertical: inline ? 0 : size === 'sm' ? 2 : 3,
          paddingHorizontal: inline ? 0 : size === 'sm' ? tokens.spacing.xs : tokens.spacing.sm,
        },
        style,
      ]}
    >
      <Text
        allowFontScaling={false}
        style={{
          color: fg,
          fontSize: tokens.typography.scale[textKey],
          lineHeight: tokens.typography.scale[textKey] * 1.2,
        }}
      >
        {meta.glyph}
      </Text>
      <Text style={{ color: fg, fontSize: tokens.typography.scale[textKey], fontWeight: '700' }}>
        {meta.label}
      </Text>
    </View>
  );
}
