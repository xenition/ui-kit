import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { PRESENCE_META, chatSize, toneFill, type ChatSize } from './internal/thread-v4';
import type { PresenceDotProps } from './PresenceDot';

export interface PresenceDotV4Props extends PresenceDotProps {
  /**
   * A named size. Prefer this over the raw pixel `size`, which stays for
   * parity — a number prop is an invitation to pick one off the scale.
   */
  scale?: ChatSize;
  /**
   * Show the presence word beside the dot. Default `false`, so nothing
   * existing moves — but pass it wherever there is room.
   *
   * A coloured dot alone says nothing to a colour-blind user and nothing at
   * all to a screen reader; the dot is the whole signal in `ChatHeader` and
   * `ConversationRow`.
   */
  showLabel?: boolean;
}

/** The ring's width, as a fraction of the dot. Geometric. */
const RING_RATIO = 0.34;

/**
 * **V4 presence dot** — same props as {@link PresenceDot} plus `scale` and
 * `showLabel`.
 *
 * ## Three changes
 *
 * 1. **It can carry its word.** See `showLabel`.
 * 2. **It always has a name.** The base announced nothing unless the caller
 *    passed `label`, so the default rendering was a decorative circle.
 * 3. **`away` stops borrowing `warn`.** Stepping away is not a caution;
 *    `busy` keeps `danger` because "do not disturb" is genuinely a stop.
 */
export function PresenceDotV4({
  status = 'offline',
  size,
  scale = 'sm',
  ring = false,
  label,
  showLabel = false,
  style,
}: PresenceDotV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  const meta = PRESENCE_META[status];
  const word = label ?? meta.label;
  const diameter = size ?? chatSize(theme, scale);

  const dot = (
    <View
      style={{
        width: diameter,
        height: diameter,
        borderRadius: tokens.radius.full,
        backgroundColor: toneFill(theme, meta.tone),
        borderWidth: ring ? Math.max(1, Math.round(diameter * RING_RATIO) / 2) : 0,
        borderColor: colors.surface,
      }}
    />
  );

  if (!showLabel) {
    // Always named, even without the word: the base's default rendering was a
    // circle a screen reader skipped entirely.
    return (
      <View accessible accessibilityRole="image" accessibilityLabel={word} style={style}>
        {dot}
      </View>
    );
  }

  return (
    <View
      accessible
      accessibilityLabel={word}
      style={[
        { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs },
        style,
      ]}
    >
      {dot}
      <TextV4 size="xs" tone={meta.tone === 'success' ? 'successText' : 'mutedText'}>
        {word}
      </TextV4>
    </View>
  );
}
