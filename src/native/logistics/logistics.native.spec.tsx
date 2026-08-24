import * as React from 'react';
import { StyleSheet } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { toNativeTokens } from '../../theme/outputs';
import { ShipmentCard } from './ShipmentCard';
import { PackageRow } from './PackageRow';
import { RouteStop } from './RouteStop';
import { DeliveryProof } from './DeliveryProof';
import { WarehouseBin } from './WarehouseBin';
import { TrackingTimeline } from './TrackingTimeline';
import { CarrierBadge } from './CarrierBadge';
import { ManifestRow } from './ManifestRow';
import { DockSchedule, type DockSlot } from './DockSchedule';
import { LoadPlanBar } from './LoadPlanBar';
import { ScanRow } from './ScanRow';
import { ETABar } from './ETABar';

const flatten = (style: unknown): Record<string, unknown> =>
  (StyleSheet.flatten(style as never) ?? {}) as Record<string, unknown>;

const lightColors = toNativeTokens(compileTheme(SEED_LIGHT)).colors.light;

describe('ShipmentCard (native)', () => {
  it('mounts with tracking number toned as the onSurface token', () => {
    const { getByText } = renderThemed(
      <ShipmentCard
        trackingNumber="1Z-999-AA1"
        recipient="Ada Rae"
        origin="Berlin"
        destination="Paris"
        status="in-transit"
        carrier="ups"
        eta="Tomorrow 8 PM"
      />,
      SEED_LIGHT
    );
    const headline = getByText('1Z-999-AA1');
    expect(headline).toBeTruthy();
    expect(flatten(headline.props.style).color).toBe(lightColors.onSurface);
  });

  it('fires onPress via its labelled button', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <ShipmentCard trackingNumber="TN-1" status="delivered" onPress={onPress} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Shipment TN-1, Delivered'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders a loading skeleton with no crash', () => {
    const { getByLabelText } = renderThemed(
      <ShipmentCard trackingNumber="X" status="draft" loading />,
      SEED_LIGHT
    );
    expect(getByLabelText('Loading shipment')).toBeTruthy();
  });
});

describe('ETABar (native)', () => {
  it('tones an on-time status with the success token and exposes progressbar value', () => {
    const { getByText, getByLabelText } = renderThemed(
      <ETABar progress={60} status="on-time" eta="12:40 PM" origin="DC" destination="Home" />,
      SEED_LIGHT
    );
    const label = getByText('On time');
    expect(flatten(label.props.style).color).toBe(lightColors.success);
    const bar = getByLabelText('On time, ETA 12:40 PM, 60% complete');
    expect(bar.props.accessibilityValue).toEqual({ min: 0, max: 100, now: 60 });
  });
});

describe('ManifestRow (native)', () => {
  it('toggles the check control (interaction) and reports the next state', () => {
    const onToggle = jest.fn();
    const { getByLabelText } = renderThemed(
      <ManifestRow item="Widget A" sku="SKU-1" quantity={10} scanned={4} state="pending" onToggle={onToggle} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Pending: Widget A'));
    expect(onToggle).toHaveBeenCalledWith('checked');
  });
});

describe('RouteStop (native)', () => {
  it('fires onPress and tones a completed marker as the success token', () => {
    const onPress = jest.fn();
    const { getByLabelText, getByText } = renderThemed(
      <RouteStop sequence={2} address="12 Rue Lafayette" recipient="B. Dupont" status="completed" eta="9:15" onPress={onPress} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Stop 2, 12 Rue Lafayette, Completed'));
    expect(onPress).toHaveBeenCalledTimes(1);
    const label = getByText('Completed');
    expect(flatten(label.props.style).color).toBe(lightColors.success);
  });
});

describe('DockSchedule (native)', () => {
  const slots: DockSlot[] = [
    { id: 's1', window: '08:00–09:00', status: 'loading', carrier: 'fedex', reference: 'APPT-42' },
    { id: 's2', window: '09:00–10:00', status: 'booked', carrier: 'dhl' },
  ];

  it('renders an empty placeholder when there are no slots', () => {
    const { getByLabelText } = renderThemed(<DockSchedule dock="Dock 4" slots={[]} />, SEED_LIGHT);
    expect(getByLabelText('No slots scheduled')).toBeTruthy();
  });

  it('selects a slot (interaction)', () => {
    const onSelectSlot = jest.fn();
    const { getByLabelText } = renderThemed(
      <DockSchedule dock="Dock 4" slots={slots} onSelectSlot={onSelectSlot} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('08:00–09:00, Loading'));
    expect(onSelectSlot).toHaveBeenCalledWith(expect.objectContaining({ id: 's1' }));
  });
});

describe('TrackingTimeline / smoke (native)', () => {
  it('renders the ordered stages and marks the current one', () => {
    const { getByText } = renderThemed(
      <TrackingTimeline
        current="out-for-delivery"
        events={[{ stage: 'picked', time: 'Mon 9:14', detail: 'Origin facility' }]}
      />,
      SEED_LIGHT
    );
    expect(getByText('Picked')).toBeTruthy();
    expect(getByText('Out for delivery')).toBeTruthy();
    expect(getByText('Delivered')).toBeTruthy();
  });

  it('mounts a carrier badge, load bar, scan row, package row, bin and proof', () => {
    const carrier = renderThemed(<CarrierBadge carrier="usps" service="Priority" />, SEED_LIGHT);
    expect(carrier.getByLabelText('Carrier USPS, Priority')).toBeTruthy();

    const load = renderThemed(<LoadPlanBar utilization={95} caption="23 / 24 pallets" />, SEED_LIGHT);
    expect(load.getByLabelText('Load 95% full, near capacity')).toBeTruthy();

    const scan = renderThemed(<ScanRow code="9400-1000" kind="sort" location="Sorter 3" time="10:42" />, SEED_LIGHT);
    expect(scan.getByLabelText('Sort scan 9400-1000 at Sorter 3')).toBeTruthy();

    const pkg = renderThemed(<PackageRow packageId="PKG-7" contents="Books" weight={2.4} status="in-transit" />, SEED_LIGHT);
    expect(pkg.getByLabelText('Package PKG-7, In transit')).toBeTruthy();

    const bin = renderThemed(<WarehouseBin code="A-12-03" zone="Aisle A" fill={80} itemCount={12} state="partial" />, SEED_LIGHT);
    expect(bin.getByLabelText('Bin A-12-03, Partial, 80% full')).toBeTruthy();

    const proof = renderThemed(<DeliveryProof kind="signature" outcome="delivered" recipient="Ada" time="3:02 PM" />, SEED_LIGHT);
    expect(proof.getByText('Delivered')).toBeTruthy();
  });
});

describe('token purity (native logistics, both seeds)', () => {
  it('every rendered style hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <ShipmentCard trackingNumber="1Z-1" recipient="Ada" origin="A" destination="B" status="out-for-delivery" carrier="ups" service="Ground" eta="Today" pieces={3} onPress={jest.fn()} />
          <PackageRow packageId="PKG-1" contents="Books" weight={2.4} dimensions="30×20×15 cm" status="delivered" selected onPress={jest.fn()} />
          <RouteStop sequence={1} address="12 Rue" recipient="B" status="en-route" eta="9:00" packages={2} onPress={jest.fn()} />
          <DeliveryProof kind="photo" outcome="attempted" recipient="Sam" time="2 PM" location="Porch" note="Left with neighbour" onPress={jest.fn()} />
          <WarehouseBin code="A-1" zone="Aisle A" fill={95} itemCount={9} state="full" selected onPress={jest.fn()} />
          <TrackingTimeline current="in-transit" events={[{ stage: 'picked', time: 'Mon', detail: 'Origin' }]} />
          <TrackingTimeline current="exception" />
          <CarrierBadge carrier="fedex" service="2-Day" variant="solid" />
          <CarrierBadge carrier="dhl" variant="outline" />
          <ManifestRow item="Widget" sku="SKU-1" quantity={10} scanned={10} state="checked" onToggle={jest.fn()} />
          <DockSchedule
            dock="Dock 4"
            slots={[
              { id: 's1', window: '08:00–09:00', status: 'loading', carrier: 'fedex', reference: 'APPT-42' },
              { id: 's2', window: '09:00–10:00', status: 'overdue' },
            ]}
            onSelectSlot={jest.fn()}
          />
          <LoadPlanBar
            segments={[
              { id: 'a', pct: 30, emphasis: 'strong' },
              { id: 'b', pct: 25, emphasis: 'medium' },
              { id: 'c', pct: 15, emphasis: 'soft' },
            ]}
            caption="Trailer 1"
          />
          <ScanRow code="9400-1000-2000" kind="load" location="Bay 2" time="10:42" operator="J. Diaz" onPress={jest.fn()} />
          <ETABar progress={45} status="delayed" eta="~25 min" origin="DC" destination="Home" />
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
