import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { CardV4 } from '../primitives/CardV4';
import { TextV4 } from '../primitives/TextV4';
import { PhotoCarouselV4 } from './PhotoCarouselV4';
import { DistanceBadgeV4 } from './DistanceBadgeV4';
import { CompatibilityMeterV4 } from './CompatibilityMeterV4';
import { ProfilePromptV4 } from './ProfilePromptV4';
import { IcebreakerChipV4 } from './IcebreakerChipV4';
import { LikePassButtonsV4 } from './LikePassButtonsV4';
import { skeletonFill, spokenLine } from './internal/profile-v4';
import type { ProfileCardProps } from './ProfileCard';

export interface ProfileCardV4Props extends ProfileCardProps {
  /** Announced while the card loads. Default `'Loading profile'`. */
  loadingLabel?: string;
}

/** The compact variant's thumbnail. */
const THUMB = 64;
/** "Active now" — the word beside the presence dot. */
const ONLINE_WORD = 'Active now';

/**
 * **V4 profile card** — same props as {@link ProfileCard} plus
 * `loadingLabel`.
 *
 * ## Five changes
 *
 * 1. **A card nobody can press does not look pressable.** The `compact`
 *    variant wore `Card variant="interactive"` — the raise the kit uses to say
 *    "tap me" — on a component with no press handler in its props at all. Each
 *    state now has one variant and it means what it draws: `outlined` while
 *    loading, empty and compact, `elevated` for the full card.
 * 2. **The name is a heading.** It is the one thing a reader needs to jump
 *    between when a screen stacks several profiles, and it was plain text.
 *    The verified mark and the presence word travel with it as one spoken
 *    line rather than as three loose stops.
 * 3. **The photos are not double-rounded.** The full card set `padding="none"`
 *    and dropped a carousel with its own `radius.lg` inside a card with the
 *    same radius — two arcs a pixel or two apart along the top edge, which is
 *    the kind of thing that reads as "unfinished" without anyone being able to
 *    say why. The card clips, the carousel is square.
 * 4. **Loading looks like the card it is about to be, and says so.** The base
 *    drew two `border`-coloured rectangles under a `border`-coloured block —
 *    `border` is a hairline token, and a skeleton built from a translucent or
 *    ramp-step colour is a different grey on every ground. `loadingLabel`
 *    gives the state a name.
 * 5. **The interest chips are hittable.** Every one of them renders at `sm`,
 *    which was about 22px tall; through `IcebreakerChipV4` they clear 44.
 *
 * `onPressInterest` is the native spelling of the web twin's
 * `onClickInterest` — the one permitted press/click split, inherited from the
 * base on both sides.
 */
export function ProfileCardV4({
  profile,
  variant = 'full',
  showActions = false,
  onAction,
  onPressInterest,
  loading = false,
  emptyLabel = 'No profile to show',
  loadingLabel = 'Loading profile',
  style,
}: ProfileCardV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  if (loading) {
    return (
      <CardV4
        accessibilityRole="progressbar"
        accessibilityLabel={loadingLabel}
        variant="outlined"
        padding="none"
        style={[{ overflow: 'hidden' }, style]}
      >
        <View style={{ width: '100%', aspectRatio: 4 / 5, backgroundColor: skeletonFill(theme) }} />
        <View style={{ padding: tokens.spacing.md, gap: tokens.spacing.sm }}>
          <View
            style={{
              height: tokens.typography.scale.lg,
              width: '55%',
              borderRadius: tokens.radius.sm,
              backgroundColor: skeletonFill(theme),
            }}
          />
          <View
            style={{
              height: tokens.typography.scale.sm,
              width: '85%',
              borderRadius: tokens.radius.sm,
              backgroundColor: skeletonFill(theme),
            }}
          />
        </View>
      </CardV4>
    );
  }

  if (!profile) {
    return (
      <CardV4 variant="outlined" padding="lg" style={style}>
        <View
          accessible
          accessibilityRole="summary"
          accessibilityLabel={emptyLabel}
          style={{ alignItems: 'center', gap: tokens.spacing.xs }}
        >
          <TextV4 size="2xl" allowFontScaling={false}>
            👤
          </TextV4>
          <TextV4 size="sm" tone="mutedText" align="center">
            {emptyLabel}
          </TextV4>
        </View>
      </CardV4>
    );
  }

  const title = profile.age != null ? `${profile.name}, ${profile.age}` : profile.name;
  const photos = profile.photos ?? [];
  const interests = profile.interests ?? [];
  const prompts = profile.prompts ?? [];

  const nameRow = (
    <View
      accessible
      accessibilityRole="header"
      accessibilityLabel={spokenLine([
        title,
        profile.verified ? 'Verified' : null,
        profile.online ? ONLINE_WORD : null,
      ])}
      style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}
    >
      <TextV4 size="xl" weight="bold" tone="onCard">
        {title}
      </TextV4>
      {profile.verified ? (
        <TextV4 size="sm" allowFontScaling={false} tone="primaryText">
          ✔
        </TextV4>
      ) : null}
      {profile.online ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <View
            style={{
              width: tokens.spacing.sm,
              height: tokens.spacing.sm,
              borderRadius: tokens.spacing.sm / 2,
              backgroundColor: colors.success,
            }}
          />
          {/* A word, not just a dot: presence must survive greyscale. */}
          <TextV4 size="xs" tone="successText">
            Active
          </TextV4>
        </View>
      ) : null}
    </View>
  );

  if (variant === 'compact') {
    return (
      <CardV4 variant="outlined" padding="md" style={style}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
          <View style={{ width: THUMB, borderRadius: tokens.radius.md, overflow: 'hidden' }}>
            <PhotoCarouselV4
              photos={photos.slice(0, 1)}
              ratio="square"
              rounded={false}
              showControls={false}
            />
          </View>
          <View style={{ flex: 1, gap: tokens.spacing.xs }}>
            {nameRow}
            {profile.headline ? (
              <TextV4 size="sm" tone="mutedText" numberOfLines={1}>
                {profile.headline}
              </TextV4>
            ) : null}
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}
            >
              {profile.distanceKm != null ? (
                <DistanceBadgeV4 distance={profile.distanceKm} />
              ) : null}
              {profile.compatibility != null ? (
                <CompatibilityMeterV4 score={profile.compatibility} variant="compact" showValue />
              ) : null}
            </View>
          </View>
        </View>
      </CardV4>
    );
  }

  return (
    <CardV4 variant="elevated" padding="none" style={[{ overflow: 'hidden' }, style]}>
      {/* The card clips; the carousel does not draw a second, slightly
          different arc a pixel inside the first. */}
      <PhotoCarouselV4 photos={photos} ratio="portrait" rounded={false} />
      <View style={{ padding: tokens.spacing.md, gap: tokens.spacing.md }}>
        <View style={{ gap: tokens.spacing.xs }}>
          {nameRow}
          {profile.headline ? (
            <TextV4 size="sm" tone="mutedText">
              {profile.headline}
            </TextV4>
          ) : null}
          {profile.distanceKm != null ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
              <DistanceBadgeV4 distance={profile.distanceKm} />
            </View>
          ) : null}
        </View>

        {profile.compatibility != null ? (
          <CompatibilityMeterV4 score={profile.compatibility} />
        ) : null}

        {profile.bio ? (
          <TextV4 size="base" tone="onCard">
            {profile.bio}
          </TextV4>
        ) : null}

        {interests.length > 0 ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }}>
            {interests.map((interest, i) => (
              <IcebreakerChipV4
                key={`${interest}-${i}`}
                label={interest}
                variant="soft"
                size="sm"
                onPress={onPressInterest}
              />
            ))}
          </View>
        ) : null}

        {prompts.length > 0 ? (
          <View style={{ gap: tokens.spacing.sm }}>
            {prompts.map((p) => (
              <ProfilePromptV4 key={p.id} prompt={p.prompt} answer={p.answer} variant="card" />
            ))}
          </View>
        ) : null}

        {showActions ? (
          <View style={{ marginTop: tokens.spacing.xs }}>
            {/* Inside a card, not pinned to the screen: the row's safe-area
                inset belongs to the deck, and here it would be a gap. */}
            <LikePassButtonsV4 onAction={onAction} style={{ paddingBottom: 0 }} />
          </View>
        ) : null}
      </View>
    </CardV4>
  );
}
