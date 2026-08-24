import * as React from 'react';
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
  /** Extra classes forwarded to the underlying `Badge`. */
  className?: string;
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

/**
 * A small dietary / nutrition tag — a `Badge` preset for common dish
 * attributes (vegetarian, vegan, spicy, halal, popular, …). Each `kind` maps
 * to a default label, glyph, and semantic tone, all overridable. Because the
 * badge carries a glyph *and* a text label, the attribute never relies on color
 * alone. The web `Badge` sets the on-tone text color via its tone class, so the
 * label just inherits it. Web parity of the native `NutritionBadge`; token-only.
 */
export const NutritionBadge = React.forwardRef<HTMLSpanElement, NutritionBadgeProps>(
  function NutritionBadge({ kind, label, tone, hideGlyph = false, className }, ref) {
    const meta = META[kind];
    const text = label ?? meta.label;
    const resolvedTone = tone ?? meta.tone;

    return (
      <Badge ref={ref} tone={resolvedTone} className={className}>
        {!hideGlyph ? <Icon glyph={meta.glyph} size="xs" /> : null}
        {text}
      </Badge>
    );
  }
);
