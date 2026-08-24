import * as React from 'react';
import { Text } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { SemanticColors } from '../theme';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { Icon } from '../primitives/Icon';

/** Well-known dietary / dish attributes with a default glyph + tone. */
export type NutritionKind =
  | 'vegetarian'
  | 'vegan'
  | 'gluten-free'
  | 'spicy'
  | 'halal'
  | 'popular'
  | 'new'
  | 'calories';

export interface NutritionBadgeProps {
  /** Attribute to render; sets the default glyph, label, and tone. */
  kind: NutritionKind;
  /** Override the label text (e.g. "420 cal" for `calories`). */
  label?: string;
  /** Override the semantic tone. */
  tone?: BadgeTone;
  /** Hide the leading glyph. */
  hideGlyph?: boolean;
}

const META: Record<NutritionKind, { label: string; glyph: string; tone: BadgeTone }> = {
  vegetarian: { label: 'Vegetarian', glyph: '🥬', tone: 'success' },
  vegan: { label: 'Vegan', glyph: '🌱', tone: 'success' },
  'gluten-free': { label: 'Gluten-free', glyph: '🌾', tone: 'neutral' },
  spicy: { label: 'Spicy', glyph: '🌶️', tone: 'danger' },
  halal: { label: 'Halal', glyph: '☪️', tone: 'neutral' },
  popular: { label: 'Popular', glyph: '🔥', tone: 'warn' },
  new: { label: 'New', glyph: '✨', tone: 'primary' },
  calories: { label: 'Calories', glyph: '🔢', tone: 'neutral' },
};

/** Resolve a tone to its contrast-guaranteed on-tone text color. */
function onToneColor(tone: BadgeTone, colors: SemanticColors): string {
  switch (tone) {
    case 'primary':
      return colors.onPrimary;
    case 'success':
      return colors.onSuccess;
    case 'warn':
      return colors.onWarn;
    case 'danger':
      return colors.onDanger;
    case 'neutral':
    default:
      return colors.onSurface;
  }
}

/**
 * A small dietary / nutrition tag — a `Badge` preset for common dish
 * attributes (vegetarian, vegan, spicy, halal, popular, …). Each `kind` maps
 * to a default label, glyph, and semantic tone, all overridable. Because the
 * badge carries a glyph *and* a text label, the attribute never relies on color
 * alone. Reuses the `Badge` and `Icon` primitives. Token-only.
 */
export function NutritionBadge({
  kind,
  label,
  tone,
  hideGlyph = false,
}: NutritionBadgeProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = META[kind];
  const text = label ?? meta.label;
  const resolvedTone = tone ?? meta.tone;

  return (
    <Badge tone={resolvedTone}>
      {!hideGlyph ? <Icon glyph={meta.glyph} size="xs" /> : null}
      {/* Children are a fragment, so Badge won't auto-color a string child —
          we set the on-tone text color explicitly. */}
      <Text
        style={{
          color: onToneColor(resolvedTone, colors),
          fontSize: tokens.typography.scale.xs,
          fontWeight: '600',
        }}
      >
        {text}
      </Text>
    </Badge>
  );
}
