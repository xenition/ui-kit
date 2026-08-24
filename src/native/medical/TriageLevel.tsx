import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';

/** Emergency-severity levels, 1 (most acute) → 5 (least). */
export type TriageLevelValue = 1 | 2 | 3 | 4 | 5;

/** Token-derived translucent tint (no literal hex; mirrors GlassPanel). */
function withAlpha(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

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

export interface TriageLevelProps {
  /** Severity level 1–5. Out-of-range values are clamped into 1–5. */
  level: TriageLevelValue;
  /** Overrides the default level label. */
  label?: string;
  /** Overrides the default descriptive hint. */
  description?: string;
  /** Compact chip form (no description block). */
  compact?: boolean;
  style?: StyleProp<ViewStyle>;
}

function clampLevel(n: number): TriageLevelValue {
  const r = Math.round(n);
  const c = r < 1 ? 1 : r > 5 ? 5 : r;
  return c as TriageLevelValue;
}

/**
 * A triage acuity indicator (1 = immediate … 5 = non-urgent). The level is
 * always conveyed by the number + a text label + a glyph, so severity never
 * relies on the color fill alone (the color is a supporting cue only). Renders
 * a full card with a guidance hint, or a `compact` chip. Informational UI only
 * — not a medical device. Token-only colors.
 */
export function TriageLevel({
  level,
  label,
  description,
  compact = false,
  style,
}: TriageLevelProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const safe = clampLevel(level);
  const meta = LEVEL_META[safe];
  const accent = colors[meta.color];
  const text = label ?? meta.label;
  const hint = description ?? meta.hint;
  const a11y = `Triage level ${safe}, ${text}. ${hint}`;

  if (compact) {
    return (
      <View
        accessibilityLabel={a11y}
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            alignSelf: 'flex-start',
            paddingVertical: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.md,
            borderRadius: tokens.radius.full,
            backgroundColor: withAlpha(accent, 0.14),
          },
          style,
        ]}
      >
        <Text allowFontScaling={false} style={{ color: accent, fontSize: tokens.typography.scale.sm }}>
          {meta.glyph}
        </Text>
        <Text style={{ color: accent, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
          {safe} · {text}
        </Text>
      </View>
    );
  }

  return (
    <View
      accessibilityLabel={a11y}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.md,
        },
        style,
      ]}
    >
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: tokens.radius.md,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: withAlpha(accent, 0.14),
        }}
      >
        <Text style={{ color: accent, fontSize: tokens.typography.scale.xl, fontWeight: '800' }}>{safe}</Text>
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
