import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { FlightCard } from './FlightCard';
import { HotelCard } from './HotelCard';
import { ItineraryItem } from './ItineraryItem';
import { SeatPicker, type Seat } from './SeatPicker';
import { TripSummary } from './TripSummary';
import { PriceCalendar, type PriceDay } from './PriceCalendar';
import { MapCard } from './MapCard';
import { WeatherStrip } from './WeatherStrip';
import { AmenityRow } from './AmenityRow';

describe('FlightCard (native)', () => {
  it('renders route, nonstop label, and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <FlightCard
        airline="Xenition Air"
        flightNumber="XN 482"
        from={{ code: 'SFO', time: '08:15' }}
        to={{ code: 'NRT', time: '13:40' }}
        duration="10h 25m"
        stops={0}
        priceCents={78900}
        onPress={onPress}
      />,
      SEED_LIGHT
    );
    expect(getByText('SFO')).toBeTruthy();
    expect(getByText('NRT')).toBeTruthy();
    expect(getByText('Nonstop')).toBeTruthy();
    fireEvent.press(getByLabelText(/Xenition Air SFO to NRT/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('HotelCard (native)', () => {
  it('renders name, per-night price and amenity tags', () => {
    const { getByText } = renderThemed(
      <HotelCard
        name="Park Tower"
        location="Shinjuku, Tokyo"
        rating={4}
        reviewCount={321}
        priceCents={21000}
        tags={['Free Wi-Fi', 'Pool']}
      />,
      SEED_DARK
    );
    expect(getByText('Park Tower')).toBeTruthy();
    expect(getByText('/ night')).toBeTruthy();
    expect(getByText('Free Wi-Fi')).toBeTruthy();
  });
});

describe('ItineraryItem (native)', () => {
  it('announces title, time and status', () => {
    const { getByLabelText } = renderThemed(
      <ItineraryItem kind="flight" time="09:30" title="Depart SFO" status="active" />,
      SEED_LIGHT
    );
    expect(getByLabelText('Depart SFO, 09:30, active')).toBeTruthy();
  });
});

const SEATS: Seat[][] = [
  [
    { id: '1A' },
    { id: '1B', occupied: true },
    { id: '1C' },
  ],
  [{ id: '2A' }, { id: '2B' }, { id: '2C' }],
];

describe('SeatPicker (native)', () => {
  it('selects an available seat and marks accessibilityState', () => {
    const onSelect = jest.fn();
    const { getByLabelText } = renderThemed(
      <SeatPicker rows={SEATS} selectedIds={['2A']} onSelect={onSelect} />,
      SEED_LIGHT
    );
    // Selected seat carries the selected state (not color alone).
    expect(getByLabelText('Seat 2A, selected').props.accessibilityState.selected).toBe(true);
    // Occupied seat is disabled and does not fire onSelect.
    const occupied = getByLabelText('Seat 1B, occupied');
    expect(occupied.props.accessibilityState.disabled).toBe(true);
    fireEvent.press(occupied);
    expect(onSelect).not.toHaveBeenCalled();
    // Available seat fires with the seat object.
    fireEvent.press(getByLabelText('Seat 1A, available'));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect.mock.calls[0][0].id).toBe('1A');
  });
});

describe('TripSummary (native)', () => {
  it('sums line items into the total', () => {
    const { getByText } = renderThemed(
      <TripSummary
        destination="Tokyo"
        dates="Sep 3 – Sep 10"
        travelers={2}
        items={[
          { label: 'Flights', cents: 120000 },
          { label: 'Hotel', cents: 84000 },
        ]}
      />,
      SEED_LIGHT
    );
    expect(getByText('Tokyo')).toBeTruthy();
    expect(getByText('$2,040.00')).toBeTruthy();
  });
});

const DAYS: PriceDay[] = [
  { date: '2026-09-01', label: 'Tue 1', cents: 41000 },
  { date: '2026-09-02', label: 'Wed 2', cents: 29900 },
  { date: '2026-09-03', label: 'Thu 3' },
];

describe('PriceCalendar (native)', () => {
  it('flags the cheapest day and fires onSelectDay for available days', () => {
    const onSelectDay = jest.fn();
    const { getByLabelText } = renderThemed(
      <PriceCalendar days={DAYS} columns={3} onSelectDay={onSelectDay} />,
      SEED_DARK
    );
    // The cheapest available day is announced.
    const cheapest = getByLabelText(/2026-09-02.*cheapest/);
    fireEvent.press(cheapest);
    expect(onSelectDay).toHaveBeenCalledTimes(1);
    // Unavailable day is disabled.
    expect(getByLabelText(/2026-09-03, unavailable/).props.accessibilityState.disabled).toBe(true);
  });
});

describe('MapCard (native, dependency-free)', () => {
  it('renders a static pin placeholder', () => {
    const { getByTestId, getByText } = renderThemed(
      <MapCard label="Hotel Park Tower" caption="Shinjuku" pin={{ x: 0.4, y: 0.6 }} />,
      SEED_LIGHT
    );
    expect(getByTestId('xen-map-pin')).toBeTruthy();
    expect(getByText('Hotel Park Tower')).toBeTruthy();
  });
});

describe('WeatherStrip + AmenityRow (native)', () => {
  it('renders forecast tiles and amenity availability glyphs', () => {
    const { getByLabelText } = renderThemed(
      <>
        <WeatherStrip
          days={[{ day: 'Mon', glyph: '☀️', high: 24, low: 15, condition: 'Sunny' }]}
          highlightIndex={0}
        />
        <AmenityRow amenities={[{ label: 'Wi-Fi', available: true }, { label: 'Parking', available: false }]} />
      </>,
      SEED_LIGHT
    );
    expect(getByLabelText(/Mon today, Sunny, high 24/)).toBeTruthy();
    expect(getByLabelText('Parking, unavailable')).toBeTruthy();
  });
});

describe('token purity (native travel, both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <FlightCard
            airline="Xenition Air"
            from={{ code: 'SFO', time: '08:15' }}
            to={{ code: 'NRT', time: '13:40' }}
            duration="10h 25m"
            stops={1}
            priceCents={78900}
          />
          <HotelCard name="Park Tower" rating={4} priceCents={21000} tags={['Pool']} />
          <ItineraryItem kind="hotel" title="Check in" status="done" />
          <SeatPicker rows={SEATS} selectedIds={['2A']} />
          <TripSummary destination="Tokyo" items={[{ label: 'Flights', cents: 120000 }]} />
          <PriceCalendar days={DAYS} columns={3} selectedDate="2026-09-01" />
          <MapCard label="Park Tower" />
          <WeatherStrip days={[{ day: 'Mon', high: 24, low: 15 }]} highlightIndex={0} scrollEnabled={false} />
          <AmenityRow amenities={[{ label: 'Wi-Fi' }, { label: 'Gym', available: false }]} />
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
