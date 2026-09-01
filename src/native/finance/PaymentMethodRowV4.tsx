import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { appearanceStyle } from '../primitives/internal/appearance';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { metaLine } from '../primitives/internal/tone-v4';
import { maskAccountNumber } from './internal/mask';
import { BADGE_V4, IDENTITY_TONE, spokenLine } from './internal/ledger-v4';
import type { CardBrand } from './CreditCardView';
import type { PaymentMethodKind, PaymentMethodRowProps } from './PaymentMethodRow';

export interface PaymentMethodRowV4Props extends PaymentMethodRowProps {
  /** Wording for the "this is the default method" chip. Default `'Default'`. */
  defaultLabel?: string;
  /** Override the network wording. Defaults to `Visa` / `Mastercard` / `Amex` / `Card`. */
  brandLabels?: Partial<Record<CardBrand, string>>;
}

const KIND_GLYPH: Record<PaymentMethodKind, string> = {
  card: '💳',
  bank: '🏦',
  wallet: '👛',
};

/**
 * A network is **identity**, so it is carried by a word rather than by a
 * colour. `generic` contributes nothing — "Card" beside a card glyph is noise.
 */
const BRAND_LABEL: Record<CardBrand, string> = {
  visa: 'Visa',
  mastercard: 'Mastercard',
  amex: 'Amex',
  generic: '',
};

/**
 * **V4 payment method row** — same props as {@link PaymentMethodRow} plus
 * `defaultLabel` and `brandLabels`.
 *
 * ## Five changes
 *
 * 1. **`brand` is rendered.** It was accepted, documented as driving the
 *    glyph, and destructured into `_brand` — read by nothing — so a Visa row
 *    and an Amex row were the same 💳 and the only way to tell them apart was
 *    whatever the caller happened to put in `label`. The network is now a word
 *    on the supporting line and in the row's spoken name.
 * 2. **It masks with the module's own masker.** `` `•• ${last4}` `` was string
 *    concatenation two files away from `maskAccountNumber`, which also has an
 *    answer for a `last4` that is not four digits — the concatenation printed
 *    `•• 42` for one.
 * 3. **The radio reports `checked`, not `selected`.** A radio's state *is*
 *    checkedness; `selected` on `accessibilityRole="radio"` announces the
 *    wrong thing, and the check glyph beside it was the only other cue.
 * 4. **"Default" stops being `success`.** Being the default payment method is
 *    identity, not health, and the green sat beside amounts whose green means
 *    income.
 * 5. **Press is a state layer** rather than `opacity: 0.85`, the row clears
 *    44, and the supporting line takes `mutedText`.
 *
 * **Renders nothing without a `label`** (§4.5).
 */
export function PaymentMethodRowV4({
  label,
  kind = 'card',
  brand,
  last4,
  expiry,
  icon,
  isDefault = false,
  selected = false,
  defaultLabel = 'Default',
  brandLabels,
  onPress,
  appearance = 'classic',
  style,
}: PaymentMethodRowV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!label) return null;

  const brandLabel =
    kind === 'card' && brand != null ? (brandLabels?.[brand] ?? BRAND_LABEL[brand]) : '';
  const masked = last4 != null ? maskAccountNumber(last4) : null;
  const sub = metaLine([brandLabel, masked, expiry != null ? `exp ${expiry}` : null]);

  // Appearance surface FIRST; layout AFTER. In every appearance the `selected`
  // ring wins as an overlaid border.
  const surface =
    appearance === 'classic'
      ? {
          borderWidth: 1,
          borderColor: selected ? colors.primary : colors.border,
          backgroundColor: colors.surface,
        }
      : appearanceStyle(appearance, colors, tokens);

  const name = spokenLine([label, brandLabel, masked, expiry, isDefault ? defaultLabel : null]);

  const body = (pressed: boolean): React.ReactElement => (
    <View
      style={[
        surface,
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          padding: tokens.spacing.md,
          minHeight: minTap(tokens.spacing),
          borderRadius: tokens.radius.md,
        },
        pressed ? { backgroundColor: pressOver(theme, colors.surface, colors.onSurface) } : null,
        selected && appearance !== 'classic'
          ? { borderWidth: 1, borderColor: colors.primary }
          : null,
        style,
      ]}
    >
      <IconV4
        glyph={icon ?? KIND_GLYPH[kind]}
        color={selected ? 'primaryText' : 'onSurface'}
        size="xl"
      />
      <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <TextV4
            size="base"
            weight="semibold"
            tone="onSurface"
            numberOfLines={1}
            style={{ flexShrink: 1 }}
          >
            {label}
          </TextV4>
          {isDefault ? (
            <BadgeV4 tone={IDENTITY_TONE} {...BADGE_V4}>
              {defaultLabel}
            </BadgeV4>
          ) : null}
        </View>
        {sub !== '' ? (
          <TextV4 size="xs" tone="mutedText" numeric="tabular" numberOfLines={1}>
            {sub}
          </TextV4>
        ) : null}
      </View>
      {/* No label: the state is announced by `checked`, so the glyph is the
          sighted half of the same message and `Icon` hides an unlabelled one. */}
      {selected ? <IconV4 glyph="✓" color="primaryText" size="lg" /> : null}
    </View>
  );

  if (!onPress) {
    return (
      <View accessible accessibilityLabel={name}>
        {body(false)}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="radio"
      // `checked`, not `selected`: a radio's state is its checkedness, and the
      // check glyph was carrying the whole message on its own.
      accessibilityState={{ checked: selected }}
      accessibilityLabel={name}
      onPress={onPress}
      style={{ borderRadius: tokens.radius.md }}
    >
      {({ pressed }) => body(pressed)}
    </Pressable>
  );
}
