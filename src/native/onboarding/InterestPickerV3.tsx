import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon, Text } from '../primitives';
import { GetStartedButton } from './GetStartedButton';
import type { InterestPickerProps } from './InterestPicker';

/** Drop-in for {@link InterestPicker} — identical props, different design. */
export type InterestPickerV3Props = InterestPickerProps;

/** §10: geometry only — the 44pt minimum tap target a chip must clear. */
const TAP_TARGET = 44;

/**
 * Interest chips — V3, the compact line. No hero panel at all: a small badge
 * sits beside the headline on one row, the copy is left-aligned, and the chip
 * field is denser (a smaller type step, tighter padding) so the whole step fits
 * a sheet or a short screen without scrolling.
 *
 * `illustration` is deliberately ignored — the compact line has nowhere to put
 * a hero, and silently squeezing one in is how a "compact" screen stops being
 * compact. `logoGlyph` still drives the small leading badge.
 *
 * §7 survives the density: the chips still **wrap** and are never clipped. A
 * denser row is not a licence to hide the last option.
 *
 * Same props as {@link InterestPicker}. Token-pure.
 */
export function InterestPickerV3({
  options,
  selectedIds,
  onChange,
  title,
  helper,
  maxSelections,
  accessibilityLabel = 'Interests',
  subtitle,
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
}: InterestPickerV3Props): React.ReactElement {
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
    <View style={[{ gap: tokens.spacing.md }, style]}>
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
          ) : null}
          <View style={{ flex: 1 }}>{progress}</View>
          {onDismiss ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Dismiss"
              onPress={onDismiss}
              style={{ width: TAP_TARGET, height: TAP_TARGET, alignItems: 'center', justifyContent: 'center' }}
            >
              <Icon name="close" size="lg" color="muted" />
            </Pressable>
          ) : null}
        </View>
      ) : null}

      {/* Small leading badge beside the headline — the compact line's stand-in
          for the hero panel. Left-aligned per §11's V3 brief. */}
      {title != null || subhead != null ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
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
            <Icon glyph={logoGlyph ?? '✦'} size="lg" color="primary" />
          </View>
          <View style={{ flex: 1, gap: tokens.spacing.xs }}>
            {title ? (
              <Text accessibilityRole="header" size="lg" weight="bold" tone="onSurface" numberOfLines={2}>
                {title}
              </Text>
            ) : null}
            {subhead ? (
              <Text size="sm" tone="muted" numberOfLines={2}>
                {subhead}
              </Text>
            ) : null}
          </View>
        </View>
      ) : null}

      {caption ? (
        <Text size="sm" tone="muted">
          {caption}
        </Text>
      ) : null}

      {options.length === 0 ? (
        <View accessibilityRole="summary" style={{ paddingVertical: tokens.spacing.md }}>
          <Text size="sm" tone="muted">
            {emptyMessage}
          </Text>
        </View>
      ) : (
        <View
          accessibilityRole="list"
          accessibilityLabel={`${accessibilityLabel}, ${selectedSet.size} selected`}
          // §7 — wrap, never clip, density or no density.
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
                  paddingVertical: tokens.spacing.xs,
                  paddingHorizontal: tokens.spacing.sm,
                  opacity: disabled ? 0.45 : 1,
                }}
              >
                {selected ? <Icon name="check" size="xs" color="onPrimary" /> : null}
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
            paddingTop: tokens.spacing.sm,
            paddingBottom: tokens.spacing.lg,
            gap: tokens.spacing.xs,
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
              <Text size="sm" weight="medium" tone="muted">
                {secondaryLabel}
              </Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}
