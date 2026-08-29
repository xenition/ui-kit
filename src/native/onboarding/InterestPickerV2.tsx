import * as React from 'react';
import { Pressable, View, useWindowDimensions } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon, Text } from '../primitives';
import { shadow } from '../primitives/internal/elevation';
import { GetStartedButton } from './GetStartedButton';
import type { InterestPickerProps } from './InterestPicker';

/** Drop-in for {@link InterestPicker} — identical props, different design. */
export type InterestPickerV2Props = InterestPickerProps;

/** §10: geometry only — the 44pt minimum tap target a chip must clear. */
const TAP_TARGET = 44;
/** §3: the hero never eats more than ~38% of the screen, even full-bleed. */
const HERO_MAX_SCREEN_FRACTION = 0.38;

/**
 * Interest chips — V2, the editorial line. The hero runs full-bleed to the top
 * edge with no radius and no inset, and the content rises over it on a sheet
 * whose top corners are rounded and which overlaps the seam. The chips
 * themselves keep §7 exactly: they **wrap**, they never scroll sideways, and no
 * option is ever clipped out of reach.
 *
 * Same props as {@link InterestPicker}. Token-pure.
 */
export function InterestPickerV2({
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
}: InterestPickerV2Props): React.ReactElement {
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
  const caption = subtitle != null ? helper : undefined;
  const showHeader = onBack != null || onDismiss != null || progress != null;

  return (
    <View style={[{ backgroundColor: colors.surface }, style]}>
      {/* Full-bleed hero: no radius, no inset, runs to the top edge. */}
      <View
        style={{
          height: screenHeight * HERO_MAX_SCREEN_FRACTION,
          backgroundColor: tintedGround,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
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
            <Icon glyph={logoGlyph ?? '✦'} size="3xl" color="onPrimary" />
          </View>
        )}

        {showHeader ? (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              flexDirection: 'row',
              alignItems: 'center',
              gap: tokens.spacing.sm,
              paddingHorizontal: tokens.spacing.sm,
            }}
          >
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
      </View>

      {/* The sheet rises over the hero and carries everything else. */}
      <View
        style={{
          marginTop: -tokens.spacing.xl,
          padding: tokens.spacing.xl,
          gap: tokens.spacing.lg,
          backgroundColor: colors.surface,
          borderTopLeftRadius: tokens.radius.lg,
          borderTopRightRadius: tokens.radius.lg,
          ...shadow('lg', tokens),
        }}
      >
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
            // §7 — wrap, never clip.
            style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }}
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
            style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}
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
    </View>
  );
}
