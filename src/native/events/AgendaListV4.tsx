import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressFill } from '../primitives/internal/state-v4';
import { AGENDA_TONE, placeholderGround, spokenLine, toneFill, toneInk } from './internal/event-v4';
import type { AgendaItem, AgendaItemStatus, AgendaListProps } from './AgendaList';

export interface AgendaListV4Props extends AgendaListProps {
  /**
   * The word each status is announced and printed with. Default
   * `'Upcoming'` / `'Live now'` / `'Done'`.
   */
  statusLabels?: Partial<Record<AgendaItemStatus, string>>;
}

const STATUS_WORD: Record<AgendaItemStatus, string> = {
  upcoming: 'Upcoming',
  live: 'Live now',
  done: 'Done',
};

/** How many ghost rows the loading state draws — the same three as the base. */
const SKELETON_ROWS = 3;

/**
 * **V4 agenda list** — same props as {@link AgendaList} plus `statusLabels`.
 *
 * ## Five changes
 *
 * 1. **A finished session no longer looks like a future one.** `upcoming` and
 *    `done` differed by the hue of an 8px dot and nothing else, and `done` was
 *    painted `colors.border` — a hairline token with no promise of being
 *    visible as a solid dot at all. Every state now carries a **word** beside
 *    the dot, and the dot's tone comes from `AGENDA_TONE`, where an agenda's
 *    progress stops borrowing the module's status palette.
 * 2. **A row announces what it shows.** The base spoke `"09:00 Coffee"` from
 *    the interactive root, which replaces the subtree — so the room, the track
 *    and the live marker were unreachable. The row is one comma-joined name.
 * 3. **The empty state is the shared one**, with a heading rather than a lone
 *    grey line centred in a box.
 * 4. **The loading region actually announces.** `accessibilityLabel` sat on a
 *    plain `View`, which names nothing on either platform; its ghost bars were
 *    also `tokens.ramps.neutral[100|200]`, and the native ramp keeps its light
 *    orientation in both schemes — so a dark-mode agenda loaded as two
 *    near-white slabs.
 * 5. **A press is a state layer and the row clears 44**, where the base dimmed
 *    the whole row to `opacity: 0.7` — inside M3's disabled band — on a target
 *    whose height was whatever the text happened to need.
 */
export function AgendaListV4({
  items,
  onSelectItem,
  emptyLabel = 'No sessions scheduled yet',
  statusLabels,
  loading = false,
  style,
}: AgendaListV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { tokens } = theme;
  const tap = minTap(tokens.spacing);
  const gutter = tokens.spacing['2xl'] + tokens.spacing.md;

  if (loading) {
    return (
      <View
        accessible
        accessibilityLabel="Loading agenda"
        accessibilityLiveRegion="polite"
        style={[{ gap: tokens.spacing.sm }, style]}
      >
        {Array.from({ length: SKELETON_ROWS }, (_, i) => (
          <View
            key={i}
            style={{ flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'center' }}
          >
            <View
              style={{
                width: tokens.spacing['2xl'],
                height: tokens.spacing.md,
                borderRadius: tokens.radius.sm,
                backgroundColor: placeholderGround(theme),
              }}
            />
            <View
              style={{
                flex: 1,
                height: tokens.spacing.lg,
                borderRadius: tokens.radius.sm,
                backgroundColor: placeholderGround(theme),
              }}
            />
          </View>
        ))}
      </View>
    );
  }

  if (items.length === 0) {
    return (
      <View style={style}>
        <EmptyStateV4 title={emptyLabel} />
      </View>
    );
  }

  const word = (status: AgendaItemStatus): string => statusLabels?.[status] ?? STATUS_WORD[status];

  const row = (item: AgendaItem, pressed: boolean): React.ReactElement => {
    const status = item.status ?? 'upcoming';
    const tone = AGENDA_TONE[status] ?? 'neutral';
    return (
      <View
        style={{
          flexDirection: 'row',
          gap: tokens.spacing.md,
          minHeight: tap,
          alignItems: 'flex-start',
          paddingVertical: tokens.spacing.sm,
          borderRadius: tokens.radius.md,
          backgroundColor: pressed ? pressFill(theme) : 'transparent',
        }}
      >
        <TextV4
          size="sm"
          weight="semibold"
          tone="mutedText"
          numeric="tabular"
          style={{ width: gutter }}
        >
          {item.time}
        </TextV4>
        {/* The dot repeats the word beside it; it never carries the state
            alone, so it is hidden from the reader rather than announced. */}
        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={{ alignItems: 'center', paddingTop: tokens.spacing.xs }}
        >
          <View
            style={{
              width: tokens.spacing.sm,
              height: tokens.spacing.sm,
              borderRadius: tokens.radius.full,
              backgroundColor: toneFill(theme, tone),
            }}
          />
        </View>
        <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }}>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}
          >
            <TextV4 size="base" weight="semibold" tone="onSurface" style={{ flex: 1 }}>
              {item.title}
            </TextV4>
            <TextV4
              size="xs"
              weight={status === 'live' ? 'bold' : 'medium'}
              style={{ color: toneInk(theme, tone) }}
            >
              {word(status)}
            </TextV4>
          </View>
          {item.subtitle ? (
            <TextV4 size="sm" tone="mutedText">
              {item.subtitle}
            </TextV4>
          ) : null}
        </View>
      </View>
    );
  };

  return (
    <View accessibilityRole="list" style={[{ gap: tokens.spacing.xs }, style]}>
      {items.map((item) => {
        const name = spokenLine([
          item.time,
          item.title,
          item.subtitle,
          word(item.status ?? 'upcoming'),
        ]);

        if (onSelectItem) {
          return (
            <Pressable
              key={item.id}
              accessibilityRole="button"
              accessibilityLabel={name}
              onPress={() => onSelectItem(item)}
              style={{ borderRadius: tokens.radius.md }}
            >
              {({ pressed }) => row(item, pressed)}
            </Pressable>
          );
        }
        // React Native has no `listitem` role, so the row's own accessible
        // element is the list item — one stop, one name, inside the list.
        return (
          <View key={item.id} accessible accessibilityLabel={name}>
            {row(item, false)}
          </View>
        );
      })}
    </View>
  );
}
