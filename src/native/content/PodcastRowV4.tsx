import * as React from 'react';
import { Image, Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { pressFill, pressOver } from '../primitives/internal/state-v4';
import { minTap } from '../primitives/internal/chrome-v4';
import { mediaGround, metaLine } from './internal/reading-v4';
import type { PodcastRowProps } from './PodcastRow';

export interface PodcastRowV4Props extends PodcastRowProps {
  /** Announced on the play control when the episode is stopped. Default `'Play'`. */
  playLabel?: string;
  /** Announced on it when the episode is playing. Default `'Pause'`. */
  pauseLabel?: string;
}

/**
 * **V4 podcast row** — same props as {@link PodcastRow} plus `playLabel` and
 * `pauseLabel`.
 *
 * ## Five changes
 *
 * 1. **The keyboard can play a podcast.** The row's activation used to *wrap*
 *    the play button. On the web that meant the container's `onKeyDown` fired
 *    first: Space cancelled the button's own activation and navigated instead,
 *    Enter did both, and the click path was guarded while the keyboard path
 *    was not — so there was no keyboard-only way to play an episode from a
 *    podcast row. Here the same nesting made the play control unreachable to
 *    VoiceOver as an element of its own. The row's activation now sits on a
 *    control that covers only the artwork and the text, and the play button is
 *    its **sibling**. One change, three defects.
 * 2. **No dead play button.** `onPlayToggle` is optional; without it the
 *    control is not rendered, rather than rendered permanently greyed.
 * 3. **The play control clears 44.** It was 40 square with hit slop over it.
 * 4. **Press is a state layer.** The row carried three different opacity dims
 *    — 0.9 for the row, 0.7 for the button, 0.5 for its disabled state — and
 *    the last two are inside M3's disabled band.
 * 5. **The artwork placeholder takes the shared media ground**, not the
 *    hairline token, and no longer floods a missing cover in brand accent.
 *
 * **Renders nothing without an episode title** (§4.5).
 */
export function PodcastRowV4({
  episode,
  playing = false,
  onPlayToggle,
  onPress,
  variant = 'standard',
  playLabel = 'Play',
  pauseLabel = 'Pause',
  style,
}: PodcastRowV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!episode?.title) return null;

  const compact = variant === 'compact';
  const tap = minTap(tokens.spacing);
  const art = compact ? tap : tokens.spacing['2xl'] + tokens.spacing.md;
  const meta = metaLine([episode.show, episode.duration]);

  const region = (pressed: boolean): React.ReactElement => (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.md,
        borderRadius: tokens.radius.md,
        backgroundColor: pressed ? pressFill(theme) : 'transparent',
      }}
    >
      {episode.artworkUrl ? (
        <Image
          source={{ uri: episode.artworkUrl }}
          accessibilityIgnoresInvertColors
          style={{
            width: art,
            height: art,
            borderRadius: tokens.radius.md,
            backgroundColor: mediaGround(theme),
          }}
          resizeMode="cover"
        />
      ) : (
        <View
          style={{
            width: art,
            height: art,
            borderRadius: tokens.radius.md,
            backgroundColor: mediaGround(theme),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <IconV4 glyph="🎧" size="lg" color="onCard" />
        </View>
      )}

      <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs }}>
        <TextV4 size="base" weight="bold" tone="onSurface" numberOfLines={compact ? 1 : 2}>
          {episode.title}
        </TextV4>
        {!compact && meta ? (
          <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
            {meta}
          </TextV4>
        ) : null}
      </View>
    </View>
  );

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.sm,
        },
        style,
      ]}
    >
      {onPress ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={episode.title}
          onPress={() => onPress(episode)}
          style={{ flex: 1 }}
        >
          {({ pressed }) => region(pressed)}
        </Pressable>
      ) : (
        region(false)
      )}

      {/* A sibling, never a descendant — see change 1. And absent, rather than
          dead, when the caller has nothing to play with. */}
      {onPlayToggle ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${playing ? pauseLabel : playLabel} ${episode.title}`}
          accessibilityState={{ selected: playing }}
          onPress={() => onPlayToggle(!playing)}
          style={({ pressed }) => ({
            width: tap,
            height: tap,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: pressed
              ? pressOver(theme, colors.primary, colors.onPrimary)
              : colors.primary,
          })}
        >
          <IconV4 glyph={playing ? '❙❙' : '▶'} size="sm" color="onPrimary" />
        </Pressable>
      ) : null}
    </View>
  );
}
