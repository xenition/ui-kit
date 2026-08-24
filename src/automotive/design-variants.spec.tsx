/** @jest-environment jsdom */
/**
 * Alternate automotive designs (v2 / v3) for the web (React DOM) — drop-in
 * redesigns of DriverCard, RideRequestCard, RideStatusBar, VehicleCard. Each
 * variant keeps the base props; these specs prove they (a) mount, (b) stay
 * token-pure (no literal hex in inline styles), and (c) honor a key
 * interaction/state.
 */
import { fireEvent, render } from '@testing-library/react';
import { DriverCardV2 } from './DriverCardV2';
import { DriverCardV3 } from './DriverCardV3';
import { RideRequestCardV2 } from './RideRequestCardV2';
import { RideRequestCardV3 } from './RideRequestCardV3';
import { RideStatusBarV2 } from './RideStatusBarV2';
import { RideStatusBarV3 } from './RideStatusBarV3';
import { VehicleCardV2 } from './VehicleCardV2';
import { VehicleCardV3 } from './VehicleCardV3';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;
const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

const PICKUP = { label: 'Pickup', address: '123 Main St' };
const DROPOFF = { label: 'Airport', address: 'Terminal 2' };

describe('DriverCard alternates (web)', () => {
  it('V2 fires onCall', () => {
    const onCall = jest.fn();
    const { getByText, container } = render(<DriverCardV2 name="Sam" rating={4.9} tripCount={1200} vehicle="Prius" plate="XN-482" etaLabel="4 min" online onCall={onCall} />);
    expect(getByText('Sam')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Call'));
    expect(onCall).toHaveBeenCalledTimes(1);
  });
  it('V3 fires onCall', () => {
    const onCall = jest.fn();
    const { getByLabelText, container } = render(<DriverCardV3 name="Lee" rating={4.7} plate="AB-12" etaLabel="2 min" onCall={onCall} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('Call'));
    expect(onCall).toHaveBeenCalledTimes(1);
  });
});

describe('RideRequestCard alternates (web)', () => {
  it('V2 accepts', () => {
    const onAccept = jest.fn();
    const { getByText, container } = render(<RideRequestCardV2 riderName="Ada" riderRating={4.8} pickup={PICKUP} dropoff={DROPOFF} fareCents={2450} distanceToPickup="1.2 mi" onAccept={onAccept} />);
    expect(getByText('Ada')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Accept'));
    expect(onAccept).toHaveBeenCalledTimes(1);
  });
  it('V3 accepts', () => {
    const onAccept = jest.fn();
    const { getByText, container } = render(<RideRequestCardV3 riderName="Leo" pickup={PICKUP} dropoff={DROPOFF} fareCents={1800} onAccept={onAccept} />);
    expect(getByText('Leo')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Accept'));
    expect(onAccept).toHaveBeenCalledTimes(1);
  });
});

describe('RideStatusBar alternates (web)', () => {
  it('V2 renders the active stage', () => {
    const { getAllByText, container } = render(<RideStatusBarV2 stage="arriving" detail="Driver 3 min away" />);
    expect(getAllByText('Arriving').length).toBeGreaterThan(0);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
  it('V3 renders cancelled', () => {
    const { getByText, container } = render(<RideStatusBarV3 stage="requested" cancelled detail="No drivers" />);
    expect(getByText(/Cancelled/)).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('VehicleCard alternates (web)', () => {
  it('V2 fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(<VehicleCardV2 name="Tesla Model 3" plate="EV-777" year={2023} vehicleClass="Sedan" status="available" specs={[{ label: 'Seats', value: '5' }]} onClick={onClick} />);
    expect(getByText('Tesla Model 3')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Tesla Model 3'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  it('V3 renders a dense row', () => {
    const { getByText, container } = render(<VehicleCardV3 name="Ford Focus" plate="FF-01" status="maintenance" />);
    expect(getByText('Ford Focus')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});
