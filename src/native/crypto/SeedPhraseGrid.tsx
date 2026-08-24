import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface SeedPhraseGridProps {
  /** The ordered recovery words (typically 12 or 24). */
  words: string[];
  /** Columns in the grid (default `3`). */
  columns?: number;
  /**
   * Controlled reveal state. When provided the component is controlled and
   * `onToggleReveal` drives it; otherwise it manages its own state and starts
   * HIDDEN — a seed phrase is never shown by default.
   */
  revealed?: boolean;
  /** Fires with the next reveal state when the reveal control is pressed. */
  onToggleReveal?: (revealed: boolean) => void;
  /** Reveal-button label when hidden (default `Reveal`). */
  revealLabel?: string;
  /** Reveal-button label when shown (default `Hide`). */
  hideLabel?: string;
  /** Sensitive-warning line shown above the grid. */
  warning?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A recovery-phrase grid that is **hidden by default** — the words are masked
 * with dots and the tiles are marked inaccessible to screen readers until the
 * holder explicitly reveals them (uncontrolled: internal state starts hidden;
 * controlled: pass `revealed` + `onToggleReveal`). Each tile shows its 1-based
 * index. A `warning` line reinforces the sensitivity. Token-bound; no literal
 * colors. Indexing into `words` is guarded.
 */
export function SeedPhraseGrid({
  words,
  columns = 3,
  revealed,
  onToggleReveal,
  revealLabel = 'Reveal',
  hideLabel = 'Hide',
  warning = 'Never share your recovery phrase.',
  style,
}: SeedPhraseGridProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
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

  return (
    <View style={[{ gap: tokens.spacing.sm }, style]}>
      {warning != null ? (
        <Text style={{ color: colors.warn, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
          {warning}
        </Text>
      ) : null}

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }}>
        {safeWords.map((word, index) => {
          const shown = isRevealed ? (word ?? '') : '••••••';
          return (
            <View
              key={index}
              accessibilityElementsHidden={!isRevealed}
              importantForAccessibility={isRevealed ? 'yes' : 'no-hide-descendants'}
              accessibilityLabel={isRevealed ? `Word ${index + 1}, ${word ?? ''}` : undefined}
              style={{
                width: `${100 / cols}%`,
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.xs,
                paddingVertical: tokens.spacing.xs,
                paddingHorizontal: tokens.spacing.sm,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: tokens.radius.sm,
                backgroundColor: tokens.ramps.neutral[100],
              }}
            >
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontVariant: ['tabular-nums'] }}>
                {index + 1}
              </Text>
              <Text
                numberOfLines={1}
                style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}
              >
                {shown}
              </Text>
            </View>
          );
        })}
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: isRevealed }}
        accessibilityLabel={isRevealed ? hideLabel : revealLabel}
        onPress={toggle}
        style={({ pressed }) => ({
          alignSelf: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.xs,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: tokens.radius.md,
          paddingVertical: tokens.spacing.xs,
          paddingHorizontal: tokens.spacing.md,
          opacity: pressed ? 0.7 : 1,
        })}
      >
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>
          {isRevealed ? '🙈' : '👁'}
        </Text>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {isRevealed ? hideLabel : revealLabel}
        </Text>
      </Pressable>
    </View>
  );
}
