import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { SemanticColors } from '../theme';
import { mixToken } from '../../primitives/internal/v4-depth';
import { ensureContrast } from '../../theme/color';
import { MIN_CONTRAST } from '../../theme/compile';
import type { BadgeProps, BadgeSize, BadgeTone, BadgeVariant } from './Badge';

export type { BadgeProps as BadgeV4Props, BadgeSize, BadgeTone, BadgeVariant };

interface ToneSlots {
  /** Filled background slot. */
  solidBg: keyof SemanticColors;
  /** Text on the filled background (a compiler-guaranteed pair). */
  solidFg: keyof SemanticColors;
  /** Vivid accent for the soft tint, the outline ring and the dot. */
  accent: keyof SemanticColors;
  /** The same accent as text on `surface`. */
  text: keyof SemanticColors;
}

const TONE: Record<BadgeTone, ToneSlots> = {
  neutral: { solidBg: 'border', solidFg: 'onSurface', accent: 'onSurface', text: 'onSurface' },
  primary: { solidBg: 'primary', solidFg: 'onPrimary', accent: 'primary', text: 'primaryText' },
  success: { solidBg: 'success', solidFg: 'onSuccess', accent: 'success', text: 'successText' },
  warn: { solidBg: 'warn', solidFg: 'onWarn', accent: 'warn', text: 'warnText' },
  danger: { solidBg: 'danger', solidFg: 'onDanger', accent: 'danger', text: 'dangerText' },
  accent: { solidBg: 'accent', solidFg: 'onAccent', accent: 'accent', text: 'accentText' },
};

/** How much accent the soft variant carries. Enough to read as a tone, not a fill. */
const SOFT_MIX = 0.14;

/**
 * **V4 badge** — same props as {@link Badge}, a different design line.
 *
 * The base badge is correct on one ground and only one: the page. `soft` tints
 * with 14% alpha, `outline` has no fill at all, and both label themselves with
 * a colour whose contrast was measured against `surface`. Drop either onto a
 * filled card, a glass panel, or artwork and the ground underneath changes the
 * fill, the label, or both — and the guarantee that made it readable was never
 * about that ground.
 *
 * So V4 badges **own their ground**:
 *
 * - `solid` fills with the tone and labels with its guaranteed on-pair.
 * - `soft` composites the same 14% tint into `surface` **opaquely**, so it is
 *   a real colour rather than a translucent one that borrows whatever is
 *   behind it.
 * - `outline` keeps its ring and paints `surface` behind it, so the label has
 *   the ground its contrast was measured against.
 *
 * Every label is then run through `ensureContrast` against the fill the badge
 * actually painted, so the promise is about this badge rather than about the
 * page it was designed on.
 *
 * Shape follows the seed rather than defaulting to a capsule: a count or a
 * status dot is round by nature and keeps `radius.full`, but a text tag takes
 * `radius.sm` — so a `sharp` brand gets square tags instead of the pills
 * `design.md` §8 lists among the tells of generic AI UI.
 */
export function BadgeV4({
  tone = 'neutral',
  variant = 'solid',
  size = 'md',
  dot = false,
  count,
  max = 99,
  style,
  children,
}: BadgeProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const slots = TONE[tone];
  const accent = colors[slots.accent];

  const label = count !== undefined ? (count > max ? `${max}+` : String(count)) : children;

  let bg: string;
  let fg: string;
  let borderWidth = 0;
  let borderColor = 'transparent';
  if (variant === 'solid') {
    bg = colors[slots.solidBg];
    fg = colors[slots.solidFg];
  } else if (variant === 'soft') {
    // Opaque, not translucent: the badge decides its own colour instead of
    // inheriting one from whatever it happens to be sitting on.
    bg = mixToken(colors.surface, accent, SOFT_MIX);
    fg = colors[slots.text];
  } else {
    bg = colors.surface;
    fg = colors[slots.text];
    borderWidth = 1;
    // A border is a UI boundary judged at 3:1, not text — it keeps the accent.
    borderColor = accent;
  }
  // Re-measured against the fill this badge painted, not against the page.
  fg = ensureContrast(fg, bg, MIN_CONTRAST);

  const spacing = tokens.spacing;
  const height = size === 'sm' ? spacing.md + spacing.xs : spacing.lg;
  const padX = size === 'sm' ? spacing.sm : spacing.sm + spacing.xs;
  const dotSize = size === 'sm' ? spacing.sm * 0.75 : spacing.sm;

  // A count or a dot is round by nature; a word is a tag, and takes the
  // brand's own corner instead of defaulting to a capsule (§8).
  const pill = dot || count !== undefined;

  return (
    <View
      style={[
        {
          alignSelf: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: spacing.xs,
          minHeight: height,
          minWidth: pill ? height : undefined,
          backgroundColor: bg,
          borderWidth,
          borderColor,
          borderRadius: pill ? tokens.radius.full : tokens.radius.sm,
          paddingHorizontal: padX,
        },
        style,
      ]}
    >
      {dot ? (
        <View
          style={{
            width: dotSize,
            height: dotSize,
            borderRadius: dotSize / 2,
            backgroundColor: ensureContrast(accent, bg, 3),
          }}
        />
      ) : null}
      {typeof label === 'string' ? (
        <Text
          style={{
            color: fg,
            fontSize: tokens.typography.scale.xs,
            fontFamily: tokens.typography.fontBody,
            fontWeight: '600',
          }}
        >
          {label}
        </Text>
      ) : (
        label
      )}
    </View>
  );
}
