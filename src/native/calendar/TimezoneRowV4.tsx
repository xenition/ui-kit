import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import {
  rowContainerStyle,
  rowGround,
  rowTextStyle,
} from '../dashboard/internal/row-v4';
import { metaLine } from './internal/grid-v4';
import type { TimezoneRowProps } from './TimezoneRow';

export interface TimezoneRowV4Props extends TimezoneRowProps {
  /**
   * Derive the offset caption when none is passed. Default: the zone's current
   * short offset from `Intl`, e.g. `'GMT+1'`.
   *
   * The base required the host to pass `offsetLabel` and showed nothing
   * without it — an offset every browser and phone already knows.
   */
  formatOffset?: (timezone: string) => string | undefined;
}

/** The zone's current short offset, from `Intl`. `undefined` if it cannot say. */
function defaultOffset(timezone: string): string | undefined {
  try {
    const parts = new Intl.DateTimeFormat(undefined, {
      timeZone: timezone,
      timeZoneName: 'shortOffset',
    }).formatToParts(new Date());
    return parts.find((p) => p.type === 'timeZoneName')?.value;
  } catch {
    // An unknown IANA name is a host bug, not a reason to crash a settings row.
    return undefined;
  }
}

/**
 * **V4 timezone row** — same props as {@link TimezoneRow} plus
 * `formatOffset`.
 *
 * ## Three changes
 *
 * 1. **The offset is derived when it is not given.** Every platform ships an
 *    IANA database; the base made the host restate what `Intl` already knows,
 *    and showed nothing when they did not.
 * 2. **It is a row from the shared row line**, with the shared press fill —
 *    the base drew its own container and pressed with an opacity.
 * 3. **An unknown zone degrades rather than throwing.** `Intl` throws on an
 *    invalid IANA name, and a settings row is not the place to take the screen
 *    down.
 *
 * **Renders nothing without a `timezone`** (§4.5).
 */
export function TimezoneRowV4({
  timezone,
  label,
  offsetLabel,
  title,
  variant = 'row',
  formatOffset,
  onPress,
  style,
}: TimezoneRowV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { tokens } = theme;
  if (!timezone) return null;

  const offset = offsetLabel ?? (formatOffset ?? defaultOffset)(timezone);
  const caption = metaLine([label ?? timezone, offset]);
  const inline = variant === 'inline';

  if (inline) {
    return (
      <View
        accessible
        accessibilityLabel={metaLine([title, caption])}
        style={[
          { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs },
          style,
        ]}
      >
        <IconV4 name="globe" size="sm" color="mutedText" />
        <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
          {caption}
        </TextV4>
      </View>
    );
  }

  const content = (pressed: boolean): React.ReactElement => (
    <View
      style={[
        rowContainerStyle(theme, { twoLine: Boolean(title) }),
        { backgroundColor: rowGround(theme, { pressed }) },
        style,
      ]}
    >
      <IconV4 name="globe" size="lg" color="mutedText" />
      <View style={rowTextStyle(theme)}>
        {title ? (
          <TextV4 size="base" weight="semibold" tone="onCard" numberOfLines={1}>
            {title}
          </TextV4>
        ) : null}
        <TextV4 size={title ? 'xs' : 'base'} tone={title ? 'mutedText' : 'onCard'} numberOfLines={1}>
          {caption}
        </TextV4>
      </View>
      {onPress ? <IconV4 name="chevron-right" size="lg" color="mutedText" /> : null}
    </View>
  );

  if (!onPress) {
    return (
      <View accessible accessibilityLabel={metaLine([title, caption])}>
        {content(false)}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={metaLine([title, caption])}
      onPress={onPress}
      style={{ borderRadius: tokens.radius.md }}
    >
      {({ pressed }) => content(pressed)}
    </Pressable>
  );
}
