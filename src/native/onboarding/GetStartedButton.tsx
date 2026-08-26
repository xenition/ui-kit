import * as React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Button, Icon, Text, type ButtonSize, type ButtonVariant } from '../primitives';

export interface GetStartedButtonProps {
  /** Fires when the primary CTA is pressed. */
  onPress?: () => void;
  /**
   * CTA copy. Default `'Get started'` — an outcome, not "Submit"/"Continue"
   * (design.md §47). Override with the concrete next step where one fits
   * (e.g. `'Create my account'`, `'Start free trial'`).
   */
  label?: string;
  /** Visual weight. Default `'primary'`. */
  variant?: ButtonVariant;
  /** Control height. Default `'lg'` — this is a hero action. */
  size?: ButtonSize;
  /**
   * Trailing `→` glyph. Default `true`: an onboarding CTA almost always moves
   * the user forward, and the arrow is what says so (onboarding spec §5). Pass
   * `false` on a **terminal** action — "Done", "Maybe later", "Restore
   * purchase" — where an arrow would promise a next screen that never comes.
   */
  trailingArrow?: boolean;
  /**
   * Announced name, when it should differ from the visible {@link label} —
   * e.g. a button reading "Next" that a screen reader should hear as "Next
   * slide". Parity with the web twin's `aria-label`. Defaults to `label`.
   */
  accessibilityLabel?: string;
  /** Show a spinner and block presses while an async step runs. */
  loading?: boolean;
  disabled?: boolean;
  /** Stretch to fill the parent width. Default `true`. */
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * The sticky-footer CTA height from the onboarding spec (§5). A geometric
 * control dimension, which §10.1 permits as a named constant — it is not a
 * spacing token and must not be one: 56 is the touch-comfortable height the
 * inputs, provider buttons and this CTA all share so the funnel reads as one
 * control family.
 */
const CTA_HEIGHT = 56;

/**
 * Which semantic slot the label and arrow take, per button variant. Mirrors the
 * `Button` primitive's own resolution: on a filled button the label sits ON the
 * fill; everywhere else it is text on `surface` and takes the contrast-safe
 * `*Text` form. Kept here because this component supplies its own children
 * (label + arrow) and so has to colour them itself.
 */
const LABEL_TONE: Record<ButtonVariant, keyof SemanticColors> = {
  primary: 'onPrimary',
  secondary: 'primaryText',
  ghost: 'onSurface',
  outline: 'onSurface',
  soft: 'primaryText',
  link: 'primaryText',
  elevated: 'onSurface',
};

/** Label size per control size — the same table the `Button` primitive reads. */
const LABEL_SIZE: Record<ButtonSize, 'sm' | 'base' | 'lg'> = {
  sm: 'sm',
  md: 'base',
  lg: 'lg',
};

/**
 * The primary onboarding call-to-action — and, since the redesign, the shape
 * every screen in the funnel ends on.
 *
 * What shipped before was a short flat rectangle sitting mid-page: the same
 * `Button` the rest of the app used, at whatever width its parent happened to
 * give it. The reference screens all end on one unmistakable bar, so this now
 * pins the spec's §5 treatment — **56 tall, `radius.full`, full width, primary
 * fill, semibold `onPrimary` label, trailing `→`** — into one place, so every
 * entry screen (welcome, slides, sign-in, paywall, profile) gets it without
 * re-specifying anything. Disabled is the same shape at reduced opacity, never
 * a different shape, so the button does not appear to move when it enables.
 *
 * The hero treatment applies at `size="lg"` (the default). `sm`/`md` fall back
 * to the `Button` primitive's own compact geometry, for the rare inline use.
 * All color and radius come from tokens. No literal colors.
 */
export function GetStartedButton({
  onPress,
  label = 'Get started',
  variant = 'primary',
  size = 'lg',
  trailingArrow = true,
  accessibilityLabel,
  loading = false,
  disabled = false,
  fullWidth = true,
  style,
}: GetStartedButtonProps): React.ReactElement {
  const { tokens } = useXenitionTheme();
  // Only the hero size takes the §5 bar; a `sm`/`md` caller wanted a small
  // button and should keep getting one.
  const hero = size === 'lg';
  const tone = LABEL_TONE[variant];

  return (
    <Button
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
              height: CTA_HEIGHT,
              paddingVertical: 0,
              borderRadius: tokens.radius.full,
            }
          : null,
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
        <Text size={LABEL_SIZE[size]} weight="semibold" tone={tone}>
          {label}
        </Text>
        {trailingArrow ? <Icon name="forward" size={LABEL_SIZE[size]} color={tone} /> : null}
      </View>
    </Button>
  );
}
