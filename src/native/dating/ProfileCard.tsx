import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card } from '../primitives';
import { PhotoCarousel, type CarouselPhoto } from './PhotoCarousel';
import { DistanceBadge } from './DistanceBadge';
import { CompatibilityMeter } from './CompatibilityMeter';
import { ProfilePrompt } from './ProfilePrompt';
import { IcebreakerChip } from './IcebreakerChip';
import { LikePassButtons, type SwipeAction } from './LikePassButtons';

export interface ProfilePromptData {
  id: string;
  prompt: string;
  answer?: string;
}

export interface ProfileCardData {
  id: string;
  name: string;
  age?: number;
  /** Photos for the carousel; the first is the hero. */
  photos?: CarouselPhoto[];
  /** Free-text bio. */
  bio?: string;
  /** Distance in km. */
  distanceKm?: number;
  /** Compatibility score 0–100. */
  compatibility?: number;
  /** Interest tags shown as chips. */
  interests?: string[];
  /** Profile prompts. */
  prompts?: ProfilePromptData[];
  /** "Active now". */
  online?: boolean;
  /** Verified profile. */
  verified?: boolean;
  /** Job / school line. */
  headline?: string;
}

export type ProfileCardVariant = 'full' | 'compact';

export interface ProfileCardProps {
  /** The profile to render. */
  profile?: ProfileCardData;
  /** `full` (default) shows photos, bio, prompts; `compact` is a summary row. */
  variant?: ProfileCardVariant;
  /** Show the built-in like/pass action row. */
  showActions?: boolean;
  /** Fires a swipe action from the built-in row. */
  onAction?: (action: SwipeAction) => void;
  /** Fires when an interest chip is tapped. */
  onPressInterest?: (interest: string) => void;
  /** Loading skeleton. */
  loading?: boolean;
  /** Empty-state copy when no profile is supplied. */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A full profile summary — the native profile card. Composes the dating blocks
 * (photo carousel, distance badge, compatibility meter, prompts, interest chips,
 * and an optional action row) into one scrollable-friendly card. `compact`
 * collapses to a headline row for lists. Every color/space reads from theme
 * tokens through the composed primitives — no literal colors. Explicit loading
 * and empty states; array access is guarded.
 */
export function ProfileCard({
  profile,
  variant = 'full',
  showActions = false,
  onAction,
  onPressInterest,
  loading = false,
  emptyLabel = 'No profile to show',
  style,
}: ProfileCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (loading) {
    return (
      <Card variant="outlined" padding="none" style={style}>
        <View style={{ width: '100%', aspectRatio: 4 / 5, backgroundColor: colors.border }} />
        <View style={{ padding: tokens.spacing.md, gap: tokens.spacing.sm }}>
          <View style={{ height: 18, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
          <View style={{ height: 12, width: '85%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
        </View>
      </Card>
    );
  }

  if (!profile) {
    return (
      <Card variant="outlined" padding="lg" style={style}>
        <View accessibilityRole="text" accessibilityLabel={emptyLabel} style={{ alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text style={{ fontSize: tokens.typography.scale['2xl'] }} allowFontScaling={false}>
            👤
          </Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{emptyLabel}</Text>
        </View>
      </Card>
    );
  }

  const title = profile.age != null ? `${profile.name}, ${profile.age}` : profile.name;
  const photos = profile.photos ?? [];
  const interests = profile.interests ?? [];
  const prompts = profile.prompts ?? [];

  const nameRow = (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700' }}>
        {title}
      </Text>
      {profile.verified ? (
        <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.sm }} accessibilityLabel="Verified">
          ✔
        </Text>
      ) : null}
      {profile.online ? (
        <View
          accessibilityRole="text"
          accessibilityLabel="Active now"
          style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
        >
          <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.success }} />
          <Text style={{ color: colors.success, fontSize: tokens.typography.scale.xs }}>Active</Text>
        </View>
      ) : null}
    </View>
  );

  if (variant === 'compact') {
    return (
      <Card variant="interactive" padding="md" style={style}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
          <View style={{ width: 64 }}>
            <PhotoCarousel photos={photos.slice(0, 1)} ratio="square" />
          </View>
          <View style={{ flex: 1, gap: tokens.spacing.xs }}>
            {nameRow}
            {profile.headline ? (
              <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
                {profile.headline}
              </Text>
            ) : null}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
              {profile.distanceKm != null ? <DistanceBadge distance={profile.distanceKm} /> : null}
              {profile.compatibility != null ? (
                <CompatibilityMeter score={profile.compatibility} variant="compact" showValue />
              ) : null}
            </View>
          </View>
        </View>
      </Card>
    );
  }

  return (
    <Card variant="elevated" padding="none" style={style}>
      <PhotoCarousel photos={photos} ratio="portrait" />
      <View style={{ padding: tokens.spacing.md, gap: tokens.spacing.md }}>
        <View style={{ gap: tokens.spacing.xs }}>
          {nameRow}
          {profile.headline ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{profile.headline}</Text>
          ) : null}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
            {profile.distanceKm != null ? <DistanceBadge distance={profile.distanceKm} /> : null}
          </View>
        </View>

        {profile.compatibility != null ? <CompatibilityMeter score={profile.compatibility} /> : null}

        {profile.bio ? (
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, lineHeight: tokens.typography.scale.base * 1.4 }}>
            {profile.bio}
          </Text>
        ) : null}

        {interests.length > 0 ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }}>
            {interests.map((interest, i) => (
              <IcebreakerChip
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
              <ProfilePrompt key={p.id} prompt={p.prompt} answer={p.answer} variant="card" />
            ))}
          </View>
        ) : null}

        {showActions ? (
          <View style={{ marginTop: tokens.spacing.xs }}>
            <LikePassButtons actions={['pass', 'superlike', 'like']} onAction={onAction} />
          </View>
        ) : null}
      </View>
    </Card>
  );
}
