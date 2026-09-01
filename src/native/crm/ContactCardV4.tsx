import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AvatarV4 } from '../primitives/AvatarV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CardV4 } from '../primitives/CardV4';
import { TagV4 } from '../primitives/TagV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { metaLine, skeletonFill, spokenLine } from './internal/crm-v4';
import type { ContactCardProps } from './ContactCard';

export interface ContactCardV4Props extends ContactCardProps {
  /** Announced while the skeleton is up. Default `'Loading contact'`. */
  loadingLabel?: string;
}

/**
 * **V4 contact card** — same props as {@link ContactCard} plus `loadingLabel`.
 *
 * ## Five changes
 *
 * 1. **A quick action does one thing.** On web the pills were real buttons
 *    nested inside a root that `activate()` had turned into a `role="button"`
 *    with its own handler, and nothing stopped the event: tapping **Call**
 *    dialled *and* navigated. Native happened to escape it only because the
 *    inner `Pressable` consumed the touch — the same props, two behaviours.
 *    The card's own activation now wraps **only the identity region**, and the
 *    pills are its siblings inside the card, on both twins. That removes the
 *    double-fire and the invalid nesting in one move.
 * 2. **The card announces what it shows** — name, role, company and its tags.
 *    `Contact Ada` replaced the entire subtree (rule A).
 * 3. **A press is a state layer** (rule B), sized so the identity region
 *    itself clears 44.
 * 4. **The skeleton is the shared opaque placeholder.** It was `colors.border`
 *    — a hairline token spent as a fill — with a literal `20` for the avatar's
 *    radius.
 * 5. **The loading state is a real accessibility element.** `accessibilityLabel`
 *    sat on a plain `View`, which announces nothing.
 *
 * **Renders nothing without a `name`.**
 */
export function ContactCardV4({
  name,
  title,
  company,
  avatarUrl,
  tags,
  actions,
  variant = 'default',
  loading = false,
  loadingLabel = 'Loading contact',
  onPress,
  testID,
  style,
}: ContactCardV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!name) return null;

  const compact = variant === 'compact';
  const hasTags = !compact && Array.isArray(tags) && tags.length > 0;
  const hasActions = !compact && Array.isArray(actions) && actions.length > 0;
  const tap = minTap(tokens.spacing);
  const subtitle = metaLine([title, company]);

  if (loading) {
    return (
      <CardV4
        padding={compact ? 'sm' : 'md'}
        testID={testID}
        style={[{ gap: tokens.spacing.sm }, style]}
      >
        <View
          accessible
          accessibilityLabel={loadingLabel}
          style={{ flexDirection: 'row', gap: tokens.spacing.sm, alignItems: 'center' }}
        >
          <View
            style={{
              width: tokens.spacing.xl + tokens.spacing.sm,
              height: tokens.spacing.xl + tokens.spacing.sm,
              borderRadius: tokens.radius.full,
              backgroundColor: skeletonFill(theme),
            }}
          />
          <View style={{ flex: 1, gap: tokens.spacing.xs }}>
            <View
              style={{
                height: tokens.spacing.md,
                width: '60%',
                borderRadius: tokens.radius.sm,
                backgroundColor: skeletonFill(theme),
              }}
            />
            <View
              style={{
                height: tokens.spacing.sm + tokens.spacing.xs,
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

  const identity = (pressed: boolean): React.ReactElement => (
    <View
      style={{
        flexDirection: 'row',
        gap: tokens.spacing.sm,
        alignItems: 'center',
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
      padding={compact ? 'sm' : 'md'}
      testID={testID}
      style={[{ gap: tokens.spacing.sm }, style]}
    >
      {onPress ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={spokenLine([name, title, company, ...(hasTags ? tags! : [])])}
          onPress={onPress}
          style={{ borderRadius: tokens.radius.md }}
        >
          {({ pressed }) => identity(pressed)}
        </Pressable>
      ) : (
        <View
          accessible
          accessibilityLabel={spokenLine([name, title, company, ...(hasTags ? tags! : [])])}
        >
          {identity(false)}
        </View>
      )}

      {hasTags ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }}>
          {tags!.map((t, i) => (
            <TagV4 key={`${t}-${i}`} tone="neutral" variant="soft" size="sm">
              {t}
            </TagV4>
          ))}
        </View>
      ) : null}

      {/* Siblings of the card's own activation, never descendants of it — see
          change 1. */}
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
