/** @jest-environment jsdom */
/**
 * Web food blocks: render smoke + token-class purity + the behavioral contracts
 * (DishCard add-to-cart, MenuSection empty state, CartBar activation, Modifier
 * toggle, TipSelector select, OrderStatusTracker color-independent status, chip
 * toggle). Plain `@testing-library/react` + bare `expect` — no jest-dom.
 */
import { fireEvent, render } from '@testing-library/react';
import { createRef } from 'react';
import { DishCard } from './DishCard';
import { MenuSection } from './MenuSection';
import { CartBar } from './CartBar';
import { OrderStatusTracker } from './OrderStatusTracker';
import { RestaurantCard } from './RestaurantCard';
import { ModifierList } from './ModifierList';
import { DeliveryEstimate } from './DeliveryEstimate';
import { RatingSummary } from './RatingSummary';
import { TipSelector } from './TipSelector';
import { NutritionBadge } from './NutritionBadge';
import { CuisineChip } from './CuisineChip';
import { ReorderRow } from './ReorderRow';
import { TableReservationRow } from './TableReservationRow';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

describe('DishCard', () => {
  it('renders on a token-bound surface and forwards its ref', () => {
    const ref = createRef<HTMLDivElement>();
    const { getByText, container } = render(
      <DishCard ref={ref} name="Pad Thai" description="Rice noodles, peanuts" priceCents={1290} rating={4.5} />
    );
    expect(getByText('Pad Thai')).toBeTruthy();
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain('bg-surface');
    expect(root.className).toContain('border-border');
    expect(ref.current?.tagName).toBe('DIV');
    // token-pure: no hex literal leaks into inline styles
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('fires onAdd from the add-to-cart button (integer cents priced)', () => {
    const onAdd = jest.fn();
    const { getByRole, getByText } = render(
      <DishCard name="Pad Thai" priceCents={1290} onAdd={onAdd} addLabel="Add to cart" />
    );
    expect(getByText('$12.90')).toBeTruthy();
    fireEvent.click(getByRole('button', { name: 'Add to cart' }));
    expect(onAdd).toHaveBeenCalledTimes(1);
  });

  it('exposes a keyboard-operable role="button" when clickable', () => {
    const onClick = jest.fn();
    const { getByLabelText } = render(<DishCard name="Pho" priceCents={1100} onClick={onClick} />);
    const root = getByLabelText('Pho');
    expect(root.getAttribute('role')).toBe('button');
    fireEvent.keyDown(root, { key: 'Enter' });
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders a skeleton in the loading state (no name text)', () => {
    const { container, queryByText } = render(<DishCard name="Ramen" priceCents={900} loading />);
    expect(container.querySelector('[aria-busy="true"]')).not.toBeNull();
    expect(queryByText('Ramen')).toBeNull();
  });

  // A recipe, a saved dish, a menu line with no pricing: an absent price is a
  // real state, not a zero. Rendering `$0.00` reads as "free" and is wrong.
  it('omits the price entirely when priceCents is absent (unpriced dish)', () => {
    const onAdd = jest.fn();
    const { getByRole, getByText, queryByText } = render(
      <DishCard name="Grandma's ragu" description="Slow cooked" onAdd={onAdd} addLabel="Add" />
    );
    expect(getByText("Grandma's ragu")).toBeTruthy();
    expect(queryByText('$0.00')).toBeNull();
    // Everything else on the card is untouched by the missing price.
    fireEvent.click(getByRole('button', { name: 'Add' }));
    expect(onAdd).toHaveBeenCalledTimes(1);
  });
});

describe('MenuSection', () => {
  it('renders the heading and its children', () => {
    const { getByText, getByRole } = render(
      <MenuSection title="Starters" description="To share">
        <DishCard name="Spring rolls" priceCents={600} />
      </MenuSection>
    );
    expect(getByRole('heading', { name: 'Starters' })).toBeTruthy();
    expect(getByText('Spring rolls')).toBeTruthy();
  });

  it('shows the empty state (via commerce EmptyState) when it has no items', () => {
    const { getByText, container } = render(<MenuSection title="Mains" emptyLabel="Nothing here yet" />);
    expect(getByText('Nothing here yet')).toBeTruthy();
    expect(container.querySelector('[data-xen-empty-state]')).not.toBeNull();
  });
});

describe('CartBar', () => {
  it('renders the total on a token-bound primary bar and fires onClick', () => {
    const onClick = jest.fn();
    const { getByRole, getByText } = render(
      <CartBar itemCount={3} totalCents={2599} onClick={onClick} />
    );
    expect(getByText('$25.99')).toBeTruthy();
    const bar = getByRole('button');
    expect(bar.className).toContain('bg-primary');
    expect(bar.className).toContain('text-on-primary');
    fireEvent.click(bar);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('collapses to a non-interactive empty state at zero items', () => {
    const { getByText, queryByRole } = render(
      <CartBar itemCount={0} totalCents={0} emptyLabel="Cart empty" onClick={() => undefined} />
    );
    expect(getByText('Cart empty')).toBeTruthy();
    expect(queryByRole('button')).toBeNull();
  });
});

describe('OrderStatusTracker', () => {
  it('announces each step by state word, not color alone, and is a progressbar', () => {
    const { getByLabelText, container } = render(<OrderStatusTracker status="preparing" />);
    const bar = container.querySelector('[role="progressbar"]') as HTMLElement;
    expect(bar).not.toBeNull();
    expect(bar.getAttribute('aria-valuenow')).toBe('2');
    // completed / in progress / upcoming carried in the accessible name
    expect(getByLabelText(/Order placed: completed/)).toBeTruthy();
    expect(getByLabelText(/Preparing: in progress/)).toBeTruthy();
    expect(getByLabelText(/Delivered: upcoming/)).toBeTruthy();
  });
});

describe('ModifierList', () => {
  it('fires onToggle from a real checkbox button and reflects aria-checked', () => {
    const onToggle = jest.fn();
    const { getByRole } = render(
      <ModifierList
        title="Add-ons"
        options={[{ id: 'cheese', label: 'Extra cheese', priceCents: 150, selected: true }]}
        onToggle={onToggle}
      />
    );
    const cell = getByRole('checkbox', { name: 'Extra cheese' });
    expect(cell.tagName).toBe('BUTTON');
    expect(cell.getAttribute('aria-checked')).toBe('true');
    fireEvent.click(cell);
    expect(onToggle).toHaveBeenCalledWith('cheese');
  });

  it('renders the empty label when there are no options', () => {
    const { getByText } = render(<ModifierList options={[]} emptyLabel="No add-ons" />);
    expect(getByText('No add-ons')).toBeTruthy();
  });
});

describe('TipSelector', () => {
  it('emits the chosen percent from a radio button', () => {
    const onSelect = jest.fn();
    const { getByRole } = render(
      <TipSelector percents={[10, 20]} subtotalCents={2000} onSelect={onSelect} allowNone={false} />
    );
    const opt = getByRole('radio', { name: '20%, $4.00' });
    fireEvent.click(opt);
    expect(onSelect).toHaveBeenCalledWith(20);
  });
});

describe('CuisineChip', () => {
  it('is a real button carrying aria-pressed when interactive', () => {
    const onClick = jest.fn();
    const { getByRole } = render(<CuisineChip label="Thai" glyph="🍜" selected onClick={onClick} />);
    const chip = getByRole('button', { name: /Thai/ });
    expect(chip.getAttribute('aria-pressed')).toBe('true');
    fireEvent.click(chip);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('the remaining food blocks render token-bound', () => {
  it('RestaurantCard shows an availability badge and stays token-pure', () => {
    const { getByText, container } = render(
      <RestaurantCard name="Bangkok Table" cuisine="Thai" rating={4.7} ratingCount={210} openState="open" />
    );
    expect(getByText('Bangkok Table')).toBeTruthy();
    expect(getByText('Open')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('DeliveryEstimate collapses a missing max to a single value', () => {
    const { getByLabelText } = render(<DeliveryEstimate minMinutes={25} mode="pickup" />);
    expect(getByLabelText('Ready for pickup: 25 min')).toBeTruthy();
  });

  it('RatingSummary shows an empty label at zero count', () => {
    const { getByText } = render(<RatingSummary average={0} count={0} emptyLabel="No ratings yet" />);
    expect(getByText('No ratings yet')).toBeTruthy();
  });

  it('NutritionBadge renders label + glyph with a token tone class', () => {
    const { getByText, container } = render(<NutritionBadge kind="vegan" />);
    expect(getByText('Vegan')).toBeTruthy();
    const badge = container.firstElementChild as HTMLElement;
    expect(badge.className).toContain('bg-success');
  });

  it('ReorderRow fires its reorder action', () => {
    const onReorder = jest.fn();
    const { getByRole } = render(<ReorderRow title="Bangkok Table" totalCents={2400} onReorder={onReorder} />);
    fireEvent.click(getByRole('button', { name: 'Reorder' }));
    expect(onReorder).toHaveBeenCalledTimes(1);
  });

  it('TableReservationRow shows a labelled status badge', () => {
    const { getByText } = render(<TableReservationRow name="Ada" partySize={4} status="confirmed" />);
    expect(getByText('Ada')).toBeTruthy();
    expect(getByText('Confirmed')).toBeTruthy();
  });
});
