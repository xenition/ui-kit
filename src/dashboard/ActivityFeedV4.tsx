import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { CardV4 } from '../primitives/CardV4';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import type { IconName } from '../primitives/icon-names';
import { ListSeparatorV4 } from '../layout/ListSeparatorV4';
import type { ActivityFeedProps, ActivityItem } from './ActivityFeed';
import {
  ROW_V4_BASE_CLASS,
  ROW_V4_CSS,
  ROW_V4_LEADING_CLASS,
  ROW_V4_STYLE_ID,
  ROW_V4_TEXT_CLASS,
  ROW_V4_TRAILING_CLASS,
  rowGroundClass,
  rowHeightClass,
  rowStateVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from './internal/row-v4';

/**
 * The tones §4.7 lets a row's leading badge wear — the same four, spelled
 * identically, as `NotificationItemV4` and `ListRowV4`. See §4.7: the colour
 * comes from the semantic family the row belongs to, and a badge in
 * `onPrimary` or `muted` is not a decision the brief leaves open.
 */
export type ActivityBadgeTone = 'primary' | 'success' | 'warn' | 'danger';

/**
 * The badge an activity wears when the caller names no `icon`.
 *
 * §4.3 retires the bare 8px dot and §5 says the dot "becomes a 44 tinted
 * circular badge" — so the replacement is the *default*, not an opt-in, or
 * every feed rendered today loses its leading treatment and the list's titles
 * go ragged. `bolt` is the set's name for "something happened", which is what
 * an unclassified activity is. A feed that knows its event types should pass
 * `icon` per item — §4.7 is right that twenty identical badges are noise, and
 * the per-item `icon` is the answer to it.
 */
const DEFAULT_ICON: IconName = 'bolt';

/** An activity, plus §5's two additions: a category badge and its tone. */
export interface ActivityItemV4 extends ActivityItem {
  /**
   * A named glyph for the row's 44 leading slot, drawn as §4.3's **tinted
   * circular badge** (`IconV4 badge="soft"`). Defaults to `'bolt'`.
   */
  icon?: IconName;
  /** Semantic family of this row's badge. Default `'primary'`. */
  tone?: ActivityBadgeTone;
}

export interface ActivityFeedV4Props extends Omit<ActivityFeedProps, 'items'> {
  items: ActivityItemV4[];
  /**
   * Trailing slot beside the heading — a "See all" link. §5: the heading
   * adopts the `Section` header anatomy, and that anatomy has an action.
   */
  action?: React.ReactNode;
  /** Headline for the empty state. Default `'No activity yet'`. */
  emptyTitle?: string;
  /** Illustration slot for the empty state — §4.5's tinted badge, or anything. */
  emptyIcon?: React.ReactNode;
  /** The one CTA §4.5 allows an empty state. */
  emptyAction?: React.ReactNode;
  /**
   * Make each row activate. When set, a row becomes a `<button>` carrying the
   * family's state layer; when unset the feed is a read-only log and the rows
   * are inert, exactly as today.
   */
  onItemClick?: (item: ActivityItemV4) => void;
}

/**
 * **V4 activity feed** — a list of V4 rows in one grouped container.
 *
 * Every metric, class and state recipe comes from `internal/row-v4.ts`; this
 * file decides *content* and *grouping* and nothing else.
 *
 * What changes against the base feed:
 *
 * 1. **Each entry is a row of the family.** The base laid out its own flex box
 *    with `gap-sm`, `gap-0.5` and an `mt-1.5` dot — literals brief §1 names
 *    outright — so a feed entry and a settings row shared nothing but a
 *    resemblance. Now they share {@link ROW_V4_BASE_CLASS},
 *    {@link rowHeightClass}, the 44 leading slot and the state layer.
 *
 * 2. **The dot becomes a badge.** §4.3 is explicit that a bare 8px dot is not a
 *    leading treatment. Each row gets `IconV4 badge="soft"` — the §4.7 44
 *    circle — from the item's own `icon`/`tone`.
 *
 * 3. **One container, with inset separators.** §4.3: the row's ground is
 *    transparent and the *container* owns the card, so the feed is one
 *    `CardV4` (`padding="none"`, so rows run flush to its edge and clip to
 *    `radius.lg`) with `ListSeparatorV4 inset="leading"` between rows — §4.4's
 *    rule, starting where the titles start so the list reads as a list rather
 *    than as a table cut through the middle of its avatars. That inset
 *    separator is what §5 asks the vertical rail for — "what makes a feed read
 *    as one list rather than fragments" — expressed with the primitive the row
 *    family already shares instead of a second kind of rule; §4.4 allows one
 *    weight of separator and no more.
 *
 * 4. **The empty state is the primitive.** §4.5: the web twin hand-rolled its
 *    own centred block with a `max-w-[340px]` literal; the native twin already
 *    composed `EmptyState`. Both now route through `EmptyStateV4`, and the
 *    measure is the primitive's job rather than a number here.
 *
 * 5. **Text is typeset, not styled.** Title `TextV4 size="base"
 *    weight="semibold" tone="onSurface"`, meta `size="sm" tone="mutedText"`,
 *    timestamp `size="xs" tone="mutedText"` top-aligned on a two-line row
 *    (§4.3). `mutedText`, not `muted` — `muted` is a fill.
 *
 * 6. **Press, when a row acts, is the state layer** and never an opacity.
 *
 * 7. **The heading-to-body gap is `md`.** §4.1's step between a card header and
 *    its body; the base's `sm` read as a caption stuck to the list.
 *
 * `items: []` renders `EmptyStateV4` and never a blank bordered box (§4.5) —
 * with or without a heading, and with no CTA unless the caller supplies one.
 */
export const ActivityFeedV4 = React.forwardRef<HTMLDivElement, ActivityFeedV4Props>(
  function ActivityFeedV4(
    {
      items,
      title,
      emptyMessage = 'Activity will appear here as things happen.',
      action,
      emptyTitle = 'No activity yet',
      emptyIcon,
      emptyAction,
      onItemClick,
      className,
      ...rest
    },
    ref
  ) {
    // Both sheets, from the one import — a row's press feedback IS the shared
    // state layer, so `V4_STATE_CSS` is not optional for a row.
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
    injectStyleOnce(ROW_V4_STYLE_ID, ROW_V4_CSS);

    const heading = title !== undefined && title !== '';
    const hasHeader = heading || action != null;

    return (
      <div ref={ref} className={cn('flex flex-col gap-md', className)} {...rest}>
        {hasHeader ? (
          <div className="flex flex-row items-start justify-between gap-md">
            {heading ? (
              // `m-0` kills the user-agent heading margin, which would
              // otherwise sit inside the gap and widen it — the same spelling
              // `SectionV4` uses for the same reason.
              <h3 className="m-0 min-w-0 flex-1">
                <TextV4 size="lg" weight="bold" tone="onSurface">
                  {title}
                </TextV4>
              </h3>
            ) : null}
            {action != null ? <div className="shrink-0">{action}</div> : null}
          </div>
        ) : null}
        {items.length === 0 ? (
          <EmptyStateV4
            title={emptyTitle}
            description={emptyMessage}
            icon={emptyIcon}
            action={emptyAction}
          />
        ) : (
          // The container owns the card (§4.3), the rows do not. `padding="none"`
          // plus `overflow-hidden` is what lets a row run flush to the card edge
          // and still clip to its radius.
          //
          // `bg-card`/`text-on-card` over the top because `CardV4` still paints
          // `surface` — §4.2's "most visible bug in the dashboard module", the
          // page colour used for a raised surface. It is not decoration here:
          // the row's state layer mixes `card` with `on-card`
          // ({@link rowStateVars}), so a pressed row on a `surface` container
          // would tint towards a fill it is not sitting on.
          <CardV4 padding="none" radius="lg" className="overflow-hidden bg-card text-on-card">
            <ul role="list" className="m-0 flex list-none flex-col p-0">
              {items.map((item, index) => (
                <li key={item.id}>
                  {/*
                    The rule lives inside the second and subsequent rows rather
                    than between the <li>s: a <div> between two list items is
                    not valid list content, and a list of one draws no rule at
                    all — which is also §4.4's answer for a list too short to
                    need grouping.
                  */}
                  {index > 0 ? <ListSeparatorV4 inset="leading" /> : null}
                  <ActivityRow item={item} onItemClick={onItemClick} />
                </li>
              ))}
            </ul>
          </CardV4>
        )}
      </div>
    );
  }
);

/**
 * One entry, drawn as a member of the row family.
 *
 * Kept local rather than exported: it is the feed's row, and a second exported
 * row component is exactly the drift §4.3 is closing. Everything structural is
 * `row-v4`'s.
 */
function ActivityRow({
  item,
  onItemClick,
}: {
  item: ActivityItemV4;
  onItemClick?: (item: ActivityItemV4) => void;
}): React.ReactElement {
  const supporting = item.meta !== undefined && item.meta !== '';
  const stamped = item.time !== undefined && item.time !== '';
  const label = `${item.title}${supporting ? `, ${item.meta}` : ''}${
    stamped ? `, ${item.time}` : ''
  }`;

  const inner = (
    <>
      <span className={ROW_V4_LEADING_CLASS}>
        <IconV4
          name={item.icon ?? DEFAULT_ICON}
          color={item.tone ?? 'primary'}
          badge="soft"
          size="base"
        />
      </span>
      <span className={ROW_V4_TEXT_CLASS}>
        <TextV4 size="base" weight="semibold" tone="onSurface" numberOfLines={1}>
          {item.title}
        </TextV4>
        {supporting ? (
          <TextV4 size="sm" tone="mutedText" numberOfLines={1}>
            {item.meta}
          </TextV4>
        ) : null}
      </span>
      {stamped ? (
        <span
          className={cn(
            ROW_V4_TRAILING_CLASS,
            // §4.3: a timestamp top-aligns on a two-line row.
            supporting && 'self-start'
          )}
        >
          <TextV4 size="xs" tone="mutedText">
            {item.time}
          </TextV4>
        </span>
      ) : null}
    </>
  );

  const classes = cn(ROW_V4_BASE_CLASS, rowHeightClass(supporting), rowGroundClass(false));

  if (onItemClick === undefined) {
    return (
      <div data-xen-v4-row="" data-interactive="false" aria-label={label} className={classes}>
        {inner}
      </div>
    );
  }
  return (
    <button
      type="button"
      data-xen-v4-row=""
      data-interactive="true"
      data-xen-v4-state=""
      aria-label={label}
      onClick={() => onItemClick(item)}
      className={classes}
      // Inline rather than left to the sheet: the row sheet's id is shared by
      // the whole family, so whichever injects first wins the document.
      style={rowStateVars()}
    >
      {inner}
    </button>
  );
}
