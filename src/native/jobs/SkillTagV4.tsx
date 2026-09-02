import * as React from 'react';
import { Pressable, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { onPair, spokenName, toneFill, type ToneV4 } from './internal/tone-v4';
import type { SkillTagProps, SkillTagVariant } from './SkillTag';

export interface SkillTagV4Props extends SkillTagProps {
  /** Name of the ✕ affordance. Default `'Remove'`. */
  removeLabel?: string;
  /**
   * What each variant *means*, spoken after the label. Default
   * `matched` → `'on your résumé'`, `missing` → `'missing from your résumé'`;
   * `default` says nothing extra.
   */
  variantLabels?: Partial<Record<SkillTagVariant, string>>;
}

/** Variant → the tone it fills with. `default` is not a tone; it is a chip. */
const VARIANT_TONE: Record<SkillTagVariant, ToneV4 | null> = {
  default: null,
  matched: 'success',
  missing: 'danger',
};

/** The non-colour signal, so the variant survives greyscale and CVD. */
const MARKER: Record<SkillTagVariant, string> = {
  default: '',
  matched: '✓ ',
  missing: '! ',
};

/** What the variant means, in words, for the reader. */
const VARIANT_MEANING: Partial<Record<SkillTagVariant, string>> = {
  matched: 'on your résumé',
  missing: 'missing from your résumé',
};

/**
 * **V4 skill tag** — same props as {@link SkillTag} plus `removeLabel` and
 * `variantLabels`.
 *
 * ## Four changes
 *
 * 1. **The ✕ is a sibling of the chip, not a child of it.** The base nested a
 *    remove `Pressable` *inside* the chip's own `Pressable`. On native the
 *    outer one is `accessible` by default and flattens its subtree, so the ✕
 *    was not a focus stop at all — a VoiceOver user could not remove a skill;
 *    on web the same shape emits a `<button>` inside a `<button>`, which is
 *    invalid HTML and invalid ARIA. Both halves are now real siblings inside a
 *    plain chip container, so there are two names where there are two actions.
 * 2. **The variant's meaning survives.** `accessibilityLabel={label}`
 *    overrode the visible `!` marker, so a skill the applicant does **not**
 *    have announced identically to one they do. The name now carries the
 *    meaning — "GraphQL, missing from your résumé" — and `variantLabels`
 *    re-words it.
 * 3. **`border` was the default chip's ground.** `border` is a hairline
 *    colour; used as a fill it makes a chip read as a disabled input. The
 *    neutral chip is now `card` with a hairline, and the two toned variants go
 *    through `toneFill`/`onPair` so their ink is the compiler's guaranteed
 *    pair rather than a hopeful `onSuccess`.
 * 4. **Press is a state layer and the targets clear 44.** The base drew press
 *    as `opacity: 0.85` — inside M3's disabled band, so a pressed chip read as
 *    unavailable — and gave the ✕ nothing but `hitSlop`. A chip that is not
 *    interactive keeps its compact size: there is no target, so there is no
 *    floor to clear.
 *
 * **Renders nothing without a `label`** (§4.5).
 */
export function SkillTagV4({
  label,
  variant = 'default',
  selected = false,
  onPress,
  onRemove,
  removeLabel = 'Remove',
  variantLabels,
  style,
}: SkillTagV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!label) return null;

  const tone = VARIANT_TONE[variant];
  const ground = tone ? toneFill(theme, tone) : colors.card;
  const ink = tone ? onPair(theme, tone) : colors.onCard;
  const meaning = variantLabels?.[variant] ?? VARIANT_MEANING[variant];
  const tap = minTap(tokens.spacing);

  // A chip nobody can press is a caption, and §7's 44 floor is about targets.
  // Sizing a decorative keyword chip to a thumb would make a job card's skill
  // row three times as tall for no gain.
  const interactive = onPress != null || onRemove != null;

  const chip: ViewStyle = {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: ground,
    borderRadius: tokens.radius.sm,
    // A hairline, plus the selected outline the base drew — a ring, never a
    // different fill, so a chosen chip does not change what it means.
    borderWidth: selected ? 2 : 1,
    borderColor: selected ? colors.primary : tone ? ground : colors.border,
    minHeight: interactive ? tap : undefined,
  };

  const bodyPad: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: interactive ? tap : undefined,
    paddingVertical: tokens.spacing.xs,
    paddingHorizontal: tokens.spacing.sm,
  };

  const text = (
    <TextV4 size="xs" weight="medium" numberOfLines={1} style={{ color: ink }}>
      {`${MARKER[variant]}${label}`}
    </TextV4>
  );

  const body = onPress ? (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={spokenName([label, meaning])}
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        bodyPad,
        { backgroundColor: pressed ? pressOver(theme, ground, ink) : 'transparent' },
      ]}
    >
      {text}
    </Pressable>
  ) : (
    <View accessible accessibilityLabel={spokenName([label, meaning])} style={bodyPad}>
      {text}
    </View>
  );

  return (
    <View style={[chip, style]}>
      {body}
      {onRemove ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={spokenName([removeLabel, label])}
          onPress={onRemove}
          style={({ pressed }) => ({
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: tap,
            minHeight: tap,
            backgroundColor: pressed ? pressOver(theme, ground, ink) : 'transparent',
          })}
        >
          <TextV4 size="xs" weight="semibold" style={{ color: ink }}>
            ×
          </TextV4>
        </Pressable>
      ) : null}
    </View>
  );
}
