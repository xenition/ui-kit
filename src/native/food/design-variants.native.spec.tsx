/**
 * Alternate-design (V2 / V3) coverage for the most-used native food
 * components. Each variant is asserted to: mount, stay token-pure under both
 * seeds (every rendered hex traces to a compiled token), and — for the two
 * interactive heroes — fire its handler (DishCardV2 add, CartBarV2 press).
 */
import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import {
  DishCardV2,
  DishCardV3,
  RestaurantCardV2,
  RestaurantCardV3,
  CartBarV2,
  CartBarV3,
  MenuSectionV2,
  MenuSectionV3,
} from './index';

describe('DishCard V2/V3 (native)', () => {
  it('DishCardV2 mounts and fires onAdd (interaction: add to cart)', () => {
    const onAdd = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <DishCardV2 name="Pad Thai" description="Rice noodles, tamarind" priceCents={1450} rating={4.5} onAdd={onAdd} addLabel="Add" />,
      SEED_LIGHT
    );
    expect(getByText('Pad Thai')).toBeTruthy();
    expect(getByText('$14.50')).toBeTruthy();
    fireEvent.press(getByLabelText('Add'));
    expect(onAdd).toHaveBeenCalledTimes(1);
  });

  it('DishCardV2 hides the add button and shows sold-out when out of stock', () => {
    const onAdd = jest.fn();
    const { getByText, queryByLabelText } = renderThemed(
      <DishCardV2 name="Ramen" priceCents={1600} soldOut onAdd={onAdd} />,
      SEED_DARK
    );
    expect(getByText('Sold out')).toBeTruthy();
    expect(queryByLabelText('Add')).toBeNull();
  });

  it('DishCardV3 mounts text-first with name + price', () => {
    const { getByText } = renderThemed(
      <DishCardV3 name="Green Curry" description="Coconut, basil" priceCents={1550} rating={4.2} onAdd={() => undefined} />,
      SEED_LIGHT
    );
    expect(getByText('Green Curry')).toBeTruthy();
    expect(getByText('$15.50')).toBeTruthy();
  });

  it('both DishCard variants render loading skeletons', () => {
    expect(renderThemed(<DishCardV2 name="X" priceCents={1000} loading />, SEED_LIGHT).getByLabelText('Loading dish')).toBeTruthy();
    expect(renderThemed(<DishCardV3 name="X" priceCents={1000} loading />, SEED_DARK).getByLabelText('Loading dish')).toBeTruthy();
  });
});

describe('RestaurantCard V2/V3 (native)', () => {
  it('RestaurantCardV2 mounts with name, rating overlay, and open badge', () => {
    const { getByText } = renderThemed(
      <RestaurantCardV2 name="Basil & Chili" cuisine="Thai" rating={4.6} ratingCount={210} priceLevel={2} etaText="25–35 min" openState="open" />,
      SEED_LIGHT
    );
    expect(getByText('Basil & Chili')).toBeTruthy();
    expect(getByText('Open')).toBeTruthy();
    expect(getByText('4.6')).toBeTruthy();
  });

  it('RestaurantCardV3 mounts as a compact row', () => {
    const onPress = jest.fn();
    const { getByText } = renderThemed(
      <RestaurantCardV3 name="Noodle Bar" cuisine="Ramen" rating={4.1} openState="busy" onPress={onPress} />,
      SEED_DARK
    );
    expect(getByText('Noodle Bar')).toBeTruthy();
  });
});

describe('CartBar V2/V3 (native)', () => {
  it('CartBarV2 shows count + total and fires onPress (interaction: press)', () => {
    const onPress = jest.fn();
    const { getByText } = renderThemed(
      <CartBarV2 itemCount={3} totalCents={4200} label="View cart" onPress={onPress} />,
      SEED_LIGHT
    );
    expect(getByText('3')).toBeTruthy();
    expect(getByText('$42.00')).toBeTruthy();
    fireEvent.press(getByText('View cart'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('CartBarV2 collapses to a non-interactive empty pill at 0 items', () => {
    const { getByText, queryByRole } = renderThemed(
      <CartBarV2 itemCount={0} totalCents={0} onPress={() => undefined} emptyLabel="Cart empty" />,
      SEED_LIGHT
    );
    expect(getByText('Cart empty')).toBeTruthy();
    expect(queryByRole('button')).toBeNull();
  });

  it('CartBarV3 mounts an itemised bar and fires its action button', () => {
    const onPress = jest.fn();
    const { getByText } = renderThemed(
      <CartBarV3 itemCount={9} totalCents={5000} label="Checkout" onPress={onPress} />,
      SEED_DARK
    );
    expect(getByText('$50.00')).toBeTruthy();
    fireEvent.press(getByText('Checkout'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('MenuSection V2/V3 (native)', () => {
  it('MenuSectionV2 mounts with children', () => {
    const { getByText } = renderThemed(
      <MenuSectionV2 title="Mains" description="House favourites">
        <DishCardV3 name="Green Curry" priceCents={1550} />
      </MenuSectionV2>,
      SEED_LIGHT
    );
    expect(getByText('Mains')).toBeTruthy();
    expect(getByText('Green Curry')).toBeTruthy();
  });

  it('MenuSectionV2 renders an empty state', () => {
    const { getByText } = renderThemed(
      <MenuSectionV2 title="Specials" emptyLabel="Nothing here yet">
        {[]}
      </MenuSectionV2>,
      SEED_DARK
    );
    expect(getByText('Specials')).toBeTruthy();
    expect(getByText('Nothing here yet')).toBeTruthy();
  });

  it('MenuSectionV3 renders an empty state', () => {
    const { getByText } = renderThemed(
      <MenuSectionV3 title="Sides" emptyLabel="No sides yet">
        {[]}
      </MenuSectionV3>,
      SEED_LIGHT
    );
    expect(getByText('Sides')).toBeTruthy();
    expect(getByText('No sides yet')).toBeTruthy();
  });
});

describe('token purity (native food design variants, both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <DishCardV2 name="Pad Thai" description="Tamarind" priceCents={1450} rating={4.5} onAdd={() => undefined} />
          <DishCardV3 name="Green Curry" description="Basil" priceCents={1550} rating={4.2} soldOut />
          <RestaurantCardV2 name="Basil & Chili" cuisine="Thai" rating={4.6} ratingCount={210} priceLevel={3} etaText="25–35 min" openState="open" />
          <RestaurantCardV3 name="Noodle Bar" cuisine="Ramen" rating={4.1} openState="busy" />
          <CartBarV2 itemCount={2} totalCents={2900} onPress={() => undefined} />
          <CartBarV3 itemCount={9} totalCents={5000} onPress={() => undefined} />
          <MenuSectionV2 title="Empty V2">{[]}</MenuSectionV2>
          <MenuSectionV3 title="Empty V3">{[]}</MenuSectionV3>
        </>,
        seed
      );
      const allowed = tokenHexSet(seed);
      const found = renderedStyleHexes(root);
      expect(found.length).toBeGreaterThan(0);
      found.forEach((hex) => expect(allowed.has(hex)).toBe(true));
    });
  });
});
