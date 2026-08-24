import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Button } from '../primitives/Button';
import { Icon } from '../primitives/Icon';
import { formatMoney, withAlpha, goalPct } from './internal';

/** Visual treatment of a {@link MatchingGiftBanner}. */
export type MatchingGiftVariant = 'solid' | 'soft' | 'outline';

export interface MatchingGiftBannerProps {
  /** Sponsor doing the matching, e.g. `Acme Foundation`. */
  matcherName: string;
  /** Match multiplier, e.g. `2` renders `2×`. */
  multiplier?: number;
  /** Amount matched so far, integer **cents** (enables a progress bar with cap). */
  matchedCents?: number;
  /** Total match pool / cap, integer **cents**. */
  capCents?: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Pre-formatted deadline label, e.g. `Ends Sep 30`. */
  deadlineLabel?: string;
  /** CTA label (default `Give now`). Button renders only when `onAction` is set. */
  actionLabel?: string;
  /** Fires when the CTA is pressed. */
  onAction?: () => void;
  /** Visual treatment (default `soft`). */
  variant?: MatchingGiftVariant;
  style?: StyleProp<ViewStyle>;
}

/**
 * A promotional banner announcing a gift-matching offer: sponsor, multiplier,
 * an optional matched/cap progress bar (integer cents → `formatMoney`, cap
 * divide-by-zero guarded), a deadline, and an optional CTA. `variant` chooses a
 * solid accent fill, a soft tint (`withAlpha`), or an outline. Progress is shown
 * as a bar plus a printed cap figure — not color alone. All colors come from the
 * compiled theme tokens — no literal colors.
 */
export function MatchingGiftBanner({
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
}: MatchingGiftBannerProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const solid = variant === 'solid';
  const bg = solid ? colors.primary : variant === 'soft' ? withAlpha(colors.primary, 0.12) : colors.surface;
  const fg = solid ? colors.onPrimary : colors.onSurface;
  const subFg = solid ? colors.onPrimary : colors.muted;
  const borderWidth = variant === 'outline' ? 1 : 0;

  const hasBar = typeof matchedCents === 'number' && typeof capCents === 'number';
  const pct = hasBar ? goalPct(matchedCents as number, capCents as number) : 0;

  return (
    <View
      accessibilityRole="summary"
      accessibilityLabel={`${matcherName} is matching gifts ${multiplier}x`}
      style={[
        { gap: tokens.spacing.sm, padding: tokens.spacing.md, borderRadius: tokens.radius.lg, borderWidth, borderColor: colors.primary, backgroundColor: bg },
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
