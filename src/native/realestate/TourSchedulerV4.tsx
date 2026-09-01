import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme, Button, EmptyState } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { TourSchedulerProps, TourSlot } from './TourScheduler';

/** Drop-in for {@link TourSchedulerProps} — same props, the V4 "listing" design. */
export type TourSchedulerV4Props = TourSchedulerProps;

/**
 * TourScheduler — **V4** "listing" design. The editorial take on the tour
 * scheduler: an elevated, rounded card with a date line, a grid (or list) of
 * soft-primary time-slot pills — the selected pill fills solid primary — sized
 * to a ≥44px tap target, plus a request/confirm button. Same props/behavior as
 * {@link TourSchedulerProps}: works controlled (`selectedId`) or uncontrolled;
 * the confirm button stays disabled until an available slot is chosen, then
 * fires `onSchedule` with it. Empty `slots` degrades to the shared `EmptyState`.
 * Selection is conveyed via `accessibilityState.selected`, not color alone.
 * Token-only colors via `useXenitionTheme()` + `withAlpha`.
 */
export function TourSchedulerV4({
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
}: TourSchedulerV4Props): React.ReactElement {
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
          backgroundColor: colors.card,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.md,
          shadowColor: colors.onSurface,
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 3,
        },
        style,
      ]}
    >
      <View style={{ gap: 2 }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
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
                minHeight: 44,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
                borderRadius: tokens.radius.md,
                borderWidth: 1,
                borderColor: isSelected ? colors.primary : withAlpha(colors.primary, 0.2),
                backgroundColor: isSelected ? colors.primary : withAlpha(colors.primary, 0.1),
                opacity: disabled ? 0.4 : 1,
                alignItems: 'center',
                justifyContent: 'center',
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
