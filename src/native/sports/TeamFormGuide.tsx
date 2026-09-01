import * as React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../primitives';
import { withAlpha } from '../primitives/internal/color';

/** One recent result — a Win, Draw or Loss. */
export type TeamFormResult = 'W' | 'D' | 'L';

/** Accessible word + semantic color slot per result (color reinforces the letter, never alone). */
const RESULT_META: Record<TeamFormResult, { word: string; slot: keyof SemanticColors }> = {
  W: { word: 'Win', slot: 'success' },
  D: { word: 'Draw', slot: 'warn' },
  L: { word: 'Loss', slot: 'danger' },
};

export interface TeamFormGuideProps {
  /**
   * Recent results as a row of `'W' | 'D' | 'L'` letters. Ordered
   * **most-recent-first** (index `0` is the latest match). Rendered left→right
   * in that order.
   */
  results: readonly TeamFormResult[];
  /** Optional leading caption for the row (e.g. `"Last 5"`). Omit for pills only. */
  label?: string;
  /**
   * Optional press handler for a single result pill; receives the pill's index
   * in {@link results}. When supplied each pill becomes a ≥44px pressable
   * button; when omitted the row is purely presentational.
   */
  onResultPress?: (index: number) => void;
  /** Optional style override merged onto the card container. */
  style?: ViewStyle;
}

/**
 * TeamFormGuide — **V4** "broadcast" design. A compact form line: an optional
 * caption followed by a row of small circular soft-tint pills, one per recent
 * result, ordered most-recent-first. Each pill shows its letter (W / D / L) and
 * carries a semantic tint — win→success, draw→warn, loss→danger — so the result
 * reads from letter + color together, never color alone. When `onResultPress`
 * is given each pill is an accessible ≥44px button. Token-only colors via
 * `useXenitionTheme()`; dark-mode safe.
 */
export function TeamFormGuide({
  results,
  label,
  onResultPress,
  style,
}: TeamFormGuideProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const container: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.sm,
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.sm,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  };

  const summary = results.map((r) => RESULT_META[r]?.word ?? r).join(', ');

  const renderPill = (r: TeamFormResult): React.ReactElement => {
    const meta = RESULT_META[r] ?? RESULT_META.D;
    const tint = colors[meta.slot];
    return (
      <View
        style={{
          width: 28,
          height: 28,
          borderRadius: 14,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: withAlpha(tint, 0.12),
        }}
      >
        <Text allowFontScaling={false} style={{ color: tint, fontSize: tokens.typography.scale.sm, fontWeight: '800' }}>
          {r}
        </Text>
      </View>
    );
  };

  return (
    <View style={[container, style]}>
      {label ? (
        <Text
          numberOfLines={1}
          style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700', textTransform: 'uppercase' }}
        >
          {label}
        </Text>
      ) : null}
      <View
        accessibilityRole="list"
        accessibilityLabel={label ? `${label}: ${summary}` : `Recent form: ${summary}`}
        style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 6 }}
      >
        {results.map((r, i) => {
          const meta = RESULT_META[r] ?? RESULT_META.D;
          if (onResultPress) {
            return (
              <Pressable
                key={i}
                accessibilityRole="button"
                accessibilityLabel={meta.word}
                onPress={() => onResultPress(i)}
                hitSlop={8}
                style={({ pressed }) => ({
                  minWidth: 44,
                  minHeight: 44,
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: pressed ? 0.7 : 1,
                })}
              >
                {renderPill(r)}
              </Pressable>
            );
          }
          return (
            <View key={i} accessibilityRole="text" accessibilityLabel={meta.word} style={{ alignItems: 'center', justifyContent: 'center' }}>
              {renderPill(r)}
            </View>
          );
        })}
      </View>
    </View>
  );
}
