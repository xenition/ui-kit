import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { withAlpha } from '../primitives/internal/color';

/** A single key fact in a {@link PropertyFactsBar} — a glyph, a label and a big value. */
export interface PropertyFact {
  /**
   * Optional decorative glyph for the fact (e.g. `'🛏'`, `'🛁'`, `'📐'`). Purely
   * ornamental — hidden from a11y; the `label`/`value` carry the meaning.
   */
  glyph?: string;
  /** Muted caption under the value (e.g. `'Beds'`, `'Sqft'`, `'Year'`). */
  label: string;
  /** The big legible fact numeral/text (e.g. `'3'`, `'1,450'`, `'Condo'`). */
  value: string;
}

export interface PropertyFactsBarProps {
  /**
   * The ordered key facts to display, each a `{ glyph?, label, value }` cell
   * (e.g. Beds 3 / Baths 2 / Sqft 1,450 / Lot 0.2ac / Year 1998 / Type Condo).
   * Wraps to new rows when the cells overflow the bar's width.
   */
  facts: readonly PropertyFact[];
  /**
   * Fixed number of columns for the fact grid. When omitted the strip lays the
   * cells out at ~2 per row and wraps. Clamped to `1–6`.
   */
  columns?: number;
  /**
   * Accessible label for the whole strip. Defaults to `'Key facts'`. Announced
   * on the enclosing group so it reads as a unit.
   */
  accessibilityLabel?: string;
  /** Container style override. */
  style?: StyleProp<ViewStyle>;
}

/**
 * PropertyFactsBar — **V4** "listing" design. A key-facts stat strip for a
 * property: a wrapping grid of fact cells, each a soft-primary tinted glyph
 * disc, a BIG bold value numeral and a muted label beneath, split by hairline
 * rules. Editorial, single-accent (primary), 8-pt spacing inside a rounded
 * elevated card. Presentational only — token-only colors via
 * `useXenitionTheme()`, no literals; dark-mode safe. Exposed as an a11y group.
 */
export function PropertyFactsBar({
  facts,
  columns,
  accessibilityLabel = 'Key facts',
  style,
}: PropertyFactsBarProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const cols = columns != null ? Math.max(1, Math.min(6, Math.round(columns))) : 2;
  const widthPct = `${100 / cols}%` as const;

  return (
    <View
      accessible
      accessibilityRole="summary"
      accessibilityLabel={accessibilityLabel}
      style={[
        {
          backgroundColor: colors.card,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          padding: tokens.spacing.sm,
          flexDirection: 'row',
          flexWrap: 'wrap',
          shadowColor: colors.onSurface,
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 3,
        },
        style,
      ]}
    >
      {facts.map((fact, i) => (
        <View
          key={`${fact.label}-${i}`}
          style={{
            width: widthPct,
            alignItems: 'center',
            gap: tokens.spacing.xs,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.xs,
            // Hairline separator between cells within a row.
            borderLeftWidth: i % cols === 0 ? 0 : 1,
            borderLeftColor: colors.border,
          }}
        >
          {fact.glyph ? (
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: tokens.radius.full,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: withAlpha(colors.primary, 0.1),
              }}
            >
              <Text style={{ fontSize: tokens.typography.scale.base, color: colors.primary }}>{fact.glyph}</Text>
            </View>
          ) : null}
          <Text style={{ fontSize: tokens.typography.scale.xl, fontWeight: '700', color: colors.onSurface }}>
            {fact.value}
          </Text>
          <Text
            style={{
              fontSize: tokens.typography.scale.xs,
              fontWeight: '500',
              color: colors.mutedText,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}
          >
            {fact.label}
          </Text>
        </View>
      ))}
    </View>
  );
}
