/** @jest-environment jsdom */
/**
 * The **V4 beauty line** (web) — the twin of
 * `native/beauty/v4-line.native.spec.tsx`, plus the web's own answer to the
 * un-slidable divider: a real `<input type="range">`.
 */
import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
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
    expect(compareAtCents(2000, 2000)).toBeNull();
    expect(compareAtCents(2000, 1500)).toBeNull();
  });
});

describe('BeforeAfterV4', () => {
  it('overlays a real slider, which brings the keyboard model with it', () => {
    // The base offered two nudge buttons and no gesture at all.
    const { getByLabelText } = render(
      <BeforeAfterV4 position={35} onPositionChange={jest.fn()} />
    );
    const slider = getByLabelText('Comparison position') as HTMLInputElement;
    expect(slider.type).toBe('range');
    expect(slider.value).toBe('35');
    expect(slider.getAttribute('aria-valuetext')).toBe('35% After');
  });

  it('reports a new position from the slider', () => {
    const onPositionChange = jest.fn();
    const { getByLabelText } = render(
      <BeforeAfterV4 position={35} onPositionChange={onPositionChange} />
    );
    fireEvent.change(getByLabelText('Comparison position'), { target: { value: '70' } });
    expect(onPositionChange).toHaveBeenCalledWith(70);
  });

  it('keeps the nudge buttons as the coarse path', () => {
    const onPositionChange = jest.fn();
    const { getByLabelText } = render(
      <BeforeAfterV4 position={50} step={10} onPositionChange={onPositionChange} />
    );
    fireEvent.click(getByLabelText('Show more after'));
    expect(onPositionChange).toHaveBeenCalledWith(60);
  });

  it('draws no slider when there is nowhere to report to', () => {
    const { queryByLabelText } = render(<BeforeAfterV4 position={50} />);
    expect(queryByLabelText('Comparison position')).toBeNull();
  });
});

describe('AppointmentSlotV4', () => {
  it('disables a booked slot', () => {
    const { getByRole } = render(<AppointmentSlotV4 time="10:30" status="booked" />);
    expect((getByRole('button') as HTMLButtonElement).disabled).toBe(true);
  });

  it('selects an available one', () => {
    const onClick = jest.fn();
    const { getByRole } = render(<AppointmentSlotV4 time="10:30" onClick={onClick} />);
    fireEvent.click(getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });
});

describe('GiftCardRowV4 / LoyaltyCardV4', () => {
  it('shows the balance against the face value', () => {
    const { getByText } = render(<GiftCardRowV4 amountCents={5000} balanceCents={1250} />);
    expect(getByText('$12.50')).toBeTruthy();
    expect(getByText('/ $50.00')).toBeTruthy();
  });

  it('says how far to the next tier, and says so at the top', () => {
    const climbing = render(
      <LoyaltyCardV4 memberName="Ada" points={740} nextTierAt={1000} nextTierLabel="Gold" />
    );
    expect(climbing.getByText('260 to Gold')).toBeTruthy();
    climbing.unmount();

    const top = render(
      <LoyaltyCardV4 memberName="Ada" points={2000} tier="platinum" topTierLabel="Top tier" />
    );
    expect(top.getByText('Top tier')).toBeTruthy();
  });
});

describe('LookbookGridV4', () => {
  it('names a tile by position rather than by its id, and is a real list', () => {
    const { container, getByLabelText } = render(
      <LookbookGridV4 items={[{ id: 'x9f2' }, { id: 'q1' }]} onSelect={jest.fn()} />
    );
    expect(getByLabelText('Look 2 of 2')).toBeTruthy();
    expect(container.querySelectorAll('li')).toHaveLength(2);
  });

  it('shows the empty message', () => {
    const { getByText } = render(<LookbookGridV4 items={[]} emptyLabel="Nothing yet." />);
    expect(getByText('Nothing yet.')).toBeTruthy();
  });
});

describe('PriceListRowV4', () => {
  it('draws the compare-at price as a struck, announced figure', () => {
    const { container, getByLabelText } = render(
      <PriceListRowV4 label="Cut & finish" priceCents={4500} compareAtCents={6000} />
    );
    expect(container.querySelector('s')).toBeTruthy();
    expect(getByLabelText('Was $60.00')).toBeTruthy();
  });

  it('refuses a compare-at that is not higher', () => {
    const { container } = render(
      <PriceListRowV4 label="Cut" priceCents={4500} compareAtCents={4500} />
    );
    expect(container.querySelector('s')).toBeNull();
  });

  it('renders the section variant as a heading', () => {
    const { getByRole } = render(<PriceListRowV4 label="Colour" variant="section" />);
    expect(getByRole('heading', { name: 'Colour' })).toBeTruthy();
  });
});

describe('ProductRecommendationV4 / ReviewCardV4', () => {
  it('disables the add button when sold out', () => {
    const { getByRole } = render(
      <ProductRecommendationV4 name="Serum" priceCents={2400} soldOut onAdd={jest.fn()} />
    );
    expect((getByRole('button', { name: /Sold out/ }) as HTMLButtonElement).disabled).toBe(true);
  });

  it('quotes the review and attributes the reply', () => {
    const { container, getByText } = render(
      <ReviewCardV4 author="Ada" rating={5} text="Lovely." reply="Thank you!" />
    );
    expect(container.querySelector('blockquote')).toBeTruthy();
    expect(container.querySelector('cite')?.textContent).toBe('Ada');
    expect(getByText('Reply from the salon')).toBeTruthy();
  });
});

describe('SalonBookingBarV4', () => {
  it('shows the empty copy and blocks the CTA with no selection', () => {
    const { getByText, getByRole } = render(
      <SalonBookingBarV4 emptyLabel="Pick a service" onBook={jest.fn()} />
    );
    expect(getByText('Pick a service')).toBeTruthy();
    expect((getByRole('button', { name: 'Book now' }) as HTMLButtonElement).disabled).toBe(true);
  });

  it('books once a service is chosen', () => {
    const onBook = jest.fn();
    const { getByRole } = render(
      <SalonBookingBarV4 serviceName="Cut" totalCents={4500} onBook={onBook} />
    );
    fireEvent.click(getByRole('button', { name: 'Book now' }));
    expect(onBook).toHaveBeenCalled();
  });
});

describe('ServiceMenuItemV4 / StylistCardV4 / TreatmentCardV4', () => {
  it('does not make an unavailable service a button', () => {
    const { container } = render(
      <ServiceMenuItemV4 name="Balayage" priceCents={12000} unavailable onClick={jest.fn()} />
    );
    expect(container.querySelector('[role="button"]')).toBeNull();
    expect(container.querySelector('[aria-disabled="true"]')).toBeTruthy();
  });

  it('caps the specialty chips', () => {
    const { queryByText } = render(
      <StylistCardV4
        name="Ada"
        specialties={['Colour', 'Cutting', 'Extensions', 'Bridal']}
        maxSpecialties={2}
      />
    );
    expect(queryByText('Cutting')).toBeTruthy();
    expect(queryByText('Extensions')).toBeNull();
  });

  it('blocks booking a fully-booked stylist', () => {
    const { getByRole } = render(<StylistCardV4 name="Ada" fullyBooked onBook={jest.fn()} />);
    expect((getByRole('button', { name: 'Book, Ada' }) as HTMLButtonElement).disabled).toBe(true);
  });

  it('renders nothing without a treatment name', () => {
    const { container } = render(<TreatmentCardV4 name="" priceCents={9000} />);
    expect(container.firstChild).toBeNull();
  });
});
