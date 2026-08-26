import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { SemanticColors } from '../theme';
import { mixToken } from '../../primitives/internal/v4-depth';
import { resolveIconGlyph } from '../../primitives/icon-names';
import { ensureContrast } from '../../theme/color';
import { MIN_CONTRAST } from '../../theme/compile';
import type { TagProps, TagSize, TagTone, TagVariant } from './Tag';

export type { TagProps as TagV4Props, TagSize, TagTone, TagVariant };

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

const TONE: Record<TagTone, ToneSlots> = {
  neutral: { solidBg: 'border', solidFg: 'onSurface', accent: 'onSurface', text: 'onSurface' },
  primary: { solidBg: 'primary', solidFg: 'onPrimary', accent: 'primary', text: 'primaryText' },
  success: { solidBg: 'success', solidFg: 'onSuccess', accent: 'success', text: 'successText' },
  warn: { solidBg: 'warn', solidFg: 'onWarn', accent: 'warn', text: 'warnText' },
  danger: { solidBg: 'danger', solidFg: 'onDanger', accent: 'danger', text: 'dangerText' },
  accent: { solidBg: 'accent', solidFg: 'onAccent', accent: 'accent', text: 'accentText' },
};

/** How much accent the soft variant carries — enough to read as a tone, not a fill. */
const SOFT_MIX = 0.14;

/**
 * The platform minimum touch target. Not a design token: it is a property of
 * fingers, and it does not move when the seed does.
 */
const MIN_TAP = 44;

/**
 * **V4 tag** — same props as {@link Tag}, a different design line.
 *
 * A tag is the badge's interactive sibling — a filter you can drop, a keyword
 * you can take off — and it inherits the badge's ground problem plus one of
 * its own.
 *
 * **The ground.** `soft` tinted at 14% *alpha*, so it was a different colour on
 * the page, on a filled card and on glass, while its label carried a contrast
 * guarantee measured against exactly one of the three. `outline` had no fill at
 * all. V4 tags own their ground the way `BadgeV4` does: `soft` composites the
 * same tint into `surface` **opaquely**, `outline` paints `surface` behind its
 * ring, and every label is re-run through `ensureContrast` against the fill the
 * tag actually painted.
 *
 * **The target.** The remove affordance was a 12px `×` with 8px of hit slop —
 * about 28px square, well under the 44px a finger needs, on a control whose
 * entire purpose is to be tapped. V4 keeps the glyph exactly as small (a chip
 * that grows to 44px is not a chip any more) and grows only the *touch* area,
 * so the tag looks identical and stops being a miss.
 *
 * The corner stays `radius.sm` — the brand's own. A tag is a word, and §8 lists
 * excessive pill-shaped controls among the tells of generic AI UI; a `sharp`
 * seed gets square tags rather than capsules. The remove glyph comes from the
 * kit's named icon set (`close`), so it cannot drift from the `×` on the next
 * screen.
 */
export function TagV4({
  tone = 'neutral',
  variant = 'solid',
  size = 'md',
  removable = false,
  dot = false,
  onRemove,
  style,
  children,
}: TagProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const spacing = tokens.spacing;
  const slots = TONE[tone];
  const accent = colors[slots.accent];

  let bg: string;
  let fg: string;
  let borderWidth = 0;
  let borderColor = 'transparent';
  if (variant === 'solid') {
    bg = colors[slots.solidBg];
    fg = colors[slots.solidFg];
  } else if (variant === 'soft') {
    // Opaque, not translucent: the tag decides its own colour instead of
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
  // Re-measured against the fill this tag painted, not against the page.
  fg = ensureContrast(fg, bg, MIN_CONTRAST);

  // The same rhythm as `BadgeV4`: a tag and a badge sitting in one row are the
  // same object at different levels of interactivity, and should line up.
  const height = size === 'sm' ? spacing.md + spacing.xs : spacing.lg;
  const padX = size === 'sm' ? spacing.sm : spacing.sm + spacing.xs;
  const dotSize = size === 'sm' ? spacing.sm * 0.75 : spacing.sm;

  const showRemove = removable || onRemove != null;
  const glyphBox = spacing.md;
  // Grow the touch area, never the chip: a 44px tag is not a tag.
  const slop = Math.max(0, Math.round((MIN_TAP - glyphBox) / 2));

  return (
    <View
      style={[
        {
          alignSelf: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          gap: spacing.xs,
          minHeight: height,
          backgroundColor: bg,
          borderWidth,
          borderColor,
          // A tag is a word, not a capsule (§8).
          borderRadius: tokens.radius.sm,
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
      {typeof children === 'string' ? (
        <Text
          style={{
            color: fg,
            fontSize: tokens.typography.scale.xs,
            fontFamily: tokens.typography.fontBody,
            fontWeight: '600',
          }}
        >
          {children}
        </Text>
      ) : (
        children
      )}
      {showRemove ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Remove"
          onPress={onRemove}
          hitSlop={{ top: slop, bottom: slop, left: slop, right: slop }}
          style={{
            width: glyphBox,
            height: glyphBox,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              color: fg,
              fontSize: tokens.typography.scale.xs,
              fontFamily: tokens.typography.fontBody,
            }}
          >
            {resolveIconGlyph('close')}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
