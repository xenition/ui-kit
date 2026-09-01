import * as React from 'react';
import { View, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useXenitionTheme } from '../theme';
import { ProgressV4 } from '../primitives/ProgressV4';
import { TextV4 } from '../primitives/TextV4';
import { readingPercent } from './internal/reading-v4';
import type { ReadingProgressProps } from './ReadingProgress';

export interface ReadingProgressV4Props extends ReadingProgressProps {
  /** The bar's accessible name. Default ``(pct) => `${pct} percent read` ``. */
  formatProgress?: (pct: number) => string;
  /** Pin the bar to the top of the reader, paying the safe-area inset. Default `false`. */
  pinned?: boolean;
}

/**
 * **V4 reading progress** — same props as {@link ReadingProgress} plus
 * `formatProgress` and `pinned`.
 *
 * ## Four changes
 *
 * 1. **The name reaches the progressbar.** The label sat on the wrapper while
 *    the `Progress` primitive inside it — the element that actually *is* a
 *    progressbar — had none, so a reader was told "42 percent read" by a
 *    roleless box on one platform and by nothing at all on the other. The
 *    role, the name and the value are now on one element.
 * 2. **`pinned` does what the prop doc always claimed.** The base described
 *    the `bar` variant as being "for pinning to the top of a reader" and left
 *    the pinning to the caller, who then had to discover the notch. `pinned`
 *    anchors the bar and pays `useSafeAreaInsets().top`.
 * 3. **The percentage cannot overrun the track**, because it runs through
 *    `readingPercent()` rather than straight into the bar.
 * 4. **The visible readout is not announced twice.** It is the same number the
 *    progressbar already reports, so it is hidden from the reader.
 */
export function ReadingProgressV4({
  progress,
  variant = 'bar',
  formatProgress = (pct: number) => `${pct} percent read`,
  pinned = false,
  style,
}: ReadingProgressV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  // Needs a `SafeAreaProvider` above it (Expo mounts one by default).
  const insets = useSafeAreaInsets();

  // `progress` is the 0–1 fraction the base took; the clamp is what stops a
  // caller mid-computation pushing the fill past the end of the track.
  const pct = Math.round(readingPercent(progress * 100));

  const pinnedStyle: ViewStyle | null = pinned
    ? {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        // The notch is the reason this prop exists at all.
        paddingTop: insets.top,
        backgroundColor: colors.surface,
        zIndex: 1,
      }
    : null;

  const bar = (barStyle?: ViewStyle): React.ReactElement => (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={formatProgress(pct)}
      accessibilityValue={{ min: 0, max: 100, now: pct }}
      style={barStyle}
    >
      <ProgressV4 value={pct} max={100} tone="primary" size="sm" />
    </View>
  );

  if (variant === 'labeled') {
    return (
      <View
        style={[
          { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm },
          pinnedStyle,
          style,
        ]}
      >
        {bar({ flex: 1 })}
        <TextV4
          // The progressbar beside it already says this number.
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          size="xs"
          weight="semibold"
          tone="mutedText"
          numeric="tabular"
          align="right"
          style={{ minWidth: tokens.spacing['2xl'] - tokens.spacing.md }}
        >
          {`${pct}%`}
        </TextV4>
      </View>
    );
  }

  return <View style={[pinnedStyle, style]}>{bar()}</View>;
}
