import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { CheckboxV4 } from '../primitives/CheckboxV4';
import { TextV4 } from '../primitives/TextV4';
import {
  rowContainerStyle,
  rowGround,
  rowLeadingStyle,
  rowTextStyle,
} from '../dashboard/internal/row-v4';
import { metaLine } from '../primitives/internal/tone-v4';
import { BADGE_V4, spokenLine, type ToneV4 } from './internal/job-v4';
import type { PunchListItemProps, PunchSeverity } from './PunchListItem';

export interface PunchListItemV4Props extends PunchListItemProps {
  /** Override the three severity names — they lived inside the component. */
  severityLabels?: Partial<Record<PunchSeverity, string>>;
}

const SEVERITY_META: Record<PunchSeverity, { label: string; glyph: string; tone: ToneV4 }> = {
  minor: { label: 'Minor', glyph: '·', tone: 'neutral' },
  major: { label: 'Major', glyph: '▲', tone: 'warn' },
  critical: { label: 'Critical', glyph: '!', tone: 'danger' },
};

/**
 * **V4 punch list item** — same props as {@link PunchListItem} plus
 * `severityLabels`.
 *
 * ## Four changes
 *
 * 1. **The whole row toggles**, and the target clears 44. The base put the
 *    entire affordance on a 20px box with no `hitSlop` — 16px on the web twin
 *    — on a list a superintendent walks a site with, one-handed, in gloves.
 * 2. **Severity, location and assignee join the control's name.** The
 *    checkbox announced the description and nothing else, so "Critical" and
 *    who owns the defect never reached a reader.
 * 3. **A checkbox nobody can tick is not enabled.** With no `onToggle` the
 *    base still rendered a live control that could be pressed forever and
 *    never changed; it now says it cannot be changed.
 * 4. **The row is a row from the shared row line**, with the shared press
 *    fill and the module's one badge shape — the base drew no press feedback
 *    at all, so pressing a row answered nothing.
 *
 * **Renders nothing without a `label`.**
 */
export function PunchListItemV4({
  label,
  done,
  severity,
  location,
  assignee,
  severityLabels,
  onToggle,
  disabled = false,
  style,
}: PunchListItemV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { tokens } = theme;
  if (!label) return null;

  const meta = severity ? SEVERITY_META[severity] : undefined;
  const severityWord = severity ? (severityLabels?.[severity] ?? meta?.label) : undefined;
  const caption = metaLine([location, assignee]);
  const interactive = Boolean(onToggle) && !disabled;
  const spoken = spokenLine([label, severityWord, location, assignee]);

  const content = (
    <>
      {/* The row is the accessible control; the box is the mark it wears, so it
          must not become a second stop for the reader. */}
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={rowLeadingStyle(theme)}
      >
        <CheckboxV4
          checked={done}
          disabled={!interactive}
          onCheckedChange={interactive ? onToggle : undefined}
        />
      </View>
      <View style={rowTextStyle(theme)}>
        <TextV4
          size="base"
          weight="semibold"
          tone={done ? 'mutedText' : 'onCard'}
          numberOfLines={3}
          style={{ textDecorationLine: done ? 'line-through' : 'none' }}
        >
          {label}
        </TextV4>
        {caption !== '' ? (
          <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
            {caption}
          </TextV4>
        ) : null}
      </View>
      {meta && severityWord != null ? (
        <BadgeV4 tone={meta.tone} {...BADGE_V4}>
          {`${meta.glyph} ${severityWord}`}
        </BadgeV4>
      ) : null}
    </>
  );

  if (!interactive) {
    return (
      <View
        accessible
        accessibilityRole="checkbox"
        accessibilityLabel={spoken}
        accessibilityState={{ checked: done, disabled: true }}
        style={[rowContainerStyle(theme, { twoLine: caption !== '' }), style]}
      >
        {content}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityLabel={spoken}
      accessibilityState={{ checked: done, disabled: false }}
      onPress={() => onToggle?.(!done)}
      style={[{ borderRadius: tokens.radius.md }, style]}
    >
      {({ pressed }) => (
        <View
          style={[
            rowContainerStyle(theme, { twoLine: caption !== '' }),
            { borderRadius: tokens.radius.md, backgroundColor: rowGround(theme, { pressed }) },
          ]}
        >
          {content}
        </View>
      )}
    </Pressable>
  );
}
