import * as React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { BadgeV4 } from '../primitives/BadgeV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import type { BadgeSize } from '../primitives/Badge';
import type { IconName } from '../../primitives/icon-names';
import {
  STATUS_ANATOMY,
  statusAnnouncement,
  statusLabel,
} from '../../commerce/internal/status-v4';
import type { StatusAnatomy, StatusInk, StatusTone } from '../../commerce/internal/status-v4';
import type { OrderStatus, StatusBadgeProps } from './StatusBadge';

export type { OrderStatus, StatusAnatomy, StatusInk, StatusTone };
export { STATUS_ANATOMY };

export interface StatusBadgeV4Props extends StatusBadgeProps {
  /**
   * Override the glyph for a status. The default per status is in
   * {@link STATUS_ANATOMY} and is almost always the right one; this exists for
   * a store whose "fulfilled" genuinely means something else.
   */
  iconName?: IconName;
  /** Badge size. Default `'md'`, matching `BadgeV4`. */
  size?: BadgeSize;
  style?: StyleProp<ViewStyle>;
}

/**
 * **V4 status badge (native)** — same props as the web `StatusBadgeV4`,
 * including defaults, and the same anatomy table.
 *
 * {@link STATUS_ANATOMY} lives in `commerce/internal/status-v4.ts`, imported
 * by both twins rather than restated here: it is a plain lookup with no
 * platform in it, and a shopper checking an order on their phone and on the
 * web must not be shown two different marks for "shipped". The `formatMoney`
 * rule is the same argument about a different table.
 *
 * Three changes from the base.
 *
 * 1. **An icon and a word, never colour alone.** The base painted six statuses
 *    in five fills and left the colour doing the whole job, which makes `paid`
 *    and `cancelled` the same badge for a reader who cannot separate green
 *    from red. Brief rule 6, and the read it protects — "did my money
 *    arrive?" — is the highest-stakes one in the kit.
 * 2. **It composes `BadgeV4`.** The base re-rolled the pill: its own radius,
 *    its own padding, a literal `2` for the vertical inset, its own tone
 *    switch. `BadgeV4` already makes all of those, including the one the base
 *    got wrong — that a badge's shape follows the seed rather than defaulting
 *    to a capsule, so a `sharp` brand gets square tags.
 * 3. **It says what it is.** The badge is **one** accessibility element
 *    announcing "Order status: Paid", instead of a `View` containing a bare
 *    word. `accessible` collapses the glyph and the label into that one
 *    element, so nothing reads out the emoji's name first — the native
 *    spelling of the web twin's visually-hidden prefix.
 *
 * The badge variant is deliberately **not** a prop, for the reason the web
 * twin gives: `soft` and `outline` label themselves with the `*Text` slots
 * after a contrast correction only `BadgeV4` can see, so a glyph tinted to
 * match them would have to guess at what colour the label actually landed on.
 */
export function StatusBadgeV4({
  status,
  iconName,
  size = 'md',
  children,
  style,
}: StatusBadgeV4Props): React.ReactElement {
  const anatomy = STATUS_ANATOMY[status];
  const label = children ?? statusLabel(status);
  const spoken = typeof label === 'string' ? label : statusLabel(status);

  return (
    <View
      accessible
      accessibilityRole="text"
      accessibilityLabel={statusAnnouncement(spoken)}
      style={[{ alignSelf: 'flex-start' }, style]}
    >
      <BadgeV4 tone={anatomy.tone} variant="solid" size={size}>
        {/*
          A fragment, not a string: `BadgeV4` typesets a string child itself and
          renders anything else straight into its row, which is what lets the
          glyph sit beside the word on the same contrast-checked ground.
        */}
        <>
          <IconV4 name={iconName ?? anatomy.icon} size="xs" color={anatomy.ink} />
          {typeof label === 'string' ? (
            <TextV4 size="xs" weight="semibold" tone={anatomy.ink}>
              {label}
            </TextV4>
          ) : (
            label
          )}
        </>
      </BadgeV4>
    </View>
  );
}
