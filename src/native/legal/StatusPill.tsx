import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { onToneSlot, toneColor, type StatusMeta } from './internal';

export type StatusPillVariant = 'soft' | 'inline' | 'solid';
export type StatusPillSize = 'sm' | 'md';

export interface StatusPillProps {
  /** The glyph + label + tone triple to render. */
  meta: StatusMeta;
  /** `soft` (default) tints the tone; `inline` is a bare glyph+word; `solid` fills. */
  variant?: StatusPillVariant;
  size?: StatusPillSize;
  style?: StyleProp<ViewStyle>;
}

/**
 * Reusable status indicator for the legal module — renders a {@link StatusMeta}
 * as a **glyph + word** pill so state is never conveyed by color alone. Color
 * always resolves from a compiled token via {@link toneColor} (or a token-tinted
 * `withAlpha`), never a literal. `inline` drops the pill chrome for use inside a
 * dense row. Not domain-specific; every legal block composes it.
 */
export function StatusPill({
  meta,
  variant = 'soft',
  size = 'md',
  style,
}: StatusPillProps): React.ReactElement {
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
          paddingVertical: inline ? 0 : size === 'sm' ? 1 : 2,
          paddingHorizontal: inline ? 0 : tokens.spacing.xs,
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
      <Text style={{ color: fg, fontSize: tokens.typography.scale[textKey], fontWeight: '600' }}>
        {meta.label}
      </Text>
    </View>
  );
}
