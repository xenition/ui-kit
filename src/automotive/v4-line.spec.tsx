/** @jest-environment jsdom */
/**
 * The **V4 automotive line** (web) — the twin of
 * `native/automotive/v4-line.native.spec.tsx`, plus the defect this twin had
 * and native did not: an interactive card was a `<div>` with `role="button"`.
 */
import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { DriverCardV4 } from './DriverCardV4';
import { DriverRatingRowV4 } from './DriverRatingRowV4';
import { FareEstimateV4 } from './FareEstimateV4';
import { FuelChargeGaugeV4 } from './FuelChargeGaugeV4';
import { ParkingSpotV4 } from './ParkingSpotV4';
import { RideRequestCardV4 } from './RideRequestCardV4';
import { RideStatusBarV4 } from './RideStatusBarV4';
import { ServiceReminderV4 } from './ServiceReminderV4';
import { TripHistoryRowV4, TripHistoryEmptyV4 } from './TripHistoryRowV4';
import { TripRouteV4 } from './TripRouteV4';
import { VehicleCardV4 } from './VehicleCardV4';
import { VehicleHealthRowV4 } from './VehicleHealthRowV4';

const STOPS = {
  pickup: { label: 'Pickup', address: '12 Bank St' },
  dropoff: { label: 'Dropoff', address: 'Airport T2' },
};

describe('the interactive cards are real buttons', () => {
  it.each([
    ['DriverCardV4', <DriverCardV4 key="d" name="Ada" onClick={jest.fn()} />],
    ['VehicleCardV4', <VehicleCardV4 key="v" name="Van 3" onClick={jest.fn()} />],
  ])('%s renders a <button>, not a div with role=button', (_n, element) => {
    const { container } = render(element);
    expect(container.querySelector('button')).toBeTruthy();
    expect(container.querySelector('div[role="button"]')).toBeNull();
  });
});

describe('TripRouteV4', () => {
  it('gives each marker its OWN on-colour class', () => {
    // The defect: the base painted every marker `bg-[tone]` and inked them all
    // `text-on-primary`. Two different tones must not share one ink class.
    const { getByTestId } = render(
      <TripRouteV4 origin={{ label: 'Bank St' }} destination={{ label: 'Airport' }} />
    );
    const origin = getByTestId('xen-route-origin').className;
    const dest = getByTestId('xen-route-destination').className;
    expect(origin).toContain('text-on-success');
    expect(dest).toContain('text-on-primary');
    expect(origin).not.toBe(dest);
  });

  it('names the whole map with both endpoints', () => {
    const { getByLabelText } = render(
      <TripRouteV4 origin={{ label: 'Bank St' }} destination={{ label: 'Airport' }} />
    );
    expect(getByLabelText(/Route from Bank St to Airport/)).toBeTruthy();
  });
});

describe('DriverCardV4 / DriverRatingRowV4', () => {
  it('says whether the driver is online in words', () => {
    const { getByText } = render(<DriverCardV4 name="Ada" online />);
    expect(getByText('Online')).toBeTruthy();
  });

  it('reports the star that was clicked', () => {
    const onRate = jest.fn();
    const { getByLabelText } = render(<DriverRatingRowV4 driverName="Ada" onRate={onRate} />);
    fireEvent.click(getByLabelText('Rate 4 of 5 stars'));
    expect(onRate).toHaveBeenCalledWith(4);
  });

  it('groups the interactive stars as one radiogroup', () => {
    const { getByRole } = render(<DriverRatingRowV4 driverName="Ada" onRate={jest.fn()} />);
    expect(getByRole('radiogroup')).toBeTruthy();
  });
});

describe('FareEstimateV4', () => {
  it('labels surge rather than tinting the fare', () => {
    const { getByText } = render(<FareEstimateV4 totalCents={1850} surgeMultiplier={1.8} />);
    expect(getByText('1.8× surge')).toBeTruthy();
  });

  it('renders the breakdown as a definition list', () => {
    const { container } = render(
      <FareEstimateV4 items={[{ label: 'Base', cents: 500 }]} totalCents={500} />
    );
    expect(container.querySelector('dl')).toBeTruthy();
  });

  it('shows the empty message with nothing to estimate', () => {
    const { getByText } = render(<FareEstimateV4 emptyMessage="Nothing yet." />);
    expect(getByText('Nothing yet.')).toBeTruthy();
  });
});

describe('FuelChargeGaugeV4', () => {
  it('reports the level as a progressbar', () => {
    const { getByRole } = render(<FuelChargeGaugeV4 percent={42} />);
    expect(getByRole('progressbar').getAttribute('aria-valuenow')).toBe('42');
  });
});

describe('ParkingSpotV4', () => {
  it('does not offer an occupied bay as a button', () => {
    const { container } = render(
      <ParkingSpotV4 spotId="B12" status="occupied" onSelect={jest.fn()} />
    );
    expect(container.querySelector('button')).toBeNull();
  });

  it('offers an available one', () => {
    const onSelect = jest.fn();
    const { getByRole } = render(
      <ParkingSpotV4 spotId="B12" status="available" onSelect={onSelect} />
    );
    fireEvent.click(getByRole('button'));
    expect(onSelect).toHaveBeenCalled();
  });
});

describe('RideRequestCardV4 / RideStatusBarV4', () => {
  it('renders the two stops as one list', () => {
    const { container, getByText } = render(
      <RideRequestCardV4 riderName="Ada" pickup={STOPS.pickup} dropoff={STOPS.dropoff} />
    );
    expect(container.querySelectorAll('li')).toHaveLength(2);
    expect(getByText('Airport T2')).toBeTruthy();
  });

  it('announces the step position', () => {
    const { getByRole } = render(<RideStatusBarV4 stage="in-trip" />);
    expect(getByRole('progressbar').getAttribute('aria-valuenow')).toBe('3');
  });

  it('takes a cancelled ride to an alert', () => {
    const { getByRole } = render(<RideStatusBarV4 stage="arriving" cancelled />);
    expect(getByRole('alert')).toBeTruthy();
  });
});

describe('ServiceReminderV4', () => {
  it('interrupts only when overdue', () => {
    const overdue = render(<ServiceReminderV4 service="Oil" urgency="overdue" />);
    expect(overdue.getByRole('alert')).toBeTruthy();
    overdue.unmount();

    const upcoming = render(<ServiceReminderV4 service="Oil" urgency="upcoming" />);
    expect(upcoming.queryByRole('alert')).toBeNull();
    expect(upcoming.getByRole('status')).toBeTruthy();
  });
});

describe('TripHistoryRowV4 / EmptyV4 / VehicleHealthRowV4', () => {
  it('announces the route as one string', () => {
    const { getByLabelText } = render(
      <TripHistoryRowV4 from="Bank St" to="Airport" fareCents={1850} />
    );
    expect(getByLabelText(/Bank St to Airport/)).toBeTruthy();
  });

  it('gives the empty state a title and a message', () => {
    const { getByText } = render(<TripHistoryEmptyV4 title="Nothing yet" message="Ride first." />);
    expect(getByText('Nothing yet')).toBeTruthy();
    expect(getByText('Ride first.')).toBeTruthy();
  });

  it('says unknown in words rather than borrowing a status colour', () => {
    const { getByText } = render(<VehicleHealthRowV4 system="Tyre pressure" status="unknown" />);
    expect(getByText('Unknown')).toBeTruthy();
  });

  it('renders nothing without a system', () => {
    const { container } = render(<VehicleHealthRowV4 system="" />);
    expect(container.firstChild).toBeNull();
  });
});

describe('VehicleCardV4', () => {
  it('shows the plate and renders the specs as a definition list', () => {
    const { container, getByText } = render(
      <VehicleCardV4
        name="Van 3"
        plate="AB12 CDE"
        specs={[{ label: 'Seats', value: '3' }]}
      />
    );
    expect(getByText('AB12 CDE')).toBeTruthy();
    expect(container.querySelector('dl')).toBeTruthy();
  });
});
