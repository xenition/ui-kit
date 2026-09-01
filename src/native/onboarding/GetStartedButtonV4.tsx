import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { ButtonV4 } from '../primitives/ButtonV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { elevationStyle } from '../primitives/internal/surface-v4';
import type { ButtonSize, ButtonVariant } from '../primitives/Button';
import type { SemanticColors } from '../../theme/types';
import type { GetStartedButtonProps } from './GetStartedButton';

export interface GetStartedButtonV4Props extends GetStartedButtonProps {
  /**
   * What sits after the label.
   *
   * The base offered `trailingArrow: boolean`, and the reference screens show
   * why that is one bit too few: a forward step ends in `→`, but the *offer*
   * step ends in a sparkle — the mark is part of what the button is selling.
   * Pass any node to replace the arrow; pass `null` for nothing. Omit it and
   * `trailingArrow` decides, exactly as today.
   */
  trailing?: React.ReactNode;
  /**
   * Carry `elevation.action`. Default `true`.
   *
   * A funnel's CTA is the one control on the screen that genuinely sits above
   * the page — it is pinned over content that scrolls beneath it — so this is
   * the rare place §35.11 spends a shadow. A `depth: 'flat'` seed has already
   * zeroed the token, so flat apps get flat for free with no branch here.
   *
   * Pass `false` inside a sheet or a card that already casts one: two stacked
   * shadows read as a control that has come loose from the screen.
   */
  raised?: boolean;
}

/**
 * The §5 CTA bar's height: `2xl` + `sm` on the default scale, which is the 56
 * the design spec names — but **composed from the scale** rather than pinned,
 * so a seed with tighter spacing gets a proportionally tighter CTA instead of
 * a bar that no longer matches the fields above it. The base's literal `56` is
 * exactly the drift the Addendum settled for form controls; this is the same
 * fix on the action side.
 */
function ctaHeight(spacing: { sm: number; '2xl': number }): number {
  return spacing['2xl'] + spacing.sm;
}

/** Which semantic slot the label and trailing mark take, per variant. */
const LABEL_TONE: Record<ButtonVariant, keyof SemanticColors> = {
  primary: 'onPrimary',
  secondary: 'primaryText',
  ghost: 'onSurface',
  outline: 'onSurface',
  soft: 'primaryText',
  link: 'primaryText',
  elevated: 'onSurface',
};

/** Label step per control size. */
const LABEL_SIZE: Record<ButtonSize, 'sm' | 'base' | 'lg'> = {
  sm: 'sm',
  md: 'base',
  lg: 'base',
};

/**
 * **V4 onboarding CTA** — the shape every screen in the funnel ends on.
 *
 * Same props as {@link GetStartedButton} plus `trailing` and `raised`, and the
 * same job: pin §5's treatment — full width, `radius.full`, semibold label,
 * a trailing mark — into one place so no screen re-specifies it.
 *
 * ## Four changes
 *
 * 1. **The height comes off the scale.** The base pinned `56`. A seed that
 *    tightens `spacing` moved every field on the screen and left the CTA at 56,
 *    so the funnel's control family quietly split in two. `2xl + sm` is the
 *    same 56 on the default scale and stays proportional on any other.
 * 2. **The trailing mark is a slot, not a boolean.** `trailingArrow` could say
 *    "arrow" or "nothing"; the reference paywall ends its CTA in a sparkle,
 *    which is neither. `trailing` takes any node and `trailingArrow` still
 *    decides when it is omitted, so no existing caller moves.
 * 3. **The label takes a contrast-corrected tone.** The base painted the
 *    outlined and quiet variants' labels `primary` — a **fill** slot the
 *    compiler promises nothing about as ink on `surface`, and measurably as
 *    low as 1.3:1 on a pale seed. `primaryText` is that same colour pulled
 *    until it clears AA.
 * 4. **It is raised.** The CTA is pinned over scrolling content and is the one
 *    control on the screen that really is above the page.
 *
 * `disabled` is the same shape at `ButtonV4`'s reduced opacity — never a
 * different shape, or the button appears to move when it enables. The hero
 * treatment applies at `size="lg"` (the default); `sm`/`md` fall back to
 * `ButtonV4`'s own compact geometry for the rare inline use.
 */
export function GetStartedButtonV4({
  onPress,
  label = 'Get started',
  variant = 'primary',
  size = 'lg',
  trailingArrow = true,
  trailing,
  raised = true,
  accessibilityLabel,
  loading = false,
  disabled = false,
  fullWidth = true,
  style,
}: GetStartedButtonV4Props): React.ReactElement {
  const { tokens, elevation } = useXenitionTheme();
  // Only the hero size takes the §5 bar; an `sm`/`md` caller wanted a small
  // button and should keep getting one.
  const hero = size === 'lg';
  const tone = LABEL_TONE[variant];

  const mark =
    trailing !== undefined ? (
      trailing
    ) : trailingArrow ? (
      <IconV4 name="forward" size={LABEL_SIZE[size]} color={tone} />
    ) : null;

  return (
    <ButtonV4
      variant={variant}
      size={size}
      loading={loading}
      disabled={disabled}
      onPress={onPress}
      accessibilityLabel={accessibilityLabel ?? label}
      style={[
        fullWidth ? { alignSelf: 'stretch' } : null,
        hero
          ? {
              height: ctaHeight(tokens.spacing),
              paddingVertical: 0,
              borderRadius: tokens.radius.full,
            }
          : null,
        // A disabled control that still casts a shadow reads as pressable.
        raised && !disabled ? elevationStyle(elevation.action) : null,
        style,
      ]}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: tokens.spacing.sm,
        }}
      >
        <TextV4 size={LABEL_SIZE[size]} weight="semibold" tone={tone}>
          {label}
        </TextV4>
        {mark}
      </View>
    </ButtonV4>
  );
}
