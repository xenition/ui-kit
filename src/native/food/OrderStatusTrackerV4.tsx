import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { onPair, spokenLine, stageIndex, toneFill, type ToneV4 } from './internal/menu-v4';
import type { OrderStage, OrderStatusTrackerProps } from './OrderStatusTracker';

export interface OrderStatusTrackerV4Props extends OrderStatusTrackerProps {
  /**
   * Override the per-stage labels. Wins over `labels`, which the base already
   * had; both are honoured so an existing caller keeps working.
   */
  stageLabels?: Partial<Record<OrderStage, string>>;
  /** Shown when `status` is not a stage this component knows. Default `'Order status unavailable'`. */
  unknownLabel?: string;
}

/** Per-stage completion relative to the current stage. */
type StepState = 'complete' | 'current' | 'upcoming';

const ORDER: readonly OrderStage[] = ['placed', 'preparing', 'out-for-delivery', 'delivered'];

const DEFAULT_LABELS: Record<OrderStage, string> = {
  placed: 'Order placed',
  preparing: 'Preparing',
  'out-for-delivery': 'Out for delivery',
  delivered: 'Delivered',
};

/** Announced words per state — status must never be carried by colour alone. */
const STATE_WORD: Record<StepState, string> = {
  complete: 'completed',
  current: 'in progress',
  upcoming: 'upcoming',
};

/**
 * **V4 order status tracker** — same props as {@link OrderStatusTracker} plus
 * `stageLabels` and `unknownLabel`.
 *
 * ## Five changes
 *
 * 1. **The stages can be read again.** The root was
 *    `accessibilityRole="progressbar"`, which is children-presentational — so
 *    every stage label, every timestamp and every per-step state word inside
 *    it was pruned, and with no name of its own the whole component announced
 *    an unattributed "1 of 4". The value now sits on an element that contains
 *    nothing, and the steps are read.
 * 2. **An unknown status says so.** `Math.max(0, indexOf(status))` mapped a
 *    miss onto stage 1, so a typo or a stage the backend added rendered a
 *    confident, wrong "Order placed, in progress". `stageIndex()` returns
 *    `undefined` and this renders `unknownLabel`.
 * 3. **A cancelled order does not report as progressing.** It counted up like
 *    any other order while one step wore a ✕. There is no progress value at
 *    all when an order is cancelled — the summary says what happened instead.
 * 4. **Markers and rails are hidden from the reader.** They are ✓ / ● / ○
 *    glyphs and 2px rules that restate the step's own state word, so they were
 *    reader stops that said nothing.
 * 5. **Timestamps are tabular and inked `mutedText`**, not the promise-free
 *    `muted` ramp step.
 */
export function OrderStatusTrackerV4({
  status,
  variant = 'horizontal',
  labels,
  stageLabels,
  timestamps,
  cancelled = false,
  unknownLabel = 'Order status unavailable',
  style,
}: OrderStatusTrackerV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const vertical = variant === 'vertical';

  const currentIndex = stageIndex(status);

  // Change 2: a status we do not recognise gets a sentence, not stage 1.
  if (currentIndex === undefined) {
    return (
      <View accessible accessibilityRole="text" accessibilityLabel={unknownLabel} style={style}>
        <TextV4 size="sm" tone="mutedText">
          {unknownLabel}
        </TextV4>
      </View>
    );
  }

  const labelOf = (stage: OrderStage): string =>
    stageLabels?.[stage] ?? labels?.[stage] ?? DEFAULT_LABELS[stage];

  const stepState = (index: number): StepState => {
    if (index < currentIndex) return 'complete';
    if (index === currentIndex) return 'current';
    return 'upcoming';
  };

  const markerTone = (state: StepState, failed: boolean): ToneV4 | null => {
    if (failed) return 'danger';
    if (state === 'complete') return 'success';
    if (state === 'current') return 'primary';
    return null;
  };

  const currentStage = ORDER[currentIndex] ?? ORDER[0];
  const summary = spokenLine([
    currentStage != null ? labelOf(currentStage) : null,
    cancelled ? 'cancelled' : `step ${currentIndex + 1} of ${ORDER.length}`,
  ]);

  return (
    <View
      style={[
        {
          flexDirection: vertical ? 'column' : 'row',
          alignItems: vertical ? 'stretch' : 'flex-start',
        },
        style,
      ]}
    >
      {/* Change 1 and 3: the meter is an element with a name, a value and NO
          children, so exposing it costs nothing that was inside it. A cancelled
          order has no progress to report, so it gets a plain summary instead. */}
      <View
        accessible
        accessibilityRole={cancelled ? 'text' : 'progressbar'}
        accessibilityLabel={summary}
        accessibilityValue={
          cancelled ? undefined : { min: 1, max: ORDER.length, now: currentIndex + 1 }
        }
        style={{
          position: 'absolute',
          top: 0,
          start: 0,
          width: '100%',
          height: tokens.spacing.xs,
        }}
      />

      {ORDER.map((stage, index) => {
        const state = stepState(index);
        const failed = cancelled && state === 'current';
        const tone = markerTone(state, failed);
        const label = labelOf(stage);
        const time = timestamps?.[stage];
        const glyph = failed ? '✕' : state === 'complete' ? '✓' : state === 'current' ? '●' : '○';
        const stateWord = failed ? 'cancelled' : STATE_WORD[state];
        const isLast = index === ORDER.length - 1;

        const marker = (
          <View
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={{
              width: tokens.spacing.xl,
              height: tokens.spacing.xl,
              borderRadius: tokens.radius.full,
              borderWidth: 2,
              borderColor: tone ? toneFill(theme, tone) : colors.border,
              backgroundColor: tone ? toneFill(theme, tone) : colors.card,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconV4
              glyph={glyph}
              size="xs"
              style={{ color: tone ? onPair(theme, tone) : colors.mutedText }}
            />
          </View>
        );

        const textBlock = (
          <View style={{ gap: tokens.spacing.xs / 2 }}>
            <TextV4
              size="xs"
              weight={state === 'current' ? 'bold' : 'medium'}
              tone={state === 'upcoming' ? 'mutedText' : 'onSurface'}
              align={vertical ? 'left' : 'center'}
            >
              {label}
            </TextV4>
            {time ? (
              <TextV4
                size="xs"
                tone="mutedText"
                numeric="tabular"
                align={vertical ? 'left' : 'center'}
              >
                {time}
              </TextV4>
            ) : null}
          </View>
        );

        // A track segment is "filled" once the step it leads into is reached.
        const leftFilled = index <= currentIndex;
        const rightFilled = index < currentIndex;
        const rail = (filled: boolean): string => (filled ? colors.success : colors.border);

        if (vertical) {
          return (
            <View
              key={stage}
              accessible
              accessibilityLabel={spokenLine([label, stateWord, time])}
              style={{ flexDirection: 'row', gap: tokens.spacing.sm }}
            >
              <View
                accessibilityElementsHidden
                importantForAccessibility="no-hide-descendants"
                style={{ alignItems: 'center' }}
              >
                {marker}
                {!isLast ? (
                  <View
                    style={{
                      width: 2,
                      flex: 1,
                      minHeight: tokens.spacing.lg,
                      backgroundColor: rail(rightFilled),
                    }}
                  />
                ) : null}
              </View>
              <View style={{ flex: 1, paddingBottom: isLast ? 0 : tokens.spacing.lg }}>
                {textBlock}
              </View>
            </View>
          );
        }

        return (
          <View
            key={stage}
            accessible
            accessibilityLabel={spokenLine([label, stateWord, time])}
            style={{ flex: 1, alignItems: 'center' }}
          >
            <View
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
              style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}
            >
              <View
                style={{
                  height: 2,
                  flex: 1,
                  backgroundColor: index === 0 ? 'transparent' : rail(leftFilled),
                }}
              />
              {marker}
              <View
                style={{
                  height: 2,
                  flex: 1,
                  backgroundColor: isLast ? 'transparent' : rail(rightFilled),
                }}
              />
            </View>
            <View style={{ marginTop: tokens.spacing.xs }}>{textBlock}</View>
          </View>
        );
      })}
    </View>
  );
}
