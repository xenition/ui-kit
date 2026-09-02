import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AvatarV4 } from '../primitives/AvatarV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import {
  rowContainerStyle,
  rowGround,
  rowLeadingStyle,
  rowTextStyle,
} from '../dashboard/internal/row-v4';
import { StatusPillV4 } from './StatusPillV4';
import { PRESENCE_V4, metaLine, spokenLine } from './internal/tone-v4';
import type { DirectoryRowProps } from './DirectoryRow';

export interface DirectoryRowV4Props extends DirectoryRowProps {
  /** Name for the trailing message button. Default `` `Message ${name}` ``. */
  messageLabel?: string;
}

/**
 * **V4 directory row** — same props as {@link DirectoryRow} plus
 * `messageLabel`.
 *
 * ## Five changes
 *
 * 1. **The message button is reachable.** It sat inside the row's own
 *    `Pressable`, which is `accessible` by default and flattens everything
 *    under it into a single leaf carrying the row's name — so VoiceOver could
 *    open the person's profile and had no way at all to message them. The row
 *    container is a plain `View` now; the activation wraps only the avatar and
 *    the text, and the message button is its sibling.
 * 2. **The button is a target.** `hitSlop={8}` on a glyph is not a 44pt target
 *    — the conventions call that out by name — and it left the visible tap area
 *    at roughly 20pt in the corner of a scrolling list. It is `minTap` square.
 * 3. **Presence is drawn once.** The base rendered it twice: as a coloured dot
 *    on the avatar (colour alone, no word) *and* as a glyph beside a `muted`
 *    word, so the row said the same thing in two places and one of them said it
 *    in a way a colour-blind user could not read. One glyph-and-word pill
 *    remains, and `away` steps down from `warn` to neutral — stepping away from
 *    a desk is not a caution.
 * 4. **Press is a state layer.** The message glyph faded to `opacity: 0.6` on
 *    press, which is inside M3's *disabled* band, so a tapped button looked
 *    unavailable.
 * 5. **The row announces itself whole** — name, title, department, presence,
 *    email and phone as one sentence, rather than "Open Ada" followed by five
 *    text nodes the reader has to walk.
 *
 * **Renders nothing without a `name`.**
 */
export function DirectoryRowV4({
  name,
  title,
  department,
  avatarUrl,
  email,
  phone,
  presence,
  variant = 'default',
  messageLabel,
  onPress,
  onMessage,
  testID,
  style,
}: DirectoryRowV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!name) return null;

  const compact = variant === 'compact';
  /*
    A status pill that sits BESIDE the activation is hidden from the reader when
    the row is interactive — the activation's own name already carries the
    status word, and hearing "Denied" twice in a row is worse than hearing it
    once. On a static row there is no activation to carry it, so the pill speaks
    for itself and the name leaves it out. Same rule on both twins.
  */
  const interactive = onPress != null;

  const presenceMeta = presence ? PRESENCE_V4[presence] : undefined;
  const subtitle = metaLine([title, department]);
  const contact = metaLine([email, phone]);
  const tap = minTap(tokens.spacing);
  const message = messageLabel ?? `Message ${name}`;

  const spoken = spokenLine([
    name,
    title,
    department,
    interactive ? presenceMeta?.label : null,
    email,
    phone,
  ]);

  const identity = (pressed: boolean): React.ReactElement => (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.sm,
        minHeight: tap,
        borderRadius: tokens.radius.md,
        backgroundColor: rowGround(theme, { pressed }),
      }}
    >
      <View style={rowLeadingStyle(theme)}>
        <AvatarV4 size={compact ? 'sm' : 'md'} name={name} src={avatarUrl} />
      </View>
      <View style={rowTextStyle(theme)}>
        <TextV4 size="base" weight="semibold" tone="onCard" numberOfLines={1}>
          {name}
        </TextV4>
        {subtitle ? (
          <TextV4 size="sm" tone="mutedText" numberOfLines={1}>
            {subtitle}
          </TextV4>
        ) : null}
        {!compact && contact ? (
          <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
            {contact}
          </TextV4>
        ) : null}
      </View>
    </View>
  );

  return (
    <View testID={testID} style={[rowContainerStyle(theme, { twoLine: !compact }), style]}>
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

      {/* Presence and the message button are siblings of the activation, not
          descendants of it — see changes 1 and 3. */}
      {presenceMeta ? (
        <StatusPillV4 meta={presenceMeta} variant="inline" size="sm" decorative={interactive} />
      ) : null}

      {onMessage ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={message}
          onPress={onMessage}
          style={({ pressed }) => ({
            width: tap,
            height: tap,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tokens.radius.full,
            backgroundColor: rowGround(theme, { pressed }),
          })}
        >
          <TextV4 size="lg" style={{ color: colors.primaryText }}>
            ✉
          </TextV4>
        </Pressable>
      ) : null}
    </View>
  );
}
