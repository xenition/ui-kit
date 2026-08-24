/** @jest-environment jsdom */
/**
 * Automotive (web parity) components: render smoke under the compiled theme,
 * token-purity (no hex/rgb in classNames), and the behavioral contracts
 * (accept/decline, card press, star rating, parking selection, empty state).
 */
import { fireEvent, render } from '@testing-library/react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { installMatchMedia } from '../spec-support/mock-io';
import {
  RideRequestCard,
  DriverCard,
  TripRoute,
  VehicleCard,
  FuelChargeGauge,
  ParkingSpot,
  RideStatusBar,
  FareEstimate,
  DriverRatingRow,
  TripHistoryRow,
  TripHistoryEmpty,
  VehicleHealthRow,
  ServiceReminder,
} from './index';

const COLOR_LITERAL = /#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(/i;

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'light',
};

const classNames = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[class]'))
    .map((el) => el.getAttribute('class') ?? '')
    .join('\n');

beforeEach(() => {
  installMatchMedia(false);
});

function wrap(ui: React.ReactElement) {
  return render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
}

describe('automotive web parity', () => {
  it('renders the full composition (6+ components incl. an empty state) with token classes', () => {
    const { container, getByText } = wrap(
      <main>
        <RideRequestCard
          riderName="Ava Chen"
          pickup={{ label: 'Pickup', address: '1 Market St' }}
          dropoff={{ label: 'Drop-off', address: '9 Mission St' }}
          fareCents={1850}
          surgeMultiplier={1.5}
        />
        <DriverCard name="Sam Rivera" rating={4.8} online vehicle="Toyota Prius · White" plate="7ABC123" />
        <TripRoute origin={{ label: 'Home', address: '1 Oak Ave' }} destination={{ label: 'Office', address: '5 Pine Rd' }} distance="8.4 mi" />
        <VehicleCard name="Tesla Model 3" plate="EV-2023" status="in-use" />
        <FuelChargeGauge percent={8} kind="ev" charging rangeLabel="18 mi" />
        <ParkingSpot spotId="B-12" status="available" priceCentsPerHour={350} />
        <RideStatusBar stage="arriving" detail="Driver 3 min away" />
        <FareEstimate items={[{ label: 'Base', cents: 500 }, { label: 'Promo', cents: -200 }]} distanceLabel="8.4 mi" />
        <TripHistoryRow from="Home" to="Airport" outcome="completed" fareCents={4200} />
        <VehicleHealthRow system="Tire pressure" status="attention" reading="28 psi" percent={60} />
        <ServiceReminder service="Oil change" urgency="overdue" dueLabel="Sep 30" />
        <TripHistoryEmpty />
      </main>
    );

    // Renders content.
    expect(getByText('Ava Chen')).toBeTruthy();
    expect(getByText('Sam Rivera')).toBeTruthy();
    expect(getByText('No trips yet')).toBeTruthy();

    // Data hooks present.
    expect(container.querySelector('[data-xen-ride-request]')).not.toBeNull();
    expect(container.querySelector('[data-xen-trip-route]')).not.toBeNull();
    expect(container.querySelector('[data-xen-trip-history-empty]')).not.toBeNull();

    // Token classes are applied (surface + a semantic tone class).
    const cls = classNames(container);
    expect(cls).toContain('bg-surface');
    expect(cls).toContain('border-border');
    expect(cls).toContain('text-success'); // parking available glyph tone
    expect(cls).toContain('bg-danger'); // overdue service accent bar
  });

  it('stays token-pure: no hex/rgb in any className', () => {
    const { container } = wrap(
      <main>
        <RideRequestCard
          riderName="Ava"
          pickup={{ label: 'A', address: 'x' }}
          dropoff={{ label: 'B', address: 'y' }}
          surgeMultiplier={2}
        />
        <ParkingSpot spotId="B-1" status="occupied" />
        <RideStatusBar stage="completed" />
        <FuelChargeGauge percent={5} />
        <VehicleHealthRow system="Brakes" status="critical" percent={20} />
        <ServiceReminder service="Rotate tires" urgency="due" />
      </main>
    );
    expect(classNames(container)).not.toMatch(COLOR_LITERAL);
  });

  it('fires onAccept / onDecline (RideRequestCard)', () => {
    const onAccept = jest.fn();
    const onDecline = jest.fn();
    const { getByText } = wrap(
      <RideRequestCard
        riderName="Ava"
        pickup={{ label: 'A', address: 'x' }}
        dropoff={{ label: 'B', address: 'y' }}
        onAccept={onAccept}
        onDecline={onDecline}
      />
    );
    fireEvent.click(getByText('Accept'));
    fireEvent.click(getByText('Decline'));
    expect(onAccept).toHaveBeenCalledTimes(1);
    expect(onDecline).toHaveBeenCalledTimes(1);
  });

  it('DriverCard is a keyboard-operable role=button when onClick is set', () => {
    const onClick = jest.fn();
    const { getByRole } = wrap(<DriverCard name="Sam" onClick={onClick} />);
    const card = getByRole('button');
    fireEvent.click(card);
    fireEvent.keyDown(card, { key: 'Enter' });
    fireEvent.keyDown(card, { key: ' ' });
    expect(onClick).toHaveBeenCalledTimes(3);
  });

  it('DriverRatingRow fires onRate with the chosen star', () => {
    const onRate = jest.fn();
    const { getByLabelText } = wrap(<DriverRatingRow driverName="Sam" value={2} onRate={onRate} />);
    fireEvent.click(getByLabelText('4 stars'));
    expect(onRate).toHaveBeenCalledWith(4);
  });

  it('ParkingSpot selects only when available', () => {
    const onSelect = jest.fn();
    const { getByRole, rerender } = wrap(
      <ParkingSpot spotId="B-12" status="available" onSelect={onSelect} />
    );
    fireEvent.click(getByRole('button'));
    expect(onSelect).toHaveBeenCalledTimes(1);

    rerender(
      <XenitionUIProvider theme={SEED}>
        <ParkingSpot spotId="B-12" status="occupied" onSelect={onSelect} />
      </XenitionUIProvider>
    );
    fireEvent.click(getByRole('button'));
    expect(onSelect).toHaveBeenCalledTimes(1); // unchanged: occupied is not selectable
  });

  it('FareEstimate sums items with surge applied and renders a total', () => {
    const { container } = wrap(
      <FareEstimate items={[{ label: 'Base', cents: 1000 }, { label: 'Distance', cents: 1000 }]} surgeMultiplier={1.5} />
    );
    // (1000 + 1000) * 1.5 = 3000 -> $30.00
    expect(container.querySelector('[data-xen-fare-total]')?.textContent).toBe('$30.00');
  });
});
