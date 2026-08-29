import * as React from 'react';
import { View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import type { SpacingScale } from '../../theme/types';
import { TextV4 } from '../primitives/TextV4';
import { useXenitionTheme } from '../theme';

export type SpaceKey = keyof SpacingScale;

export interface SectionV4Props extends ViewProps {
  /** Section heading. Announced as a header. */
  title?: string;
  /** Supporting line under the heading. */
  subtitle?: string;
  /**
   * Vertical gap between the header and the content, from the spacing scale.
   * Defaults to `md` (16) — §4.1's "between a card header and its body".
   */
  spacing?: SpaceKey;
  /**
   * Trailing header slot — a "See all" link, a filter, an overflow menu.
   * Default `undefined`, so a section without one renders exactly as today.
   *
   * This is shadcn/ui's `CardAction` idea: a `Section` and a `SectionCard`
   * should have the **same header anatomy**, and the reason the two currently
   * look unrelated is that only one of them had a place to put an action.
   */
  action?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

/**
 * **V4 section** — the native twin of the web `SectionV4`, the base `Section`'s
 * props plus one, a different design line.
 *
 * ## What V4 changes
 *
 * 1. **The header is on the type ramp, and it is the same ramp on both twins.**
 *    The base hand-rolls a `<Text style={{ fontSize, fontWeight }}>` here and
 *    sets `text-lg font-semibold` on web — the same intent, expressed twice,
 *    free to drift. V4 sets both through `TextV4`: title `size="xl"
 *    weight="bold"`, subtitle `size="base" tone="mutedText"`. Louder and with
 *    more air than the base, because §3 asks for one loud thing per block and a
 *    section heading is it.
 * 2. **`mutedText`, not `muted`.** The base subtitle paints `colors.muted`,
 *    which is a *fill* and carries no contrast promise against the page.
 *    `mutedText` is the same quietness walked until it clears AA. This is the
 *    exact bug the shadcn pass closed elsewhere in the kit and the one the
 *    native rows still carry.
 * 3. **`action` exists.** See the prop.
 *
 * What V4 does **not** do is own the space *between* sections. §4.1 puts that at
 * `spacing.xl` (32) and it stays the caller's decision — a `Column gap="xl"`
 * around the sections — because a component that pushed its own siblings apart
 * would double up wherever a caller already had a rhythm.
 *
 * The header collapses entirely when there is no `title`, no `subtitle` and no
 * `action`: §4.5 asks that every component survive its empty case, and an empty
 * header row would leave a `gap` where two lines would be. With no children
 * either, this renders an empty `View` and paints nothing.
 *
 * ### Platform divergence
 *
 * None. The web twin's `<h2>`/`<p>` are that platform's semantics for a heading
 * and its supporting line; here the same thing is said with
 * `accessibilityRole="header"`. Same props, same defaults, same type ramp.
 */
export function SectionV4({
  title,
  subtitle,
  spacing = 'md',
  action,
  style,
  children,
  ...rest
}: SectionV4Props): React.ReactElement {
  const { tokens } = useXenitionTheme();
  const hasText = Boolean(title || subtitle);
  const hasHeader = hasText || Boolean(action);

  return (
    <View style={[{ gap: tokens.spacing[spacing] }, style]} {...rest}>
      {hasHeader ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: tokens.spacing.md,
          }}
        >
          {hasText ? (
            // `flex: 1` is geometric: the text column takes the free space so a
            // long title wraps instead of shoving the action off the end.
            <View style={{ flex: 1, gap: tokens.spacing.xs }}>
              {title ? (
                <TextV4 accessibilityRole="header" size="xl" weight="bold" tone="onSurface">
                  {title}
                </TextV4>
              ) : null}
              {subtitle ? (
                <TextV4 size="base" tone="mutedText">
                  {subtitle}
                </TextV4>
              ) : null}
            </View>
          ) : null}
          {action ? (
            // `flexShrink: 0` so a "See all" never compresses to fit a long
            // title.
            <View style={{ flexShrink: 0 }}>{action}</View>
          ) : null}
        </View>
      ) : null}
      {children}
    </View>
  );
}
