import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { pressFill } from '../primitives/internal/state-v4';
import { minTap } from '../primitives/internal/chrome-v4';
import { toneInk } from './internal/reading-v4';
import type { TableOfContentsProps } from './TableOfContents';

export interface TableOfContentsV4Props extends TableOfContentsProps {
  /** The list's accessible name when `title` is hidden. Default `'Contents'`. */
  navLabel?: string;
}

/** Per-nesting-level indent, off the spacing scale (guards a missing `level`). */
function indentFor(level: number | undefined, unit: number): number {
  return Math.max(0, (level ?? 1) - 1) * unit;
}

/**
 * **V4 table of contents** — same props as {@link TableOfContents} plus
 * `navLabel`.
 *
 * ## Six changes
 *
 * 1. **A read-only contents list is a list of headings.** `onSelect` is
 *    optional, and both twins passed `disabled={!onSelect}` — so the ordinary
 *    case, a TOC rendered for reading, turned every heading into a disabled
 *    button: greyed, out of the tab order, announced "unavailable". Without
 *    `onSelect` the rows are now plain text.
 * 2. **It is not a menu.** This twin said `menu` / `menuitem`, which promises a
 *    popup widget with menu keyboard semantics that nothing here implements,
 *    while the web twin used a navigation landmark. Both now describe the same
 *    object: a named list of headings.
 * 3. **The indent comes from the spacing scale on both twins.** The web twin
 *    multiplied depth by a hard-coded 16.
 * 4. **The current heading is not marked by colour alone.** It takes weight as
 *    well as `accentText`, and announces as selected.
 * 5. **A selectable row clears 44** and presses as a state layer rather than
 *    `opacity: 0.6`.
 * 6. **`navLabel` names the list when `title` is hidden**, instead of the
 *    fallback being a hard-coded `'Contents'` nobody could change.
 */
export function TableOfContentsV4({
  items,
  activeId,
  onSelect,
  title = 'Contents',
  emptyLabel = 'No sections',
  navLabel = 'Contents',
  style,
}: TableOfContentsV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const tap = minTap(tokens.spacing);

  const row = (
    id: string,
    label: string,
    level: number | undefined,
    active: boolean
  ): React.ReactElement => {
    const text = (
      <TextV4
        size="sm"
        // Weight as well as colour: a highlight nobody can see in greyscale is
        // not a highlight.
        weight={active ? 'bold' : 'regular'}
        numberOfLines={2}
        style={{ color: active ? toneInk(theme, 'accent') : colors.onSurface }}
      >
        {label}
      </TextV4>
    );

    const indent = indentFor(level, tokens.spacing.md);

    // No handler, no button. A heading a reader cannot jump to is still a
    // heading, not a broken control.
    if (!onSelect) {
      return (
        <View
          key={id}
          accessible
          accessibilityRole="text"
          accessibilityLabel={label}
          accessibilityState={{ selected: active }}
          style={{ paddingVertical: tokens.spacing.xs, paddingLeft: indent }}
        >
          {text}
        </View>
      );
    }

    return (
      <Pressable
        key={id}
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ selected: active }}
        onPress={() => onSelect(id)}
        style={({ pressed }) => ({
          justifyContent: 'center',
          minHeight: tap,
          paddingVertical: tokens.spacing.xs,
          paddingLeft: indent,
          borderRadius: tokens.radius.sm,
          backgroundColor: pressed ? pressFill(theme) : 'transparent',
        })}
      >
        {text}
      </Pressable>
    );
  };

  return (
    <View
      accessibilityRole="list"
      accessibilityLabel={typeof title === 'string' ? title : navLabel}
      style={[
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.md,
          gap: tokens.spacing.xs,
        },
        style,
      ]}
    >
      {title != null ? (
        <TextV4
          size="xs"
          weight="bold"
          tone="mutedText"
          style={{ textTransform: 'uppercase', marginBottom: tokens.spacing.xs }}
        >
          {title}
        </TextV4>
      ) : null}

      {items.length === 0 ? (
        <TextV4 size="sm" tone="mutedText">
          {emptyLabel}
        </TextV4>
      ) : (
        items.map((item) => row(item.id, item.label, item.level, item.id === activeId))
      )}
    </View>
  );
}
