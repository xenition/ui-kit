import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AuthStickyFooterV4 } from '../primitives/AuthStickyFooterV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { TextV4 } from '../primitives/TextV4';
import { formatMoney as defaultFormatMoney } from '../commerce/money';
import { metaLine } from './internal/salon-v4';
import type { SalonBookingBarProps } from './SalonBookingBar';

export interface SalonBookingBarV4Props extends SalonBookingBarProps {
  /**
   * Pay the bottom safe-area inset. Default `true`.
   *
   * The reason this component needed the pass most: it is a **pinned bottom
   * bar** and it read no inset at all, so on a notched phone the one button
   * that takes the money sat under the home indicator.
   */
  safeArea?: boolean;
}

/**
 * **V4 salon booking bar** — same props as {@link SalonBookingBar} plus
 * `safeArea`.
 *
 * ## Four changes
 *
 * 1. **It clears the home indicator.** Built on `AuthStickyFooterV4`, which
 *    pays `insets.bottom` — the same band every other pinned CTA in the kit
 *    uses. The base drew its own bar and read no inset.
 * 2. **The price stops being `colors.primary` at `fontWeight: '800'`.** A fill
 *    slot used as ink, at a weight the scale does not have. It is now
 *    `onSurface` in the display face, which is what a total should be.
 * 3. **The CTA is the §5 shape** — full width, `radius.full`, and the one
 *    loud thing in the band.
 * 4. **The empty state is the bar's own copy**, announced, rather than a
 *    disabled button with nothing beside it.
 *
 * Composition note: this is a *band*, so it renders even with no selection —
 * that is the point of it. The empty case is copy, not absence.
 */
export function SalonBookingBarV4({
  serviceName,
  totalCents,
  currency = 'USD',
  detail,
  formatMoney = defaultFormatMoney,
  ctaLabel = 'Book now',
  disabled = false,
  loading = false,
  emptyLabel = 'Select a service to book',
  safeArea = true,
  onBook,
  style,
}: SalonBookingBarV4Props): React.ReactElement {
  const { tokens } = useXenitionTheme();

  const hasSelection = Boolean(serviceName);
  const price =
    typeof totalCents === 'number' && Number.isFinite(totalCents)
      ? formatMoney(totalCents, currency)
      : null;
  const blocked = disabled || loading || !hasSelection;

  return (
    <AuthStickyFooterV4 safeArea={safeArea} style={style}>
      <View
        accessible
        accessibilityLabel={
          hasSelection ? metaLine([serviceName, price, detail]) : emptyLabel
        }
        style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}
      >
        <View style={{ flex: 1, gap: tokens.spacing.xs / 2 }}>
          {hasSelection ? (
            <>
              <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.sm }}>
                <TextV4
                  face="heading"
                  size="base"
                  weight="bold"
                  tone="onSurface"
                  numberOfLines={1}
                  style={{ flexShrink: 1 }}
                >
                  {serviceName}
                </TextV4>
                {price ? (
                  <TextV4
                    face="heading"
                    size="base"
                    weight="bold"
                    tone="onSurface"
                    numeric="tabular"
                  >
                    {price}
                  </TextV4>
                ) : null}
              </View>
              {detail ? (
                <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
                  {detail}
                </TextV4>
              ) : null}
            </>
          ) : (
            <TextV4 size="sm" tone="mutedText">
              {emptyLabel}
            </TextV4>
          )}
        </View>

        <ButtonV4
          variant="primary"
          size="md"
          disabled={blocked}
          loading={loading}
          onPress={onBook}
          accessibilityLabel={ctaLabel}
          style={{ borderRadius: tokens.radius.full }}
        >
          {ctaLabel}
        </ButtonV4>
      </View>
    </AuthStickyFooterV4>
  );
}
