import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives/Icon';

/** The four fulfilment stages, in order. */
export type OrderStage = 'placed' | 'preparing' | 'out-for-delivery' | 'delivered';

export type OrderStatusTrackerVariant = 'horizontal' | 'vertical';

/** Per-stage completion relative to the current stage. */
type StepState = 'complete' | 'current' | 'upcoming';

export interface OrderStatusTrackerProps {
  /** The stage the order is currently in. */
  status: OrderStage;
  /** Layout orientation (default `horizontal`). */
  variant?: OrderStatusTrackerVariant;
  /** Override the default per-stage labels. */
  labels?: Partial<Record<OrderStage, string>>;
  /** Optional per-stage timestamp/subtext (e.g. "12:04 PM"). */
  timestamps?: Partial<Record<OrderStage, string>>;
  /** Marks the order cancelled — the current step reads as failed. */
  cancelled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const ORDER: readonly OrderStage[] = ['placed', 'preparing', 'out-for-delivery', 'delivered'];

const DEFAULT_LABELS: Record<OrderStage, string> = {
  placed: 'Order placed',
  preparing: 'Preparing',
  'out-for-delivery': 'Out for delivery',
  delivered: 'Delivered',
};

/** Announced words per state — a11y must not rely on color alone. */
const STATE_WORD: Record<StepState, string> = {
  complete: 'completed',
  current: 'in progress',
  upcoming: 'upcoming',
};

/**
 * A four-stage delivery progress tracker: placed → preparing → out for delivery
 * → delivered. Completed steps show a check glyph, the current step a filled
 * dot, upcoming steps a hollow ring — and every step is *also* announced with
 * its state word ("completed" / "in progress" / "upcoming") so status is never
 * conveyed by color alone. `variant` switches horizontal vs. vertical. When
 * `cancelled`, the current step reads as failed. Token-only.
 */
export function OrderStatusTracker({
  status,
  variant = 'horizontal',
  labels,
  timestamps,
  cancelled = false,
  style,
}: OrderStatusTrackerProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const currentIndex = Math.max(0, ORDER.indexOf(status));
  const vertical = variant === 'vertical';

  const stepState = (index: number): StepState => {
    if (index < currentIndex) return 'complete';
    if (index === currentIndex) return 'current';
    return 'upcoming';
  };

  const markerColors = (
    state: StepState,
    failed: boolean
  ): { bg: string; fg: string; border: string } => {
    if (failed) return { bg: colors.danger, fg: colors.onDanger, border: colors.danger };
    if (state === 'complete') return { bg: colors.success, fg: colors.onSuccess, border: colors.success };
    if (state === 'current') return { bg: colors.primary, fg: colors.onPrimary, border: colors.primary };
    return { bg: colors.surface, fg: colors.muted, border: colors.border };
  };

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 1, max: ORDER.length, now: currentIndex + 1 }}
      style={[
        {
          flexDirection: vertical ? 'column' : 'row',
          alignItems: vertical ? 'stretch' : 'flex-start',
        },
        style,
      ]}
    >
      {ORDER.map((stage, index) => {
        const state = stepState(index);
        const failed = cancelled && state === 'current';
        const { bg, fg, border } = markerColors(state, failed);
        const label = labels?.[stage] ?? DEFAULT_LABELS[stage];
        const time = timestamps?.[stage];
        const glyph = failed ? '✕' : state === 'complete' ? '✓' : state === 'current' ? '●' : '○';
        const stateWord = failed ? 'cancelled' : STATE_WORD[state];
        const isLast = index === ORDER.length - 1;

        const marker = (
          <View
            style={{
              width: 28,
              height: 28,
              borderRadius: tokens.radius.full,
              borderWidth: 2,
              borderColor: border,
              backgroundColor: bg,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon glyph={glyph} size="xs" style={{ color: fg }} />
          </View>
        );

        const textBlock = (
          <View style={{ gap: 2 }}>
            <Text
              style={{
                color: state === 'upcoming' ? colors.muted : colors.onSurface,
                fontSize: tokens.typography.scale.xs,
                fontWeight: state === 'current' ? '700' : '500',
                textAlign: vertical ? 'left' : 'center',
              }}
            >
              {label}
            </Text>
            {time ? (
              <Text
                style={{
                  color: colors.muted,
                  fontSize: tokens.typography.scale.xs,
                  textAlign: vertical ? 'left' : 'center',
                }}
              >
                {time}
              </Text>
            ) : null}
          </View>
        );

        // A track segment is "filled" once the step it leads into is reached.
        const leftFilled = index <= currentIndex;
        const rightFilled = index < currentIndex;

        if (vertical) {
          return (
            <View
              key={stage}
              accessibilityLabel={`${label}: ${stateWord}${time ? `, ${time}` : ''}`}
              style={{ flexDirection: 'row', gap: tokens.spacing.sm }}
            >
              <View style={{ alignItems: 'center' }}>
                {marker}
                {!isLast ? (
                  <View
                    style={{
                      width: 2,
                      flex: 1,
                      minHeight: tokens.spacing.lg,
                      backgroundColor: rightFilled ? colors.success : colors.border,
                    }}
                  />
                ) : null}
              </View>
              <View style={{ flex: 1, paddingBottom: isLast ? 0 : tokens.spacing.lg }}>{textBlock}</View>
            </View>
          );
        }

        return (
          <View
            key={stage}
            accessibilityLabel={`${label}: ${stateWord}${time ? `, ${time}` : ''}`}
            style={{ flex: 1, alignItems: 'center' }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
              <View
                style={{
                  height: 2,
                  flex: 1,
                  backgroundColor: index === 0 ? 'transparent' : leftFilled ? colors.success : colors.border,
                }}
              />
              {marker}
              <View
                style={{
                  height: 2,
                  flex: 1,
                  backgroundColor: isLast ? 'transparent' : rightFilled ? colors.success : colors.border,
                }}
              />
            </View>
            <View style={{ marginTop: tokens.spacing.xs, paddingHorizontal: 2 }}>{textBlock}</View>
          </View>
        );
      })}
    </View>
  );
}
