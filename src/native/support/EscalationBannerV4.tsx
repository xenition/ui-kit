import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Button, type ButtonTone } from '../primitives/Button';
import { withAlpha } from './internal';
import type { EscalationBannerProps, EscalationLevel } from './EscalationBanner';

/** Drop-in for {@link EscalationBannerProps} — same props, the V4 "calm console" design. */
export type EscalationBannerV4Props = EscalationBannerProps;

interface LevelSpec {
  slot: keyof SemanticColors;
  glyph: string;
  role: string;
  /** Escalate button tone. */
  escalateTone: ButtonTone;
}

// critical → danger, warning → warn, info → primary. The role word + glyph carry
// severity so it's never color-alone.
const LEVEL: Record<EscalationLevel, LevelSpec> = {
  info: { slot: 'primary', glyph: 'ℹ', role: 'Notice', escalateTone: 'primary' },
  warning: { slot: 'warn', glyph: '⚠', role: 'Warning', escalateTone: 'default' },
  critical: { slot: 'danger', glyph: '⛔', role: 'Critical', escalateTone: 'danger' },
};

/**
 * EscalationBanner — **V4** "calm console" design. A prominent-but-calm banner:
 * an elevated rounded card with a left severity-accent bar (the signature at-a-
 * glance cue), a leading glyph in a soft-tint chip, and a role word
 * ("Warning"/"Critical") — severity is encoded by glyph **and** color (never
 * color alone), mapping `critical`→danger, `warning`→warn, `info`→primary.
 * Exposes an "Escalate" primary action (`onEscalate`, with an optional busy
 * spinner) and an "Acknowledge" dismiss (`onAcknowledge`); both actions are
 * ≥44px tall. Same props/behavior as {@link EscalationBannerProps}; token-only
 * colors via `useXenitionTheme()` + `withAlpha` (no literal hex).
 */
export function EscalationBannerV4({
  level = 'warning',
  title,
  message,
  onEscalate,
  onAcknowledge,
  escalateLabel = 'Escalate',
  acknowledgeLabel = 'Acknowledge',
  escalating = false,
  style,
}: EscalationBannerV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const spec = LEVEL[level] ?? LEVEL.warning;
  const accent = colors[spec.slot];

  return (
    <View
      accessibilityRole="alert"
      accessibilityLabel={`${spec.role}: ${title}${message ? `. ${message}` : ''}`}
      style={[
        {
          flexDirection: 'row',
          backgroundColor: colors.card,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          overflow: 'hidden',
          shadowColor: colors.onSurface,
          shadowOpacity: 0.06,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 3 },
          elevation: 2,
        },
        style,
      ]}
    >
      {/* Left severity-accent bar — the V4 at-a-glance cue. */}
      <View style={{ width: 4, backgroundColor: accent }} />

      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.md, padding: tokens.spacing.md, flex: 1 }}>
        {/* Soft-tint severity chip with leading glyph. */}
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: tokens.radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: withAlpha(accent, 0.12),
          }}
        >
          <Text style={{ color: accent, fontSize: tokens.typography.scale.lg, fontWeight: '700' }} accessibilityLabel={spec.role}>
            {spec.glyph}
          </Text>
        </View>
        <View style={{ flex: 1, gap: tokens.spacing.xs }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {title}
          </Text>
          {message ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{message}</Text>
          ) : null}
          {onEscalate || onAcknowledge ? (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm, marginTop: tokens.spacing.xs }}>
              {onEscalate ? (
                <Button size="sm" tone={spec.escalateTone} loading={escalating} onPress={onEscalate} style={{ minHeight: 44 }}>
                  {escalateLabel}
                </Button>
              ) : null}
              {onAcknowledge ? (
                <Button size="sm" variant="ghost" onPress={onAcknowledge} style={{ minHeight: 44 }}>
                  {acknowledgeLabel}
                </Button>
              ) : null}
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}
