import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AvatarV4 } from '../primitives/AvatarV4';
import { TextV4 } from '../primitives/TextV4';
import { pressOver } from '../primitives/internal/state-v4';
import {
  rowContainerStyle,
  rowEdgeStyle,
  rowLeadingStyle,
  rowTextStyle,
  rowTrailingStyle,
} from '../dashboard/internal/row-v4';
import { stageParts } from '../../jobs/hiring-v4';
import { APPLICATION_STAGES, STAGE_LABEL } from './types';
import { StatusPipelineV4 } from './StatusPipelineV4';
import { relativeLabel, spokenName } from './internal/tone-v4';
import type { ApplicationRowProps } from './ApplicationRow';

export interface ApplicationRowV4Props extends ApplicationRowProps {
  /**
   * Why the application ended. Drawn and announced when
   * `application.rejected` is set.
   */
  rejectionReason?: string;
  /** Re-word the applied age. Default `'2d ago'`. */
  formatRelative?: (iso: string) => string;
  /** The last row in a list — drops the separator that would hang off the end. */
  last?: boolean;
}

/** Called out as a word, never as a hue alone. */
const REJECTED = 'Rejected';

/**
 * **V4 application row** — same props as {@link ApplicationRow} plus
 * `rejectionReason`, `formatRelative` and `last`.
 *
 * ## Five changes
 *
 * 1. **The stage is announced.** This is the module's headline defect in one
 *    component: `<ApplicationRow application={{stage:'interview'}} />` said
 *    the job title and stopped. The pipeline drew the stage into a `View` that
 *    was never `accessible`, and the row's own `Pressable` flattened it
 *    anyway, so where the application stands — the only reason anyone opens
 *    this list — was silent. The stage is now part of the row's name, and the
 *    pipeline beneath it is hidden from the reader so the fact is stated once.
 * 2. **A rejection can say why.** `Application.rejected` is a bare boolean
 *    with no reason and no stage-of-rejection, so the row could report the
 *    worst outcome in the funnel and offer nothing else. `rejectionReason` is
 *    drawn under the pipeline and joined into the name — an adverse outcome is
 *    the one state in this module that owes the reader an explanation.
 * 3. **The `accessory` is a sibling.** Anything a caller passes — a chevron, a
 *    withdraw button — sat inside the row's activation and was flattened into
 *    it, so a real control there was unreachable. The row container is a plain
 *    `View` now and the accessory sits beside the activation.
 * 4. **`muted` stopped inking text.** Three captions here were drawn in
 *    `muted`, a ramp step with no contrast promise; they take `mutedText`.
 * 5. **Press is a state layer**, not `opacity: 0.9` — M3 reserves fading for
 *    disabled, and the base's press made a tapped row read as a dead one.
 *
 * **Renders nothing without a job title** (§4.5).
 */
export function ApplicationRowV4({
  application,
  onPress,
  accessory,
  rejectionReason,
  formatRelative,
  last = false,
  style,
}: ApplicationRowV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!application?.jobTitle) return null;

  const applied = relativeLabel(application.appliedAt, formatRelative);
  const { known } = stageParts(application.stage, APPLICATION_STAGES);
  const stageWord = known ? STAGE_LABEL[application.stage] : null;
  const rejected = application.rejected === true;
  // Only an adverse outcome is owed an explanation; a reason on a live
  // application is noise.
  const reason = rejected ? rejectionReason : undefined;

  const name = spokenName([
    application.jobTitle,
    application.companyName,
    applied,
    rejected ? spokenName([REJECTED, stageWord]) : stageWord,
    reason,
  ]);

  const body = (
    <>
      <View style={rowLeadingStyle(theme)}>
        <AvatarV4 name={application.companyName} size="sm" />
      </View>
      <View style={rowTextStyle(theme)}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: tokens.spacing.sm,
          }}
        >
          <TextV4
            size="sm"
            weight="semibold"
            tone="onCard"
            numberOfLines={1}
            style={{ flex: 1 }}
          >
            {application.jobTitle}
          </TextV4>
          {applied ? (
            <TextV4 size="xs" tone="mutedText">
              {applied}
            </TextV4>
          ) : null}
        </View>
        <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
          {application.companyName}
        </TextV4>
        {/*
          Drawn for the sighted reader; hidden from the screen reader because
          the row's own name already carries the stage. One fact, said once.
        */}
        <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
          <StatusPipelineV4
            stage={application.stage}
            rejected={rejected}
            variant="compact"
          />
        </View>
        {reason ? (
          <TextV4 size="xs" tone="dangerText" numberOfLines={2}>
            {reason}
          </TextV4>
        ) : null}
      </View>
    </>
  );

  return (
    <View
      style={[
        rowContainerStyle(theme, { twoLine: true }),
        !last ? rowEdgeStyle(theme) : null,
        style,
      ]}
    >
      {onPress ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={name}
          onPress={() => onPress(application)}
          style={({ pressed }) => ({
            flex: 1,
            minWidth: 0,
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            borderRadius: tokens.radius.md,
            backgroundColor: pressed ? pressOver(theme, colors.card, colors.onCard) : 'transparent',
          })}
        >
          {body}
        </Pressable>
      ) : (
        <View
          accessible
          accessibilityLabel={name}
          style={{
            flex: 1,
            minWidth: 0,
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
          }}
        >
          {body}
        </View>
      )}

      {/* A sibling, so a control passed here is a real focus stop. */}
      {accessory ? <View style={rowTrailingStyle(theme)}>{accessory}</View> : null}
    </View>
  );
}
