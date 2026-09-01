import * as React from 'react';
import { Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar } from '../primitives/Avatar';
import { withAlpha } from '../primitives/internal/color';
import { GradientSurface } from './internal/GradientSurface';
import { feedGradient, feedInk, feedInkSoft, feedTile, feedBorder } from './internal/feed';

/** The story's author identity shown in the top overlay. */
export interface StoryAuthor {
  /** Display name in near-white ink. */
  name: string;
  /** Avatar image URL; falls back to initials from `name`. */
  avatarUrl?: string;
}

export interface StoryViewerProps {
  /** Total number of segments (progress bars) in this story reel. */
  segments: number;
  /** Zero-based index of the segment currently playing. */
  activeIndex: number;
  /** Story author shown in the top overlay. */
  author: StoryAuthor;
  /** Relative time label for the active segment (e.g. `2h`). */
  timeLabel?: string;
  /** Full-bleed media URL for the active segment; a brand-gradient ground shows when absent. */
  imageUrl?: string;
  /** Caption overlaid near the bottom of the frame. */
  caption?: string;
  /** Placeholder for the reply field (default `Send message`). */
  replyPlaceholder?: string;
  /** Fires when the right tap-zone (advance) is pressed. */
  onNext?: () => void;
  /** Fires when the left tap-zone (rewind) is pressed. */
  onPrev?: () => void;
  /** Fires when the close (✕) affordance is pressed. */
  onClose?: () => void;
  /** Fires when the reply affordance is pressed. */
  onReply?: () => void;
  /** Optional style override for the outer container. */
  style?: StyleProp<ViewStyle>;
}

/**
 * StoryViewer — the immersive, full-screen story view for the social V4 "feed"
 * line. A full-bleed frame (the `imageUrl` under a brand-gradient scrim, or the
 * gradient itself) carries a top row of segment progress bars — played/active in
 * near-white, upcoming in a frosted track — an author header + close control in
 * near-white ink, invisible left/right tap-zones for rewind/advance, an optional
 * caption, and a frosted reply affordance. Token-only colors via `GradientSurface`
 * + `feed*` + `useXenitionTheme()` (no literals); dark-mode safe.
 */
export function StoryViewer({
  segments,
  activeIndex,
  author,
  timeLabel,
  imageUrl,
  caption,
  replyPlaceholder = 'Send message',
  onNext,
  onPrev,
  onClose,
  onReply,
  style,
}: StoryViewerProps): React.ReactElement {
  const { tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const ink = feedInk(r);
  const inkSoft = feedInkSoft(r);
  const count = Math.max(0, Math.trunc(segments));
  const bars = Array.from({ length: count }, (_, i) => i);
  const scrim = withAlpha(r.primary[700], 0.6);

  return (
    <View style={[{ borderRadius: tokens.radius.lg, aspectRatio: 9 / 16, overflow: 'hidden' }, style]}>
      <GradientSurface colors={feedGradient(r)} style={{ flex: 1 }}>
        {imageUrl ? (
          <>
            <Image source={{ uri: imageUrl }} accessible={false} resizeMode="cover" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: scrim }} />
          </>
        ) : null}

        {/* Segment progress bars */}
        <View
          accessibilityRole="progressbar"
          accessibilityValue={{ min: 0, max: count, now: activeIndex + 1 }}
          style={{ flexDirection: 'row', gap: tokens.spacing.xs, padding: tokens.spacing.md }}
        >
          {bars.map((i) => (
            <View key={i} style={{ flex: 1, height: 4, borderRadius: tokens.radius.full, backgroundColor: feedTile(r, 0.3), overflow: 'hidden' }}>
              <View style={{ height: '100%', width: i <= activeIndex ? '100%' : '0%', borderRadius: tokens.radius.full, backgroundColor: ink }} />
            </View>
          ))}
        </View>

        {/* Author header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, paddingHorizontal: tokens.spacing.md }}>
          <Avatar src={author.avatarUrl} name={author.name} size="sm" />
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
            <Text numberOfLines={1} style={{ color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '700', flexShrink: 1 }}>
              {author.name}
            </Text>
            {timeLabel ? <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.xs }}>{timeLabel}</Text> : null}
          </View>
          {onClose ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Close story"
              onPress={onClose}
              style={({ pressed }) => ({ width: 44, height: 44, alignItems: 'center', justifyContent: 'center', opacity: pressed ? 0.7 : 1 })}
            >
              <Text style={{ color: ink, fontSize: tokens.typography.scale.xl, fontWeight: '700' }}>✕</Text>
            </Pressable>
          ) : null}
        </View>

        {/* Tap zones */}
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Pressable accessibilityRole="button" accessibilityLabel="Previous" onPress={onPrev} style={{ flex: 1 }} />
          <Pressable accessibilityRole="button" accessibilityLabel="Next" onPress={onNext} style={{ flex: 2 }} />
        </View>

        {/* Caption + reply */}
        <View style={{ gap: tokens.spacing.sm, padding: tokens.spacing.md }}>
          {caption ? (
            <Text style={{ color: ink, fontSize: tokens.typography.scale.sm, lineHeight: tokens.typography.scale.sm * 1.5 }}>{caption}</Text>
          ) : null}
          {onReply ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={replyPlaceholder}
              onPress={onReply}
              style={({ pressed }) => ({
                minHeight: 44,
                justifyContent: 'center',
                paddingHorizontal: tokens.spacing.lg,
                borderRadius: tokens.radius.full,
                backgroundColor: feedTile(r),
                borderWidth: 1,
                borderColor: feedBorder(r),
                opacity: pressed ? 0.85 : 1,
              })}
            >
              <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>{replyPlaceholder}</Text>
            </Pressable>
          ) : null}
        </View>
      </GradientSurface>
    </View>
  );
}
