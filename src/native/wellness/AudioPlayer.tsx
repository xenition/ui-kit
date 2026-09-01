import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives/Icon';
import { GlassPanel } from '../primitives/GlassPanel';
import { withAlpha } from '../primitives/internal/color';
import { GradientSurface } from './internal/GradientSurface';
import { calmGradient, calmInk } from './internal/calm';

export type AudioPlayerVariant = 'bar' | 'full';

export interface AudioPlayerProps {
  /** Track title (session name). */
  title: string;
  /** Secondary line — teacher, category, or narrator. */
  subtitle?: string;
  /** Leading glyph shown on the gradient cover. Default `'🎧'`. */
  coverGlyph?: string;
  /** Playing vs paused (controlled). */
  isPlaying?: boolean;
  /** Elapsed position, in seconds. */
  position?: number;
  /** Total duration, in seconds. */
  duration?: number;
  /** Compact `bar` (default) or the full `full` player. */
  variant?: AudioPlayerVariant;
  onPlayPause?: () => void;
  onSkipBack?: () => void;
  onSkipForward?: () => void;
  style?: StyleProp<ViewStyle>;
}

function fmt(sec?: number): string {
  if (sec == null || !Number.isFinite(sec) || sec < 0) return '0:00';
  const s = Math.floor(sec);
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r < 10 ? '0' : ''}${r}`;
}

/**
 * AudioPlayer — a frosted "glass" transport for a meditation/soundscape track.
 * A `GlassPanel` ground (the kit's translucent surface) carries a gradient cover
 * tile, the title/teacher, a progress track, and a gradient play/pause button.
 * `variant='full'` expands to a large cover with skip controls. Only the cover
 * and the play button are colored — everything else stays calm on the glass;
 * every color is a token, adapts light + dark, and restyles from the seed.
 */
export function AudioPlayer({
  title,
  subtitle,
  coverGlyph = '🎧',
  isPlaying = false,
  position = 0,
  duration = 0,
  variant = 'bar',
  onPlayPause,
  onSkipBack,
  onSkipForward,
  style,
}: AudioPlayerProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const pct = duration > 0 ? Math.max(0, Math.min(1, position / duration)) : 0;
  const a11y = `${title}${subtitle ? ', ' + subtitle : ''}, ${isPlaying ? 'playing' : 'paused'}`;

  const Track = (
    <View style={{ gap: tokens.spacing.xs }}>
      <View style={{ height: 4, borderRadius: 2, backgroundColor: withAlpha(colors.onSurface, 0.14) }}>
        <View style={{ width: `${pct * 100}%`, height: 4, borderRadius: 2, backgroundColor: colors.primary }} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>{fmt(position)}</Text>
        <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>{fmt(duration)}</Text>
      </View>
    </View>
  );

  const PlayButton = ({ size }: { size: number }) => (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={isPlaying ? 'Pause' : 'Play'}
      onPress={onPlayPause}
      style={({ pressed }) => ({ borderRadius: size / 2, opacity: pressed ? 0.9 : 1 })}
    >
      <GradientSurface
        colors={calmGradient(r)}
        style={{ width: size, height: size, borderRadius: size / 2, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
      >
        <Icon glyph={isPlaying ? '⏸' : '▶'} size={size * 0.42} style={{ color: calmInk(r) }} />
      </GradientSurface>
    </Pressable>
  );

  const Cover = ({ dim }: { dim: number }) => (
    <GradientSurface
      colors={calmGradient(r)}
      style={{ width: dim, height: dim, borderRadius: tokens.radius.md, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
    >
      <Icon glyph={coverGlyph} size={dim * 0.42} style={{ color: calmInk(r) }} />
    </GradientSurface>
  );

  if (variant === 'full') {
    return (
      <GlassPanel intensity="regular" accessibilityLabel={a11y} style={[{ padding: tokens.spacing.lg, borderRadius: tokens.radius.lg, alignItems: 'center', gap: tokens.spacing.md }, style]}>
        <Cover dim={168} />
        <View style={{ alignItems: 'center', gap: 2 }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }}>{title}</Text>
          {subtitle ? <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.sm }}>{subtitle}</Text> : null}
        </View>
        <View style={{ alignSelf: 'stretch' }}>{Track}</View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xl }}>
          <Pressable accessibilityRole="button" accessibilityLabel="Skip back" onPress={onSkipBack} hitSlop={8}>
            <Icon glyph="⏮" size="xl" style={{ color: colors.onSurface }} />
          </Pressable>
          <PlayButton size={72} />
          <Pressable accessibilityRole="button" accessibilityLabel="Skip forward" onPress={onSkipForward} hitSlop={8}>
            <Icon glyph="⏭" size="xl" style={{ color: colors.onSurface }} />
          </Pressable>
        </View>
      </GlassPanel>
    );
  }

  return (
    <GlassPanel intensity="regular" accessibilityLabel={a11y} style={[{ padding: tokens.spacing.md, borderRadius: tokens.radius.lg, gap: tokens.spacing.sm }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <Cover dim={52} />
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{title}</Text>
          {subtitle ? (
            <Text numberOfLines={1} style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>{subtitle}</Text>
          ) : null}
        </View>
        <PlayButton size={44} />
      </View>
      {Track}
    </GlassPanel>
  );
}
