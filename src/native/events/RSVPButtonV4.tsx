import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { disabledOpacity, minTap } from '../primitives/internal/chrome-v4';
import { pressFill } from '../primitives/internal/state-v4';
import { RSVP_TONE, onPair, toneFill } from './internal/event-v4';
import type { RSVPButtonProps, RSVPStatus } from './RSVPButton';

export interface RSVPButtonV4Props extends RSVPButtonProps {
  /** The word each answer is shown and announced with. Default `Going` / `Maybe` / `Can't go`. */
  optionLabels?: Partial<Record<RSVPStatus, string>>;
}

interface Option {
  status: RSVPStatus;
  label: string;
  /** A distinct glyph, so the answer is shape + word and never colour alone. */
  glyph: string;
}

const OPTIONS: Option[] = [
  { status: 'going', label: 'Going', glyph: '✓' },
  { status: 'maybe', label: 'Maybe', glyph: '?' },
  { status: 'declined', label: "Can't go", glyph: '✕' },
];

/**
 * **V4 RSVP control** — same props as {@link RSVPButton} plus `optionLabels`.
 *
 * ## Four changes
 *
 * 1. **An RSVP answer is a choice, not a status.** The base painted
 *    `going → success`, `maybe → warn`, `declined → danger` — the same three
 *    slots this module spends on a cancelled session and a sold-out tier.
 *    Telling a host you cannot make it is not an error and "Maybe" is not a
 *    warning. `RSVP_TONE` gives `going` the brand's `primary` and leaves the
 *    other two neutral.
 * 2. **Every segment clears 44 at both sizes.** At `sm` the segments were
 *    about 28px tall — three of them side by side, on the one control an
 *    invitee is meant to answer with a thumb.
 * 3. **A press is a state layer**, not a hand-picked step out of the neutral
 *    ramp, which is light-oriented in both schemes and so lit the pressed
 *    segment up white in dark mode.
 * 4. **Disabled is M3's 0.38**, not the 0.5 the base guessed at.
 */
export function RSVPButtonV4({
  value,
  onChange,
  optionLabels,
  size = 'md',
  disabled = false,
  style,
}: RSVPButtonV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const padV = size === 'sm' ? tokens.spacing.xs : tokens.spacing.sm;
  const textSize = size === 'sm' ? 'xs' : 'sm';
  const tap = minTap(tokens.spacing);

  return (
    <View
      accessibilityRole="radiogroup"
      style={[
        {
          flexDirection: 'row',
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: colors.border,
          overflow: 'hidden',
          opacity: disabledOpacity(theme.state, disabled),
        },
        style,
      ]}
    >
      {OPTIONS.map((opt, i) => {
        const selected = value === opt.status;
        const tone = RSVP_TONE[opt.status] ?? 'neutral';
        const ink = selected ? onPair(theme, tone) : colors.onSurface;
        const label = optionLabels?.[opt.status] ?? opt.label;
        return (
          <Pressable
            key={opt.status}
            accessibilityRole="radio"
            accessibilityState={{ selected, disabled }}
            accessibilityLabel={label}
            disabled={disabled}
            onPress={() => onChange?.(opt.status)}
            style={({ pressed }) => ({
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: tokens.spacing.xs,
              minHeight: tap,
              paddingVertical: padV,
              paddingHorizontal: tokens.spacing.sm,
              borderLeftWidth: i === 0 ? 0 : 1,
              borderLeftColor: colors.border,
              backgroundColor: selected
                ? toneFill(theme, tone)
                : pressed
                  ? pressFill(theme)
                  : colors.surface,
            })}
          >
            <TextV4
              size={textSize}
              weight="bold"
              style={{ color: selected ? ink : colors.mutedText }}
            >
              {opt.glyph}
            </TextV4>
            <TextV4
              size={textSize}
              weight={selected ? 'bold' : 'medium'}
              style={{ color: ink }}
            >
              {label}
            </TextV4>
          </Pressable>
        );
      })}
    </View>
  );
}
