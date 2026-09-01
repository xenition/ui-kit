import * as React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useXenitionTheme } from '../theme';
import { ButtonV4 } from '../primitives/ButtonV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { metaLine } from '../primitives/internal/tone-v4';
import { discGround, discInk, spokenLine, type ToneV4 } from './internal/job-v4';
import type { ButtonTone } from '../primitives';
import type { DispatchBarProps, DispatchStage } from './DispatchBar';

export interface DispatchBarV4Props extends DispatchBarProps {
  /**
   * The label the primary action takes once an irreversible advance is armed.
   * Default `` `Confirm ${next}` ``.
   */
  confirmAdvanceLabel?: (next: string) => string;
  /** Override the five stage names — they lived inside the component. */
  stageLabels?: Partial<Record<DispatchStage, string>>;
}

interface StageMetaV4 {
  label: string;
  glyph: string;
  tone: ToneV4;
  advance?: string;
  next?: DispatchStage;
  buttonTone?: ButtonTone;
}

/**
 * Stage → word, glyph, chip tone and the action that leaves it.
 *
 * The stages in the middle of the workflow take no status colour: a dispatch
 * stage is where a job sits in a queue, not how it turned out, and the base
 * painted "En route" amber and "On site" green — spending the two colours that
 * have to mean "look at this" and "this went well" on a position in a list.
 * Only `complete`, which really is an outcome, keeps `success`. `buttonTone` is
 * a separate decision: it colours the *action*, not the state.
 */
const STAGE_META: Record<DispatchStage, StageMetaV4> = {
  unassigned: { label: 'Unassigned', glyph: '○', tone: 'neutral', advance: 'Accept', next: 'accepted', buttonTone: 'primary' },
  accepted: { label: 'Accepted', glyph: '✓', tone: 'primary', advance: 'Start driving', next: 'en-route', buttonTone: 'primary' },
  'en-route': { label: 'En route', glyph: '→', tone: 'primary', advance: 'Arrive', next: 'on-site', buttonTone: 'primary' },
  'on-site': { label: 'On site', glyph: '▶', tone: 'primary', advance: 'Complete', next: 'complete', buttonTone: 'success' },
  complete: { label: 'Complete', glyph: '✓', tone: 'success' },
};

/**
 * **V4 dispatch bar** — same props as {@link DispatchBar} plus
 * `confirmAdvanceLabel` and `stageLabels`.
 *
 * ## Five changes
 *
 * 1. **No enabled button that does nothing.** `canAdvance` never consulted
 *    `onAdvance`, so `<DispatchBar stage="on-site" />` shipped a live
 *    "Complete" that was a no-op — the loudest control on the bar, wired to
 *    nothing. The action now appears only when there is a handler to run.
 * 2. **Completing a visit takes a confirming press.** It is irreversible and
 *    the bar offers no action afterwards, so the first press arms the button
 *    and relabels it through `confirmAdvanceLabel`; the second one advances.
 * 3. **The bar clears the home indicator.** It is pinned to the bottom of the
 *    screen and read no safe-area inset at all, so on a notched phone the
 *    primary action sat under the indicator. It pays `insets.bottom` now, the
 *    way every other edge-anchored V4 component does. Needs a
 *    `SafeAreaProvider` above it, which Expo mounts by default.
 * 4. **The actions clear 44** — `size="sm"` is ~34 today — and the disc is
 *    decorative, so a reader no longer stops on it and then hears the same
 *    stage again from the line below.
 * 5. **The stage is not printed twice.** With no `jobLabel` the base put the
 *    stage on the title line *and* on the meta line under it.
 */
export function DispatchBarV4({
  stage,
  eta,
  jobLabel,
  onAdvance,
  onNavigate,
  loading = false,
  confirmAdvanceLabel = (next) => `Confirm ${next}`,
  stageLabels,
  style,
}: DispatchBarV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  // Needs a `SafeAreaProvider` above it (Expo default).
  const insets = useSafeAreaInsets();
  const [armed, setArmed] = React.useState(false);

  const meta = STAGE_META[stage] ?? STAGE_META.unassigned;
  const stageWord = stageLabels?.[stage] ?? meta.label;
  const tap = minTap(tokens.spacing);

  // A handler is part of the affordance, not a detail behind it.
  const advanceTo = meta.next;
  const canAdvance = meta.advance != null && advanceTo != null && Boolean(onAdvance);
  // Only the last step is guarded: the visit is closed and the bar has nothing
  // left to offer, so there is no way back from a mis-tap.
  const guarded = advanceTo === 'complete';
  const advanceWord =
    meta.advance != null && armed ? confirmAdvanceLabel(meta.advance) : meta.advance;

  // With no job label the stage IS the title, so repeating it underneath spends
  // a line on a fact the user has already read.
  const caption = jobLabel != null ? metaLine([stageWord, eta]) : (eta ?? '');

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          backgroundColor: colors.surface,
          paddingHorizontal: tokens.spacing.md,
          paddingTop: tokens.spacing.md,
          paddingBottom: tokens.spacing.md + insets.bottom,
        },
        style,
      ]}
    >
      {/* Decorative: the stage is spoken by the text block beside it. */}
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={{
          width: tokens.spacing.xl + tokens.spacing.sm,
          height: tokens.spacing.xl + tokens.spacing.sm,
          borderRadius: tokens.radius.full,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: discGround(theme, meta.tone),
        }}
      >
        <IconV4 glyph={meta.glyph} style={{ color: discInk(theme, meta.tone) }} />
      </View>

      <View
        accessible
        accessibilityLabel={spokenLine([jobLabel, stageWord, eta])}
        style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }}
      >
        <TextV4 size="base" weight="bold" tone="onSurface" numberOfLines={1}>
          {jobLabel ?? stageWord}
        </TextV4>
        {caption !== '' ? (
          <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
            {caption}
          </TextV4>
        ) : null}
      </View>

      {onNavigate ? (
        <ButtonV4 variant="outline" size="md" onPress={onNavigate} style={{ minHeight: tap }}>
          Navigate
        </ButtonV4>
      ) : null}
      {canAdvance ? (
        <ButtonV4
          variant="primary"
          size="md"
          tone={meta.buttonTone}
          loading={loading}
          accessibilityLabel={advanceWord}
          onPress={() => {
            if (guarded && !armed) {
              setArmed(true);
              return;
            }
            setArmed(false);
            onAdvance?.(advanceTo as DispatchStage);
          }}
          style={{ minHeight: tap }}
        >
          {advanceWord}
        </ButtonV4>
      ) : null}
    </View>
  );
}
