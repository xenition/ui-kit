/**
 * The **V4 beauty line** (native) — the props V4 adds, the empty states, and
 * the finding this module exists for: `BeforeAfter` could not be slid.
 */
import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { AppointmentSlotV4 } from './AppointmentSlotV4';
import { BeforeAfterV4 } from './BeforeAfterV4';
import { GiftCardRowV4 } from './GiftCardRowV4';
import { LookbookGridV4 } from './LookbookGridV4';
import { LoyaltyCardV4 } from './LoyaltyCardV4';
import { PriceListRowV4 } from './PriceListRowV4';
import { ProductRecommendationV4 } from './ProductRecommendationV4';
import { ReviewCardV4 } from './ReviewCardV4';
import { SalonBookingBarV4 } from './SalonBookingBarV4';
import { ServiceMenuItemV4 } from './ServiceMenuItemV4';
import { StylistCardV4 } from './StylistCardV4';
import { TreatmentCardV4 } from './TreatmentCardV4';
import { compareAtCents } from './internal/salon-v4';

describe('salon-v4 compareAtCents', () => {
  it('refuses a fabricated discount', () => {
    expect(compareAtCents(2000, 3000)).toBe(3000);
    // Not higher than the price: not a discount, and not drawn.
    expect(compareAtCents(2000, 2000)).toBeNull();
    expect(compareAtCents(2000, 1500)).toBeNull();
    expect(compareAtCents(2000, undefined)).toBeNull();
  });
});

describe('AppointmentSlotV4', () => {
  it('will not select a booked slot', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <AppointmentSlotV4 time="10:30" status="booked" onPress={onPress} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText(/10:30/));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('selects an available one', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <AppointmentSlotV4 time="10:30" onPress={onPress} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText(/10:30/));
    expect(onPress).toHaveBeenCalled();
  });
});

describe('BeforeAfterV4', () => {
  it('exposes the divider as an adjustable control with a real value', () => {
    // The base offered two nudge buttons and no gesture at all.
    const { getByLabelText } = renderThemed(
      <BeforeAfterV4 position={35} onPositionChange={jest.fn()} />,
      SEED_LIGHT
    );
    const slider = getByLabelText('Before and After comparison');
    expect(slider.props.accessibilityRole).toBe('adjustable');
    expect(slider.props.accessibilityValue).toEqual({ min: 0, max: 100, now: 35 });
  });

  it('keeps the nudge buttons as the coarse path', () => {
    const onPositionChange = jest.fn();
    const { getByLabelText } = renderThemed(
      <BeforeAfterV4 position={50} step={10} onPositionChange={onPositionChange} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Show more after'));
    expect(onPositionChange).toHaveBeenCalledWith(60);
  });
});

describe('GiftCardRowV4', () => {
  it('shows the balance against the face value', () => {
    const { getByText } = renderThemed(
      <GiftCardRowV4 amountCents={5000} balanceCents={1250} />,
      SEED_LIGHT
    );
    expect(getByText('$12.50')).toBeTruthy();
    expect(getByText('/ $50.00')).toBeTruthy();
  });

  it('renders nothing without an amount', () => {
    const { toJSON } = renderThemed(
      <GiftCardRowV4 amountCents={Number.NaN} />,
      SEED_LIGHT
    );
    expect(toJSON()).toBeNull();
  });
});

describe('LookbookGridV4', () => {
  it('names a tile by position rather than by its id', () => {
    const { getByLabelText } = renderThemed(
      <LookbookGridV4 items={[{ id: 'x9f2' }, { id: 'q1' }]} onSelect={jest.fn()} />,
      SEED_LIGHT
    );
    expect(getByLabelText('Look 2 of 2')).toBeTruthy();
  });

  it('shows the empty message', () => {
    const { getByText } = renderThemed(
      <LookbookGridV4 items={[]} emptyLabel="Nothing yet." />,
      SEED_LIGHT
    );
    expect(getByText('Nothing yet.')).toBeTruthy();
  });
});

describe('LoyaltyCardV4', () => {
  it('says how far to the next tier, and says so at the top', () => {
    const climbing = renderThemed(
      <LoyaltyCardV4 memberName="Ada" points={740} nextTierAt={1000} nextTierLabel="Gold" />,
      SEED_LIGHT
    );
    expect(climbing.getByText('260 to Gold')).toBeTruthy();
    climbing.unmount();

    const top = renderThemed(
      <LoyaltyCardV4 memberName="Ada" points={2000} tier="platinum" topTierLabel="Top tier" />,
      SEED_LIGHT
    );
    expect(top.getByText('Top tier')).toBeTruthy();
  });
});

describe('PriceListRowV4', () => {
  it('draws the compare-at price, announced', () => {
    const { getByLabelText, getByText } = renderThemed(
      <PriceListRowV4 label="Cut & finish" priceCents={4500} compareAtCents={6000} />,
      SEED_LIGHT
    );
    expect(getByText('$45.00')).toBeTruthy();
    expect(getByLabelText('Was $60.00')).toBeTruthy();
  });

  it('refuses a compare-at that is not higher', () => {
    const { queryAllByText } = renderThemed(
      <PriceListRowV4 label="Cut" priceCents={4500} compareAtCents={4500} />,
      SEED_LIGHT
    );
    expect(queryAllByText('$45.00')).toHaveLength(1);
  });
});

describe('ProductRecommendationV4 / ReviewCardV4', () => {
  it('disables the add button when sold out', () => {
    const onAdd = jest.fn();
    const { getByLabelText } = renderThemed(
      <ProductRecommendationV4 name="Serum" priceCents={2400} soldOut onAdd={onAdd} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText(/Sold out, Serum/));
    expect(onAdd).not.toHaveBeenCalled();
  });

  it('attributes the salon reply', () => {
    const { getByText } = renderThemed(
      <ReviewCardV4 author="Ada" rating={5} reply="Thank you!" />,
      SEED_LIGHT
    );
    expect(getByText('Reply from the salon')).toBeTruthy();
  });
});

describe('SalonBookingBarV4', () => {
  it('shows the empty copy and blocks the CTA with no selection', () => {
    const onBook = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <SalonBookingBarV4 emptyLabel="Pick a service" onBook={onBook} />,
      SEED_LIGHT
    );
    expect(getByText('Pick a service')).toBeTruthy();
    fireEvent.press(getByLabelText('Book now'));
    expect(onBook).not.toHaveBeenCalled();
  });

  it('books once a service is chosen', () => {
    const onBook = jest.fn();
    const { getByLabelText } = renderThemed(
      <SalonBookingBarV4 serviceName="Cut" totalCents={4500} onBook={onBook} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Book now'));
    expect(onBook).toHaveBeenCalled();
  });
});

describe('ServiceMenuItemV4 / StylistCardV4 / TreatmentCardV4', () => {
  /*
    Asserted as a CONTRACT, not by firing an event.

    `fireEvent.press` resolves its handler by walking up and reading `onPress`
    off any ancestor's props — including the **composite** element, which here
    is `<ServiceMenuItemV4 onPress={…}>` itself. So a press test on this
    component measures Testing Library's lookup, not whether the component
    wired the handler. What the component actually promises is that an
    unavailable service is not a button and says it is disabled, and that is
    what this checks.
  */
  it('does not make an unavailable service pressable', () => {
    const unavailable = renderThemed(
      <ServiceMenuItemV4 name="Balayage" priceCents={12000} unavailable onPress={jest.fn()} />,
      SEED_LIGHT
    );
    const blocked = unavailable.getByLabelText(/Balayage/);
    expect(blocked.props.accessibilityRole).toBeUndefined();
    expect(blocked.props.accessibilityState).toEqual({ disabled: true });
    unavailable.unmount();

    const live = renderThemed(
      <ServiceMenuItemV4 name="Balayage" priceCents={12000} onPress={jest.fn()} />,
      SEED_LIGHT
    );
    expect(live.getByLabelText(/Balayage/).props.accessibilityRole).toBe('button');
  });

  it('caps the specialty chips', () => {
    const { queryByText } = renderThemed(
      <StylistCardV4
        name="Ada"
        specialties={['Colour', 'Cutting', 'Extensions', 'Bridal']}
        maxSpecialties={2}
      />,
      SEED_LIGHT
    );
    expect(queryByText('Cutting')).toBeTruthy();
    expect(queryByText('Extensions')).toBeNull();
  });

  it('blocks booking a fully-booked stylist', () => {
    const onBook = jest.fn();
    const { getByLabelText } = renderThemed(
      <StylistCardV4 name="Ada" fullyBooked onBook={onBook} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Book, Ada'));
    expect(onBook).not.toHaveBeenCalled();
  });

  it('renders nothing without a treatment name', () => {
    const { toJSON } = renderThemed(
      <TreatmentCardV4 name="" priceCents={9000} />,
      SEED_LIGHT
    );
    expect(toJSON()).toBeNull();
  });
});
