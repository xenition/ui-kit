import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { ChatBubbleV4 } from '../primitives/ChatBubbleV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { withAlpha } from '../primitives/internal/color';
import { clock } from './internal/thread-v4';
import type { VoiceNoteBubbleProps } from './VoiceNoteBubble';

export interface VoiceNoteBubbleV4Props extends VoiceNoteBubbleProps {
  /** Accessible names for the transport. Defaults `'Play'` / `'Pause'`. */
  playLabel?: string;
  pauseLabel?: string;
  /** Build the spoken position. Default `'0:12 of 0:42'`. */
  formatPosition?: (elapsed: string, total: string) => string;
}

/** A default waveform, when the caller has no samples. Geometric. */
const DEFAULT_WAVE = [0.3, 0.6, 0.4, 0.8, 0.5, 0.9, 0.4, 0.7, 0.35, 0.6, 0.45, 0.8];

/** How solid an unplayed bar sits against a played one. */
const UNPLAYED_ALPHA = 0.45;

/**
 * **V4 voice note bubble** — same props as {@link VoiceNoteBubble} plus
 * `playLabel`, `pauseLabel` and `formatPosition`.
 *
 * ## Four changes
 *
 * 1. **It reports its position.** The base painted the waveform with
 *    `progress` and announced only "Voice message, 0:42" — so a user could see
 *    how far through they were and a screen-reader user could not. The bubble
 *    is now a `progressbar` carrying elapsed and total, and the elapsed time
 *    is drawn beside the duration.
 * 2. **The transport clears 44.** It was a glyph with `hitSlop={8}` — under
 *    the minimum, on the only control in the component.
 * 3. **Unplayed bars are a translucent wash of the *same* ink**, not
 *    `opacity: 0.4` on the element — 0.38 is the band that means disabled, and
 *    an unplayed second is not disabled.
 * 4. **The waveform is hidden from the reader.** Twelve unlabelled bars are
 *    twelve stops on a swipe-through; the bubble's own value carries the
 *    information.
 */
export function VoiceNoteBubbleV4({
  side = 'them',
  durationSec,
  playing = false,
  progress = 0,
  waveform,
  meta,
  playLabel = 'Play',
  pauseLabel = 'Pause',
  formatPosition,
  onPlayToggle,
  style,
}: VoiceNoteBubbleV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  const me = side === 'me';
  const ink = me ? colors.onPrimary : colors.onCard;
  const bars = waveform && waveform.length > 0 ? waveform : DEFAULT_WAVE;
  const clamped = Math.min(1, Math.max(0, Number.isFinite(progress) ? progress : 0));

  const total = clock(durationSec);
  const elapsed = clock(durationSec * clamped);
  const position = (formatPosition ?? ((e: string, t: string) => `${e} of ${t}`))(elapsed, total);

  const height = tokens.spacing.lg;
  const tap = minTap(tokens.spacing);

  return (
    <ChatBubbleV4 side={side} meta={meta} style={style}>
      <View
        accessible
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max: 100, now: Math.round(clamped * 100) }}
        accessibilityLabel={`Voice message, ${position}`}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          minWidth: tokens.spacing['2xl'] * 3,
        }}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ selected: playing }}
          accessibilityLabel={playing ? pauseLabel : playLabel}
          onPress={onPlayToggle}
          style={{
            width: tap,
            height: tap,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tokens.radius.full,
          }}
        >
          <IconV4 glyph={playing ? '⏸' : '▶'} size="lg" style={{ color: ink }} />
        </Pressable>

        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.xs / 2,
            flex: 1,
            height,
          }}
        >
          {bars.map((h, i) => {
            const played = i / bars.length <= clamped;
            return (
              <View
                key={i}
                style={{
                  flex: 1,
                  height: Math.max(tokens.spacing.xs / 2, h * height),
                  borderRadius: tokens.radius.full,
                  // A wash of the same ink, not an opacity on the element:
                  // 0.38 is the band that means *disabled*, and an unplayed
                  // second is not disabled.
                  backgroundColor: played ? ink : withAlpha(ink, UNPLAYED_ALPHA),
                }}
              />
            );
          })}
        </View>

        <TextV4 size="xs" numeric="tabular" style={{ color: ink }}>
          {clamped > 0 ? `${elapsed} / ${total}` : total}
        </TextV4>
      </View>
    </ChatBubbleV4>
  );
}
