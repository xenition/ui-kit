import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import {
  rowContainerStyle,
  rowGround,
  rowLeadingStyle,
  rowTextStyle,
} from '../dashboard/internal/row-v4';
import { BADGE_V4, discGround, discInk, spokenLine, type ToneV4 } from './internal/job-v4';
import type { InspectionResult, InspectionRowProps } from './InspectionRow';

export interface InspectionRowV4Props extends InspectionRowProps {
  /** Override the four result names — they lived inside the component. */
  resultLabels?: Partial<Record<InspectionResult, string>>;
}

/**
 * Result → word, glyph and tone.
 *
 * `pending` is a checkpoint nobody has looked at yet — identity, not an
 * outcome — so it stops wearing the brand colour and answers in neutral. The
 * two real outcomes keep theirs.
 */
const RESULT_META: Record<InspectionResult, { label: string; glyph: string; tone: ToneV4 }> = {
  pass: { label: 'Pass', glyph: '✓', tone: 'success' },
  fail: { label: 'Fail', glyph: '✕', tone: 'danger' },
  na: { label: 'N/A', glyph: '–', tone: 'neutral' },
  pending: { label: 'Pending', glyph: '○', tone: 'neutral' },
};

/**
 * **V4 inspection row** — same props as {@link InspectionRow} plus
 * `resultLabels`.
 *
 * ## Four changes
 *
 * 1. **The defect note is announced.** The row's name was
 *    `"${label}, ${result}"`, which replaces the subtree — so on a *failed*
 *    checkpoint the one thing a technician needs, the inspector's note saying
 *    what is wrong with it, was the thing the label threw away. The reference
 *    code went with it.
 * 2. **The result is announced once.** The disc carried an
 *    `accessibilityLabel` and the badge carried the same word, so a reader
 *    heard "Fail" twice for one checkpoint. The disc is decorative now.
 * 3. **The row is a row from the shared row line** — one height that clears
 *    44, one 44 leading slot, one press fill — instead of a 36px disc on a
 *    `paddingVertical: sm` box that dimmed itself to `0.7` when held.
 * 4. **The caller's `style` lands on the root**, the element the web twin puts
 *    it on; here it went *inside* the pressable, so the same prop moved two
 *    different boxes on the two platforms.
 *
 * **Renders nothing without a `label`.**
 */
export function InspectionRowV4({
  label,
  result,
  code,
  note,
  resultLabels,
  onPress,
  style,
}: InspectionRowV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { tokens } = theme;
  if (!label) return null;

  const meta = RESULT_META[result] ?? RESULT_META.pending;
  const resultWord = resultLabels?.[result] ?? meta.label;
  const name = spokenLine([label, resultWord, code, note]);

  const content = (
    <>
      {/* Decorative: the result is in the row's own name and on the badge. */}
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={[
          rowLeadingStyle(theme),
          { borderRadius: tokens.radius.full, backgroundColor: discGround(theme, meta.tone) },
        ]}
      >
        <IconV4 glyph={meta.glyph} style={{ color: discInk(theme, meta.tone) }} />
      </View>
      <View style={rowTextStyle(theme)}>
        <TextV4 size="base" weight="semibold" tone="onCard" numberOfLines={2}>
          {label}
        </TextV4>
        {code != null ? (
          <TextV4 size="xs" tone="mutedText">
            {code}
          </TextV4>
        ) : null}
        {note != null ? (
          <TextV4 size="xs" tone="mutedText">
            {note}
          </TextV4>
        ) : null}
      </View>
      <BadgeV4 tone={meta.tone} {...BADGE_V4}>
        {`${meta.glyph} ${resultWord}`}
      </BadgeV4>
    </>
  );

  const twoLine = code != null || note != null;

  if (!onPress) {
    return (
      <View
        accessible
        accessibilityLabel={name}
        style={[rowContainerStyle(theme, { twoLine }), style]}
      >
        {content}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={name}
      onPress={onPress}
      style={[{ borderRadius: tokens.radius.md }, style]}
    >
      {({ pressed }) => (
        <View
          style={[
            rowContainerStyle(theme, { twoLine }),
            { borderRadius: tokens.radius.md, backgroundColor: rowGround(theme, { pressed }) },
          ]}
        >
          {content}
        </View>
      )}
    </Pressable>
  );
}
