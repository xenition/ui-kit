import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { toNativeTokens } from '../../theme/outputs';
import { formatMoney } from './money';
import { CartLineItemV4 } from './CartLineItemV4';

/** Flatten an RN style prop (array / nested arrays / objects) into one object. */
function flat(style: unknown): Record<string, unknown> {
  const merged: Record<string, unknown> = {};
  const walk = (s: unknown): void => {
    if (!s) return;
    if (Array.isArray(s)) {
      s.forEach(walk);
      return;
    }
    if (typeof s === 'object') Object.assign(merged, s as Record<string, unknown>);
  };
  walk(style);
  return merged;
}

const theme = compileTheme(SEED_LIGHT);
const tokens = toNativeTokens(theme);
const TAP = tokens.spacing['2xl'] - tokens.spacing.xs; // 44
const TWO_LINE = tokens.spacing['2xl'] + tokens.spacing.lg; // 72

describe('CartLineItemV4 (native)', () => {
  it('composes PriceTagV4 for the line total rather than drawing one — §1.7', () => {
    const { getByText } = renderThemed(
      <CartLineItemV4 title="Ceramic Mug" quantity={3} unitPriceCents={2400} />,
      SEED_LIGHT
    );
    const price = getByText(formatMoney(7200));
    // PriceTagV4's signature: the display face, bold, tabular.
    expect(flat(price.props.style).fontFamily).toBe(theme.typography.fontHeading);
    expect(flat(price.props.style).fontVariant).toEqual(['tabular-nums']);
  });

  it('composes QuantityStepperV4, never the base stepper', () => {
    const onQuantityChange = jest.fn();
    const { getByTestId } = renderThemed(
      <CartLineItemV4
        title="Ceramic Mug"
        quantity={2}
        unitPriceCents={2400}
        onQuantityChange={onQuantityChange}
      />,
      SEED_LIGHT
    );
    // The V4 stepper's own testIDs; the base stepper carries none.
    fireEvent.press(getByTestId('xen-quantity-increment'));
    expect(onQuantityChange).toHaveBeenCalledWith(3);
    expect(flat(getByTestId('xen-quantity-stepper').props.style).backgroundColor).toBe(
      theme.light.card
    );
  });

  it('labels the stepper with the product it belongs to', () => {
    const { getByTestId } = renderThemed(
      <CartLineItemV4
        title="Ceramic Mug"
        quantity={2}
        unitPriceCents={2400}
        onQuantityChange={() => undefined}
      />,
      SEED_LIGHT
    );
    expect(getByTestId('xen-quantity-stepper').props.accessibilityLabel).toBe(
      'Quantity for Ceramic Mug'
    );
  });

  it('NEW: compareAtUnitPriceCents strikes the original, scaled by quantity', () => {
    const { getByText } = renderThemed(
      <CartLineItemV4
        title="Ceramic Mug"
        quantity={2}
        unitPriceCents={1400}
        compareAtUnitPriceCents={2000}
      />,
      SEED_LIGHT
    );
    const struck = getByText(formatMoney(4000));
    expect(struck.props.accessibilityLabel).toBe(`Was ${formatMoney(4000)}`);
    expect(flat(struck.props.style).textDecorationLine).toBe('line-through');
    expect(getByText(formatMoney(2800))).toBeTruthy();
  });

  it('a discounted line does not turn red — §1.3', () => {
    const { getByText } = renderThemed(
      <CartLineItemV4
        title="Ceramic Mug"
        quantity={1}
        unitPriceCents={1400}
        compareAtUnitPriceCents={2000}
      />,
      SEED_LIGHT
    );
    const colour = flat(getByText(formatMoney(1400)).props.style).color;
    expect(colour).toBe(theme.light.onSurface);
    expect(colour).not.toBe(theme.light.danger);
    expect(colour).not.toBe(theme.light.dangerText);
  });

  it('ignores a compare-at that is not actually higher', () => {
    const { queryAllByText } = renderThemed(
      <CartLineItemV4
        title="Mug"
        quantity={1}
        unitPriceCents={2000}
        compareAtUnitPriceCents={2000}
      />,
      SEED_LIGHT
    );
    expect(queryAllByText(formatMoney(2000))).toHaveLength(1);
  });

  it('takes the row metric — two-line height, md gutters, a 44 leading slot', () => {
    const { getByTestId } = renderThemed(
      <CartLineItemV4
        title="Ceramic Mug"
        variantTitle="Large"
        quantity={1}
        unitPriceCents={100}
      />,
      SEED_LIGHT
    );
    const s = flat(getByTestId('xen-cart-line-item').props.style);
    expect(s.minHeight).toBe(TWO_LINE);
    expect(s.paddingHorizontal).toBe(tokens.spacing.md);
    expect(s.gap).toBe(tokens.spacing.md);
    // The row is transparent — the container owns the card (§4.3).
    expect(s.backgroundColor).toBe('transparent');
  });

  it('draws the leading slot at the family 44, not the base 64', () => {
    const { getByTestId } = renderThemed(
      <CartLineItemV4 title="Mug" quantity={1} unitPriceCents={100} />,
      SEED_LIGHT
    );
    const rowNode = getByTestId('xen-cart-line-item');
    const thumb = flat(rowNode.children.find((c) => typeof c !== 'string')?.props?.style);
    expect(thumb.width).toBe(TAP);
    expect(thumb.height).toBe(TAP);
    expect(thumb.width).not.toBe(64);
  });

  it('renders the image when given one, and the seeded cover otherwise', () => {
    const withImage = renderThemed(
      <CartLineItemV4
        title="Mug"
        quantity={1}
        unitPriceCents={100}
        imageUrl="https://example.test/mug.png"
        imageAlt="A mug"
      />,
      SEED_LIGHT
    );
    expect(withImage.getByLabelText('A mug')).toBeTruthy();

    const withCover = renderThemed(
      <CartLineItemV4 title="Mug" quantity={1} unitPriceCents={100} slug="mug" />,
      SEED_LIGHT
    );
    expect(withCover.queryByLabelText('A mug')).toBeNull();
  });

  it('falls back to the title for the image label', () => {
    const { getByLabelText } = renderThemed(
      <CartLineItemV4
        title="Ceramic Mug"
        quantity={1}
        unitPriceCents={100}
        imageUrl="https://example.test/mug.png"
      />,
      SEED_LIGHT
    );
    expect(getByLabelText('Ceramic Mug')).toBeTruthy();
  });

  it('reads Qty n in tabular figures when the line is read-only', () => {
    const { getByText, queryByTestId } = renderThemed(
      <CartLineItemV4 title="Mug" quantity={4} unitPriceCents={100} />,
      SEED_LIGHT
    );
    expect(queryByTestId('xen-quantity-stepper')).toBeNull();
    expect(flat(getByText('Qty 4').props.style).fontVariant).toEqual(['tabular-nums']);
  });

  it('gives the remove control a real label and the 44 tap floor', () => {
    const onRemove = jest.fn();
    const { getByTestId } = renderThemed(
      <CartLineItemV4
        title="Ceramic Mug"
        quantity={1}
        unitPriceCents={100}
        onRemove={onRemove}
      />,
      SEED_LIGHT
    );
    const button = getByTestId('xen-cart-remove');
    expect(button.props.accessibilityLabel).toBe('Remove Ceramic Mug');
    expect(flat(button.props.style).minHeight).toBe(TAP);
    fireEvent.press(button);
    expect(onRemove).toHaveBeenCalled();
  });

  it('the remove label is mutedText, not the error tone', () => {
    const { getByText } = renderThemed(
      <CartLineItemV4
        title="Mug"
        quantity={1}
        unitPriceCents={100}
        onRemove={() => undefined}
      />,
      SEED_LIGHT
    );
    const colour = flat(getByText('Remove').props.style).color;
    expect(colour).toBe(theme.light.mutedText);
    expect(colour).not.toBe(theme.light.danger);
    expect(colour).not.toBe(theme.light.dangerText);
  });

  it('honours a removeLabel override, and hides the control with no handler', () => {
    const withOverride = renderThemed(
      <CartLineItemV4
        title="Mug"
        quantity={1}
        unitPriceCents={100}
        onRemove={() => undefined}
        removeLabel="Take the mug out of my cart"
      />,
      SEED_LIGHT
    );
    expect(withOverride.getByTestId('xen-cart-remove').props.accessibilityLabel).toBe(
      'Take the mug out of my cart'
    );

    const without = renderThemed(
      <CartLineItemV4 title="Mug" quantity={1} unitPriceCents={100} />,
      SEED_LIGHT
    );
    expect(without.queryByTestId('xen-cart-remove')).toBeNull();
  });

  it('EMPTY: a line with nothing to name renders nothing at all — §4.5', () => {
    const { queryByTestId } = renderThemed(
      <CartLineItemV4 title="   " quantity={1} unitPriceCents={0} onRemove={() => undefined} />,
      SEED_LIGHT
    );
    expect(queryByTestId('xen-cart-line-item')).toBeNull();
    expect(queryByTestId('xen-cart-remove')).toBeNull();
  });

  it('EMPTY: a variant with no title still draws the row', () => {
    const { queryByTestId } = renderThemed(
      <CartLineItemV4
        title=""
        variantTitle="Large / Black"
        quantity={1}
        unitPriceCents={100}
      />,
      SEED_LIGHT
    );
    expect(queryByTestId('xen-cart-line-item')).not.toBeNull();
  });

  it('routes every amount through the formatMoney override', () => {
    const { getByText } = renderThemed(
      <CartLineItemV4
        title="Mug"
        quantity={2}
        unitPriceCents={1000}
        currency="EUR"
        formatMoney={(c, cur) => `${cur} ${c}`}
      />,
      SEED_LIGHT
    );
    expect(getByText('EUR 2000')).toBeTruthy();
  });
});
