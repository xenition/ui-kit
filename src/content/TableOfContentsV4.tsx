import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import type { TableOfContentsProps } from './TableOfContents';
import { TONE_INK } from './internal/reading-v4';

export interface TableOfContentsV4Props extends TableOfContentsProps {
  /**
   * The navigation's accessible name when `title` is not a string. Default
   * `'Contents'`.
   *
   * The base fell back to a hard-coded `'Contents'` in exactly that case, so a
   * caller who passed `title={null}` to hide the heading could not name the
   * region at all.
   */
  navLabel?: string;
}

/**
 * The indent for a nesting level, from the spacing scale.
 *
 * Web hard-coded `depth * 16`. It is `md` per level on both twins now, so a
 * denser or roomier seed indents its outline with the rest of the product.
 */
function indentStyle(level: number | undefined): React.CSSProperties | undefined {
  const depth = Math.max(0, (level ?? 1) - 1);
  if (depth === 0) return undefined;
  return { paddingInlineStart: `calc(var(--xen-space-md) * ${depth})` };
}

/**
 * **V4 table of contents** — the web twin of the native `TableOfContentsV4`,
 * same props as {@link TableOfContents} plus `navLabel`.
 *
 * ## Six changes
 *
 * 1. **A read-only table of contents is a list of headings.** Both twins
 *    passed `disabled={!onSelect}`, and `onSelect` is optional — so a TOC
 *    rendered for reading, the ordinary case, turned every heading into a
 *    `<button disabled>`: greyed by the UA, out of the tab order, announced
 *    "unavailable". Without a handler it now renders plain list items.
 * 2. **Both twins say navigation.** Native said `menu`/`menuitem`, which
 *    promises a popup widget with menu keyboard semantics that neither twin
 *    implements.
 * 3. **The indent comes from the spacing scale**, not a typed `depth * 16`.
 * 4. **The active heading takes `accentText`** — the contrast-corrected slot —
 *    and is marked by weight and `aria-current` as well as by colour.
 * 5. **A selectable row clears 44 and presses with the state layer**, not
 *    `opacity: 0.6`, which reads as unavailable.
 * 6. **`navLabel` names the region** when `title` is hidden.
 */
export const TableOfContentsV4 = React.forwardRef<HTMLElement, TableOfContentsV4Props>(
  function TableOfContentsV4(
    {
      items,
      activeId,
      onSelect,
      title = 'Contents',
      emptyLabel = 'No sections',
      navLabel = 'Contents',
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    return (
      <nav
        ref={ref}
        aria-label={typeof title === 'string' ? title : navLabel}
        className={cn(
          'flex flex-col gap-xs rounded-[var(--xen-radius-lg)] border border-border bg-surface p-md',
          className
        )}
        {...rest}
      >
        {title != null ? (
          <p className={cn('mb-xs text-xs font-bold uppercase tracking-wide', TONE_INK.muted)}>
            {title}
          </p>
        ) : null}

        {items.length === 0 ? (
          <p className={cn('text-sm', TONE_INK.muted)}>{emptyLabel}</p>
        ) : (
          <ul className="flex flex-col gap-xs">
            {items.map((item) => {
              const active = item.id === activeId;
              const ink = active ? cn('font-bold', TONE_INK.accent) : 'font-normal text-on-surface';

              if (!onSelect) {
                return (
                  <li
                    key={item.id}
                    aria-current={active ? 'true' : undefined}
                    style={indentStyle(item.level)}
                    className={cn('line-clamp-2 py-xs text-sm', ink)}
                  >
                    {item.label}
                  </li>
                );
              }

              return (
                <li key={item.id}>
                  <button
                    type="button"
                    aria-current={active ? 'true' : undefined}
                    onClick={() => onSelect(item.id)}
                    data-xen-v4-state=""
                    style={{
                      ...(stateGroundVars(
                        'var(--xen-surface)',
                        'var(--xen-on-surface)'
                      ) as React.CSSProperties),
                      ...indentStyle(item.level),
                    }}
                    className={cn(
                      'flex w-full items-center rounded-[var(--xen-radius-sm)] px-xs text-left text-sm',
                      // The HIG floor, composed from the spacing scale.
                      MIN_TAP_CLASS,
                      ink,
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                    )}
                  >
                    <span className="line-clamp-2">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </nav>
    );
  }
);
