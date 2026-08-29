import * as React from 'react';
import { Pressable, View, useWindowDimensions, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card, Icon, Text } from '../primitives';
import { GetStartedButton } from './GetStartedButton';

/*
  Geometry, not theme. ONBOARDING-DESIGN-SPEC §10 allows exactly these bare
  numbers: 44 — the minimum tap target for a header control or a text link (§7)
  and the diameter of a feature-row badge (§8) — and the medallion diameters
  below. Every colour, radius, gap and font size on this screen comes from the
  theme.
*/
const TAP_TARGET = 44;
/** The card form's medallion — unchanged from the original screen. */
const MEDALLION_SIZE = 72;
/** The full-screen form's medallion, sized to fill the hero panel (§3). */
const HERO_MEDALLION_SIZE = 88;

/** §3: the hero panel is roughly 4:3 and never eats more than ~38% of the screen. */
const HERO_ASPECT = 4 / 3;
const HERO_MAX_SCREEN_FRACTION = 0.38;

export type PermissionKind =
  | 'notifications'
  | 'location'
  | 'camera'
  | 'microphone'
  | 'photos'
  | 'contacts'
  | 'generic';

/**
 * Where the pre-prompt is in its lifecycle.
 *
 * Deliberately **not** extended with an `'unavailable'` member: nothing in this
 * component would render differently for a permission the device cannot offer
 * that `'denied'` plus a `deniedMessage` does not already cover, and inventing a
 * state the hosts do not produce is how an enum grows a member nobody sets. If a
 * host ever needs to distinguish "the OS said no" from "this device has no
 * camera", that is a real product decision and belongs in a separate change.
 */
export type PermissionState = 'idle' | 'requesting' | 'granted' | 'denied';

/** One "here is what you get" row under the rationale (§1/§8). */
export interface PermissionBenefit {
  /** Stable key for list rendering. */
  id: string;
  /** Row title — an outcome, not the permission's name. */
  title: string;
  /** Optional supporting line. */
  description?: string;
  /** Optional leading glyph for the row's badge. */
  icon?: string;
}

export interface PermissionPromptProps {
  /** Which OS permission this pre-prompt is priming. Sets the default glyph. */
  kind?: PermissionKind;
  /** Explicit glyph override for the medallion. */
  icon?: string;
  /** Outcome-oriented headline (e.g. `'Never miss a reply'`). */
  title: string;
  /**
   * The "why" shown before the OS dialog — the explain half of explain-then-ask
   * (design.md §17). Say what the user gets, not what you access.
   */
  rationale: string;
  /** Allow-button copy. Default `'Allow'`. */
  allowLabel?: string;
  /** Decline-link copy. Default `'Not now'`. */
  denyLabel?: string;
  /** Fires when the user opts in — the host then triggers the real OS request. */
  onAllow?: () => void;
  /** Fires when the user declines the pre-prompt. */
  onDeny?: () => void;
  /** Drives the button/affordance states. Default `'idle'`. */
  state?: PermissionState;
  /** Message shown in the `denied` state. */
  deniedMessage?: string;
  /**
   * Render as a full onboarding **step screen** — hero slot, headline block,
   * benefit rows, sticky CTA footer (§1) — instead of the inline card. Default
   * `false`, which is the card this component has always been, so existing
   * callers that drop it into a list or a sheet are untouched.
   */
  fullScreen?: boolean;
  /** Hero art for the step (§3). Falls back to the medallion when absent. */
  illustration?: React.ReactNode;
  /** "Here is what you get" rows under the rationale. Empty renders none. */
  benefits?: PermissionBenefit[];
  /**
   * Header progress slot (§1/§2) — pass the segmented bars, e.g.
   * `<ProgressDots variant="bars" count={4} activeIndex={2} />`. Full-screen
   * form only.
   */
  progress?: React.ReactNode;
  /** Renders the header's back control (full-screen form only). */
  onBack?: () => void;
  /** Renders the header's dismiss (✕) control (full-screen form only). */
  onDismiss?: () => void;
  /** Copy for the granted state. Default `"You're all set."`. */
  grantedMessage?: string;
  style?: StyleProp<ViewStyle>;
}

const KIND_GLYPH: Record<PermissionKind, string> = {
  notifications: '🔔',
  location: '📍',
  camera: '📷',
  microphone: '🎤',
  photos: '🖼️',
  contacts: '👥',
  generic: '🔒',
};

/**
 * Contextual permission pre-prompt — the in-app "explain, then ask" screen that
 * precedes the real OS dialog so the system prompt only fires once the user has
 * already said yes (design.md §17). **This screen must never trigger an OS
 * dialog on mount**: `onAllow` is what the host hangs the real request on, and
 * it fires only from a deliberate press.
 *
 * Two forms, one set of props. By default it is the inline **card** it has
 * always been — for a settings list, a sheet, a mid-flow nudge. With
 * `fullScreen` it becomes a step screen in the shell from
 * `ONBOARDING-DESIGN-SPEC.md` §1: header (back · progress · dismiss), hero slot,
 * centred headline block, benefit rows, and the sticky CTA footer with the
 * decline link beneath — never beside — the primary action.
 *
 * Reflects `requesting`/`granted`/`denied` (granted replaces the actions with a
 * success line; denied keeps them and adds the recovery hint). Every new prop is
 * optional. No literal colors.
 */
export function PermissionPrompt({
  kind = 'generic',
  icon,
  title,
  rationale,
  allowLabel = 'Allow',
  denyLabel = 'Not now',
  onAllow,
  onDeny,
  state = 'idle',
  deniedMessage = 'You can enable this later in Settings.',
  fullScreen = false,
  illustration,
  benefits = [],
  progress,
  onBack,
  onDismiss,
  grantedMessage = "You're all set.",
  style,
}: PermissionPromptProps): React.ReactElement {
  const { colors, tokens, scheme } = useXenitionTheme();
  /*
    §3 asks for a "tinted ground" and names `primary[50]`. Taken literally that
    is wrong on native in dark mode: `toNativeTokens` copies the LIGHT
    orientation of the ramps into both schemes (unlike the emitted CSS vars,
    which invert), so `primary[50]` paints a near-white panel behind a
    near-black page. Read the dark end of the same ramp instead — still a
    compiled token, still scheme-correct.
  */
  const tintedGround = scheme === 'dark' ? tokens.ramps.primary[900] : tokens.ramps.primary[50];

  const { height: screenHeight } = useWindowDimensions();
  const glyph = icon ?? KIND_GLYPH[kind];
  const granted = state === 'granted';
  const showHeader = fullScreen && (onBack != null || onDismiss != null || progress != null);

  const medallion = (size: number): React.ReactElement => (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: tokens.radius.full,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: granted ? colors.success : colors.primary,
      }}
    >
      <Icon glyph={granted ? '✓' : glyph} size="2xl" color={granted ? 'onSuccess' : 'onPrimary'} />
    </View>
  );

  const headline = (
    <View style={{ gap: tokens.spacing.sm }}>
      <Text accessibilityRole="header" size="2xl" weight="bold" tone="onSurface" align="center" numberOfLines={2}>
        {title}
      </Text>
      <Text size="base" tone="muted" align="center">
        {rationale}
      </Text>
    </View>
  );

  const rows =
    benefits.length > 0 ? (
      <View style={{ gap: tokens.spacing.md }}>
        {benefits.map((benefit) => (
          <View key={benefit.id} style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
            <View
              style={{
                width: TAP_TARGET,
                height: TAP_TARGET,
                borderRadius: tokens.radius.full,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: tintedGround,
              }}
            >
              <Icon glyph={benefit.icon ?? '✓'} size="base" color="primary" />
            </View>
            <View style={{ flex: 1, gap: tokens.spacing.xs }}>
              <Text size="base" weight="semibold" tone="onSurface">
                {benefit.title}
              </Text>
              {benefit.description ? (
                <Text size="sm" tone="muted">
                  {benefit.description}
                </Text>
              ) : null}
            </View>
          </View>
        ))}
      </View>
    ) : null;

  const grantedLine = (
    <View accessibilityLiveRegion="polite" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.xs }}>
      <Icon name="check" size="sm" color="success" />
      <Text size="sm" weight="semibold" tone="successText">
        {grantedMessage}
      </Text>
    </View>
  );

  const actions = (
    <>
      <GetStartedButton label={allowLabel} trailingArrow={false} loading={state === 'requesting'} onPress={onAllow} />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={denyLabel}
        onPress={onDeny}
        style={{ alignItems: 'center', justifyContent: 'center', minHeight: TAP_TARGET }}
      >
        <Text size="base" weight="medium" tone="muted">
          {denyLabel}
        </Text>
      </Pressable>
      {state === 'denied' ? (
        <View accessibilityLiveRegion="polite" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.xs }}>
          <Icon name="info" size="sm" color="muted" />
          <Text size="sm" tone="muted" align="center">
            {deniedMessage}
          </Text>
        </View>
      ) : null}
    </>
  );

  if (!fullScreen) {
    return (
      <Card style={[{ gap: tokens.spacing.md, alignItems: 'stretch' }, style]}>
        <View style={{ alignItems: 'center' }}>{medallion(MEDALLION_SIZE)}</View>
        {headline}
        {rows}
        {granted ? (
          grantedLine
        ) : (
          <View style={{ alignSelf: 'stretch', gap: tokens.spacing.sm, marginTop: tokens.spacing.xs }}>{actions}</View>
        )}
      </Card>
    );
  }

  return (
    <View style={[{ flex: 1, backgroundColor: colors.surface, gap: tokens.spacing.lg }, style]}>
      {showHeader ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          {onBack ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Back"
              onPress={onBack}
              style={{ width: TAP_TARGET, height: TAP_TARGET, alignItems: 'center', justifyContent: 'center' }}
            >
              <Icon name="chevron-left" size="xl" color="onSurface" />
            </Pressable>
          ) : (
            <View style={{ width: TAP_TARGET, height: TAP_TARGET }} />
          )}
          <View style={{ flex: 1, alignItems: 'center' }}>{progress}</View>
          {onDismiss ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Dismiss"
              onPress={onDismiss}
              style={{ width: TAP_TARGET, height: TAP_TARGET, alignItems: 'center', justifyContent: 'center' }}
            >
              <Icon name="close" size="lg" color="muted" />
            </Pressable>
          ) : (
            <View style={{ width: TAP_TARGET, height: TAP_TARGET }} />
          )}
        </View>
      ) : null}

      <View
        style={{
          alignSelf: 'stretch',
          aspectRatio: HERO_ASPECT,
          maxHeight: screenHeight * HERO_MAX_SCREEN_FRACTION,
          borderRadius: tokens.radius.lg,
          backgroundColor: tintedGround,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          padding: tokens.spacing.lg,
        }}
      >
        {illustration ?? medallion(HERO_MEDALLION_SIZE)}
      </View>

      {headline}
      {rows}

      <View
        style={{
          marginTop: 'auto',
          alignSelf: 'stretch',
          borderTopWidth: 1,
          borderTopColor: colors.border,
          backgroundColor: colors.surface,
          paddingTop: tokens.spacing.md,
          paddingBottom: tokens.spacing.lg,
          gap: tokens.spacing.sm,
        }}
      >
        {granted ? grantedLine : actions}
      </View>
    </View>
  );
}
