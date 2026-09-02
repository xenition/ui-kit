import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { onToneSlot, toneColor } from './internal';
import type { StatusPillProps } from './StatusPill';

/** Drop-in for {@link StatusPillProps} — same props, the V4 "chambers" design. */
export type StatusPillV4Props = StatusPillProps;

/**
 * StatusPill — **V4** "chambers" design (native twin of the web V4). The
 * distinguished, chambers take on the shared status indicator: a rounded
 * **glyph + word** pill so state is never carried by color alone. The `soft`
 * variant reads as a tone-tinted well with a hairline ring; `solid` fills;
 * `inline` drops the chrome for dense rows. Keeps the base `variant`
 * (`soft` / `inline` / `solid`) and `size` (`sm` / `md`). Color resolves from a
 * compiled token (or a token-tinted `withAlpha`), never a literal.
 */
export function StatusPillV4({ meta, variant = 'soft', size = 'md', style }: StatusPillV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const tint = toneColor(colors, meta.tone);
  const textKey = size === 'sm' ? 'xs' : 'sm';
  const solid = variant === 'solid';
  const inline = variant === 'inline';
  const bg = solid ? tint : inline ? 'transparent' : withAlpha(tint, 0.12);
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
          borderWidth: !solid && !inline ? 1 : 0,
          borderColor: !solid && !inline ? withAlpha(tint, 0.24) : 'transparent',
          paddingVertical: inline ? 0 : size === 'sm' ? 2 : 3,
          paddingHorizontal: inline ? 0 : tokens.spacing.sm,
        },
        style,
      ]}
    >
      <Text allowFontScaling={false} style={{ color: fg, fontSize: tokens.typography.scale[textKey], lineHeight: tokens.typography.scale[textKey] * 1.2 }}>
        {meta.glyph}
      </Text>
      <Text style={{ color: fg, fontSize: tokens.typography.scale[textKey], fontWeight: '700' }}>{meta.label}</Text>
    </View>
  );
}
