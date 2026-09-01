import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Button, Icon } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { formatMoney, goalPct } from './internal';
import type { MatchingGiftBannerProps } from './MatchingGiftBanner';

/** Drop-in for {@link MatchingGiftBannerProps} — same props, the V4 "rally" design. */
export type MatchingGiftBannerV4Props = MatchingGiftBannerProps;

/**
 * MatchingGiftBanner — **V4** "rally" design. A rallying banner announcing a
 * gift-matching offer, drawn with the warm "rally" identity: a glyph in the tone
 * color, the sponsor + match ratio in a bold legible line, an optional
 * matched/cap progress bar (integer cents → `formatMoney`, cap divide-by-zero
 * guarded via `goalPct`), a deadline, and an optional CTA. Honors all three
 * `variant`s — `solid` (a strong primary fill with near-white `onPrimary` ink),
 * `soft` (a soft-primary tint via `withAlpha`), and `outline` (a bordered
 * surface) — identical props/behavior to {@link MatchingGiftBannerProps}. These
 * are token FILL treatments, not a brand gradient. Progress is a bar plus a
 * printed cap figure — not color alone. Token-only colors via
 * `useXenitionTheme()`.
 */
export function MatchingGiftBannerV4({
  matcherName,
  multiplier = 2,
  matchedCents,
  capCents,
  currency = 'USD',
  deadlineLabel,
  actionLabel = 'Give now',
  onAction,
  variant = 'soft',
  style,
}: MatchingGiftBannerV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const solid = variant === 'solid';
  const bg = solid ? colors.primary : variant === 'soft' ? withAlpha(colors.primary, 0.12) : colors.surface;
  const fg = solid ? colors.onPrimary : colors.onSurface;
  const subFg = solid ? colors.onPrimary : colors.muted;
  const borderWidth = variant === 'outline' ? 1 : 0;

  const surfaceStyle: StyleProp<ViewStyle> = solid
    ? { shadowColor: colors.onSurface, shadowOpacity: 0.08, shadowRadius: 12, shadowOffset: { width: 0, height: 6 }, elevation: 3 }
    : null;

  const hasBar = typeof matchedCents === 'number' && typeof capCents === 'number';
  const pct = hasBar ? goalPct(matchedCents as number, capCents as number) : 0;

  return (
    <View
      accessibilityRole="summary"
      accessibilityLabel={`${matcherName} is matching gifts ${multiplier}x`}
      style={[
        { gap: tokens.spacing.sm, padding: tokens.spacing.md, borderRadius: tokens.radius.lg, borderWidth, borderColor: colors.border, backgroundColor: bg },
        surfaceStyle,
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <Icon glyph="✨" size="lg" color={solid ? 'onPrimary' : 'primary'} />
        <Text style={{ color: fg, fontSize: tokens.typography.scale.base, fontWeight: '800', flex: 1 }}>
          {`${matcherName} matches ${multiplier}× your gift`}
        </Text>
      </View>

      {hasBar ? (
        <View style={{ gap: tokens.spacing.xs }}>
          <View
            accessibilityRole="progressbar"
            accessibilityValue={{ min: 0, max: 100, now: Math.round(pct) }}
            style={{ width: '100%', height: 8, borderRadius: tokens.radius.full, backgroundColor: solid ? withAlpha(colors.onPrimary, 0.3) : colors.border, overflow: 'hidden' }}
          >
            <View style={{ height: '100%', width: `${pct}%`, backgroundColor: solid ? colors.onPrimary : colors.primary, borderRadius: tokens.radius.full }} />
          </View>
          <Text style={{ color: subFg, fontSize: tokens.typography.scale.xs }}>
            {`${formatMoney(matchedCents as number, currency)} of ${formatMoney(capCents as number, currency)} matched`}
          </Text>
        </View>
      ) : null}

      {deadlineLabel ? <Text style={{ color: subFg, fontSize: tokens.typography.scale.sm }}>{deadlineLabel}</Text> : null}

      {onAction ? (
        <Button variant={solid ? 'elevated' : 'primary'} onPress={onAction}>{actionLabel}</Button>
      ) : null}
    </View>
  );
}
