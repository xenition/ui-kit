import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { TextV4 } from '../primitives/TextV4';
import type { MenuSectionProps } from './MenuSection';

export interface MenuSectionV4Props extends MenuSectionProps {
  /** The next-step sentence under `emptyLabel`. */
  emptyDescription?: string;
}

// `React.Children.toArray` already strips null/undefined/boolean children.
const isEmptyChildren = (children: React.ReactNode): boolean =>
  React.Children.toArray(children).length === 0;

/**
 * **V4 menu section** — same props as {@link MenuSection} plus
 * `emptyDescription`.
 *
 * ## Four changes
 *
 * 1. **The empty state is the shared primitive.** This twin hand-rolled a
 *    dashed box around one muted line while the web twin had already moved to
 *    `EmptyState` — so the "EmptyState is a primitive" change only ever landed
 *    on half the kit, and an empty category looked like two different products
 *    depending on the device. `EmptyStateV4` also drops the dashed rectangle,
 *    which is a placeholder outline drawn around a region whose emptiness the
 *    reader can already see.
 * 2. **An empty section says what to do next**, via `emptyDescription`. "No
 *    items yet." on its own is the failure mode an empty state exists to
 *    avoid.
 * 3. **The section is not announced as a summary.** `accessibilityRole="summary"`
 *    sat on the container of the entire dish list, describing the group as a
 *    précis of itself; a heading and its content need no role above them.
 * 4. **The description is `mutedText`.** `muted` is a ramp step with no
 *    contrast promise, and this is a sentence a reader has to read.
 *
 * **Renders nothing without a `title`.**
 */
export function MenuSectionV4({
  title,
  description,
  aside,
  children,
  emptyLabel = 'No items yet',
  emptyDescription,
  emptyState,
  style,
}: MenuSectionV4Props): React.ReactElement | null {
  const { tokens } = useXenitionTheme();
  if (!title) return null;

  const empty = isEmptyChildren(children);

  return (
    <View style={[{ gap: tokens.spacing.md }, style]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: tokens.spacing.sm,
        }}
      >
        <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }}>
          <TextV4 accessibilityRole="header" size="lg" weight="bold" tone="onSurface">
            {title}
          </TextV4>
          {description ? (
            <TextV4 size="sm" tone="mutedText">
              {description}
            </TextV4>
          ) : null}
        </View>
        {aside ? <View>{aside}</View> : null}
      </View>

      {empty ? (
        (emptyState ?? <EmptyStateV4 title={emptyLabel} description={emptyDescription} />)
      ) : (
        <View style={{ gap: tokens.spacing.sm }}>{children}</View>
      )}
    </View>
  );
}
