import * as React from 'react';
import { Pressable, View, useWindowDimensions, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon, Text } from '../primitives';
import { GetStartedButton } from './GetStartedButton';
import type { InterestOption } from './types';

/*
  Geometry, not theme. ONBOARDING-DESIGN-SPEC §10 allows exactly these bare
  numbers: the 44pt minimum tap target a chip and a header control must clear
  (§7), and the 56 the sticky CTA and the §6 fields stand at. Everything else on
  this screen — every colour, radius, gap and font size — comes from the theme.
*/
const TAP_TARGET = 44;

/** §3: the hero panel is roughly 4:3 and never eats more than ~38% of the screen. */
const HERO_ASPECT = 4 / 3;
const HERO_MAX_SCREEN_FRACTION = 0.38;

export interface InterestPickerProps {
  /** Choosable topics. Empty renders the empty state. */
  options: InterestOption[];
  /** Currently selected ids (controlled). */
  selectedIds: string[];
  /** Fires with the full next selection set on each toggle. */
  onChange: (selectedIds: string[]) => void;
  /** Optional heading above the chips. */
  title?: string;
  /** Optional helper line (e.g. `'Pick at least 3'`). */
  helper?: string;
  /** Cap on selections; chips past the cap disable when unselected. */
  maxSelections?: number;
  /** Accessible name for the chip group. Default `'Interests'`. */
  accessibilityLabel?: string;
  /**
   * Supporting line under the headline (§4). Falls back to `helper` when only
   * `helper` is given, so an existing caller's one line still reads as the
   * subhead rather than disappearing.
   */
  subtitle?: string;
  /** Hero art for the step (§3). Rendered in a centred, tinted panel. */
  illustration?: React.ReactNode;
  /** Glyph for the fallback hero medallion when `illustration` is absent (§3). */
  logoGlyph?: string;
  /**
   * Header progress slot (§1/§2) — pass the segmented bars, e.g.
   * `<ProgressDots variant="bars" count={4} activeIndex={1} />`. A slot rather
   * than a `steps` number so this screen never owns the progress rendering.
   */
  progress?: React.ReactNode;
  /** Renders the header's back control. */
  onBack?: () => void;
  /** Renders the header's dismiss (✕) control. */
  onDismiss?: () => void;
  /**
   * Validation message (e.g. `'Pick at least 3 to continue'`). Rendered as a
   * `dangerText` line beside a danger glyph — never colour alone.
   */
  error?: string;
  /** Sticky-footer CTA copy. The footer is hidden without `onContinue`. */
  ctaLabel?: string;
  /** Fires from the sticky CTA. */
  onContinue?: () => void;
  /** CTA spinner + block. */
  loading?: boolean;
  /** Secondary action under the CTA (`'Skip'`). Hidden without `onSecondary`. */
  secondaryLabel?: string;
  /** Fires from the secondary link. */
  onSecondary?: () => void;
  /** Empty-state copy. Default `'No topics to choose from.'`. */
  emptyMessage?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Multi-select interest chips — the "personalize your feed" onboarding step,
 * built to the step anatomy in `ONBOARDING-DESIGN-SPEC.md`: an optional header
 * (back · progress · dismiss), a hero slot, a centred headline block, the chip
 * field, and an optional sticky CTA footer.
 *
 * **The chips wrap and are never clipped.** The shipped screen scrolled its
 * options horizontally and cut the last one off the right edge —
 * "Pace / Filler words / Clarity / Structure / Confiden…" — which made that
 * option impossible to choose at all, not merely hard to read. §7 is therefore
 * a hard rule here: `flexWrap: 'wrap'` with `spacing.sm` gaps and no horizontal
 * scroll container anywhere in this file. A user cannot choose what they cannot
 * see.
 *
 * Selected chips take the `primary` fill with an `onPrimary` label; unselected
 * chips are `surface` with a `border` outline; both clear the 44pt tap target.
 * Selection state is announced per-chip and the running count is exposed on the
 * group. Enforces an optional `maxSelections` cap and guards an empty option
 * list. Every new prop is optional — a caller passing only the original
 * `options`/`selectedIds`/`onChange` gets the same component it always had, in
 * better clothes. No literal colors.
 */
export function InterestPicker({
  options,
  selectedIds,
  onChange,
  title,
  helper,
  maxSelections,
  accessibilityLabel = 'Interests',
  subtitle,
  illustration,
  logoGlyph,
  progress,
  onBack,
  onDismiss,
  error,
  ctaLabel = 'Continue',
  onContinue,
  loading = false,
  secondaryLabel,
  onSecondary,
  emptyMessage = 'No topics to choose from.',
  style,
}: InterestPickerProps): React.ReactElement {
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
  const selectedSet = React.useMemo(() => new Set(selectedIds), [selectedIds]);
  const atCap = maxSelections != null && selectedSet.size >= maxSelections;

  const toggle = (id: string): void => {
    const next = new Set(selectedSet);
    if (next.has(id)) next.delete(id);
    else {
      if (atCap) return;
      next.add(id);
    }
    onChange(Array.from(next));
  };

  const subhead = subtitle ?? helper;
  // `helper` keeps its own slot only when it is not already doing the subhead's
  // job, so the two never print the same sentence twice.
  const caption = subtitle != null ? helper : undefined;
  const showHeader = onBack != null || onDismiss != null || progress != null;
  const showHero = illustration != null || logoGlyph != null;

  return (
    <View style={[{ gap: tokens.spacing.lg }, style]}>
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

      {showHero ? (
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
          {illustration ?? (
            <View
              style={{
                width: TAP_TARGET * 2,
                height: TAP_TARGET * 2,
                borderRadius: tokens.radius.full,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.primary,
              }}
            >
              <Icon glyph={logoGlyph} size="3xl" color="onPrimary" />
            </View>
          )}
        </View>
      ) : null}

      {title != null || subhead != null ? (
        <View style={{ gap: tokens.spacing.sm }}>
          {title ? (
            <Text accessibilityRole="header" size="2xl" weight="bold" tone="onSurface" align="center" numberOfLines={2}>
              {title}
            </Text>
          ) : null}
          {subhead ? (
            <Text size="base" tone="muted" align="center" numberOfLines={3}>
              {subhead}
            </Text>
          ) : null}
        </View>
      ) : null}

      {caption ? (
        <Text size="sm" tone="muted" align="center">
          {caption}
        </Text>
      ) : null}

      {options.length === 0 ? (
        <View accessibilityRole="summary" style={{ padding: tokens.spacing.lg, alignItems: 'center' }}>
          <Text size="base" tone="muted" align="center">
            {emptyMessage}
          </Text>
        </View>
      ) : (
        <View
          accessibilityRole="list"
          accessibilityLabel={`${accessibilityLabel}, ${selectedSet.size} selected`}
          // §7 — wrap, never scroll. This one line is the fix for an option the
          // user could not reach.
          style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm, justifyContent: 'center' }}
        >
          {options.map((opt) => {
            const selected = selectedSet.has(opt.id);
            const disabled = !selected && atCap;
            return (
              <Pressable
                key={opt.id}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: selected, disabled }}
                accessibilityLabel={opt.label}
                disabled={disabled}
                onPress={() => toggle(opt.id)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: tokens.spacing.xs,
                  minHeight: TAP_TARGET,
                  borderRadius: tokens.radius.full,
                  borderWidth: 1,
                  borderColor: selected ? colors.primary : colors.border,
                  backgroundColor: selected ? colors.primary : colors.surface,
                  paddingVertical: tokens.spacing.sm,
                  paddingHorizontal: tokens.spacing.md,
                  opacity: disabled ? 0.45 : 1,
                }}
              >
                {selected ? (
                  <Icon name="check" size="sm" color="onPrimary" />
                ) : opt.icon ? (
                  <Icon glyph={opt.icon} size="sm" color="onSurface" />
                ) : null}
                <Text size="sm" weight="semibold" tone={selected ? 'onPrimary' : 'onSurface'}>
                  {opt.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      )}

      {error ? (
        <View
          accessibilityLiveRegion="assertive"
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.xs }}
        >
          <Icon name="error" size="sm" color="danger" />
          <Text size="sm" tone="dangerText">
            {error}
          </Text>
        </View>
      ) : null}

      {onContinue ? (
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
          <GetStartedButton label={ctaLabel} loading={loading} onPress={onContinue} />
          {secondaryLabel && onSecondary ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={secondaryLabel}
              onPress={onSecondary}
              style={{ alignItems: 'center', justifyContent: 'center', minHeight: TAP_TARGET }}
            >
              <Text size="base" weight="medium" tone="muted">
                {secondaryLabel}
              </Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}
