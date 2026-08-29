import * as React from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Text } from './Text';

export interface StepListItem {
  /** Stable key for list rendering. Falls back to the index. */
  id?: string;
  /** The instruction headline — `'Sear the onions'`. */
  title: React.ReactNode;
  /**
   * The instruction itself — the paragraph the number is numbering. This is
   * the half `Steps` has nowhere to put; here it is the point of the component.
   */
  description?: React.ReactNode;
  /**
   * Force this step complete regardless of `current`. For checklists that are
   * not strictly linear (a setup guide where two boxes are already ticked).
   */
  done?: boolean;
}

export interface StepListProps {
  steps: StepListItem[];
  /**
   * Zero-based index of the step in progress; everything before it reads as
   * done. Omit entirely for a plain numbered instruction list with no state —
   * a recipe method is not a wizard.
   */
  current?: number;
  /** Fires with the index when a step is pressed. Rows are inert without it. */
  onStepPress?: (index: number) => void;
  /** Draw the rail joining the markers. Default `true`. */
  connector?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * Vertical, content-bearing instruction list — a recipe method, an onboarding
 * checklist body, a setup guide. Numbered markers down the left, joined by a
 * rail, each carrying a title and as much body copy as the step needs.
 *
 * **Not to be confused with its sibling {@link Steps}, and the difference is
 * the whole reason this exists.** `Steps` is a *progress indicator*: one
 * `flex: 1` marker per step laid out horizontally, correct for a 3-step
 * checkout where the titles are one word each. Hand it eight recipe steps and
 * every title collapses to nothing — a real app hit exactly that and ended up
 * rendering its method as `ListRow`s beside a title-less `Steps`.
 *
 * So: **`Steps` for "where am I in this flow", `StepList` for "here are the
 * instructions".** `StepList` grows downward, so it reads the same at eight
 * items as at three, and it is the only one of the two with room for a body.
 *
 * Every color, size and space comes from the compiled tokens. No literal
 * colors.
 */
export function StepList({
  steps,
  current,
  onStepPress,
  connector = true,
  style,
}: StepListProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  // Marker geometry. `md` spacing keeps the rail proportional to the theme's
  // rhythm instead of pinning it to a magic 32.
  const markerSize = tokens.spacing.md * 2;

  return (
    <View style={[{ flexDirection: 'column' }, style]}>
      {steps.map((step, i) => {
        const last = i === steps.length - 1;
        // `current` is optional: with no current step nothing is "done" and
        // nothing is "active" — it renders as a plain numbered list.
        const done = step.done === true || (current != null && i < current);
        const active = step.done !== true && current != null && i === current;

        const markerBg = done ? colors.primary : 'transparent';
        const markerBorder = active ? colors.primary : colors.border;
        const numberTone = done ? 'onPrimary' : active ? 'primaryText' : 'muted';

        const row = (
          <View
            style={{
              flexDirection: 'row',
              gap: tokens.spacing.md,
              paddingBottom: last ? 0 : tokens.spacing.lg,
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <View
                style={{
                  width: markerSize,
                  height: markerSize,
                  borderRadius: tokens.radius.full,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: markerBg,
                  borderWidth: done ? 0 : 2,
                  borderColor: markerBorder,
                }}
              >
                <Text size="xs" weight="semibold" tone={numberTone}>
                  {done ? '✓' : String(i + 1)}
                </Text>
              </View>
              {/*
                The rail is what makes eight steps read as one sequence rather
                than eight cards. It stops at the last marker so the list does
                not trail off into nothing.
              */}
              {connector && !last ? (
                <View
                  style={{
                    width: 1,
                    flex: 1,
                    marginTop: tokens.spacing.xs,
                    backgroundColor: colors.border,
                  }}
                />
              ) : null}
            </View>

            <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs, paddingTop: tokens.spacing.xs }}>
              {/*
                The title stays `onSurface` even for a step you have not
                reached — unlike `Steps`, which mutes upcoming titles because
                they are labels on a progress bar. Here they are instructions,
                and an instruction you are about to follow has to be readable.
              */}
              {typeof step.title === 'string' ? (
                <Text size="base" weight={active ? 'semibold' : 'medium'} tone="onSurface">
                  {step.title}
                </Text>
              ) : (
                step.title
              )}
              {step.description != null ? (
                typeof step.description === 'string' ? (
                  <Text size="sm" tone="muted">
                    {step.description}
                  </Text>
                ) : (
                  step.description
                )
              ) : null}
            </View>
          </View>
        );

        const key = step.id ?? String(i);
        return onStepPress ? (
          <Pressable
            key={key}
            accessibilityRole="button"
            accessibilityState={{ checked: done }}
            onPress={() => onStepPress(i)}
          >
            {row}
          </Pressable>
        ) : (
          <View key={key}>{row}</View>
        );
      })}
    </View>
  );
}
