/** @jest-environment jsdom */
/**
 * Web food v2/v3 alternate designs: render smoke, token-class purity (no inline
 * hex), and one key interaction per variant. Plain `@testing-library/react` +
 * bare `expect` — no jest-dom.
 */
import { fireEvent, render } from '@testing-library/react';
import { CartBarV2 } from './CartBarV2';
import { CartBarV3 } from './CartBarV3';
import { DishCardV2 } from './DishCardV2';
import { DishCardV3 } from './DishCardV3';
import { MenuSectionV2 } from './MenuSectionV2';
import { MenuSectionV3 } from './MenuSectionV3';
import { RestaurantCardV2 } from './RestaurantCardV2';
import { RestaurantCardV3 } from './RestaurantCardV3';
import { DishCard } from './DishCard';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

describe('CartBarV2 (elevated floating pill)', () => {
  it('renders an elevated primary pill and fires onClick', () => {
    const onClick = jest.fn();
    const { getByRole, getByText, container } = render(
      <CartBarV2 itemCount={3} totalCents={2599} onClick={onClick} />
    );
    expect(getByText('$25.99')).toBeTruthy();
    const bar = getByRole('button');
    expect(bar.className).toContain('rounded-full');
    expect(bar.className).toContain('shadow-lg');
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(bar);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('collapses to a non-interactive empty pill at zero items', () => {
    const { getByText, queryByRole } = render(
      <CartBarV2 itemCount={0} totalCents={0} emptyLabel="Cart empty" onClick={() => undefined} />
    );
    expect(getByText('Cart empty')).toBeTruthy();
    expect(queryByRole('button')).toBeNull();
  });
});

describe('CartBarV3 (itemised bar with action button)', () => {
  it('renders a surface bar and fires onClick from its action button', () => {
    const onClick = jest.fn();
    const { getByRole, getByText, container } = render(
      <CartBarV3 itemCount={2} totalCents={1800} label="Checkout" onClick={onClick} />
    );
    expect(getByText('$18.00')).toBeTruthy();
    const group = getByRole('group');
    expect(group.className).toContain('border-t');
    expect(group.className).toContain('bg-surface');
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByRole('button', { name: 'Checkout' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('DishCardV2 (image-hero tile)', () => {
  it('renders on an elevated surface and fires onAdd from the floating button', () => {
    const onAdd = jest.fn();
    const { getByRole, getByText, container } = render(
      <DishCardV2 name="Pad Thai" priceCents={1290} onAdd={onAdd} addLabel="Add to cart" />
    );
    expect(getByText('Pad Thai')).toBeTruthy();
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain('shadow-md');
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByRole('button', { name: 'Add to cart' }));
    expect(onAdd).toHaveBeenCalledTimes(1);
  });

  it('renders a skeleton in the loading state (no name text)', () => {
    const { container, queryByText } = render(<DishCardV2 name="Ramen" priceCents={900} loading />);
    expect(container.querySelector('[aria-busy="true"]')).not.toBeNull();
    expect(queryByText('Ramen')).toBeNull();
  });
});

describe('DishCardV3 (text-first menu line)', () => {
  it('renders a hairline row and fires onAdd from the quiet text button', () => {
    const onAdd = jest.fn();
    const { getByRole, getByText, container } = render(
      <DishCardV3 name="Pho" description="Beef broth" priceCents={1100} onAdd={onAdd} addLabel="Add" />
    );
    expect(getByText('Pho')).toBeTruthy();
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain('border-b');
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByRole('button', { name: 'Add' }));
    expect(onAdd).toHaveBeenCalledTimes(1);
  });
});

describe('MenuSectionV2 (panelled banner)', () => {
  it('renders an elevated banner heading with its children', () => {
    const { getByRole, getByText, container } = render(
      <MenuSectionV2 title="Starters" description="To share">
        <DishCard name="Spring rolls" priceCents={600} />
      </MenuSectionV2>
    );
    expect(getByRole('heading', { name: 'Starters' })).toBeTruthy();
    expect(getByText('Spring rolls')).toBeTruthy();
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain('shadow-md');
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('shows a soft-tinted empty panel when it has no items', () => {
    const { getByText } = render(<MenuSectionV2 title="Mains" emptyLabel="Nothing here yet" />);
    expect(getByText('Nothing here yet')).toBeTruthy();
  });
});

describe('MenuSectionV3 (minimal editorial)', () => {
  it('renders a compact heading with a hairline rule and its children', () => {
    const { getByRole, getByText, container } = render(
      <MenuSectionV3 title="Desserts">
        <DishCard name="Mango sticky rice" priceCents={700} />
      </MenuSectionV3>
    );
    expect(getByRole('heading', { name: 'Desserts' })).toBeTruthy();
    expect(getByText('Mango sticky rice')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('shows a quiet italic empty line when it has no items', () => {
    const { getByText } = render(<MenuSectionV3 title="Sides" emptyLabel="No items yet" />);
    expect(getByText('No items yet')).toBeTruthy();
  });
});

describe('RestaurantCardV2 (cover-hero card)', () => {
  it('shows an availability badge on an elevated card and stays token-pure', () => {
    const { getByText, container } = render(
      <RestaurantCardV2 name="Bangkok Table" cuisine="Thai" rating={4.7} ratingCount={210} openState="open" />
    );
    expect(getByText('Bangkok Table')).toBeTruthy();
    expect(getByText('Open')).toBeTruthy();
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain('shadow-md');
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('exposes a keyboard-operable role="button" when clickable', () => {
    const onClick = jest.fn();
    const { getByLabelText } = render(
      <RestaurantCardV2 name="Bangkok Table" cuisine="Thai" openState="open" onClick={onClick} />
    );
    const root = getByLabelText(/Bangkok Table/);
    expect(root.getAttribute('role')).toBe('button');
    fireEvent.keyDown(root, { key: 'Enter' });
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('RestaurantCardV3 (compact list row)', () => {
  it('renders a dense hairline row carrying the status word (not color alone)', () => {
    const { getByText, container } = render(
      <RestaurantCardV3 name="Noodle Bar" cuisine="Ramen" openState="busy" etaText="30–40 min" />
    );
    expect(getByText('Noodle Bar')).toBeTruthy();
    // status is spelled out in the meta line, not conveyed by the dot alone
    expect(getByText(/Busy/)).toBeTruthy();
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain('border-b');
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});
