import * as React from 'react';
import { Pressable, ScrollView, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { SearchInputV4 } from '../primitives/SearchInputV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import type { EmploymentType } from './types';
import { EMPLOYMENT_LABEL, EMPLOYMENT_TYPES } from './types';
import { spokenName } from './internal/tone-v4';
import type { JobFilterBarProps } from './JobFilterBar';

export interface JobFilterBarV4Props extends JobFilterBarProps {
  /** Placeholder in the search field. Default `'Search jobs, companies, skills…'`. */
  searchPlaceholder?: string;
  /** Render the result count. Default `'12 results'` / `'1 result'`. */
  formatResultCount?: (count: number) => string;
  /** Said instead of a count when nothing matched. Default `'No matching jobs'`. */
  emptyLabel?: string;
}

/** The clear affordance's copy — an undo, never a destructive act. */
const CLEAR = 'Clear';

/**
 * **V4 job filter bar** — same props as {@link JobFilterBar} plus
 * `searchPlaceholder`, `formatResultCount` and `emptyLabel`.
 *
 * ## Five changes
 *
 * 1. **The chips are not a tab list.** The base put
 *    `accessibilityRole="tablist"` on the `ScrollView` (and `role="tablist"` on
 *    web). These are **multi-select filters**: a tab list promises exactly one
 *    selected tab and a matching tab panel, so a reader announced "tab 2 of 4"
 *    for a control where two, three or none can be on at once, and looked for
 *    a panel that does not exist. The role is gone; each chip is a button that
 *    reports its own `selected` state, which is what a filter chip is.
 * 2. **"Clear" stopped being a red alarm.** The bar reused `SkillTag`'s
 *    `matched` and `missing` variants as selection state, so the clear
 *    affordance rendered as a solid danger-red chip labelled "! Clear" —
 *    the palette's strongest colour, meaning destruction, on the mildest
 *    action in the module. Clearing a filter is undoing a choice, so it is a
 *    plain outline chip. Selection is `primary`, the way every other V4 chip
 *    strip in the kit says it.
 * 3. **The chips are targets.** They were about 20 points tall — `paddingVertical:
 *    3` around a 12pt label — on the single most-tapped control in the module.
 *    They clear 44 now, from the same `minTap` the buttons and the nav line
 *    stand on.
 * 4. **`resultCount={0}` says something.** Zero is the one count that matters
 *    and it announced nothing at all, so a filter that eliminated every job
 *    looked identical to one still loading. It now draws `emptyLabel` in a
 *    polite live region, so the reader hears the outcome of the filter they
 *    just changed without being interrupted mid-word.
 * 5. **`muted` stopped inking the count**, and the search field is the V4 one —
 *    same height, same radius and same focus halo as every other field, with a
 *    real 44 clear button instead of a bare ✕ in 8 points of slop.
 */
export function JobFilterBarV4({
  types = EMPLOYMENT_TYPES,
  active = [],
  onToggleType,
  query,
  onQueryChange,
  onClear,
  resultCount,
  searchPlaceholder = 'Search jobs, companies, skills…',
  formatResultCount = (count: number) => `${count} result${count === 1 ? '' : 's'}`,
  emptyLabel = 'No matching jobs',
  style,
}: JobFilterBarV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  const activeSet = new Set(active);
  const showSearch = query != null || onQueryChange != null;
  const tap = minTap(tokens.spacing);
  const countText =
    typeof resultCount === 'number'
      ? resultCount === 0
        ? emptyLabel
        : formatResultCount(resultCount)
      : null;

  const chipStyle = (pressed: boolean, on: boolean): ViewStyle => ({
    minHeight: tap,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: tokens.spacing.md,
    borderRadius: tokens.radius.full,
    borderWidth: 1,
    borderColor: on ? colors.primary : colors.border,
    backgroundColor: pressed
      ? pressOver(theme, on ? colors.primary : colors.card, on ? colors.onPrimary : colors.onCard)
      : on
        ? colors.primary
        : colors.card,
  });

  return (
    <View style={[{ gap: tokens.spacing.sm }, style]}>
      {showSearch ? (
        <SearchInputV4
          value={query ?? ''}
          onChangeText={onQueryChange}
          placeholder={searchPlaceholder}
          accessibilityLabel="Search jobs"
        />
      ) : null}

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        {/*
          No role. These are multi-select filters, and RN has no container role
          that means "a group of toggles" — an invented one is worse than none,
          because each chip already reports its own selected state.
        */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: tokens.spacing.sm,
            alignItems: 'center',
            paddingEnd: tokens.spacing.md,
          }}
          style={{ flex: 1 }}
        >
          {types.map((type: EmploymentType) => {
            const on = activeSet.has(type);
            const label = (
              <TextV4
                size="sm"
                weight={on ? 'semibold' : 'medium'}
                tone={on ? 'onPrimary' : 'onCard'}
              >
                {EMPLOYMENT_LABEL[type]}
              </TextV4>
            );
            // A bar with no handler is a read-out of the active filters, not a
            // row of dead buttons, so it is announced rather than focusable.
            return onToggleType ? (
              <Pressable
                key={type}
                accessibilityRole="button"
                accessibilityLabel={EMPLOYMENT_LABEL[type]}
                accessibilityState={{ selected: on }}
                onPress={() => onToggleType(type)}
                style={({ pressed }) => chipStyle(pressed, on)}
              >
                {label}
              </Pressable>
            ) : (
              <View
                key={type}
                accessible
                accessibilityLabel={EMPLOYMENT_LABEL[type]}
                accessibilityState={{ selected: on }}
                style={chipStyle(false, on)}
              >
                {label}
              </View>
            );
          })}

          {/* Undoing a choice is not a destructive act — see change 2. */}
          {activeSet.size > 0 && onClear ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={spokenName([CLEAR, 'filters'])}
              onPress={onClear}
              style={({ pressed }) => chipStyle(pressed, false)}
            >
              <TextV4 size="sm" weight="medium" tone="primaryText">
                {CLEAR}
              </TextV4>
            </Pressable>
          ) : null}
        </ScrollView>

        {countText ? (
          <View accessible accessibilityLabel={countText} accessibilityLiveRegion="polite">
            <TextV4 size="xs" tone="mutedText" numeric="tabular">
              {countText}
            </TextV4>
          </View>
        ) : null}
      </View>
    </View>
  );
}
