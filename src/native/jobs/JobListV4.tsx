import * as React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { cardSurfaceStyle, skeletonBarStyle } from './internal/tone-v4';

export interface JobListV4Props {
  /** Heading above the list. Omitted by default. */
  title?: string;
  /** The rows — `JobCardV4`, `SavedJobRowV4`, `ApplicationRowV4`, … */
  children?: React.ReactNode;
  /** Draw placeholder cards instead of content. */
  loading?: boolean;
  /** How many placeholders a loading list draws. Default 3. */
  skeletonRows?: number;
  /** Render the list's own count. Default `'12 jobs'` / `'1 job'`. */
  formatCount?: (count: number) => string;
  /** Headline when nothing matched. Default `'No jobs found'`. */
  emptyLabel?: string;
  /** The next-step sentence under {@link JobListV4Props.emptyLabel}. */
  emptyDescription?: string;
  /** Announced while the placeholders are up. Default `'Loading jobs'`. */
  loadingLabel?: string;
  /** Test hook, matching the rest of the module. */
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/** An empty list still owes the reader a next step. */
const EMPTY_DESCRIPTION = 'Try removing a filter or widening your search.';

/**
 * **V4 job list** — a new component. There is no base to extend, so the props
 * are plain `JobListV4Props`.
 *
 * ## Why it exists
 *
 * Every component in this module is written as one item out of a list, and the
 * module never had the list. So the three things a results screen owes its
 * user had nowhere to live:
 *
 * 1. **An empty state that says something.** A job search that matches nothing
 *    is the most common outcome of a filter, and it currently renders a blank
 *    region — indistinguishable from a request that failed. `JobFilterBarV4`
 *    can announce `resultCount={0}`, but a count in a corner is not an answer;
 *    the space where the jobs would be is where the reader is looking.
 * 2. **A loading state in the shape it is about to be.** Placeholder cards the
 *    size of the real ones, opaque and mixed against the card's own ground —
 *    never a centred spinner that collapses the layout and then jumps when the
 *    jobs arrive. `JobCardV4` has its own skeleton for a single card; this is
 *    the set of them, so the page does not reflow twice.
 * 3. **The count, drawn once and said once.** It is drawn beside the heading
 *    for the sighted reader and hidden from the screen reader there, because
 *    the list below already carries it as its accessible name.
 *
 * The rows are children rather than a `data`/`renderItem` pair on purpose: the
 * kit is presentational, and a list that owned its own virtualisation would be
 * making a data decision for the app.
 */
export function JobListV4({
  title,
  children,
  loading = false,
  skeletonRows = 3,
  formatCount,
  emptyLabel = 'No jobs found',
  emptyDescription = EMPTY_DESCRIPTION,
  loadingLabel = 'Loading jobs',
  testID,
  style,
}: JobListV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { tokens } = theme;

  const rows = React.Children.toArray(children).filter(Boolean);
  const countText = (formatCount ?? ((n: number) => `${n} job${n === 1 ? '' : 's'}`))(rows.length);
  const tap = minTap(tokens.spacing);

  // A count over skeletons is a guess, and an empty list's own state already
  // says there is nothing there.
  const showCount = !loading && rows.length > 0;

  const header = title ? (
    <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
      <View accessible accessibilityRole="header" style={{ flexShrink: 1 }}>
        <TextV4 size="base" weight="bold" tone="onSurface" numberOfLines={1}>
          {title}
        </TextV4>
      </View>
      {showCount ? (
        <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
          <TextV4 size="xs" tone="mutedText" numeric="tabular">
            {countText}
          </TextV4>
        </View>
      ) : null}
    </View>
  ) : null;

  if (loading) {
    const placeholders = Math.max(1, Math.floor(Number.isFinite(skeletonRows) ? skeletonRows : 3));
    return (
      <View testID={testID} style={[{ gap: tokens.spacing.sm }, style]}>
        {header}
        <View
          accessible
          accessibilityLabel={loadingLabel}
          accessibilityLiveRegion="polite"
          style={{ gap: tokens.spacing.sm }}
        >
          {Array.from({ length: placeholders }, (_, i) => (
            <View key={i} style={cardSurfaceStyle(theme)}>
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}
              >
                <View style={skeletonBarStyle(theme, { width: tap, height: tap, round: true })} />
                <View style={{ flex: 1, gap: tokens.spacing.xs }}>
                  <View
                    style={skeletonBarStyle(theme, {
                      width: '70%',
                      height: tokens.typography.scale.base,
                    })}
                  />
                  <View
                    style={skeletonBarStyle(theme, {
                      width: '45%',
                      height: tokens.typography.scale.sm,
                    })}
                  />
                </View>
              </View>
              {/* The chip row and the pay line the card is about to grow, so
                  the layout does not jump when the real content arrives. */}
              <View style={{ flexDirection: 'row', gap: tokens.spacing.xs }}>
                <View
                  style={skeletonBarStyle(theme, { width: '30%', height: tokens.spacing.lg })}
                />
                <View
                  style={skeletonBarStyle(theme, { width: '25%', height: tokens.spacing.lg })}
                />
              </View>
              <View
                style={skeletonBarStyle(theme, {
                  width: '55%',
                  height: tokens.typography.scale.sm,
                })}
              />
            </View>
          ))}
        </View>
      </View>
    );
  }

  if (rows.length === 0) {
    return (
      <View testID={testID} style={[{ gap: tokens.spacing.sm }, style]}>
        {header}
        <EmptyStateV4 title={emptyLabel} description={emptyDescription} />
      </View>
    );
  }

  return (
    <View testID={testID} style={[{ gap: tokens.spacing.sm }, style]}>
      {header}
      <View
        accessibilityRole="list"
        accessibilityLabel={countText}
        style={{ gap: tokens.spacing.sm }}
      >
        {rows}
      </View>
    </View>
  );
}
