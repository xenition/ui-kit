import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { ButtonV4 } from '../primitives/ButtonV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { metaLine } from '../primitives/internal/tone-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { spokenLine, tintGround, tintInk, toneFill, type ToneV4 } from './internal/civic-v4';
import type { AlertSeverity, CivicAlertProps } from './CivicAlert';

export interface CivicAlertV4Props extends CivicAlertProps {
  /** Override the four severity words (`'Emergency'`, `'Warning'`, …). */
  severityLabels?: Partial<Record<AlertSeverity, string>>;
  /** What the dismiss control says once it is armed. Default `'Confirm dismiss'`. */
  confirmDismissLabel?: string;
}

/** Severity → the tone it inks and tints with, and the word it always says. */
const SEVERITY_V4: Record<AlertSeverity, { label: string; glyph: string; tone: ToneV4 }> = {
  info: { label: 'Information', glyph: 'ℹ️', tone: 'primary' },
  advisory: { label: 'Advisory', glyph: '📢', tone: 'accent' },
  warning: { label: 'Warning', glyph: '⚠️', tone: 'warn' },
  emergency: { label: 'Emergency', glyph: '🚨', tone: 'danger' },
};

/**
 * **V4 civic alert** — same props as {@link CivicAlert} plus `severityLabels`
 * and `confirmDismissLabel`.
 *
 * ## Four changes
 *
 * 1. **It announces.** The base's docstring said "uses the RN `alert`
 *    accessibility role so screen readers announce it". That role sets no
 *    announcement behaviour on React Native at all without
 *    `accessibilityLiveRegion`, so the module's emergency banner was silent.
 *    An emergency or a warning is `assertive`; information and an advisory are
 *    `polite`, because announcing everything teaches a user to ignore
 *    everything.
 * 2. **The message joins the name.** The container's name was
 *    `` `${severity}: ${title}` `` — the field carrying "evacuate via Route 9"
 *    sat outside it, so the reader got the headline and none of the
 *    instruction. Severity, title, message, source and time are one sentence.
 * 3. **Dismiss takes a confirming press.** An emergency alert was dismissed
 *    irreversibly on one tap of a bare glyph, and the component offers no way
 *    to bring it back. The first press arms the control and shows
 *    `confirmDismissLabel`; the second dismisses.
 * 4. **Dismiss is a real target with a real name**, 44 with a state layer,
 *    where it was a hit-slopped glyph drawn at `opacity: 0.5` — which is inside
 *    M3's disabled band, so a pressed dismiss read as an unavailable one. The
 *    severity word takes the contrast-corrected ink rather than the fill slot
 *    it is tinted from.
 */
export function CivicAlertV4({
  severity,
  title,
  message,
  source,
  time,
  actionLabel = 'View details',
  onAction,
  onDismiss,
  severityLabels,
  confirmDismissLabel = 'Confirm dismiss',
  style,
}: CivicAlertV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const [armed, setArmed] = React.useState(false);

  const sd = SEVERITY_V4[severity] ?? SEVERITY_V4.info;
  const word = severityLabels?.[severity] ?? sd.label;
  const urgent = severity === 'emergency' || severity === 'warning';
  const meta = metaLine([source, time]);
  const tap = minTap(tokens.spacing);

  const name = spokenLine([word, title, message, source, time]);

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: tokens.spacing.md,
          padding: tokens.spacing.md,
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: toneFill(theme, sd.tone),
          backgroundColor: tintGround(theme, sd.tone),
        },
        style,
      ]}
    >
      {/* Decorative: the severity word is spoken by the block beside it. */}
      <IconV4 glyph={sd.glyph} size="xl" style={{ color: tintInk(theme, sd.tone) }} />

      <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }}>
        <View
          accessible
          accessibilityRole="alert"
          accessibilityLiveRegion={urgent ? 'assertive' : 'polite'}
          accessibilityLabel={name}
          style={{ gap: tokens.spacing.xs / 2 }}
        >
          <TextV4
            size="xs"
            weight="bold"
            style={{ color: tintInk(theme, sd.tone), textTransform: 'uppercase' }}
          >
            {word}
          </TextV4>
          <TextV4 size="base" weight="bold" tone="onSurface">
            {title}
          </TextV4>
          {message ? (
            <TextV4 size="sm" tone="onSurface">
              {message}
            </TextV4>
          ) : null}
          {meta !== '' ? (
            <TextV4 size="xs" tone="mutedText">
              {meta}
            </TextV4>
          ) : null}
        </View>

        {onAction != null ? (
          <View style={{ marginTop: tokens.spacing.sm, alignItems: 'flex-start' }}>
            <ButtonV4
              size="md"
              tone={severity === 'emergency' ? 'danger' : 'default'}
              onPress={onAction}
              style={{ minHeight: tap }}
            >
              {actionLabel}
            </ButtonV4>
          </View>
        ) : null}
      </View>

      {onDismiss != null ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={armed ? confirmDismissLabel : 'Dismiss alert'}
          onPress={() => {
            // Nothing restores a dismissed alert, so the misfire is guarded
            // rather than mourned.
            if (!armed) {
              setArmed(true);
              return;
            }
            setArmed(false);
            onDismiss();
          }}
          style={({ pressed }) => ({
            minWidth: tap,
            minHeight: tap,
            paddingHorizontal: tokens.spacing.sm,
            borderRadius: tokens.radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: pressed
              ? pressOver(theme, tintGround(theme, sd.tone), colors.onSurface)
              : 'transparent',
          })}
        >
          {armed ? (
            <TextV4 size="xs" weight="semibold" style={{ color: tintInk(theme, sd.tone) }}>
              {confirmDismissLabel}
            </TextV4>
          ) : (
            <IconV4 glyph="✕" size="sm" color="mutedText" />
          )}
        </Pressable>
      ) : null}
    </View>
  );
}
