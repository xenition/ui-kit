import * as React from 'react';
import { Pressable, ScrollView, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AvatarV4 } from '../primitives/AvatarV4';
import { TextV4 } from '../primitives/TextV4';
import { pressOver } from '../primitives/internal/state-v4';
import { minTap } from '../primitives/internal/chrome-v4';
import { MOOD_GLYPH, MOOD_LABEL, skeletonBlockStyle, spokenLine } from './internal/tone-v4';
import type { ChildMood } from './ChildProfileCard';

/** One child in the switcher. */
export interface ChildSwitcherItem {
  /** Stable identity, handed back to {@link ChildSwitcherV4Props.onSelect}. */
  id: string | number;
  /** The child's name — shown under the photo and spoken. */
  name: string;
  /** Photo URL; falls back to initials. */
  photoUrl?: string;
  /** Today's mood, as a glyph and a word. Never a colour. */
  mood?: ChildMood;
}

export interface ChildSwitcherV4Props {
  /** The children to switch between. `[]` is a real empty state. */
  items: ChildSwitcherItem[];
  /** Which child is showing. */
  selectedId?: string | number;
  /** Fires with the chosen child's `id`. */
  onSelect?: (id: string | number) => void;
  /** The strip's spoken name. Default `'Children'`. */
  label?: string;
  /** Draw placeholders in the shape the strip is about to be. */
  loading?: boolean;
  /** How many placeholders `loading` draws. Default `3`. */
  skeletonCount?: number;
  /** The loading region's spoken name. Default `'Loading children'`. */
  loadingLabel?: string;
  /** Headline of the empty state. Default `'No children yet'`. */
  emptyLabel?: string;
  /** The next step, under {@link ChildSwitcherV4Props.emptyLabel}. */
  emptyDescription?: string;
  /** The add control's name. Rendered only with `onAdd`. Default `'Add child'`. */
  addLabel?: string;
  /** Fires when the add control is pressed. */
  onAdd?: () => void;
  /** Appended to the selected child's spoken name. Default `'selected'`. */
  selectedLabel?: string;
  /** Layout override — margins and width, never colour. */
  style?: StyleProp<ViewStyle>;
}

/** Enough ghost tiles to show the shape without pretending to know the count. */
const DEFAULT_SKELETONS = 3;

/**
 * **V4 child switcher** — new in V4; there is no base component.
 *
 * ## Three changes
 *
 * 1. **A family app can finally say *which* child.** Every one of the twelve
 *    `kids` components takes exactly one child — one profile, one allowance,
 *    one growth curve — and nothing in the module chose between them, so the
 *    first control on a family screen did not exist and every app had to invent
 *    it. This is that control: one horizontal strip, one selected child, and
 *    an optional way to add another.
 * 2. **It is a real tab list, not a row of coloured chips.** Each child is a
 *    `tab` carrying `selected` state and their own name inside a `tablist`, so
 *    a reader is told which child is showing rather than being left to infer it
 *    from a tint. Selection is the `selected`/`onSelected` token pair, a ring,
 *    a bold name **and** the word `selectedLabel` — never the hue on its own.
 * 3. **The targets fit a child's thumb.** Every tile clears 44 on both axes and
 *    presses with a state layer over its own ground, so a pressed tile does not
 *    dim into M3's *disabled* band the way the rest of this module does.
 *
 * Mood rides along as a glyph and a word from the module's one mood table, so
 * the switcher and `ChildProfileCardV4` cannot disagree about what `sick`
 * looks like — and, as everywhere else here, a mood is never a tone.
 *
 * **Renders an empty state, never a blank strip** (§4.5).
 */
export function ChildSwitcherV4({
  items,
  selectedId,
  onSelect,
  label = 'Children',
  loading = false,
  skeletonCount = DEFAULT_SKELETONS,
  loadingLabel = 'Loading children',
  emptyLabel = 'No children yet',
  emptyDescription,
  addLabel = 'Add child',
  onAdd,
  selectedLabel = 'selected',
  style,
}: ChildSwitcherV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const tap = minTap(tokens.spacing);

  if (loading) {
    const ghosts = Math.max(1, Math.floor(Number.isFinite(skeletonCount) ? skeletonCount : 1));
    return (
      <View
        accessible
        accessibilityLabel={loadingLabel}
        style={[{ flexDirection: 'row', gap: tokens.spacing.md }, style]}
      >
        {Array.from({ length: ghosts }).map((_, i) => (
          <View key={i} style={{ alignItems: 'center', gap: tokens.spacing.xs }}>
            <View style={skeletonBlockStyle(theme, { height: tap, width: tap, round: true })} />
            <View
              style={skeletonBlockStyle(theme, { height: tokens.typography.scale.xs, width: tap })}
            />
          </View>
        ))}
      </View>
    );
  }

  const children = items ?? [];

  if (children.length === 0) {
    return (
      <View
        accessible
        accessibilityRole="summary"
        accessibilityLabel={spokenLine([label, emptyLabel, emptyDescription])}
        style={[{ paddingVertical: tokens.spacing.md, gap: tokens.spacing.xs }, style]}
      >
        <TextV4 size="sm" weight="semibold" tone="onSurface">
          {emptyLabel}
        </TextV4>
        {emptyDescription ? (
          <TextV4 size="xs" tone="mutedText">
            {emptyDescription}
          </TextV4>
        ) : null}
      </View>
    );
  }

  const tileStyle = (selected: boolean, pressed: boolean): ViewStyle => ({
    minWidth: tap + tokens.spacing.xl,
    minHeight: tap,
    alignItems: 'center',
    gap: tokens.spacing.xs,
    paddingVertical: tokens.spacing.sm,
    paddingHorizontal: tokens.spacing.sm,
    borderRadius: tokens.radius.lg,
    backgroundColor: pressed
      ? pressOver(
          theme,
          selected ? colors.selected : colors.card,
          selected ? colors.onSelected : colors.onCard
        )
      : selected
        ? colors.selected
        : 'transparent',
  });

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      accessibilityRole="tablist"
      accessibilityLabel={label}
      style={style}
      contentContainerStyle={{ gap: tokens.spacing.sm, paddingVertical: tokens.spacing.xs }}
    >
      {children.map((child) => {
        const selected = child.id === selectedId;
        const moodWord = child.mood ? MOOD_LABEL[child.mood] : null;
        const moodGlyph = child.mood ? MOOD_GLYPH[child.mood] : null;
        // The word, not only the tint: `selected` state is honoured by iOS and
        // dropped by parts of Android, and a ring is nothing to a reader.
        const name = spokenLine([child.name, moodWord, selected ? selectedLabel : null]);

        const tile = (pressed: boolean): React.ReactElement => (
          <View style={tileStyle(selected, pressed)}>
            <AvatarV4 src={child.photoUrl} name={child.name} size="md" ring={selected} />
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
              {moodGlyph ? (
                <TextV4
                  size="xs"
                  allowFontScaling={false}
                  accessibilityElementsHidden
                  importantForAccessibility="no-hide-descendants"
                >
                  {moodGlyph}
                </TextV4>
              ) : null}
              <TextV4
                size="xs"
                weight={selected ? 'bold' : 'regular'}
                numberOfLines={1}
                style={{ color: selected ? colors.onSelected : colors.mutedText }}
              >
                {child.name}
              </TextV4>
            </View>
          </View>
        );

        if (!onSelect) {
          return (
            <View key={child.id} accessible accessibilityLabel={name}>
              {tile(false)}
            </View>
          );
        }
        return (
          <Pressable
            key={child.id}
            accessibilityRole="tab"
            accessibilityLabel={name}
            accessibilityState={{ selected }}
            onPress={() => onSelect(child.id)}
          >
            {({ pressed }) => tile(pressed)}
          </Pressable>
        );
      })}

      {onAdd ? (
        <Pressable accessibilityRole="button" accessibilityLabel={addLabel} onPress={onAdd}>
          {({ pressed }) => (
            <View style={tileStyle(false, pressed)}>
              <View
                style={{
                  width: tap,
                  height: tap,
                  borderRadius: tokens.radius.full,
                  borderWidth: 1,
                  borderColor: colors.border,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <TextV4 size="lg" tone="mutedText" allowFontScaling={false}>
                  +
                </TextV4>
              </View>
              <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
                {addLabel}
              </TextV4>
            </View>
          )}
        </Pressable>
      ) : null}
    </ScrollView>
  );
}
