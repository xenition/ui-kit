import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { FlightCardV2 } from './FlightCardV2';
import { FlightCardV3 } from './FlightCardV3';
import { HotelCardV2 } from './HotelCardV2';
import { HotelCardV3 } from './HotelCardV3';
import { DestinationCardV2 } from './DestinationCardV2';
import { DestinationCardV3 } from './DestinationCardV3';
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

const FLIGHT = {
  airline: 'Xenition Air',
  flightNumber: 'XN 482',
  from: { code: 'SFO', city: 'San Francisco', time: '08:15' },
  to: { code: 'NRT', city: 'Tokyo', time: '13:40' },
  duration: '10h 25m',
  stops: 1,
  priceCents: 78900,
} as const;

describe('travel design variants — mount + interaction (native)', () => {
  it('FlightCardV2 renders route and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <FlightCardV2 {...FLIGHT} onPress={onPress} />,
      SEED_LIGHT
    );
    expect(getByText('SFO')).toBeTruthy();
    expect(getByText('NRT')).toBeTruthy();
    fireEvent.press(getByLabelText(/Xenition Air SFO to NRT/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('FlightCardV3 renders route and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <FlightCardV3 {...FLIGHT} onPress={onPress} />,
      SEED_DARK
    );
    expect(getByText('SFO')).toBeTruthy();
    fireEvent.press(getByLabelText(/Xenition Air SFO to NRT/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('HotelCardV2 renders name and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <HotelCardV2
        name="Park Tower"
        location="Shinjuku, Tokyo"
        rating={4}
        reviewCount={321}
        priceCents={21000}
        tags={['Free Wi-Fi', 'Pool']}
        onPress={onPress}
      />,
      SEED_LIGHT
    );
    expect(getByText('Park Tower')).toBeTruthy();
    expect(getByText('/ night')).toBeTruthy();
    fireEvent.press(getByLabelText(/Park Tower/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('HotelCardV3 renders name and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <HotelCardV3
        name="Park Tower"
        location="Shinjuku, Tokyo"
        rating={4}
        priceCents={21000}
        tags={['Free Wi-Fi', 'Pool']}
        onPress={onPress}
      />,
      SEED_DARK
    );
    expect(getByText('Park Tower')).toBeTruthy();
    fireEvent.press(getByLabelText(/Park Tower/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('DestinationCardV2 renders name/price and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <DestinationCardV2
        name="Kyoto"
        country="Japan"
        tagline="Temples and gardens"
        glyph="⛩"
        fromCents={49900}
        badge="Popular"
        onPress={onPress}
      />,
      SEED_LIGHT
    );
    expect(getByText('Kyoto')).toBeTruthy();
    expect(getByText('$499.00')).toBeTruthy();
    fireEvent.press(getByLabelText(/Kyoto, Japan/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('DestinationCardV3 renders name and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <DestinationCardV3 name="Kyoto" country="Japan" fromCents={49900} badge="Popular" onPress={onPress} />,
      SEED_DARK
    );
    expect(getByText('Kyoto')).toBeTruthy();
    fireEvent.press(getByLabelText(/Kyoto, Japan/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('ItineraryItemV2 announces status and fires onPress', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <ItineraryItemV2 kind="flight" time="09:30" title="Depart SFO" subtitle="Gate A12" status="active" onPress={onPress} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Depart SFO, 09:30, active'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('ItineraryItemV3 announces status and fires onPress', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <ItineraryItemV3
        kind="hotel"
        time="15:00"
        title="Check in"
        subtitle="Park Tower"
        status="done"
        showConnector={false}
        onPress={onPress}
      />,
      SEED_DARK
    );
    fireEvent.press(getByLabelText('Check in, 15:00, done'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('travel V4 "journey" line — mount + interaction (native)', () => {
  it('FlightCardV4 renders route and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <FlightCardV4 {...FLIGHT} onPress={onPress} />,
      SEED_LIGHT
    );
    expect(getByText('SFO')).toBeTruthy();
    expect(getByText('NRT')).toBeTruthy();
    fireEvent.press(getByLabelText(/Xenition Air SFO to NRT/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('the new journey blocks mount on the brand ground', () => {
    const { getByText } = renderThemed(
      <>
        <TripHeader origin={{ city: 'San Francisco', code: 'SFO' }} destination={{ city: 'Tokyo', code: 'NRT' }} startDate="Sep 3" endDate="Sep 10" travelers={2} nights={7} />
        <FlightStatusBanner status="boarding" flightNumber="XN 482" gate="B12" seat="14C" boardingTime="3:40 PM" />
        <LoyaltyCard program="SkyMiles" memberName="A. Rivera" tier="Gold" points={48250} nextTierPoints={60000} memberId="XN-88213" />
      </>,
      SEED_DARK
    );
    expect(getByText('San Francisco')).toBeTruthy();
    expect(getByText('SkyMiles')).toBeTruthy();
  });
});

describe('travel design variants — token purity (both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <FlightCardV2 {...FLIGHT} />
          <FlightCardV3 {...FLIGHT} variant="compact" />
          <FlightCardV4 {...FLIGHT} />
          <HotelCardV2 name="Park Tower" location="Shinjuku" rating={4} reviewCount={321} priceCents={21000} tags={['Pool']} />
          <HotelCardV3 name="Park Tower" rating={4} priceCents={21000} compareAtCents={26000} tags={['Pool', 'Spa', 'Gym']} appearance="soft" />
          <DestinationCardV2 name="Kyoto" country="Japan" tagline="Temples" fromCents={49900} badge="Popular" />
          <DestinationCardV3 name="Kyoto" country="Japan" tagline="Temples" fromCents={49900} badge="Popular" appearance="outline" />
          <DestinationCardV4 name="Kyoto" country="Japan" tagline="Temples" fromCents={49900} badge="Popular" />
          <ItineraryItemV2 kind="flight" time="09:30" title="Depart" subtitle="Gate A12" status="active" />
          <ItineraryItemV3 kind="meal" time="12:00" title="Lunch" subtitle="Ramen" status="upcoming" showConnector={false} />
          <ItineraryItemV4 kind="flight" time="09:30" title="Depart" subtitle="Gate A12" status="active" />
          <TripHeader origin={{ city: 'San Francisco', code: 'SFO' }} destination={{ city: 'Tokyo', code: 'NRT' }} startDate="Sep 3" endDate="Sep 10" travelers={2} nights={7} onManage={() => {}} />
          <FlightStatusBanner status="delayed" flightNumber="XN 482" gate="B12" seat="14C" boardingTime="3:40 PM" remark="New departure 4:15 PM" />
          <LoyaltyCard program="SkyMiles" memberName="A. Rivera" tier="Gold" points={48250} nextTierPoints={60000} memberId="XN-88213" />
        </>,
        seed
      );
      const allowed = tokenHexSet(seed);
      const found = renderedStyleHexes(root);
      expect(found.length).toBeGreaterThan(0);
      found.forEach((hex) => expect(allowed.has(hex)).toBe(true));
    });
  });

  it('renders empty/loading states without throwing', () => {
    const { getByText } = renderThemed(
      <>
        <FlightCardV2 {...FLIGHT} loading />
        <FlightCardV3 {...FLIGHT} loading />
        <HotelCardV3 name="Bare Inn" />
        <DestinationCardV3 name="Nowhere" />
      </>,
      SEED_LIGHT
    );
    expect(getByText('Bare Inn')).toBeTruthy();
  });
});
