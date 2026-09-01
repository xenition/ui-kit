import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { BADGE_V4, discGround, spokenLine, type ToneV4 } from './internal/job-v4';
import type { JobSiteCardProps, JobSiteStatus } from './JobSiteCard';

export interface JobSiteCardV4Props extends JobSiteCardProps {
  /** The navigate action's label. Default `'Directions'`. */
  directionsLabel?: string;
}

/**
 * Site status → word, glyph and tone.
 *
 * `active` and `scheduled` say where a site sits in the week, not how it went,
 * so they take no status colour — the base painted "On site" green, which is
 * the colour that has to mean "this went well". `completed` is a real outcome
 * and keeps `success`; `blocked` keeps `danger`.
 */
const STATUS_META: Record<JobSiteStatus, { label: string; glyph: string; tone: ToneV4 }> = {
  active: { label: 'On site', glyph: '▶', tone: 'primary' },
  scheduled: { label: 'Scheduled', glyph: '📅', tone: 'neutral' },
  completed: { label: 'Completed', glyph: '✓', tone: 'success' },
  blocked: { label: 'Blocked', glyph: '⚠', tone: 'danger' },
};

/**
 * **V4 job site card** — same props as {@link JobSiteCard} plus
 * `directionsLabel`.
 *
 * ## Four changes
 *
 * 1. **Directions is reachable.** The base nested the button inside the card's
 *    own activation. On the web twin the card's `onKeyDown` swallowed the
 *    Enter that a `<button>` needs to fire its click, so pressing Enter on
 *    "Directions" opened the site instead of routing to it; here the outer
 *    `Pressable` was `accessible` with the site's name as its label, which
 *    flattens the card to one leaf and makes the button **unreachable** to
 *    VoiceOver entirely. Every path that is not a sighted tap was broken. The
 *    card's activation now wraps only the identity region and the action is
 *    its **sibling** — the shape §1.2 asks for, after this bug turned up in
 *    four components.
 * 2. **The card announces its meta.** `"name, address, status"` replaced the
 *    subtree, dropping the crew count, the open orders and — on a card whose
 *    point is getting a technician to a site — the distance.
 * 3. **A press is a state layer** and the identity region clears 44;
 *    `opacity: 0.85` is deleted rather than translated.
 * 4. **The disc is decorative** and the badge is the module's one shape, so a
 *    reader stops once and the same screen looks the same on both platforms.
 *
 * **Renders nothing without a `name`.**
 */
export function JobSiteCardV4({
  name,
  address,
  status,
  crewCount,
  openOrders,
  distance,
  glyph = '🏗',
  directionsLabel = 'Directions',
  onNavigate,
  onPress,
  style,
}: JobSiteCardV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!name) return null;

  const meta = STATUS_META[status] ?? STATUS_META.scheduled;
  const tap = minTap(tokens.spacing);

  const crew = crewCount != null ? `${Math.max(0, Math.trunc(crewCount))} crew` : null;
  const open = openOrders != null ? `${Math.max(0, Math.trunc(openOrders))} open` : null;

  const metaLines: ReadonlyArray<{ glyph: string; text: string }> = [
    crew != null ? { glyph: '👷', text: crew } : null,
    open != null ? { glyph: '🗒', text: open } : null,
    distance != null ? { glyph: '📍', text: distance } : null,
  ].filter((line): line is { glyph: string; text: string } => line != null);

  const spoken = spokenLine([name, address, meta.label, crew, open, distance]);

  const identity = (pressed: boolean): React.ReactElement => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.md,
        minHeight: tap,
        borderRadius: tokens.radius.md,
        backgroundColor: pressed ? pressOver(theme, colors.card, colors.onCard) : 'transparent',
      }}
    >
      {/* The site glyph is a category mark, not a state — decorative. */}
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={{
          width: tap,
          height: tap,
          borderRadius: tokens.radius.md,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: discGround(theme, 'accent'),
        }}
      >
        <IconV4 glyph={glyph} size="xl" />
      </View>
      <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }}>
        <TextV4 size="lg" weight="bold" tone="onCard" numberOfLines={1}>
          {name}
        </TextV4>
        <TextV4 size="sm" tone="mutedText" numberOfLines={1}>
          {address}
        </TextV4>
      </View>
      <BadgeV4 tone={meta.tone} {...BADGE_V4}>
        {`${meta.glyph} ${meta.label}`}
      </BadgeV4>
    </View>
  );

  return (
    <CardV4
      variant={onPress ? 'interactive' : 'elevated'}
      style={[{ backgroundColor: colors.card }, style]}
    >
      {onPress ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={spoken}
          onPress={onPress}
          style={{ borderRadius: tokens.radius.md }}
        >
          {({ pressed }) => identity(pressed)}
        </Pressable>
      ) : (
        <View accessible accessibilityLabel={spoken}>
          {identity(false)}
        </View>
      )}

      {/* A sibling of the card's activation, never a descendant of it — see
          change 1. */}
      <View
        style={{
          marginTop: tokens.spacing.md,
          paddingTop: tokens.spacing.md,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: tokens.spacing.md,
        }}
      >
        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.md }}>
          {metaLines.map((line) => (
            <View
              key={line.glyph}
              style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}
            >
              <IconV4 glyph={line.glyph} size="xs" />
              <TextV4 size="xs" tone="mutedText">
                {line.text}
              </TextV4>
            </View>
          ))}
        </View>
        {onNavigate ? (
          <ButtonV4
            variant="outline"
            size="sm"
            accessibilityLabel={spokenLine([directionsLabel, name])}
            onPress={onNavigate}
            style={{ minHeight: tap }}
          >
            {directionsLabel}
          </ButtonV4>
        ) : null}
      </View>
    </CardV4>
  );
}
