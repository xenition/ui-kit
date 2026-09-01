import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { pressLayer } from '../primitives/internal/state-v4';
import { minTap } from '../primitives/internal/chrome-v4';
import { mixToken } from '../../primitives/internal/v4-depth';
import type { SemanticColors } from '../../theme/types';
import type { TrialBannerProps, TrialBannerTone } from './TrialBanner';

export interface TrialBannerV4Props extends TrialBannerProps {
  /**
   * Total days in the trial. Supplying it *and* {@link TrialBannerProps.daysLeft}
   * draws a meter under the copy, so "3 days left" also reads as **how far
   * through** — a number alone cannot say whether three is nearly over or
   * barely started.
   */
  daysTotal?: number;
  /**
   * Build the countdown copy. Default `'N days left'` / `'1 day left'`.
   *
   * A prop rather than a string because the base hard-coded English
   * pluralization inside the component, which is unreachable for a host that
   * localizes — and this module's whole contract is that copy is
   * caller-supplied.
   */
  formatDaysLeft?: (days: number) => string;
  /** Dismiss affordance. Hidden when omitted. */
  onDismiss?: () => void;
  /** Accessible name for the dismiss control. Default `'Dismiss'`. */
  dismissLabel?: string;
}

/** The tone's fill slot and its contrast-corrected ink. */
const TONE: Record<TrialBannerTone, { fill: keyof SemanticColors; ink: keyof SemanticColors }> = {
  info: { fill: 'accent', ink: 'accentText' },
  warn: { fill: 'warn', ink: 'warnText' },
  success: { fill: 'success', ink: 'successText' },
};

/**
 * How far the tinted ground travels from `surface` toward the tone. Low, so
 * the banner stays a *note* and does not compete with the CTA below it.
 */
const GROUND_TINT = 0.12;

/** How solid the meter's unfilled track sits against the banner's ground. */
const TRACK_TINT = 0.24;

/** The meter's thickness, off the spacing scale rather than a picked number. */
const meterHeight = (xs: number): number => xs;

/**
 * **V4 trial banner** — same props as {@link TrialBanner} plus `daysTotal`,
 * `formatDaysLeft`, `onDismiss` and `dismissLabel`.
 *
 * ## Four changes
 *
 * 1. **Soft, not solid.** The base filled the whole strip with `colors.accent`
 *    (or `warn`, or `success`) at full saturation. Sat above a paywall, that is
 *    a second loud coloured block arguing with the CTA — and §5 gives the CTA
 *    that job alone. V4 tints the ground toward the tone and puts the copy in
 *    the tone's **contrast-corrected text slot**, which is how `AlertV4` and
 *    `CalloutV4` already draw the same idea.
 * 2. **The subtitle is a tone, not an opacity.** `opacity: 0.9` on ink is a
 *    contrast reduction the compiler cannot see and no measurement accounts
 *    for. `mutedText` is the slot that means "secondary" and carries a promise.
 * 3. **The countdown can show its position.** With `daysTotal`, a meter draws
 *    the fraction remaining. "2 days left" out of 3 and out of 30 are different
 *    facts and the base rendered them identically.
 * 4. **The copy is the host's.** `formatDaysLeft` replaces the hard-coded
 *    English plural, and `dismissLabel` names the new control.
 *
 * **There is still no `TrialBannerV2`/`V3` line split** — a strip this small has
 * one correct shape, and `design-line-composition` documents that from the
 * other side. This V4 is the same shape, corrected.
 */
export function TrialBannerV4({
  title,
  subtitle,
  daysLeft,
  daysTotal,
  tone = 'info',
  actionLabel,
  onActionPress,
  icon = '✨',
  formatDaysLeft,
  onDismiss,
  dismissLabel = 'Dismiss',
  style,
}: TrialBannerV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  if (!title) return null;

  const slot = TONE[tone];
  const fill = colors[slot.fill];
  const ink = colors[slot.ink];
  const ground = mixToken(colors.surface, fill, GROUND_TINT);
  const track = mixToken(ground, fill, TRACK_TINT);

  const days = typeof daysLeft === 'number' ? Math.max(0, daysLeft) : null;
  const countdown =
    days === null
      ? null
      : (formatDaysLeft ?? ((n: number) => `${n} ${n === 1 ? 'day' : 'days'} left`))(days);

  // A meter only means something when both ends are known and the total is
  // real; `daysLeft` above `daysTotal` would draw an over-full bar.
  const total = typeof daysTotal === 'number' && daysTotal > 0 ? daysTotal : null;
  const fraction = days !== null && total !== null ? Math.min(1, days / total) : null;

  return (
    <View
      accessibilityRole="summary"
      style={[
        {
          gap: tokens.spacing.sm,
          backgroundColor: ground,
          borderRadius: tokens.radius.md,
          paddingVertical: tokens.spacing.md,
          paddingHorizontal: tokens.spacing.md,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <IconV4 glyph={icon} size="lg" style={{ color: ink }} />

        <View style={{ flex: 1, gap: tokens.spacing.xs }}>
          <TextV4 size="base" weight="semibold" tone="onSurface">
            {title}
          </TextV4>
          {subtitle ? (
            <TextV4 size="sm" tone="mutedText">
              {subtitle}
            </TextV4>
          ) : null}
        </View>

        {countdown ? (
          <View
            style={{
              borderRadius: tokens.radius.full,
              paddingVertical: tokens.spacing.xs,
              paddingHorizontal: tokens.spacing.sm,
              backgroundColor: colors.surface,
            }}
          >
            <TextV4 size="xs" weight="bold" numeric="tabular" style={{ color: ink }}>
              {countdown}
            </TextV4>
          </View>
        ) : null}

        {actionLabel && onActionPress ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={actionLabel}
            onPress={onActionPress}
            hitSlop={tokens.spacing.sm}
          >
            <TextV4
              size="sm"
              weight="semibold"
              style={{ color: ink, textDecorationLine: 'underline' }}
            >
              {actionLabel}
            </TextV4>
          </Pressable>
        ) : null}

        {onDismiss ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={dismissLabel}
            onPress={onDismiss}
            style={({ pressed }) => ({
              width: minTap(tokens.spacing),
              height: minTap(tokens.spacing),
              marginVertical: -tokens.spacing.sm,
              marginRight: -tokens.spacing.sm,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: tokens.radius.full,
              backgroundColor: pressed ? pressLayer(theme) : 'transparent',
            })}
          >
            <IconV4 name="close" size="base" color="mutedText" />
          </Pressable>
        ) : null}
      </View>

      {fraction !== null ? (
        <View
          accessibilityRole="progressbar"
          accessibilityValue={{ min: 0, max: total as number, now: days as number }}
          style={{
            height: meterHeight(tokens.spacing.xs),
            borderRadius: tokens.radius.full,
            backgroundColor: track,
            overflow: 'hidden',
          }}
        >
          <View
            style={{
              width: `${fraction * 100}%`,
              height: '100%',
              borderRadius: tokens.radius.full,
              backgroundColor: fill,
            }}
          />
        </View>
      ) : null}
    </View>
  );
}
