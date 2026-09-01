/** @jest-environment jsdom */
/**
 * The **V4 food line** (web) — the order pass, and the finding this module
 * exists for: a menu that never said what was in the food.
 */
import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import {
  deliveryWindow,
  DIET_TONE,
  ORDER_STAGES,
  stageIndex,
  stepQuantity,
} from './order-v4';
import { DishCardV4 } from './DishCardV4';
import { NutritionBadgeV4 } from './NutritionBadgeV4';
import { OrderStatusTrackerV4 } from './OrderStatusTrackerV4';

describe('order-v4', () => {
  it('spells the stages the way the component does', () => {
    // An earlier draft of this file invented 'on-the-way', so stageIndex()
    // returned undefined for every ordinary order and the tracker rendered
    // its unknown state always. Both twins wrote a local alias around it,
    // which is how it was found.
    expect(ORDER_STAGES).toEqual(['placed', 'preparing', 'out-for-delivery', 'delivered']);
    expect(stageIndex('out-for-delivery')).toBe(2);
  });

  it('refuses to guess at an unknown status', () => {
    // The base used Math.max(0, indexOf(status)), which maps a -1 miss onto
    // stage 1 — so a typo rendered a confident, wrong "Order placed".
    expect(stageIndex('nonsense')).toBeUndefined();
    expect(stageIndex('')).toBeUndefined();
  });

  it('keeps a dietary marker out of the status palette', () => {
    // Vegan is not a success and spicy is not a failure. A menu row of these
    // read as a row of alerts.
    expect(DIET_TONE.vegan).toBe('neutral');
    expect(DIET_TONE.halal).toBe('neutral');
    expect(DIET_TONE.spicy).not.toBe('danger');
  });

  it('bounds a quantity step', () => {
    expect(stepQuantity(1, -1)).toBe(0);
    expect(stepQuantity(0, -1)).toBe(0);
    expect(stepQuantity(3, 1, 0, 3)).toBe(3);
    expect(stepQuantity(Number.NaN, 1, 2)).toBe(3);
  });

  it('reads a transposed delivery window the sensible way round', () => {
    // The base tested max > min and silently dropped the max otherwise, so
    // min=35 max=20 rendered "35 min" — a transposed pair read as a
    // confident single figure.
    expect(deliveryWindow(20, 35)).toBe('20–35 min');
    expect(deliveryWindow(35, 20)).toBe('20–35 min');
    expect(deliveryWindow(30, 30)).toBe('30 min');
    expect(deliveryWindow(30, undefined)).toBe('30 min');
  });
});

describe('DishCardV4 — the allergen finding', () => {
  it('leaves the badges reachable instead of pruning them', () => {
    // `role="button"` is children-presentational, so an aria-label on the
    // card root removed the price, the rating and — the reason this matters —
    // every allergen and dietary badge from the accessibility tree. A
    // screen-reader user heard one thing per dish: its name.
    const { getByText, getByRole } = render(
      <DishCardV4
        name="Pad Thai"
        priceCents={1250}
        onClick={jest.fn()}
        badges={<NutritionBadgeV4 kind="vegan" />}
      />
    );
    const badge = getByText(/vegan/i);
    // The badge is not inside the card's activation, so nothing prunes it.
    expect(badge.closest('button')).not.toBe(getByRole('button', { name: /Pad Thai/ }));
  });

  it('does not add a sold-out dish', () => {
    // aria-disabled said unavailable while onClick still fired.
    const onAdd = jest.fn();
    const onClick = jest.fn();
    render(<DishCardV4 name="Pad Thai" soldOut onAdd={onAdd} onClick={onClick} />);
    const activation = document.querySelector('button');
    if (activation) fireEvent.click(activation);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('keeps Add out of the card\'s own activation', () => {
    const onAdd = jest.fn();
    const onClick = jest.fn();
    const { getByRole } = render(
      <DishCardV4 name="Pad Thai" onAdd={onAdd} onClick={onClick} addLabel="Add" />
    );
    const add = getByRole('button', { name: /Add/i });
    expect(add.closest('button')).toBe(add);
    fireEvent.click(add);
    expect(onAdd).toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe('OrderStatusTrackerV4', () => {
  it('renders a real stage rather than the unknown state', () => {
    const { container } = render(<OrderStatusTrackerV4 status="out-for-delivery" />);
    expect(container.textContent ?? '').not.toContain('unavailable');
  });

  it('says so when the status is not one it knows', () => {
    const { container } = render(
      <OrderStatusTrackerV4
        status={'nonsense' as never}
        unknownLabel="Order status unavailable"
      />
    );
    expect(container.textContent).toContain('Order status unavailable');
  });
});
