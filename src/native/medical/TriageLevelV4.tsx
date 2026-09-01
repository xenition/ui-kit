import * as React from 'react';
import { Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import type { TriageLevelProps, TriageLevelValue } from './TriageLevel';

/** Drop-in for {@link TriageLevelProps} — same props, the V4 "clinic" design. */
export type TriageLevelV4Props = TriageLevelProps;

interface LevelMeta {
  label: string;
  glyph: string;
  color: keyof SemanticColors;
  hint: string;
}

const LEVEL_META: Record<TriageLevelValue, LevelMeta> = {
  1: { label: 'Immediate', glyph: '⚠', color: 'danger', hint: 'Life-threatening — resuscitate now' },
  2: { label: 'Emergent', glyph: '▲', color: 'danger', hint: 'High risk — see within minutes' },
  3: { label: 'Urgent', glyph: '◆', color: 'warn', hint: 'Needs prompt evaluation' },
  4: { label: 'Less urgent', glyph: '●', color: 'primary', hint: 'Can wait — routine care' },
  5: { label: 'Non-urgent', glyph: '○', color: 'success', hint: 'Minor — lowest priority' },
};

function clampLevel(n: number): TriageLevelValue {
  const r = Math.round(n);
  const c = r < 1 ? 1 : r > 5 ? 5 : r;
  return c as TriageLevelValue;
}

/**
 * TriageLevel — **V4** "clinic" design. The calm, clinical acuity indicator
 * (1 = Immediate/resuscitation … 5 = Non-urgent): a big legible **tabular-nums**
 * number in a soft-tone well, a text label, and a glyph, so severity is always
 * number + label + glyph + supporting tone — never a color fill alone (no
 * gradient — clinical surfaces stay clean). Renders an elevated rounded card with
 * a guidance hint, or a `compact` chip. Identical props/behavior to
 * {@link TriageLevelProps}. Token-only colors via `useXenitionTheme()`.
 * Informational UI only — not a medical device.
 */
export function TriageLevelV4({
  level,
  label,
  description,
  compact = false,
  style,
}: TriageLevelV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const safe = clampLevel(level);
  const meta = LEVEL_META[safe];
  const accent = colors[meta.color];
  const text = label ?? meta.label;
  const hint = description ?? meta.hint;
  const a11y = `Triage level ${safe}, ${text}. ${hint}`;

  const shellStyle: ViewStyle = {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  };

  if (compact) {
    return (
      <View
        accessibilityLabel={a11y}
        style={[
          shellStyle,
          {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            alignSelf: 'flex-start',
            paddingVertical: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.md,
            borderRadius: tokens.radius.full,
          },
          style,
        ]}
      >
        <Text allowFontScaling={false} style={{ color: accent, fontSize: tokens.typography.scale.sm }}>
          {meta.glyph}
        </Text>
        <Text style={{ color: accent, fontSize: tokens.typography.scale.sm, fontWeight: '700', fontVariant: ['tabular-nums'] }}>
          {safe} · {text}
        </Text>
      </View>
    );
  }

  return (
    <View
      accessibilityLabel={a11y}
      style={[
        shellStyle,
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          padding: tokens.spacing.lg,
        },
        style,
      ]}
    >
      <View
        style={{
          width: 56,
          height: 56,
          borderRadius: tokens.radius.md,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: withAlpha(colors.primary, 0.1),
        }}
      >
        <Text style={{ color: accent, fontSize: tokens.typography.scale['3xl'], fontWeight: '800', fontVariant: ['tabular-nums'] }}>{safe}</Text>
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text allowFontScaling={false} style={{ color: accent, fontSize: tokens.typography.scale.sm }}>
            {meta.glyph}
          </Text>
          <Text style={{ color: accent, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{text}</Text>
        </View>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{hint}</Text>
      </View>
    </View>
  );
}
