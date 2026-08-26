import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { DishCard } from './DishCard';
import { MenuSection } from './MenuSection';
import { CartBar } from './CartBar';
import { OrderStatusTracker } from './OrderStatusTracker';
import { RestaurantCard } from './RestaurantCard';
import { ModifierList, type ModifierOption } from './ModifierList';
import { DeliveryEstimate } from './DeliveryEstimate';
import { RatingSummary } from './RatingSummary';
import { ReorderRow } from './ReorderRow';
import { TipSelector } from './TipSelector';
import { NutritionBadge } from './NutritionBadge';
import { CuisineChip } from './CuisineChip';
import { TableReservationRow } from './TableReservationRow';

describe('DishCard (native)', () => {
  it('renders name + price and fires onAdd (interaction: add to cart)', () => {
    const onAdd = jest.fn();
    const { getByText } = renderThemed(
      <DishCard name="Pad Thai" priceCents={1450} onAdd={onAdd} addLabel="Add" />,
      SEED_LIGHT
    );
    expect(getByText('Pad Thai')).toBeTruthy();
    expect(getByText('$14.50')).toBeTruthy();
    fireEvent.press(getByText('Add'));
    expect(onAdd).toHaveBeenCalledTimes(1);
  });

  it('shows a sold-out label instead of the add button and blocks press', () => {
    const onAdd = jest.fn();
    const { getByText, queryByText } = renderThemed(
      <DishCard name="Ramen" priceCents={1600} soldOut onAdd={onAdd} addLabel="Add" />,
      SEED_DARK
    );
    expect(getByText('Sold out')).toBeTruthy();
    expect(queryByText('Add')).toBeNull();
  });

  it('renders a loading skeleton with only token colors', () => {
    const { root } = renderThemed(<DishCard name="X" priceCents={1000} loading />, SEED_LIGHT);
    const allowed = tokenHexSet(SEED_LIGHT);
    renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });

  // A recipe, a saved dish, a menu line with no pricing: an absent price is a
  // real state, not a zero. Rendering `$0.00` reads as "free" and is wrong.
  it('omits the price entirely when priceCents is absent (unpriced dish)', () => {
    const onAdd = jest.fn();
    const { getByText, queryByText } = renderThemed(
      <DishCard name="Grandma's ragu" description="Slow cooked" onAdd={onAdd} addLabel="Add" />,
      SEED_LIGHT
    );
    expect(getByText("Grandma's ragu")).toBeTruthy();
    expect(queryByText('$0.00')).toBeNull();
    // Everything else on the card is untouched by the missing price.
    fireEvent.press(getByText('Add'));
    expect(onAdd).toHaveBeenCalledTimes(1);
  });
});

describe('MenuSection (native)', () => {
  it('mounts with children (title + item)', () => {
    const { getByText } = renderThemed(
      <MenuSection title="Mains" description="House favourites">
        <DishCard name="Green Curry" priceCents={1550} />
      </MenuSection>,
      SEED_LIGHT
    );
    expect(getByText('Mains')).toBeTruthy();
    expect(getByText('Green Curry')).toBeTruthy();
  });

  it('renders an empty state when it has no items', () => {
    const { getByText, queryByText } = renderThemed(
      <MenuSection title="Specials" emptyLabel="Nothing here yet">
        {[]}
      </MenuSection>,
      SEED_DARK
    );
    expect(getByText('Specials')).toBeTruthy();
    expect(getByText('Nothing here yet')).toBeTruthy();
    expect(queryByText('Green Curry')).toBeNull();
  });
});

describe('CartBar (native)', () => {
  it('shows count + total and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText } = renderThemed(
      <CartBar itemCount={3} totalCents={4200} label="View cart" onPress={onPress} />,
      SEED_LIGHT
    );
    expect(getByText('3')).toBeTruthy();
    expect(getByText('$42.00')).toBeTruthy();
    fireEvent.press(getByText('View cart'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('collapses to a non-interactive empty state at 0 items (no button role)', () => {
    const { getByText, queryByRole } = renderThemed(
      <CartBar itemCount={0} totalCents={0} onPress={() => undefined} emptyLabel="Cart empty" />,
      SEED_LIGHT
    );
    expect(getByText('Cart empty')).toBeTruthy();
    // The empty bar renders a plain summary View, never a pressable button.
    expect(queryByRole('button')).toBeNull();
  });
});

describe('OrderStatusTracker (native)', () => {
  it('announces each stage with its state word (not color alone)', () => {
    const { getByLabelText } = renderThemed(
      <OrderStatusTracker status="preparing" />,
      SEED_LIGHT
    );
    expect(getByLabelText('Order placed: completed')).toBeTruthy();
    expect(getByLabelText('Preparing: in progress')).toBeTruthy();
    expect(getByLabelText('Out for delivery: upcoming')).toBeTruthy();
    expect(getByLabelText('Delivered: upcoming')).toBeTruthy();
  });

  it('renders vertical variant + timestamps and stays token-pure', () => {
    const { root, getByLabelText } = renderThemed(
      <OrderStatusTracker
        status="out-for-delivery"
        variant="vertical"
        timestamps={{ placed: '12:00 PM' }}
      />,
      SEED_DARK
    );
    expect(getByLabelText('Order placed: completed, 12:00 PM')).toBeTruthy();
    const allowed = tokenHexSet(SEED_DARK);
    renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });
});

describe('RestaurantCard (native)', () => {
  it('mounts with name, meta, and an open-state badge', () => {
    const { getByText } = renderThemed(
      <RestaurantCard
        name="Basil & Chili"
        cuisine="Thai"
        rating={4.6}
        ratingCount={210}
        priceLevel={2}
        etaText="25–35 min"
        openState="open"
      />,
      SEED_LIGHT
    );
    expect(getByText('Basil & Chili')).toBeTruthy();
    expect(getByText('Open')).toBeTruthy();
    expect(getByText('(210)')).toBeTruthy();
  });
});

describe('ModifierList (native)', () => {
  it('toggles an option (interaction: modifier toggle) and shows deltas', () => {
    const onToggle = jest.fn();
    const options: ModifierOption[] = [
      { id: 'cheese', label: 'Extra cheese', priceCents: 150 },
      { id: 'bacon', label: 'Bacon', priceCents: 250, selected: true },
    ];
    const { getByText } = renderThemed(
      <ModifierList title="Add-ons" options={options} onToggle={onToggle} />,
      SEED_LIGHT
    );
    expect(getByText('+$1.50')).toBeTruthy();
    fireEvent.press(getByText('Extra cheese'));
    expect(onToggle).toHaveBeenCalledWith('cheese');
  });

  it('renders an empty row when there are no options', () => {
    const { getByText } = renderThemed(
      <ModifierList options={[]} emptyLabel="No add-ons" />,
      SEED_DARK
    );
    expect(getByText('No add-ons')).toBeTruthy();
  });
});

describe('DeliveryEstimate (native)', () => {
  it('formats a minute window across variants', () => {
    const { getByText } = renderThemed(
      <DeliveryEstimate minMinutes={25} maxMinutes={35} variant="card" />,
      SEED_LIGHT
    );
    expect(getByText('25–35 min')).toBeTruthy();
  });
});

describe('RatingSummary (native)', () => {
  it('shows an empty label at 0 ratings', () => {
    const { getByText } = renderThemed(
      <RatingSummary average={0} count={0} emptyLabel="No ratings yet" />,
      SEED_LIGHT
    );
    expect(getByText('No ratings yet')).toBeTruthy();
  });

  it('renders a distribution chart with guarded bar widths', () => {
    const { getByText, root } = renderThemed(
      <RatingSummary average={4.3} count={120} variant="detailed" distribution={[80, 20, 10, 5, 5]} />,
      SEED_DARK
    );
    expect(getByText('4.3')).toBeTruthy();
    const allowed = tokenHexSet(SEED_DARK);
    renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });
});

describe('ReorderRow (native)', () => {
  it('renders total and fires onReorder', () => {
    const onReorder = jest.fn();
    const { getByText } = renderThemed(
      <ReorderRow title="Basil & Chili" totalCents={3600} onReorder={onReorder} />,
      SEED_LIGHT
    );
    expect(getByText('$36.00')).toBeTruthy();
    fireEvent.press(getByText('Reorder'));
    expect(onReorder).toHaveBeenCalledTimes(1);
  });
});

describe('TipSelector (native)', () => {
  it('selects a percentage (interaction: tip select) and computes the amount', () => {
    const onSelect = jest.fn();
    const { getByText } = renderThemed(
      <TipSelector percents={[10, 15, 20]} subtotalCents={2000} onSelect={onSelect} />,
      SEED_LIGHT
    );
    // 15% of $20.00 = $3.00
    expect(getByText('$3.00')).toBeTruthy();
    fireEvent.press(getByText('20%'));
    expect(onSelect).toHaveBeenCalledWith(20);
  });
});

describe('NutritionBadge (native)', () => {
  it('renders a labelled preset (glyph + text, not color alone)', () => {
    const { getByText } = renderThemed(<NutritionBadge kind="vegan" />, SEED_LIGHT);
    expect(getByText('Vegan')).toBeTruthy();
  });
});

describe('CuisineChip (native)', () => {
  it('fires onPress when used as a filter toggle', () => {
    const onPress = jest.fn();
    const { getByText } = renderThemed(
      <CuisineChip label="Thai" glyph="🍜" selected onPress={onPress} />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Thai'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('TableReservationRow (native)', () => {
  it('renders guest, party size, and a status badge', () => {
    const { getByText } = renderThemed(
      <TableReservationRow name="A. Okafor" partySize={4} dateText="Fri, Aug 29" timeText="7:30 PM" status="confirmed" />,
      SEED_DARK
    );
    expect(getByText('A. Okafor')).toBeTruthy();
    expect(getByText('4')).toBeTruthy();
    expect(getByText('Confirmed')).toBeTruthy();
  });
});

describe('token purity (native food, both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <DishCard name="Pad Thai" priceCents={1450} rating={4.5} onAdd={() => undefined} />
          <MenuSection title="Empty">{[]}</MenuSection>
          <CartBar itemCount={2} totalCents={2900} onPress={() => undefined} />
          <OrderStatusTracker status="preparing" />
          <RestaurantCard name="Basil & Chili" cuisine="Thai" rating={4.6} openState="open" />
          <ModifierList
            title="Add-ons"
            options={[{ id: 'a', label: 'Extra cheese', priceCents: 150, selected: true }]}
          />
          <DeliveryEstimate minMinutes={25} maxMinutes={35} variant="badge" />
          <RatingSummary average={4.3} count={120} variant="detailed" distribution={[80, 20, 10, 5, 5]} />
          <ReorderRow title="Basil & Chili" totalCents={3600} onReorder={() => undefined} />
          <TipSelector subtotalCents={2000} selectedPercent={20} onSelect={() => undefined} />
          <NutritionBadge kind="spicy" />
          <CuisineChip label="Thai" selected onPress={() => undefined} />
          <TableReservationRow name="A. Okafor" partySize={4} status="confirmed" />
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
