import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { mixToken } from '../../primitives/internal/v4-depth';
import { onPair, toneFill, toneInk } from './internal/fleet-v4';
import type { RideStage, RideStatusBarProps } from './RideStatusBar';

export interface RideStatusBarV4Props extends RideStatusBarProps {
  /** Override the stage words — four English phrases lived inside the component. */
  stageLabels?: Partial<Record<RideStage, string>>;
  /** Copy for the cancelled state. Default `'Cancelled'`. */
  cancelledLabel?: string;
  /** Build the spoken position. Default `'step 2 of 4'`. */
  formatStep?: (position: number, total: number) => string;
}

/** The stages, in order. Domain knowledge, so it stays here. */
const STAGES: { key: RideStage; label: string; glyph: string }[] = [
  { key: 'requested', label: 'Requested', glyph: '🔍' },
  { key: 'arriving', label: 'Arriving', glyph: '🚗' },
  { key: 'in-trip', label: 'In trip', glyph: '🧭' },
  { key: 'completed', label: 'Completed', glyph: '🏁' },
];

/** How far a cancelled band's ground travels from the card toward `danger`. */
const CANCELLED_TINT = 0.1;

/** The connector's thickness. A hairline is 1; a rail wants two. */
const RAIL = 2;

/**
 * **V4 ride status bar** — same props as {@link RideStatusBar} plus
 * `stageLabels`, `cancelledLabel` and `formatStep`.
 *
 * ## Four changes
 *
 * 1. **A walked stage stays filled.** The base marked only the *current*
 *    stage, so the bar answered "which one is selected" when the question a
 *    rider is asking is "how far through am I".
 * 2. **The cancelled band's ink is contrast-corrected.** `colors.danger` on a
 *    10%-danger ground is the fill slot used as text at the one moment the
 *    user most needs to read it.
 * 3. **The connector reports progress**, with `accessibilityRole="progressbar"`
 *    and a real value, instead of being decorative.
 * 4. **Every stage word is a prop**, and the step position is spoken.
 */
export function RideStatusBarV4({
  stage,
  detail,
  cancelled = false,
  variant = 'stepper',
  stageLabels,
  cancelledLabel = 'Cancelled',
  formatStep,
  style,
}: RideStatusBarV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  if (cancelled) {
    return (
      <View
        accessible
        accessibilityRole="alert"
        accessibilityLabel={[cancelledLabel, detail].filter(Boolean).join(', ')}
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.sm,
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: mixToken(colors.card, colors.danger, CANCELLED_TINT),
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
          },
          style,
        ]}
      >
        <IconV4 name="close" size="base" style={{ color: toneInk(theme, 'danger') }} />
        <View style={{ flex: 1 }}>
          <TextV4 size="sm" weight="bold" tone="dangerText">
            {cancelledLabel}
          </TextV4>
          {detail ? (
            <TextV4 size="xs" tone="mutedText">
              {detail}
            </TextV4>
          ) : null}
        </View>
      </View>
    );
  }

  const activeIndex = Math.max(
    0,
    STAGES.findIndex((s) => s.key === stage)
  );
  const current = STAGES[activeIndex] ?? STAGES[0]!;
  const currentLabel = stageLabels?.[current.key] ?? current.label;
  const step = (formatStep ?? ((n: number, of: number) => `step ${n} of ${of}`))(
    activeIndex + 1,
    STAGES.length
  );
  const spoken = [currentLabel, step, detail].filter(Boolean).join(', ');

  if (variant === 'compact') {
    return (
      <View
        accessible
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 1, max: STAGES.length, now: activeIndex + 1 }}
        accessibilityLabel={spoken}
        style={[{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, style]}
      >
        <IconV4 glyph={current.glyph} size="base" />
        <TextV4 size="sm" weight="semibold" tone="onSurface" style={{ flex: 1 }}>
          {currentLabel}
        </TextV4>
        {detail ? (
          <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
            {detail}
          </TextV4>
        ) : null}
      </View>
    );
  }

  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 1, max: STAGES.length, now: activeIndex + 1 }}
      accessibilityLabel={spoken}
      style={[{ gap: tokens.spacing.xs }, style]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {STAGES.map((s, i) => {
          // A stage already walked stays filled: the bar answers "how far
          // through am I", not "which one is selected".
          const walked = i <= activeIndex;
          const tone = walked ? 'primary' : 'neutral';
          return (
            <React.Fragment key={s.key}>
              {i > 0 ? (
                <View
                  style={{
                    flex: 1,
                    height: RAIL,
                    borderRadius: tokens.radius.full,
                    backgroundColor: walked ? colors.primary : colors.border,
                  }}
                />
              ) : null}
              <View
                style={{
                  width: tokens.spacing.lg,
                  height: tokens.spacing.lg,
                  borderRadius: tokens.radius.full,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: walked ? toneFill(theme, tone) : colors.muted,
                }}
              >
                <TextV4 size="xs" style={{ color: onPair(theme, walked ? 'primary' : 'neutral') }}>
                  {s.glyph}
                </TextV4>
              </View>
            </React.Fragment>
          );
        })}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.sm }}>
        <TextV4 size="sm" weight="semibold" tone="onSurface" style={{ flex: 1 }}>
          {currentLabel}
        </TextV4>
        {detail ? (
          <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
            {detail}
          </TextV4>
        ) : null}
      </View>
    </View>
  );
}
