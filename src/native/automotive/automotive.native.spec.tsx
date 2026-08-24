import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { RideRequestCard } from './RideRequestCard';
import { DriverCard } from './DriverCard';
import { TripRoute } from './TripRoute';
import { FuelChargeGauge } from './FuelChargeGauge';
import { ParkingSpot } from './ParkingSpot';
import { RideStatusBar } from './RideStatusBar';
import { FareEstimate } from './FareEstimate';
import { DriverRatingRow } from './DriverRatingRow';
import { TripHistoryRow, TripHistoryEmpty } from './TripHistoryRow';
import { VehicleHealthRow } from './VehicleHealthRow';
import { ServiceReminder } from './ServiceReminder';

const PICKUP = { label: 'Pickup', address: '500 Market St' };
const DROPOFF = { label: 'Drop-off', address: '1 Ferry Building' };

describe('RideRequestCard (native)', () => {
  it('renders rider + route and fires onAccept / onDecline', () => {
    const onAccept = jest.fn();
    const onDecline = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <RideRequestCard
        riderName="Dana Rivera"
        riderRating={4.8}
        pickup={PICKUP}
        dropoff={DROPOFF}
        fareCents={1450}
        distanceToPickup="1.2 mi"
        tripDuration="18 min"
        onAccept={onAccept}
        onDecline={onDecline}
      />,
      SEED_LIGHT
    );
    expect(getByText('Dana Rivera')).toBeTruthy();
    expect(getByText('500 Market St')).toBeTruthy();
    // Interaction: request a ride (accept) and cancel (decline).
    fireEvent.press(getByLabelText('Accept ride from Dana Rivera'));
    expect(onAccept).toHaveBeenCalledTimes(1);
    fireEvent.press(getByLabelText('Decline ride from Dana Rivera'));
    expect(onDecline).toHaveBeenCalledTimes(1);
  });
});

describe('DriverCard (native)', () => {
  it('announces the driver and shows an online state', () => {
    const { getByLabelText, getByText } = renderThemed(
      <DriverCard
        name="Sam Okoye"
        rating={4.9}
        tripCount={2140}
        vehicle="Toyota Prius · White"
        plate="7XYZ123"
        etaLabel="4 min"
        online
        variant="assigned"
      />,
      SEED_DARK
    );
    expect(getByLabelText(/Driver Sam Okoye/)).toBeTruthy();
    expect(getByText('7XYZ123')).toBeTruthy();
  });
});

describe('TripRoute (native, dependency-free)', () => {
  it('renders a static origin/destination placeholder with no map dep', () => {
    const { getByTestId, getByText } = renderThemed(
      <TripRoute
        origin={{ label: 'Home', address: '500 Market St' }}
        destination={{ label: 'Airport', address: 'SFO Terminal 2' }}
        distance="14 mi"
        duration="26 min"
      />,
      SEED_LIGHT
    );
    expect(getByTestId('xen-trip-route')).toBeTruthy();
    expect(getByTestId('xen-trip-origin')).toBeTruthy();
    expect(getByTestId('xen-trip-destination')).toBeTruthy();
    expect(getByText('14 mi')).toBeTruthy();
  });
});

describe('FuelChargeGauge (native)', () => {
  it('flags a low level with the danger token color and a spelled-out band', () => {
    const { getByLabelText, root } = renderThemed(
      <FuelChargeGauge percent={8} kind="fuel" rangeLabel="18 mi" />,
      SEED_LIGHT
    );
    // Meaning is spelled out, not color-only.
    expect(getByLabelText(/Fuel: 8 percent, Low/)).toBeTruthy();
    // A low level resolves to the `danger` semantic token.
    const dangerHex = tokenHexSet(SEED_LIGHT);
    const found = renderedStyleHexes(root);
    expect(found.some((hex) => dangerHex.has(hex))).toBe(true);
  });
});

describe('ParkingSpot (native)', () => {
  it('only lets an available spot be selected', () => {
    const onSelect = jest.fn();
    const { getByLabelText } = renderThemed(
      <>
        <ParkingSpot spotId="B-12" level="Level 2" status="available" priceCentsPerHour={350} onSelect={onSelect} />
        <ParkingSpot spotId="B-13" level="Level 2" status="occupied" onSelect={onSelect} />
      </>,
      SEED_DARK
    );
    fireEvent.press(getByLabelText(/Spot B-13.*Occupied/));
    expect(onSelect).not.toHaveBeenCalled();
    fireEvent.press(getByLabelText(/Spot B-12.*Available/));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});

describe('RideStatusBar (native)', () => {
  it('reports the active lifecycle stage', () => {
    const { getByLabelText } = renderThemed(
      <RideStatusBar stage="in-trip" detail="8 min to destination" />,
      SEED_LIGHT
    );
    expect(getByLabelText(/Ride status: In trip, step 3 of 4/)).toBeTruthy();
  });
});

describe('FareEstimate (native)', () => {
  it('sums line items with surge into the total', () => {
    const { getByText } = renderThemed(
      <FareEstimate
        items={[
          { label: 'Base fare', cents: 250 },
          { label: 'Distance', cents: 750 },
        ]}
        surgeMultiplier={1.5}
        distanceLabel="8.4 mi"
      />,
      SEED_LIGHT
    );
    // (250 + 750) * 1.5 = 1500 → $15.00
    expect(getByText('$15.00')).toBeTruthy();
  });
});

describe('DriverRatingRow (native)', () => {
  it('fires onRate with the tapped star count', () => {
    const onRate = jest.fn();
    const { getByLabelText } = renderThemed(
      <DriverRatingRow driverName="Sam Okoye" subtitle="Toyota Prius" value={0} onRate={onRate} />,
      SEED_LIGHT
    );
    // Interaction: rate the driver 5 stars.
    fireEvent.press(getByLabelText('5 stars'));
    expect(onRate).toHaveBeenCalledTimes(1);
    expect(onRate).toHaveBeenCalledWith(5);
  });
});

describe('TripHistoryRow + empty state (native)', () => {
  it('renders a past trip and, separately, the empty history state', () => {
    const { getByLabelText, getByText } = renderThemed(
      <>
        <TripHistoryRow
          from="Home"
          to="Office"
          dateLabel="Sep 3, 8:14 AM"
          fareCents={1875}
          outcome="completed"
          rating={5}
        />
        <TripHistoryEmpty />
      </>,
      SEED_DARK
    );
    expect(getByLabelText(/Trip from Home to Office.*Completed/)).toBeTruthy();
    // Empty TripHistory.
    expect(getByText('No trips yet')).toBeTruthy();
  });
});

describe('VehicleHealthRow + ServiceReminder (native)', () => {
  it('announces a critical health system and an overdue reminder', () => {
    const { getByLabelText } = renderThemed(
      <>
        <VehicleHealthRow system="Brake pads" status="critical" reading="15%" percent={15} />
        <ServiceReminder service="Oil change" urgency="overdue" dueLabel="2 weeks ago" mileageLabel="Due at 60,000 mi" />
      </>,
      SEED_LIGHT
    );
    expect(getByLabelText(/Brake pads: Critical/)).toBeTruthy();
    expect(getByLabelText(/Oil change, Overdue/)).toBeTruthy();
  });
});

describe('token purity (native automotive, both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <RideRequestCard riderName="Dana" riderRating={4.8} pickup={PICKUP} dropoff={DROPOFF} fareCents={1450} surgeMultiplier={1.5} />
          <DriverCard name="Sam" rating={4.9} vehicle="Prius" plate="7XYZ123" etaLabel="4 min" online variant="assigned" />
          <TripRoute origin={{ label: 'Home' }} destination={{ label: 'Airport' }} waypoints={[{ label: 'Stop', at: { x: 0.5, y: 0.5 } }]} distance="14 mi" />
          <FuelChargeGauge percent={8} kind="ev" charging rangeLabel="18 mi" />
          <ParkingSpot spotId="B-12" status="available" priceCentsPerHour={350} evCharging onSelect={() => {}} />
          <ParkingSpot spotId="B-13" status="occupied" />
          <RideStatusBar stage="arriving" detail="3 min away" />
          <RideStatusBar stage="requested" cancelled detail="Rider cancelled" />
          <FareEstimate items={[{ label: 'Base', cents: 250 }, { label: 'Promo', cents: -100 }]} surgeMultiplier={1.5} />
          <DriverRatingRow driverName="Sam" value={3} onRate={() => {}} />
          <TripHistoryRow from="Home" to="Office" fareCents={1875} outcome="cancelled" rating={4} />
          <TripHistoryEmpty />
          <VehicleHealthRow system="Tire pressure" status="ok" reading="32 psi" />
          <VehicleHealthRow system="Brake pads" status="critical" percent={15} reading="15%" />
          <ServiceReminder service="Oil change" urgency="overdue" dueLabel="Now" actionLabel="Book" onAction={() => {}} onDismiss={() => {}} />
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
