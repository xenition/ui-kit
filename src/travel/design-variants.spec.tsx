/** @jest-environment jsdom */
/**
 * Alternate travel designs (v2 / v3) for the web (React DOM) — drop-in redesigns
 * of DestinationCard, FlightCard, HotelCard, ItineraryItem. Each variant keeps the
 * base props; these specs prove they (a) mount, (b) stay token-pure (no literal
 * hex in inline styles), and (c) honor a key interaction/state.
 */
import { fireEvent, render } from '@testing-library/react';
import { DestinationCardV2 } from './DestinationCardV2';
import { DestinationCardV3 } from './DestinationCardV3';
import { FlightCardV2 } from './FlightCardV2';
import { FlightCardV3 } from './FlightCardV3';
import { HotelCardV2 } from './HotelCardV2';
import { HotelCardV3 } from './HotelCardV3';
import { ItineraryItemV2 } from './ItineraryItemV2';
import { ItineraryItemV3 } from './ItineraryItemV3';
import {
  FlightCardV4,
  DestinationCardV4,
  ItineraryItemV4,
  TripHeader,
  FlightStatusBanner,
  LoyaltyCard,
} from './index';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;
const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

const LEG_A = { code: 'SFO', city: 'San Francisco', time: '08:15' };
const LEG_B = { code: 'JFK', city: 'New York', time: '16:55' };

describe('DestinationCard alternates (web)', () => {
  it('V2 fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(<DestinationCardV2 name="Tokyo" country="Japan" fromCents={49900} badge="Popular" onClick={onClick} />);
    expect(getByText('Tokyo')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Tokyo'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  it('V3 renders a compact row', () => {
    const { getByText, container } = render(<DestinationCardV3 name="Paris" country="France" fromCents={39900} />);
    expect(getByText('Paris')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('FlightCard alternates (web)', () => {
  it('V2 fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(<FlightCardV2 airline="XenAir" from={LEG_A} to={LEG_B} duration="5h 40m" stops={0} priceCents={28900} onClick={onClick} />);
    expect(getByText('SFO')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('SFO'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  it('V3 renders a dense line', () => {
    const { getByText, container } = render(<FlightCardV3 airline="XenAir" from={LEG_A} to={LEG_B} duration="5h 40m" stops={1} priceCents={19900} />);
    expect(getByText(/SFO/)).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('HotelCard alternates (web)', () => {
  it('V2 fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(<HotelCardV2 name="Grand Hotel" location="Shibuya" rating={4.5} priceCents={22000} tags={['Wi-Fi']} onClick={onClick} />);
    expect(getByText('Grand Hotel')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Grand Hotel'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  it('V3 renders a compact row', () => {
    const { getByText, container } = render(<HotelCardV3 name="City Inn" location="Downtown" rating={4.1} priceCents={12000} />);
    expect(getByText('City Inn')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('ItineraryItem alternates (web)', () => {
  it('V2 fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(<ItineraryItemV2 kind="flight" time="09:30" title="Depart SFO" subtitle="Gate 22" status="active" onClick={onClick} />);
    expect(getByText('Depart SFO')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Depart SFO'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  it('V3 renders a dense line', () => {
    const { getByText, container } = render(<ItineraryItemV3 kind="meal" time="12:00" title="Lunch" status="upcoming" />);
    expect(getByText('Lunch')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('travel V4 "journey" line (web)', () => {
  it('FlightCardV4 mounts, stays token-pure, fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(
      <FlightCardV4 airline="Xen Air" flightNumber="XN 482" from={LEG_A} to={LEG_B} duration="5h 40m" priceCents={24900} onClick={onClick} />
    );
    expect(getByText('SFO')).toBeTruthy();
    expect(getByText('Nonstop')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('SFO'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  it('DestinationCardV4 mounts and stays token-pure', () => {
    const { getByText, container } = render(<DestinationCardV4 name="Tokyo" country="Japan" fromCents={49900} badge="Popular" />);
    expect(getByText('Tokyo')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
  it('ItineraryItemV4 mounts and stays token-pure', () => {
    const { getByText, container } = render(<ItineraryItemV4 kind="flight" time="09:30" title="Depart SFO" subtitle="Gate 22" status="active" />);
    expect(getByText('Depart SFO')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('travel V4 new blocks (web)', () => {
  it('TripHeader mounts, fires onManage, stays token-pure', () => {
    const onManage = jest.fn();
    const { getByText, container } = render(
      <TripHeader origin={{ city: 'San Francisco', code: 'SFO' }} destination={{ city: 'New York', code: 'JFK' }} startDate="Sep 3" endDate="Sep 10" travelers={2} nights={7} onManage={onManage} />
    );
    expect(getByText('San Francisco')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Manage trip'));
    expect(onManage).toHaveBeenCalledTimes(1);
  });
  it('FlightStatusBanner renders each status token-pure', () => {
    for (const status of ['on-time', 'boarding', 'delayed', 'cancelled', 'landed'] as const) {
      const { container, unmount } = render(<FlightStatusBanner status={status} flightNumber="XN 482" gate="B12" seat="14C" boardingTime="3:40 PM" />);
      expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
      unmount();
    }
  });
  it('LoyaltyCard mounts and stays token-pure', () => {
    const { getByText, container } = render(<LoyaltyCard program="SkyMiles" memberName="A. Rivera" tier="Gold" points={48250} nextTierPoints={60000} memberId="XN-88213" />);
    expect(getByText('SkyMiles')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});
