/** @jest-environment jsdom */
import { render, fireEvent } from '@testing-library/react';
import { FlightCard } from './FlightCard';
import { HotelCard } from './HotelCard';
import { ItineraryItem } from './ItineraryItem';
import { SeatPicker, type Seat } from './SeatPicker';
import { TripSummary } from './TripSummary';
import { PriceCalendar, type PriceDay } from './PriceCalendar';
import { MapCard } from './MapCard';
import { WeatherStrip } from './WeatherStrip';
import { AmenityRow } from './AmenityRow';

describe('FlightCard (web)', () => {
  it('renders the route + nonstop label with token classes and fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, getByRole, container } = render(
      <FlightCard
        airline="Xenition Air"
        flightNumber="XN 482"
        from={{ code: 'SFO', time: '08:15' }}
        to={{ code: 'NRT', time: '13:40' }}
        duration="10h 25m"
        stops={0}
        priceCents={78900}
        onClick={onClick}
      />
    );
    expect(getByText('SFO')).toBeTruthy();
    expect(getByText('NRT')).toBeTruthy();
    expect(getByText('Nonstop')).toBeTruthy();
    // Token class only — no literal colors.
    const root = container.querySelector('[data-xen-flight-card]');
    expect(root?.className).toContain('bg-surface');
    expect(root?.className).toContain('border-border');
    fireEvent.click(getByRole('button', { name: /Xenition Air SFO to NRT/ }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('HotelCard (web)', () => {
  it('renders name, per-night price and amenity tags', () => {
    const { getByText } = render(
      <HotelCard
        name="Park Tower"
        location="Shinjuku, Tokyo"
        rating={4}
        reviewCount={321}
        priceCents={21000}
        tags={['Free Wi-Fi', 'Pool']}
      />
    );
    expect(getByText('Park Tower')).toBeTruthy();
    expect(getByText('/ night')).toBeTruthy();
    expect(getByText('Free Wi-Fi')).toBeTruthy();
  });
});

describe('ItineraryItem (web)', () => {
  it('announces title, time and status', () => {
    const { getByLabelText } = render(
      <ItineraryItem kind="flight" time="09:30" title="Depart SFO" status="active" />
    );
    expect(getByLabelText('Depart SFO, 09:30, active')).toBeTruthy();
  });
});

const SEATS: Seat[][] = [
  [{ id: '1A' }, { id: '1B', occupied: true }, { id: '1C' }],
  [{ id: '2A' }, { id: '2B' }, { id: '2C' }],
];

describe('SeatPicker (web)', () => {
  it('marks aria-pressed/aria-disabled and toggles only available seats', () => {
    const onSelect = jest.fn();
    const { getByLabelText } = render(
      <SeatPicker rows={SEATS} selectedIds={['2A']} onSelect={onSelect} />
    );
    // Selected seat carries aria-pressed (not color alone).
    const selectedSeat = getByLabelText('Seat 2A, selected');
    expect(selectedSeat.getAttribute('aria-pressed')).toBe('true');
    // Occupied seat is disabled and does not fire onSelect.
    const occupied = getByLabelText('Seat 1B, occupied');
    expect(occupied.getAttribute('aria-disabled')).toBe('true');
    expect((occupied as HTMLButtonElement).disabled).toBe(true);
    fireEvent.click(occupied);
    expect(onSelect).not.toHaveBeenCalled();
    // Available seat fires with the seat object.
    fireEvent.click(getByLabelText('Seat 1A, available'));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect.mock.calls[0][0].id).toBe('1A');
  });
});

describe('TripSummary (web)', () => {
  it('sums line items into the total', () => {
    const { getByText } = render(
      <TripSummary
        destination="Tokyo"
        dates="Sep 3 – Sep 10"
        travelers={2}
        items={[
          { label: 'Flights', cents: 120000 },
          { label: 'Hotel', cents: 84000 },
        ]}
      />
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

describe('PriceCalendar (web)', () => {
  it('flags the cheapest day and fires onSelectDay for available days', () => {
    const onSelectDay = jest.fn();
    const { getByLabelText } = render(<PriceCalendar days={DAYS} columns={3} onSelectDay={onSelectDay} />);
    const cheapest = getByLabelText(/2026-09-02.*cheapest/);
    fireEvent.click(cheapest);
    expect(onSelectDay).toHaveBeenCalledTimes(1);
    // Unavailable day is disabled.
    const unavailable = getByLabelText(/2026-09-03, unavailable/);
    expect((unavailable as HTMLButtonElement).disabled).toBe(true);
  });
});

describe('MapCard (web, dependency-free)', () => {
  it('renders a static pin placeholder with a token frame', () => {
    const { getByTestId, getByText, container } = render(
      <MapCard label="Hotel Park Tower" caption="Shinjuku" pin={{ x: 0.4, y: 0.6 }} />
    );
    expect(getByTestId('xen-map-pin')).toBeTruthy();
    expect(getByText('Hotel Park Tower')).toBeTruthy();
    expect(container.querySelector('[data-xen-map-card]')?.className).toContain('border-border');
  });
});

describe('WeatherStrip + AmenityRow (web)', () => {
  it('renders forecast tiles and amenity availability glyphs', () => {
    const { getByLabelText } = render(
      <>
        <WeatherStrip
          days={[{ day: 'Mon', glyph: '☀️', high: 24, low: 15, condition: 'Sunny' }]}
          highlightIndex={0}
        />
        <AmenityRow amenities={[{ label: 'Wi-Fi', available: true }, { label: 'Parking', available: false }]} />
      </>
    );
    expect(getByLabelText(/Mon today, Sunny, high 24/)).toBeTruthy();
    expect(getByLabelText('Parking, unavailable')).toBeTruthy();
  });
});
