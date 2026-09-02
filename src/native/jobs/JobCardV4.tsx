import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AvatarV4 } from '../primitives/AvatarV4';
import { BadgeV4 } from '../primitives/BadgeV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { EMPLOYMENT_LABEL } from './types';
import { SalaryRangeV4 } from './SalaryRangeV4';
import { SkillTagV4 } from './SkillTagV4';
import { ApplyButtonV4 } from './ApplyButtonV4';
import {
  cardSurfaceStyle,
  relativeLabel,
  salaryText,
  skeletonBarStyle,
  spokenName,
} from './internal/tone-v4';
import type { JobCardProps } from './JobCard';

export interface JobCardV4Props extends JobCardProps {
  /** Name of the save affordance when the job is not saved. Default `'Save job'`. */
  saveLabel?: string;
  /** Name of the save affordance when it is. Default `'Saved — tap to remove'`. */
  savedLabel?: string;
  /** Re-word the posted age. Default `'2d ago'`. */
  formatRelative?: (iso: string) => string;
  /** Name the collapsed skills. Default `'+3'`. */
  overflowLabel?: (count: number) => string;
}

/** Announced while the placeholders are up. */
const LOADING = 'Loading job';

/**
 * **V4 job card** — same props as {@link JobCard} plus `saveLabel`,
 * `savedLabel`, `formatRelative` and `overflowLabel`.
 *
 * ## Six changes
 *
 * 1. **The save star is reachable.** The base nested it inside the card's own
 *    `Pressable`, which is `accessible` by default and flattens everything
 *    under it — so on native the star was not a focus stop at all, and a
 *    VoiceOver user could not save a job. (Its web twin fails differently and
 *    worse: Enter on the star bubbles to the card's keydown handler, which
 *    cancels the star's own activation and opens the detail view instead, so
 *    the keyboard user saves nothing and navigates away.) The fix is
 *    structural: the card is a plain `View`, the activation wraps only the
 *    media-and-text region and carries the card's spoken name, and the star
 *    sits **beside** it with a name and a 44 target of its own.
 * 2. **Employment type stopped wearing a status colour.** `contract → warn`
 *    and `remote → success` spent the two colours that mean "caution" and
 *    "good" on a fact that is neither: a contract role is not a warning.
 *    Identity gets a neutral chip; `success`, `warn` and `danger` stay
 *    reserved for the pipeline, where they actually mean something.
 * 3. **`maxSkills={0}` no longer swallows the skills entirely.** The overflow
 *    row was drawn only when at least one chip was shown, so six skills capped
 *    at zero rendered no chips **and** no "+6" — the count disappeared with
 *    the chips it was counting. The `+N` now stands on its own, and
 *    `overflowLabel` names it.
 * 4. **The skeleton is opaque and shaped like the card.** It was drawn in
 *    `colors.border` — the hairline colour used as a fill — so a loading card
 *    read as a broken table. `skeletonFill` mixes an opaque placeholder
 *    against the card's own ground, and the block is announced politely
 *    instead of sitting there silently.
 * 5. **The card announces the job, not the title.** Location, pay, posted age
 *    and the skills are all inside the activation and are therefore flattened
 *    into it, so they belong in its name — the base announced "Title at
 *    Company, Full-time" and dropped the salary, which is the fact a job
 *    seeker is actually scanning for.
 * 6. **Press is a state layer.** `opacity: 0.9` fades the card's own content;
 *    M3 tints the container instead, and reserves fading for `disabled`.
 *
 * **Renders nothing without a job title** (§4.5).
 */
export function JobCardV4({
  job,
  saved,
  onSave,
  applyState,
  onApply,
  onWithdraw,
  applyLoading,
  onPress,
  loading = false,
  maxSkills = 4,
  saveLabel = 'Save job',
  savedLabel = 'Saved — tap to remove',
  formatRelative,
  overflowLabel = (count: number) => `+${count}`,
  style,
}: JobCardV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const surface = cardSurfaceStyle(theme);
  const tap = minTap(tokens.spacing);

  if (loading) {
    return (
      <View
        accessible
        accessibilityLabel={LOADING}
        accessibilityLiveRegion="polite"
        style={[surface, style]}
      >
        <View style={{ flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'center' }}>
          <View style={skeletonBarStyle(theme, { width: tap, height: tap, round: true })} />
          <View style={{ gap: tokens.spacing.xs, flex: 1 }}>
            <View
              style={skeletonBarStyle(theme, {
                width: '70%',
                height: tokens.typography.scale.base,
              })}
            />
            <View
              style={skeletonBarStyle(theme, {
                width: '45%',
                height: tokens.typography.scale.sm,
              })}
            />
          </View>
        </View>
        <View
          style={skeletonBarStyle(theme, { width: '55%', height: tokens.typography.scale.sm })}
        />
      </View>
    );
  }

  if (!job?.title) return null;

  const skills = job.skills ?? [];
  const shown = skills.slice(0, Math.max(0, maxSkills));
  const overflow = skills.length - shown.length;
  const overflowText = overflow > 0 ? overflowLabel(overflow) : null;
  const showApply = applyState != null || onApply != null;
  const posted = relativeLabel(job.postedAt, formatRelative);
  const pay = salaryText(job.salary).text;

  const name = spokenName([
    job.title,
    job.companyName,
    job.location,
    EMPLOYMENT_LABEL[job.type],
    pay,
    posted,
    ...shown,
    overflowText,
  ]);

  const body = (
    <>
      <View style={{ flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'flex-start' }}>
        <AvatarV4 src={job.companyLogoUrl} name={job.companyName} size="md" />
        <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs }}>
          <TextV4 size="base" weight="semibold" tone="onCard" numberOfLines={2}>
            {job.title}
          </TextV4>
          <TextV4 size="sm" tone="mutedText" numberOfLines={1}>
            {job.location ? `${job.companyName} · ${job.location}` : job.companyName}
          </TextV4>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          flexWrap: 'wrap',
        }}
      >
        {/* Neutral: an employment type is identity, not a status. */}
        <BadgeV4 tone="neutral" size="sm">
          {EMPLOYMENT_LABEL[job.type]}
        </BadgeV4>
        {posted ? (
          <TextV4 size="xs" tone="mutedText">
            {posted}
          </TextV4>
        ) : null}
      </View>

      {job.salary ? <SalaryRangeV4 salary={job.salary} size="sm" /> : null}

      {shown.length > 0 || overflowText ? (
        // Hidden from the reader: the card's own name already lists the skills
        // and the overflow count. One fact, announced once — and the same
        // `aria-hidden` the web twin puts on this row.
        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }}
        >
          {shown.map((skill, i) => (
            <SkillTagV4 key={`${skill}-${i}`} label={skill} />
          ))}
          {overflowText ? (
            <View
              style={{
                alignSelf: 'flex-start',
                justifyContent: 'center',
                borderRadius: tokens.radius.sm,
                borderWidth: 1,
                borderColor: colors.border,
                paddingVertical: tokens.spacing.xs,
                paddingHorizontal: tokens.spacing.sm,
              }}
            >
              <TextV4 size="xs" tone="onCard" numeric="tabular">
                {overflowText}
              </TextV4>
            </View>
          ) : null}
        </View>
      ) : null}
    </>
  );

  return (
    <View style={[surface, style]}>
      <View style={{ flexDirection: 'row', gap: tokens.spacing.sm, alignItems: 'flex-start' }}>
        {onPress ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={name}
            onPress={() => onPress(job)}
            style={({ pressed }) => ({
              flex: 1,
              minWidth: 0,
              gap: tokens.spacing.md,
              borderRadius: tokens.radius.md,
              backgroundColor: pressed
                ? pressOver(theme, colors.card, colors.onCard)
                : 'transparent',
            })}
          >
            {body}
          </Pressable>
        ) : (
          <View
            accessible
            accessibilityLabel={name}
            style={{ flex: 1, minWidth: 0, gap: tokens.spacing.md }}
          >
            {body}
          </View>
        )}

        {/* A sibling of the activation, never a child of it — see change 1. */}
        {onSave ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={saved ? savedLabel : saveLabel}
            accessibilityState={{ selected: !!saved }}
            onPress={() => onSave(job)}
            style={({ pressed }) => ({
              minWidth: tap,
              minHeight: tap,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: tokens.radius.full,
              backgroundColor: pressed
                ? pressOver(theme, colors.card, colors.onCard)
                : 'transparent',
            })}
          >
            <TextV4 size="lg" tone={saved ? 'primaryText' : 'mutedText'}>
              {saved ? '★' : '☆'}
            </TextV4>
          </Pressable>
        ) : null}
      </View>

      {showApply ? (
        <ApplyButtonV4
          state={applyState}
          loading={applyLoading}
          onApply={onApply ? () => onApply(job) : undefined}
          onWithdraw={onWithdraw ? () => onWithdraw(job) : undefined}
          block
        />
      ) : null}
    </View>
  );
}
