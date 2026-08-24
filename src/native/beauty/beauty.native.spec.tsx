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
  ServiceMenuItem,
  StylistCard,
  AppointmentSlot,
  BeforeAfter,
  TreatmentCard,
  LoyaltyCard,
  ProductRecommendation,
  SalonBookingBar,
  ReviewCard,
  LookbookGrid,
  PriceListRow,
  GiftCardRow,
} from './index';

describe('ServiceMenuItem (native)', () => {
  it('renders name + price and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <ServiceMenuItem name="Balayage & tone" priceCents={12000} category="hair" durationMin={120} popular onPress={onPress} />,
      SEED_LIGHT
    );
    expect(getByText('Balayage & tone')).toBeTruthy();
    expect(getByText('$120.00')).toBeTruthy();
    expect(getByText('Popular')).toBeTruthy();
    fireEvent.press(getByLabelText(/Balayage & tone, Hair, 120 minutes, \$120\.00/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not fire when unavailable', () => {
    const onPress = jest.fn();
    const { getByText } = renderThemed(
      <ServiceMenuItem name="Keratin" priceCents={9000} unavailable onPress={onPress} />,
      SEED_DARK
    );
    fireEvent.press(getByText('Keratin'));
    expect(onPress).not.toHaveBeenCalled();
  });
});

describe('StylistCard (native)', () => {
  it('renders name/role, a token-colored specialty chip, and books', () => {
    const onBook = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <StylistCard name="Ana Ruiz" role="Senior Colorist" specialties={['Balayage']} rating={4.8} reviewCount={210} priceFromCents={8000} onBook={onBook} />,
      SEED_LIGHT
    );
    expect(getByText('Ana Ruiz')).toBeTruthy();
    expect(getByText('Senior Colorist')).toBeTruthy();
    const chip = getByText('Balayage');
    const allowed = tokenHexSet(SEED_LIGHT);
    const color = (chip.props.style as { color?: string }).color?.toLowerCase();
    expect(color && allowed.has(color)).toBe(true);
    fireEvent.press(getByText('Book'));
    expect(onBook).toHaveBeenCalledTimes(1);
    expect(getByLabelText(/Ana Ruiz, Senior Colorist, rated 4.8 out of 5/)).toBeTruthy();
  });

  it('shows a loading skeleton', () => {
    const { getByLabelText } = renderThemed(<StylistCard name="Ana" loading />, SEED_DARK);
    expect(getByLabelText('Loading stylist')).toBeTruthy();
  });

  it('disables the CTA when fully booked', () => {
    const onBook = jest.fn();
    const { getByText } = renderThemed(<StylistCard name="Ivy" fullyBooked onBook={onBook} />, SEED_LIGHT);
    fireEvent.press(getByText('Fully booked'));
    expect(onBook).not.toHaveBeenCalled();
  });
});

describe('AppointmentSlot (native)', () => {
  it('announces status, is selectable, and blocks booked slots', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <AppointmentSlot time="9:30 AM" status="available" meta="45 min" onPress={onPress} />,
      SEED_LIGHT
    );
    const node = getByLabelText('9:30 AM, 45 min, available');
    expect(node.props.accessibilityState.selected).toBe(false);
    fireEvent.press(node);
    expect(onPress).toHaveBeenCalledTimes(1);

    const booked = jest.fn();
    const two = renderThemed(<AppointmentSlot time="10:00 AM" status="booked" onPress={booked} />, SEED_DARK);
    const bookedNode = two.getByLabelText('10:00 AM, booked');
    expect(bookedNode.props.accessibilityState.disabled).toBe(true);
    fireEvent.press(bookedNode);
    expect(booked).not.toHaveBeenCalled();
  });
});

describe('BeforeAfter (native)', () => {
  it('nudges split position and toggles in toggle mode', () => {
    const onPositionChange = jest.fn();
    const split = renderThemed(
      <BeforeAfter beforeUrl="b.jpg" afterUrl="a.jpg" position={50} onPositionChange={onPositionChange} />,
      SEED_LIGHT
    );
    fireEvent.press(split.getByLabelText('Show more after'));
    expect(onPositionChange).toHaveBeenCalledWith(60);

    const toggle = renderThemed(<BeforeAfter variant="toggle" beforeUrl="b.jpg" afterUrl="a.jpg" />, SEED_DARK);
    expect(toggle.getByLabelText(/Showing Before/)).toBeTruthy();
    fireEvent.press(toggle.getByLabelText(/Showing Before/));
    expect(toggle.getByLabelText(/Showing After/)).toBeTruthy();
  });
});

describe('LoyaltyCard (native)', () => {
  it('renders points in a token color with progress caption', () => {
    const { getByText } = renderThemed(
      <LoyaltyCard memberName="Jo Kim" points={320} tier="gold" nextTierAt={500} nextTierLabel="Platinum" />,
      SEED_LIGHT
    );
    const number = getByText('320');
    const allowed = tokenHexSet(SEED_LIGHT);
    const color = (number.props.style as { color?: string }).color?.toLowerCase();
    expect(color && allowed.has(color)).toBe(true);
    expect(getByText('180 points to Platinum')).toBeTruthy();
  });

  it('shows a top-tier note when no target', () => {
    const { getByText } = renderThemed(<LoyaltyCard memberName="Max" points={9000} tier="platinum" />, SEED_DARK);
    expect(getByText('Top tier reached')).toBeTruthy();
  });
});

describe('SalonBookingBar (native)', () => {
  it('books when a service is selected', () => {
    const onBook = jest.fn();
    const { getByText } = renderThemed(
      <SalonBookingBar serviceName="Balayage" totalCents={12000} detail="with Ana · Today 3:00 PM" onBook={onBook} />,
      SEED_LIGHT
    );
    expect(getByText('$120.00')).toBeTruthy();
    fireEvent.press(getByText('Book now'));
    expect(onBook).toHaveBeenCalledTimes(1);
  });

  it('renders the empty prompt and disables the CTA', () => {
    const onBook = jest.fn();
    const { getByText } = renderThemed(<SalonBookingBar onBook={onBook} />, SEED_DARK);
    expect(getByText('Select a service to book')).toBeTruthy();
    fireEvent.press(getByText('Book now'));
    expect(onBook).not.toHaveBeenCalled();
  });
});

describe('ReviewCard (native)', () => {
  it('renders author, verified badge, and service chip', () => {
    const { getByText, getByLabelText } = renderThemed(
      <ReviewCard author="Priya S." rating={5} text="Loved my color!" service="Balayage" date="2 weeks ago" verified />,
      SEED_LIGHT
    );
    expect(getByText('Priya S.')).toBeTruthy();
    expect(getByText('✓ Verified')).toBeTruthy();
    expect(getByText('Balayage')).toBeTruthy();
    expect(getByLabelText(/Review by Priya S\., 5 out of 5 stars, verified/)).toBeTruthy();
  });
});

describe('LookbookGrid (native)', () => {
  it('selects a tile and renders the empty state', () => {
    const onSelect = jest.fn();
    const { getByLabelText } = renderThemed(
      <LookbookGrid
        items={[
          { id: 'a', label: 'Soft waves', tag: 'Ana' },
          { id: 'b', label: 'Bob cut' },
        ]}
        onSelect={onSelect}
      />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Soft waves'));
    expect(onSelect).toHaveBeenCalledWith('a');

    const empty = renderThemed(<LookbookGrid items={[]} emptyLabel="No looks yet" />, SEED_DARK);
    expect(empty.getByText('No looks yet')).toBeTruthy();
  });
});

describe('PriceListRow / GiftCardRow (native)', () => {
  it('renders a price row and a status-badged gift card', () => {
    const price = renderThemed(
      <PriceListRow label="Women's cut" priceCents={6500} durationMin={45} fromPrice />,
      SEED_LIGHT
    );
    expect(price.getByText("Women's cut")).toBeTruthy();
    expect(price.getByText('from $65.00')).toBeTruthy();

    const onPress = jest.fn();
    const gift = renderThemed(
      <GiftCardRow amountCents={10000} balanceCents={4000} status="active" code="•••• 1234" expires="Exp 12/26" onPress={onPress} />,
      SEED_DARK
    );
    expect(gift.getByText('$40.00')).toBeTruthy();
    expect(gift.getByText('of $100.00')).toBeTruthy();
    expect(gift.getByText('Active')).toBeTruthy();
    fireEvent.press(gift.getByLabelText(/Gift card \$40\.00 of \$100\.00, Active/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('ProductRecommendation (native)', () => {
  it('adds to bag and reflects the sold-out state', () => {
    const onAdd = jest.fn();
    const { getByText } = renderThemed(
      <ProductRecommendation name="Bond repair mask" brand="Olaplex" priceCents={2800} rating={4.7} reason="Pairs with your color" onAdd={onAdd} />,
      SEED_LIGHT
    );
    expect(getByText('Olaplex')).toBeTruthy();
    fireEvent.press(getByText('Add'));
    expect(onAdd).toHaveBeenCalledTimes(1);

    const soldOut = renderThemed(
      <ProductRecommendation name="Serum" priceCents={3200} soldOut onAdd={() => {}} />,
      SEED_DARK
    );
    expect(soldOut.getByText('Sold out')).toBeTruthy();
  });
});

describe('token purity (native beauty, both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <ServiceMenuItem name="Cut" priceCents={5000} category="hair" durationMin={45} popular onPress={() => {}} />
          <StylistCard name="Ana Ruiz" role="Colorist" specialties={['Balayage', 'Bridal']} rating={4.8} reviewCount={90} priceFromCents={8000} availability="Next: Today 3pm" onBook={() => {}} />
          <AppointmentSlot time="9:30 AM" status="selected" onPress={() => {}} />
          <AppointmentSlot time="10:00 AM" status="held" />
          <BeforeAfter beforeUrl="b.jpg" afterUrl="a.jpg" position={40} onPositionChange={() => {}} />
          <TreatmentCard name="Deep facial" priceCents={9000} variant="facial" durationMin={60} description="Glow" onBook={() => {}} />
          <LoyaltyCard memberName="Jo" points={320} tier="gold" nextTierAt={500} nextTierLabel="Platinum" memberId="#4821" />
          <ProductRecommendation name="Mask" brand="Olaplex" priceCents={2800} rating={4.7} reason="Great" added onAdd={() => {}} />
          <SalonBookingBar serviceName="Balayage" totalCents={12000} detail="with Ana" onBook={() => {}} />
          <ReviewCard author="Priya" rating={5} text="Loved it" service="Balayage" verified reply="Thank you!" />
          <LookbookGrid items={[{ id: 'a', label: 'Waves', tag: 'Ana', imageUrl: 'x.jpg' }, { id: 'b', label: 'Bob' }]} onSelect={() => {}} />
          <PriceListRow variant="section" label="Color" />
          <PriceListRow label="Full head" priceCents={14000} compareAtCents={16000} durationMin={120} />
          <GiftCardRow amountCents={10000} balanceCents={4000} status="expired" code="•••• 1234" expires="Exp 12/26" note="From Sam" onPress={() => {}} />
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
