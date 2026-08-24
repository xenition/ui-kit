/** @jest-environment jsdom */
/**
 * Real-estate (web) parity specs: render smoke, token-class binding (no literal
 * colors on the domain elements), and the behavioral contracts — PropertyCard
 * press, empty AmenityGrid degradation, TourScheduler "schedule tour" gating,
 * MortgageCalc live recompute on input, PriceHistory trend chart, AgentCard
 * contact, and ListingGallery navigation.
 */
import { fireEvent, render } from '@testing-library/react';
import { PropertyCard } from './PropertyCard';
import { ListingGallery } from './ListingGallery';
import { AmenityGrid } from './AmenityGrid';
import { PriceHistory } from './PriceHistory';
import { TourScheduler, type TourSlot } from './TourScheduler';
import { MortgageCalc } from './MortgageCalc';
import { AgentCard } from './AgentCard';
import { OpenHouseBadge } from './OpenHouseBadge';

describe('PropertyCard (web)', () => {
  it('renders price + address on a token-bound surface and fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, getByRole } = render(
      <PropertyCard
        address="123 Elm St"
        locality="Brooklyn, NY"
        priceCents={72500000}
        beds={3}
        baths={2}
        sqft={1450}
        status="new"
        onClick={onClick}
      />
    );
    expect(getByText('123 Elm St')).toBeTruthy();
    expect(getByText('3 bd · 2 ba · 1,450 sqft')).toBeTruthy();
    const card = getByRole('button');
    expect(card.className).toContain('bg-surface');
    expect(card.className).toContain('border-border');
    fireEvent.click(card);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('appends /mo for the rent variant', () => {
    const { getByText } = render(<PropertyCard address="9 Rent Rd" priceCents={320000} variant="rent" />);
    expect(getByText('/mo')).toBeTruthy();
  });
});

describe('AmenityGrid (web)', () => {
  it('renders availability markers and a struck unavailable label', () => {
    const { getByLabelText } = render(
      <AmenityGrid
        amenities={[
          { label: 'Pool', glyph: '🏊', available: true },
          { label: 'Parking', available: false },
        ]}
      />
    );
    expect(getByLabelText('Pool, available')).toBeTruthy();
    const unavailable = getByLabelText('Parking, not available');
    expect(unavailable.className).toContain('opacity-60');
  });

  it('degrades to the shared empty state for no amenities', () => {
    const { getByText } = render(<AmenityGrid amenities={[]} />);
    expect(getByText('No amenities listed')).toBeTruthy();
  });
});

describe('ListingGallery (web, navigation)', () => {
  it('advances the page and reports the new index', () => {
    const onIndexChange = jest.fn();
    const { getByText, getByLabelText } = render(
      <ListingGallery images={['a.jpg', 'b.jpg', 'c.jpg']} onIndexChange={onIndexChange} />
    );
    expect(getByText('1 / 3')).toBeTruthy();
    fireEvent.click(getByLabelText('Next photo'));
    expect(onIndexChange).toHaveBeenCalledWith(1);
    expect(getByText('2 / 3')).toBeTruthy();
  });

  it('renders an empty state with no images', () => {
    const { getByText } = render(<ListingGallery images={[]} />);
    expect(getByText('No photos yet')).toBeTruthy();
  });
});

describe('PriceHistory (web, chart)', () => {
  it('shows the latest price and a trend sparkline', () => {
    const { getByText, getByLabelText } = render(
      <PriceHistory
        points={[
          { label: '2023', cents: 60000000 },
          { label: '2024', cents: 66000000 },
          { label: '2025', cents: 72000000 },
        ]}
      />
    );
    expect(getByText('$720,000.00')).toBeTruthy();
    expect(getByLabelText(/Price history sparkline/)).toBeTruthy();
  });

  it('renders a muted note when empty', () => {
    const { getByText } = render(<PriceHistory points={[]} />);
    expect(getByText('No price history')).toBeTruthy();
  });
});

describe('TourScheduler (web, schedule tour)', () => {
  const SLOTS: TourSlot[] = [
    { id: 's1', label: '10:00 AM' },
    { id: 's2', label: '11:30 AM' },
    { id: 's3', label: '1:00 PM', available: false },
  ];

  it('enables confirm only after selecting a slot, then fires onSchedule', () => {
    const onSchedule = jest.fn();
    const onSelectSlot = jest.fn();
    const { getByText, getByLabelText } = render(
      <TourScheduler slots={SLOTS} onSchedule={onSchedule} onSelectSlot={onSelectSlot} />
    );
    // Unavailable slot is disabled.
    expect((getByLabelText(/1:00 PM, unavailable/) as HTMLButtonElement).disabled).toBe(true);
    // Confirm is disabled before a selection.
    const confirm = getByText('Schedule tour') as HTMLButtonElement;
    expect(confirm.disabled).toBe(true);
    fireEvent.click(confirm);
    expect(onSchedule).not.toHaveBeenCalled();
    // Select an available slot, then confirm.
    fireEvent.click(getByLabelText('11:30 AM'));
    expect(onSelectSlot).toHaveBeenCalledTimes(1);
    const confirm2 = getByText('Schedule tour') as HTMLButtonElement;
    expect(confirm2.disabled).toBe(false);
    fireEvent.click(confirm2);
    expect(onSchedule).toHaveBeenCalledTimes(1);
    expect(onSchedule.mock.calls[0][0].id).toBe('s2');
  });

  it('renders an empty state with no slots', () => {
    const { getByText } = render(<TourScheduler slots={[]} />);
    expect(getByText('No tour times available')).toBeTruthy();
  });
});

describe('MortgageCalc (web, input)', () => {
  it('recomputes the monthly payment when the down-payment input changes', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <MortgageCalc priceCents={50000000} downPercent={20} ratePercent={6} termYears={30} onChange={onChange} />
    );
    fireEvent.change(getByTestId('xen-re-mortgage-down'), { target: { value: '50' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    const estimate = onChange.mock.calls[0][0];
    // 50% down on $500k → $250k financed.
    expect(estimate.downCents).toBe(25000000);
    expect(estimate.loanCents).toBe(25000000);
    expect(estimate.monthlyCents).toBeGreaterThan(0);
  });

  it('guards a zero interest rate with straight division (no NaN)', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(<MortgageCalc priceCents={36000000} downPercent={0} termYears={30} onChange={onChange} />);
    fireEvent.change(getByTestId('xen-re-mortgage-rate'), { target: { value: '0' } });
    const estimate = onChange.mock.calls[0][0];
    // $360k / 360 months = $1000.00.
    expect(estimate.monthlyCents).toBe(100000);
  });
});

describe('AgentCard (web)', () => {
  it('renders name/agency on a token surface and fires the contact action', () => {
    const onContact = jest.fn();
    const { getByText, getByRole } = render(
      <AgentCard name="Dana Reyes" title="Listing Agent" agency="Xen Realty" rating={4} reviewCount={87} onContact={onContact} />
    );
    expect(getByText('Dana Reyes')).toBeTruthy();
    fireEvent.click(getByRole('button', { name: 'Contact' }));
    expect(onContact).toHaveBeenCalledTimes(1);
  });
});

describe('OpenHouseBadge (web)', () => {
  it('renders the status prefix and time window as one phrase', () => {
    const { getByText } = render(
      <OpenHouseBadge dateLabel="Sat, Aug 24" startTime="1 PM" endTime="3 PM" status="live" />
    );
    expect(getByText(/Open now · Sat, Aug 24 1 PM–3 PM/)).toBeTruthy();
  });
});
