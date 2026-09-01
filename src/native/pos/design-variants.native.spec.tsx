import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { RegisterKeypadV2 } from './RegisterKeypadV2';
import { RegisterKeypadV3 } from './RegisterKeypadV3';
import { CartLineV2 } from './CartLineV2';
import { CartLineV3 } from './CartLineV3';
import { ReceiptViewV2 } from './ReceiptViewV2';
import { ReceiptViewV3 } from './ReceiptViewV3';
import { ProductGridTileV2 } from './ProductGridTileV2';
import { ProductGridTileV3 } from './ProductGridTileV3';
import type { ReceiptLine, ReceiptTender } from './ReceiptView';
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

const SEEDS = [SEED_LIGHT, SEED_DARK] as const;

const RECEIPT_ITEMS: ReceiptLine[] = [
  { name: 'Flat White', quantity: 2, amountCents: 900, detail: 'Oat milk' },
  { name: 'Croissant', amountCents: 450 },
];
const TENDERS: ReceiptTender[] = [{ method: 'card', amountCents: 1350 }];

describe('pos design variants — mount + core content', () => {
  it('RegisterKeypadV2 / V3 render the display value and keys', () => {
    const v2 = renderThemed(<RegisterKeypadV2 value="42" displayPrefix="$" onChange={() => undefined} />, SEED_LIGHT);
    expect(v2.getByText('42')).toBeTruthy();
    expect(v2.getByLabelText('7')).toBeTruthy();

    const v3 = renderThemed(<RegisterKeypadV3 value="7" onChange={() => undefined} />, SEED_DARK);
    expect(v3.getByLabelText('Backspace')).toBeTruthy();
  });

  it('CartLineV2 / V3 show the line total (unit × qty − discount)', () => {
    const v2 = renderThemed(
      <CartLineV2 name="Latte" quantity={2} unitPriceCents={450} modifiers={['Oat']} onQuantityChange={() => undefined} onVoid={() => undefined} />,
      SEED_LIGHT
    );
    expect(v2.getByText('$9.00')).toBeTruthy();

    const v3 = renderThemed(
      <CartLineV3 name="Bagel" quantity={3} unitPriceCents={300} discountCents={100} onQuantityChange={() => undefined} />,
      SEED_DARK
    );
    expect(v3.getByText('$8.00')).toBeTruthy(); // 900 − 100
  });

  it('ReceiptViewV2 / V3 render the total — and an empty receipt', () => {
    const v2 = renderThemed(
      <ReceiptViewV2 merchant="Bean & Co" items={RECEIPT_ITEMS} totalCents={1350} subtotalCents={1350} tenders={TENDERS} orderNumber="88" />,
      SEED_LIGHT
    );
    expect(v2.getByText('Bean & Co')).toBeTruthy();
    expect(v2.getAllByText('$13.50').length).toBeGreaterThan(0);

    const v3 = renderThemed(<ReceiptViewV3 items={RECEIPT_ITEMS} totalCents={1350} subtotalCents={1350} />, SEED_DARK);
    expect(v3.getAllByText('$13.50').length).toBeGreaterThan(0);

    // Empty item lists → EmptyState, total still renders.
    const emptyV2 = renderThemed(<ReceiptViewV2 items={[]} totalCents={0} emptyLabel="Nothing here" />, SEED_LIGHT);
    expect(emptyV2.getByText('Nothing here')).toBeTruthy();
    const emptyV3 = renderThemed(<ReceiptViewV3 items={[]} totalCents={0} emptyLabel="Nothing here" />, SEED_DARK);
    expect(emptyV3.getByText('Nothing here')).toBeTruthy();
  });

  it('ProductGridTileV2 / V3 render the name and price', () => {
    const v2 = renderThemed(<ProductGridTileV2 name="Espresso" priceCents={350} onPress={() => undefined} />, SEED_LIGHT);
    expect(v2.getByText('Espresso')).toBeTruthy();
    expect(v2.getByText('$3.50')).toBeTruthy();

    const v3 = renderThemed(<ProductGridTileV3 name="Cortado" priceCents={400} soldOut onPress={() => undefined} />, SEED_DARK);
    expect(v3.getByText('Cortado')).toBeTruthy();
    expect(v3.getByText('Sold out')).toBeTruthy();
  });
});

describe('pos design variants — interaction', () => {
  it('RegisterKeypadV2 folds a tapped digit into value; V3 backspaces', () => {
    const onChange = jest.fn();
    const onKeyPress = jest.fn();
    const v2 = renderThemed(<RegisterKeypadV2 value="12" onChange={onChange} onKeyPress={onKeyPress} />, SEED_LIGHT);
    fireEvent.press(v2.getByLabelText('7'));
    expect(onKeyPress).toHaveBeenCalledWith('7');
    expect(onChange).toHaveBeenCalledWith('127');

    const onChange3 = jest.fn();
    const v3 = renderThemed(<RegisterKeypadV3 value="99" onChange={onChange3} />, SEED_DARK);
    fireEvent.press(v3.getByLabelText('Backspace'));
    expect(onChange3).toHaveBeenCalledWith('9');
  });

  it('CartLineV2 drives its quantity stepper', () => {
    const onQuantityChange = jest.fn();
    const { getByLabelText } = renderThemed(
      <CartLineV2 name="Mocha" quantity={2} unitPriceCents={500} onQuantityChange={onQuantityChange} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Increase quantity'));
    expect(onQuantityChange).toHaveBeenCalledWith(3);
  });

  it('ProductGridTileV2 presses through', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(<ProductGridTileV2 name="Chai" priceCents={420} onPress={onPress} />, SEED_LIGHT);
    fireEvent.press(getByLabelText('Chai, $4.20'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('pos design variants — token purity (both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    SEEDS.forEach((seed) => {
      const { root } = renderThemed(
        <>
          <RegisterKeypadV2 value="12.50" displayPrefix="$" onChange={() => undefined} />
          <RegisterKeypadV3 value="42" variant="number" onChange={() => undefined} />
          <CartLineV2
            name="Latte"
            quantity={2}
            unitPriceCents={450}
            modifiers={['Oat', 'Extra shot']}
            note="Hot"
            discountCents={50}
            onQuantityChange={() => undefined}
            onVoid={() => undefined}
          />
          <CartLineV3 name="Bagel" quantity={3} unitPriceCents={300} modifiers={['Toasted']} onQuantityChange={() => undefined} onVoid={() => undefined} />
          <ReceiptViewV2 merchant="Bean & Co" addressLines={['1 Main St']} items={RECEIPT_ITEMS} subtotalCents={1350} discountCents={100} taxCents={80} tipCents={200} totalCents={1730} tenders={TENDERS} footer="Thanks!" orderNumber="88" />
          <ReceiptViewV3 merchant="Bean & Co" items={RECEIPT_ITEMS} subtotalCents={1350} discountCents={100} taxCents={80} totalCents={1330} tenders={TENDERS} footer="Thanks!" />
          <ProductGridTileV2 name="Espresso" priceCents={350} tone="accent" selected onPress={() => undefined} />
          <ProductGridTileV2 name="Decaf" priceCents={300} soldOut onPress={() => undefined} />
          <ProductGridTileV3 name="Cortado" priceCents={400} selected onPress={() => undefined} />
          <ProductGridTileV3 name="Macchiato" priceCents={380} soldOut onPress={() => undefined} />
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

// ── V4 "register" line — smoke coverage for all 13 drop-in variants (native) ──
describe('pos V4 "register" line (native)', () => {
  it('mounts every V4 variant and honors key interactions/states', () => {
    const selected = renderThemed(<ProductGridTileV4 name="Bagel" priceCents={250} tone="accent" selected onPress={() => undefined} />, SEED_LIGHT);
    expect(selected.getByText('Bagel')).toBeTruthy();
    expect(selected.getByText('$2.50')).toBeTruthy();

    const soldOut = renderThemed(<ProductGridTileV4 name="Decaf" priceCents={300} soldOut onPress={() => undefined} />, SEED_DARK);
    expect(soldOut.getByText('Sold out')).toBeTruthy();

    // ProductGridTileV4 onPress fires.
    const onPress = jest.fn();
    const tile = renderThemed(<ProductGridTileV4 name="Chai" priceCents={420} onPress={onPress} />, SEED_LIGHT);
    fireEvent.press(tile.getByLabelText('Chai, $4.20'));
    expect(onPress).toHaveBeenCalledTimes(1);

    // PaymentMethodTileV4 onPress fires.
    const onSelect = jest.fn();
    const pay = renderThemed(<PaymentMethodTileV4 method="card" label="Visa ···4242" amountCents={1330} onPress={onSelect} />, SEED_DARK);
    fireEvent.press(pay.getByLabelText('Visa ···4242'));
    expect(onSelect).toHaveBeenCalledTimes(1);

    // The remaining V4 variants mount.
    const rest = renderThemed(
      <>
        <CartLineV4 name="Latte" quantity={2} unitPriceCents={450} modifiers={['Oat']} discountCents={50} onQuantityChange={() => undefined} onVoid={() => undefined} />
        <ReceiptViewV4 merchant="Bean & Co" items={RECEIPT_ITEMS} subtotalCents={1350} totalCents={1350} tenders={TENDERS} orderNumber="88" />
        <RegisterKeypadV4 value="12.50" displayPrefix="$" onChange={() => undefined} />
        <OrderTicketV4 orderNumber="A17" destination="Table 4" server="Sam" status="preparing" elapsed="4m ago" items={[{ name: 'Flat White', quantity: 2, modifiers: ['Oat'] }, { name: 'Croissant' }]} onBump={() => undefined} />
        <DiscountRowV4 label="Loyalty 10%" type="percent" value={10} amountCents={115} note="Member" onRemove={() => undefined} />
        <RefundRowV4 name="Croissant" quantity={1} amountCents={450} reason="damaged" status="approved" restock />
        <SplitBillRowV4 label="Guest 1" amountCents={665} itemCount={2} paidCents={0} onTogglePaid={() => undefined} />
        <CashDrawerRowV4 kind="variance" amountCents={2005} expectedCents={2000} detail="24 txns" />
        <ShiftReportV4 cashier="Sam" registerId="R2" period="9:00 AM – 5:00 PM" grossSalesCents={52000} refundsCents={1500} discountsCents={800} taxCents={4100} transactionCount={42} expectedCashCents={20000} countedCashCents={20005} breakdown={[{ method: 'card', amountCents: 40000, count: 30 }, { method: 'cash', amountCents: 12000, count: 12 }]} />
        <StatusPillV4 meta={PAYMENT_METHOD_META.card} />
      </>,
      SEED_LIGHT
    );
    expect(rest.getByText('BEAN & CO')).toBeTruthy();
    expect(rest.getAllByText('Croissant').length).toBeGreaterThan(0);
  });

  it('every rendered hex traces to a compiled token — both seeds (V4 line + gradient pieces)', () => {
    SEEDS.forEach((seed) => {
      const { root } = renderThemed(
        <>
          <ProductGridTileV4 name="Espresso" priceCents={350} tone="accent" selected onPress={() => undefined} />
          <ProductGridTileV4 name="Decaf" priceCents={300} soldOut onPress={() => undefined} />
          <CartLineV4 name="Latte" quantity={2} unitPriceCents={450} modifiers={['Oat', 'Extra shot']} note="Hot" discountCents={50} onQuantityChange={() => undefined} onVoid={() => undefined} />
          <ReceiptViewV4 merchant="Bean & Co" addressLines={['1 Main St']} items={RECEIPT_ITEMS} subtotalCents={1350} discountCents={100} taxCents={80} tipCents={200} totalCents={1730} tenders={TENDERS} footer="Thanks!" orderNumber="88" />
          <RegisterKeypadV4 value="12.50" displayPrefix="$" onChange={() => undefined} />
          {/* Gradient piece: the QuickChargeBarV4 charge button. */}
          <QuickChargeBarV4 totalCents={1730} itemCount={3} onCharge={() => undefined} />
          <PaymentMethodTileV4 method="card" selected amountCents={1730} onPress={() => undefined} />
          <PaymentMethodTileV4 method="cash" amountCents={1500} onPress={() => undefined} />
          <OrderTicketV4 orderNumber="A17" destination="Table 4" server="Sam" status="ready" elapsed="4m ago" items={[{ name: 'Flat White', quantity: 2, modifiers: ['Oat'] }, { name: 'Croissant', done: true }]} onBump={() => undefined} />
          <DiscountRowV4 label="Loyalty 10%" type="percent" value={10} amountCents={115} note="Member" onRemove={() => undefined} />
          <RefundRowV4 name="Croissant" quantity={1} amountCents={450} reason="damaged" status="processed" restock variant="selectable" selected onToggle={() => undefined} />
          <SplitBillRowV4 label="Guest 1" amountCents={665} itemCount={2} selected paidCents={200} onTogglePaid={() => undefined} />
          <CashDrawerRowV4 kind="variance" amountCents={2005} expectedCents={2000} detail="24 txns" />
          <ShiftReportV4 cashier="Sam" registerId="R2" period="9:00 AM – 5:00 PM" grossSalesCents={52000} refundsCents={1500} discountsCents={800} taxCents={4100} transactionCount={42} expectedCashCents={20000} countedCashCents={20005} breakdown={[{ method: 'card', amountCents: 40000, count: 30 }, { method: 'cash', amountCents: 12000, count: 12 }]} />
          <StatusPillV4 meta={PAYMENT_METHOD_META.card} />
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

// ── V4 new blocks — the 6 new components (native) ──
describe('pos V4 new blocks (native)', () => {
  it('mounts every new component and honors key interactions', () => {
    // TipSelector onSelectPercent fires.
    const onSelectPercent = jest.fn();
    const tip = renderThemed(
      <TipSelector subtotalCents={1150} percents={[15, 18, 20]} selectedPercent={18} onSelectPercent={onSelectPercent} onNoTip={() => undefined} onCustom={() => undefined} />,
      SEED_LIGHT
    );
    fireEvent.press(tip.getByLabelText('Tip 20%, $2.30'));
    expect(onSelectPercent).toHaveBeenCalledWith(20);

    // CheckoutSummary onCharge fires.
    const onCharge = jest.fn();
    const checkout = renderThemed(
      <CheckoutSummary subtotalCents={1150} discountCents={100} taxCents={80} tipCents={200} totalCents={1330} itemCount={3} onCharge={onCharge} />,
      SEED_DARK
    );
    fireEvent.press(checkout.getByLabelText('Charge $13.30'));
    expect(onCharge).toHaveBeenCalledTimes(1);

    // CategoryTabs onSelect fires.
    const onSelectCategory = jest.fn();
    const tabs = renderThemed(
      <CategoryTabs
        categories={[
          { id: 'coffee', label: 'Coffee', count: 12 },
          { id: 'pastry', label: 'Pastry', count: 6, tone: 'accent' },
        ]}
        selectedId="coffee"
        onSelect={onSelectCategory}
      />,
      SEED_LIGHT
    );
    fireEvent.press(tabs.getByText('Pastry'));
    expect(onSelectCategory).toHaveBeenCalledWith('pastry');
  });

  it('every rendered hex traces to a compiled token — both seeds (gradient pieces included)', () => {
    SEEDS.forEach((seed) => {
      const { root } = renderThemed(
        <>
          {/* Gradient pieces: PaymentSuccess, SalesSummary, RegisterHeader. */}
          <PaymentSuccess amountCents={1330} method="Visa ···4242" changeDueCents={170} onReceipt={() => undefined} onEmailReceipt={() => undefined} onNewSale={() => undefined} />
          <SalesSummary grossCents={52000} transactions={42} netCents={50500} refundsCents={1500} deltaPct={12.5} topItems={[{ name: 'Latte', count: 88 }, { name: 'Croissant', count: 41 }]} />
          <RegisterHeader storeName="Bean & Co" registerLabel="Register 2" cashierName="Sam" shiftOpen runningTotalCents={1330} onMenu={() => undefined} onShift={() => undefined} />
          <CheckoutSummary subtotalCents={1150} discountCents={100} taxCents={80} tipCents={200} totalCents={1330} itemCount={3} onCharge={() => undefined} />
          <TipSelector subtotalCents={1150} percents={[15, 18, 20]} selectedPercent={18} customCents={null} onSelectPercent={() => undefined} onNoTip={() => undefined} onCustom={() => undefined} />
          <CategoryTabs categories={[{ id: 'coffee', label: 'Coffee', count: 12 }, { id: 'pastry', label: 'Pastry', count: 6, tone: 'accent' }]} selectedId="coffee" onSelect={() => undefined} />
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
