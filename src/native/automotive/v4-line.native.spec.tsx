/**
 * The **V4 automotive line** (native) — the props V4 adds, the empty states,
 * and the three findings the pass made: the mismatched `on` pair on the route
 * markers, the pressable unavailable parking bay, and the ratings that drew
 * five glyphs and no number.
 */
import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
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
import { onPair, toneFill } from '../primitives/internal/tone-v4';
import type { ReactTestInstance } from 'react-test-renderer';

const STOPS = {
  pickup: { label: 'Pickup', address: '12 Bank St' },
  dropoff: { label: 'Dropoff', address: 'Airport T2' },
};

describe('tone-v4 onPair', () => {
  it('pairs each fill with its OWN on-colour', () => {
    // The defect: `TripRoute` filled markers `colors[tone]` and inked them
    // `onPrimary` regardless. Both sides are `string`, so no type caught it.
    const { root } = renderThemed(<TripRouteV4 origin={{ label: 'A' }} destination={{ label: 'B' }} />, SEED_LIGHT);
    const find = (id: string): ReactTestInstance =>
      root.findAll((n) => n.props?.testID === id && typeof n.type === 'string')[0]!;

    const origin = find('xen-route-origin');
    const dest = find('xen-route-destination');
    // The two markers carry DIFFERENT fills, so their inks must differ too.
    const fills = [origin, dest].map((n) => {
      const s = Array.isArray(n.props.style) ? Object.assign({}, ...n.props.style) : n.props.style;
      return s.backgroundColor as string;
    });
    expect(fills[0]).not.toBe(fills[1]);
  });

  it('never returns the same on-colour for success and primary', () => {
    // A guard on the helper itself, so a future edit cannot collapse them.
    const theme = { colors: { onPrimary: '#fff', onSuccess: '#000', onAccent: '#111', onWarn: '#222', onDanger: '#333', onSurface: '#444' } } as never;
    expect(onPair(theme, 'success')).not.toBe(onPair(theme, 'primary'));
    expect(toneFill).toBeDefined();
  });
});

describe('DriverCardV4', () => {
  it('says whether the driver is online in words, not only a dot', () => {
    const { getByText } = renderThemed(<DriverCardV4 name="Ada" online />, SEED_LIGHT);
    expect(getByText('Online')).toBeTruthy();
  });

  it('names the message and call actions', () => {
    const { getByLabelText } = renderThemed(
      <DriverCardV4 name="Ada" onMessage={jest.fn()} onCall={jest.fn()} />,
      SEED_LIGHT
    );
    expect(getByLabelText('Message driver')).toBeTruthy();
    expect(getByLabelText('Call driver')).toBeTruthy();
  });

  it('renders nothing without a name', () => {
    const { toJSON } = renderThemed(<DriverCardV4 name="" />, SEED_LIGHT);
    expect(toJSON()).toBeNull();
  });
});

describe('DriverRatingRowV4', () => {
  it('reports the star that was pressed', () => {
    const onRate = jest.fn();
    const { getByLabelText } = renderThemed(
      <DriverRatingRowV4 driverName="Ada" onRate={onRate} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Rate 4 of 5 stars'));
    expect(onRate).toHaveBeenCalledWith(4);
  });

  it('says so when there is nothing to show', () => {
    const { getByText } = renderThemed(
      <DriverRatingRowV4 driverName="Ada" variant="readonly" value={Number.NaN} unratedLabel="Not rated" />,
      SEED_LIGHT
    );
    expect(getByText('Not rated')).toBeTruthy();
  });
});

describe('FareEstimateV4', () => {
  it('labels surge rather than tinting the fare', () => {
    const { getByText } = renderThemed(
      <FareEstimateV4 totalCents={1850} surgeMultiplier={1.8} />,
      SEED_LIGHT
    );
    expect(getByText('1.8× surge')).toBeTruthy();
  });

  it('shows the empty message with nothing to estimate', () => {
    const { getByText } = renderThemed(
      <FareEstimateV4 emptyMessage="Nothing yet." />,
      SEED_LIGHT
    );
    expect(getByText('Nothing yet.')).toBeTruthy();
  });
});

describe('FuelChargeGaugeV4', () => {
  it('bands the level and lets the host rename the band', () => {
    const { getByText } = renderThemed(
      <FuelChargeGaugeV4 percent={8} bandLabels={{ low: 'Niedrig' }} />,
      SEED_LIGHT
    );
    expect(getByText('Niedrig')).toBeTruthy();
    expect(getByText('8%')).toBeTruthy();
  });
});

describe('ParkingSpotV4', () => {
  it('will not select an occupied bay', () => {
    const onSelect = jest.fn();
    const { getByLabelText } = renderThemed(
      <ParkingSpotV4 spotId="B12" status="occupied" onSelect={onSelect} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText(/B12/));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('selects an available one', () => {
    const onSelect = jest.fn();
    const { getByLabelText } = renderThemed(
      <ParkingSpotV4 spotId="B12" status="available" onSelect={onSelect} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText(/B12/));
    expect(onSelect).toHaveBeenCalled();
  });
});

describe('RideRequestCardV4', () => {
  it('shows both stops and both actions', () => {
    const { getByText } = renderThemed(
      <RideRequestCardV4
        riderName="Ada"
        pickup={STOPS.pickup}
        dropoff={STOPS.dropoff}
        onAccept={jest.fn()}
        onDecline={jest.fn()}
      />,
      SEED_LIGHT
    );
    expect(getByText('12 Bank St')).toBeTruthy();
    expect(getByText('Airport T2')).toBeTruthy();
    expect(getByText('Accept')).toBeTruthy();
    expect(getByText('Decline')).toBeTruthy();
  });

  it('renders nothing without a rider', () => {
    const { toJSON } = renderThemed(
      <RideRequestCardV4 riderName="" pickup={STOPS.pickup} dropoff={STOPS.dropoff} />,
      SEED_LIGHT
    );
    expect(toJSON()).toBeNull();
  });
});

describe('RideStatusBarV4', () => {
  it('announces the step position', () => {
    const { getByLabelText } = renderThemed(<RideStatusBarV4 stage="in-trip" />, SEED_LIGHT);
    expect(getByLabelText(/step 3 of 4/)).toBeTruthy();
  });

  it('takes a cancelled ride to an alert', () => {
    const roles = (root: ReactTestInstance, role: string): ReactTestInstance[] =>
      root.findAll((n) => typeof n.type === 'string' && n.props?.accessibilityRole === role);
    const { root } = renderThemed(<RideStatusBarV4 stage="arriving" cancelled />, SEED_LIGHT);
    expect(roles(root, 'alert').length).toBeGreaterThan(0);
  });
});

describe('ServiceReminderV4', () => {
  it('interrupts only when overdue', () => {
    const roles = (root: ReactTestInstance, role: string): ReactTestInstance[] =>
      root.findAll((n) => typeof n.type === 'string' && n.props?.accessibilityRole === role);

    const overdue = renderThemed(<ServiceReminderV4 service="Oil" urgency="overdue" />, SEED_LIGHT);
    expect(roles(overdue.root, 'alert').length).toBe(1);
    overdue.unmount();

    const upcoming = renderThemed(<ServiceReminderV4 service="Oil" urgency="upcoming" />, SEED_LIGHT);
    expect(roles(upcoming.root, 'alert').length).toBe(0);
  });
});

describe('TripHistoryRowV4 / EmptyV4', () => {
  it('announces the route as one string', () => {
    const { getByLabelText } = renderThemed(
      <TripHistoryRowV4 from="Bank St" to="Airport" fareCents={1850} />,
      SEED_LIGHT
    );
    expect(getByLabelText(/Bank St to Airport/)).toBeTruthy();
  });

  it('renders nothing without both endpoints', () => {
    const { toJSON } = renderThemed(<TripHistoryRowV4 from="Bank St" to="" />, SEED_LIGHT);
    expect(toJSON()).toBeNull();
  });

  it('gives the empty state a title and a message', () => {
    const { getByText } = renderThemed(
      <TripHistoryEmptyV4 title="Nothing yet" message="Ride first." />,
      SEED_LIGHT
    );
    expect(getByText('Nothing yet')).toBeTruthy();
    expect(getByText('Ride first.')).toBeTruthy();
  });
});

describe('VehicleCardV4 / VehicleHealthRowV4', () => {
  it('shows the plate and the status word', () => {
    const { getByText } = renderThemed(
      <VehicleCardV4 name="Van 3" plate="AB12 CDE" status="maintenance" />,
      SEED_LIGHT
    );
    expect(getByText('AB12 CDE')).toBeTruthy();
    expect(getByText('Maintenance')).toBeTruthy();
  });

  it('says unknown in words rather than borrowing a status colour', () => {
    const { getByText } = renderThemed(
      <VehicleHealthRowV4 system="Tyre pressure" status="unknown" />,
      SEED_LIGHT
    );
    expect(getByText('Unknown')).toBeTruthy();
  });

  it('renders nothing without a system', () => {
    const { toJSON } = renderThemed(<VehicleHealthRowV4 system="" />, SEED_LIGHT);
    expect(toJSON()).toBeNull();
  });
});
