import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { SEED_LIGHT, SEED_DARK, renderThemed, renderedStyleHexes, tokenHexSet } from '../spec-support/render-native';
import { RideRequestCardV2 } from './RideRequestCardV2';
import { RideRequestCardV3 } from './RideRequestCardV3';
import { DriverCardV2 } from './DriverCardV2';
import { DriverCardV3 } from './DriverCardV3';
import { VehicleCardV2 } from './VehicleCardV2';
import { VehicleCardV3 } from './VehicleCardV3';
import { RideStatusBarV2 } from './RideStatusBarV2';
import { RideStatusBarV3 } from './RideStatusBarV3';

const PICKUP = { label: 'Pickup', address: '500 Market St' };
const DROPOFF = { label: 'Drop-off', address: '1 Ferry Building' };
const SPECS = [
  { label: 'Seats', value: '5' },
  { label: 'Range', value: '310 mi' },
];

describe('RideRequestCard alternates (native)', () => {
  it('V2 renders rider + route and fires onAccept / onDecline', () => {
    const onAccept = jest.fn();
    const onDecline = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <RideRequestCardV2
        riderName="Dana Rivera"
        riderRating={4.8}
        pickup={PICKUP}
        dropoff={DROPOFF}
        fareCents={1450}
        distanceToPickup="1.2 mi"
        surgeMultiplier={1.5}
        onAccept={onAccept}
        onDecline={onDecline}
      />,
      SEED_LIGHT
    );
    expect(getByText('Dana Rivera')).toBeTruthy();
    expect(getByText('500 Market St')).toBeTruthy();
    fireEvent.press(getByLabelText('Accept ride from Dana Rivera'));
    expect(onAccept).toHaveBeenCalledTimes(1);
    fireEvent.press(getByLabelText('Decline ride from Dana Rivera'));
    expect(onDecline).toHaveBeenCalledTimes(1);
  });

  it('V3 renders a compact line and accepts', () => {
    const onAccept = jest.fn();
    const { getByLabelText } = renderThemed(
      <RideRequestCardV3 riderName="Dana Rivera" pickup={PICKUP} dropoff={DROPOFF} fareCents={1450} onAccept={onAccept} onDecline={() => {}} />,
      SEED_DARK
    );
    fireEvent.press(getByLabelText('Accept ride from Dana Rivera'));
    expect(onAccept).toHaveBeenCalledTimes(1);
  });
});

describe('DriverCard alternates (native)', () => {
  it('V2 announces the driver and fires call', () => {
    const onCall = jest.fn();
    const { getByLabelText, getByText } = renderThemed(
      <DriverCardV2 name="Sam Okoye" rating={4.9} tripCount={2140} vehicle="Toyota Prius · White" plate="7XYZ123" etaLabel="4 min" online onCall={onCall} onMessage={() => {}} />,
      SEED_DARK
    );
    expect(getByLabelText(/Driver Sam Okoye/)).toBeTruthy();
    expect(getByText('7XYZ123')).toBeTruthy();
    fireEvent.press(getByLabelText('Call Sam Okoye'));
    expect(onCall).toHaveBeenCalledTimes(1);
  });

  it('V3 renders a compact row and fires call', () => {
    const onCall = jest.fn();
    const { getByLabelText } = renderThemed(
      <DriverCardV3 name="Sam Okoye" rating={4.9} plate="7XYZ123" etaLabel="4 min" online onCall={onCall} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Call Sam Okoye'));
    expect(onCall).toHaveBeenCalledTimes(1);
  });
});

describe('VehicleCard alternates (native)', () => {
  it('V2 renders the glyph tile, specs and fires onPress', () => {
    const onPress = jest.fn();
    const { getByLabelText, getByText } = renderThemed(
      <VehicleCardV2 name="Tesla Model 3" plate="EV-2023" year={2023} color="Midnight Blue" vehicleClass="Sedan" status="in-use" specs={SPECS} onPress={onPress} />,
      SEED_LIGHT
    );
    expect(getByText('Tesla Model 3')).toBeTruthy();
    fireEvent.press(getByLabelText(/Vehicle Tesla Model 3.*In use/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('V3 renders a dense line and fires onPress', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <VehicleCardV3 name="Tesla Model 3" plate="EV-2023" status="available" onPress={onPress} />,
      SEED_DARK
    );
    fireEvent.press(getByLabelText(/Vehicle Tesla Model 3.*Available/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('RideStatusBar alternates (native)', () => {
  it('V2 reports the active lifecycle stage', () => {
    const { getByLabelText, getByText } = renderThemed(<RideStatusBarV2 stage="in-trip" detail="8 min to destination" />, SEED_LIGHT);
    expect(getByLabelText(/Ride status: In trip, step 3 of 4/)).toBeTruthy();
    expect(getByText('8 min to destination')).toBeTruthy();
  });

  it('V3 reports the active stage as a compact pill', () => {
    const { getByLabelText } = renderThemed(<RideStatusBarV3 stage="arriving" detail="3 min away" />, SEED_DARK);
    expect(getByLabelText(/Ride status: Arriving, step 2 of 4/)).toBeTruthy();
  });
});

describe('token purity (native automotive alternates, both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <RideRequestCardV2 riderName="Dana" riderRating={4.8} pickup={PICKUP} dropoff={DROPOFF} fareCents={1450} surgeMultiplier={1.5} scheduledFor="6:00 PM" variant="scheduled" onAccept={() => {}} onDecline={() => {}} />
          <RideRequestCardV3 riderName="Dana" riderRating={4.8} pickup={PICKUP} dropoff={DROPOFF} fareCents={1450} surgeMultiplier={1.5} onAccept={() => {}} onDecline={() => {}} />
          <DriverCardV2 name="Sam" rating={4.9} tripCount={2140} vehicle="Prius" plate="7XYZ123" etaLabel="4 min" online onCall={() => {}} onMessage={() => {}} onPress={() => {}} />
          <DriverCardV3 name="Sam" rating={4.9} plate="7XYZ123" etaLabel="4 min" online={false} onCall={() => {}} />
          <VehicleCardV2 name="Tesla Model 3" plate="EV-2023" year={2023} color="Blue" vehicleClass="Sedan" status="maintenance" specs={SPECS} onPress={() => {}} />
          <VehicleCardV3 name="Ford Transit" plate="FL-9910" status="offline" />
          <RideStatusBarV2 stage="arriving" detail="3 min away" />
          <RideStatusBarV2 stage="requested" cancelled detail="Rider cancelled" />
          <RideStatusBarV3 stage="completed" detail="Arrived" />
          <RideStatusBarV3 stage="requested" cancelled detail="Rider cancelled" />
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
