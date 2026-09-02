import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { isAdverse } from '../../insurance/coverage-v4';
import {
  CLAIM_STAGES,
  CLAIM_STAGE_LABELS,
  CLAIM_STATUS_V4,
  DECORATIVE,
  bandStyle,
  metaLine,
  spokenLine,
  toneFill,
  toneInk,
  type ClaimStage,
} from './internal/tone-v4';
import type { ClaimStatusTrackerProps } from './ClaimStatusTracker';

export type { ClaimStage };

export interface ClaimStatusTrackerV4Props extends ClaimStatusTrackerProps {
  /**
   * Why the claim was denied.
   *
   * The base had no field for this and **invented** one; see change 1. Nothing
   * is drawn when it is omitted, because a banner with no reason is better than
   * a banner with the wrong one.
   */
  denialReason?: string;
  /** Override the four stage words. */
  stageLabels?: Partial<Record<ClaimStage, string>>;
  /** Heading on the denial notice. Default `'Claim denied'`. */
  deniedLabel?: string;
}

/** Where a stage sits relative to the claim's current position. */
type StageState = 'done' | 'current' | 'todo';

/** Non-colour marks for the three stage states. */
const STAGE_MARK: Record<StageState, string> = { done: '✓', current: '●', todo: '○' };

/**
 * **V4 claim status tracker** — same props as {@link ClaimStatusTracker} plus
 * `denialReason`, `stageLabels` and `deniedLabel`.
 *
 * ## Four changes
 *
 * 1. **The component stops inventing a denial reason.** The base hard-coded
 *    *"Reviewed after filing. Contact your agent to appeal."* as the body of
 *    the denial banner, and its props carried only `status` and `updated`. So a
 *    claim denied because the damage predates policy inception — or because the
 *    vehicle was not on the policy, or because the deductible exceeded the
 *    loss — rendered that same sentence, in the insurer's own voice, asserting
 *    a reason the caller never supplied and had no way to correct. The reason
 *    is a prop. Nothing is printed when there is not one.
 * 2. **The stages are readable.** The base rendered the `Steps` primitive,
 *    which has **no accessibility at all** — no `accessib*` prop anywhere in
 *    the native primitive, and on the web twin no `aria-current="step"`. An
 *    active step and a future step were both an outlined circle with the same
 *    numeral inside it, which is a difference no reader and no colour-blind
 *    user can see. The rail is drawn here instead: each stage carries a
 *    distinct mark (`✓` done, `●` current, `○` still to come), and the tracker
 *    reports its own position as a `progressbar` with the current stage's word
 *    as its value text, rather than relying on a primitive that cannot say it.
 * 3. **A denial is a state, drawn like one.** The banner hand-mixed
 *    `withAlpha(colors.danger, 0.1)` — a translucent wash that is a different
 *    colour on a card than on the page — and inked its heading with
 *    `colors.danger`, a fill slot with no contrast promise as text. It paints
 *    an opaque composite and uses `dangerText` now.
 * 4. **The copy is props.** Four stage names and a heading were hard-coded
 *    English in a component whose whole job is to tell somebody what happened
 *    to their claim.
 */
export function ClaimStatusTrackerV4({
  status,
  updated,
  denialReason,
  stageLabels,
  deniedLabel = 'Claim denied',
  style,
}: ClaimStatusTrackerV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  const meta = CLAIM_STATUS_V4[status] ?? CLAIM_STATUS_V4.filed;
  const labelOf = (stage: ClaimStage): string => stageLabels?.[stage] ?? CLAIM_STAGE_LABELS[stage];

  if (isAdverse(status)) {
    return (
      <View style={[{ gap: tokens.spacing.sm }, style]}>
        <View
          accessible
          accessibilityLabel={spokenLine([deniedLabel, denialReason, updated])}
          style={bandStyle(theme, 'danger')}
        >
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }}>
            <TextV4 {...DECORATIVE} size="lg" style={{ color: toneInk(theme, 'danger') }}>
              {meta.glyph}
            </TextV4>
            <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }}>
              <TextV4
                accessibilityRole="header"
                size="base"
                weight="bold"
                style={{ color: toneInk(theme, 'danger') }}
              >
                {deniedLabel}
              </TextV4>
              {/* Only what the caller supplied — see change 1. */}
              {denialReason ? (
                <TextV4 size="sm" tone="onCard">
                  {denialReason}
                </TextV4>
              ) : null}
              {updated ? (
                <TextV4 size="xs" tone="mutedText">
                  {`Updated ${updated}`}
                </TextV4>
              ) : null}
            </View>
          </View>
        </View>
      </View>
    );
  }

  /*
    `paid` completes the last stage, so the position runs one past the final
    index. Everything else sits *on* its stage. The index is derived from the
    status here rather than read off `internal/status`'s `step`, because `step`
    also has to describe `denied` — which is not a stage at all.
  */
  const index = CLAIM_STAGES.indexOf(status as ClaimStage);
  const position = status === 'paid' ? CLAIM_STAGES.length : index < 0 ? 0 : index;
  const currentWord = labelOf(CLAIM_STAGES[Math.min(position, CLAIM_STAGES.length - 1)] ?? 'filed');

  const stateOf = (i: number): StageState =>
    i < position ? 'done' : i === position ? 'current' : 'todo';

  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={spokenLine([
        currentWord,
        ...CLAIM_STAGES.map((stage) => labelOf(stage)),
        updated ? `Updated ${updated}` : null,
      ])}
      accessibilityValue={{
        min: 1,
        max: CLAIM_STAGES.length,
        now: Math.min(position + 1, CLAIM_STAGES.length),
        text: currentWord,
      }}
      style={[{ gap: tokens.spacing.sm }, style]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        {CLAIM_STAGES.map((stage, i) => {
          const state = stateOf(i);
          const reached = state !== 'todo';
          return (
            <View key={stage} style={{ flex: 1, alignItems: 'center', gap: tokens.spacing.xs }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                {/* The connectors are geometry, not content. */}
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: i === 0 ? 'transparent' : colors.border,
                  }}
                />
                <View
                  style={{
                    width: tokens.spacing.lg,
                    height: tokens.spacing.lg,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: state === 'current' ? 2 : 1,
                    borderColor: reached ? toneFill(theme, 'primary') : colors.border,
                    backgroundColor: state === 'done' ? toneFill(theme, 'primary') : colors.card,
                  }}
                >
                  <TextV4
                    size="xs"
                    weight="bold"
                    style={{
                      color:
                        state === 'done'
                          ? colors.onPrimary
                          : state === 'current'
                            ? toneInk(theme, 'primary')
                            : colors.mutedText,
                    }}
                  >
                    {STAGE_MARK[state]}
                  </TextV4>
                </View>
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor:
                      i === CLAIM_STAGES.length - 1 ? 'transparent' : colors.border,
                  }}
                />
              </View>
              <TextV4
                size="xs"
                weight={state === 'current' ? 'bold' : 'regular'}
                tone={reached ? 'onCard' : 'mutedText'}
                align="center"
                numberOfLines={2}
              >
                {labelOf(stage)}
              </TextV4>
            </View>
          );
        })}
      </View>

      <TextV4 size="xs" tone="mutedText" align="center">
        {metaLine([`${meta.glyph} ${meta.label}`, updated ? `Updated ${updated}` : null])}
      </TextV4>
    </View>
  );
}
