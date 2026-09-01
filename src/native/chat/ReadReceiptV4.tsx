import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressFill } from '../primitives/internal/state-v4';
import { RECEIPT_META, chatSize, toneInk, type ChatSize } from './internal/thread-v4';
import type { ReadReceiptProps } from './ReadReceipt';

export interface ReadReceiptV4Props extends ReadReceiptProps {
  /** A named size. Prefer this over the raw pixel `size`, kept for parity. */
  scale?: ChatSize;
  /**
   * Fires when a failed message's retry is pressed.
   *
   * `failed` is the only receipt state a user must **act** on, and the base
   * drew it as a red glyph and stopped. With this the failure is a control;
   * without it, it is still announced assertively.
   */
  onRetry?: () => void;
  /** Copy on the retry action. Default `'Retry'`. */
  retryLabel?: string;
  /** Override the status words — five English words lived inside. */
  statusLabels?: Partial<Record<import('./ReadReceipt').ReceiptStatus, string>>;
}

/**
 * **V4 read receipt** — same props as {@link ReadReceipt} plus `scale`,
 * `onRetry`, `retryLabel` and `statusLabels`.
 *
 * ## Four changes
 *
 * 1. **A failed send is actionable.** See `onRetry` — this is the one state
 *    in the component that asks something of the user, and the base drew it
 *    exactly as passively as `sent`.
 * 2. **It reports as a status, not an image.** `accessibilityRole="image"` on
 *    a delivery state is simply the wrong role.
 * 3. **`failed` announces assertively**, the rest politely — a receipt that
 *    interrupts on every message trains a user to ignore it.
 * 4. **The ink is the contrast-corrected slot**, where the base used `muted`,
 *    which carries no promise, for three of the five states.
 */
export function ReadReceiptV4({
  status = 'sent',
  size,
  scale = 'sm',
  onRetry,
  retryLabel = 'Retry',
  statusLabels,
  style,
}: ReadReceiptV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { tokens } = theme;

  const meta = RECEIPT_META[status];
  const word = statusLabels?.[status] ?? meta.label;
  const fontSize = size ?? chatSize(theme, scale) + tokens.spacing.xs;
  const failed = status === 'failed';

  const glyph = (
    <TextV4
      allowFontScaling={false}
      style={{ fontSize, lineHeight: fontSize * 1.2, color: toneInk(theme, meta.tone) }}
    >
      {meta.glyph}
    </TextV4>
  );

  if (failed && onRetry) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${word}. ${retryLabel}`}
        onPress={onRetry}
        style={({ pressed }) => [
          {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            minHeight: minTap(tokens.spacing),
            paddingHorizontal: tokens.spacing.xs,
            borderRadius: tokens.radius.md,
            backgroundColor: pressed ? pressFill(theme) : 'transparent',
          },
          style,
        ]}
      >
        {glyph}
        <TextV4 size="xs" weight="semibold" tone="dangerText">
          {retryLabel}
        </TextV4>
      </Pressable>
    );
  }

  return (
    <View
      accessible
      accessibilityRole="text"
      // A failed send interrupts; the other four do not. A receipt that
      // interrupts on every message teaches the user to ignore it.
      accessibilityLiveRegion={failed ? 'assertive' : 'polite'}
      accessibilityLabel={word}
      style={style}
    >
      {glyph}
    </View>
  );
}
