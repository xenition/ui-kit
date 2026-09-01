import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { mixToken } from '../../primitives/internal/v4-depth';
import { toneInk, type FarmTone } from './internal/farm-v4';
import type { PestAlertProps, PestSeverity } from './PestAlert';

export interface PestAlertV4Props extends PestAlertProps {
  /** Override the severity names — four English words lived inside the component. */
  severityLabels?: Partial<Record<PestSeverity, string>>;
  /** Label above the recommendation. Default `'Recommended action'`. */
  recommendationLabel?: string;
  /** Label above the affected area. Default `'Affected'`. */
  affectedLabel?: string;
}

/**
 * Severity → tone and default label.
 *
 * `critical` and `high` share `danger` deliberately: the tone scale has three
 * steps and the severity scale has four, and collapsing them at the top is
 * right — a colour that means "worse than the worst" does not exist, and the
 * **word** is what separates them.
 */
const SEVERITY_META: Record<PestSeverity, { label: string; tone: FarmTone }> = {
  low: { label: 'Low', tone: 'success' },
  moderate: { label: 'Moderate', tone: 'warn' },
  high: { label: 'High', tone: 'danger' },
  critical: { label: 'Critical', tone: 'danger' },
};

/** How far the alert's ground travels from the card toward its severity tone. */
const GROUND_TINT = 0.1;

/** The severity rail down the leading edge. 3px — a bar, not a hairline. */
const RAIL = 3;

/**
 * **V4 pest alert** — same props as {@link PestAlert} plus `severityLabels`,
 * `recommendationLabel` and `affectedLabel`.
 *
 * ## Four changes
 *
 * 1. **The severity reads without colour.** A tinted ground and a coloured
 *    glyph are both colour-only signals; V4 keeps them and adds the badge word
 *    and a leading rail, so severity survives greyscale and CVD.
 * 2. **The tint is mixed from resolved semantic colours**, so it lands on the
 *    correct side of the page in dark mode instead of being a pale wash.
 * 3. **The glyph and headings take the contrast-corrected ink**
 *    (`warnText`, `dangerText`) rather than the fill slots the base put on text.
 * 4. **The recommendation is labelled.** The base rendered it as a bare
 *    paragraph under the pest name, so the most actionable line on the card
 *    read as more description.
 *
 * **Renders nothing without a `pest`** (§4.5).
 */
export function PestAlertV4({
  pest,
  severity = 'moderate',
  affected,
  recommendation,
  detectedAt,
  icon = '🐛',
  actionLabel,
  onAction,
  severityLabels,
  recommendationLabel = 'Recommended action',
  affectedLabel = 'Affected',
  style,
}: PestAlertV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!pest) return null;

  const meta = SEVERITY_META[severity];
  const label = severityLabels?.[severity] ?? meta.label;
  const ink = toneInk(theme, meta.tone);
  const fill =
    meta.tone === 'success' ? colors.success : meta.tone === 'warn' ? colors.warn : colors.danger;

  return (
    <View
      accessibilityRole="alert"
      style={[
        {
          flexDirection: 'row',
          gap: tokens.spacing.md,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: mixToken(colors.card, fill, GROUND_TINT),
          padding: tokens.spacing.md,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      {/* The rail is the non-colour half of the severity signal: it is wider
          for a worse alert, so the difference is visible in greyscale. */}
      <View
        style={{
          width: RAIL,
          alignSelf: 'stretch',
          borderRadius: tokens.radius.full,
          backgroundColor: fill,
        }}
      />

      <View style={{ flex: 1, gap: tokens.spacing.sm }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <IconV4 glyph={icon} size="lg" style={{ color: ink }} />
          <TextV4 face="heading" size="base" weight="bold" tone="onCard" style={{ flex: 1 }}>
            {pest}
          </TextV4>
          <BadgeV4 tone={meta.tone} variant="soft" size="sm">
            {label}
          </BadgeV4>
        </View>

        {affected ? (
          <View style={{ gap: tokens.spacing.xs / 2 }}>
            <TextV4 size="xs" weight="semibold" tone="mutedText">
              {affectedLabel}
            </TextV4>
            <TextV4 size="sm" tone="onCard">
              {affected}
            </TextV4>
          </View>
        ) : null}

        {recommendation ? (
          <View style={{ gap: tokens.spacing.xs / 2 }}>
            <TextV4 size="xs" weight="semibold" tone="mutedText">
              {recommendationLabel}
            </TextV4>
            <TextV4 size="sm" tone="onCard">
              {recommendation}
            </TextV4>
          </View>
        ) : null}

        {detectedAt ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            <IconV4 name="clock" size="xs" color="mutedText" />
            <TextV4 size="xs" tone="mutedText">
              {detectedAt}
            </TextV4>
          </View>
        ) : null}

        {actionLabel && onAction ? (
          <ButtonV4
            variant="secondary"
            size="sm"
            onPress={onAction}
            accessibilityLabel={actionLabel}
            style={{ alignSelf: 'flex-start' }}
          >
            {actionLabel}
          </ButtonV4>
        ) : null}
      </View>
    </View>
  );
}
