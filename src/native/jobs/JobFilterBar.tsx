import * as React from 'react';
import { ScrollView, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { SearchInput } from '../primitives';
import type { EmploymentType } from './types';
import { EMPLOYMENT_LABEL, EMPLOYMENT_TYPES } from './types';
import { SkillTag } from './SkillTag';

export interface JobFilterBarProps {
  /** Which employment-type chips to show. Defaults to all four. */
  types?: readonly EmploymentType[];
  /** Currently active types. */
  active?: EmploymentType[];
  /** Fired when a type chip is toggled. */
  onToggleType?: (type: EmploymentType) => void;
  /** Search query (controlled); shows a search field when provided. */
  query?: string;
  /** Fired as the search query changes. */
  onQueryChange?: (query: string) => void;
  /** Fired when the "Clear" chip is pressed (shown when any filter is active). */
  onClear?: () => void;
  /** Optional result-count hint rendered to the right. */
  resultCount?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * A filter bar for a job list: an optional search field plus a horizontally
 * scrolling row of employment-type chips (`SkillTag`s) that toggle on/off, and a
 * "Clear" chip once anything is active. Controlled — the app owns `active` and
 * `query` and reacts to the callbacks. Selected chips carry a token outline (not
 * color alone). Tokens only.
 */
export function JobFilterBar({
  types = EMPLOYMENT_TYPES,
  active = [],
  onToggleType,
  query,
  onQueryChange,
  onClear,
  resultCount,
  style,
}: JobFilterBarProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const activeSet = new Set(active);
  const showSearch = query != null || onQueryChange != null;

  return (
    <View style={[{ gap: tokens.spacing.sm }, style]}>
      {showSearch ? (
        <SearchInput
          value={query ?? ''}
          onChangeText={onQueryChange}
          placeholder="Search jobs, companies, skills…"
          accessibilityLabel="Search jobs"
        />
      ) : null}

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          accessibilityRole="tablist"
          contentContainerStyle={{ gap: tokens.spacing.xs, alignItems: 'center', paddingRight: tokens.spacing.sm }}
          style={{ flex: 1 }}
        >
          {types.map((t) => {
            const on = activeSet.has(t);
            return (
              <SkillTag
                key={t}
                label={EMPLOYMENT_LABEL[t]}
                variant={on ? 'matched' : 'default'}
                selected={on}
                onPress={onToggleType ? () => onToggleType(t) : undefined}
              />
            );
          })}
          {activeSet.size > 0 && onClear ? (
            <SkillTag label="Clear" variant="missing" onPress={onClear} />
          ) : null}
        </ScrollView>

        {typeof resultCount === 'number' ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {`${resultCount} result${resultCount === 1 ? '' : 's'}`}
          </Text>
        ) : null}
      </View>
    </View>
  );
}
