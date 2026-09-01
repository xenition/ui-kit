import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { TONE_BG } from '../primitives/internal/tone-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import type { AgendaItem, AgendaItemStatus, AgendaListProps } from './AgendaList';
import { AGENDA_TONE, PLACEHOLDER_CLASS, TABULAR_CLASS, TONE_INK, spokenLine } from './internal/event-v4';

export interface AgendaListV4Props extends AgendaListProps {
  /**
   * The word each status carries. Defaults to `Upcoming` / `Live now` / `Done`.
   * There is a word for every state, not only for `live`.
   */
  statusLabels?: Partial<Record<AgendaItemStatus, string>>;
}

/** Every status says what it is, because the dot alone never did. */
const DEFAULT_STATUS_LABELS: Record<AgendaItemStatus, string> = {
  upcoming: 'Upcoming',
  live: 'Live now',
  done: 'Done',
};

/** How many placeholder rows a loading agenda draws. */
const SKELETON_ROWS = 3;

const ROW_STATE = stateGroundVars(
  'var(--xen-surface)',
  'var(--xen-on-surface)'
) as React.CSSProperties;

/**
 * **V4 agenda list** — the web twin of the native `AgendaListV4`, same props as
 * {@link AgendaList} plus `statusLabels`.
 *
 * ## Five changes
 *
 * 1. **A finished session no longer looks like a future one.** `upcoming` and
 *    `done` differed by an 8px dot's hue and nothing else, and `done` was
 *    painted `bg-border` — a hairline token with no promise of being visible as
 *    a solid dot at all. Every state now carries a **word** as well as a mark,
 *    and the marks come from `AGENDA_TONE`, where only `live` is a status
 *    colour because only `live` is a status.
 * 2. **The row announces the whole entry.** `09:00 Big Talk` was the accessible
 *    name of a row that also drew a subtitle and a state, and a name replaces
 *    the subtree — so the room and the state were unreachable.
 * 3. **Empty is the shared `EmptyStateV4`**, the same component the native twin
 *    composes, rather than two hand-rolled empties that drifted apart.
 * 4. **Loading announces, and draws the shape it is about to be** — the base
 *    put `aria-label` on a role-less `div`, where it is ignored, over two
 *    `bg-neutral-*` bars that invert to near-white plates on a dark page.
 * 5. **A press is a state layer and the row clears 44.** `hover:opacity-80`
 *    dims the row's own content, which is the signal M3 spends on *disabled*.
 */
export const AgendaListV4 = React.forwardRef<HTMLDivElement, AgendaListV4Props>(
  function AgendaListV4(
    {
      items,
      onSelectItem,
      emptyLabel = 'No sessions scheduled yet',
      loading = false,
      statusLabels,
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const labelFor = (status: AgendaItemStatus): string =>
      statusLabels?.[status] ?? DEFAULT_STATUS_LABELS[status];

    if (loading) {
      return (
        <div
          ref={ref}
          role="status"
          aria-live="polite"
          aria-label="Loading agenda"
          className={cn('flex flex-col gap-sm', className)}
          {...rest}
        >
          {Array.from({ length: SKELETON_ROWS }, (_, i) => (
            <div key={i} className="flex flex-row items-center gap-md py-sm">
              <div className={cn('h-md w-2xl shrink-0', PLACEHOLDER_CLASS)} />
              <div className={cn('h-md flex-1', PLACEHOLDER_CLASS)} />
            </div>
          ))}
        </div>
      );
    }

    const list = items ?? [];

    if (list.length === 0) {
      return (
        <div ref={ref} className={className} {...rest}>
          <EmptyStateV4 title={emptyLabel} />
        </div>
      );
    }

    const clickable = typeof onSelectItem === 'function';

    const rowBody = (item: AgendaItem, status: AgendaItemStatus): React.ReactElement => (
      <span className="flex w-full flex-row items-start gap-md text-left">
        <span className={cn('w-2xl shrink-0 text-sm font-semibold text-muted-text', TABULAR_CLASS)}>
          {item.time}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            'mt-xs h-sm w-sm shrink-0 rounded-full',
            TONE_BG[AGENDA_TONE[status] ?? 'neutral']
          )}
        />
        <span className="flex min-w-0 flex-1 flex-col gap-xs">
          <span className="flex items-center gap-xs">
            <span className="flex-1 text-base font-semibold text-on-surface">{item.title}</span>
            {/*
              A word for every state, not a hue for three. `live` keeps the
              status ink because it is genuinely a status; the other two read as
              plain captions, which is what they are.
            */}
            <span
              className={cn(
                'text-xs font-bold',
                TONE_INK[AGENDA_TONE[status] ?? 'neutral']
              )}
            >
              {labelFor(status)}
            </span>
          </span>
          {item.subtitle ? (
            <span className="text-sm text-muted-text">{item.subtitle}</span>
          ) : null}
        </span>
      </span>
    );

    return (
      <div ref={ref} className={className} {...rest}>
        {/*
          `list-style: none` is enough for Safari + VoiceOver to stop treating a
          `<ul>` as a list, so the roles are written out rather than inferred.
        */}
        <ul role="list" className="flex list-none flex-col gap-xs p-0">
          {list.map((item) => {
            const status = item.status ?? 'upcoming';
            return (
              <li key={item.id} role="listitem">
                {clickable ? (
                  <button
                    type="button"
                    onClick={() => onSelectItem?.(item)}
                    aria-label={spokenLine([item.time, item.title, item.subtitle, labelFor(status)])}
                    data-xen-v4-state=""
                    style={ROW_STATE}
                    className={cn(
                      'flex w-full items-center rounded-[var(--xen-radius-md)] px-xs py-sm text-left',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                      MIN_TAP_CLASS
                    )}
                  >
                    {rowBody(item, status)}
                  </button>
                ) : (
                  <div className="flex items-center px-xs py-sm">{rowBody(item, status)}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
);
