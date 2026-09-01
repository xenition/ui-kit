import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AvatarV4 } from '../primitives/AvatarV4';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { RatingV4 } from '../primitives/RatingV4';
import { TextV4 } from '../primitives/TextV4';
import { pressOver } from '../primitives/internal/state-v4';
import { metaLine, skeletonFill } from './internal/fleet-v4';
import type { DriverCardProps } from './DriverCard';

export interface DriverCardV4Props extends DriverCardProps {
  /** Accessible name for the message action. Default `'Message driver'`. */
  messageLabel?: string;
  /** Accessible name for the call action. Default `'Call driver'`. */
  callLabel?: string;
  /** Words for the presence dot. Defaults `'Online'` / `'Offline'`. */
  onlineLabel?: string;
  offlineLabel?: string;
  /** Format the trip count. Default `'1,204 trips'`. */
  formatTripCount?: (trips: number) => string;
}

/**
 * **V4 driver card** — same props as {@link DriverCard} plus four copy hooks.
 *
 * ## Five changes
 *
 * 1. **The rating carries its number.** The base drew five glyphs and stopped;
 *    `RatingV4 showValue` puts `4.9` beside them, which is what a low-vision
 *    user reads and what everyone actually compares.
 * 2. **Presence is not a coloured dot alone.** `online` was a green circle and
 *    nothing else — invisible to a colour-blind user and to a screen reader.
 *    It is now a dot **and** a word.
 * 3. **Press is a state layer**, not `opacity` on the card's content, which is
 *    the signal M3 spends 0.38 on to mean *disabled*.
 * 4. **The skeleton is opaque.** The base used a translucent wash of `muted`,
 *    which borrows whatever is behind it.
 * 5. **The message and call actions are named.** They were glyph-only
 *    buttons with no accessible name at all.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
export function DriverCardV4({
  name,
  avatarUrl,
  rating,
  tripCount,
  vehicle,
  plate,
  etaLabel,
  online,
  variant = 'default',
  messageLabel = 'Message driver',
  callLabel = 'Call driver',
  onlineLabel = 'Online',
  offlineLabel = 'Offline',
  formatTripCount,
  onMessage,
  onCall,
  onPress,
  loading = false,
  style,
}: DriverCardV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  if (loading) {
    return (
      <CardV4 style={[{ flexDirection: 'row', gap: tokens.spacing.sm }, style]}>
        <View
          style={{
            width: tokens.spacing['2xl'],
            height: tokens.spacing['2xl'],
            borderRadius: tokens.radius.full,
            backgroundColor: skeletonFill(theme),
          }}
        />
        <View style={{ flex: 1, gap: tokens.spacing.xs }}>
          <View
            style={{
              height: tokens.typography.scale.base,
              width: '50%',
              borderRadius: tokens.radius.sm,
              backgroundColor: skeletonFill(theme),
            }}
          />
          <View
            style={{
              height: tokens.typography.scale.sm,
              width: '70%',
              borderRadius: tokens.radius.sm,
              backgroundColor: skeletonFill(theme),
            }}
          />
        </View>
      </CardV4>
    );
  }

  if (!name) return null;

  const compact = variant === 'compact';
  const trips =
    typeof tripCount === 'number'
      ? (formatTripCount ?? ((n: number) => `${n.toLocaleString()} trips`))(tripCount)
      : null;
  const caption = metaLine([vehicle, plate, trips]);
  const presence = online == null ? null : online ? onlineLabel : offlineLabel;

  const body = (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <AvatarV4 src={avatarUrl} name={name} size={compact ? 'sm' : 'md'} />
        <View style={{ flex: 1, gap: tokens.spacing.xs }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
            <TextV4
              face="heading"
              size="base"
              weight="bold"
              tone="onCard"
              numberOfLines={1}
              style={{ flexShrink: 1 }}
            >
              {name}
            </TextV4>
            {/*
              A dot AND a word. The base shipped the dot alone, which says
              nothing to a colour-blind user and nothing at all to a reader.
            */}
            {presence ? (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
                <View
                  style={{
                    width: tokens.spacing.sm,
                    height: tokens.spacing.sm,
                    borderRadius: tokens.radius.full,
                    backgroundColor: online ? colors.success : colors.muted,
                  }}
                />
                <TextV4 size="xs" tone={online ? 'successText' : 'mutedText'}>
                  {presence}
                </TextV4>
              </View>
            ) : null}
          </View>

          {typeof rating === 'number' ? (
            <RatingV4 value={rating} size="sm" showValue />
          ) : null}

          {caption ? (
            <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
              {caption}
            </TextV4>
          ) : null}
        </View>

        {etaLabel ? (
          <BadgeV4 tone="primary" variant="soft" size="sm">
            {etaLabel}
          </BadgeV4>
        ) : null}
      </View>

      {!compact && (onMessage || onCall) ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.sm, marginTop: tokens.spacing.md }}>
          {onMessage ? (
            <ButtonV4
              variant="secondary"
              size="sm"
              onPress={onMessage}
              accessibilityLabel={messageLabel}
              style={{ flex: 1 }}
            >
              <IconV4 name="mail" size="sm" />
            </ButtonV4>
          ) : null}
          {onCall ? (
            <ButtonV4
              variant="primary"
              size="sm"
              onPress={onCall}
              accessibilityLabel={callLabel}
              style={{ flex: 1 }}
            >
              <IconV4 name="phone" size="sm" />
            </ButtonV4>
          ) : null}
        </View>
      ) : null}
    </>
  );

  if (!onPress) return <CardV4 style={style}>{body}</CardV4>;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={metaLine([name, presence, caption, etaLabel])}
      onPress={onPress}
      style={({ pressed }) => ({
        borderRadius: tokens.radius.lg,
        backgroundColor: pressed ? pressOver(theme, colors.card, colors.onCard) : 'transparent',
      })}
    >
      <CardV4 style={style}>{body}</CardV4>
    </Pressable>
  );
}
