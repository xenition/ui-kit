import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AvatarV4 } from '../primitives/AvatarV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CardV4 } from '../primitives/CardV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { StatusPillV4 } from './StatusPillV4';
import {
  EMPLOYEE_STATUS_V4,
  EMPLOYMENT_V4,
  chipStyle,
  metaLine,
  skeletonFill,
  spokenLine,
} from './internal/tone-v4';
import type { EmployeeCardProps } from './EmployeeCard';

export interface EmployeeCardV4Props extends EmployeeCardProps {
  /** Announced while the skeleton is up. Default `'Loading employee'`. */
  loadingLabel?: string;
  /** Build the tenure line from `startDate`. Default `` `Since ${since}` ``. */
  formatTenure?: (since: string) => string;
}

/**
 * **V4 employee card** — same props as {@link EmployeeCard} plus
 * `loadingLabel` and `formatTenure`.
 *
 * ## Six changes
 *
 * 1. **The contact actions are reachable.** Call, Email and Message were
 *    `Pressable`s inside the card's own `Pressable`, which is `accessible` by
 *    default and collapses its whole subtree into one leaf named "Employee
 *    Ada" — so on native the three actions were not focus stops at all, and a
 *    VoiceOver user could open the profile and could not phone anybody. The
 *    card is a plain `CardV4` now; the activation wraps only the avatar-and-text
 *    region, and the actions are its siblings.
 * 2. **The skeleton is a skeleton, not a hairline.** It painted three blocks in
 *    `colors.border` — the divider token spent as a fill, which on most seeds is
 *    a barely-visible line colour stretched over a 40pt square. `skeletonFill()`
 *    is the opaque state mix, and its avatar is composed from the spacing scale
 *    rather than the literal `40` the base wrote twice.
 * 3. **The loading state is announced.** `accessibilityLabel="Loading
 *    employee"` sat on a plain `View`, which announces nothing at all, and the
 *    string had no override.
 * 4. **A press is a state layer.** The action pills swapped
 *    `withAlpha(colors.primary, 0.1)` for `0.2` on press — a translucent tint
 *    that is a different colour on every ground — and each was about 30pt tall.
 *    They are `ButtonV4`s at `minTap`.
 * 5. **Employment arrangement stops being a warning.** `contractor` was toned
 *    `warn`, `fullTime` `primary` and `partTime` `accent`, so a directory of
 *    contractors rendered as a screen of amber alerts. Arrangement is identity:
 *    it gets a glyph and a word on a neutral chip, and `warn` goes back to
 *    meaning something is wrong.
 * 6. **The card announces what it shows** — name, title, department,
 *    arrangement, status, location and tenure as one sentence — instead of
 *    "Employee Ada" over a subtree the reader cannot enter.
 *
 * **Renders nothing without a `name`.**
 */
export function EmployeeCardV4({
  name,
  title,
  department,
  avatarUrl,
  employmentType,
  status,
  location,
  startDate,
  actions,
  variant = 'default',
  loading = false,
  loadingLabel = 'Loading employee',
  formatTenure,
  onPress,
  testID,
  style,
}: EmployeeCardV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!name) return null;

  const compact = variant === 'compact';
  const detailed = variant === 'detailed';
  const tap = minTap(tokens.spacing);
  const avatarBox = tokens.spacing.xl + tokens.spacing.sm;

  if (loading) {
    return (
      <CardV4
        variant="outlined"
        padding={compact ? 'sm' : 'md'}
        testID={testID}
        style={[{ gap: tokens.spacing.sm }, style]}
      >
        <View
          accessible
          accessibilityLabel={loadingLabel}
          style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}
        >
          <View
            style={{
              width: avatarBox,
              height: avatarBox,
              borderRadius: tokens.radius.full,
              backgroundColor: skeletonFill(theme),
            }}
          />
          <View style={{ flex: 1, gap: tokens.spacing.xs }}>
            <View
              style={{
                height: tokens.typography.scale.base,
                width: '60%',
                borderRadius: tokens.radius.sm,
                backgroundColor: skeletonFill(theme),
              }}
            />
            <View
              style={{
                height: tokens.typography.scale.sm,
                width: '40%',
                borderRadius: tokens.radius.sm,
                backgroundColor: skeletonFill(theme),
              }}
            />
          </View>
        </View>
      </CardV4>
    );
  }

  /*
    A status pill that sits BESIDE the activation is hidden from the reader when
    the row is interactive — the activation's own name already carries the
    status word, and hearing "Denied" twice in a row is worse than hearing it
    once. On a static row there is no activation to carry it, so the pill speaks
    for itself and the name leaves it out. Same rule on both twins.
  */
  const interactive = onPress != null;

  const statusMeta = status ? EMPLOYEE_STATUS_V4[status] : undefined;
  const employment = employmentType ? EMPLOYMENT_V4[employmentType] : undefined;
  const tenure = startDate
    ? (formatTenure ?? ((since: string) => `Since ${since}`))(startDate)
    : null;
  const subtitle = metaLine([title, department]);
  const hasActions = !compact && Array.isArray(actions) && actions.length > 0;

  const spoken = spokenLine([
    name,
    title,
    department,
    employment?.label,
    interactive ? statusMeta?.label : null,
    detailed ? location : null,
    detailed ? tenure : null,
  ]);

  const identity = (pressed: boolean): React.ReactElement => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.sm,
        minHeight: tap,
        borderRadius: tokens.radius.md,
        backgroundColor: pressed ? pressOver(theme, colors.card, colors.onCard) : 'transparent',
      }}
    >
      <AvatarV4 size={compact ? 'sm' : 'md'} name={name} src={avatarUrl} />
      <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }}>
        <TextV4 size="base" weight="bold" tone="onCard" numberOfLines={1}>
          {name}
        </TextV4>
        {subtitle ? (
          <TextV4 size="sm" tone="mutedText" numberOfLines={1}>
            {subtitle}
          </TextV4>
        ) : null}
      </View>
    </View>
  );

  return (
    <CardV4
      variant="outlined"
      padding={compact ? 'sm' : 'md'}
      testID={testID}
      style={[{ gap: tokens.spacing.sm }, style]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        {onPress ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={spoken}
            onPress={onPress}
            style={{ flex: 1, borderRadius: tokens.radius.md }}
          >
            {({ pressed }) => identity(pressed)}
          </Pressable>
        ) : (
          <View accessible accessibilityLabel={spoken} style={{ flex: 1 }}>
            {identity(false)}
          </View>
        )}
        {statusMeta ? (
          <StatusPillV4 meta={statusMeta} size="sm" decorative={interactive} />
        ) : null}
      </View>

      {!compact && (employment || (detailed && (location || tenure))) ? (
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: tokens.spacing.xs,
          }}
        >
          {/* A kind, not a state: a glyph and a word on a neutral chip. */}
          {employment ? (
            <View
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
              style={chipStyle(theme)}
            >
              <TextV4 size="xs" tone="onCard">
                {employment.glyph}
              </TextV4>
              <TextV4 size="xs" weight="semibold" tone="onCard">
                {employment.label}
              </TextV4>
            </View>
          ) : null}
          {detailed && location ? (
            <TextV4 size="xs" tone="mutedText">
              {`📍 ${location}`}
            </TextV4>
          ) : null}
          {detailed && tenure ? (
            <TextV4 size="xs" tone="mutedText">
              {tenure}
            </TextV4>
          ) : null}
        </View>
      ) : null}

      {/* Siblings of the card's activation, never descendants — see change 1. */}
      {hasActions ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }}>
          {actions!.map((a) => (
            <ButtonV4
              key={a.key}
              variant="soft"
              size="sm"
              onPress={a.onPress}
              accessibilityLabel={a.label}
              style={{ minHeight: tap }}
            >
              {`${a.glyph} ${a.label}`}
            </ButtonV4>
          ))}
        </View>
      ) : null}
    </CardV4>
  );
}
