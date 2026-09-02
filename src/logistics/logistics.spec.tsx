/** @jest-environment jsdom */
/**
 * Web logistics components (jsdom, plain expect): each of the 12 base blocks +
 * the four V2/V3 alternates renders, binds to `--xen-*` token classes (never a
 * literal hex — inline styles carry only widths), conveys status by glyph + word
 * (never color alone), and honors its interaction / a11y contract (row clicks,
 * the manifest check toggle, the ETA/bin progressbars, the tracking exception
 * head). Web parity of the native logistics module.
 */
import { render } from '@testing-library/react';
import { createRef } from 'react';
import { ShipmentCard } from './ShipmentCard';
import { ShipmentCardV2 } from './ShipmentCardV2';
import { ShipmentCardV3 } from './ShipmentCardV3';
import { PackageRow } from './PackageRow';
import { PackageRowV2 } from './PackageRowV2';
import { PackageRowV3 } from './PackageRowV3';
import { RouteStop } from './RouteStop';
import { RouteStopV2 } from './RouteStopV2';
import { RouteStopV3 } from './RouteStopV3';
import { TrackingTimeline } from './TrackingTimeline';
import { TrackingTimelineV2 } from './TrackingTimelineV2';
import { TrackingTimelineV3 } from './TrackingTimelineV3';
import { DeliveryProof } from './DeliveryProof';
import { WarehouseBin } from './WarehouseBin';
import { CarrierBadge } from './CarrierBadge';
import { ManifestRow } from './ManifestRow';
import { DockSchedule, type DockSlot } from './DockSchedule';
import { LoadPlanBar } from './LoadPlanBar';
import { ScanRow } from './ScanRow';
import { ETABar } from './ETABar';
import {
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

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

const SLOTS: DockSlot[] = [
  { id: '1', window: '08:00–09:00', status: 'booked', carrier: 'ups', reference: 'APPT-1' },
  { id: '2', window: '09:00–10:00', status: 'loading' },
];

describe('logistics (web)', () => {
  it('smoke-renders every base + V2/V3 block with no inline hex', () => {
    const { container } = render(
      <div>
        <ShipmentCard trackingNumber="1Z999" status="in-transit" origin="LA" destination="NY" eta="Tue" />
        <ShipmentCardV2 trackingNumber="1Z999" status="in-transit" origin="LA" destination="NY" eta="Tue" carrier="ups" />
        <ShipmentCardV3 trackingNumber="1Z999" status="delivered" origin="LA" destination="NY" />
        <PackageRow packageId="PKG-1" contents="Books" weight={2.4} dimensions="30×20×15" status="in-transit" />
        <PackageRowV2 packageId="PKG-1" contents="Books" weight={2.4} dimensions="30×20×15" status="in-transit" selected />
        <PackageRowV3 packageId="PKG-1" contents="Books" weight={2.4} status="delivered" />
        <RouteStop sequence={1} address="10 Main St" status="completed" eta="9:00" packages={2} />
        <RouteStopV2 sequence={2} address="20 Oak Ave" status="en-route" eta="9:30" packages={1} />
        <RouteStopV3 sequence={3} address="30 Pine Rd" status="pending" packages={4} />
        <TrackingTimeline current="in-transit" events={[{ stage: 'picked', time: 'Mon', detail: 'Origin' }]} />
        <TrackingTimelineV2 current="out-for-delivery" events={[{ stage: 'in-transit', time: 'Tue' }]} />
        <TrackingTimelineV3 current="delivered" events={[{ stage: 'delivered', time: 'Wed' }]} />
        <DeliveryProof kind="signature" outcome="delivered" recipient="A. Smith" time="10:04" location="Porch" />
        <WarehouseBin code="A-12-03" zone="Aisle A" fill={62} itemCount={8} state="partial" />
        <CarrierBadge carrier="fedex" service="2-Day" />
        <ManifestRow item="Widget" sku="SKU-9" quantity={10} scanned={10} state="checked" />
        <DockSchedule dock="Dock 4" slots={SLOTS} />
        <LoadPlanBar segments={[{ id: 'a', pct: 40 }, { id: 'b', pct: 30, emphasis: 'soft' }]} caption="14 / 24" />
        <ScanRow code="X123456" kind="inbound" location="Bay 2" time="10:42" operator="D-7" />
        <ETABar progress={65} status="on-time" eta="12:40 PM" origin="Depot" destination="Hub" />
      </div>
    );
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('DockSchedule shows an empty state when no slots are scheduled', () => {
    const { getByText } = render(<DockSchedule dock="Dock 9" slots={[]} />);
    expect(getByText('No slots scheduled')).toBeTruthy();
  });

  it('ShipmentCard is a keyboard-operable button and fires onClick', () => {
    const onClick = jest.fn();
    const { getByLabelText } = render(
      <ShipmentCard trackingNumber="1Z999" status="delivered" onClick={onClick} />
    );
    const card = getByLabelText('Shipment 1Z999, Delivered');
    expect(card.getAttribute('role')).toBe('button');
    card.click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('ShipmentCard carries status by glyph + word, toned but not color-only', () => {
    const { getByText } = render(<ShipmentCard trackingNumber="1Z" status="delayed" />);
    // The badge label carries the word, so status never rests on color alone.
    expect(getByText(/Delayed/)).toBeTruthy();
  });

  it('PackageRow reflects selection via aria-selected', () => {
    const { getByLabelText } = render(
      <PackageRow packageId="PKG-1" status="in-transit" selected onClick={() => {}} />
    );
    expect(getByLabelText('Package PKG-1, In transit').getAttribute('aria-selected')).toBe('true');
  });

  it('ManifestRow toggles pending → checked through the check control', () => {
    const onToggle = jest.fn();
    const { getByRole } = render(<ManifestRow item="Widget" state="pending" onToggle={onToggle} />);
    const box = getByRole('checkbox');
    expect(box.getAttribute('aria-checked')).toBe('false');
    box.click();
    expect(onToggle).toHaveBeenCalledWith('checked');
  });

  it('WarehouseBin announces fullness through a progressbar value + a toned state word', () => {
    const { getByRole, getByText } = render(<WarehouseBin code="B-1" fill={62} state="partial" />);
    const bar = getByRole('progressbar');
    expect(bar.getAttribute('aria-valuenow')).toBe('62');
    // Occupancy is carried by the word too, not color alone.
    expect(getByText('Partial').className).toContain('text-primary');
  });

  it('ETABar clamps progress and exposes an accessible value', () => {
    const { getByRole } = render(<ETABar progress={140} status="ahead" />);
    expect(getByRole('progressbar').getAttribute('aria-valuenow')).toBe('100');
  });

  it('TrackingTimeline surfaces an exception head with a danger word', () => {
    const { getByText } = render(<TrackingTimeline current="exception" />);
    const label = getByText('Exception');
    expect(label.className).toContain('text-danger');
  });

  it('TrackingTimeline renders a loading skeleton with aria-busy', () => {
    const { getByLabelText } = render(<TrackingTimeline current="picked" loading />);
    expect(getByLabelText('Loading tracking').getAttribute('aria-busy')).toBe('true');
  });

  it('forwards a ref to the CarrierBadge span root', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<CarrierBadge carrier="dhl" ref={ref} />);
    expect(ref.current?.tagName).toBe('SPAN');
  });
});

describe('logistics V4 "dispatch" line (web)', () => {
  it('mounts all 12 V4 blocks (variants + gradient hero) with no inline hex', () => {
    const { getByText, getAllByText, container } = render(
      <div>
        <ShipmentCardV4 trackingNumber="1Z999" status="in-transit" origin="LA" destination="NY" eta="Tue" carrier="ups" pieces={2} />
        <ShipmentCardV4 trackingNumber="1Z000" status="delivered" variant="compact" onClick={() => {}} />
        <PackageRowV4 packageId="PKG-1" contents="Books" weight={2.4} dimensions="30×20×15" status="in-transit" />
        <PackageRowV4 packageId="PKG-2" status="delivered" variant="compact" selected onClick={() => {}} />
        <RouteStopV4 sequence={1} address="10 Main St" status="completed" eta="9:00" packages={2} />
        <RouteStopV4 sequence={2} address="20 Oak Ave" status="en-route" variant="compact" eta="9:30" />
        <ScanRowV4 code="X123456" kind="inbound" location="Bay 2" time="10:42" operator="D-7" />
        <ScanRowV4 code="Y987654" kind="delivery" variant="compact" time="11:01" />
        <ManifestRowV4 item="Widget" sku="SKU-9" quantity={10} scanned={10} state="checked" />
        <ManifestRowV4 item="Gadget" quantity={4} scanned={2} state="pending" variant="compact" />
        <DeliveryProofV4 kind="signature" outcome="delivered" recipient="A. Smith" time="10:04" location="Porch" />
        <WarehouseBinV4 code="A-12-03" zone="Aisle A" fill={62} itemCount={8} state="partial" />
        <TrackingTimelineV4 current="out-for-delivery" events={[{ stage: 'picked', time: 'Mon', detail: 'Origin' }]} />
        <CarrierBadgeV4 carrier="fedex" service="2-Day" />
        <DockScheduleV4 dock="Dock 4" slots={SLOTS} />
        <LoadPlanBarV4 segments={[{ id: 'a', pct: 40 }, { id: 'b', pct: 30, emphasis: 'soft' }]} caption="14 / 24" />
        <ETABarV4 progress={65} status="on-time" eta="12:40 PM" origin="Depot" destination="Hub" />
      </div>
    );
    expect(getByText('1Z999')).toBeTruthy();
    // Gradient hero + rail both surface the current stage word.
    expect(getAllByText('Out for delivery').length).toBeGreaterThan(0);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('ShipmentCardV4 (compact) is a keyboard-operable button and fires onClick', () => {
    const onClick = jest.fn();
    const { getByLabelText } = render(
      <ShipmentCardV4 trackingNumber="1Z999" status="delivered" variant="compact" onClick={onClick} />
    );
    const card = getByLabelText('Shipment 1Z999, Delivered');
    expect(card.getAttribute('role')).toBe('button');
    card.click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('ManifestRowV4 toggles pending → checked through the check control', () => {
    const onToggle = jest.fn();
    const { getByRole } = render(<ManifestRowV4 item="Widget" state="pending" onToggle={onToggle} />);
    const box = getByRole('checkbox');
    expect(box.getAttribute('aria-checked')).toBe('false');
    box.click();
    expect(onToggle).toHaveBeenCalledWith('checked');
  });

  it('WarehouseBinV4 announces fullness through a progressbar value', () => {
    const { getByRole } = render(<WarehouseBinV4 code="B-1" fill={62} state="partial" />);
    expect(getByRole('progressbar').getAttribute('aria-valuenow')).toBe('62');
  });

  it('ETABarV4 clamps progress and exposes an accessible value', () => {
    const { getByRole } = render(<ETABarV4 progress={140} status="ahead" />);
    expect(getByRole('progressbar').getAttribute('aria-valuenow')).toBe('100');
  });

  it('TrackingTimelineV4 flags an exception in the gradient hero', () => {
    const { getByText } = render(<TrackingTimelineV4 current="exception" />);
    expect(getByText('⚠ Exception')).toBeTruthy();
  });

  it('DockScheduleV4 shows an empty state when no slots are scheduled', () => {
    const { getByText } = render(<DockScheduleV4 dock="Dock 9" slots={[]} />);
    expect(getByText('No slots scheduled')).toBeTruthy();
  });
});
