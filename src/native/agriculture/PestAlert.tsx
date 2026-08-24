import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Icon, Badge, Button } from '../primitives';

/** Pressure / threat level — colors the alert and is stated as a text chip. */
export type PestSeverity = 'low' | 'moderate' | 'high' | 'critical';

export interface PestAlertProps {
  /** Pest / disease name (e.g. "Aphid infestation"). */
  pest: string;
  /** Threat level. Default `'moderate'` — colors banner + text chip. */
  severity?: PestSeverity;
  /** Affected crop or field (e.g. "Tomatoes · Greenhouse 2"). */
  affected?: string;
  /** Recommended action / note. */
  recommendation?: string;
  /** Detection hint (e.g. "Detected 2h ago"). */
  detectedAt?: string;
  /** Leading glyph/emoji. Default `'🐛'`. */
  icon?: string;
  /** Label for the primary action button; omit to hide it. */
  actionLabel?: string;
  /** Fires when the action button is pressed. */
  onAction?: () => void;
  style?: StyleProp<ViewStyle>;
}

/** Token-derived translucent tint (no literal hex; mirrors the primitives). */
function withAlpha(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const SEVERITY_META: Record<
  PestSeverity,
  { label: string; color: keyof SemanticColors; tone: 'success' | 'warn' | 'danger' }
> = {
  low: { label: 'Low', color: 'success', tone: 'success' },
  moderate: { label: 'Moderate', color: 'warn', tone: 'warn' },
  high: { label: 'High', color: 'danger', tone: 'danger' },
  critical: { label: 'Critical', color: 'danger', tone: 'danger' },
};

/**
 * A pest / disease alert — a tinted, accent-barred callout with a bug glyph, the
 * pest name, affected crop/field, an optional recommendation + detection time,
 * and an optional action {@link Button}. Severity drives the color, but the text
 * {@link Badge} states it too, so the alert never relies on color alone.
 * Announced via `accessibilityRole="alert"`. The tint is a token-derived
 * `withAlpha` of the severity slot — no literal colors.
 */
export function PestAlert({
  pest,
  severity = 'moderate',
  affected,
  recommendation,
  detectedAt,
  icon = '🐛',
  actionLabel,
  onAction,
  style,
}: PestAlertProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = SEVERITY_META[severity];
  const accent = colors[meta.color];

  return (
    <View
      accessibilityRole="alert"
      accessibilityLabel={`${meta.label} pest alert: ${pest}${affected ? ` on ${affected}` : ''}`}
      style={[
        {
          padding: tokens.spacing.md,
          borderRadius: tokens.radius.md,
          borderLeftWidth: 4,
          borderLeftColor: accent,
          backgroundColor: withAlpha(accent, 0.12),
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <Icon glyph={icon} size="xl" color={meta.color} />
        <View style={{ flex: 1 }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {pest}
          </Text>
          {affected != null ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {affected}
            </Text>
          ) : null}
        </View>
        <Badge tone={meta.tone} variant="soft" size="sm">
          {meta.label}
        </Badge>
      </View>

      {recommendation != null ? (
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, marginTop: tokens.spacing.sm }}>
          {recommendation}
        </Text>
      ) : null}

      {detectedAt != null ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, marginTop: 4 }}>
          🕓 {detectedAt}
        </Text>
      ) : null}

      {actionLabel != null ? (
        <View style={{ marginTop: tokens.spacing.md, alignSelf: 'flex-start' }}>
          <Button size="sm" tone={meta.tone === 'success' ? 'default' : meta.tone === 'warn' ? 'default' : 'danger'} onPress={onAction}>
            {actionLabel}
          </Button>
        </View>
      ) : null}
    </View>
  );
}
