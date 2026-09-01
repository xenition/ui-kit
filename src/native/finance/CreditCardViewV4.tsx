import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { appearanceStyle } from '../primitives/internal/appearance';
import { mixToken } from '../../primitives/internal/v4-depth';
import { ensureContrast } from '../../theme/color';
import { MIN_CONTRAST } from '../../theme/compile';
import { Gradient } from './internal/Gradient';
import { maskCardNumber } from './internal/mask';
import { TABULAR, spokenLine } from './internal/ledger-v4';
import type { CardBrand, CreditCardViewProps } from './CreditCardView';

export interface CreditCardViewV4Props extends CreditCardViewProps {
  /** Caption over the holder's name. Default `'Card holder'`. */
  holderLabel?: string;
  /** Caption over the expiry. Default `'Expires'`. */
  expiryLabel?: string;
  /** Override the network wording. Defaults to `VISA` / `Mastercard` / `AMEX` / `CARD`. */
  brandLabels?: Partial<Record<CardBrand, string>>;
}

const BRAND_LABEL: Record<CardBrand, string> = {
  visa: 'VISA',
  mastercard: 'Mastercard',
  amex: 'AMEX',
  generic: 'CARD',
};

/**
 * How far the second gradient stop travels toward the ink.
 *
 * A ratio, the way `BadgeV4`'s `SOFT_MIX` is: it says "a fifth of the way",
 * not "this colour". Small enough that the face still reads as one hue and
 * large enough that the two-stop diagonal survives — and because it moves the
 * ground *toward* the ink, the darker stop is the one the ink has to be
 * measured against, which is what happens below.
 */
const FACE_MIX = 0.2;

/** How much ink the chip carries. Enough to read as a contact plate. */
const CHIP_MIX = 0.35;

/**
 * The face's height, in `2xl` steps — `48 × 4`, where the base wrote
 * `minHeight: 190`. A card is one of the few things in a product with a real
 * physical proportion, so it is composed rather than measured and a re-scaled
 * seed re-scales it.
 */
const CARD_STEPS = 4;

/**
 * **V4 credit card face** — same props as {@link CreditCardView} plus
 * `holderLabel`, `expiryLabel` and `brandLabels`.
 *
 * ## Five changes
 *
 * 1. **The face is legible in every scheme.** `variant="dark"` painted itself
 *    from `tokens.ramps.neutral` — which the theme output copies to native
 *    **without** inverting — and inked it `colors.onSurface`, which *does*
 *    flip. So the fill stayed dark in both schemes while the ink went
 *    near-black in light: the number, the holder and the expiry sat at roughly
 *    1:1 on a light phone. Every face is now a token **pair** that carries a
 *    promise — `primary`/`onPrimary`, `accent`/`onAccent`, and for `dark` the
 *    inverse pair `onSurface`/`surface`, whose contrast is the same ratio read
 *    the other way round and which therefore flips *together*, staying
 *    opposite instead of converging. The second gradient stop is then
 *    re-measured with `ensureContrast`, so the promise is about the colour the
 *    card actually painted rather than about the token it started from.
 * 2. **The card is no longer `role="img"`.** That pruned the number, the
 *    holder and the expiry from the accessibility tree — the fallback for a
 *    face nobody could read was closed at the same time as the face. The card
 *    is one named group whose name *contains* what it shows.
 * 3. **The chip stops being `warn`.** A status colour spent on a decorative
 *    contact plate; it is now the face's own ink at a mix, and hidden from the
 *    reader, which is what a decoration is.
 * 4. **The caption hierarchy is real.** `opacity: 0.8` on an ink that equalled
 *    the value's own colour is a hierarchy of one step invented by hand, and
 *    it eats the contrast the pair guaranteed. Size and weight carry it
 *    instead, at full ink.
 * 5. **The face's proportions come off the scale** — `minHeight: 190`,
 *    `width: 40`, `height: 28` were three literals — and the number is
 *    tabular.
 *
 * **Renders nothing without a card number** (§4.5).
 */
export function CreditCardViewV4({
  holder,
  number,
  expiry,
  brand = 'generic',
  variant = 'primary',
  holderLabel = 'Card holder',
  expiryLabel = 'Expires',
  brandLabels,
  appearance = 'classic',
  style,
}: CreditCardViewV4Props): React.ReactElement | null {
  const { colors, tokens } = useXenitionTheme();
  if (!number) return null;

  // Optional frame around the gradient face (elevation / border). The face
  // itself is untouched; classic adds nothing.
  const surface = appearance === 'classic' ? undefined : appearanceStyle(appearance, colors, tokens);

  // A ground and its guaranteed pair. `dark` is the inverse pair rather than a
  // ramp step: contrast is symmetric, so `surface` on `onSurface` is as
  // readable as `onSurface` on `surface`, and the two move together in a way
  // that keeps them opposite instead of letting them converge.
  const face =
    variant === 'accent'
      ? { fill: colors.accent, ink: colors.onAccent }
      : variant === 'dark'
        ? { fill: colors.onSurface, ink: colors.surface }
        : { fill: colors.primary, ink: colors.onPrimary };

  // The far stop travels toward the ink, so it is the stop with the least
  // contrast and the one the ink is re-measured against.
  const far = mixToken(face.fill, face.ink, FACE_MIX);
  const ink = ensureContrast(face.ink, far, MIN_CONTRAST);

  const label = brandLabels?.[brand] ?? BRAND_LABEL[brand];
  const digits = number.replace(/\D+/g, '').slice(-4);

  return (
    <Gradient
      colors={[face.fill, far]}
      style={[
        surface,
        {
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          minHeight: tokens.spacing['2xl'] * CARD_STEPS,
          justifyContent: 'space-between',
        },
        style,
      ]}
    >
      {/*
        One named group holding what the face shows. The base put `role="img"`
        here, which is children-presentational: it announced "VISA card ending
        4242" and then suppressed the number, the holder and the expiry — so
        the card was unreadable to the eye and to the reader at the same time.
      */}
      <View
        accessible
        accessibilityLabel={spokenLine([
          label,
          digits,
          holderLabel,
          holder,
          expiry ? expiryLabel : null,
          expiry,
        ])}
        style={{ gap: tokens.spacing.lg }}
      >
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <View
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={{
              width: tokens.spacing.xl + tokens.spacing.sm,
              height: tokens.spacing.lg + tokens.spacing.xs,
              borderRadius: tokens.radius.sm,
              backgroundColor: mixToken(far, ink, CHIP_MIX),
            }}
          />
          <TextV4 size="base" weight="bold" style={{ color: ink }}>
            {label}
          </TextV4>
        </View>

        <TextV4
          size="xl"
          weight="semibold"
          numberOfLines={1}
          style={[{ color: ink }, TABULAR]}
        >
          {maskCardNumber(number)}
        </TextV4>

        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}
        >
          <View style={{ flex: 1, minWidth: 0 }}>
            {/*
              Hierarchy from size and weight, at full ink. The base dimmed the
              caption with `opacity: 0.8` on a colour that already equalled the
              value's — one invented step that cost contrast and bought a
              difference nobody could name.
            */}
            <TextV4 size="xs" style={{ color: ink }}>
              {holderLabel}
            </TextV4>
            <TextV4 size="sm" weight="semibold" numberOfLines={1} style={{ color: ink }}>
              {holder.toUpperCase()}
            </TextV4>
          </View>
          {expiry != null ? (
            <View>
              <TextV4 size="xs" style={{ color: ink }}>
                {expiryLabel}
              </TextV4>
              <TextV4 size="sm" weight="semibold" style={[{ color: ink }, TABULAR]}>
                {expiry}
              </TextV4>
            </View>
          ) : null}
        </View>
      </View>
    </Gradient>
  );
}
