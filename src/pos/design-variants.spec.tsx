/** @jest-environment jsdom */
/**
 * Alternate pos designs (v2 / v3) for the web (React DOM) — drop-in redesigns of
 * CartLine, ProductGridTile, ReceiptView, RegisterKeypad. Each variant keeps the
 * base props; these specs prove they (a) mount, (b) stay token-pure (no literal
 * hex in inline styles), and (c) honor a key interaction/state.
 */
import { fireEvent, render } from '@testing-library/react';
import { CartLineV2 } from './CartLineV2';
import { CartLineV3 } from './CartLineV3';
import { ProductGridTileV2 } from './ProductGridTileV2';
import { ProductGridTileV3 } from './ProductGridTileV3';
import { ReceiptViewV2 } from './ReceiptViewV2';
import { ReceiptViewV3 } from './ReceiptViewV3';
import { RegisterKeypadV2 } from './RegisterKeypadV2';
import { RegisterKeypadV3 } from './RegisterKeypadV3';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;
const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

const RECEIPT_ITEMS = [
  { name: 'Coffee', quantity: 2, amountCents: 800 },
  { name: 'Muffin', amountCents: 350 },
];

describe('CartLine alternates (web)', () => {
  it('V2 voids a line', () => {
    const onVoid = jest.fn();
    const { getByLabelText, container } = render(<CartLineV2 name="Latte" quantity={1} unitPriceCents={450} onVoid={onVoid} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('Void Latte'));
    expect(onVoid).toHaveBeenCalledTimes(1);
  });
  it('V3 renders a dense line', () => {
    const { getByText, container } = render(<CartLineV3 name="Tea" quantity={3} unitPriceCents={300} />);
    expect(getByText('Tea')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('ProductGridTile alternates (web)', () => {
  it('V2 fires onClick', () => {
    const onClick = jest.fn();
    const { getByLabelText, container } = render(<ProductGridTileV2 name="Bagel" priceCents={250} onClick={onClick} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('Bagel'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  it('V3 flags sold out', () => {
    const { getByText, container } = render(<ProductGridTileV3 name="Donut" priceCents={200} tone="accent" soldOut />);
    expect(getByText('Sold out')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('ReceiptView alternates (web)', () => {
  it('V2 renders totals + change', () => {
    const { getByText, container } = render(
      <ReceiptViewV2 merchant="Cafe" items={RECEIPT_ITEMS} totalCents={1150} tenders={[{ method: 'cash', amountCents: 1500 }]} />
    );
    expect(getByText('Cafe')).toBeTruthy();
    expect(getByText('Change')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
  it('V3 renders the total hero', () => {
    const { getByText, container } = render(<ReceiptViewV3 merchant="Cafe" items={RECEIPT_ITEMS} totalCents={1150} />);
    expect(getByText('Total')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('RegisterKeypad alternates (web)', () => {
  it('V2 appends a digit', () => {
    const onChange = jest.fn();
    const { getByLabelText, container } = render(<RegisterKeypadV2 value="1" onChange={onChange} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('5'));
    expect(onChange).toHaveBeenCalledWith('15');
  });
  it('V3 backspaces', () => {
    const onChange = jest.fn();
    const { getByLabelText, container } = render(<RegisterKeypadV3 value="42" onChange={onChange} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('⌫'));
    expect(onChange).toHaveBeenCalledWith('4');
  });
});
