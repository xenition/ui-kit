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
import {
  ProductGridTileV4,
  CartLineV4,
  ReceiptViewV4,
  RegisterKeypadV4,
  QuickChargeBarV4,
  PaymentMethodTileV4,
  OrderTicketV4,
  DiscountRowV4,
  RefundRowV4,
  SplitBillRowV4,
  CashDrawerRowV4,
  ShiftReportV4,
  StatusPillV4,
  PaymentSuccess,
  SalesSummary,
  RegisterHeader,
  CheckoutSummary,
  TipSelector,
  CategoryTabs,
  PAYMENT_METHOD_META,
} from './index';

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

// ── V4 "register" line — smoke coverage for all 13 drop-in variants (web) ──
describe('pos V4 "register" line (web)', () => {
  it('mounts every V4 variant token-pure, and honors key interactions/states', () => {
    const onProductClick = jest.fn();
    const onSelect = jest.fn();
    const { getByLabelText, getByText, getAllByText, container } = render(
      <>
        <ProductGridTileV4 name="Bagel" priceCents={250} tone="accent" selected onClick={onProductClick} />
        <ProductGridTileV4 name="Decaf" priceCents={300} soldOut />
        <CartLineV4
          name="Latte"
          quantity={2}
          unitPriceCents={450}
          modifiers={['Oat', 'Extra shot']}
          note="Hot"
          discountCents={50}
          onQuantityChange={() => undefined}
          onVoid={() => undefined}
        />
        <ReceiptViewV4
          merchant="Bean & Co"
          addressLines={['1 Main St']}
          items={RECEIPT_ITEMS}
          subtotalCents={1150}
          discountCents={100}
          taxCents={80}
          tipCents={200}
          totalCents={1330}
          tenders={[{ method: 'cash', amountCents: 1500 }]}
          footer="Thanks!"
          orderNumber="88"
        />
        <RegisterKeypadV4 value="12.50" displayPrefix="$" onChange={() => undefined} />
        <QuickChargeBarV4 totalCents={1330} itemCount={3} onCharge={() => undefined} />
        <PaymentMethodTileV4 method="card" label="Visa ···4242" amountCents={1330} onClick={onSelect} />
        <PaymentMethodTileV4 method="cash" selected amountCents={1500} />
        <OrderTicketV4
          orderNumber="A17"
          destination="Table 4"
          server="Sam"
          status="preparing"
          elapsed="4m ago"
          items={[{ name: 'Flat White', quantity: 2, modifiers: ['Oat'] }, { name: 'Croissant' }]}
          onBump={() => undefined}
        />
        <DiscountRowV4 label="Loyalty 10%" type="percent" value={10} amountCents={115} note="Member" onRemove={() => undefined} />
        <RefundRowV4 name="Croissant" quantity={1} amountCents={450} reason="damaged" status="approved" restock />
        <SplitBillRowV4 label="Guest 1" amountCents={665} itemCount={2} paidCents={0} onTogglePaid={() => undefined} />
        <CashDrawerRowV4 kind="variance" amountCents={2005} expectedCents={2000} detail="24 txns" />
        <ShiftReportV4
          cashier="Sam"
          registerId="R2"
          period="9:00 AM – 5:00 PM"
          grossSalesCents={52000}
          refundsCents={1500}
          discountsCents={800}
          taxCents={4100}
          transactionCount={42}
          expectedCashCents={20000}
          countedCashCents={20005}
          breakdown={[{ method: 'card', amountCents: 40000, count: 30 }, { method: 'cash', amountCents: 12000, count: 12 }]}
        />
        <StatusPillV4 meta={PAYMENT_METHOD_META.card} />
      </>
    );

    // Token purity — no literal hex in any inline style across the whole tree.
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);

    // Render sanity across variants.
    expect(getByText('Bean & Co')).toBeTruthy();
    expect(getAllByText('Sold out').length).toBeGreaterThan(0);
    expect(getByText('#A17')).toBeTruthy();

    // Interactions.
    fireEvent.click(getByLabelText('Bagel, $2.50'));
    expect(onProductClick).toHaveBeenCalledTimes(1);
    fireEvent.click(getByLabelText('Visa ···4242'));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});

// ── V4 new blocks — the 6 new components (web) ──
describe('pos V4 new blocks (web)', () => {
  it('mounts every new component token-pure, and honors key interactions', () => {
    const onCharge = jest.fn();
    const onSelectPercent = jest.fn();
    const onSelectCategory = jest.fn();
    const { getByLabelText, getByText, container } = render(
      <>
        <PaymentSuccess
          amountCents={1330}
          method="Visa ···4242"
          changeDueCents={170}
          onReceipt={() => undefined}
          onNewSale={() => undefined}
        />
        <SalesSummary
          grossCents={52000}
          transactions={42}
          netCents={50500}
          refundsCents={1500}
          deltaPct={12.5}
          topItems={[{ name: 'Latte', count: 88 }, { name: 'Croissant', count: 41 }]}
        />
        <RegisterHeader
          storeName="Bean & Co"
          registerLabel="Register 2"
          cashierName="Sam"
          shiftOpen
          runningTotalCents={1330}
          onMenu={() => undefined}
          onShift={() => undefined}
        />
        <CheckoutSummary
          subtotalCents={1150}
          discountCents={100}
          taxCents={80}
          tipCents={200}
          totalCents={1330}
          itemCount={3}
          onCharge={onCharge}
        />
        <TipSelector
          subtotalCents={1150}
          percents={[15, 18, 20]}
          selectedPercent={18}
          onSelectPercent={onSelectPercent}
          onNoTip={() => undefined}
          onCustom={() => undefined}
        />
        <CategoryTabs
          categories={[
            { id: 'coffee', label: 'Coffee', count: 12 },
            { id: 'pastry', label: 'Pastry', count: 6, tone: 'accent' },
          ]}
          selectedId="coffee"
          onSelect={onSelectCategory}
        />
      </>
    );

    // Token purity — no literal hex in any inline style across the whole tree.
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);

    // Render sanity.
    expect(getByText('Payment complete')).toBeTruthy();
    expect(getByText('Gross sales')).toBeTruthy();
    expect(getByText('Register 2')).toBeTruthy();

    // Interactions.
    fireEvent.click(getByLabelText('Charge $13.30'));
    expect(onCharge).toHaveBeenCalledTimes(1);
    fireEvent.click(getByLabelText('Tip 20%, $2.30'));
    expect(onSelectPercent).toHaveBeenCalledWith(20);
    fireEvent.click(getByText('Pastry'));
    expect(onSelectCategory).toHaveBeenCalledWith('pastry');
  });
});
