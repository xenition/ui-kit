import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { spokenLine } from './internal/market-v4';
import type { SeedPhraseGridProps } from './SeedPhraseGrid';

export interface SeedPhraseGridV4Props extends SeedPhraseGridProps {
  /**
   * How one word is announced inside the grouped phrase. `index` is 0-based;
   * the tile shows `index + 1`. Default `'Word 1, satoshi'`.
   */
  wordLabel?: (index: number, word: string) => string;
  /** An extra caution shown only while the phrase is on screen. */
  revealWarning?: string;
}

/**
 * **V4 recovery-phrase grid** — same props as {@link SeedPhraseGrid} plus
 * `wordLabel` and `revealWarning`.
 *
 * ## Four changes
 *
 * 1. **`columns` works.** The base gave each tile `width: ${100 / cols}%`
 *    inside a `flexWrap` row that also carried a gap, so three tiles plus two
 *    gaps came to more than 100% and wrapped: a 12-word phrase set to 3
 *    columns rendered as **6 rows of 2**. The grid is laid out as real rows
 *    now, each tile flexing into its share, so the gap is paid out of the row
 *    rather than added to it.
 * 2. **Revealing does not read the phrase aloud, word by word.** The base
 *    exposed every tile as its own accessibility element, so revealing a seed
 *    phrase made a screen reader recite twelve recovery words in order, out
 *    loud, in whatever room the holder was standing in. The revealed grid is
 *    **one** element the user has to focus deliberately, and its name is built
 *    from `wordLabel`.
 * 3. **The reveal control is a target.** It was a text-sized pill; it now
 *    clears 44 and drops `accessibilityState={{ expanded }}`, which controlled
 *    no region and told a reader nothing true.
 * 4. **Press is a state layer**, the warning takes the readable `warnText`
 *    slot rather than the `warn` fill, and a tile's ground is `card` rather
 *    than a raw ramp index.
 */
export function SeedPhraseGridV4({
  words,
  columns = 3,
  revealed,
  onToggleReveal,
  revealLabel = 'Reveal',
  hideLabel = 'Hide',
  warning = 'Never share your recovery phrase.',
  wordLabel = (index, word) => `Word ${index + 1}, ${word}`,
  revealWarning,
  style,
}: SeedPhraseGridV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  const isControlled = revealed !== undefined;
  const [internal, setInternal] = React.useState(false);
  const isRevealed = isControlled ? Boolean(revealed) : internal;
  const cols = Math.max(1, Math.trunc(columns));

  const toggle = (): void => {
    const next = !isRevealed;
    if (!isControlled) setInternal(next);
    onToggleReveal?.(next);
  };

  const safeWords = Array.isArray(words) ? words : [];

  // Real rows. A `flexWrap` row cannot express "N per line with a gap between
  // them" — the gap is added to the 100% rather than taken out of it.
  const rows: string[][] = [];
  for (let i = 0; i < safeWords.length; i += cols) {
    rows.push(safeWords.slice(i, i + cols));
  }

  const phrase = spokenLine(safeWords.map((word, index) => wordLabel(index, word ?? '')));
  const tap = minTap(tokens.spacing);

  return (
    <View style={[{ gap: tokens.spacing.sm }, style]}>
      {warning != null ? (
        <TextV4 size="xs" weight="semibold" tone="warnText">
          {warning}
        </TextV4>
      ) : null}

      {/* One element, not one per word. A reader focuses the phrase on
          purpose; it is never walked past by accident. */}
      <View
        accessible={isRevealed}
        accessibilityLabel={isRevealed ? phrase : undefined}
        accessibilityElementsHidden={!isRevealed}
        importantForAccessibility={isRevealed ? 'yes' : 'no-hide-descendants'}
        style={{ gap: tokens.spacing.xs }}
      >
        {rows.map((row, rowIndex) => (
          <View
            key={rowIndex}
            style={{ flexDirection: 'row', gap: tokens.spacing.xs }}
          >
            {row.map((word, columnIndex) => (
              <View
                key={columnIndex}
                style={{
                  flex: 1,
                  minWidth: 0,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: tokens.spacing.xs,
                  paddingVertical: tokens.spacing.xs,
                  paddingHorizontal: tokens.spacing.sm,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: tokens.radius.sm,
                  backgroundColor: colors.card,
                }}
              >
                <TextV4 size="xs" tone="mutedText" numeric="tabular">
                  {rowIndex * cols + columnIndex + 1}
                </TextV4>
                <TextV4 size="sm" weight="semibold" tone="onCard" numberOfLines={1}>
                  {isRevealed ? (word ?? '') : '••••••'}
                </TextV4>
              </View>
            ))}
            {/* A short final row keeps the grid's columns rather than
                stretching its last tile across the width. */}
            {Array.from({ length: cols - row.length }, (_, i) => (
              <View key={`pad-${i}`} style={{ flex: 1 }} />
            ))}
          </View>
        ))}
      </View>

      {isRevealed && revealWarning != null ? (
        <TextV4 size="xs" weight="semibold" tone="dangerText">
          {revealWarning}
        </TextV4>
      ) : null}

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={isRevealed ? hideLabel : revealLabel}
        onPress={toggle}
        style={({ pressed }) => ({
          alignSelf: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: tokens.spacing.xs,
          minHeight: tap,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: tokens.radius.md,
          paddingHorizontal: tokens.spacing.md,
          backgroundColor: pressed
            ? pressOver(theme, colors.surface, colors.onSurface)
            : colors.surface,
        })}
      >
        <TextV4
          size="sm"
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
        >
          {isRevealed ? '🙈' : '👁'}
        </TextV4>
        <TextV4 size="sm" weight="semibold" tone="onSurface">
          {isRevealed ? hideLabel : revealLabel}
        </TextV4>
      </Pressable>
    </View>
  );
}
