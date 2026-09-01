/**
 * The spine of the **V4 onboarding line** (native) — the header, the hero, the
 * headline block, the scroll/pin shell and the footer stack that every
 * full-screen V4 in this module is assembled from.
 *
 * `ONBOARDING-DESIGN-SPEC.md` §1 draws one anatomy and says a user moving from
 * sign-in to slide 1 to the paywall must never feel a seam. The 0.9.0 pass
 * honoured that by writing the anatomy out **in each screen** — the same
 * 44×44 header pressable, the same 4:3 hero, the same hairline band, eight
 * times over. That is why the safe-area inset reached exactly one of them and
 * why the hero tint drifted: eight copies of a rule are eight chances to get
 * it wrong. Here it is once.
 *
 * Nothing in this file is exported from the package. It is the module's own
 * vocabulary, in the same position `commerce/internal/money-v4.ts` and
 * `dashboard/internal/row-v4.ts` hold for theirs.
 *
 * Every value is read off `useXenitionTheme()`. The bare numbers are geometric
 * — an aspect ratio, a fraction of the viewport, `1` for a hairline — and each
 * is a named constant with the reason attached, which §10.1 permits and
 * nothing else here does.
 */

import * as React from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  View,
  useWindowDimensions,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme, type XenitionNativeTheme } from '../../theme';
import { IconV4 } from '../../primitives/IconV4';
import { TextV4 } from '../../primitives/TextV4';
import { AuthStickyFooterV4 } from '../../primitives/AuthStickyFooterV4';
import { useReducedMotion } from '../../primitives/internal/useReducedMotion';
import { EASING_ENTER } from '../../primitives/internal/motion-v4';
import { disabledOpacity, minTap } from '../../primitives/internal/chrome-v4';
import { pressLayer } from '../../primitives/internal/state-v4';
import { mixToken } from '../../../primitives/internal/v4-depth';
import { V4_MOTION } from '../../../primitives/internal/v4-motion';
import type { IconName } from '../../../primitives/icon-names';

/* ────────────────────────────────────────────────────────────────────────
   The two configuration axes (brief §7)
   ──────────────────────────────────────────────────────────────────────── */

/**
 * The page ground an app's funnel paints on.
 *
 * Two apps built on one seed should be able to ship funnels that do not look
 * like the same app, without either of them forking a component. This is one
 * of the two knobs that lets them, and it is deliberately a *ground*, not a
 * layout: the anatomy is the part that must not vary (§1).
 *
 * - `'plain'` — `colors.surface`. Today's rendering, and the default, so no
 *   existing caller moves.
 * - `'tinted'` — the warm wash the reference screens use: a compiled ramp step
 *   toward the accent, never a gradient (§35.11 keeps gradients rare).
 * - `'brand'` — the hero region itself takes the accent fill and its content
 *   flips to the matching `on` ink. The body below stays readable surface.
 */
export type OnboardingGroundV4 = 'plain' | 'tinted' | 'brand';

/** Which brand slot the hero tint, the badges and the bars answer in. */
export type OnboardingAccentV4 = 'primary' | 'accent';

/** The props every full-screen V4 in this module accepts, on top of its base. */
export interface OnboardingFlowV4Props {
  /** Page ground. Default `'plain'` — today's rendering. */
  ground?: OnboardingGroundV4;
  /** Brand slot for tints, badges and progress. Default `'primary'`. */
  accent?: OnboardingAccentV4;
}

/* ────────────────────────────────────────────────────────────────────────
   Metrics
   ──────────────────────────────────────────────────────────────────────── */

/**
 * The hero panel's proportion (spec §3). Fixed, not derived from the artwork:
 * a flow whose hero is a different height on every step makes the headline
 * below it jump as the user advances, which is the loudest "nobody laid this
 * out" signal an onboarding can send.
 */
export const HERO_ASPECT = 4 / 3;

/**
 * …capped at this fraction of the viewport so the CTA never leaves the fold on
 * a small phone (spec §3). 0.38 is the spec's number, kept.
 */
export const HERO_MAX_HEIGHT_RATIO = 0.38;

/**
 * How much of the hero panel the fallback medallion fills when the caller
 * ships no artwork. A *ratio*, not a pixel size, because the panel is already
 * viewport-relative — the base pinned 96 and the medallion therefore looked
 * correct on one phone and lost on a tablet.
 */
export const HERO_MEDALLION_RATIO = 0.34;

/**
 * A comfortable measure for a subhead — roughly 60 characters. Without it the
 * value line runs the full width of a tablet and stops being readable (§4).
 */
export const MEASURE_MAX_WIDTH = 420;

/** How far apart the body's regions arrive, in ms (brief §8). */
export const FLOW_STAGGER = 60;

/**
 * How many regions the entrance staggers before every later one arrives at
 * once. Three is where a stagger stops reading as choreography and starts
 * reading as a slow screen.
 */
export const FLOW_STAGGER_CAP = 3;

/** The geometry the whole line shares, read off the theme. */
export interface FlowMetricsV4 {
  /** Minimum tap target for a header control — 44, off the spacing scale. */
  tap: number;
  /** Page gutter. */
  gutter: number;
  /** The circular badge on a feature row (§6). */
  badge: number;
  /** The hero-scale brand medallion, in points, for the current viewport. */
  medallion: number;
}

/**
 * The tap target and the badge both come from `minTap()` — the same expression
 * `ButtonV4` and the V4 navigation line use — rather than the literal 44 the
 * 0.9.0 screens each wrote out. A seed that scales its spacing now scales the
 * whole line's controls with it instead of drifting away from a number chosen
 * for one scale.
 */
export function flowMetrics(theme: XenitionNativeTheme, viewportHeight: number): FlowMetricsV4 {
  const { spacing } = theme.tokens;
  const heroHeight = viewportHeight * HERO_MAX_HEIGHT_RATIO;
  return {
    tap: minTap(spacing),
    gutter: spacing.lg,
    badge: minTap(spacing),
    medallion: Math.round(heroHeight * HERO_MEDALLION_RATIO),
  };
}

/* ────────────────────────────────────────────────────────────────────────
   Grounds
   ──────────────────────────────────────────────────────────────────────── */

/** The resolved fills a screen paints with, for one `ground` × `accent` pair. */
export interface FlowGroundsV4 {
  /** The page behind everything. */
  page: string;
  /** The hero panel. */
  hero: string;
  /** Ink for anything drawn *inside* the hero panel. */
  onHero: string;
  /** The tinted circle behind a feature-row glyph. */
  badge: string;
  /** The accent as a **fill** — a bar, a chip, a ring. */
  fill: string;
  /** Ink on that fill. */
  onFill: string;
  /** The accent as **text** — contrast-corrected against `surface`. */
  ink: string;
}

/**
 * Resolve the grounds for a screen.
 *
 * The one thing this function exists to prevent: reading `tokens.ramps.*[50]`
 * directly. The ramps carry the **light** orientation in both schemes, so the
 * literal reading of spec §3 paints a near-white hero panel on a near-black
 * page. Every tint here is mixed from resolved *semantic* colours instead, so
 * it lands on the correct side of the page in either scheme by construction.
 */
export function flowGrounds(
  theme: XenitionNativeTheme,
  ground: OnboardingGroundV4 = 'plain',
  accent: OnboardingAccentV4 = 'primary'
): FlowGroundsV4 {
  const { colors } = theme;
  const fill = accent === 'accent' ? colors.accent : colors.primary;
  const onFill = accent === 'accent' ? colors.onAccent : colors.onPrimary;
  const ink = accent === 'accent' ? colors.accentText : colors.primaryText;

  // How far a tint travels from the page toward the brand. Low on purpose: a
  // tint that reads as a *colour* competes with the CTA, which is the one
  // thing on the screen allowed to be loud.
  const PAGE_TINT = 0.05;
  const PANEL_TINT = 0.12;
  const BADGE_TINT = 0.16;

  const page = ground === 'tinted' ? mixToken(colors.surface, fill, PAGE_TINT) : colors.surface;

  return {
    page,
    hero: ground === 'brand' ? fill : mixToken(page, fill, PANEL_TINT),
    onHero: ground === 'brand' ? onFill : ink,
    badge: mixToken(page, fill, BADGE_TINT),
    fill,
    onFill,
    ink,
  };
}

/* ────────────────────────────────────────────────────────────────────────
   Entrance
   ──────────────────────────────────────────────────────────────────────── */

/**
 * The line's one entrance: a short fade-and-rise, on the M3 scale, staggered
 * by region.
 *
 * `useReducedMotion()` collapses it to **no** animation rather than a faster
 * one — a user who asked for less motion asked for less motion, not for the
 * same motion hurried (§36).
 */
export function useFlowEntrance(index: number = 0): {
  opacity: Animated.AnimatedInterpolation<number> | number;
  transform: { translateY: Animated.AnimatedInterpolation<number> | number }[];
} {
  const reduced = useReducedMotion();
  const { tokens } = useXenitionTheme();
  const progress = React.useRef(new Animated.Value(reduced ? 1 : 0)).current;
  const rise = tokens.spacing.md;

  React.useEffect(() => {
    if (reduced) {
      progress.setValue(1);
      return;
    }
    const animation = Animated.timing(progress, {
      toValue: 1,
      duration: V4_MOTION.enter,
      delay: Math.min(index, FLOW_STAGGER_CAP) * FLOW_STAGGER,
      easing: EASING_ENTER,
      useNativeDriver: true,
    });
    animation.start();
    return () => animation.stop();
  }, [progress, reduced, index]);

  if (reduced) return { opacity: 1, transform: [{ translateY: 0 }] };

  return {
    opacity: progress,
    transform: [
      { translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [rise, 0] }) },
    ],
  };
}

/* ────────────────────────────────────────────────────────────────────────
   Header
   ──────────────────────────────────────────────────────────────────────── */

/** A header control — 44×44 whatever the glyph, with an M3 press layer. */
function HeaderControl({
  label,
  icon,
  onPress,
  tint,
}: {
  label: string;
  icon: IconName;
  onPress: () => void;
  tint: keyof XenitionNativeTheme['colors'];
}): React.ReactElement {
  const theme = useXenitionTheme();
  const { tap } = flowMetrics(theme, 0);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => ({
        width: tap,
        height: tap,
        borderRadius: theme.tokens.radius.full,
        alignItems: 'center',
        justifyContent: 'center',
        // A layer over the container, not `opacity` on the glyph: dimming the
        // content is what M3 spends 0.38 on to mean *disabled*.
        backgroundColor: pressed ? pressLayer(theme) : 'transparent',
      })}
    >
      <IconV4 name={icon} size="lg" color={tint} />
    </Pressable>
  );
}

export interface FlowHeaderV4Props {
  /** Back affordance. Omitted on the first screen — a dead chevron is worse. */
  onBack?: () => void;
  /** Dismiss affordance. Omitted in a flow the user may not escape. */
  onDismiss?: () => void;
  /** The progress indicator, already built by the screen (usually bars). */
  progress?: React.ReactNode;
}

/**
 * The header row from §1: back · progress · dismiss, each optional, each a
 * 44×44 tap target, with **spacers** where a control is absent so the progress
 * bars do not slide sideways the moment one appears.
 *
 * Renders nothing when all three slots are empty — an empty 44pt strip at the
 * top of a screen is a gap the user has to explain to themselves (§4.5).
 */
export function FlowHeaderV4({
  onBack,
  onDismiss,
  progress,
}: FlowHeaderV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { tokens } = theme;
  const { tap, gutter } = flowMetrics(theme, 0);

  if (!onBack && !onDismiss && !progress) return null;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.md,
        paddingHorizontal: gutter,
        paddingTop: tokens.spacing.md,
      }}
    >
      {onBack ? (
        <HeaderControl label="Go back" icon="chevron-left" onPress={onBack} tint="onSurface" />
      ) : (
        <View style={{ width: tap, height: tap }} />
      )}

      <View style={{ flex: 1 }}>{progress}</View>

      {onDismiss ? (
        <HeaderControl label="Dismiss" icon="close" onPress={onDismiss} tint="mutedText" />
      ) : (
        <View style={{ width: tap, height: tap }} />
      )}
    </View>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   Hero
   ──────────────────────────────────────────────────────────────────────── */

export interface FlowHeroV4Props {
  /** The app's artwork. The kit ships none and must not (§3). */
  illustration?: React.ReactNode;
  /** Fallback medallion glyph, promoted to hero size when artwork is absent. */
  logoGlyph?: string;
  /** Resolved grounds from {@link flowGrounds}. */
  grounds: FlowGroundsV4;
  /**
   * `false` drops the panel entirely — for a compact screen (a sheet, an OTP
   * step) where a 38%-tall panel would push the field under the keyboard.
   */
  show?: boolean;
}

/**
 * The hero slot (§3): a tinted 4:3 panel, capped at 38% of the viewport,
 * holding the caller's artwork — or, when there is none, the brand medallion
 * at hero size. **Never empty space**: a screen with nothing in the hero slot
 * must still look composed.
 */
export function FlowHeroV4({
  illustration,
  logoGlyph,
  grounds,
  show = true,
}: FlowHeroV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { height } = useWindowDimensions();
  const { medallion } = flowMetrics(theme, height);

  if (!show) return null;

  return (
    <View
      style={{
        alignSelf: 'stretch',
        aspectRatio: HERO_ASPECT,
        maxHeight: height * HERO_MAX_HEIGHT_RATIO,
        borderRadius: theme.tokens.radius.lg,
        backgroundColor: grounds.hero,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {illustration ?? (
        <View
          style={{
            width: medallion,
            height: medallion,
            borderRadius: theme.tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: grounds.fill,
          }}
        >
          <IconV4 glyph={logoGlyph ?? '✦'} size="3xl" style={{ color: grounds.onFill }} />
        </View>
      )}
    </View>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   Headline block
   ──────────────────────────────────────────────────────────────────────── */

export interface FlowHeadlineV4Props {
  title: string;
  subtitle?: string;
  /** `'left'` only in an explicit sheet presentation (§4). Default `'center'`. */
  align?: 'center' | 'left';
}

/**
 * The headline block (§4): `2xl` bold over a muted value line held to a
 * readable measure.
 *
 * The subhead takes `mutedText`, not `muted`. `muted` is a ramp step with no
 * contrast promise against `surface`, and it is the token every 0.9.0 screen
 * reached for — which is how a value proposition ended up at 3.1:1 on a
 * light page.
 */
export function FlowHeadlineV4({
  title,
  subtitle,
  align = 'center',
}: FlowHeadlineV4Props): React.ReactElement | null {
  const { tokens } = useXenitionTheme();
  if (!title && !subtitle) return null;

  return (
    <View style={{ alignSelf: 'stretch', gap: tokens.spacing.sm }}>
      {title ? (
        <TextV4
          accessibilityRole="header"
          face="heading"
          size="2xl"
          weight="bold"
          tone="onSurface"
          align={align}
          numberOfLines={2}
        >
          {title}
        </TextV4>
      ) : null}
      {subtitle ? (
        <TextV4
          size="base"
          tone="mutedText"
          align={align}
          numberOfLines={3}
          style={{
            maxWidth: MEASURE_MAX_WIDTH,
            alignSelf: align === 'center' ? 'center' : 'flex-start',
          }}
        >
          {subtitle}
        </TextV4>
      ) : null}
    </View>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   Links
   ──────────────────────────────────────────────────────────────────────── */

export interface FlowLinkV4Props {
  label: string;
  onPress?: () => void;
  /** `'secondary'` is the declined choice; `'tertiary'` the required-but-quiet one. */
  emphasis?: 'secondary' | 'tertiary';
  disabled?: boolean;
}

/**
 * A footer text link.
 *
 * **Underlined**, which is the whole point. §31 asks for familiar
 * interactions, and a centred un-underlined label sitting under a filled
 * button is indistinguishable from a caption — the 0.9.0 footers rendered
 * "No thanks, start my free trial" as `tone="muted"` text and users read it as
 * fine print rather than as the other option.
 */
export function FlowLinkV4({
  label,
  onPress,
  emphasis = 'secondary',
  disabled = false,
}: FlowLinkV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { tap } = flowMetrics(theme, 0);
  if (!label) return null;

  const secondary = emphasis === 'secondary';

  return (
    <Pressable
      accessibilityRole="link"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      disabled={disabled || !onPress}
      onPress={onPress}
      style={({ pressed }) => ({
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: tap,
        borderRadius: theme.tokens.radius.md,
        backgroundColor: pressed ? pressLayer(theme) : 'transparent',
        opacity: disabledOpacity(theme.state, disabled),
      })}
    >
      <TextV4
        size={secondary ? 'base' : 'sm'}
        weight={secondary ? 'semibold' : 'medium'}
        tone={secondary ? 'onSurface' : 'mutedText'}
        align="center"
        style={{ textDecorationLine: 'underline' }}
      >
        {label}
      </TextV4>
    </Pressable>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   Footer stack
   ──────────────────────────────────────────────────────────────────────── */

/** One link in the legal row. */
export interface FlowLegalLink {
  id: string;
  label: string;
}

export interface FlowFooterV4Props {
  /** The CTA — normally a `GetStartedButtonV4`. */
  children?: React.ReactNode;
  /** Reassurance line above the CTA (brief §4.1). */
  reassurance?: string;
  /** Its glyph. Default `success` — monochrome, so it actually takes the tint. */
  reassuranceIcon?: IconName;
  /** The declined choice, under the CTA, underlined. */
  secondaryLabel?: string;
  onSecondary?: () => void;
  /** The required-but-quiet action — "Restore Purchases". */
  tertiaryLabel?: string;
  onTertiary?: () => void;
  /** Terms · Privacy, inline, separated by a middot. */
  legalLinks?: FlowLegalLink[];
  onLegalLinkPress?: (id: string) => void;
  /** Fine print above the reassurance line — store billing terms, usually. */
  footnote?: string;
  /** Pay the bottom safe-area inset. Default `true`. */
  safeArea?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * The footer stack from brief §4, in a fixed order so it cannot drift between
 * screens: footnote · reassurance · CTA · secondary · tertiary · legal.
 *
 * Built on `AuthStickyFooterV4` rather than a band of its own, because that
 * component already pays `insets.bottom` — and the reason this file exists is
 * that eight screens each drawing their own bottom band meant seven of them
 * did not.
 *
 * Renders nothing when every slot is empty (§4.5).
 */
export function FlowFooterV4({
  children,
  reassurance,
  reassuranceIcon = 'success',
  secondaryLabel,
  onSecondary,
  tertiaryLabel,
  onTertiary,
  legalLinks,
  onLegalLinkPress,
  footnote,
  safeArea = true,
  style,
}: FlowFooterV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { tokens } = theme;

  const hasCta = React.Children.toArray(children).length > 0;
  const legal = legalLinks?.filter((link) => link.label) ?? [];
  if (!hasCta && !secondaryLabel && !tertiaryLabel && !reassurance && legal.length === 0) {
    return null;
  }

  return (
    <AuthStickyFooterV4 safeArea={safeArea} style={style}>
      {footnote ? (
        <TextV4 size="xs" tone="mutedText" align="center">
          {footnote}
        </TextV4>
      ) : null}

      {reassurance ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: tokens.spacing.sm,
          }}
        >
          <IconV4 name={reassuranceIcon} size="base" color="successText" />
          <TextV4 size="sm" weight="semibold" tone="onSurface">
            {reassurance}
          </TextV4>
        </View>
      ) : null}

      {children}

      {secondaryLabel ? (
        <FlowLinkV4 label={secondaryLabel} onPress={onSecondary} emphasis="secondary" />
      ) : null}

      {tertiaryLabel ? (
        <FlowLinkV4 label={tertiaryLabel} onPress={onTertiary} emphasis="tertiary" />
      ) : null}

      {legal.length > 0 ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: tokens.spacing.sm,
          }}
        >
          {legal.map((link, i) => (
            <React.Fragment key={link.id}>
              {i > 0 ? (
                <TextV4 size="xs" tone="mutedText">
                  ·
                </TextV4>
              ) : null}
              <Pressable
                accessibilityRole="link"
                accessibilityLabel={link.label}
                onPress={onLegalLinkPress ? () => onLegalLinkPress(link.id) : undefined}
                // Not 44 tall: a legal link is not a control the flow asks the
                // user to hit, and a 44pt strip of them would out-weigh the
                // restore link above it. It stays reachable, just not loud.
                hitSlop={tokens.spacing.sm}
              >
                <TextV4
                  size="xs"
                  tone="mutedText"
                  style={{ textDecorationLine: 'underline' }}
                >
                  {link.label}
                </TextV4>
              </Pressable>
            </React.Fragment>
          ))}
        </View>
      ) : null}
    </AuthStickyFooterV4>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   The shell
   ──────────────────────────────────────────────────────────────────────── */

export interface FlowScreenV4Props {
  /** Resolved grounds — the screen already read its own `ground`/`accent`. */
  grounds: FlowGroundsV4;
  /** The fixed header. */
  header?: React.ReactNode;
  /** The scrolling body. */
  children?: React.ReactNode;
  /** The pinned footer. */
  footer?: React.ReactNode;
  /**
   * `true` centres a short body in the leftover space (a welcome screen);
   * `false` starts it at the top (a form, a paywall with a plan card).
   * Default `true` — `flexGrow: 1` means a long body scrolls either way.
   */
  center?: boolean;
  /** Keep taps working while a keyboard is up. Set on any screen with a field. */
  keyboardAware?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * The scroll/pin shell (brief §3) — the structural fix of this whole pass.
 *
 * Every 0.9.0 screen laid its body out with `flex: 1` and centred it. That is
 * correct for a welcome screen and **broken** for a paywall: four feature rows
 * plus a plan card plus fine print does not fit a small phone, and with no
 * scroll view in the tree the overflow was simply not reachable. A user on a
 * 5.4" device could not read the terms they were being asked to accept.
 *
 * `flexGrow: 1` on the content container is what lets one component be both:
 * a short body still centres in the leftover space, a long one scrolls, and no
 * screen has to choose in advance which it is.
 */
export function FlowScreenV4({
  grounds,
  header,
  children,
  footer,
  center = true,
  keyboardAware = false,
  style,
}: FlowScreenV4Props): React.ReactElement {
  const { tokens } = useXenitionTheme();

  return (
    <View style={[{ flex: 1, backgroundColor: grounds.page }, style]}>
      {header}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: center ? 'center' : 'flex-start',
          alignItems: 'center',
          gap: tokens.spacing.lg,
          paddingHorizontal: tokens.spacing.lg,
          paddingTop: tokens.spacing.lg,
          paddingBottom: tokens.spacing.lg,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={keyboardAware ? 'handled' : 'never'}
      >
        {children}
      </ScrollView>
      {footer}
    </View>
  );
}
