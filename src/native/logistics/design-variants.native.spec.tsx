/**
 * Alternate-design (V2 / V3) coverage for the most-used native logistics
 * components. Each variant is asserted to: mount, stay token-pure under both
 * seeds (every rendered hex traces to a compiled token), and — for the
 * interactive heroes — fire its handler. Empty/edge states (empty tracking
 * timeline, exception stage, statusless package) are exercised too.
 */
import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import {
  ShipmentCardV2,
  ShipmentCardV3,
  PackageRowV2,
  PackageRowV3,
  TrackingTimelineV2,
  TrackingTimelineV3,
  RouteStopV2,
  RouteStopV3,
  ShipmentCardV4,
  PackageRowV4,
  RouteStopV4,
  ScanRowV4,
  ManifestRowV4,
  DeliveryProofV4,
  WarehouseBinV4,
  TrackingTimelineV4,
  CarrierBadgeV4,
  DockScheduleV4,
  LoadPlanBarV4,
  ETABarV4,
} from './index';
import type { DockSlot } from './index';

describe('ShipmentCard V2/V3 (native)', () => {
  it('ShipmentCardV2 mounts with tracking number, status word, ETA', () => {
    const { getByText } = renderThemed(
      <ShipmentCardV2
        trackingNumber="1Z999AA10123456784"
        recipient="A. Chen"
        origin="Berlin"
        destination="Munich"
        status="in-transit"
        carrier="ups"
        service="Ground"
        eta="Tomorrow by 8 PM"
        pieces={2}
      />,
      SEED_LIGHT
    );
    expect(getByText('1Z999AA10123456784')).toBeTruthy();
    expect(getByText('In transit')).toBeTruthy();
    expect(getByText('ETA · Tomorrow by 8 PM')).toBeTruthy();
  });

  it('ShipmentCardV2 fires onPress (interaction: tap card)', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <ShipmentCardV2 trackingNumber="TRK-1" status="delivered" onPress={onPress} />,
      SEED_DARK
    );
    fireEvent.press(getByLabelText('Shipment TRK-1, Delivered'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('ShipmentCardV3 mounts as a dense line', () => {
    const { getByText } = renderThemed(
      <ShipmentCardV3
        trackingNumber="TRK-42"
        origin="LA"
        destination="SF"
        status="out-for-delivery"
        carrier="fedex"
        eta="Today"
      />,
      SEED_LIGHT
    );
    expect(getByText('TRK-42')).toBeTruthy();
    expect(getByText('Out for delivery')).toBeTruthy();
  });

  it('both ShipmentCard variants render loading skeletons', () => {
    expect(renderThemed(<ShipmentCardV2 trackingNumber="X" status="draft" loading />, SEED_LIGHT).getByLabelText('Loading shipment')).toBeTruthy();
    expect(renderThemed(<ShipmentCardV3 trackingNumber="X" status="draft" loading />, SEED_DARK).getByLabelText('Loading shipment')).toBeTruthy();
  });
});

describe('PackageRow V2/V3 (native)', () => {
  it('PackageRowV2 mounts with id, weight/dims metrics, status', () => {
    const { getByText } = renderThemed(
      <PackageRowV2 packageId="PKG-77" contents="Books" weight={2.4} weightUnit="kg" dimensions="30×20×15 cm" status="label-created" />,
      SEED_LIGHT
    );
    expect(getByText('PKG-77')).toBeTruthy();
    expect(getByText('2.4 kg')).toBeTruthy();
    expect(getByText('30×20×15 cm')).toBeTruthy();
    expect(getByText('Label created')).toBeTruthy();
  });

  it('PackageRowV2 fires onPress (interaction: select package)', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <PackageRowV2 packageId="PKG-9" status="in-transit" selected onPress={onPress} />,
      SEED_DARK
    );
    fireEvent.press(getByLabelText('Package PKG-9, In transit'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('PackageRowV3 mounts a dense line without a status', () => {
    const { getByText } = renderThemed(
      <PackageRowV3 packageId="PKG-3" contents="Cables" weight={0.4} />,
      SEED_LIGHT
    );
    expect(getByText('PKG-3')).toBeTruthy();
  });
});

describe('TrackingTimeline V2/V3 (native)', () => {
  const events = [
    { stage: 'picked' as const, time: 'Mon 9:14 AM', detail: 'Origin facility' },
    { stage: 'in-transit' as const, time: 'Mon 6:02 PM', detail: 'Departed hub' },
  ];

  it('TrackingTimelineV2 renders the vertical rail with events', () => {
    const { getByText, getAllByText } = renderThemed(
      <TrackingTimelineV2 current="in-transit" events={events} />,
      SEED_LIGHT
    );
    expect(getAllByText('In transit').length).toBeGreaterThan(0);
    expect(getByText('Departed hub')).toBeTruthy();
    expect(getByText('Out for delivery')).toBeTruthy();
  });

  it('TrackingTimelineV2 surfaces the exception head', () => {
    const { getByLabelText } = renderThemed(
      <TrackingTimelineV2 current="exception" />,
      SEED_DARK
    );
    expect(getByLabelText('Exception: needs attention')).toBeTruthy();
  });

  it('TrackingTimelineV2 renders with an empty events list', () => {
    const { getByText } = renderThemed(
      <TrackingTimelineV2 current="picked" events={[]} />,
      SEED_LIGHT
    );
    expect(getByText('Picked')).toBeTruthy();
    expect(getByText('Delivered')).toBeTruthy();
  });

  it('TrackingTimelineV3 renders the horizontal step bar', () => {
    const { getByText } = renderThemed(
      <TrackingTimelineV3 current="out-for-delivery" events={events} />,
      SEED_LIGHT
    );
    expect(getByText('Out for delivery')).toBeTruthy();
    expect(getByText('Delivered')).toBeTruthy();
  });

  it('TrackingTimelineV3 renders with an empty events list', () => {
    const { getByText } = renderThemed(
      <TrackingTimelineV3 current="picked" events={[]} />,
      SEED_DARK
    );
    expect(getByText('Picked')).toBeTruthy();
  });

  it('both timelines render loading skeletons', () => {
    expect(renderThemed(<TrackingTimelineV2 current="picked" loading />, SEED_LIGHT).getByLabelText('Loading tracking')).toBeTruthy();
    expect(renderThemed(<TrackingTimelineV3 current="picked" loading />, SEED_DARK).getByLabelText('Loading tracking')).toBeTruthy();
  });
});

describe('RouteStop V2/V3 (native)', () => {
  it('RouteStopV2 mounts as a numbered node card with window + status', () => {
    const { getByText } = renderThemed(
      <RouteStopV2 sequence={3} address="12 Market St" recipient="Front desk" status="en-route" eta="9:00–9:30 AM" packages={4} />,
      SEED_LIGHT
    );
    expect(getByText('12 Market St')).toBeTruthy();
    expect(getByText('9:00–9:30 AM')).toBeTruthy();
    expect(getByText('En route')).toBeTruthy();
  });

  it('RouteStopV2 fires onPress (interaction: open stop)', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <RouteStopV2 sequence={1} address="1 A St" status="completed" onPress={onPress} />,
      SEED_DARK
    );
    fireEvent.press(getByLabelText('Stop 1, 1 A St, Completed'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('RouteStopV3 mounts as a dense line', () => {
    const { getByText } = renderThemed(
      <RouteStopV3 sequence={2} address="8 Bay Rd" status="arrived" eta="10:15 AM" packages={1} connected={false} />,
      SEED_LIGHT
    );
    expect(getByText('8 Bay Rd')).toBeTruthy();
    expect(getByText('Arrived')).toBeTruthy();
  });
});

describe('token purity (native logistics design variants, both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <ShipmentCardV2 trackingNumber="1Z999" origin="Berlin" destination="Munich" status="delayed" carrier="dhl" service="Express" eta="Fri" pieces={1} onPress={() => undefined} />
          <ShipmentCardV3 trackingNumber="TRK-9" origin="LA" destination="SF" status="exception" carrier="usps" eta="Today" pieces={3} />
          <PackageRowV2 packageId="PKG-1" contents="Glassware" weight={5} dimensions="40×40×40 cm" status="delivered" selected onPress={() => undefined} />
          <PackageRowV3 packageId="PKG-2" contents="Cables" weight={0.4} dimensions="10×5×2 cm" status="returned" selected />
          <TrackingTimelineV2 current="out-for-delivery" events={[{ stage: 'picked', time: '9 AM', detail: 'Hub' }]} />
          <TrackingTimelineV2 current="exception" />
          <TrackingTimelineV3 current="in-transit" events={[]} />
          <TrackingTimelineV3 current="exception" />
          <RouteStopV2 sequence={2} address="9 Elm" recipient="Reception" status="failed" eta="2 PM" packages={2} onPress={() => undefined} />
          <RouteStopV3 sequence={5} address="7 Oak" status="skipped" eta="3 PM" packages={1} connected={false} />
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

/** All 12 V4 "dispatch" components in ONE tree — the gradient TrackingTimelineV4
 * hero is always present, plus compact variants and exception/near-capacity
 * tones. Shared by the mount test and the both-seeds token-purity block. */
const V4_SLOTS: DockSlot[] = [
  { id: '1', window: '08:00–09:00', status: 'booked', carrier: 'ups', reference: 'APPT-1' },
  { id: '2', window: '09:00–10:00', status: 'loading' },
];

const AllLogisticsV4 = (
  <>
    <ShipmentCardV4 trackingNumber="1Z999" status="in-transit" origin="LA" destination="NY" eta="Tue" carrier="ups" pieces={2} />
    <ShipmentCardV4 trackingNumber="1Z000" status="delivered" variant="compact" onPress={() => {}} />
    <PackageRowV4 packageId="PKG-1" contents="Books" weight={2.4} dimensions="30×20×15" status="in-transit" />
    <PackageRowV4 packageId="PKG-2" status="returned" variant="compact" selected onPress={() => {}} />
    <RouteStopV4 sequence={1} address="10 Main St" status="completed" eta="9:00" packages={2} />
    <RouteStopV4 sequence={2} address="20 Oak Ave" status="failed" variant="compact" eta="9:30" onPress={() => {}} />
    <ScanRowV4 code="X123456" kind="inbound" location="Bay 2" time="10:42" operator="D-7" />
    <ScanRowV4 code="Y987654" kind="exception" variant="compact" time="11:01" onPress={() => {}} />
    <ManifestRowV4 item="Widget" sku="SKU-9" quantity={10} scanned={10} state="checked" onToggle={() => {}} />
    <ManifestRowV4 item="Gadget" quantity={4} scanned={2} state="missing" variant="compact" />
    <DeliveryProofV4 kind="signature" outcome="delivered" recipient="A. Smith" time="10:04" location="Porch" />
    <WarehouseBinV4 code="A-12-03" zone="Aisle A" fill={62} itemCount={8} state="partial" onPress={() => {}} />
    <TrackingTimelineV4 current="out-for-delivery" events={[{ stage: 'picked', time: 'Mon', detail: 'Origin' }]} />
    <CarrierBadgeV4 carrier="fedex" service="2-Day" variant="solid" />
    <DockScheduleV4 dock="Dock 4" slots={V4_SLOTS} onSelectSlot={() => {}} />
    <LoadPlanBarV4 segments={[{ id: 'a', pct: 60 }, { id: 'b', pct: 35, emphasis: 'soft' }]} caption="24 / 24" />
    <ETABarV4 progress={65} status="on-time" eta="12:40 PM" origin="Depot" destination="Hub" />
  </>
);

describe('logistics V4 "dispatch" line (native)', () => {
  it('mounts all 12 V4 together (SEED_LIGHT) with the gradient hero + statuses', () => {
    const { getByText, getAllByText } = renderThemed(AllLogisticsV4, SEED_LIGHT);
    expect(getByText('1Z999')).toBeTruthy();
    // Gradient hero + rail both surface the current stage word.
    expect(getAllByText('Out for delivery').length).toBeGreaterThan(0);
    expect(getByText('Dock 4')).toBeTruthy();
  });

  it('ShipmentCardV4 (compact) fires onPress', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <ShipmentCardV4 trackingNumber="1Z999" status="delivered" variant="compact" onPress={onPress} />,
      SEED_DARK
    );
    fireEvent.press(getByLabelText('Shipment 1Z999, Delivered'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('ManifestRowV4 toggles pending → checked via the check control', () => {
    const onToggle = jest.fn();
    const { getByLabelText } = renderThemed(
      <ManifestRowV4 item="Widget" state="pending" onToggle={onToggle} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Pending: Widget'));
    expect(onToggle).toHaveBeenCalledWith('checked');
  });

  it('TrackingTimelineV4 flags an exception in the gradient hero', () => {
    const { getByText } = renderThemed(<TrackingTimelineV4 current="exception" />, SEED_DARK);
    expect(getByText('⚠ Exception')).toBeTruthy();
  });

  it('DockScheduleV4 shows an empty state when no slots are scheduled', () => {
    const { getByText } = renderThemed(<DockScheduleV4 dock="Dock 9" slots={[]} />, SEED_LIGHT);
    expect(getByText('No slots scheduled')).toBeTruthy();
  });

  it('both TrackingTimeline + ETABar V4 render loading states', () => {
    expect(renderThemed(<TrackingTimelineV4 current="picked" loading />, SEED_LIGHT).getByLabelText('Loading tracking')).toBeTruthy();
    expect(renderThemed(<ETABarV4 progress={140} status="ahead" loading />, SEED_DARK).getByLabelText('ETA loading')).toBeTruthy();
  });
});

describe('token purity — logistics V4 "dispatch" line (both seeds)', () => {
  it.each([SEED_LIGHT, SEED_DARK])('every rendered V4 style hex traces to a compiled token (%s)', (seed) => {
    const { root } = renderThemed(AllLogisticsV4, seed);
    const allowed = tokenHexSet(seed);
    const found = renderedStyleHexes(root);
    expect(found.length).toBeGreaterThan(0);
    found.forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });
});
