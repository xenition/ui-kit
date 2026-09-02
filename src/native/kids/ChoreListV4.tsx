import * as React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { ChoreCardV4, type ChoreCardV4Props } from './ChoreCardV4';
import { spokenLine } from './internal/tone-v4';

/**
 * One chore in the list.
 *
 * Everything {@link ChoreCardV4} takes except the three things the *list* owns:
 * `loading` is a state of the whole list, and `onPress` / `onComplete` are
 * routed through {@link ChoreListV4Props.onSelectItem} and
 * {@link ChoreListV4Props.onCompleteItem}, so a caller writes one handler
 * rather than one per row.
 */
export interface ChoreListItem
  extends Omit<ChoreCardV4Props, 'loading' | 'onPress' | 'onComplete' | 'id'> {
  /** React key, and the identity handed back to the list's callbacks. */
  id?: string | number;
}

export interface ChoreListV4Props {
  /** The chores to render. `[]` is a real empty state, not a blank region. */
  items: ChoreListItem[];
  /** Draw placeholder cards in the shape the list is about to be. */
  loading?: boolean;
  /** How many placeholder cards `loading` draws. Default `3`. */
  skeletonCount?: number;
  /** The loading region's spoken name. Default `'Loading chores'`. */
  loadingLabel?: string;
  /** Headline of the empty state. Default `'No chores yet'`. */
  emptyLabel?: string;
  /** The next step, under {@link ChoreListV4Props.emptyLabel}. */
  emptyDescription?: string;
  /** The list's spoken name. Default `'3 chores'`. */
  formatCount?: (count: number) => string;
  /** A chore's body was pressed. */
  onSelectItem?: (id: string | number, index: number) => void;
  /** A chore's completion action was pressed. */
  onCompleteItem?: (id: string | number, index: number) => void;
  /** Layout override — margins and width, never colour. */
  style?: StyleProp<ViewStyle>;
}

/** Enough ghost cards to show the shape without pretending to know the length. */
const DEFAULT_SKELETONS = 3;

/**
 * **V4 chore list** — new in V4; there is no base component.
 *
 * ## Three changes
 *
 * 1. **A chore screen with no chores says so.** `kids` shipped twelve
 *    components and no list container, so every screen that rendered chores
 *    mapped an array straight to `ChoreCard` — and an empty array rendered
 *    **nothing at all**: a blank region with no explanation and no next step,
 *    which reads as a broken screen rather than as a fresh start.
 * 2. **Loading is a shape, not a spinner.** `loading` lived on the card, so the
 *    only way to show a *list* loading was to invent a placeholder array at
 *    every call site — and nobody did. The list draws ghost cards in the shape
 *    the real ones are about to take, so the layout does not jump when the data
 *    lands, and the region says what it is waiting for.
 * 3. **The list is a region a reader can recognise**, with the `list` role and
 *    a count — and deliberately no `accessible` of its own, which would flatten
 *    every card under it into a single leaf. That is the same flattening the
 *    sibling rule exists to prevent inside a card, one level up.
 *
 * Deliberately a plain `View` rather than a `FlatList`: a chore list is short
 * and nearly always sits inside a screen's own `ScrollView`, where a nested
 * virtualised list is a known scrolling defect.
 */
export function ChoreListV4({
  items,
  loading = false,
  skeletonCount = DEFAULT_SKELETONS,
  loadingLabel = 'Loading chores',
  emptyLabel = 'No chores yet',
  emptyDescription,
  formatCount,
  onSelectItem,
  onCompleteItem,
  style,
}: ChoreListV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { tokens } = theme;

  if (loading) {
    const ghosts = Math.max(1, Math.floor(Number.isFinite(skeletonCount) ? skeletonCount : 1));
    return (
      <View accessible accessibilityLabel={loadingLabel} style={[{ gap: tokens.spacing.md }, style]}>
        {Array.from({ length: ghosts }).map((_, i) => (
          <ChoreCardV4 key={i} title="" loading />
        ))}
      </View>
    );
  }

  const rows = items ?? [];

  if (rows.length === 0) {
    return (
      <View
        accessible
        accessibilityRole="summary"
        accessibilityLabel={spokenLine([emptyLabel, emptyDescription])}
        style={[{ paddingVertical: tokens.spacing.xl, gap: tokens.spacing.xs }, style]}
      >
        <TextV4
          size="2xl"
          align="center"
          allowFontScaling={false}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
        >
          🧹
        </TextV4>
        <TextV4 size="sm" weight="semibold" tone="onSurface" align="center">
          {emptyLabel}
        </TextV4>
        {emptyDescription ? (
          <TextV4 size="xs" tone="mutedText" align="center">
            {emptyDescription}
          </TextV4>
        ) : null}
      </View>
    );
  }

  const count = (formatCount ?? ((n: number) => `${n} chores`))(rows.length);

  return (
    /* A role and a name, but no `accessible`: setting that on a container
       flattens every card under it into one leaf, and each card already
       carries its own sentence and its own controls. */
    <View
      accessibilityRole="list"
      accessibilityLabel={count}
      style={[{ gap: tokens.spacing.md }, style]}
    >
      {rows.map(({ id, ...chore }, index) => {
        const key = id ?? index;
        return (
          <ChoreCardV4
            key={key}
            {...chore}
            onPress={onSelectItem ? () => onSelectItem(key, index) : undefined}
            onComplete={onCompleteItem ? () => onCompleteItem(key, index) : undefined}
          />
        );
      })}
    </View>
  );
}
