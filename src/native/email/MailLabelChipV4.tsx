import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { mixToken } from '../../primitives/internal/v4-depth';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { toneFill } from '../primitives/internal/tone-v4';
import { labelInk, onPair, type ToneV4 } from './internal/mail-v4';
import type { MailLabelChipProps, MailLabelTone } from './MailLabelChip';

export interface MailLabelChipV4Props extends MailLabelChipProps {
  /**
   * Name the remove control. Default `` `Remove label ${label}` `` — the
   * string the base hard-coded.
   */
  removeLabel?: (label: string) => string;
}

/**
 * How much tone the `soft` fill carries — the same 14% `BadgeV4` mixes, so a
 * mail label and a badge in one row read as one family.
 */
const SOFT_MIX = 0.14;

/**
 * Fold the three status tones to neutral, for the chip's *fills*.
 *
 * `labelInk` does this for ink and is the shared answer; the fill needs the
 * folded tone itself, and the module's internal exports one function rather
 * than the tone. Kept beside the call so the two cannot disagree.
 */
function identityTone(tone: MailLabelTone): ToneV4 {
  return tone === 'success' || tone === 'warn' || tone === 'danger' ? 'neutral' : tone;
}

/**
 * **V4 mail label chip** — same props as {@link MailLabelChip} plus
 * `removeLabel`.
 *
 * ## Four changes
 *
 * 1. **A mail label is identity, not status.** `MailLabelTone` hands labels
 *    `success`, `warn` and `danger`, so a Gmail-style "Receipts" chip rendered
 *    in the error colour and was indistinguishable from a genuine failure in
 *    the same list. All three fold to neutral, through the module's shared
 *    `labelInk`; a label is told apart by its word and its glyph.
 * 2. **The remove control is a real target.** A `spacing.xs` gap around an
 *    `sm` glyph with `hitSlop={6}` is not 44, and on the web twin the `×` was
 *    a bare character with no box at all. It is `minTap` square now, and it is
 *    a **sibling** of the chip's own button rather than nested inside it —
 *    nesting made removing a label impossible without first filtering by it.
 * 3. **The fills are opaque and paired.** `withAlpha(accent, 0.16)` borrowed
 *    whatever was behind the chip, so the same label was a different colour on
 *    a card and on the page; `solid` now inks with the fill's guaranteed pair
 *    rather than falling through to `onSurface`.
 * 4. **Press is a state layer**, composited into the chip's own fill, instead
 *    of `opacity: 0.7` — which is close enough to M3's 0.38 disabled band that
 *    a pressed chip read as an unavailable one.
 */
export function MailLabelChipV4({
  label,
  tone = 'neutral',
  variant = 'soft',
  glyph,
  onRemove,
  onPress,
  removeLabel = (name) => `Remove label ${name}`,
  style,
}: MailLabelChipV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!label) return null;

  const identity = identityTone(tone);
  const fill = toneFill(theme, identity);
  const solid = variant === 'solid';
  const outline = variant === 'outline';

  const ground = solid
    ? fill
    : outline
      ? colors.surface
      : mixToken(colors.surface, fill, SOFT_MIX);
  const ink = solid ? onPair(theme, identity) : labelInk(theme, tone);
  const tap = minTap(tokens.spacing);

  const content = (
    <>
      {glyph ? <IconV4 glyph={glyph} size="xs" style={{ color: ink }} /> : null}
      <TextV4 size="xs" weight="semibold" numberOfLines={1} style={{ color: ink }}>
        {label}
      </TextV4>
    </>
  );

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-start',
          gap: tokens.spacing.xs,
          paddingHorizontal: tokens.spacing.sm,
          paddingVertical: tokens.spacing.xs,
          borderRadius: tokens.radius.full,
          backgroundColor: ground,
          borderWidth: outline ? 1 : 0,
          // A border is a UI boundary judged at 3:1, not text — it keeps the
          // identity fill rather than the corrected ink.
          borderColor: outline ? fill : 'transparent',
        },
        style,
      ]}
    >
      {onPress ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Label ${label}`}
          onPress={onPress}
          style={({ pressed }) => ({
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: tokens.spacing.xs,
            minHeight: tap,
            paddingHorizontal: tokens.spacing.xs,
            marginHorizontal: -tokens.spacing.xs,
            borderRadius: tokens.radius.full,
            backgroundColor: pressed ? pressOver(theme, ground, ink) : 'transparent',
          })}
        >
          {content}
        </Pressable>
      ) : (
        content
      )}
      {onRemove ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={removeLabel(label)}
          onPress={onRemove}
          style={({ pressed }) => ({
            width: tap,
            height: tap,
            alignItems: 'center',
            justifyContent: 'center',
            // Pulled back into the capsule so a 44 target does not stretch the
            // chip sideways past the word it belongs to.
            marginRight: -tokens.spacing.sm,
            borderRadius: tokens.radius.full,
            backgroundColor: pressed ? pressOver(theme, ground, ink) : 'transparent',
          })}
        >
          <IconV4 glyph="×" size="sm" style={{ color: ink }} />
        </Pressable>
      ) : null}
    </View>
  );
}
