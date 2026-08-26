import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { mixToken } from '../../primitives/internal/v4-depth';
import { TONE_SLOTS } from '../../primitives/internal/feedback-v4';
import { ensureContrast } from '../../theme/color';
import { MIN_CONTRAST } from '../../theme/compile';
import type { BannerProps, BannerTone } from './Banner';
import { pressOver } from './internal/state-v4';

export type { BannerProps as BannerV4Props, BannerTone };

/**
 * How far the action chip lifts off the band it sits on.
 *
 * The chip is the band's own two colours mixed — the tone with a fifth of its
 * on-pair stirred in — so it is lighter than the band in light mode and lighter
 * than the band in dark mode, without either case being special-cased. A fifth
 * is the smallest step that survives being viewed at arm's length; more starts
 * to read as a second tone on a band that is supposed to carry exactly one.
 */
const CHIP_LIFT = 0.2;

/**
 * **V4 banner** — same props as {@link Banner}, a different design line.
 *
 * A banner is the loudest thing this kit can say: full width, edge to edge, a
 * solid semantic fill. That is its identity and V4 keeps it. What V4 changes is
 * everything the loudness was hiding.
 *
 * ## The band does not sweep
 *
 * No gradient, at any depth. `design.md` §35.4 makes the tone the content, and
 * a band that runs from one hue to another has two contents — the reader has to
 * decide which end was the message. The one exception §35.11 allows a gradient,
 * the hero, is not this. And no shadow: a banner is in the document flow at the
 * top of a region, not floating over it, so `elevation` would be claiming a
 * layer the component does not occupy.
 *
 * ## The action stops pretending to be prose
 *
 * The base banner rendered its action as underlined text in the same colour as
 * the message beside it. On a saturated `danger` band that is two sentences of
 * red-and-white where one of them is a control, and the only thing separating
 * them is an underline — §33, a scannable screen needs the control to be found
 * without reading. V4 gives it a chip: an opaque ground mixed from the band's
 * own tone and its on-pair, so the affordance is visible without introducing a
 * third colour to a component whose whole point is carrying one.
 *
 * Both controls take a real touch target — `spacing.xl` tall with `spacing.sm`
 * of slop around them, which clears the 44px minimum §46 asks for on a band
 * that is only `spacing.md` of padding deep.
 *
 * ## Every label re-measured
 *
 * `onWarn` is guaranteed against `warn` and against nothing else. The moment a
 * label sits on the chip instead of the band, that guarantee is about the wrong
 * colour — so each label is re-measured with `ensureContrast` against the fill
 * actually behind it.
 */
export function BannerV4({
  tone = 'info',
  icon,
  children,
  actionLabel,
  onAction,
  onClose,
  style,
}: BannerProps): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const slots = TONE_SLOTS[tone];

  const band = colors[slots.fill];
  const on = colors[slots.on];
  const ink = ensureContrast(on, band, MIN_CONTRAST);

  // The chip is the band's own colours, stirred — never a third hue.
  const chip = mixToken(band, on, CHIP_LIFT);
  const chipInk = ensureContrast(on, chip, MIN_CONTRAST);

  return (
    <View
      accessibilityRole={tone === 'danger' ? 'alert' : 'summary'}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          width: '100%',
          backgroundColor: band,
          paddingVertical: tokens.spacing.md,
          paddingHorizontal: tokens.spacing.lg,
        },
        style,
      ]}
    >
      {icon != null ? <View>{icon}</View> : null}
      <View style={{ flex: 1, minWidth: 0 }}>
        {typeof children === 'string' ? (
          <Text
            style={{
              fontFamily: tokens.typography.fontBody,
              fontSize: tokens.typography.scale.sm,
              fontWeight: '500',
              color: ink,
            }}
          >
            {children}
          </Text>
        ) : (
          children
        )}
      </View>
      {actionLabel ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={actionLabel}
          onPress={onAction}
          hitSlop={tokens.spacing.sm}
          style={({ pressed }) => ({
            justifyContent: 'center',
            minHeight: tokens.spacing.xl,
            paddingHorizontal: tokens.spacing.md,
            borderRadius: tokens.radius.sm,
            backgroundColor: pressed ? pressOver(theme, chip, chipInk) : chip,
          })}
        >
          <Text
            style={{
              fontFamily: tokens.typography.fontBody,
              fontSize: tokens.typography.scale.sm,
              fontWeight: '600',
              color: chipInk,
            }}
          >
            {actionLabel}
          </Text>
        </Pressable>
      ) : null}
      {onClose ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Dismiss"
          onPress={onClose}
          hitSlop={tokens.spacing.sm}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: tokens.spacing.xl,
            minWidth: tokens.spacing.xl,
          }}
        >
          <Text style={{ fontSize: tokens.typography.scale.base, color: ink }}>✕</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
