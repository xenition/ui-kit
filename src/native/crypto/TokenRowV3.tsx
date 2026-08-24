import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { changeGlyph, formatPct, formatToken } from './internal/format';
import type { TokenRowProps } from './TokenRow';

/** Same public contract as {@link TokenRow} — a drop-in alternate design. */
export type TokenRowV3Props = TokenRowProps;

/** Change → contrast-safe TEXT slot (gains `successText`, losses `dangerText`). */
function changeToneTextKey(delta: number): keyof SemanticColors {
  const safe = Number.isFinite(delta) ? delta : 0;
  if (safe > 0) return 'successText';
  if (safe < 0) return 'dangerText';
  return 'muted';
}

/**
 * TokenRow, redesigned (v3): a **dense one-line quote**. A bold ticker leads, the
 * held quantity fills the middle (fixed precision — no float drift), and the 24h
 * change is pinned right in the contrast-safe `successText`/`dangerText` slot
 * with a ▲/▼ glyph so it is never color-only. No disc, no card, no sparkline —
 * a compact ticker line that packs many rows on screen. Distinct at a glance
 * from v1's 40px-disc list and v2's card. Same props.
 */
export function TokenRowV3({
  symbol,
  amount,
  decimals = 4,
  changePct,
  onPress,
  style,
}: TokenRowV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const hasChange = changePct != null;
  const textTone = changeToneTextKey(changePct ?? 0);

  const body = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.xs,
        },
        style,
      ]}
    >
      <Text
        numberOfLines={1}
        style={{ width: 68, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}
      >
        {symbol}
      </Text>

      <Text
        numberOfLines={1}
        style={{
          flex: 1,
          color: colors.muted,
          fontSize: tokens.typography.scale.sm,
          fontVariant: ['tabular-nums'],
        }}
      >
        {formatToken(amount, { decimals, symbol })}
      </Text>

      {hasChange ? (
        <Text
          accessibilityLabel={`${(changePct ?? 0) >= 0 ? 'up' : 'down'} ${formatPct(Math.abs(changePct ?? 0))}`}
          style={{
            color: colors[textTone],
            fontSize: tokens.typography.scale.sm,
            fontWeight: '700',
            fontVariant: ['tabular-nums'],
            textAlign: 'right',
            minWidth: 78,
          }}
        >
          {changeGlyph(changePct ?? 0)} {formatPct(changePct ?? 0)}
        </Text>
      ) : null}
    </View>
  );

  if (!onPress) return body;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${symbol} holding`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
    >
      {body}
    </Pressable>
  );
}
