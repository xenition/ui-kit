import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { mixToken } from '../../primitives/internal/v4-depth';
import { MIN_NON_TEXT_CONTRAST, TINT, TONE_SLOTS } from '../../primitives/internal/feedback-v4';
import { ensureContrast } from '../../theme/color';
import { MIN_CONTRAST } from '../../theme/compile';
import type { AlertProps, AlertTone, AlertVariant } from './Alert';

export type { AlertProps as AlertV4Props, AlertTone, AlertVariant };

/**
 * **V4 alert** — same props as {@link Alert}, a different design line.
 *
 * ## The colour IS the message
 *
 * `design.md` §35.4 is the whole brief here. An alert's red is not the alert
 * being styled red; it is the alert saying "this is dangerous". So V4 spends
 * exactly one colour decision on an alert — which tone — and refuses every
 * other one:
 *
 * - **No gradient.** Not even under a `depth` that has them. A tone that
 *   sweeps between two hues asks the reader which end was the meaning, and
 *   §35.11 keeps gradients for the hero and the one primary action anyway.
 * - **No shadow.** An alert is *in* the page, not above it. `elevation` would
 *   claim a layer the component does not occupy, and depth that lies about
 *   layer is decoration (§8).
 * - **`warn` is `warn`.** The base native alert routed `warn` to the `accent`
 *   token — a brand colour standing in for a caution, which is §35.4's exact
 *   prohibition, and which also disagreed with its own web twin. V4 uses the
 *   `warn` slot on both platforms.
 *
 * ## The tint owns its ground
 *
 * `subtle` is the default and the one people actually ship. The base painted it
 * `surface` with a coloured left rule; the web twin painted `bg-neutral-50`,
 * which is a different alert. V4 composites the tone into `surface`
 * **opaquely** at 10%, so the block carries its tone as a real colour — one
 * that does not change when the alert is dropped on a filled card, a glass
 * panel, or artwork, and one every label below can be measured against.
 *
 * The left rule survives, at full tone strength, because it is the fastest read
 * in the component: a 4px bar of colour at the start of a block is identified
 * before a single word is. It is held to 3:1, the bar WCAG sets for a non-text
 * boundary — pushing a rule to 4.5:1 would bleach the tone for no gain.
 *
 * Every piece of text is then re-measured with `ensureContrast` against the
 * fill this alert actually painted, rather than against the page it was
 * designed on.
 */
export function AlertV4({
  tone = 'info',
  variant = 'subtle',
  title,
  onClose,
  icon,
  action,
  children,
  style,
}: AlertProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const slots = TONE_SLOTS[tone];
  const toneFill = colors[slots.fill];

  let bg: string;
  let borderColor = colors.border;
  let borderWidth = 1;
  let ruleWidth = 0;

  if (variant === 'solid') {
    // The loudest form: the tone is the whole block, labelled with the pair
    // the compiler guarantees against it.
    bg = toneFill;
    borderWidth = 0;
    borderColor = 'transparent';
  } else if (variant === 'outline') {
    // A ring in the tone, on the ground the compiler measured `*Text` against.
    bg = colors.surface;
    borderColor = ensureContrast(toneFill, bg, MIN_NON_TEXT_CONTRAST);
  } else {
    bg = mixToken(colors.surface, toneFill, TINT);
    borderColor = colors.border;
    ruleWidth = tokens.spacing.xs;
  }

  const solid = variant === 'solid';
  // Measured against the fill above, not against `surface`.
  const titleColor = ensureContrast(colors[solid ? slots.on : slots.text], bg, MIN_CONTRAST);
  const bodyColor = ensureContrast(colors[solid ? slots.on : 'onSurface'], bg, MIN_CONTRAST);
  const closeColor = ensureContrast(colors[solid ? slots.on : 'mutedText'], bg, MIN_CONTRAST);
  const ruleColor = ensureContrast(toneFill, bg, MIN_NON_TEXT_CONTRAST);

  return (
    <View
      accessibilityRole={tone === 'danger' ? 'alert' : 'summary'}
      style={[
        {
          flexDirection: 'row',
          gap: tokens.spacing.sm,
          backgroundColor: bg,
          borderColor,
          borderWidth,
          borderLeftWidth: ruleWidth > 0 ? ruleWidth : borderWidth,
          borderLeftColor: ruleWidth > 0 ? ruleColor : borderColor,
          borderRadius: tokens.radius.md,
          padding: tokens.spacing.md,
        },
        style,
      ]}
    >
      {icon != null ? <View>{icon}</View> : null}
      <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs }}>
        {title != null ? (
          typeof title === 'string' ? (
            <Text
              style={{
                fontFamily: tokens.typography.fontHeading,
                fontSize: tokens.typography.scale.sm,
                fontWeight: '600',
                color: titleColor,
              }}
            >
              {title}
            </Text>
          ) : (
            title
          )
        ) : null}
        {children != null ? (
          typeof children === 'string' ? (
            <Text
              style={{
                fontFamily: tokens.typography.fontBody,
                fontSize: tokens.typography.scale.sm,
                color: bodyColor,
              }}
            >
              {children}
            </Text>
          ) : (
            children
          )
        ) : null}
        {/*
          §38: an error message should help recovery, so the action is not an
          afterthought pinned to the corner — it sits under the copy it belongs
          to, in the reading order, with a full step of space above it.
        */}
        {action != null ? <View style={{ marginTop: tokens.spacing.xs }}>{action}</View> : null}
      </View>
      {onClose ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Dismiss"
          onPress={onClose}
          hitSlop={tokens.spacing.sm}
        >
          <Text style={{ fontSize: tokens.typography.scale.base, color: closeColor }}>✕</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
