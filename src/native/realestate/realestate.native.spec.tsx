import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { PropertyCard } from './PropertyCard';
import { ListingGallery } from './ListingGallery';
import { AmenityGrid } from './AmenityGrid';
import { PriceHistory } from './PriceHistory';
import { MapPinCard } from './MapPinCard';
import { TourScheduler, type TourSlot } from './TourScheduler';
import { MortgageCalc } from './MortgageCalc';
import { AgentCard } from './AgentCard';
import { FloorPlanView } from './FloorPlanView';
import { OpenHouseBadge } from './OpenHouseBadge';
import { ComparableRow } from './ComparableRow';

describe('PropertyCard (native)', () => {
  it('renders sale price + address and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <PropertyCard
        address="123 Elm St"
        locality="Brooklyn, NY"
        priceCents={72500000}
        beds={3}
        baths={2}
        sqft={1450}
        status="new"
        onPress={onPress}
      />,
      SEED_LIGHT
    );
    expect(getByText('123 Elm St')).toBeTruthy();
    expect(getByText('3 bd · 2 ba · 1,450 sqft')).toBeTruthy();
    fireEvent.press(getByLabelText(/123 Elm St/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('appends /mo for the rent variant', () => {
    const { getByText } = renderThemed(
      <PropertyCard address="9 Rent Rd" priceCents={320000} variant="rent" />,
      SEED_DARK
    );
    expect(getByText('/mo')).toBeTruthy();
  });
});

describe('ListingGallery (native, swipe)', () => {
  const IMAGES = ['a.jpg', 'b.jpg', 'c.jpg'];

  it('reports the new page index on scroll and updates the counter', () => {
    const onIndexChange = jest.fn();
    const { getByTestId, getByText } = renderThemed(
      <ListingGallery images={IMAGES} onIndexChange={onIndexChange} />,
      SEED_LIGHT
    );
    expect(getByText('1 / 3')).toBeTruthy();
    fireEvent.scroll(getByTestId('xen-re-gallery-scroll'), {
      nativeEvent: {
        contentOffset: { x: 300, y: 0 },
        layoutMeasurement: { width: 300, height: 220 },
        contentSize: { width: 900, height: 220 },
      },
    });
    expect(onIndexChange).toHaveBeenCalledWith(1);
    expect(getByText('2 / 3')).toBeTruthy();
  });

  it('renders an empty state with no images', () => {
    const { getByText } = renderThemed(<ListingGallery images={[]} />, SEED_DARK);
    expect(getByText('No photos yet')).toBeTruthy();
  });
});

describe('AmenityGrid (native)', () => {
  it('renders availability markers and a struck unavailable label', () => {
    const { getByLabelText } = renderThemed(
      <AmenityGrid
        amenities={[
          { label: 'Pool', glyph: '🏊', available: true },
          { label: 'Parking', available: false },
        ]}
      />,
      SEED_LIGHT
    );
    expect(getByLabelText('Pool, available')).toBeTruthy();
    expect(getByLabelText('Parking, not available')).toBeTruthy();
  });

  it('degrades to an empty state for no amenities', () => {
    const { getByText } = renderThemed(<AmenityGrid amenities={[]} />, SEED_DARK);
    expect(getByText('No amenities listed')).toBeTruthy();
  });
});

describe('PriceHistory (native, chart)', () => {
  it('shows the latest price and a trend sparkline', () => {
    const { getByText, getByLabelText } = renderThemed(
      <PriceHistory
        points={[
          { label: '2023', cents: 60000000 },
          { label: '2024', cents: 66000000 },
          { label: '2025', cents: 72000000 },
        ]}
      />,
      SEED_LIGHT
    );
    expect(getByText('$720,000.00')).toBeTruthy();
    expect(getByLabelText(/Price history sparkline/)).toBeTruthy();
  });

  it('renders a muted note when empty', () => {
    const { getByText } = renderThemed(<PriceHistory points={[]} />, SEED_DARK);
    expect(getByText('No price history')).toBeTruthy();
  });
});

describe('MapPinCard (native, dependency-free)', () => {
  it('renders a static pin placeholder — no map dependency', () => {
    const { getByTestId, getByText } = renderThemed(
      <MapPinCard address="123 Elm St" caption="Cobble Hill" pin={{ x: 0.3, y: 0.7 }} />,
      SEED_LIGHT
    );
    expect(getByTestId('xen-re-map-pin')).toBeTruthy();
    expect(getByText('123 Elm St')).toBeTruthy();
  });
});

describe('TourScheduler (native, schedule tour)', () => {
  const SLOTS: TourSlot[] = [
    { id: 's1', label: '10:00 AM' },
    { id: 's2', label: '11:30 AM' },
    { id: 's3', label: '1:00 PM', available: false },
  ];

  it('enables confirm only after selecting a slot, then fires onSchedule', () => {
    const onSchedule = jest.fn();
    const onSelectSlot = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <TourScheduler slots={SLOTS} onSchedule={onSchedule} onSelectSlot={onSelectSlot} />,
      SEED_LIGHT
    );
    // Unavailable slot is disabled and does not select.
    expect(getByLabelText(/1:00 PM, unavailable/).props.accessibilityState.disabled).toBe(true);
    // Confirm is disabled before a selection.
    const confirm = getByText('Schedule tour');
    fireEvent.press(confirm);
    expect(onSchedule).not.toHaveBeenCalled();
    // Select an available slot, then confirm.
    fireEvent.press(getByLabelText('11:30 AM'));
    expect(onSelectSlot).toHaveBeenCalledTimes(1);
    fireEvent.press(getByText('Schedule tour'));
    expect(onSchedule).toHaveBeenCalledTimes(1);
    expect(onSchedule.mock.calls[0][0].id).toBe('s2');
  });

  it('renders an empty state with no slots', () => {
    const { getByText } = renderThemed(<TourScheduler slots={[]} />, SEED_DARK);
    expect(getByText('No tour times available')).toBeTruthy();
  });
});

describe('MortgageCalc (native, input)', () => {
  it('recomputes the monthly payment when the down-payment input changes', () => {
    const onChange = jest.fn();
    const { getByTestId } = renderThemed(
      <MortgageCalc priceCents={50000000} downPercent={20} ratePercent={6} termYears={30} onChange={onChange} />,
      SEED_LIGHT
    );
    fireEvent.changeText(getByTestId('xen-re-mortgage-down'), '50');
    expect(onChange).toHaveBeenCalledTimes(1);
    const estimate = onChange.mock.calls[0][0];
    // 50% down on $500k → $250k financed.
    expect(estimate.downCents).toBe(25000000);
    expect(estimate.loanCents).toBe(25000000);
    expect(estimate.monthlyCents).toBeGreaterThan(0);
  });
});

describe('AgentCard (native)', () => {
  it('renders name/agency and fires the contact action', () => {
    const onContact = jest.fn();
    const { getByText } = renderThemed(
      <AgentCard name="Dana Reyes" title="Listing Agent" agency="Xen Realty" rating={4} reviewCount={87} onContact={onContact} />,
      SEED_DARK
    );
    expect(getByText('Dana Reyes')).toBeTruthy();
    fireEvent.press(getByText('Contact'));
    expect(onContact).toHaveBeenCalledTimes(1);
  });
});

describe('token purity (native realestate, both seeds)', () => {
  const SLOTS: TourSlot[] = [
    { id: 's1', label: '10:00 AM' },
    { id: 's2', label: '1:00 PM', available: false },
  ];

  it('every rendered hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <PropertyCard address="123 Elm St" priceCents={72500000} beds={3} baths={2} sqft={1450} status="active" />
          <ListingGallery images={['a.jpg', 'b.jpg']} />
          <AmenityGrid amenities={[{ label: 'Pool' }, { label: 'Gym', available: false }]} />
          <AmenityGrid amenities={[]} />
          <PriceHistory points={[{ cents: 60000000 }, { cents: 72000000 }]} />
          <MapPinCard address="123 Elm St" caption="Cobble Hill" />
          <TourScheduler slots={SLOTS} selectedId="s1" />
          <MortgageCalc priceCents={50000000} />
          <AgentCard name="Dana Reyes" agency="Xen Realty" rating={4} onContact={() => {}} />
          <FloorPlanView rooms={[{ label: 'Kitchen', x: 0, y: 0, w: 0.5, h: 0.5 }]} />
          <FloorPlanView rooms={[]} />
          <OpenHouseBadge dateLabel="Sat, Aug 24" startTime="1 PM" endTime="3 PM" status="live" />
          <ComparableRow address="10 Oak Ave" priceCents={68000000} sqft={1400} beds={3} baths={2} distance="0.3 mi" status="sold" />
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
