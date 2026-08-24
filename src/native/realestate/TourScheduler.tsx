import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, Button, EmptyState } from '../primitives';

/** A bookable tour time slot. */
export interface TourSlot {
  /** Stable identifier. */
  id: string;
  /** Display label (e.g. "10:00 AM"). */
  label: string;
  /** Availability; defaults to `true`. Unavailable slots are disabled. */
  available?: boolean;
}

/** Presentation density for the {@link TourScheduler} slot grid. */
export type TourSchedulerVariant = 'grid' | 'list';

export interface TourSchedulerProps {
  /** Optional heading line above the slots. */
  title?: string;
  /** Human-readable date the slots belong to (e.g. "Sat, Aug 24"). */
  dateLabel?: string;
  /** Selectable time slots. Empty renders the shared `EmptyState`. */
  slots: TourSlot[];
  /** Controlled selected slot id; falls back to internal state. */
  selectedId?: string;
  /** Fires when a slot is tapped. */
  onSelectSlot?: (slot: TourSlot) => void;
  /** Fires when the confirm button is pressed with the chosen slot. */
  onSchedule?: (slot: TourSlot) => void;
  /** Confirm button label (default "Schedule tour"). */
  confirmLabel?: string;
  /** Layout of the slot chips. */
  variant?: TourSchedulerVariant;
  /** Disables the confirm button while a request is in flight. */
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * Tour request scheduler — a grid (or list) of selectable time slots plus a
 * confirm button. Works controlled (`selectedId`) or uncontrolled; the confirm
 * button stays disabled until an available slot is chosen, then fires
 * `onSchedule` with it. Presentational: slots in, callbacks out, nothing
 * fetches. Empty `slots` degrades to the shared `EmptyState`. Selection is
 * conveyed via `accessibilityState.selected`, not color alone. Token-only.
 */
export function TourScheduler({
  title = 'Schedule a tour',
  dateLabel,
  slots,
  selectedId,
  onSelectSlot,
  onSchedule,
  confirmLabel = 'Schedule tour',
  variant = 'grid',
  loading = false,
  style,
}: TourSchedulerProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const [internal, setInternal] = React.useState<string | undefined>(undefined);
  const active = selectedId ?? internal;

  const container = (children: React.ReactNode): React.ReactElement => (
    <View
      style={[
        {
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.md,
        },
        style,
      ]}
    >
      <View style={{ gap: 2 }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
          {title}
        </Text>
        {dateLabel ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{dateLabel}</Text>
        ) : null}
      </View>
      {children}
    </View>
  );

  if (slots.length === 0) {
    return container(
      <EmptyState title="No tour times available" description="Check back soon or request a custom time." />
    );
  }

  const selectedSlot = slots.find((s) => s.id === active);

  const handleSelect = (slot: TourSlot): void => {
    if (slot.available === false) return;
    setInternal(slot.id);
    onSelectSlot?.(slot);
  };

  return container(
    <>
      <View
        style={{
          flexDirection: variant === 'grid' ? 'row' : 'column',
          flexWrap: variant === 'grid' ? 'wrap' : 'nowrap',
          gap: tokens.spacing.sm,
        }}
      >
        {slots.map((slot) => {
          const disabled = slot.available === false;
          const isSelected = slot.id === active;
          return (
            <Pressable
              key={slot.id}
              accessibilityRole="button"
              accessibilityLabel={`${slot.label}${disabled ? ', unavailable' : isSelected ? ', selected' : ''}`}
              accessibilityState={{ selected: isSelected, disabled }}
              disabled={disabled}
              onPress={() => handleSelect(slot)}
              style={{
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
                borderRadius: tokens.radius.md,
                borderWidth: 1,
                borderColor: isSelected ? colors.primary : colors.border,
                backgroundColor: isSelected ? colors.primary : colors.surface,
                opacity: disabled ? 0.4 : 1,
                alignItems: 'center',
                minWidth: variant === 'grid' ? 88 : undefined,
              }}
            >
              <Text
                style={{
                  color: isSelected ? colors.onPrimary : colors.onSurface,
                  fontSize: tokens.typography.scale.sm,
                  fontWeight: '600',
                }}
              >
                {slot.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Button
        variant="primary"
        disabled={!selectedSlot}
        loading={loading}
        onPress={() => {
          if (selectedSlot) onSchedule?.(selectedSlot);
        }}
      >
        {confirmLabel}
      </Button>
    </>
  );
}
