import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AvatarV4 } from '../primitives/AvatarV4';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { BADGE_V4, spokenLine, type ToneV4 } from './internal/job-v4';
import type { AvatarStatus } from '../primitives';
import type { TechnicianCardProps, TechnicianStatus } from './TechnicianCard';

export interface TechnicianCardV4Props extends TechnicianCardProps {
  /** The call action's label. Default `'Call'`. */
  callLabel?: string;
  /** The assign action's label. Default `'Assign'`. */
  assignLabel?: string;
  /** Render the phone number. Default: the string as given. */
  formatPhone?: (phone: string) => string;
}

/**
 * Availability → word, glyph, chip tone and the presence dot.
 *
 * `en-route` is where a technician is, not something that has gone wrong, so it
 * takes no status colour — the base painted it amber, which is the colour that
 * has to mean "look at this".
 */
const STATUS_META: Record<
  TechnicianStatus,
  { label: string; glyph: string; tone: ToneV4; presence: AvatarStatus }
> = {
  available: { label: 'Available', glyph: '✓', tone: 'success', presence: 'online' },
  'on-job': { label: 'On job', glyph: '⟳', tone: 'primary', presence: 'busy' },
  'en-route': { label: 'En route', glyph: '→', tone: 'primary', presence: 'away' },
  offline: { label: 'Offline', glyph: '○', tone: 'neutral', presence: 'offline' },
};

/**
 * **V4 technician card** — same props as {@link TechnicianCard} plus
 * `callLabel`, `assignLabel` and `formatPhone`.
 *
 * ## Five changes
 *
 * 1. **The phone number is on the card.** The base accepted `phone` and used
 *    it only as a boolean gate, so the number never appeared anywhere — and a
 *    caller who wired `onCall` without one silently got no button at all. It
 *    renders through `formatPhone` now, and the button is gated on `onCall`
 *    alone, which is the thing that decides whether calling is possible.
 * 2. **The presence dot is `Avatar`'s own `status`.** The web twin hand-rolled
 *    a second palette in which `busy` is blue while this twin's `Avatar` draws
 *    it **red** — the same technician, two colours, depending on which
 *    platform you opened.
 * 3. **The card announces its whole state** — name, role, status, jobs today
 *    and the number — instead of leaving a reader to walk loose text nodes.
 * 4. **Skill chips stop inking themselves with a fill token.** They drew
 *    `color: colors.primary` text on a 10% `primary` wash; `primary` is a fill
 *    slot with no contrast promise as text, and a skill is an identity, so the
 *    chips are neutral badges from the module's one badge shape.
 * 5. **Call and Assign clear 44.** `size="sm"` is ~34, on a card a dispatcher
 *    uses one-handed.
 *
 * **Renders nothing without a `name`.**
 */
export function TechnicianCardV4({
  name,
  role,
  status,
  avatarUrl,
  skills,
  jobsToday,
  phone,
  callLabel = 'Call',
  assignLabel = 'Assign',
  formatPhone = (value) => value,
  onCall,
  onAssign,
  style,
}: TechnicianCardV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!name) return null;

  const meta = STATUS_META[status] ?? STATUS_META.offline;
  const skillList = Array.isArray(skills) ? skills : [];
  const tap = minTap(tokens.spacing);
  const jobs = jobsToday != null ? `${Math.max(0, Math.trunc(jobsToday))} jobs today` : null;
  const phoneText = phone != null && phone !== '' ? formatPhone(phone) : null;

  return (
    <CardV4 variant="elevated" style={[{ backgroundColor: colors.card }, style]}>
      <View
        accessible
        accessibilityLabel={spokenLine([name, role, meta.label, jobs, phoneText, ...skillList])}
        style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}
      >
        {/* One presence palette: `Avatar`'s, so `busy` cannot be red here and
            blue on the web for the same technician. */}
        <AvatarV4 src={avatarUrl} name={name} size="lg" status={meta.presence} />
        <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }}>
          <TextV4 size="lg" weight="bold" tone="onCard" numberOfLines={1}>
            {name}
          </TextV4>
          {role != null ? (
            <TextV4 size="sm" tone="mutedText" numberOfLines={1}>
              {role}
            </TextV4>
          ) : null}
          {phoneText != null ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
              <IconV4 glyph="☎" size="xs" />
              <TextV4 size="xs" tone="mutedText" numeric="tabular" numberOfLines={1}>
                {phoneText}
              </TextV4>
            </View>
          ) : null}
          {jobs != null ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
              <IconV4 glyph="🗒" size="xs" />
              <TextV4 size="xs" tone="mutedText">
                {jobs}
              </TextV4>
            </View>
          ) : null}
        </View>
        <BadgeV4 tone={meta.tone} {...BADGE_V4}>
          {`${meta.glyph} ${meta.label}`}
        </BadgeV4>
      </View>

      {skillList.length > 0 ? (
        <View
          style={{
            marginTop: tokens.spacing.md,
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: tokens.spacing.xs,
          }}
        >
          {skillList.map((skill, i) => (
            <BadgeV4 key={`${skill}-${i}`} tone="neutral" {...BADGE_V4}>
              {skill}
            </BadgeV4>
          ))}
        </View>
      ) : null}

      {onCall || onAssign ? (
        <View
          style={{ marginTop: tokens.spacing.md, flexDirection: 'row', gap: tokens.spacing.sm }}
        >
          {/* Gated on the handler, not on `phone`: a dispatcher app that dials
              from a record the card never sees still gets its button. */}
          {onCall ? (
            <ButtonV4
              variant="outline"
              size="sm"
              accessibilityLabel={spokenLine([callLabel, name, phoneText])}
              onPress={onCall}
              style={{ flex: 1, minHeight: tap }}
            >
              {callLabel}
            </ButtonV4>
          ) : null}
          {onAssign ? (
            <ButtonV4
              variant="primary"
              size="sm"
              accessibilityLabel={spokenLine([assignLabel, name])}
              onPress={onAssign}
              style={{ flex: 1, minHeight: tap }}
            >
              {assignLabel}
            </ButtonV4>
          ) : null}
        </View>
      ) : null}
    </CardV4>
  );
}
